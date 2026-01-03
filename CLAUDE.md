# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical Constraint: Read AGENTS.md First

**Before making any changes to this codebase, you MUST read `AGENTS.md` in full.**

This repository has a unique constraint:

- **JHipster is used ONLY as backend scaffold and build infrastructure**
- **The entire frontend UI/layout/styling has been completely rewritten from scratch**
- **Treat all existing JHipster frontend pages as LEGACY - do NOT reference or extend them**

All frontend work must follow the constraints in `AGENTS.md`. The hierarchy of authority is:

1. `AGENTS.md` (this file) - Engineering standards, directory structure, quality gates
2. `docs/requirements/**` - Product requirements and acceptance criteria
3. `docs/specs/**` - UI information architecture, API contracts, security model
4. `docs/adr/**` - Architecture Decision Records
5. JHipster defaults - Only as reference for build/backend infrastructure

---

## Project Overview

**Geestack** is a JHipster 8.11.0 generated monolithic web application using a modern full-stack architecture:

- **Backend**: Java 17, Spring Boot 3.4.5, Spring Security (OAuth2/JWT), Spring Data JPA, PostgreSQL, Liquibase
- **Frontend**: React 18.3.1 with TypeScript, Redux Toolkit, custom design system (NOT JHipster's default UI)
- **Build**: Maven for backend, npm for frontend
- **Testing**: JUnit/Maven for backend, Jest for frontend unit tests, Cypress for E2E

---

## Common Development Commands

### Starting Development Server

Run these in two separate terminals for hot-reload development:

```bash
./mvnw              # Start Spring Boot backend (port 8080)
./npmw start        # Start React frontend with webpack-dev-server (port 9000)
```

Or use the combined watch mode:

```bash
npm run watch       # Runs both frontend and backend with hot reload
```

### Testing

```bash
# Backend tests
./mvnw verify                    # Run all Java tests (unit + integration)

# Frontend tests
npm test                         # Run Jest unit tests
npm run test:watch              # Jest in watch mode

# E2E tests (requires running backend)
npm run e2e                     # Run Cypress E2E tests
npm run e2e:dev                 # Start backend and run E2E tests

# Linting
npm run lint                    # Run ESLint
npm run prettier:check          # Check Prettier formatting
npm run prettier:format         # Apply Prettier formatting
```

### Building for Production

```bash
./mvnw -Pprod clean verify      # Build production JAR with optimized frontend
java -jar target/*.jar          # Run production JAR

# Docker
npm run java:docker             # Build Docker image
docker compose -f src/main/docker/app.yml up -d    # Run app container
```

### Docker Services

```bash
# Start required infrastructure services (PostgreSQL, Redis, etc.)
docker compose -f src/main/docker/services.yml up -d

# Individual services
docker compose -f src/main/docker/postgresql.yml up -d
docker compose -f src/main/docker/redis.yml up -d
```

---

## Architecture Overview

### Frontend Directory Structure (Critical - See AGENTS.md)

The frontend is organized with strict separation between new UI and legacy code:

- **`app/site/`** - NEW public website UI (completely custom design)

  - `entry/` - Entry container connecting to JHipster routing
  - `routes/` - Route definitions, lazy loading
  - `layout/` - Header/MegaMenu/Footer/Breadcrumb (NEW implementation)
  - `pages/` - Page-level components (one directory per page)
  - `sections/` - Reusable section components (Hero/Feature/CTA/etc)
  - `components/` - Generic display components (Card/Button/Tabs/Modal)
  - `navigation/` - Navigation configuration (strong-typed, bilingual)
  - `theme/` - Design system (Design Tokens / CSS Variables / Typography / Spacing)
  - `styles/` - Site-specific styles (isolated from global)
  - `api/` - Data fetching layer for site
  - `types/` - TypeScript types for site
  - `hooks/` - Custom React hooks for site
  - `utils/` - Utility functions for site

- **`app/platform/`** - Platform infrastructure (UI-agnostic)

  - `http/` - Axios interceptors, error handling
  - `i18n/` - i18n infrastructure (no page layouts)
  - `store/` - Redux Toolkit base config
  - `routing/` - Routing utilities (framework integration)
  - `security/` - Authentication guards (if console domain needed)

- **`app/legacy/`** - Isolated JHipster default UI (DO NOT EXTEND)

**IMPORTANT**: All new UI MUST go in `app/site/**`. Forbidden: adding to `entities/`, `admin/`, or old `shared/layout` directories.

### Backend Structure (`src/main/java/com/geestack/www/`)

Backend continues to follow JHipster's layered architecture:

- **`domain/`** - JPA entities with audit fields (extends `AbstractAuditingEntity`)
- **`repository/`** - Spring Data JPA repositories
- **`service/`** - Business logic layer
- **`web/`** - REST controllers
- **`security/`** - Spring Security config, JWT handling
- **`config/`** - Spring configuration classes

---

## Key Architectural Patterns

1. **Layered Architecture**: Controller → Service → Repository → Entity
2. **DTO Pattern**: MapStruct mappers between entities and DTOs
3. **Repository Pattern**: Spring Data JPA repositories
4. **JWT Authentication**: Stateless OAuth2 resource server
5. **Caching**: Redis with Hibernate second-level cache
6. **Database Migrations**: Liquibase changelogs in `src/main/resources/config/liquibase/`

---

## Frontend Development Rules (Critical)

### Design System

- **ALL theme tokens MUST be in `app/site/theme/**`\*\*
- NO magic numbers: no hardcoded hex colors, random spacing, or arbitrary values
- All colors, typography, spacing, shadows, z-index must come from design tokens

### Navigation & Routing

- All navigation structure centralized in `app/site/navigation/**`
- Strong-typed with TypeScript
- Must support both `zh-cn` and `en`
- Default entry point is the site home page, NOT legacy entities/admin

### Internationalization

- Site i18n keys use `site.*` prefix
- Only `zh-cn` and `en` supported
- NO hardcoded long text in components

### Legacy UI Handling

- JHipster's admin/entities CRUD UI is **DEPRECATED**
- DO NOT extend, reference, or use legacy UI patterns
- If admin/console is needed, create new domain under `app/console/**`

---

## Naming Conventions

### Java Backend

- Entities: Noun singular PascalCase (`Product`, `CaseStudy`, `NewsArticle`)
- Repository: `XxxRepository`
- Service: `XxxService` (impl: `XxxServiceImpl`)
- DTO: `XxxDTO`
- Mapper: `XxxMapper`
- Resource: `XxxResource`
- NO abbreviations or verb-based entity names

### Frontend

- Directories: `kebab-case`
- Pages: `XxxPage`
- Components: `PascalCase`
- Hooks: `useXxx`
- Route paths: `kebab-case` (`/products-and-solutions`), params: `/:slug`, `/:id`

---

## Database & Liquibase

- NEVER modify published changelogs
- ALL DB changes must add new changelog entries
- Document: purpose, affected objects, rollback strategy (for complex changes)

---

## Quality Gates (Minimum Self-Check)

Before completing any task:

- Backend: `./mvnw test` (recommended: `./mvnw verify`)
- Frontend: `npm test` + `npm run lint` + `npm run prettier:check`
- Build: `./mvnw -Pprod clean verify` (if affecting build pipeline)

If unable to run, document: reason, risks, suggested verification steps.

---

## ADR Triggers (Must Write Architecture Decision Record)

Write an ADR in `docs/adr/` when:

- Adding/replacing UI library (Bootstrap replacement, component library, SSR)
- Global theme system changes
- Major routing architecture changes
- Permission model changes
- Introducing cross-domain capabilities (search, rich text, CMS, download center)

---

## Pre-Delivery Checklist

- [ ] Did NOT reference legacy UI layouts/styles; new UI only in `app/site/**`
- [ ] Theme tokens centralized in `site/theme/**`, no scattered magic values
- [ ] Navigation centralized in `site/navigation/**`, bilingual support
- [ ] Legacy admin/entities UI NOT appearing as entry or navigation item
- [ ] i18n keys use `site.*` prefix, no hardcoded long text
- [ ] DB changes: added new changelog, did NOT modify history
- [ ] Ran minimum test suite OR documented reason and risks
- [ ] Created ADR if triggers met

---

## Important File Locations

- `AGENTS.md` - **READ THIS FIRST** - Complete engineering constraints
- `.yo-rc.json` - JHipster configuration
- `src/main/resources/config/application*.yml` - Spring configuration
- `src/main/resources/config/liquibase/` - Database migrations
- `webpack/webpack.*.js` - Webpack configuration
- `src/test/javascript/cypress/` - E2E tests
- `pom.xml` - Maven configuration
- `docs/requirements/` - Product requirements
- `docs/specs/` - UI specs, API contracts, security, SEO
- `docs/adr/` - Architecture Decision Records
