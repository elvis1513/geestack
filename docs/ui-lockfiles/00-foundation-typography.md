# UI Lockfile - Foundation Typography（GeeStack）

- **Status**: Ready for Implement
- **Date**: 2026-01-04
- **Type**: Foundation
- **Domain**: site
- **Scope**: Global

## Ready 门槛（满足才允许 Implement）
- [x] 明确 zh/en 字体栈（含 fallback）
- [x] 明确 type scale（nav/H1/H2/H3/body/caption）**数值**与 line-height
- [x] 明确 font-weight 使用范围
- [x] 明确 tokens 落盘与调用方式

---

## 1. Font Family（必填）
- zh-cn font stack：
  - **"Microsoft YaHei", Arial, "PingFang SC", sans-serif**
- en font stack：
  - **Arial, "Microsoft YaHei", PingFangSC, sans-serif**
- fallback 策略（缺字/性能）：
  - 优先系统字体，减少网络请求
  - 中英文混排时自动适配

---

## 2. Type Scale（必填）
> 至少列出：nav / h1 / h2 / h3 / body / caption

| Token | Usage | font-size | line-height | font-weight | letter-spacing |
|---|---|---:|---:|---:|---:|
| type.nav | Top nav / menu | 14px | 19.6px (1.4) | 400 | 0 |
| type.h1 | Page hero title | 60px | 84px (1.4) | 400 | 0 |
| type.h2 | Section title | 48px | 67.2px (1.4) | 400 | 0 |
| type.h3 | Card title | 30px | 36px (1.2) | 500 | 0 |
| type.body | Paragraph | 14px | 19.6px (1.4) | 400 | 0 |
| type.caption | Small text | 12px | 16.8px (1.4) | 400 | 0 |

**注意**：
- Desktop H1: 60px/84px
- Mobile H1: 30px/36px（响应式缩小）
- 行高统一使用 1.4（mobile 可 1.2）

---

## 3. Font Weights（必填）
- 常用权重集合：**400 / 500 / 700**
- 每种权重的使用边界：
  - 400 (Regular): body, nav, 默认文本
  - 500 (Medium): 强调标题、卡片标题
  - 700 (Bold): 按钮、CTA、特殊强调

---

## 4. Responsive Typography（必填）
- H1 在 mobile/tablet/desktop 的缩放策略：
  - Mobile (<768px): 30px
  - Desktop (≥768px): 60px
- nav 在 mobile 的展示策略（缩小/折叠/抽屉）：
  - Mobile: 抽屉菜单（隐藏）
  - Desktop: 水平导航（14px）

---

## 5. Tokens 落盘（必填）
- 建议文件：
  - `app/site/theme/typography.ts`
  - 或 `app/site/theme/tokens.css`
- 禁止魔法值规则：
  - 组件中不得直接写字号/行高（除 tokens 映射层）

```typescript
// app/site/theme/typography.ts
export const fontFamily = {
  zh: '"Microsoft YaHei", Arial, "PingFang SC", sans-serif',
  en: 'Arial, "Microsoft YaHei", PingFangSC, sans-serif',
};

export const fontSize = {
  nav: '14px',
  h1: { desktop: '60px', mobile: '30px' },
  h2: '48px',
  h3: '30px',
  body: '14px',
  caption: '12px',
};

export const lineHeight = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
};

export const fontWeight = {
  regular: 400,
  medium: 500,
  bold: 700,
};
```

---

## 6. Evidence（证据）
- 截图/标注：
  - `.evidence/xfusion-cn-home.png`
  - `.evidence/xfusion-en-home.png`
- 备注：
  - 实测 body: 14px/19.6px (1.4), font-weight 400
  - 实测 H3 (desktop): 60px/84px (1.4), font-weight 400
  - 实测 H3 (mobile): 30px/36px (1.2), font-weight 500
