# PRD - GeeStack（极栈）官网（复刻 xFusion）产品需求文档

## 1. 背景与目标
- 背景：
- 目标（必须达成）：
  - 复刻目标站点整体布局/风格/交互，形成极栈官网
  - 中英双语（zh-cn/en）一致与可维护
  - 可持续迭代（Lockfile 驱动、tokens 驱动）

## 2. 项目范围（In / Out）
### 2.1 In Scope（本期包含）
- 官网公共站点（site）
- 核心导航与页面（见第 4 章）
- Header/MegaMenu/Footer/语言切换/搜索（如在 xFusion 中存在则复刻）
- 基础 SEO / 性能 / 可访问性（指向 specs/seo.md）

### 2.2 Out of Scope（本期不做）
- JHipster legacy 前端 UI
- JHipster 自带 Admin/Entities CRUD UI
- Console/后台（如未来需要，另开 `app/console/**` 并写新 PRD）

## 3. 复刻定义（必须量化）
### 3.1 结构复刻
- IA、路由结构、页面楼层顺序、组件层级关系

### 3.2 视觉复刻
- tokens（颜色/字体/间距/阴影/圆角/层级）
- 允许占位图，但不允许改变结构适配占位图

### 3.3 交互复刻
- 菜单展开/收起、hover、scroll 行为、动效参数、键盘可达

## 4. 信息架构与页面清单（中英）
> 页面清单以 docs/specs/ui.md 为准，本处只给范围与优先级。

### 4.1 P0（首期必须上线）
- zh-cn：
- en：

### 4.2 P1（次期）
- zh-cn：
- en：

### 4.3 P2（可延后）
- zh-cn：
- en：

## 5. 功能清单（按模块）
### 5.1 全局能力
- Header / MegaMenu
- Footer
- 语言切换
- 搜索（如需要）
- 面包屑（如需要）

### 5.2 内容型模块
- 产品与解决方案
- 资料中心
- 案例中心
- 新闻/活动（如需要）
- 如何购买 / 联系我们

## 6. 内容与数据来源策略
- 初期：静态占位（i18n + 配置驱动）
- 中期：后端 API 驱动（见 docs/specs/api.md）
- 长期：内容管理策略（可选：CMS/数据库/外部源）

## 7. 多语言策略（zh-cn / en）
- i18n key 前缀：site.*
- 双语一致性原则：
- fallback 策略：

## 8. 约束与规则（必须遵守）
- 品牌替换：超聚变→极栈；xFusion→GeeStack
- 禁止引用 legacy UI（见 AGENTS.md）
- UI Lockfile 必须存在才能实现页面/功能

## 9. 非功能需求（入口）
- SEO：见 docs/specs/seo.md
- 性能：见 docs/specs/seo.md
- 安全：见 docs/specs/security.md
- 可访问性：见 docs/specs/seo.md

## 10. 里程碑与交付物
- 文档交付：
- 代码交付：
- 验收入口：docs/requirements/acceptance.md

## 11. 风险与假设
- 风险：
- 假设：
