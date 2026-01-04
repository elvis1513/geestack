# UI Lockfile - Foundation Typography（GeeStack）

- **Status**: Draft
- **Date**: 2026-01-04
- **Type**: Foundation
- **Domain**: site
- **Scope**: Global

## Ready 门槛（满足才允许 Implement）
- [ ] 明确 zh/en 字体栈（含 fallback）
- [ ] 明确 type scale（nav/H1/H2/H3/body/caption）**数值**与 line-height
- [ ] 明确 font-weight 使用范围
- [ ] 明确 tokens 落盘与调用方式

---

## 1. Font Family（必填）
- zh-cn font stack：
- en font stack：
- fallback 策略（缺字/性能）：

---

## 2. Type Scale（必填）
> 至少列出：nav / h1 / h2 / h3 / body / caption

| Token | Usage | font-size | line-height | font-weight | letter-spacing |
|---|---|---:|---:|---:|---:|
| type.nav | Top nav / menu |  |  |  |  |
| type.h1 | Page hero title |  |  |  |  |
| type.h2 | Section title |  |  |  |  |
| type.h3 | Card title |  |  |  |  |
| type.body | Paragraph |  |  |  |  |
| type.caption | Small text |  |  |  |  |

---

## 3. Font Weights（必填）
- 常用权重集合（例如 400/500/600/700）：
- 每种权重的使用边界（标题/正文/按钮）：

---

## 4. Responsive Typography（必填）
- H1 在 mobile/tablet/desktop 的缩放策略：
- nav 在 mobile 的展示策略（缩小/折叠/抽屉）：

---

## 5. Tokens 落盘（必填）
- 建议文件：
  - `app/site/theme/typography.ts`
  - 或 `app/site/theme/tokens.css`
- 禁止魔法值规则：
  - 组件中不得直接写字号/行高（除 tokens 映射层）

---

## 6. Evidence（证据）
- 截图/标注：
- 备注：

