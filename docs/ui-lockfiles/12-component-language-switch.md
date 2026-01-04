# UI Lockfile - Language Switch（GeeStack）

- **Status**: Draft
- **Date**: 2026-01-04
- **Type**: Component
- **Domain**: site
- **Routes**: Global

## Ready 门槛
- [ ] 入口位置与触发方式明确（header/right）
- [ ] URL 策略明确（/cn ↔ /en 同页映射）
- [ ] A11y（aria-label、键盘可达）明确
- [ ] Implementation Plan 文件级清单完成

---

## 1. Behavior（必填）
- 显示方式：dropdown / toggle / icon
- 切换规则：保持 routeKey，替换 locale 前缀
- 默认：`/` 301 → `/cn`
- 例外（若某页无对应语言）：策略（跳转首页 / 404 / fallback）

---

## 2. Verification
- [ ] cn/en 映射正确
- [ ] 触发与关闭行为正确（外部点击/ESC 如适用）
- [ ] 键盘可达与 focus 可见

