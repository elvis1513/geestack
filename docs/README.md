# Docs Index

- requirements：范围与验收
- specs：可执行规范（UI/API/SEO/Security）
- ui-lockfiles：每个页面/feature 的复刻锁定文件
- adr：重大决策记录


下面给你一份“**文档维护节奏表**”（按迭代推进），对应你当前的 IA（`/cn`、`/en` + Product/Resources/Cases/How-to-buy/Contact 等）以及你“严格复刻 xFusion”的目标。你照这个节奏走，开发就会非常顺：每次做功能前知道该动哪些文档，做完知道该补哪些证据。

---

## 0. 总规则（先记住这 4 条）

1. **每做一个页面/全局模块，必须有对应 `ui-lockfile`**（新增或更新）。
2. **`ui.md` 尽量稳定**：只有“全站基线变化”（断点/栅格/导航 schema/组件契约）才改它。
3. **requirements 负责“做不做/什么时候验收/验收标准”**，不要写像素；像素下沉到 lockfile。
4. **ADR 只记录“大选择”**：换 UI 基础库、SSR/预渲染、主题系统大改、搜索体系引入等。

---

## 1) 迭代 P0（最小可上线的“复刻骨架”）

目标：全站框架、导航、语言切换、基础页面骨架完整；视觉与交互先做到“同风格+结构一致”。

### 1.1 本迭代新增/完善哪些文档

#### requirements（会改同一个文件，内容增长）

* `docs/requirements/PRD.md`

  * 增加：P0 范围清单（必须页面 + 必须模块）
  * 明确：暂不做的范围（例如新闻详情、资源下载真实后端等）
* `docs/requirements/acceptance.md`

  * 增加：P0 验收标准（导航可达、双语一致、Header 状态机、搜索 UI 完整、404 等）

#### specs（少改，但要补齐“可执行口径”）

* `docs/specs/ui.md`：你现在的版本基本够用（**P0 只做少量修订**）
* `docs/specs/seo.md`：补最小上线口径（title/description、hreflang、canonical、sitemap/robots、LCP/CLS 基线）
* `docs/specs/security.md`：补最小上线口径（CSP/headers、表单防护基线、外链策略）

#### ui-lockfiles（新增文件为主）

P0 推荐至少这些（模块/页面一一对应）：

* `docs/ui-lockfiles/header-megamenu.md`（最先写）
* `docs/ui-lockfiles/footer.md`
* `docs/ui-lockfiles/language-switch.md`（也可合并到 header，但建议独立）
* `docs/ui-lockfiles/search.md`（若 P0 做搜索入口与结果页骨架）
* `docs/ui-lockfiles/home.md`
* `docs/ui-lockfiles/product-landing.md`
* `docs/ui-lockfiles/material-center.md`
* `docs/ui-lockfiles/cases.md`
* `docs/ui-lockfiles/how-to-buy.md`
* `docs/ui-lockfiles/contact-us.md`
* `docs/ui-lockfiles/404.md`（可选但建议）

#### ADR（通常 P0 只会新增 0–1 个）

触发条件（P0 常见）：

* 是否保留 Bootstrap 作为基础（保留/移除/仅用栅格）
* 是否引入组件库（如 shadcn、MUI 等）
  若你已经决定不引入/不替换，则 P0 可能不需要 ADR。

### 1.2 P0 的“文档更新顺序”（建议照这个走）

1. **`ui-lockfiles/header-megamenu.md`**（因为它决定导航与全站观感）
2. `ui-lockfiles/home.md`（首屏 LCP、Hero、楼层节奏）
3. `ui-lockfiles/footer.md`
4. `ui-lockfiles/language-switch.md` + `seo.md`（hreflang/canonical）
5. 频道页 lockfiles（product/resources/cases/how-to-buy/contact）
6. `acceptance.md` 回填：把你实现出来的“可验收点”写成可勾选条款

---

## 2) 迭代 P1（从“骨架”到“高一致性复刻”）

目标：把关键页面的栅格/排版/交互细节锁死到接近像素级；补齐列表、空态、错误态、可访问性。

### 2.1 文档怎么动

#### ui-lockfiles（继续新增 + 深化）

* 对 P0 页面补齐：Grid/Spacing/Type/Color 的断点差异、交互动效参数、验收截图点位
* 新增（若进入细分页面）：

  * `product-detail.md`（如果有产品详情）
  * `case-detail.md`（如果案例详情）
  * `news-list.md` / `news-detail.md`（如果做新闻）
  * `resource-detail.md` / `download-center.md`（如果做资源下载）

#### specs（可能会小幅增长）

* `seo.md`：增加结构化数据、OG 图、性能预算更严格、Lighthouse 门槛
* `security.md`：增加表单防刷、速率限制口径、错误信息泄露口径（前端展示也有关）

#### requirements（同文件内修订）

* PRD：明确 P1 的新增范围
* acceptance：增加 P1 的验收（例如“移动端菜单行为一致”、“所有弹层 focus trap 完整”、“关键页面截图对比通过”）

#### ADR（P1 比 P0 更容易触发）

* 引入搜索实现（站内索引/后端搜索/CMS）
* 引入预渲染/SSR（若 SEO 要求更高）
* 引入视觉回归测试工具（Playwright screenshot/Chromatic）

---

## 3) 迭代 P2（内容系统/后台/运营能力）

目标：把“内容生产与运营”能力建起来（新闻、资源、案例、下载、表单线索、搜索索引等）。

### 3.1 文档怎么动

* requirements：范围会明显扩张（内容类型、权限、运营流程）
* specs/api.md：会显著增长（内容查询、分页、筛选、搜索、表单提交）
* specs/security.md：会增强（鉴权、RBAC、审计、上传安全）
* ui-lockfiles：新增“后台 console”相关 lockfiles（如果你启用 `app/console/**`）

---

## 4) 一个“每次开发任务”的标准文档动作（你可以贴到任务模板里）

当你准备开发 **X 页面/模块** 时：

1. requirements

* 若是新范围：在 `PRD.md` 增加条目；在 `acceptance.md` 增加可验收点
* 若只是实现既定范围：requirements 不动

2. specs

* 若涉及全站规则变化：更新 `ui.md` 或 `seo/security/api`（否则不动）

3. ui-lockfile（必做）

* 新模块：新增 `docs/ui-lockfiles/x.md`（从你模板复制）
* 旧模块增强：更新相应 lockfile 的 Layout/Interaction/Acceptance/证据

4. ADR（条件触发）

* 新依赖/新架构路线/大范围重构：新增 ADR（不改旧 ADR）

---

## 5) 你现在最该做的“下一步”

按 P0 顺序立刻推进（最少阻塞路径）：

1. `docs/ui-lockfiles/header-megamenu.md`
2. `docs/ui-lockfiles/home.md`
3. `docs/ui-lockfiles/footer.md`
4. `docs/specs/seo.md`（最小上线口径：hreflang/canonical/sitemap/robots + LCP/CLS）
5. 频道页 lockfiles（product/resources/cases/how-to-buy/contact）

只要这 5 步齐了，你的智能体就很难跑偏，且可以开始高效并行开发。

---

如果你把你现有的 `PRD.md` 和 `acceptance.md`（哪怕是骨架）贴出来，我可以按上面的 P0/P1/P2 节奏，直接帮你把“范围条目 + 验收条款”写到可用状态，并与你现有 IA/lockfile 命名一一对齐。
