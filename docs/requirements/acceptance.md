# GeeStack（极栈）官网验收标准（复刻 xFusion）

> 文件：`docs/requirements/acceptance.md`  
> 目标：为“严格复刻 xFusion + 全新 GeeStack 品牌替换 + 双语一致 + 交互完整 + 可上线质量门槛”提供 **可勾选、可审计、可回归** 的验收标准。  
> 说明：本文件定义“验收口径与证据要求”。像素级结构与交互参数必须落到对应 `docs/ui-lockfiles/**`，并作为页面级验收的**唯一权威参数来源**。

---

## 0. 验收方法与通过原则（必须）

### 0.1 通过原则
- **必过项（Blocker）**：任一不通过 → 禁止合并到主分支/禁止上线
- **重要项（Major）**：允许合并但必须创建 Issue 并在下一迭代修复（需在 Notes 标记）
- **一般项（Minor）**：可记录在 Notes，集中修复

### 0.2 证据原则（可审计）
- 每个 Page/Feature 的实现必须引用对应 `ui-lockfile`：
  - “无 lockfile 不实现”（见 `AGENTS.md`）
- 每个 PR 必须附：
  - 对应 lockfile 路径
  - 截图/录屏/对比证据（见第 8 章）
  - 关键命令执行结果或替代验证说明（见第 7 章）

### 0.3 验收批次
- **P0（可上线基线）**：全站框架 + 核心频道页 + 双语 + 交互 + 基线 SEO/安全/性能
- **P1（高一致性复刻）**：关键页面“接近像素级”一致，补齐详情页/空态/错误态
- **P2（运营能力）**：内容系统、搜索、下载、线索闭环等

> PR 必须声明其目标批次（P0/P1/P2），并按对应门槛验收。

---

## 1. 验收范围与环境

### 1.1 环境（必须）
- dev：研发自测（可放宽部分安全策略，但不得影响功能验收）
- staging：验收主环境（必须尽量接近 prod：域名、缓存、headers、CDN/WAF）
- prod：上线验证（仅验证发布结果与关键指标，不作为唯一验收环境）

### 1.2 浏览器支持（必须）
- Desktop：
  - Chrome（最新版 - 1）
  - Edge（最新版 - 1）
  - Safari（最新版 - 1，macOS）
- Mobile：
  - iOS Safari（最新版 - 1）
  - Android Chrome（最新版 - 1）

> 若需扩展兼容范围，必须在 PRD/ADR 说明并更新本节。

### 1.3 分辨率与断点（必须）
至少覆盖以下 3 档（可按 UI lockfile 扩展）：
- Mobile：375×812（iPhone 13 级别）
- Tablet：768×1024（iPad 级别）
- Desktop：1440×900（主流笔记本）

> 每个页面 lockfile 如定义更多断点（sm/md/lg/xl），验收必须覆盖其关键断点。

---

## 2. 全站强制验收项（必过）

### 2.1 品牌替换（必过）
- 中文：`超聚变` → `极栈`
- 英文：`xFusion` → `GeeStack`

覆盖范围（按页面与功能实际范围勾选）：
- [ ] Header / MegaMenu / Footer
- [ ] 页面 Title / H1/H2（如存在）
- [ ] CTA 按钮与关键导航文案
- [ ] SEO meta（title/description/OG，如范围包含）
- [ ] 图片 alt / aria-label（如范围包含）
- [ ] 下载/资源名称（如范围包含）
- [ ] 错误页与空态文案（如范围包含）

判定方式：
- 通过：全站可见文本与可访问性标签中无 `超聚变/xFusion`
- 不通过：任一页面仍存在原品牌文本或混用（Blocker）

---

### 2.2 双语一致性（必过）
- 路由前缀与 IA 一致：`/cn/**` 与 `/en/**`
- 同页映射正确：语言切换后仍在“同一 routeKey 的对应页面”
- 关键页面无缺失翻译（不得出现大量中文夹杂英文或反之）
- `<html lang>` 与当前语言一致（SEO/A11y）

判定方式：
- 通过：核心页面中英均可访问、导航一致、关键文案覆盖
- 不通过：缺页、切换错页、lang 不匹配（Blocker）

---

### 2.3 交互完整（必过）
适用于全站通用交互：

- Header/MegaMenu：
  - [ ] hover 展开/高亮逻辑与 lockfile 一致
  - [ ] click 展开/收起逻辑与 lockfile 一致
  - [ ] 点击外部关闭
  - [ ] ESC 关闭
  - [ ] Tab 可达、焦点逻辑正确（focus trap/roving tabindex 按 lockfile）
- Sticky/滚动行为（如有）：
  - [ ] 首页透明/不透明切换规则与 lockfile 一致
  - [ ] 滚动后阴影/背景切换与 lockfile 一致
- 搜索（如范围包含）：
  - [ ] 入口可用、输入/清空/结果态/空态完整
  - [ ] 键盘支持（上下选择/回车/ESC，按 lockfile）

不通过判定：
- 任何“用户可见的主交互路径”无法完成或与 lockfile 明显偏离（Blocker）

---

### 2.4 A11y（必过，最低 WCAG 2.1 AA）
全站最低门槛：

- 键盘可达：
  - [ ] Tab/Shift+Tab 可遍历主要交互元素
  - [ ] 不出现键盘陷阱（除非是有意的 focus trap，并可 ESC 退出）
- 焦点可见：
  - [ ] focus-visible 可见且不被样式覆盖
- 语义结构：
  - [ ] 每页仅 1 个 H1（通常为页面主标题）
- ARIA 合规：
  - [ ] MegaMenu/Modal/Accordion 等使用正确 roles/aria-*（按 ui.md + lockfile）

不通过判定：
- 任一关键页面存在“键盘不可用/焦点不可见/关键组件 ARIA 错误导致不可用”（Blocker）

---

### 2.5 SEO 基线（必过：P0）
- [ ] 每个可索引页面有 title/description（双语）
- [ ] canonical 与 hreflang 正确（zh-CN/en/x-default）
- [ ] robots.txt 与 sitemap.xml 可访问且内容正确（如范围包含）
- [ ] 404 真实返回 404，避免软 404（见 `seo.md`）

不通过判定：
- canonical/hreflang 错乱、robots/sitemap 缺失（若列为 P0 范围）、软 404（Blocker）

---

### 2.6 安全基线（必过：P0）
- [ ] HTTPS 强制（prod/staging）
- [ ] 安全响应头生效（HSTS、nosniff、frame-ancestors/XFO、Referrer-Policy 等）
- [ ] CSP 至少 Report-Only，并已收敛 third-party allowlist（若已引入）
- [ ] Contact/Search 等高风险接口限流与审计（如范围包含）

不通过判定：
- 关键安全 header 缺失、CORS 放开、表单可无限滥用（Blocker）

---

## 3. 复刻一致性验收维度（量化口径）

> 本章的“参数来源”必须来自对应页面/模块 lockfile。  
> 任何偏离必须更新 lockfile 或修正实现；不得只在 Notes 里“承认偏差”。

### 3.1 Layout / Spacing
- [ ] container max-width、左右 padding 与 lockfile 一致
- [ ] gutter、grid columns 与 lockfile 一致
- [ ] section padding（top/bottom）与 lockfile 一致
- [ ] 禁止为占位图修改结构（结构必须优先满足复刻）

### 3.2 Typography
- [ ] nav / H1 / H2 / H3 / body / caption 的 size/weight/line-height 与 lockfile 一致
- [ ] 中英文分别的字体栈与 fallback 一致（如 lockfile 指定）

### 3.3 Color & Theme
- [ ] tokens 驱动；组件内无魔法色值（hex/rgb）
- [ ] CTA / hover / focus / active 的状态色与 lockfile 一致
- [ ] 阴影/圆角与层级一致

### 3.4 Interaction & Motion
- [ ] 动效 duration/easing 与 lockfile 一致
- [ ] scroll/sticky 行为与 lockfile 一致
- [ ] 交互关闭条件（外部点击/ESC）一致

### 3.5 Responsive
- [ ] Mobile / Tablet / Desktop 三档无布局塌陷
- [ ] 关键断点下导航可用（含移动端菜单）
- [ ] 关键图片按断点策略加载（防 CLS）

---

## 4. 页面级验收清单（表格）

> 用法：每次交付一个 Page/Feature，在该表中新增两行（zh-cn/en）并标注结果。  
> 评分建议：`PASS` / `FAIL` / `N/A`，其中必过项不得为 FAIL。

| Page/Feature | Locale | Lockfile | Layout | Typography | Color | Interaction | Responsive | SEO | A11y | Security | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
|  | zh-cn |  |  |  |  |  |  |  |  |  |  |
|  | en |  |  |  |  |  |  |  |  |  |  |

---

## 5. API 与数据一致性验收（如范围包含）

> 若 P0 仅做静态占位，可标注 N/A；一旦接入 Site API，本章适用。

- [ ] `lang` 参数生效且返回 `lang` 回显
- [ ] 列表接口分页规则一致（page 0-based，size 上限）
- [ ] 错误结构统一（含 requestId/traceId）
- [ ] 缓存策略（ETag/Cache-Control）按 `api.md` 生效（如实现）
- [ ] Search/Contact 受限流与反滥用保护（security）

不通过判定：
- lang 错乱、分页不一致、错误结构不统一（Major 及以上，视影响）

---

## 6. 性能验收（P0 必过：关键页面）

> 指标门槛详见 `seo.md`。本章要求“有证据”。

关键页面（P0 最少）：
- [ ] Home（/cn + /en）
- [ ] Products（/cn + /en）
- [ ] Resources（/cn + /en）
- [ ] Cases（/cn + /en）
- [ ] Contact（/cn + /en）
- [ ] Search（如范围包含）

证据要求（至少一种）：
- Lighthouse（移动端）报告截图/导出
- WebPageTest 链接/截图
- 或 CI 中自动化指标输出

不通过判定：
- 关键页面 LCP/CLS/INP 明显超标且无修复计划（Major；若严重则 Blocker）

---

## 7. 工程验收（必过）

必须通过（或在 PR 中说明无法执行的原因与替代步骤）：
- [ ] `npm run lint`
- [ ] `npm run prettier:check`
- [ ] `npm test`
- [ ] 生产构建（如涉及）：`./mvnw -Pprod clean verify`

不通过判定：
- 任一命令失败且未修复（Blocker）

---

## 8. 证据与交付要求（必过）

每个 PR 必须提供：

### 8.1 Lockfile
- [ ] Lockfile 路径（`docs/ui-lockfiles/<page-or-feature>.md`）
- [ ] 若变更已冻结的全局模块（Header/MegaMenu/Footer/LanguageSwitch），lockfile 必须包含变更原因与影响面

### 8.2 截图/录屏（至少）
- [ ] Header/MegaMenu 状态（打开/关闭各 1）
- [ ] 首屏（包含 LCP 元素）
- [ ] Footer
- [ ] 如涉及动效：录屏或 gif（展示 scroll/sticky/展开收起）

### 8.3 命令结果
- [ ] 关键命令输出（lint/test/build）
- [ ] 如无法运行，给出替代验证步骤（例如在 CI 中运行的链接/截图）

---

## 9. 例外处理（必须记录）

任何偏离规范的情况，必须：
- 在 PR 描述中标注为 `Exception`
- 指明：
  - 偏离点
  - 原因
  - 风险
  - 回补计划与截止版本（P0/P1/P2）
- 若属于重大决策：必须新增 ADR

