# UI Lockfiles Index（GeeStack）

> 目录：`docs/ui-lockfiles/`  
> 目的：将“严格复刻 + tokens + 交互完整 + 可审计检索”锁定为可执行参数。  
> 强规则：**没有对应 Lockfile（或未更新为 Ready），不得进入 Implement 阶段。**

## 状态定义
- **Draft**：仅有目录/范围，参数不完整，不允许 Implement
- **Ready for Implement**：具备实现所需的最小参数（见每个文件的“Ready 门槛”）
- **Frozen**：已验收冻结；任何变更必须同时更新 lockfile 并附证据（截图/录屏/命令结果）

## 使用流程（适用于 Claude / Codex / Gemini）
1. 先检索本目录与 `docs/specs/ui.md`，确认页面/模块是否已有 lockfile
2. 若无：基于 `_TEMPLATE.md` 或本目录的骨架文件新建 lockfile（Draft）
3. 填到 **Ready for Implement**（参数化拆解 + tokens 落盘 + 文件清单 + 验证清单）
4. 进入 Implement（只允许按 lockfile 执行，不得自作主张改结构）
5. 完成后更新 lockfile 的 Verification 与证据，必要时标记 Frozen

## 第一批（建议优先完成）
- Foundation（跨全站复用）：grid / typography / colors / motion-a11y
- Global layout：header-megamenu / footer
- Page：home（因为它决定 header 透明态、首屏 LCP、核心楼层基准）

## Lockfile 列表

| File | Type | Domain | RouteKey / Routes | Status | Owner | Notes |
|---|---|---|---|---|---|---|
| 00-foundation-layout-grid.md | Foundation | site | Global | Draft | Elvis | container/breakpoints/gutter/section spacing |
| 00-foundation-typography.md | Foundation | site | Global | Draft | Elvis | zh/en font stack + type scale |
| 00-foundation-color-tokens.md | Foundation | site | Global | Draft | Elvis | tokens mapping + state colors |
| 00-foundation-motion-a11y.md | Foundation | site | Global | Draft | Elvis | durations/easing + focus + menu patterns |
| 10-layout-header-megamenu.md | Layout | site | header/megamenu | Draft | Elvis | behavior + keyboard + scroll/sticky |
| 11-layout-footer.md | Layout | site | footer | Draft | Elvis | columns + legal + locale consistency |
| 20-page-home.md | Page | site | /cn , /en | Draft | Elvis | sections + LCP/CLS + hero |

> 备注：如 P0 包含 Search / LanguageSwitch，可新增：`12-component-language-switch.md`、`13-feature-search.md`。
