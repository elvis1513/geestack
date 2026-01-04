# PRD - GeeStack（极栈）官网（复刻 xFusion）产品需求文档

> 文件：`docs/requirements/PRD.md`  
> 目标：定义“本期要做什么、做到什么程度、何时算完成”。  
> 约束：工程与结构约束以 `AGENTS.md` 为最高优先级；UI/SEO/Security/API 的可执行规范分别见 `docs/specs/**`；页面级像素/交互参数见 `docs/ui-lockfiles/**`。  
> 重要提醒：本 PRD 负责“范围与优先级”。**具体 UI 细节不写在 PRD**（避免需求与复刻锁定文件冲突）。

---

## 1. 背景与目标

### 1.1 背景
- GeeStack（极栈）需要一套面向公网的公司官网，用于展示品牌、产品与解决方案、资料中心、案例与新闻（如需要），以及线索获取（Contact/Subscribe 等，如需要）。
- 本期官网将以目标站点（xFusion）为参考模板，进行 **布局/风格/交互的高一致性复刻**，同时进行品牌替换：`超聚变 → 极栈`、`xFusion → GeeStack`。
- 现有仓库使用 JHipster 作为工程脚手架，但其默认前端 UI/后台管理为 legacy，不作为设计与布局参考。

### 1.2 目标（必须达成）
- **复刻目标站点整体布局/风格/交互**：形成 GeeStack 公网官网（site），并满足 P0 页面上线。
- **中英双语一致与可维护**：支持 `/cn/**` 与 `/en/**` 两套路由，导航、页面结构与关键文案可维护。
- **可持续迭代**：以 lockfile 驱动复刻，以 tokens 驱动主题，形成可审计的工程化过程。
- **生产级质量门槛**：满足 SEO/性能/A11y/安全基线（见 `docs/specs/seo.md`、`docs/specs/security.md`）。

### 1.3 成功度量（Success Metrics）
> 指标口径详见 `seo.md` 与 `acceptance.md`，这里仅列“验收可量化目标”。

- P0 页面通过 `docs/requirements/acceptance.md` 的 **Blocker 全项**。
- 关键页面 Core Web Vitals 达标（LCP/CLS/INP，详见 `seo.md`）。
- 站点双语路由与导航完整，且语言切换正确。
- 复刻锁定文件（lockfiles）覆盖 P0 全部页面/核心模块。

---

## 2. 项目范围（In / Out）

### 2.1 In Scope（本期包含）
- 官网公共站点（site）：
  - `/cn/**`、`/en/**` 路由体系
  - 站点级布局：Header / MegaMenu / Footer / 语言切换
  - 站点级功能：搜索（如目标站点存在且纳入范围）、面包屑（如纳入范围）
- 核心导航与页面（见第 4 章，按 P0/P1/P2 划分）
- 基础 SEO / 性能 / 可访问性（见 `docs/specs/seo.md`）
- 基础安全基线与反滥用（见 `docs/specs/security.md`）
- 若涉及数据驱动：Site API（只读为主，Contact 为写），契约见 `docs/specs/api.md`

### 2.2 Out of Scope（本期不做）
- 现有仓库中任何 legacy 前端 UI 的继续开发与扩展
- JHipster 自带 Admin/Entities CRUD UI（全部弃用）
- Console/后台（如未来需要，另开 `app/console/**` 并新增 PRD/Specs/Lockfiles）
- 与官网无关的复杂业务系统能力（例如：订单、支付、用户中心等）

### 2.3 约束性范围说明（必须）
- 本期可以使用占位图、占位内容，但不得以此改变页面结构、栅格、间距与交互。
- 内容层面的“真实文案/真实素材”可以后续替换，但必须通过结构化方式落盘（i18n、content 配置、或 API）。

---

## 3. 复刻定义（必须量化）

> 复刻的一致性要求与验收口径详见 `acceptance.md`。本章定义“复刻的三层含义”。

### 3.1 结构复刻（Structure）
- 信息架构（IA）与路由结构
- 页面楼层顺序（sections）与组件层级关系
- 导航结构（Header/MegaMenu/Footer）与关键入口一致
- 响应式断点下的布局策略一致（至少 mobile/tablet/desktop）

### 3.2 视觉复刻（Visual）
- 设计系统 tokens（颜色/字体/间距/阴影/圆角/层级）
- 组件状态（default/hover/active/focus/disabled）与视觉表现一致
- 允许占位图，但 **不允许改变结构以适配占位图**
- 禁止散落魔法值（颜色/间距必须来自 tokens，见 `ui.md`）

### 3.3 交互复刻（Interaction）
- 菜单展开/收起、hover、scroll/sticky 行为
- 动效参数（duration/easing）、过渡方式与触发条件
- 键盘可达、ESC/点击外部关闭等一致性（A11y 基线）

### 3.4 复刻锁定文件（Lockfile）机制（强制）
- 任一页面/feature 进入 Implement 前，必须创建并完善对应 `docs/ui-lockfiles/<page-or-feature>.md`
- lockfile 必须包含：layout/typography/color/interactions/assets/tokens/implementation plan/verification
- 未通过 lockfile 验收的页面不得标记为“完成”

---

## 4. 信息架构与页面清单（中英）

> 说明：页面 IA 与路由最终以 `docs/specs/ui.md` 为准；本章仅给“范围与优先级”。  
> 填写方式：后续你可以从 ui.md 的 Site Map 中拷贝路由列表到此处。

### 4.1 P0（首期必须上线）
P0 原则：完成“完整官网壳 + 核心频道页 + 双语 + 交互 + 基线 SEO/安全/性能”。

- 全局（两种语言均必须）：
  - Home
  - Products & Solutions（频道页）
  - Resources（资料中心频道页）
  - Cases（案例中心频道页）
  - Contact / How to buy（如目标站点存在且纳入范围）
  - 404
  - （可选）Search（若纳入范围）
- zh-cn：`/cn/...`（从 ui.md 填充）
- en：`/en/...`（从 ui.md 填充）

### 4.2 P1（次期）
P1 原则：补齐“详情页 + 内容密度 + 空态/错误态 + 复刻精度提升”。

- 产品详情（`/products/{slug}`）
- 资源详情（`/resources/{slug}`）
- 案例详情（`/cases/{slug}`）
- 新闻/活动（如纳入范围：列表 + 详情）
- 更完善的 Search 体验（过滤/高亮/无结果态）

### 4.3 P2（可延后）
P2 原则：增强运营与增长能力（不阻塞 P0 上线）。

- 内容管理（CMS/工作流/审核）
- 多站点/多地区支持
- 更深的个性化与埋点分析（需隐私合规与 ADR）
- 下载中心的权限/水印/表单联动（如需要）

---

## 5. 功能清单（按模块）

### 5.1 全局能力（P0）
- Header / MegaMenu：
  - 多级导航、hover/click 展开与关闭（含点击外部/ESC）
  - 移动端导航（抽屉/折叠）与键盘可达
- Footer：
  - 导航汇总、必要公司信息与链接（按目标站点复刻）
- 语言切换：
  - 路由映射正确（cn/en）
  - 切换后导航/关键文本一致
- （可选）Search：
  - 搜索入口、结果页、空态
  - SEO 策略（通常 noindex）与限流（security）

### 5.2 内容型模块（P0~P1）
- 产品与解决方案（频道页 → 详情页）
- 资料中心（频道页 → 详情页/下载）
- 案例中心（频道页 → 详情页）
- 新闻/活动（如需要）
- 如何购买 / 联系我们（线索获取）

### 5.3 非目标功能（明确不做）
- 登录/注册/用户中心
- 支付/订单/交易闭环
- 大规模个性化推荐（除非另立需求与 ADR）

---

## 6. 内容与数据来源策略

### 6.1 初期（P0）：静态占位（强烈推荐）
- i18n + 配置驱动（navigation/sections/content）
- 优点：复刻可快速推进，减少后端依赖
- 要求：占位数据必须结构化（不得散落硬编码大段文案）

### 6.2 中期（P1）：后端 API 驱动
- 引入 `docs/specs/api.md` 的 Site API
- 内容域（products/resources/cases/news）支持列表/详情
- 支持 ETag/缓存，减少压力

### 6.3 长期（P2）：内容管理策略
- 可选：CMS（Headless CMS）、数据库管理界面、外部源同步
- 任何新增系统性依赖需 ADR（架构/成本/风险）

---

## 7. 多语言策略（zh-cn / en）

- i18n key 前缀：`site.*`
- 双语一致性原则：
  - 同一 `routeKey` 必须存在 cn/en 对应页面（除非 PRD 明确声明例外）
  - 导航结构双语一致（标签不同、结构相同）
- fallback 策略：
  - 默认 fallback：zh-cn
  - 任何 fallback 必须在 UI/SEO 影响评估后执行（避免索引重复或错页）

---

## 8. 约束与规则（必须遵守）

- 品牌替换：`超聚变 → 极栈`；`xFusion → GeeStack`（覆盖范围见 `acceptance.md`）
- 禁止引用 legacy UI（见 `AGENTS.md` 与 `ui.md`）
- UI Lockfile 必须存在才能实现页面/功能
- tokens 驱动设计系统：颜色/间距/字体不得散落魔法值
- 触发 ADR 条件必须写 ADR：
  - UI 基础库替换、SSR/预渲染、路由体系大改、引入第三方脚本/分析、跨域与安全策略变更等

---

## 9. 非功能需求（入口）
- SEO/性能/A11y：见 `docs/specs/seo.md`
- 安全/反滥用：见 `docs/specs/security.md`
- API 契约：见 `docs/specs/api.md`
- 验收入口：`docs/requirements/acceptance.md`

---

## 10. 里程碑与交付物

### 10.1 文档交付（P0）
- [ ] `docs/specs/ui.md`（已完成/持续完善）
- [ ] `docs/specs/seo.md`
- [ ] `docs/specs/security.md`
- [ ] `docs/specs/api.md`（若接入数据驱动）
- [ ] `docs/requirements/acceptance.md`
- [ ] `docs/ui-lockfiles/**`：覆盖 P0 页面与全局模块

### 10.2 代码交付（P0）
- [ ] `app/site/**` 新官网实现（不引用 legacy UI）
- [ ] 设计系统 tokens（`app/site/theme/**`）
- [ ] 全局布局（Header/MegaMenu/Footer/LanguageSwitch）
- [ ] P0 页面路由与骨架可访问（cn/en）
- [ ] 通过工程质量门槛（lint/test/build，见 acceptance）

### 10.3 验收与发布
- [ ] staging 环境通过 P0 Blocker 全项
- [ ] 发布到 prod 并完成上线验证（robots/sitemap/headers/关键指标）

---

## 11. 风险与假设

### 11.1 主要风险
- SPA SEO：若不做预渲染/SSR，某些搜索引擎/社交爬虫可能无法获取 meta（见 `seo.md`，必要时 ADR）
- 复刻精度与周期：像素/动效一致性要求高，必须依赖 lockfile 与证据流程降低返工
- 第三方脚本：分析/客服/表单验证等可能引入性能与安全风险（必须治理）

### 11.2 假设（需持续验证）
- 目标站点结构相对稳定，复刻过程中不会频繁大改 IA
- P0 阶段允许占位内容，不阻塞结构与交互复刻
- 发布环境支持必要的 headers、缓存策略与可观测性

