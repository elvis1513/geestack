# UI Lockfile - Footer（GeeStack / 复刻 xFusion）

- **Status**: Draft
- **Date**: 2026-01-04
- **Type**: Layout
- **Domain**: site
- **Routes**: Global
- **Depends on**:
  - `docs/ui-lockfiles/00-foundation-layout-grid.md`
  - `docs/ui-lockfiles/00-foundation-typography.md`
  - `docs/ui-lockfiles/00-foundation-color-tokens.md`

## Ready 门槛（满足才允许 Implement）
- [ ] footer 栏目结构（列数/分组/链接类型）明确
- [ ] 版权/备案/法律信息区块明确
- [ ] 移动端折叠策略明确
- [ ] tokens/spacing/typography 明确
- [ ] Implementation Plan 文件级清单完成

---

## 1. Branding 替换（强制）
- 中文替换：`超聚变` → `极栈`
- 英文替换：`xFusion` → `GeeStack`
- 覆盖范围：公司名、链接文本、aria-label

---

## 2. Structure（必填）
- 上半区（栏目链接区）：
  - 列 1：
  - 列 2：
  - 列 3：
  - （如有）社交媒体/二维码/订阅入口：
- 下半区（legal/info）：
  - 版权
  - 备案（如适用）
  - 隐私/条款链接

---

## 3. Layout & Responsive（必填）
- desktop columns：
- mobile：
  - 是否折叠（accordion）：
  - 折叠交互与 A11y（aria-expanded）：
- padding-top/bottom：
- 分割线与间距：

---

## 4. Typography（必填）
- 栏目标题字级：
- 链接字级：
- legal 文本字级：

---

## 5. Color（必填）
- background：
- text/link：
- hover/active：
- divider：

---

## 6. Component Inventory（必填）
| Component | Type | Reusable? | Directory Target | Responsibility |
|---|---|---:|---|---|
| Footer | layout | Y | app/site/layout | 页脚容器 |
| FooterColumn | component | Y | app/site/layout | 栏目列 |
| FooterLink | component | Y | app/site/components | 链接渲染 |
| ... | ... | ... | ... | ... |

---

## 7. Implementation Plan（文件级清单，必填）
- 新增文件：
- 修改文件：
- 依赖导航配置（如需要）：

---

## 8. Verification（必填）
- [ ] 栏目结构与目标站点一致（含移动端策略）
- [ ] 链接 hover/focus 可见
- [ ] 双语一致（结构相同、文案正确）
- [ ] A11y：折叠/链接可达

### Evidence
- 截图（desktop/mobile）：

