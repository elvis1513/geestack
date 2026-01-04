# API Specs - GeeStack（极栈）官网

> 文件：`docs/specs/api.md`  
> 适用范围：GeeStack 官网公共 API（匿名访问为主）与未来 Console/后台 API（预留）。  
> 目标：为“严格复刻官网 + 多语言 + 可缓存 + 可观测 + 可扩展内容域”提供可执行 API 契约。  
> 原则：**API 是 UI 的稳定基座**。页面复刻细节写入 `docs/ui-lockfiles/**`；API 的稳定接口与数据结构写在本文件。  
> 依赖：安全与反滥用基线见 `docs/specs/security.md`；SEO/索引策略见 `docs/specs/seo.md`。

---

## 0. 术语与约束层级

### 0.1 术语
- **Site API**：官网公开 API，匿名读为主，少量写（Contact/Subscribe）
- **Content**：可被频道页渲染的结构化内容（产品、案例、资源、新闻等）
- **Section**：页面楼层/区块（Hero、Featured、CTA 等），由 UI lockfile 定义结构，由 API 提供数据

### 0.2 约束层级（回顾）
1. `AGENTS.md`（工程规范与质量门槛）
2. `docs/requirements/**`（范围与验收）
3. `docs/specs/ui.md`（IA/路由/导航/组件契约）
4. `docs/specs/api.md`（本文件，API 契约）
5. `docs/ui-lockfiles/**`（页面/模块复刻锁定）

---

## 1. 总览与原则

### 1.1 API 风格与路径
- API 风格：REST（资源为中心）
- Base Path：`/api/site/**`（官网域），未来 Console：`/api/console/**`
- 所有 GET 接口默认 **幂等**，支持缓存策略（见第 6 章）
- 资源定位优先使用 **slug**（可读、可 SEO），管理侧可使用内部 `id`

### 1.2 版本策略（必须）
- P0：在 **header** 中返回版本（不强制在 URL 中体现）：
  - `X-Api-Version: 1`
- 如需破坏性变更：
  - 新增 `X-Api-Version: 2` 并保持 v1 一段时间兼容
  - 或者引入路径版本：`/api/v2/site/**`（需 ADR 记录）
- 禁止无版本控制的破坏性变更（字段删除/语义改变）

### 1.3 编码与序列化
- 编码：UTF-8
- Content-Type：`application/json; charset=utf-8`
- 日期：ISO 8601（UTC，见 4.4）
- 不返回 HTML 片段（除非明确的富文本字段，且需净化与白名单）

### 1.4 语言策略（必须）
- 官网仅支持：`zh-cn`、`en`
- 语言参数优先级：
  1) Query：`?lang=zh-cn|en`
  2) Header：`Accept-Language`（仅作为 fallback）
  3) 默认：`zh-cn`
- 返回中必须包含 `lang` 字段回显，便于排查与缓存区分

### 1.5 Trace / 关联 ID（必须）
- 所有响应必须返回：
  - `X-Request-Id`（若客户端未传则服务端生成）
  - `traceId`（若使用分布式追踪，建议与日志系统一致）
- 客户端可传入：
  - `X-Request-Id`（字符串，长度 ≤ 64，允许字母数字与 `-` `_`）

### 1.6 错误码策略（必须）
- HTTP 状态码用于传达错误类别（4xx/5xx）
- 响应体使用统一错误结构（见第 7 章）
- 不泄露敏感内部信息（SQL、栈、路径、配置）

---

## 2. 数据域与接口清单（Site API）

> 说明：本章为 P0~P1 的典型资源域。具体是否上线由 `docs/requirements/PRD.md` 决定。  
> 规范：所有列表接口必须支持分页（除非明确“全量很小且可缓存”），并提供一致的 filter/sort 规则。

---

### 2.1 Navigation（导航配置）
> 目标：让前端导航可配置化、可双语、可缓存。导航的结构定义与 routeKey 约束以 `docs/specs/ui.md` 为准。

- **GET** `/api/site/navigation?lang=zh-cn|en`
  - Query
    - `lang`（必填）：`zh-cn` | `en`
  - Response：`NavigationDTO`
  - Cache：强缓存 + ETag（建议 1h~24h，按发布频率）

**示例响应（结构示意）**
```json
{
  "lang": "zh-cn",
  "generatedAt": "2026-01-04T00:00:00Z",
  "items": [
    {
      "key": "products",
      "label": "产品与解决方案",
      "href": "/cn/products",
      "type": "group",
      "children": [
        { "key": "servers", "label": "服务器", "href": "/cn/products/servers", "type": "link" }
      ]
    }
  ]
}
```

---

### 2.2 Home Sections（首页楼层数据）
> 目标：支撑“复刻楼层结构”，允许占位图与文案后续替换，但不改变楼层顺序与组件契约。

- **GET** `/api/site/home?lang=zh-cn|en`
  - Response：`PageSectionsDTO`
  - Cache：强缓存 + ETag

---

### 2.3 Products & Solutions（产品与解决方案）
- **GET** `/api/site/products?lang=...&category=...&page=...&size=...&sort=...`
  - 用途：频道页列表（卡片矩阵、筛选、分页）
- **GET** `/api/site/products/{slug}?lang=...`
  - 用途：详情页（如 P1 实现）

---

### 2.4 Resources（资料中心）
- **GET** `/api/site/resources?lang=...&category=...&page=...&size=...&sort=...`
- **GET** `/api/site/resources/{slug}?lang=...`

---

### 2.5 Cases（案例中心）
- **GET** `/api/site/cases?lang=...&industry=...&page=...&size=...&sort=...`
- **GET** `/api/site/cases/{slug}?lang=...`

---

### 2.6 News / Events（新闻/活动，如需要）
- **GET** `/api/site/news?lang=...&type=news|event&page=...&size=...&sort=...`
- **GET** `/api/site/news/{slug}?lang=...`

---

### 2.7 Search（站内搜索，如需要）
> 注意：搜索结果页通常 **noindex**（SEO 策略见 `seo.md`），但 API 仍需可观测与限流。

- **GET** `/api/site/search?lang=...&q=...&page=...&size=...`
  - Query
    - `q`：必填，长度 1~100（可在实现中收紧）
  - Cache：默认不缓存（或仅缓存热门短 TTL），避免泄露与污染

---

### 2.8 Contact（线索/联系，如需要）
- **POST** `/api/site/contact`
  - Content-Type：`application/json`
  - Body：`ContactRequestDTO`
  - Response：`ContactResponseDTO`
  - 安全：必须满足 `security.md` 的反滥用与审计要求（限流/验证码策略/脱敏日志）

**示例请求**
```json
{
  "lang": "zh-cn",
  "name": "张三",
  "email": "a@example.com",
  "company": "某公司",
  "message": "我想了解产品方案",
  "consent": true
}
```

---

## 3. DTO / 字段规范（必须）

### 3.1 通用字段（推荐统一）
所有资源型 DTO 建议统一包含：
- `id`：内部标识（字符串/UUID），对外可选返回
- `slug`：URL 友好标识（对外强烈推荐）
- `lang`：`zh-cn` | `en`（回显）
- `title`：当前语言标题（字符串）
- `summary`：摘要（可选）
- `content`：正文（可选，详见 3.4 富文本策略）
- `coverImage`：封面图（可选）
- `tags`：标签数组（可选）
- `publishedAt` / `updatedAt`（可选，见 4.4）

### 3.2 i18n 字段策略（必须二选一，P0 推荐方案 A）
> 说明：你当前路由为 `/cn` 与 `/en`，API 也按 `lang` 返回对应语言字段，避免前端在同一个 payload 中处理多语言。

- **方案 A（推荐）**：按 `lang` 返回“单语言视图”
  - 返回 `title/summary/content` 为当前语言文本
  - 同时回显 `lang`
  - 优点：payload 小，缓存 key 简单（按 `lang`）
  - 缺点：管理侧需要同时维护两份内容

- 方案 B：返回多语言字段（`titleI18n: { 'zh-cn': '...', 'en': '...' }`）
  - 优点：一次请求获取全语言
  - 缺点：payload 大、缓存复杂、前端容易误用
  - 使用需 ADR

> 默认采用 **方案 A**。若后续引入 CMS 并希望一次返回两种语言，可写 ADR 切换。

### 3.3 slug 规则（必须）
- 字符集：小写字母、数字、`-`
- 长度：3~80
- 全局唯一性：
  - 在同一资源域内（products/resources/cases/news）必须唯一
- 生成策略：
  - 管理侧生成或人工维护（不要由前端临时拼）
  - 变更 slug 需记录重定向规则（SEO 影响）

### 3.4 富文本（严格限制，默认不允许）
- 默认：`content` 为纯文本或结构化 blocks（推荐）
- 若必须返回 HTML：
  - 后端必须净化（白名单）
  - 前端必须谨慎渲染，避免 XSS（见 `security.md`）
  - 需 ADR 说明原因与净化策略

---

## 4. 分页、排序与过滤（必须）

### 4.1 分页（统一约定）
- `page`：从 0 开始（与 Spring Data/JHipster 默认一致）
- `size`：默认 10，最大 50（可按域调整）
- 返回结构统一为：
  - `items: T[]`
  - `page: { number, size, totalElements, totalPages }`

**示例**
```json
{
  "lang": "en",
  "items": [],
  "page": { "number": 0, "size": 10, "totalElements": 0, "totalPages": 0 }
}
```

### 4.2 排序（统一约定）
- `sort`：`field,asc|desc`
- 支持多字段：`sort=publishedAt,desc&sort=title,asc`
- 允许排序字段必须 allowlist（禁止任意字段排序导致性能风险）

### 4.3 过滤（统一约定）
- 简单过滤：使用显式参数（推荐）
  - `category=...`
  - `industry=...`
  - `type=...`
- 复杂过滤（可选，P1 以后）：
  - `filter[field]=value` 或 `filters=` JSON（需 ADR）
- 所有过滤值必须校验长度与字符集（反滥用）

### 4.4 时间与时区规则（必须）
- 服务端存储：UTC
- 返回：ISO 8601（带 `Z`），例如 `2026-01-04T12:00:00Z`
- 前端展示按 locale（zh-cn/en）格式化，不得在 API 中返回“格式化字符串时间”

---

## 5. 缓存策略（必须）

### 5.1 GET 接口缓存原则
- 内容类 GET（navigation/home/products/resources/cases/news）：
  - 支持 `ETag` 与 `If-None-Match`
  - 建议 `Cache-Control: public, max-age=<短 TTL>`（例如 300~3600 秒）
  - CDN 允许缓存（如启用）
- 搜索：
  - 默认 `Cache-Control: no-store`（或短 TTL 且仅对无敏感查询缓存）
- 任何含 PII 的响应：
  - `Cache-Control: no-store`

### 5.2 ETag（推荐）
- ETag 生成方式：
  - 基于内容版本（如 `updatedAt` + 资源域版本）
  - 或基于响应体 hash（注意性能）
- 命中 304 时也必须返回 `X-Request-Id/traceId`

### 5.3 CDN（如适用）
- CDN 缓存 key 必须包含：
  - Path
  - Query（至少 `lang`、分页、过滤、排序）
- CDN 失效策略：
  - 发布内容后可主动 purge（推荐）
  - 或者依赖短 TTL

---

## 6. 错误处理与可观测性（必须）

### 6.1 标准错误结构（强制）
所有错误响应（4xx/5xx）必须遵循：

```json
{
  "timestamp": "2026-01-04T00:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "code": "SITE_INVALID_ARGUMENT",
  "message": "Invalid query parameter: lang",
  "path": "/api/site/products",
  "requestId": "abc-123",
  "traceId": "def-456",
  "details": [
    { "field": "lang", "reason": "must be zh-cn or en" }
  ]
}
```

字段说明：
- `code`：稳定错误码（用于前端分支处理与监控聚合）
- `message`：可读信息（可国际化，P0 可先英文）
- `details`：字段级错误（表单/参数校验）

### 6.2 错误码建议（可扩展）
- `SITE_INVALID_ARGUMENT`：参数错误
- `SITE_NOT_FOUND`：资源不存在
- `SITE_RATE_LIMITED`：限流触发
- `SITE_UNAUTHORIZED` / `SITE_FORBIDDEN`：鉴权失败（未来 console）
- `SITE_INTERNAL`：内部错误（不要泄露细节）
- `SITE_DEPENDENCY_FAILURE`：第三方依赖失败（captcha/analytics 等）

### 6.3 TraceId 返回（必须）
- Header：
  - `X-Request-Id`
- Body：
  - `requestId`、`traceId`
- 日志：
  - requestId/traceId 必须可检索

---

## 7. 安全与限流入口（必须）
- 总则：见 `docs/specs/security.md`
- 本文件额外约束：
  - 所有输入必须校验（长度、字符集、枚举）
  - 列表接口必须对 `size` 设置上限（默认 50）
  - 搜索与表单接口必须启用限流与审计
  - CORS 默认关闭或严格 allowlist（如存在跨域需求需 ADR）

---

## 8. Console/后台预留（未来）

> 说明：仅预留命名空间与基本约束，具体接口在 Console 项目范围确定后补充。

- Base Path：`/api/console/**`
- 鉴权：JWT（见 `security.md` 8 章）
- RBAC：方法级鉴权 + 审计
- 管理内容域：products/resources/cases/news/navigation/home sections 等的 CRUD（不影响 Site API 的稳定性）

---

## 9. 上线前检查清单（P0）

- [ ] 所有 GET 接口可缓存（至少支持 ETag/304），且缓存 key 含 `lang`
- [ ] 所有列表接口分页规则一致（page 0-based，size 上限）
- [ ] 错误响应结构统一（含 requestId/traceId）
- [ ] Contact/Search 等高风险接口具备限流与审计（security.md）
- [ ] 不泄露敏感信息（异常栈、SQL、内部路径）
- [ ] 文档与实现一致：若有变更，必须同步更新本文件与相关 lockfile

