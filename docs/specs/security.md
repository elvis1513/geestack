# Security Specs - GeeStack（极栈）官网

> 文件：`docs/specs/security.md`  
> 适用范围：GeeStack 官网（`app/site/**`）与对应后端公开接口（如有）。  
> 优先级：这是“公网可上线”的安全基线。除非在 `docs/adr/**` 明确记录并获批，否则不得降低本文件要求。  
> 说明：本文件定义**原则 + 可执行约束 + 落地位置**。与某一页面强绑定的“像素级复刻/交互细节”不写在这里，写入 `docs/ui-lockfiles/**`。

---

## 0. 范围、非目标与原则

### 0.1 范围（In Scope）
- 公网访问的 GeeStack 官网（匿名访问为主）
- 站点公共 API（如新闻/案例/搜索/表单提交等）
- 静态资源与 CDN（如启用）
- 未来 Console/后台（仅预留基线，详见第 8 章）

### 0.2 非目标（Out of Scope）
- 内网运维系统、CI/CD 平台、开发者个人设备安全
- 供应商/第三方站点自身的安全（只能做接入风险控制）

### 0.3 安全原则（必须遵守）
- **默认拒绝（Default Deny）**：没有明确允许即视为不允许（CORS、CSP、外链域名、接口权限等）
- **最小权限（Least Privilege）**：服务账户、数据库账户、容器权限、日志访问权限最小化
- **分层防护（Defense-in-Depth）**：前端、网关/反代、后端、数据库、CDN/WAF 分层加固
- **可审计（Auditable）**：关键动作必须有记录；关键配置可追溯；重大变化必须写 ADR
- **不信任输入（Never Trust Input）**：用户输入、第三方数据、URL 参数、Header 均需校验

---

## 1. 威胁模型（面向公网）

### 1.1 主要资产（Assets）
- 品牌与网站可信度（被篡改/挂马/跳转会造成直接损失）
- 用户提交的线索数据（Contact/Subscribe 等，可能包含 PII）
- 站点可用性（被爬虫、DDoS、表单滥用、资源盗链拖垮）
- 公共内容数据（新闻、案例、资源列表等，被批量抓取/篡改的风险）
- 未来 Console 的身份与权限（若上线则进入更高风险等级）

### 1.2 攻击面（Attack Surface）
- 公开页面：`/cn/**`、`/en/**`
- 公共 API：`/api/**`（如存在）
- 静态资源：JS/CSS/图片/字体
- 表单入口：Contact/Subscribe/Search（如有）
- 反向代理/网关（Nginx/Ingress/Cloud LB）
- 第三方资源：analytics、客服、地图、验证码、视频等（如接入）

### 1.3 典型威胁与风险（示例）
- XSS（反射/存储/DOM）
- CSRF（若使用 cookie 型认证或表单提交可触发副作用）
- 注入（SQL/NoSQL/LDAP/SpEL/命令注入）
- 点击劫持（iframe 嵌套）
- 爬虫/表单滥用（刷表单、刷搜索、撞库/探测）
- 资源盗链（图片/下载资源被外站引用造成成本）
- 供应链攻击（npm/maven 依赖、构建产物、镜像）
- 配置错误（CORS 放开、CSP 过宽、调试接口暴露、错误信息泄露）
- 敏感信息泄露（日志、异常栈、source map、环境变量）

### 1.4 风险等级划分（必须）
采用二维矩阵：**影响（Impact）× 可能性（Likelihood）**，各 1~5 分。

- 影响（I）
  - 1：几乎无影响（仅视觉问题）
  - 2：轻微影响（少量用户受影响，可快速恢复）
  - 3：中等影响（网站可用性/信誉受影响，需人工介入）
  - 4：严重影响（敏感数据泄露/持续不可用/大面积用户受影响）
  - 5：灾难性（账号体系沦陷、代码/资源被植入、重大合规风险）

- 可能性（L）
  - 1：极不可能（需要复杂前置条件）
  - 2：低概率（需要一定技巧/环境）
  - 3：中等（常见攻击面，具备一定可行性）
  - 4：高概率（自动化脚本即可）
  - 5：非常高（互联网普遍扫描/必然被打）

- 风险等级（R = I × L）
  - 1~4：低（记录即可）
  - 5~9：中（需要修复计划）
  - 10~16：高（必须上线前解决/或 ADR 豁免）
  - 17~25：严重（禁止上线）

---

## 2. Web 安全基线（必须）

> 本章内容属于“上线硬门槛”。默认在生产环境强制启用；开发环境可适度放宽，但不得误入生产。

### 2.1 TLS（必须）
- 生产环境必须全站 HTTPS，禁用 HTTP（或仅允许 80 → 443 跳转）。
- TLS 最低版本建议：TLS 1.2+（优先 1.3）。
- 证书与私钥不得提交到仓库；证书轮换有 SOP（见第 6 章）。

### 2.2 安全响应头（必须）
以下头建议由**反向代理/网关**统一注入；如由 Spring Security 注入，必须确保静态资源同样覆盖。

- **HSTS**
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`（如确认全子域均 HTTPS）
  - 注意：启用 preload 需谨慎，必须经 ADR 审批。

- **Clickjacking 防护**
  - 首选 CSP：`frame-ancestors 'none'`（见 2.3）
  - 如需兼容：`X-Frame-Options: DENY`（或 SAMEORIGIN，通常不推荐）

- **MIME 嗅探**
  - `X-Content-Type-Options: nosniff`

- **Referrer**
  - `Referrer-Policy: strict-origin-when-cross-origin`（默认推荐）
  - 若业务需要更严格可改为 `no-referrer`

- **权限策略（建议）**
  - `Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=(), usb=(), ...`
  - 仅对确实需要的能力按 allowlist 放开。

- **缓存策略（按资源类型分级）**
  - HTML：`Cache-Control: no-store` 或短缓存（防止发布后旧 HTML 持有旧 CSP/旧入口）
  - 静态资源（hash 命名）：`Cache-Control: public, max-age=31536000, immutable`
  - API：按业务决定；含 PII 的响应不得被共享缓存。

### 2.3 CSP（Content Security Policy）（必须，分阶段）
> CSP 是防 XSS 的核心手段之一。策略必须“从严”，并通过 Report-Only 逐步收紧。

#### 2.3.1 交付要求
- 生产环境至少提供：
  - `Content-Security-Policy-Report-Only`（上线初期）
  - 收敛后切换到 `Content-Security-Policy` 强制执行
- CSP 必须结合你实际接入的第三方域名做 allowlist（analytics、captcha、地图、视频等）。

#### 2.3.2 推荐基线（示例，需按实际域名调整）
（以下为 **最小可用骨架**，不要直接照抄上线；必须结合实际第三方域名与资源策略收敛。）

- `default-src 'self';`
- `base-uri 'self';`
- `object-src 'none';`
- `frame-ancestors 'none';`
- `script-src 'self' 'nonce-<RANDOM>' 'strict-dynamic';`
  - 禁止 `'unsafe-inline'`（除非 ADR 批准且有迁移计划）
- `style-src 'self' 'unsafe-inline';`
  - 若能做到完全去 inline styles，可逐步移除 `'unsafe-inline'`（更优）
- `img-src 'self' data: https:;`
- `font-src 'self' data: https:;`
- `connect-src 'self' https://<api-domain> https://<analytics-domain>;`
- `frame-src 'self' https://<captcha-domain> https://<video-domain>;`（如需要）
- `report-uri` / `report-to`：配置到你可接收的日志/监控端点（见第 6 章）

#### 2.3.3 Nonce 策略（建议）
- 若站点使用 SSR/模板渲染注入脚本，必须对每次响应生成随机 nonce 并注入。
- 如为纯 SPA 静态部署，优先避免 inline script，尽量不依赖 nonce。

### 2.4 Cookie 策略（SameSite/HttpOnly/Secure）（必须）
> 官网默认匿名访问；如未来引入登录/会话，应遵守以下策略。

- 若使用 cookie：
  - `Secure`：生产必须
  - `HttpOnly`：存储会话/鉴权信息必须启用（防止 JS 读取）
  - `SameSite`：
    - 默认 `Lax`（适用于大多数场景）
    - 只有确需跨站（第三方登录/嵌入）才使用 `None; Secure`，并记录 ADR
- 禁止把 access token 存在可被 JS 读取的 cookie 或 localStorage（除非明确威胁建模并接受风险）。

---

## 3. XSS / CSRF / 注入 防护策略

### 3.1 输入校验（必须）
- 前端校验只做体验增强；**后端校验为最终可信**。
- 所有来自用户的输入（query/body/header）必须：
  - 类型校验（字符串/数字/枚举）
  - 长度上限（防止滥用与 DoS）
  - 允许字符集（如仅允许字母数字与少量符号）
- 对“可渲染内容”（富文本/HTML）：
  - 默认不允许；若业务需要必须引入白名单净化（例如 DOMPurify），并写 ADR。

### 3.2 输出编码（必须）
- 前端 React 默认对插值做转义；禁止滥用 `dangerouslySetInnerHTML`。
- 后端输出：
  - JSON 序列化不得拼接字符串生成（避免注入与编码漏洞）
  - 错误信息不得包含敏感数据（SQL、密钥、内部路径）

### 3.3 XSS 防护（必须）
- CSP（第 2.3）为主线。
- 对 URL 参数回显、搜索关键字展示等：
  - 前端必须按纯文本渲染（不要当作 HTML）
- Source map：
  - 生产环境默认不对公网提供（或采用受控方式提供），避免泄露源码结构。

### 3.4 CSRF（条件必须）
- 如果请求会产生副作用（写入/提交）且使用 cookie 作为鉴权载体：**必须启用 CSRF 防护**（token + SameSite）。
- 若使用 `Authorization: Bearer <JWT>` 且不依赖 cookie 进行鉴权：
  - CSRF 风险显著降低，但仍需防止“误用跨域 + 凭证泄露”。
- 官网常见的表单提交（Contact/Subscribe）：
  - 即使匿名，也要防止跨站滥用（见第 4 章反垃圾策略）。

### 3.5 注入防护（必须）
- SQL 注入：
  - 默认使用 JPA/参数化查询；避免字符串拼接构造查询
  - 原生 SQL 必须参数化，并进行代码审查
- SpEL/表达式注入：
  - 禁止把用户输入作为表达式执行
- SSRF：
  - 若后端需要抓取 URL（如预览/回调），必须做域名 allowlist、DNS rebind 防护、私网地址禁止访问
- 命令注入：
  - 禁止把用户输入拼接到 shell 命令；必要时使用安全 API 与严格白名单

---

## 4. 表单与反垃圾（如范围包含）

> 适用：Contact / Subscribe / Search（如存在）。

### 4.1 Contact / Subscribe（必须）
- 需要后端接口的表单必须具备：
  - 输入长度上限与字段级校验
  - 服务端频率限制（见 4.3）
  - 反自动化机制（见 4.2）
  - 审计记录（见 4.4）
- 禁止将表单接口设计为“可匿名无限提交且无任何门槛”。

### 4.2 验证码策略（按风险启用）
- 基线优先：**无感策略**（honeypot + 时间阈值 + 行为评分）
- 高风险或被攻击后：
  - 引入验证码（图形/滑块/第三方）
  - 第三方域名必须纳入 CSP allowlist
  - 必须提供降级方案（第三方不可用时的应对）

### 4.3 频率限制（必须）
建议在网关/反代与应用层双层限流：

- 网关层（推荐）：
  - 按 IP、按路径限流（例如 `/api/contact`、`/api/search`）
- 应用层：
  - 按 IP + 指纹（UA + Accept-Language + 轻量 hash）限流
  - 对异常模式触发更严格阈值（短时突增）

> 阈值本身不写死在本文档（避免频繁改），应在环境配置中可调，并在对应 lockfile/运行手册记录默认值。

### 4.4 审计（必须）
- 记录字段：时间、IP（可脱敏）、UA、路径、结果码、耗时、限流命中情况
- 保留：见第 6 章
- 告警：异常峰值、错误码突增、单 IP 高频、验证码失败激增（若启用）

---

## 5. 依赖与供应链安全

### 5.1 npm / maven 漏洞扫描（必须）
- npm：
  - CI 必须执行：`npm audit --audit-level=high`（或等效工具）
  - 建议引入：OSV/Snyk/Dependabot（任选其一，需 ADR 记录）
- Maven：
  - 建议启用 OWASP Dependency-Check 或等效方案（CI 运行）
  - 对高危漏洞必须阻断发布或给出 ADR 豁免（含补救计划与截止时间）

### 5.2 锁文件与可复现构建（必须）
- npm：必须提交 lockfile（package-lock 或 pnpm-lock 等，按项目实际）
- CI 安装依赖必须使用可复现方式：
  - npm：`npm ci`（优先）
- Maven：使用 `./mvnw`（wrapper 固定版本）
- 禁止在生产构建中从不可信源下载可执行脚本（如临时 curl | bash）

### 5.3 升级策略（必须）
- 常规依赖：按月合并安全升级
- 高危漏洞：48 小时内响应（修复/缓解/下线），并记录处理过程
- 重大升级（破坏性变更）：需 ADR（影响评估、回滚策略、验证步骤）

### 5.4 代码与密钥扫描（建议但强烈推荐）
- Git hooks 或 CI：
  - secret scanning（如 gitleaks/trufflehog）
  - 禁止提交 `.env`、证书私钥、云密钥
- 发现泄露必须立即轮换并记录事故处理（第 6 章）

---

## 6. 日志、隐私与 PII（合规基线）

### 6.1 PII 分类（必须）
- P0（敏感）：手机号、邮箱、身份证号、精确地址、任何认证凭证
- P1（一般）：公司名、职位、留言内容（可能包含敏感信息）
- P2（非敏感）：页面访问日志、匿名统计

### 6.2 脱敏（必须）
- 日志中不得明文记录：
  - 表单完整内容（尤其是邮箱/手机号）
  - token、cookie、Authorization header
- 建议策略：
  - 邮箱：保留前 2 位 + 域名（如 `ab***@xx.com`）
  - 手机：前三后四
  - IP：可按 /24 或 hash（视合规要求）

### 6.3 保留周期（建议基线，可按合规调整）
- 访问日志：30~90 天（建议 30）
- 安全审计日志：90~180 天（建议 180）
- 表单线索数据：按业务需要与隐私政策（需明确删除机制）

### 6.4 访问控制（必须）
- 日志平台与数据库：
  - 最小权限
  - 访问留痕
  - 生产数据导出必须审批（内部流程可在运行手册中定义）

### 6.5 隐私告知（与 SEO/页面联动）
- 若收集表单线索，必须在页面提供隐私告知入口（可先占位页，但不得缺失）
- 具体文案不写在此处，可在 `docs/specs/seo.md` 或内容系统中维护

---

## 7. 部署与运行时加固（强烈建议）

### 7.1 容器与主机（建议）
- 容器以非 root 运行
- 只读文件系统（如可行）
- 限制 Linux capabilities（最小化）
- 资源限制：CPU/内存（防止 DoS 拖垮宿主）
- 网络隔离：应用与数据库分网段/安全组

### 7.2 应用配置（必须）
- 生产环境禁用 debug、禁用详细错误回显
- Actuator（如启用）必须：
  - 不对公网暴露或严格鉴权
  - 仅开放必要端点
- CORS：
  - 默认关闭或严格 allowlist
  - 禁止 `*` + `credentials=true` 的组合

### 7.3 备份与恢复（必须）
- 数据库备份：周期与保留按业务定；至少具备可恢复演练
- 回滚：生产发布必须具备快速回滚路径（镜像/静态资源版本化）

---

## 8. Console/后台预留（未来）

> 官网当前以匿名访问为主；若未来引入 console（`app/console/**`），必须满足以下基线。

### 8.1 RBAC（必须）
- 角色与权限在 `docs/specs/security.md` 中定义模型，并在 `docs/specs/api.md` 中定义接口权限
- 后端采用方法级鉴权（如 `@PreAuthorize`），不得只靠前端隐藏菜单

### 8.2 JWT（必须）
- 采用短期 access token + 可控的刷新策略（如 refresh token）
- token 不得出现在 URL
- 关键操作建议二次确认/短期重认证

### 8.3 审计（必须）
- 登录、登出、失败尝试、权限变更、关键数据变更：必须审计
- 审计日志需防篡改（至少写入独立存储/append-only）

---

## 9. 落地位置（Implementation Mapping）

> 目的：让智能体能快速找到“该在哪里配置”。

- 安全响应头 / HSTS / CSP：
  - 优先：反代/网关（Nginx/Ingress/Cloud LB）
  - 备选：Spring Security headers（确保静态资源也覆盖）
- CORS / 鉴权 / CSRF：
  - 后端 Spring Security 配置（JHipster 安全配置）
- 频率限制：
  - 优先：网关层（limit_req 等）
  - 备选：后端 filter + Redis（如需要）
- 日志脱敏：
  - 后端 logging 配置 + 统一拦截器（禁止记录敏感 header/body）
- 依赖扫描：
  - CI pipeline（npm audit / maven dependency check / secret scan）
- Source map：
  - 前端构建配置：生产禁用或受控发布

---

## 10. 上线前安全检查清单（必须全部满足）

- [ ] 生产环境强制 HTTPS；HTTP 仅做 301 跳转
- [ ] 安全响应头齐全（HSTS、nosniff、Referrer-Policy、Permissions-Policy、frame-ancestors/XFO）
- [ ] CSP 已启用（至少 Report-Only），且第三方域名已收敛到 allowlist
- [ ] 生产环境不暴露 debug 信息、详细异常栈、敏感配置
- [ ] 表单接口具备：服务端校验 + 限流 + 反自动化策略 + 审计
- [ ] CORS 默认拒绝；如启用仅 allowlist
- [ ] npm/maven 依赖漏洞扫描已通过或有 ADR 豁免
- [ ] 未提交密钥/证书；secret scan 通过
- [ ] 日志脱敏策略生效；PII 不落日志
- [ ] Actuator/管理端点未对公网暴露（或已严格鉴权）
