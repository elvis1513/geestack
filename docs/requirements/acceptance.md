# GeeStack（极栈）官网验收标准（复刻 xFusion）

## 1. 验收范围与环境
- 环境：dev / staging / prod
- 浏览器支持：
- 分辨率与断点：

## 2. 全站强制验收项（必过）
### 2.1 品牌替换（必过）
- 中文：超聚变 → 极栈
- 英文：xFusion → GeeStack
- 覆盖范围：Header/MegaMenu/Footer、页面标题、按钮、SEO meta、图片 alt、可下载资源名（如存在）

### 2.2 双语一致性（必过）
- zh-cn/en 路由与 IA 对齐
- 关键页面无缺失翻译
- 语言切换可用且状态一致

### 2.3 交互完整（必过）
- MegaMenu 展开/关闭（含点击外部、ESC）
- hover/focus/active 状态齐全
- 搜索（如范围包含）可用

### 2.4 A11y（必过）
- 键盘可达（Tab/Shift+Tab）
- focus 可见
- 语义与 ARIA 合规（最低 WCAG 2.1 AA）

## 3. 复刻一致性验收维度（量化口径）
### 3.1 Layout/Spacing
- container、gutter、section padding 与 Lockfile 一致
- 禁止为占位图修改结构

### 3.2 Typography
- nav/H1/H2/H3/body/caption 的 size/weight/line-height 与 Lockfile 一致

### 3.3 Color & Theme
- tokens 驱动，组件内无魔法色值
- CTA、hover、focus、active 与 Lockfile 一致

### 3.4 Interaction & Motion
- 动效 duration/easing 与 Lockfile 一致
- scroll/sticky 行为与 Lockfile 一致

### 3.5 Responsive
- 至少覆盖：mobile/tablet/desktop
- 关键断点下无布局塌陷

## 4. 页面级验收清单（表格）
| Page/Feature | Locale | Layout | Typography | Color | Interaction | Responsive | SEO | A11y | Notes |
|---|---|---|---|---|---|---|---|---|---|
|  | zh-cn |  |  |  |  |  |  |  |  |
|  | en |  |  |  |  |  |  |  |  |

## 5. 工程验收（必过）
- `npm run lint`
- `npm run prettier:check`
- `npm test`
- 生产构建（如涉及）：`./mvnw -Pprod clean verify`

## 6. 证据要求
- 每个 PR 必须提供：
  - Lockfile 路径
  - 至少 3 张关键截图（Header/MegaMenu、首屏、Footer）
  - 命令执行结果或替代验证说明
