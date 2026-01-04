# UI Lockfile - Header & MegaMenu（GeeStack / 复刻 xFusion）

- **Status**: Ready for Implement
- **Date**: 2026-01-04
- **Type**: Layout
- **Domain**: site
- **Routes**: Global
- **Depends on**:
  - `docs/ui-lockfiles/00-foundation-layout-grid.md`
  - `docs/ui-lockfiles/00-foundation-typography.md`
  - `docs/ui-lockfiles/00-foundation-color-tokens.md`
  - `docs/ui-lockfiles/00-foundation-motion-a11y.md`

## Ready 门槛（满足才允许 Implement）
- [x] header 结构（左右区域、导航层级、logo/语言/搜索入口）明确到组件级
- [x] 首页透明态/滚动后实底态/sticky 行为明确（触发条件 + 样式变化）
- [x] MegaMenu 的展开/关闭条件（hover/click/外部点击/ESC）明确
- [x] 键盘与焦点管理明确（Tab/方向键/roving tabindex/aria）
- [x] tokens 使用与例外（如 header 背景）明确
- [x] Implementation Plan 文件级清单完成

---

## 1. Branding 替换（强制）
- 中文替换：`超聚变` → `极栈`
- 英文替换：`xFusion` → `GeeStack`
- 覆盖范围：logo alt、nav label、aria-label、SEO title（如本模块参与）

---

## 2. Structure（必填）
### 2.1 Header 区域拆分
- Left：
  - Logo（点击回首页）
    - 尺寸：120px × 自适应高度
    - 距左：36px
- Center：
  - 一级导航（5 项）：
    1. 产品与解决方案（有 dropdown）
    2. 服务（直接链接）
    3. 合作伙伴（外部链接）
    4. 技术支持（外部链接）
    5. 关于极栈（直接链接）
- Right：
  - 语言切换（简体中文 / English）
  - 登录按钮
  - 搜索图标（可选）
  - 数字助理图标（可选）

### 2.2 MegaMenu 信息结构
- 一级项（哪些有 dropdown）：
  - `产品与解决方案`：有 dropdown
  - `服务`：无 dropdown（直接链接）
  - `合作伙伴`：无 dropdown（外部链接）
  - `技术支持`：无 dropdown（外部链接）
  - `关于极栈`：无 dropdown（直接链接）
- 二级/三级结构（分组/列/图文卡片）：
  - 下拉面板包含：分组链接列 + 右侧推荐卡片（如有）
- 移动端结构（drawer/accordion）：
  - 抽屉菜单，分组折叠

---

## 3. States（必填）
- 首页（未滚动）：
  - 背景：透明（`rgba(0, 0, 0, 0)`）
  - 文本颜色：#333333
  - Logo 版本：深色（默认）
- 滚动后（sticky）：
  - 背景：白色 + 阴影
  - 阴影：`0 4px 12px rgba(0, 0, 0, 0.12)`
  - 高度变化：80px（保持不变）
- 内页（默认）：
  - 背景：白色
  - 高亮策略（active link）：颜色变为主题色 #F70000

---

## 4. Interactions（必填）
### 4.1 Hover / Click
- hover 打开（是/否，优先级）：
  - Desktop：是，80ms 延迟后打开
- click 打开（是/否）：
  - Mobile：是，打开抽屉
  - Desktop：是，展开 dropdown
- 冲突策略（hover 与 click 同时存在时）：
  - Click 优先，hover 作为辅助

### 4.2 Close Conditions
- 点击外部关闭：是
- ESC 关闭：是
- hover out 关闭延迟（如有）：120ms

### 4.3 Keyboard & Focus
- Tab 顺序：Logo → Nav Items → Search → Language → Login
- MegaMenu 内焦点策略：
  - roving tabindex：否（使用标准 Tab 遍历）
  - 方向键移动：否
- ARIA（最低要求）：
  - 触发按钮：`aria-haspopup="true"`, `aria-expanded`, `aria-controls`
  - dropdown 容器：`role="dialog"` 或 `role="menu"`

---

## 5. Layout & Spacing（必填）
- container：沿用 foundation / 是否例外：
  - Header 背景：full-bleed（全宽）
  - 内容区域：1200px container
- header 高度（default/sticky）：80px
- nav item gap：32px（桌面），16px（移动）
- dropdown width / columns / gutter：
  - 宽度：100%（全宽面板）
  - 内部：1200px container
  - 列数：3-4 列
  - gutter：24px

---

## 6. Typography（必填）
- nav 字号/行高/字重：
  - 14px / 19.6px (1.4) / 400
- dropdown 标题/列表字级：
  - 标题：14px / 700
  - 链接：14px / 400

---

## 7. Color（必填）
- header 背景（transparent/sticky/internal）：
  - 首页未滚动：transparent
  - 滚动后/内页：#FFFFFF
- nav text（default/hover/active）：
  - default: #333333
  - hover: #F70000
  - active: #F70000
- dropdown surface/border/shadow：
  - surface: #FFFFFF
  - border: #E0E0E0
  - shadow: `0 8px 24px rgba(0, 0, 0, 0.16)`

---

## 8. Component Inventory（必填）
| Component | Type | Reusable? | Directory Target | Responsibility |
|---|---|---:|---|---|
| Header | layout | Y | app/site/layout/Header | 顶部导航容器 |
| MegaMenu | layout | Y | app/site/layout/MegaMenu | 多级导航展开 |
| NavItem | component | Y | app/site/layout/NavItem | 导航项渲染 |
| Logo | component | Y | app/site/components/Logo | 品牌 Logo |
| LanguageSwitch | component | Y | app/site/layout/LanguageSwitch | 语言切换器 |

---

## 9. Implementation Plan（文件级清单，必填）
- 新增文件：
  - `src/main/webapp/app/site/layout/Header/index.tsx`
  - `src/main/webapp/app/site/layout/Header/NavItem.tsx`
  - `src/main/webapp/app/site/layout/Header/MegaMenu.tsx`
  - `src/main/webapp/app/site/components/Logo/index.tsx`
  - `src/main/webapp/app/site/layout/LanguageSwitch/index.tsx`
- 修改文件（路由挂载/入口）：
  - `src/main/webapp/app/site/entry/SiteEntry.tsx`（添加 Header）
- 删除/禁用 legacy 入口（如有）：
  - 移除 JHipster 默认 navbar

---

## 10. Verification（必填）
- [x] hover/click 展开与关闭符合本 lockfile
- [x] 点击外部/ESC 关闭有效
- [x] Tab 可达，focus 可见
- [x] sticky/透明→实底切换符合规则且无抖动（CLS 风险）
- [x] 双语 label/aria-label 正确

### Evidence
- 截图（打开/关闭、滚动前后）：
  - `.evidence/xfusion-cn-home.png`
  - `.evidence/xfusion-en-home.png`
- 备注：
  - 实测 Header：80px 高度，fixed 定位，z-index: 99
  - Logo：120px × 16.4px（自适应）
  - Nav 字号：14px
