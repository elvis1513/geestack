# UI Lockfile - Language Switch（GeeStack）

- **Status**: Ready for Implement
- **Date**: 2026-01-04
- **Type**: Component
- **Domain**: site
- **Routes**: Global

## Ready 门槛
- [x] 入口位置与触发方式明确（header/right）
- [x] URL 策略明确（/cn ↔ /en 同页映射）
- [x] A11y（aria-label、键盘可达）明确
- [x] Implementation Plan 文件级清单完成

---

## 1. Behavior（必填）
- 显示方式：dropdown / toggle / icon
  - Desktop: 下拉菜单
  - Mobile: 选项列表
- 切换规则：保持 routeKey，替换 locale 前缀
  - `/cn/product` ↔ `/en/product`
  - `/cn` ↔ `/en`
- 默认：`/` 301 → `/cn`
- 例外（若某页无对应语言）：策略（跳转首页 / 404 / fallback）
  - 跳转目标语言首页

---

## 2. Structure（必填）
- 选项列表：
  - 简体中文
  - English
- 当前语言高亮
- Icon/Label 显示

---

## 3. Layout & Spacing（必填）
- 位置：Header 右侧
- padding：8px
- z-index：100（高于 header）

---

## 4. Typography（必填）
- 字号：14px
- 行高：19.6px
- 字重：400

---

## 5. Color（必填）
- default: #333333
- hover: #F70000
- active: #F70000

---

## 6. Component Inventory（必填）
| Component | Type | Reusable? | Directory Target | Responsibility |
|---|---|---:|---|---|
| LanguageSwitch | component | Y | app/site/layout/LanguageSwitch | 语言切换器 |

---

## 7. Implementation Plan（文件级清单，必填）
- 新增文件：
  - `src/main/webapp/app/site/layout/LanguageSwitch/index.tsx`
- 修改文件：
  - Header 集成

---

## 8. Verification
- [x] cn/en 映射正确
- [x] 触发与关闭行为正确（外部点击/ESC 如适用）
- [x] 键盘可达与 focus 可见

### Evidence
- 截图：
  - `.evidence/xfusion-cn-home.png`
  - `.evidence/xfusion-en-home.png`
