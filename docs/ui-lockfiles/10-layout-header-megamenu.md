# UI Lockfile - Header & MegaMenu（GeeStack / 复刻 xFusion）

- **Status**: Draft
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
- [ ] header 结构（左右区域、导航层级、logo/语言/搜索入口）明确到组件级
- [ ] 首页透明态/滚动后实底态/sticky 行为明确（触发条件 + 样式变化）
- [ ] MegaMenu 的展开/关闭条件（hover/click/外部点击/ESC）明确
- [ ] 键盘与焦点管理明确（Tab/方向键/roving tabindex/aria）
- [ ] tokens 使用与例外（如 header 背景）明确
- [ ] Implementation Plan 文件级清单完成

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
- Center：
  - 一级导航（N 项）
- Right：
  - Language Switch
  - Search（如范围包含）
  - CTA（如目标站点有）

### 2.2 MegaMenu 信息结构
- 一级项（哪些有 dropdown）
- 二级/三级结构（分组/列/图文卡片）
- 移动端结构（drawer/accordion）

---

## 3. States（必填）
- 首页（未滚动）：
  - 背景：透明/不透明
  - 文本颜色：
  - Logo 版本（浅/深）：
- 滚动后（sticky）：
  - 背景：
  - 阴影：
  - 高度变化（如有）：
- 内页（默认）：
  - 背景：
  - 高亮策略（active link）：

---

## 4. Interactions（必填）
### 4.1 Hover / Click
- hover 打开（是/否，优先级）：
- click 打开（是/否）：
- 冲突策略（hover 与 click 同时存在时）：

### 4.2 Close Conditions
- 点击外部关闭：是/否
- ESC 关闭：是/否
- hover out 关闭延迟（如有）：duration

### 4.3 Keyboard & Focus
- Tab 顺序（从 Logo → Nav → Right actions）
- MegaMenu 内焦点策略：
  - roving tabindex（是/否）
  - 方向键移动（是/否）
- ARIA（最低要求）：
  - 触发按钮：aria-expanded / aria-controls
  - dropdown 容器 role

---

## 5. Layout & Spacing（必填）
- container：沿用 foundation / 是否例外：
- header 高度（default/sticky）：
- nav item gap：
- dropdown width / columns / gutter：

---

## 6. Typography（必填）
- nav 字号/行高/字重（引用 foundation token 或写差异）：
- dropdown 标题/列表字级：

---

## 7. Color（必填）
- header 背景（transparent/sticky/internal）：
- nav text（default/hover/active）：
- dropdown surface/border/shadow：

---

## 8. Component Inventory（必填）
| Component | Type | Reusable? | Directory Target | Responsibility |
|---|---|---:|---|---|
| Header | layout | Y | app/site/layout | 顶部导航容器 |
| MegaMenu | layout | Y | app/site/layout | 多级导航展开 |
| NavItem | component | Y | app/site/navigation or components | 导航项渲染 |
| ... | ... | ... | ... | ... |

---

## 9. Implementation Plan（文件级清单，必填）
- 新增文件：
  - `src/main/webapp/app/site/layout/...`：
- 修改文件（路由挂载/入口）：
- 删除/禁用 legacy 入口（如有）：

---

## 10. Verification（必填）
- [ ] hover/click 展开与关闭符合本 lockfile
- [ ] 点击外部/ESC 关闭有效
- [ ] Tab 可达，focus 可见
- [ ] sticky/透明→实底切换符合规则且无抖动（CLS 风险）
- [ ] 双语 label/aria-label 正确

### Evidence
- 截图（打开/关闭、滚动前后）：
- 录屏（hover/scroll）：

