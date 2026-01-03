# ADR-0001: Greenfield Site Rewrite inside JHipster Monolith

## Status
- Proposed / Accepted / Superseded

## Context
- 为什么需要复刻 xFusion 官网风格与交互
- 为什么仅复用 JHipster 作为脚手架与后端基座
- 为什么要隔离 legacy UI

## Decision
- 前端新官网全部落在 `app/site/**`
- 不使用 JHipster 自带 admin/entities UI
- UI Lockfile 驱动开发：无 lockfile 不实现
- tokens 驱动主题：`app/site/theme/**` 为唯一权威
- 多语言策略：zh-cn/en，i18n key 前缀 `site.*`

## Consequences
- 正面影响：
- 代价与风险：
- 维护策略：

## Alternatives Considered
- 备选方案 A：
- 备选方案 B：
- 否决原因：

## Rollout Plan
- Phase 0：文档与骨架
- Phase 1：首页 + Header/MegaMenu/Footer
- Phase 2：核心频道页（产品/资料/案例）
- Phase 3：SEO/性能强化与内容后台（如需要）


docs/specs/ui.md
docs/requirements/acceptance.md
docs/specs/seo.md
docs/specs/security.md
docs/requirements/PRD.md
docs/specs/api.md
docs/adr/0001-*.md
