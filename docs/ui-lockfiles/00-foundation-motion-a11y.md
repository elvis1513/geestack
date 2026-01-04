# UI Lockfile - Foundation Motion & A11y（GeeStack）

- **Status**: Ready for Implement
- **Date**: 2026-01-04
- **Type**: Foundation
- **Domain**: site
- **Scope**: Global

## Ready 门槛（满足才允许 Implement）
- [x] 明确 duration/easing（至少 3 档：fast/normal/slow）
- [x] 明确 focus ring 规则与可见性要求（与 WCAG AA 对齐）
- [x] 明确全站通用交互模式（Menu/Modal/Accordion 的 keyboard 约定）
- [x] 明确 prefers-reduced-motion 策略

---

## 1. Motion Tokens（必填）
| Token | Value | Usage |
|---|---|---|
| motion.duration.fast | 150ms | hover/微交互 |
| motion.duration.normal | 250ms | 菜单展开/收起 |
| motion.duration.slow | 350ms | 页面级过渡（如有） |
| motion.easing.standard | cubic-bezier(0.4, 0, 0.2, 1) | 默认 easing |
| motion.easing.emphasized | cubic-bezier(0.0, 0, 0.2, 1) | 强调动画（谨慎） |

---

## 2. Global Interaction Patterns（必填）
### 2.1 Menu / MegaMenu（通用）
- 打开：hover / click（写明触发优先级）
  - Desktop: hover 80ms 后打开
  - Mobile: click 打开（抽屉）
- 关闭：
  - 点击外部：是
  - ESC：是
  - hover out：120ms 延迟后关闭
- 键盘：
  - Tab 顺序：Logo → Nav → Search → Lang → Login
  - roving tabindex：否（标准 Tab 遍历）
  - aria roles：`role="navigation"`, `aria-haspopup="true"`, `aria-expanded`

### 2.2 Modal / Drawer（如使用）
- focus trap：是
- ESC 关闭：是
- 关闭按钮可达：是

### 2.3 Accordion / Collapse（如使用）
- 键盘操作（Enter/Space）：是
- aria-expanded/controls：是

---

## 3. Focus Ring（必填）
- focus-visible 样式：
  - 颜色：#F70000（品牌色）或 #1890FF（标准蓝）
  - 宽度：2px
  - 偏移：2px outline
- 对比度要求（至少 WCAG AA）：
  - 最小 3:1 对比度
- 禁止移除 focus outline：
  - 除非提供等效替代（box-shadow 或自定义样式）

---

## 4. Reduced Motion（必填）
- `prefers-reduced-motion` 策略：
  - 是否关闭大幅位移/滚动动效：是，关闭非必要动画
  - 是否保留必要的状态变化（无动画）：是，保留状态切换（无过渡）

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 5. Evidence（证据）
- 截图/录屏：
  - `.evidence/xfusion-cn-home.png`
  - `.evidence/xfusion-en-home.png`
- 备注：
  - xFusion 实测 transition: `all`（未指定具体属性）
  - 建议：明确指定 transition 属性（color, background-color, transform）
  - Header fixed 定位，z-index: 99
