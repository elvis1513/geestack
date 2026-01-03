# UI Specs - GeeStack（极栈）官网（复刻 xFusion）

> 文件：`docs/specs/ui.md`  
> 适用范围：`src/main/webapp/app/site/**`（官网域）  
> 约束层级：见 `AGENTS.md`（本文件属于 specs 的权威输入）  
> 参考站点（仅用于结构/布局/交互对齐）：
> - 中文：https://www.xfusion.com/cn
> - 英文：https://www.xfusion.com/en
>
> 说明：本文件以“可工程化落地”为第一目标，**不在仓库内直接粘贴对方站点的大段原文**。需要对齐的具体文案、精确布局数值、动效参数，请写入 `docs/ui-lockfiles/**`。

---

## 0. 术语与硬原则（必须遵守）

### 0.1 术语
- **Site / 官网**：GeeStack（极栈）对外官网（本项目核心交付），只允许落在 `app/site/**`。
- **Legacy UI**：JHipster 生成或仓库现有的前端页面/布局/风格/组件组织方式（不可参考、不可复用 UI）。
- **UI Lockfile**：对“某页面/模块”的结构、布局、交互、tokens 映射与验收点进行锁定的文档，路径 `docs/ui-lockfiles/**`。
- **Tokens（设计令牌）**：颜色/字体/间距/阴影/圆角/动效等设计参数的唯一来源，路径 `app/site/theme/**`。

### 0.2 复刻定义（三层）
- **结构复刻**：IA、路由层级、页面楼层顺序、Header/MegaMenu/Footer 组件树、组件职责边界。
- **视觉复刻**：颜色、排版、间距密度、阴影层级、圆角等，由 tokens 驱动并与 lockfile 对齐。
- **交互复刻**：菜单展开、滚动吸顶、搜索弹层、语言切换、hover/focus/active、动效参数等，与 lockfile 对齐。

### 0.3 品牌替换（硬规则）
- 中文：**“超聚变” → “极栈”**
- 英文：**“xFusion” → “GeeStack”**
- 覆盖范围：页面标题、导航、按钮、页脚、SEO meta、图片 alt、结构化数据、资源标题（如有）。

---

## 1. 信息架构（IA）与路由

### 1.1 语言与 URL 体系（强制）
- 支持语言：`zh-cn`、`en`。
- URL 前缀：
  - 中文：`/cn`
  - 英文：`/en`
- 根路径 `/`：
  - **301 重定向到** `/cn`（默认中文）。
- 语言切换：
  - 优先切换到“同页映射”的目标语言路径；若无映射，跳转到目标语言首页。
- 兼容路径（用于外链/历史链接）：
  - `/static/cn/material-center` → 301 到 `/cn/material-center`
  - `/static/cn/cases` → 301 到 `/cn/cases`

> 注意：如后续确认参考站点存在更多静态路径，需要在相应 lockfile 或 ADR 中补充兼容列表，并明确是否保留。

### 1.2 路由命名规则（强制）
- Path：kebab-case（例如 `/cn/how-to-buy`）。
- 页面组件：`XxxPage`（例如 `HowToBuyPage`）。
- 路由常量集中管理：`app/site/routes/**`，禁止在页面 JSX 里散落硬编码 path。

### 1.3 Site Map（P0 基线）
> 本节锁定“结构级 IA”。页面楼层与内容块以 `docs/ui-lockfiles/**` 为准。

#### 1.3.1 zh-cn（`/cn`）
- `/cn`：Home（首页）
- `/cn/product`：产品与解决方案（频道页）
- `/cn/material-center`：资料中心（频道页）
- `/cn/cases`：案例中心（频道页）
- `/cn/how-to-buy`：如何购买（信息页/频道页）
- `/cn/contact-us`：联系我们
- `/cn/service`：服务（聚合页/入口页）
- `/cn/partners`：合作伙伴（聚合页/入口页）
- `/cn/support`：技术支持（入口页；若外链 support 站点，需在 lockfile 说明）
- `/cn/about`：关于极栈（聚合页）
- `/cn/news`：新闻与活动（聚合页；如 P0 不做列表/详情，可先做入口页）
- `/cn/search`：搜索结果页
- `/cn/404`：404

#### 1.3.2 en（`/en`）
- `/en`：Home
- `/en/product`：Products and Solutions
- `/en/material-center`：Resources
- `/en/cases`：Cases
- `/en/how-to-buy`：How to Buy
- `/en/contact-us`：Contact Us
- `/en/service`：Services
- `/en/partners`：Partners
- `/en/support`：Technical Support
- `/en/about`：About GeeStack
- `/en/news`：News and Events
- `/en/search`：Search result
- `/en/404`：404

### 1.4 导航与路由映射（强制表）
> 导航的“文本内容/层级结构/分组顺序”必须来自 `site/navigation/**` 配置，并在对应 lockfile 中锁定。
> 下表锁定 nav key、路由与页面组件命名（工程约束）。

| Nav Key | zh-cn 文本（来自 i18n） | en 文本（来自 i18n） | Route（zh / en） | Page Component |
|---|---|---|---|---|
| `nav.home` | `site.nav.home` | `site.nav.home` | `/cn` / `/en` | `HomePage` |
| `nav.product` | `site.nav.product` | `site.nav.product` | `/cn/product` / `/en/product` | `ProductLandingPage` |
| `nav.resources` | `site.nav.resources` | `site.nav.resources` | `/cn/material-center` / `/en/material-center` | `ResourcesLandingPage` |
| `nav.cases` | `site.nav.cases` | `site.nav.cases` | `/cn/cases` / `/en/cases` | `CasesLandingPage` |
| `nav.howToBuy` | `site.nav.howToBuy` | `site.nav.howToBuy` | `/cn/how-to-buy` / `/en/how-to-buy` | `HowToBuyPage` |
| `nav.services` | `site.nav.services` | `site.nav.services` | `/cn/service` / `/en/service` | `ServicesLandingPage` |
| `nav.partners` | `site.nav.partners` | `site.nav.partners` | `/cn/partners` / `/en/partners` | `PartnersLandingPage` |
| `nav.support` | `site.nav.support` | `site.nav.support` | `/cn/support` / `/en/support` | `SupportLandingPage` |
| `nav.about` | `site.nav.about` | `site.nav.about` | `/cn/about` / `/en/about` | `AboutLandingPage` |
| `nav.news` | `site.nav.news` | `site.nav.news` | `/cn/news` / `/en/news` | `NewsLandingPage` |
| `nav.contact` | `site.nav.contact` | `site.nav.contact` | `/cn/contact-us` / `/en/contact-us` | `ContactUsPage` |
| `nav.search` | `site.nav.search` | `site.nav.search` | `/cn/search` / `/en/search` | `SearchResultPage` |

### 1.5 Navigation Schema（强类型契约：必须实现）
> 目的：让 MegaMenu、移动端抽屉、Footer sitemap、同页语言映射都由同一份数据源驱动，避免实现分裂。  
> 落位：`app/site/navigation/**`（配置）+ `app/site/types/**`（类型）

强制字段约束（示例 TypeScript）：

```ts
export type Locale = 'zh-cn' | 'en';

export type RouteKey =
  | 'home'
  | 'product'
  | 'material-center'
  | 'cases'
  | 'how-to-buy'
  | 'contact-us'
  | 'service'
  | 'partners'
  | 'support'
  | 'about'
  | 'news'
  | 'search'
  | '404';

export type HrefByLocale = Record<Locale, string>;

export interface FeaturedCard {
  key: string;              // 稳定 id（用于渲染 key/埋点/测试）
  titleKey: string;         // i18n key（site.*）
  descKey?: string;         // i18n key（可选）
  href: HrefByLocale;       // 必须双语齐全
  image?: { src: string; altKey: string }; // 占位图允许为空，但结构必须保留
}

export interface NavItem {
  key: string;              // 稳定 id（禁止随意改名）
  labelKey: string;         // i18n key（site.nav.*）
  routeKey: RouteKey;       // “同页映射”的唯一锚点（两种语言一致）
  href: HrefByLocale;       // 必须双语齐全
  external?: boolean;       // 外链
  children?: Array<NavGroup | NavItem>;
  featured?: FeaturedCard[];// MegaMenu 右侧推荐卡片（可选）
  analyticsId?: string;     // 埋点（可选，但若启用则必须稳定）
}

export interface NavGroup {
  key: string;
  titleKey: string;         // i18n key
  children: NavItem[];
}

export interface PrimaryNavConfig {
  locale: Locale;           // 生成时可按 locale 导出，但底层数据必须可双语映射
  items: NavItem[];
}
```

硬规则：
- `routeKey` 必须作为“同页语言映射”的唯一依据；不得用“字符串替换 /cn 为 /en”当映射策略。
- `href[zh-cn]` 与 `href[en]` 必须同时存在；若某语言不开放该入口，必须在配置层显式标记并在 lockfile/acceptance 说明处理策略（隐藏或说明页）。
- Footer sitemap 不得维护第二份“独立链接树”；必须复用同一份 navigation 数据或由其派生（同源）。

---

## 2. 全局布局规范（Layout）

### 2.1 Header（Top Bar）与 MegaMenu（强制）
> Header/MegaMenu 是“复刻最敏感区域”，必须优先锁定 `docs/ui-lockfiles/header-megamenu.md`。

#### 2.1.1 Header 结构（Desktop）
- 左：品牌区
  - Logo（图形 + 文本可选），点击跳转当前语言首页（`/cn` 或 `/en`）。
- 中：主导航（Top Nav）
  - 导航项来自 `site/navigation/**`，只读配置驱动。
- 右：工具区（Actions）
  - Search icon（打开搜索弹层）
  - Language switch（zh-cn/en）
  - 可选：Portal / Console（若 P0 不做，禁止显示死链）
  - 可选：Digital Assistant（如 P0 不做智能对话，可实现“帮助面板入口”，但必须同风格）

#### 2.1.2 Header 状态机（必须实现并测试）
- `Default`：页面顶部初始态
  - 首页：允许“透明/半透明”方案（以 lockfile 锁定）。
  - 内页：默认实体背景（以 tokens 取值）。
- `ScrolledSticky`：滚动吸顶态
  - 触发：`scrollY > 16px`（可在 lockfile 覆盖）
  - 行为：sticky + 背景实体色 + 阴影出现（全部 tokens 化）。
- `MenuOpen`：MegaMenu 打开态
  - 行为：遮罩 overlay + body scroll lock + focus trap。
- `MobileNavOpen`：移动端抽屉/全屏菜单打开态
  - 行为：遮罩 + body scroll lock + 分组折叠（Accordion）。

#### 2.1.3 MegaMenu 信息结构（配置驱动，强类型）
- MegaMenu 数据必须来自 `site/navigation/**`：
  - 一级：Top Nav
  - 二级：面板分组（Group）
  - 三级：列表项（Item）
  - 可选：推荐卡片（Featured Cards）
- 结构要求：
  - Desktop：全宽面板（Full-width panel），内部使用栅格布局（列数/间距由 tokens 与 lockfile 锁定）
  - Mobile：分组折叠（Accordion），保留层级一致性

> 注意：具体“有哪些分组/分组顺序/推荐卡片是否存在”属于复刻范围，必须写入对应 lockfile。

#### 2.1.4 交互规则（Desktop）
- 打开触发：
  - Hover：鼠标移入 top nav item `80ms` 后打开（防抖）
  - Click：点击也应打开（与 hover 同效果）
- 关闭条件（任一满足即关闭）：
  - 点击遮罩层
  - 点击面板外区域
  - 按下 `ESC`
  - 鼠标移出 nav + panel 区域 `120ms` 后关闭（防抖；阈值可在 lockfile 锁定）
- 打开时行为：
  - body scroll lock
  - focus trap 生效
  - 触发项进入 active 状态

#### 2.1.5 键盘与焦点管理（强制）
- Tab 顺序（Desktop）：
  - Logo → Top Nav（从左到右）→ Search → Language → 其他
- MegaMenu 打开后：
  - `ESC` 关闭并把焦点还给触发项
  - 焦点不逃逸（focus trap）
- 建议实现（提升一致性）：
  - Left/Right：在一级 nav 之间切换
  - Up/Down：在面板列表内切换

#### 2.1.6 ARIA（强制）
- Primary nav：`<nav aria-label="Primary">`
- 触发按钮：
  - `aria-haspopup="true"`
  - `aria-expanded`
  - `aria-controls`
- 面板容器：
  - `role="dialog"`（推荐）+ 合理 label（如 `aria-label="Products menu"`）
  - 或 `role="menu"`（如使用 menu 语义，则必须配套 keyboard 规则）

---

### 2.2 Footer（强制）
> Footer 的结构与站点地图栏目必须锁定 `docs/ui-lockfiles/footer.md`。

#### 2.2.1 Footer 结构
- 上区：站点地图（多列 Columns）
  - 分组来自配置（`site/navigation/**` 或 `site/content/footer/**`）
  - 分组标题与链接文本走 i18n（`site.footer.*`）
- 下区：底部条（Bottom bar）
  - 法务链接：Terms / Privacy（若没有页面，则隐藏；禁止死链）
  - 版权与备案（如需要）
  - 社媒 icon（若未配置则隐藏）

#### 2.2.2 中英一致性
- zh-cn 与 en 的栏目结构保持一致（允许“部分链接仅某语言展示”，但必须在 lockfile 标注原因）。

---

### 2.3 搜索（P0 是否启用必须明确）
> 搜索通常为“复刻体验关键点”。若 P0 不做真实检索，可先做 UI 完整 + mock 数据，但交互必须完整。

#### 2.3.1 入口
- Header 工具区 Search icon
- 可选快捷键：`Cmd+K / Ctrl+K` 或 `/`（如启用必须写入 lockfile）

#### 2.3.2 搜索弹层（Search Modal）
- 展现：遮罩 + 居中面板（或全屏面板），以 lockfile 锁定。
- 必备区块：
  - 输入框 + clear
  - History（按语言分别存储）
  - Popular（配置驱动，可为空）
  - Recommended（配置驱动，可为空）
- 关闭方式：
  - ESC
  - 点击遮罩
  - 关闭按钮
- A11y：
  - focus trap
  - `aria-modal="true"`（若用 dialog）
  - 首次打开焦点落在输入框

#### 2.3.3 搜索结果页（`/cn/search`、`/en/search`）
- URL：`?q=...`
- 必备状态：
  - Loading
  - Empty
  - Error（带重试）
  - Results
- 结果分组建议（按站点内容域）：
  - Products / Solutions
  - Resources
  - Cases
  - News（如启用）

---

### 2.4 语言切换（zh-cn / en）（强制）
- 入口：Header 工具区 + 移动端菜单中同位入口
- 只提供两项：
  - `简体中文`
  - `English`
- 切换行为：
  - 同页映射优先；无映射则跳转到目标语言首页
- 切换后必须：
  - 更新 `<html lang="...">`
  - 更新 hreflang/canonical（详见 `docs/specs/seo.md`）

---

## 3. Layout Metrics 基线（断点 / 版心 / 栅格：必须补齐并 tokens 化）

> 目的：统一全站密度，避免不同页面“看起来不像同一个站”。  
> 要求：本章定义“默认策略与约束口径”；精确像素值可落到 `tokens` 或对应 lockfile，但不得在页面/组件中写魔法值。

### 3.1 断点（Breakpoints）
- 必须定义并在 `tokens` 输出：
  - `xs`（手机）
  - `sm`（大屏手机/小平板）
  - `md`（平板）
  - `lg`（小桌面）
  - `xl`（桌面）
  - `2xl`（大桌面）
- 规则：
  - 断点命名必须全站唯一；不得在某页面自行新增 `desktopLarge` 这类私有断点。
  - 所有响应式行为（Header/MegaMenu/栅格/section padding）均以这些断点为准。

### 3.2 版心（Container）与左右留白策略
- 默认采用“中心版心 + 最大宽度”策略（max-width 由 tokens 定义）。
- Header/Footer：
  - 背景可全宽，但内容必须与版心对齐（除非 lockfile 明确要求全宽内容）。
- MegaMenu：
  - 面板背景全宽；内容默认按版心对齐（列数/内容宽度由 lockfile 锁定）。
- Section（楼层）：
  - 默认：`padding-inline` 与 `padding-block` 走 tokens 阶梯，并随断点变化（由 tokens/lockfile 定义）。

### 3.3 栅格（Grid）基线
- 默认采用 12 列栅格（推荐，便于复刻类似站点布局）。
- 必须 tokens 化的栅格指标：
  - `grid-columns`（默认 12）
  - `grid-gutter`（列间距）
  - `grid-row-gap`（行间距，若使用）
- 规则：
  - 页面不得私自定义“13 列”或“任意列宽”布局；特殊布局必须通过 lockfile 记录并说明原因。
  - 所有卡片列表（cards/list/tiles）必须使用统一的 grid 工具组件（见第 4 章）。

### 3.4 垂直节奏（Vertical Rhythm）基线
- 每个页面必须呈现一致的“楼层间距节奏”（默认由 tokens 给出一组 section gap）。
- 规则：
  - Section 间距不得在页面里用任意 `margin-top: 72px` 解决。
  - 若某页面需要更紧凑/更松散节奏，必须在该页面 lockfile 中显式锁定（按断点）。

---

## 4. 组件分层与目录落位（与 AGENTS 对齐）

### 4.1 目录职责（强制）
- `app/site/entry/**`：站点入口容器（theme/locale/router/error boundary）
- `app/site/routes/**`：路由常量、路由表、lazy loading
- `app/site/layout/**`：Header/MegaMenu/Footer/SearchModal/LanguageSwitch/Breadcrumb
- `app/site/pages/**`：页面目录（每页一个目录）
- `app/site/sections/**`：跨页面复用楼层（Hero/Feature/CTA/Carousel 等）
- `app/site/components/**`：通用展示组件（Button/Card/Tabs/Modal 等）
- `app/site/navigation/**`：导航配置（强类型 + 双语映射）
- `app/site/theme/**`：tokens、css variables、typography、motion
- `app/site/styles/**`：样式层（必须引用 tokens）
- `app/site/api/**`：站点 API 封装（页面不得拼 URL）
- `app/site/content/**`（建议）：配置驱动内容（popular searches、footer links 等）

### 4.2 Import 边界（硬规则）
- `app/site/**` 禁止 import：
  - `app/entities/**`
  - `app/admin/**`
  - 旧 `shared/layout/**`（如存在）
  - `app/legacy/**`（如存在）
- 若需共享能力，只能经由 `app/platform/**`（且不得引入 UI 风格耦合）。

### 4.3 基础组件契约（Component Contract：必须建立）
> 目的：避免页面私建组件导致风格漂移与重复实现。  
> 规则：凡是跨页面出现 2 次及以上的通用 UI，必须上移到 `app/site/components/**` 或 `app/site/sections/**`。

#### 4.3.1 必须提供的基础组件（最小集合）
以下组件必须在 `app/site/components/**` 建立并复用（命名可微调，但职责不可拆散）：
- `Button`：支持 `variant/size/disabled/loading/icon`，focus-visible 样式一致
- `Link`：统一处理站内/外链、`rel/target`、hover/active/focus
- `Icon`：统一 svg 渲染、尺寸阶梯（16/20/24/32…由 tokens 定义）
- `Container`：统一版心 max-width 与左右 padding
- `Section`：统一 section vertical padding 与标题区排版（可接受 props 覆盖但必须 tokens 化）
- `Grid`：统一 12 列栅格、gutter、响应式列数切换
- `Card`：统一 surface/bg/border/shadow/radius 与交互态
- `Tabs`、`Accordion`：统一交互与 a11y（ARIA、键盘）
- `Modal` / `Dialog`：统一 overlay、focus trap、ESC、body scroll lock
- `Drawer`：移动端抽屉（用于 MobileNav、过滤器等）
- `Breadcrumb`：面包屑（如 IA 要求出现）
- `Pagination`：列表分页（如有列表页）

#### 4.3.2 页面私有组件限制
- 页面目录 `pages/<page>/components/**` 只能存放“该页面私有的组合件/特化组件”，不得重新实现 Button/Card/Grid 等基础能力。
- 若出现“页面私有基础组件”，必须在 PR 中解释原因，并在下一次迭代上移合并（写入 TODO 与 issue）。

---

## 5. 交互与动效规范（必须 tokens 化）

### 5.1 交互状态（统一）
- 所有可交互组件必须实现：
  - default / hover / active / focus-visible / disabled
- focus-visible 必须可见且符合站点风格（不可去掉 outline 而无替代）。

### 5.2 Motion Tokens（强制）
- 动效参数必须来自 tokens（禁止在组件内写魔法值）：
  - duration：fast/base/slow
  - easing：standard/emphasized
- MegaMenu/SearchModal：
  - open/close 必须可中断（快速切换不抖动）
  - overlay 的 fade 与 panel 的 translate/scale 组合，以 lockfile 锁定

### 5.3 Scroll 行为（强制明确）
- Header sticky 触发默认：`scrollY > 16px`（可在 lockfile 覆盖）
- 滚动时不得造成 CLS（例如高度变化必须平滑且不推挤内容）

### 5.4 Reduced Motion（强制）
- 尊重 `prefers-reduced-motion`
  - 降低/关闭非必要动画
  - 保留必要状态切换（不影响可用性）

---

## 6. 主题与设计令牌（Tokens）

### 6.1 Tokens 产物（强制）
- `app/site/theme/` 必须包含：
  - `tokens.css`：导出 CSS variables（唯一权威）
  - `tokens.ts`（可选）：TS 访问封装（如需要）
  - `typography.*`：字号阶梯与文本样式映射
  - `motion.*`：动效 tokens
  - `breakpoints.*`：断点定义（如以 TS 驱动）
- CSS variables 前缀：`--gs-`

### 6.2 Token 分类（必须覆盖）
- colors：bg/surface/text/muted/border/primary/primary-hover/focus/overlay
- typography：font-family、scale（H1/H2/H3/body/caption/nav/button）、line-height、font-weight
- spacing：阶梯（如 0/2/4/8/12/16/24/32/48/64…）
- radius：sm/md/lg/xl/2xl
- shadow：sm/md/lg
- z-index：header/overlay/modal/toast
- motion：duration/easing
- layout metrics：breakpoints/container/grid/gutter（见第 3 章）

### 6.3 禁止魔法值（硬规则）
- 组件与页面中禁止直接写：
  - hex/rgb 颜色
  - 任意 px 间距/圆角/阴影
  - transition duration/easing
- 允许例外（必须注释并在 lockfile 记录）：
  - 与图片比例/容器尺寸强绑定的结构性尺寸（仍建议 tokens 化）

---

## 7. 媒体与图片占位规范（性能与结构一致性）

### 7.1 占位图规则
- 允许占位图，但**不得为了占位图调整布局结构**（栅格列数、banner 高度、卡片比例等必须按 lockfile）。
- 所有图片必须具备明确比例与尺寸策略（防 CLS）。

### 7.2 防 CLS（强制）
- `<img>` 必须提供 `width/height` 或 `aspect-ratio`
- 轮播/首屏 banner：必须锁定容器高度策略（按断点在 lockfile 写明）
- 非首屏默认 `loading="lazy"`
- 首屏 LCP 图禁止 lazy，必要时 preload（详见 `seo.md`）

### 7.3 LCP 目标元素（强制声明）
- 首页 LCP 元素必须在 `docs/ui-lockfiles/home.md` 声明（例如首屏 Hero 的主视觉/标题块）。
- 任何导致 LCP 目标变化的调整都必须更新 lockfile 与验收项。

---

## 8. 文案与 i18n 规则

### 8.1 i18n Key 命名（强制）
- 官网统一前缀：`site.*`
- 导航：`site.nav.*`
- Footer：`site.footer.*`
- 通用按钮/文案：`site.common.*`
- 页面级：`site.pages.<page>.*`

### 8.2 Fallback 策略（强制）
- 默认语言：zh-cn
- 若某 key 缺失：
  - 开发环境：必须可见告警（例如显示 `[MISSING] key`）
  - 生产环境：fallback 到默认语言 key（但必须记录缺失并修复）

### 8.3 内容落位
- 结构型内容（导航树、footer 链接、popular searches）：放 `site/navigation/**` 或 `site/content/**`
- 大段内容（若未来需要）：优先后端驱动或 markdown 内容系统（需 ADR）

---

## 9. SEO/性能/A11y 对接入口
- SEO / Meta / hreflang / sitemap / robots：见 `docs/specs/seo.md`
- 性能预算（LCP/CLS/INP）与测量方法：见 `docs/specs/seo.md`
- 安全（CSP/headers/表单安全）：见 `docs/specs/security.md`

---

## 10. 页面与模块清单（建议拆锁）
> 复刻落地必须把“最容易漂移的模块”单独锁定成独立 lockfile。

### 10.1 必备 lockfiles（P0 推荐）
- `docs/ui-lockfiles/header-megamenu.md`
- `docs/ui-lockfiles/footer.md`
- `docs/ui-lockfiles/home.md`
- `docs/ui-lockfiles/product-landing.md`
- `docs/ui-lockfiles/material-center.md`
- `docs/ui-lockfiles/cases.md`
- `docs/ui-lockfiles/how-to-buy.md`
- `docs/ui-lockfiles/contact-us.md`
- `docs/ui-lockfiles/search.md`
- `docs/ui-lockfiles/language-switch.md`

---

## 11. UI Lockfiles（强制机制：无 lockfile 不实现）

### 11.1 路径与命名
- 目录：`docs/ui-lockfiles/`
- 文件命名：kebab-case，与路由/模块对应（见第 10 章）

### 11.2 每个 lockfile 的固定字段（缺一不可）
> 你已拥有 `_TEMPLATE.md`，本节只做“字段集合硬约束”，不重复模板内容。

1. Reference URLs（cn/en）
2. Layout Tree（sections + 组件树）
3. Grid & Spacing（container/columns/gutter/section padding，按断点）
4. Typography（nav/H1/H2/H3/body/button，按断点）
5. Color & Tokens Mapping（角色色与 tokens 映射）
6. Interaction Spec（hover/focus/active、open/close 条件、动效参数）
7. Responsive Behavior（mobile/tablet/desktop 差异）
8. A11y Notes（ARIA、focus trap、键盘行为）
9. Acceptance Checklist（本页最小验收点）

---

## 12. Definition of Done（UI 维度）
- 已存在并更新对应 lockfile
- UI 全部落在 `app/site/**`
- tokens 驱动：无魔法色值/间距/动效
- Header/MegaMenu/Search/LanguageSwitch：交互完整 + 键盘可达
- zh-cn/en：结构一致、关键文案齐全
- 已满足 `acceptance.md` 的页面级验收项
