# UI Lockfile Template

> 文件路径建议：`docs/ui-lockfiles/<page-or-feature>.md`  
> 目的：把“严格复刻 + 设计系统 + 交互完整 + 可审计检索”固化为参数化约束。  
> 使用规则：没有本 Lockfile（或未更新），不得进入 Implement 阶段。

---

## 1. Feature / Page 信息

- 名称（中文）：
- 名称（英文）：
- 类型：Page / Section / Component / Layout / Navigation / Theme / Other
- 归属域：`site` / `console`（未来）/ `platform`
- 涉及路由（如适用）：
  - zh-cn：
  - en：
- 目标页面/模块边界（只写结构，不写业务需求）：
  - 包含：
  - 不包含：
- 依赖关系（与其他页面/模块的关系）：
  - 上游：
  - 下游：

---

## 2. Branding 替换规则（强制）

- 中文替换：`超聚变` → `极栈`
- 英文替换：`xFusion` → `GeeStack`

### 2.1 替换覆盖面（勾选确认）

- [ ] 页面 Title / H1 / H2
- [ ] 导航（Header/Mega Menu/Footer）
- [ ] CTA 按钮
- [ ] SEO Title/Description/OG（如本次范围包含）
- [ ] 图片 alt / aria-label（如本次范围包含）
- [ ] 下载/资源名称（如本次范围包含）

### 2.2 不替换项（若有，需引用 specs/requirements）

- 不替换的专有名词清单：
- 依据文档（链接到 docs/specs 或 docs/requirements 的章节）：

---

## 3. Retrieve A：UI/UX Pro Max 检索记录（强制）

> 要求：每个 domain 至少 3 条可执行规则 + 1 条风险点。  
> 说明：请记录你使用的 tool（Claude/Codex/Antigravity）与实际命令/路径，确保可复现。

### 3.1 工具与脚本信息

- 使用的智能体：Claude / Codex / Gemini(Antigravity)
- Skill/Workflow 安装位置（若适用）：
- `search.py` 实际路径（若用脚本）：
- 执行日期：
- 备注（例如版本、环境差异）：

### 3.2 Domain：product

- Keywords：
- 命中摘要（要点）：
- 可执行规则（>=3）：
  1.
  2.
  3.
- 风险点/反模式（>=1）：

### 3.3 Domain：style

- Keywords：
- 命中摘要（要点）：
- 可执行规则（>=3）：
  1.
  2.
  3.
- 风险点/反模式（>=1）：

### 3.4 Domain：typography

- Keywords：
- 命中摘要（要点）：
- 可执行规则（>=3）：
  1.
  2.
  3.
- 风险点/反模式（>=1）：

### 3.5 Domain：color

- Keywords：
- 命中摘要（要点）：
- 可执行规则（>=3）：
  1.
  2.
  3.
- 风险点/反模式（>=1）：

### 3.6 Domain：landing（如适用：官网页面/落地页）

- Keywords：
- 命中摘要（要点）：
- 可执行规则（>=3）：
  1.
  2.
  3.
- 风险点/反模式（>=1）：

### 3.7 Domain：ux

- Keywords：
- 命中摘要（要点）：
- 可执行规则（>=3）：
  1.
  2.
  3.
- 风险点/反模式（>=1）：

### 3.8 Stack：react（强制）

- Keywords：
- 命中摘要（要点）：
- 可执行规则（>=3）：
  1.
  2.
  3.
- 风险点/反模式（>=1）：

---

## 4. Retrieve B：目标站点结构化拆解（强制）

> 要求：把“严格复刻”参数化。即使使用占位图，也不得改变结构来适配图片。

### 4.1 Layout（栅格与间距）

- Container：
  - max-width：
  - padding（左右）：
- Breakpoints（最少列出 3 档）：
  - sm：
  - md：
  - lg/xl：
- Grid：
  - columns：
  - gutter：
- Sections（列出本 Feature 涉及的所有 section）：
  - Section A：
    - padding-top / padding-bottom：
    - 内部组件间距（gap）：
  - Section B：
    - padding-top / padding-bottom：
    - 内部组件间距（gap）：

### 4.2 Typography（字体与层级）

- Font family（中英分别）：
- Type scale（至少列出 nav/H1/H2/H3/body/caption）：
  - nav：
  - h1：
  - h2：
  - h3：
  - body：
  - caption：
- Font weight（常用权重）：
- Line-height 规则：
- 字间距（如使用）：

### 4.3 Color（色彩与状态）

> 建议转成 tokens，不建议散落在组件里。

- Background：
- Foreground（主文本）：
- Muted text（弱文本）：
- Divider/Border：
- Primary CTA：
  - default：
  - hover：
  - active：
  - focus：
- Secondary CTA：
  - default：
  - hover：
  - active：
  - focus：
- Card surface：
- Shadow color/opacity（如适用）：

### 4.4 Component Inventory（组件清单）

列出本 Feature 涉及的组件，并标注“是否可复用、放置目录、职责”。

| Component | Type (layout/section/component) | Reusable? | Directory Target | Responsibility |
| --------- | ------------------------------- | --------: | ---------------- | -------------- |
| Header    | layout                          |         Y | app/site/layout  | 顶部导航与入口 |
| MegaMenu  | layout                          |         Y | app/site/layout  | 多级导航       |
| ...       | ...                             |       ... | ...              | ...            |

### 4.5 Interactions（交互与动效）

- Hover：
  - 触发对象：
  - 视觉变化（颜色/阴影/位移/下划线等）：
  - duration：
  - easing：
- Expand/Collapse（如 MegaMenu/Accordion）：
  - 打开条件：
  - 关闭条件（含 ESC/点击外部）：
  - 动效：
- Scroll behavior（如 sticky/透明到实底切换）：
- Focus & Keyboard：
  - Tab 顺序：
  - ESC 行为：
  - aria/role：

### 4.6 Assets（图片占位与性能）

- 图片策略：Empty / Placeholder / Real Assets
- 占位图来源：
- 约束（必须填写）：
  - 宽高比：
  - width/height 或 aspect-ratio：
  - lazy-loading（哪些可以懒加载，哪些不能）：
  - LCP 目标元素：
  - CLS 风险点与规避：

---

## 5. Design Tokens（必须沉淀到代码结构）

> 说明：这里定义“落盘位置”。代码中不得硬编码魔法值。

- Tokens 文件落盘路径（建议 `app/site/theme/*`）：
- Tokens 列表：
  - colors：
  - typography：
  - spacing：
  - radius：
  - shadow：
  - z-index：
  - breakpoints：

---

## 6. Implementation Plan（实现计划：文件级清单）

> 目标：确保实现阶段可控、可审计、可 review。

### 6.1 目录落位（必须说明）

- 新增/修改目录：
- 新增/修改组件放置策略（layout/section/component）：

### 6.2 文件清单（必须）

- 新增文件：
  - `path/to/file`：用途
- 修改文件：
  - `path/to/file`：用途
- 删除文件（如有，必须说明理由）：
  - `path/to/file`：理由

### 6.3 风险点与回滚策略

- 风险点：
- 回滚策略（如何快速回退到上一版本）：

---

## 7. Verification（自检与验收记录：必须填写）

### 7.1 视觉一致性（逐条勾选）

- [ ] 栅格/间距（container/breakpoints/gutter/section padding）与本 Lockfile 一致
- [ ] 字体层级（nav/H1/H2/body/caption）与本 Lockfile 一致
- [ ] 颜色与状态（CTA/hover/focus/active）与本 Lockfile 一致
- [ ] 阴影/圆角与层级一致
- [ ] 动效（duration/easing/scroll behavior）一致

### 7.2 功能完整性（逐条勾选）

- [ ] Header/MegaMenu：可打开/关闭，hover 正常，点击外部关闭，ESC 关闭，Tab 可达
- [ ] Language Switch：中英切换后导航/按钮/关键文本一致
- [ ] Search（若范围包含）：输入/清空/结果态/空态/A11y 正常
- [ ] 路由：所有入口可达；未完成页面有占位且可追踪
- [ ] A11y：focus ring、aria-label、对比度、可点击区域满足要求

### 7.3 工程门槛（写出实际结果）

- Lint：`npm run lint` 结果：
- Prettier：`npm run prettier:check` 结果：
- Test：`npm test` 结果：
- 其他（如 `./mvnw -Pprod clean verify`）：

### 7.4 证据（可选但推荐）

- 截图对比（目标站点 vs GeeStack）：
- 录屏/动效验证：
- Lighthouse（如做过）：

---

## 8. Notes（补充说明）

- 需求引用（docs/requirements / docs/specs 的章节链接）：
- 未覆盖项与原因（必须说明）：
- 下一步建议：
