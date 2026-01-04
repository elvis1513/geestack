# UI Lockfile - Foundation Color Tokens（GeeStack）

- **Status**: Ready for Implement
- **Date**: 2026-01-04
- **Type**: Foundation
- **Domain**: site
- **Scope**: Global

## Ready 门槛（满足才允许 Implement）
- [x] 明确背景/文本/弱文本/边框/分割线/卡片底色等基础色
- [x] 明确 Primary/Secondary CTA 的 default/hover/active/focus 状态色
- [x] 明确 shadow 的 color/opacity 与使用场景
- [x] 输出 tokens 映射表（token 名 → 颜色值 → 用途）

---

## 1. 基础色（必填）
| Token | Value | Usage |
|---|---|---|
| color.bg | #FFFFFF | 全站背景 |
| color.surface | #FFFFFF | 卡片/模块底色 |
| color.text | #333333 | 主文本 (rgb(51, 51, 51)) |
| color.text.muted | #666666 | 弱文本 (rgb(102, 102, 102)) |
| color.text.light | #999999 | 辅助文本 (rgb(153, 153, 153)) |
| color.border | #E0E0E0 | 边框/分割线 |
| color.link | #333333 | 链接（与主文本同） |
| color.link.hover | #F70000 | 链接 hover (品牌色) |

---

## 2. CTA（必填）
### 2.1 Primary CTA
| State | Token | Value | Notes |
|---|---|---|---|
| default | color.cta.primary | #F70000 | 品牌红 (rgb(247, 0, 0)) |
| hover | color.cta.primary.hover | #E60000 | 深化 10% |
| active | color.cta.primary.active | #CC0000 | 深化 20% |
| focus | color.cta.primary.focus | #F70000 | 带 2px outline |

### 2.2 Secondary CTA
| State | Token | Value | Notes |
|---|---|---|---|
| default | color.cta.secondary | #FFFFFF | 白底 |
| hover | color.cta.secondary.hover | #F5F5F5 | 浅灰 |
| active | color.cta.secondary.active | #EEEEEE | 更深灰 |
| focus | color.cta.secondary.focus | #FFFFFF | 带 border |

---

## 3. 状态色（可选但建议）
| Token | Value | Usage |
|---|---|---|
| color.state.success | #52C41A | 成功提示 |
| color.state.warning | #FAAD14 | 警告提示 |
| color.state.danger | #F70000 | 错误提示（复用品牌色） |
| color.state.info | #1890FF | 信息提示 |

---

## 4. Shadow / Overlay（必填）
- shadow color / opacity：
  - sm: `0 2px 4px rgba(0, 0, 0, 0.08)`
  - md: `0 4px 12px rgba(0, 0, 0, 0.12)`
  - lg: `0 8px 24px rgba(0, 0, 0, 0.16)`
- overlay / backdrop（菜单/弹窗）：
  - `rgba(0, 0, 0, 0.4)` - 40% 黑色遮罩
- 使用边界：
  - Header 悬浮阴影：md
  - MegaMenu 遮罩：overlay
  - 卡片 hover：sm

---

## 5. 暗色模式（本期默认不做）
- 结论：不启用（如需启用需 ADR）

---

## 6. Tokens 落盘（必填）
- 建议文件：
  - `app/site/theme/colors.ts` / `tokens.css`
- 禁止魔法值规则：
  - 组件中禁止直接写 hex/rgb（除 tokens 映射层）

```typescript
// app/site/theme/colors.ts
export const colors = {
  // 基础色
  bg: '#FFFFFF',
  surface: '#FFFFFF',
  text: '#333333',
  textMuted: '#666666',
  textLight: '#999999',
  border: '#E0E0E0',

  // CTA
  cta: {
    primary: '#F70000',
    primaryHover: '#E60000',
    primaryActive: '#CC0000',
    secondary: '#FFFFFF',
    secondaryHover: '#F5F5F5',
  },

  // 状态
  success: '#52C41A',
  warning: '#FAAD14',
  danger: '#F70000',
  info: '#1890FF',

  // Shadow
  shadow: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.08)',
    md: '0 4px 12px rgba(0, 0, 0, 0.12)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.16)',
  },
  overlay: 'rgba(0, 0, 0, 0.4)',
};
```

---

## 7. Evidence（证据）
- 截图/标注：
  - `.evidence/xfusion-cn-home.png`
  - `.evidence/xfusion-en-home.png`
- 备注：
  - 品牌色：#F70000（xFusion 红，需替换为 GeeStack 品牌色）
  - 文本色：#333333 (rgb(51, 51, 51))
  - Footer 链接：#999999 (rgb(153, 153, 153))
  - 按钮 CTA 背景：#F70000
