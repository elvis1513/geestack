# UI Lockfile - Foundation Motion & A11y（GeeStack）

- **Status**: Draft
- **Date**: 2026-01-04
- **Type**: Foundation
- **Domain**: site
- **Scope**: Global

## Ready 门槛（满足才允许 Implement）
- [ ] 明确 duration/easing（至少 3 档：fast/normal/slow）
- [ ] 明确 focus ring 规则与可见性要求（与 WCAG AA 对齐）
- [ ] 明确全站通用交互模式（Menu/Modal/Accordion 的 keyboard 约定）
- [ ] 明确 prefers-reduced-motion 策略

---

## 1. Motion Tokens（必填）
| Token | Value | Usage |
|---|---|---|
| motion.duration.fast |  | hover/微交互 |
| motion.duration.normal |  | 菜单展开/收起 |
| motion.duration.slow |  | 页面级过渡（如有） |
| motion.easing.standard |  | 默认 easing |
| motion.easing.emphasized |  | 强调动画（谨慎） |

---

## 2. Global Interaction Patterns（必填）
### 2.1 Menu / MegaMenu（通用）
- 打开：hover / click（写明触发优先级）
- 关闭：
  - 点击外部：是/否
  - ESC：是/否
  - hover out：规则
- 键盘：
  - Tab 顺序：
  - roving tabindex（是否采用）：
  - aria roles（menu/menuitem）策略：

### 2.2 Modal / Drawer（如使用）
- focus trap：是/否
- ESC 关闭：是/否
- 关闭按钮可达：是/否

### 2.3 Accordion / Collapse（如使用）
- 键盘操作（Enter/Space）：
- aria-expanded/controls：

---

## 3. Focus Ring（必填）
- focus-visible 样式：
- 对比度要求（至少 WCAG AA）：
- 禁止移除 focus outline（除非替代可见方案）：

---

## 4. Reduced Motion（必填）
- `prefers-reduced-motion` 策略：
  - 是否关闭大幅位移/滚动动效：
  - 是否保留必要的状态变化（无动画）：

---

## 5. Evidence（证据）
- 截图/录屏：
- 备注：

