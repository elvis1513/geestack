# SEO / 性能 / 可访问性 Specs - GeeStack（极栈）官网

> 文件：`docs/specs/seo.md`  
> 适用范围：GeeStack 官网（`app/site/**`）及其对外公开路由（`/cn/**`、`/en/**`）。  
> 目标：在“严格复刻 xFusion 的信息架构与交互体验”的前提下，提供可上线、可持续迭代的 **SEO + Core Web Vitals + A11y** 基线。  
> 说明：本文件定义“全站一致的规则与门槛”。**页面级结构/楼层/首屏 LCP 元素等细节，必须写入对应的 `docs/ui-lockfiles/**`。**

---

## 0. 范围、原则与约束层级

### 0.1 范围（In Scope）
- 公网可访问的站点页面：
  - `/cn/**`（中文）
  - `/en/**`（英文）
- 站点公共功能页：`/search`、`/404`、站点地图等
- 静态资源策略：缓存、压缩、图片/字体加载
- 未来可选：预渲染/SSR（用于提升 SEO 稳定性）

### 0.2 非目标（Out of Scope）
- Console/后台（如未来上线，另起 `docs/specs/console-seo.md` 或在本文件扩展专章）
- 私有 API 文档/管理端点（默认禁止被索引）

### 0.3 约束层级（回顾）
- `AGENTS.md`：工程行为与质量门槛（最高）
- `docs/requirements/**`：范围与验收（方案 B）
- `docs/specs/ui.md`：IA、路由、导航、组件契约、tokens 基线
- `docs/specs/seo.md`：本文件（SEO/性能/A11y 基线）
- `docs/ui-lockfiles/**`：页面/模块复刻锁定（像素/交互/证据）

---

## 1. 站点索引策略与渲染策略（必须明确）

### 1.1 SPA 的 SEO 现实与要求
本项目基于 JHipster + React（SPA）。SEO 的核心风险在于：
- 不同搜索引擎对“JS 执行后渲染”的支持不一致；
- 社交分享爬虫（OG/Twitter）通常不会执行 JS，依赖“首个 HTML 响应”中的 meta。

因此，本项目上线的**最低要求**如下：

- P0（可上线基线）至少满足：
  1) 所有路由返回 200 且可被抓取（反代/服务器必须做 SPA fallback，不返回 404）
  2) `title` 在客户端路由切换后正确更新
  3) `canonical` 与 `hreflang` 策略完整（见第 3 章）
  4) sitemap/robots 可用（见第 4 章）
- 生产级 SEO（推荐，强烈建议）：
  - 对 **首页与核心频道页**（`/cn`、`/en`、`/cn/product`、`/cn/material-center`、`/cn/cases` 及其英文对应）启用 **预渲染（Prerender）或 SSR**，确保 meta/OG/结构化数据可在首个 HTML 响应中被爬虫读取。

> 若暂不做预渲染/SSR，必须在 `docs/adr/**` 记录原因、影响与后续补齐计划（否则视为不满足“生产级 SEO”）。

### 1.2 预渲染/SSR 触发 ADR（必须）
以下任一需求触发时，必须写 ADR：
- 引入 SSR（Next.js、Spring SSR、边缘渲染等）
- 引入预渲染服务（prerender.io、Rendertron、自建 Headless Chrome）
- 引入静态导出（如 react-snap 等）并改变部署方式

---

## 2. Core Web Vitals（性能门槛：必须）

### 2.1 目标指标（生产环境必须达标）
以“移动端（中端设备 + 4G）”为基准，核心页面必须满足：

- **LCP**（Largest Contentful Paint）≤ **2.5s**
- **CLS**（Cumulative Layout Shift）≤ **0.10**
- **INP**（Interaction to Next Paint）≤ **200ms**
- **TTFB**（Time to First Byte）建议 ≤ **800ms**（越低越好）

> 关键页面集合（P0）：首页 + 核心频道页 + Contact + Search（如启用）  
> 每个关键页面必须在对应 `ui-lockfile` 中明确 LCP 目标元素与避免 CLS 的策略。

### 2.2 性能预算（建议基线）
- 首屏 JS（压缩后）建议 ≤ 180KB（移动端）
- 首屏 CSS（压缩后）建议 ≤ 60KB
- 首屏关键图片：
  - 1 张主视觉（可含响应式 source set）
  - 体积尽量 ≤ 200KB（WebP/AVIF 优先）
- 第三方脚本：
  - P0 尽量 0；如必须引入，需在 lockfile 中明确影响与降级策略

> 若预算不现实，可在 ADR 中调整，但不得无记录扩张。

### 2.3 性能落地规则（必须）
- 图片：
  - 非首屏默认 `loading="lazy"`
  - 首屏 LCP 图禁止 lazy；必要时 `preload`
  - 必须设置 `width/height` 或 `aspect-ratio`，防 CLS
  - 优先 WebP/AVIF；PNG/JPG 仅在必要时使用
- 字体：
  - 控制字体文件数量；支持 `font-display: swap`
  - 仅预加载必要字重；避免加载过多变体
- 代码分割：
  - 路由级 lazy loading（核心页面可按策略预取）
  - 严禁将所有页面一次性打包进首屏
- 缓存：
  - 带 hash 的静态资源：`Cache-Control: public, max-age=31536000, immutable`
  - HTML：不做长期缓存（避免旧入口与旧 meta）
- 压缩：
  - 生产必须启用 gzip 或 brotli（推荐 brotli）
- 资源提示（按需）：
  - `preconnect`：对必须的第三方域名
  - `prefetch`：对下一跳核心资源（谨慎，避免抢占带宽）

---

## 3. 国际化 SEO（/cn 与 /en 的 canonical + hreflang：强制）

### 3.1 URL 策略（强制）
- 中文：`/cn/...`
- 英文：`/en/...`
- `/`：301 → `/cn`（默认中文）
- 禁止通过 query 参数切换语言（例如 `?lang=en`），以免索引混乱。

### 3.2 Canonical（强制）
- 每个页面必须设置 canonical，指向“当前语言的规范 URL”：
  - `/cn/product` 的 canonical 只能指向 `/cn/product`
  - `/en/product` 的 canonical 只能指向 `/en/product`
- 禁止把 `/cn/*` canonical 指向 `/en/*` 或反之（除非该页面在某语言不存在，并在 lockfile/ADR 说明）。

### 3.3 hreflang（强制）
每个可索引页面必须声明多语言版本：

- `hreflang="zh-CN"` → 对应中文 URL
- `hreflang="en"` → 对应英文 URL
- `hreflang="x-default"` → 默认入口（建议指向 `/cn` 或语言选择页，如未来实现）

规则：
- 必须“成对出现”（cn/en 同时声明），避免搜索引擎误判重复内容
- 若某页面某语言版本缺失：
  - 必须在该页面 lockfile 中说明，并在 hreflang 中仅声明存在的版本，同时保持 canonical 自洽

### 3.4 语言切换与 SEO 一致性（强制）
- 切换语言后必须：
  - 更新 `<html lang="zh-CN">` 或 `<html lang="en">`
  - 更新 title/description（见第 5 章）
  - 更新 canonical 与 hreflang
- 同页映射的依据必须为 `routeKey`（来自 `site/navigation/**`），不得用简单字符串替换 `/cn`→`/en`。

---

## 4. Robots 与 Sitemap（必须）

### 4.1 robots.txt（必须）
- 生产环境提供 `/robots.txt`
- 默认允许抓取站点页面，默认禁止索引管理/内部端点（按实际路径调整）：
  - `Disallow: /api/`（如有）
  - `Disallow: /management/`、`/swagger-ui/`、`/v3/api-docs/`（如存在）
  - `Disallow: /*?*`（谨慎，若站内大量 query 页面会影响索引；需按实际策略）
- 必须声明 sitemap 位置：
  - `Sitemap: https://<domain>/sitemap.xml`

> 若存在多 sitemap（分语言/分模块），可提供 sitemap index（推荐）。

### 4.2 sitemap.xml（必须）
- 生产环境提供 `/sitemap.xml` 或 `/sitemap-index.xml`
- sitemap 必须覆盖：
  - 所有可索引页面（cn + en）
  - 404、内部页、占位页（如 noindex）不应进入 sitemap
- 每条 url 建议包含：
  - `<loc>`
  - `<lastmod>`（内容变更时更新）
  - `<changefreq>`、`<priority>`（可选，需一致）

---

## 5. Meta（Title/Description）与社交分享（OG/Twitter）

### 5.1 Title 规则（强制）
- 每个页面必须有独立 Title，且双语对应。
- Title 结构建议：
  - 首页：`极栈 GeeStack - <核心价值主张>`（文案由需求/内容定义）
  - 频道页：`<频道名> - 极栈 GeeStack`
  - 详情页：`<内容标题> - <频道> - 极栈 GeeStack`
- 长度建议：
  - 中文：≤ 28~32 字（避免截断）
  - 英文：≤ 55~60 字符

> 具体页面标题文案写入 lockfile 或内容系统；本文件只约束格式与策略。

### 5.2 Description 规则（强制）
- 每个页面必须提供 meta description（双语）
- 长度建议：
  - 中文：≤ 80~110 字
  - 英文：≤ 150~160 字符
- 禁止关键词堆砌；描述应与页面主体一致（避免误导与降权）

### 5.3 Open Graph（OG）（强制）
每个可分享页面必须提供：
- `og:title`
- `og:description`
- `og:type`（website/article 等，按内容）
- `og:url`（当前语言 canonical URL）
- `og:image`（建议 1200×630，或按设计系统定义）
- `og:locale`（中文可用 `zh_CN`；英文 `en_US` 或 `en_GB` 按策略统一）

> 若未准备真实图片，可先使用站点默认分享图，但结构必须完整。默认分享图路径与规则需在 lockfile 或内容配置中锁定。

### 5.4 Twitter Card（建议）
- `twitter:card`：`summary_large_image`
- `twitter:title`、`twitter:description`、`twitter:image`

---

## 6. 结构化数据（Structured Data：建议基线）

> 结构化数据建议使用 JSON-LD，且必须与页面内容一致。

### 6.1 全站（建议）
- Organization：
  - name：极栈 / GeeStack
  - url
  - logo（若有）
  - sameAs（若有社媒）
- WebSite + SearchAction（若站内搜索对公网开放）
  - search target：`/cn/search?q={search_term_string}` 与英文对应

### 6.2 页面级（按需）
- BreadcrumbList（推荐：所有非首页页面）
- Article（新闻/活动详情，如实现）
- Product（产品详情，如实现；注意与实际产品信息一致）

> 若 P0 暂不实现详情页，可先只做 Organization 与 BreadcrumbList。

---

## 7. 可访问性（A11y：上线门槛，至少 WCAG AA）

### 7.1 基线要求（必须）
- 键盘可达：所有交互元素可 Tab 到达、可操作
- 可见焦点：focus-visible 必须可见且与站点风格一致（不得移除 outline 而无替代）
- 语义结构：页面必须有且仅有一个 H1（通常为页面主标题）
- 图片：
  - 信息性图片必须有准确 alt
  - 装饰性图片 alt 为空（`alt=""`）
- 对比度：文本与背景对比度至少满足 WCAG AA
- 弹层（Menu/Modal/Search）：
  - focus trap
  - ESC 关闭
  - aria 属性正确

### 7.2 常见组件要求（必须）
- Header/MegaMenu：ARIA 与键盘规则以 `ui.md` 与对应 lockfile 为准
- 表单：label 绑定、错误提示 aria-describedby、必填标识清晰
- 链接：可识别（不要只靠颜色区分），hover/focus 状态明显

---

## 8. 内容与信息架构对 SEO 的约束（必须）

### 8.1 Heading 规则（强制）
- 每页必须严格遵守：
  - 1 个 H1（页面主标题）
  - H2/H3 按楼层与模块层级递进
- 禁止为了“看起来更大”滥用 H 标签；视觉大小应由 tokens/typography 控制。

### 8.2 内链与导航（强制）
- 主导航与 Footer sitemap 必须可被爬虫遍历（不是纯 JS 黑箱）
- 面包屑（如启用）：
  - 必须反映真实层级
  - 建议配 BreadcrumbList 结构化数据

### 8.3 404 与软 404（必须）
- 不存在页面必须返回 404（服务端层面）
- SPA fallback 不得造成“所有未知路径都返回 200 且显示 404 文案”但不返回 404 状态（这会导致软 404）。
  - 需要结合后端/反代策略实现“路由存在返回 200、路由不存在返回 404”的机制（可在 ADR 记录具体实现）。

---

## 9. 测量、门槛与自动化（建议强制）

### 9.1 测量基线（必须）
- Lighthouse（移动端）：
  - Performance ≥ 80（P0），≥ 90（P1）
  - SEO ≥ 90
  - Accessibility ≥ 90
  - Best Practices ≥ 90
- Core Web Vitals 以真实环境与合成测试结合：
  - 合成：Lighthouse / WebPageTest
  - 真实：RUM（如未来引入，需 ADR）

### 9.2 PR 证据要求（建议纳入 DoD）
对关键页面的变更，PR 必须附：
- 关键视口截图（375/1024/1440 至少两档）
- LCP/CLS 风险点说明（若涉及首屏/图片/字体）
- 若引入第三方脚本：说明影响与降级策略

---

## 10. 落地位置（Implementation Mapping）

> 目的：明确“该在哪里实现这些规则”，减少实现阶段争议。

- Title/Description/Canonical/hreflang/OG：
  - 前端路由层统一封装（建议 `app/site/entry/**` 提供 Meta 管理器）
  - 若引入 `react-helmet-async` 等依赖：需 ADR（新增依赖）
- robots.txt / sitemap.xml：
  - 后端静态资源提供或由反代直接托管（按部署决定）
- 预渲染/SSR：
  - 由 ADR 定方案与部署路径
- 性能（缓存/压缩/headers）：
  - 优先由反代/网关统一处理（Nginx/Ingress/CDN）
- 404 状态码与软 404：
  - 反代路由策略 + 后端路由兜底共同保证

---

## 11. 上线前检查清单（必须全部满足）

- [ ] `/cn/**` 与 `/en/**` 路由可被抓取（200/404 状态码正确，避免软 404）
- [ ] 每个页面都有 title/description，且双语一致可维护
- [ ] canonical 与 hreflang 正确（zh-CN/en/x-default）
- [ ] `/robots.txt` 与 `/sitemap.xml` 可访问且内容正确
- [ ] 关键页面满足：LCP ≤ 2.5s、CLS ≤ 0.10、INP ≤ 200ms（至少合成测试达标）
- [ ] 首屏 LCP 元素已在对应 `ui-lockfile` 声明，并落实 preload/lazy 策略
- [ ] 图片均设置尺寸（width/height 或 aspect-ratio），无明显 CLS
- [ ] A11y 基线满足（键盘可达、focus-visible、H1 唯一、alt 合规）
- [ ] 若未做预渲染/SSR：已在 ADR 记录影响与补齐计划（生产级 SEO 例外）
