# UI Lockfile - Foundation Color Tokens（GeeStack）

- **Status**: Draft
- **Date**: 2026-01-04
- **Type**: Foundation
- **Domain**: site
- **Scope**: Global

## Ready 门槛（满足才允许 Implement）
- [ ] 明确背景/文本/弱文本/边框/分割线/卡片底色等基础色
- [ ] 明确 Primary/Secondary CTA 的 default/hover/active/focus 状态色
- [ ] 明确 shadow 的 color/opacity 与使用场景
- [ ] 输出 tokens 映射表（token 名 → 颜色值 → 用途）

---

## 1. 基础色（必填）
| Token | Value | Usage |
|---|---|---|
| color.bg |  | 全站背景 |
| color.surface |  | 卡片/模块底色 |
| color.text |  | 主文本 |
| color.text.muted |  | 弱文本 |
| color.border |  | 边框/分割线 |
| color.link |  | 链接 |
| color.link.hover |  | 链接 hover |

---

## 2. CTA（必填）
### 2.1 Primary CTA
| State | Token | Value | Notes |
|---|---|---|---|
| default | color.cta.primary |  |  |
| hover | color.cta.primary.hover |  |  |
| active | color.cta.primary.active |  |  |
| focus | color.cta.primary.focus |  |  |

### 2.2 Secondary CTA
| State | Token | Value | Notes |
|---|---|---|---|
| default | color.cta.secondary |  |  |
| hover | color.cta.secondary.hover |  |  |
| active | color.cta.secondary.active |  |  |
| focus | color.cta.secondary.focus |  |  |

---

## 3. 状态色（可选但建议）
| Token | Value | Usage |
|---|---|---|
| color.state.success |  | 成功提示 |
| color.state.warning |  | 警告提示 |
| color.state.danger |  | 错误提示 |
| color.state.info |  | 信息提示 |

---

## 4. Shadow / Overlay（必填）
- shadow color / opacity：
- overlay / backdrop（菜单/弹窗）：
- 使用边界：哪些组件可以用阴影，哪些禁止（避免过度）

---

## 5. 暗色模式（本期默认不做）
- 结论：不启用（如需启用需 ADR）

---

## 6. Tokens 落盘（必填）
- 建议文件：
  - `app/site/theme/colors.ts` / `tokens.css`
- 禁止魔法值规则：
  - 组件中禁止直接写 hex/rgb（除 tokens 映射层）

---

## 7. Evidence（证据）
- 截图/标注：
- 备注：

