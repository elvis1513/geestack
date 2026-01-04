# ADR-0001: Greenfield Site Rewrite inside JHipster Monolith

- **Status**: Accepted
- **Date**: 2026-01-04
- **Deciders**: Project Owner (GeeStack)
- **Consulted**: N/A
- **Informed**: N/A
- **Supersedes**: N/A
- **Superseded by**: N/A

---

## Context

GeeStack（极栈）需要一套面向公网的公司官网，用于品牌展示、产品与解决方案介绍、资料中心与案例展示、以及线索获取（如 Contact/Subscribe）。现有仓库基于 JHipster 8.11.0 生成，具备成熟的后端分层、构建链路、测试与基础设施集成，但其默认前端 UI（包含 Admin/Entities CRUD）不满足“严格复刻目标站点（xFusion）布局/风格/交互”的要求。

本项目的关键约束与动机如下：

1. **高一致性复刻需求**  
   本期目标不是“做一个类似风格的官网”，而是“以 xFusion 为蓝本的结构/视觉/交互复刻”。这种目标对信息架构（IA）、栅格/间距、交互细节与组件层次的约束极强，使用 JHipster 默认 UI/布局继续增量改造会导致：
  - 既有 UI 目录结构与组件切分方式会持续干扰新实现；
  - 复刻过程中不可避免出现“为了适配旧结构而改变新结构”的妥协；
  - 后续智能体（Claude/Codex/Gemini）更容易引用 legacy 模式，造成漂移与返工。

2. **仅复用 JHipster 作为工程脚手架与后端基座**  
   JHipster 提供了对 Spring Boot、Liquibase、构建与部署链路、测试框架、以及基础配置的标准化落盘方式。保留 JHipster monolith 的价值在于：
  - 降低后端与部署的整体工程成本；
  - 保持单体应用的运维与发布一致性；
  - 为未来“内容管理/console 后台”等能力预留可扩展路径。

3. **必须隔离 legacy UI，避免持续污染**  
   为保证“复刻一致性”和“可持续迭代”，必须从工程结构上将新官网（site）与 legacy UI 严格隔离，并将 legacy 视为仅为构建与后端基座服务的历史实现，不作为 UI/布局参考。

### Non-goals（本 ADR 不覆盖/不决策）
- 是否引入 SSR/预渲染（由后续 ADR 单独决策，例如 ADR-0002）
- 是否引入/替换 UI 基础库（Bootstrap 替换、组件库引入等，需单独 ADR）
- Console/后台的范围与实现（未来另立需求与 ADR）

---

## Decision

1. **在 JHipster Monolith 内进行 Greenfield Site 重写**
  - 新官网全部落在：`src/main/webapp/app/site/**`
  - 旧 UI（JHipster admin/entities/legacy layout 等）不再作为参考或扩展对象。

2. **明确弃用 JHipster 自带 Admin/Entities CRUD UI**
  - UI 层面：不再使用、不再扩展、不作为默认入口与主导航项。
  - 数据层（domain/repository/service）可保留（如业务需要），但不得推动旧 UI 回流。

3. **Lockfile 驱动开发（无 lockfile 不实现）**
  - 每个页面/feature 在 Implement 前必须创建并完善：`docs/ui-lockfiles/<page-or-feature>.md`
  - lockfile 必须包含：目标站点结构化拆解、tokens 落盘、实现文件级清单与验证清单。
  - 复刻一致性的权威参数（layout/typography/color/interactions/assets）以 lockfile 为准。

4. **tokens 驱动主题（唯一权威来源）**
  - 设计系统 tokens 必须集中在：`app/site/theme/**`
  - 禁止在组件中散落“魔法色值/间距/圆角/阴影”等；必须引用 tokens。
  - 样式与 legacy UI 必须隔离，避免“混用 Bootstrap 默认风格”的视觉污染（如需替换基础库，必须 ADR）。

5. **多语言策略固定为 zh-cn / en**
  - 路由前缀：`/cn/**` 与 `/en/**`（默认 `/` 301 → `/cn`）
  - i18n key 前缀：`site.*`
  - 同页语言映射必须基于 `routeKey`（由导航配置驱动），避免简单字符串替换导致错页。

6. **路由入口与 legacy 隔离**
  - 应用默认落地到 site（`/cn`）的首页入口。
  - legacy admin/entities（如仍存在）必须从主导航与默认入口路由中移除。
  - 如需长期保留 legacy 代码，推荐迁移至 `app/legacy/**` 以降低误用概率（迁移需确保构建不破）。

7. **文档权威关系（防漂移）**
  - 范围与验收：`docs/requirements/PRD.md`、`docs/requirements/acceptance.md`
  - 可执行规范：`docs/specs/ui.md`、`docs/specs/seo.md`、`docs/specs/security.md`、`docs/specs/api.md`
  - 页面级锁定：`docs/ui-lockfiles/**`
  - 工程与行为：`AGENTS.md`

---

## Consequences

### Positive
- **复刻一致性更可控**：通过 `app/site/**` 隔离与 lockfile 机制，避免 legacy UI 对结构与布局的持续干扰。
- **可审计、可回归**：每个页面/feature 都有对应 lockfile 记录“参数与证据”，降低返工与争议成本。
- **工程链路复用**：保留 JHipster 的后端分层、构建与测试链路，减少运维复杂度。
- **未来扩展清晰**：如需 Console/后台，可在 `app/console/**` 独立落位，不污染 site 域。

### Costs / Risks
- **重写成本高于增量改造**：需要从零实现 Header/MegaMenu/Footer、主题系统与关键交互。
- **A11y 与交互复杂度**：MegaMenu、搜索与移动端导航等需要严格键盘与焦点管理。
- **SPA SEO 风险**：若不做预渲染/SSR，部分搜索引擎与社交爬虫可能无法获取 meta（需后续 ADR 决策渲染策略）。
- **第三方脚本引入风险**：分析/验证码/客服可能影响性能与 CSP（需治理与审批流程）。

### Mitigations
- 采用 P0/P1/P2 分期推进，P0 以“可上线基线”为目标（见 PRD/acceptance）。
- 对全局模块（Header/MegaMenu/Footer/LanguageSwitch）建立“冻结后变更必须更新 lockfile + 证据”的流程。
- 对第三方脚本建立 allowlist 与审批门槛（security.md 与后续 ADR 补齐）。

---

## Alternatives Considered

1. **Alternative A：在现有 JHipster UI 上增量改造**
  - Pros：短期看似快
  - Cons：legacy 结构与样式会持续干扰复刻；智能体容易沿用旧模式；长期返工与漂移风险高
  - Decision：否决

2. **Alternative B：将官网拆到独立前端工程（例如 Next.js）**
  - Pros：SSR/SEO 友好，前端完全独立
  - Cons：工程与部署复杂度上升；与现有 monolith 的集成成本更高；首期不希望引入额外运维面
  - Decision：首期否决（可在后续 ADR 重评）

3. **Alternative C：微前端（site 作为子应用）**
  - Pros：边界更明确
  - Cons：引入额外框架与复杂度；首期过度设计；不利于快速复刻
  - Decision：否决

---

## Rollout Plan

### Phase 0：文档与骨架（P0 前置）
- 完成/稳定以下文档：
  - `AGENTS.md`
  - `docs/requirements/PRD.md`
  - `docs/requirements/acceptance.md`
  - `docs/specs/ui.md`、`docs/specs/seo.md`、`docs/specs/security.md`、`docs/specs/api.md`
- 建立 `app/site/**` 目录骨架与最小路由入口（不引用 legacy UI）

### Phase 1：全局模块（必须先锁定）
- Header / MegaMenu / Footer / LanguageSwitch
- 为每个全局模块建立 lockfile：
  - `docs/ui-lockfiles/header-megamenu.md`
  - `docs/ui-lockfiles/footer.md`
  - `docs/ui-lockfiles/language-switch.md`
- 验收：通过 acceptance 中的全站必过项（品牌替换、双语一致、交互完整、A11y）

### Phase 2：核心频道页（P0 页面）
- Products / Resources / Cases（列表页为主）
- Home（完整首屏与核心楼层）
- 每页必须具备 lockfile，并按 lockfile 验收

### Phase 3：SEO/性能强化与数据驱动（P1+）
- 决策是否引入预渲染/SSR（ADR-0002）
- 引入 Site API（若需要），并完善缓存/ETag/可观测性
- 如需要内容后台，另立 Console PRD 与 ADR（不在本决策范围内）

---

## Related Documents

- Engineering & Process:
  - `AGENTS.md`
- Requirements:
  - `docs/requirements/PRD.md`
  - `docs/requirements/acceptance.md`
- Specs:
  - `docs/specs/ui.md`
  - `docs/specs/seo.md`
  - `docs/specs/security.md`
  - `docs/specs/api.md`
- UI Lockfiles:
  - `docs/ui-lockfiles/**`
