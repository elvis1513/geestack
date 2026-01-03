# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Geestack** is a JHipster 8.11.0 generated monolithic web application using a modern full-stack architecture:

- **Backend**: Java 17, Spring Boot 3.4.5, Spring Security (OAuth2/JWT), Spring Data JPA, PostgreSQL, Liquibase
- **Frontend**: React 18.3.1 with TypeScript, Redux Toolkit, Bootstrap 5.3.6, Webpack 5
- **Build**: Maven for backend, npm for frontend
- **Testing**: JUnit/Maven for backend, Jest for frontend unit tests, Cypress for E2E

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

### Cache Configuration

The application uses Redis for caching (Redisson). To start Redis:

```bash
docker compose -f src/main/docker/redis.yml up -d
```

To disable caching, add to `application.yml`:

```yaml
spring:
  cache:
    type: none
```

## Architecture Overview

### Backend Structure (`src/main/java/com/geestack/www/`)

- **`domain/`** - JPA entities with audit fields (extends `AbstractAuditingEntity`)
- **`repository/`** - Spring Data JPA repositories
- **`service/`** - Business logic layer
- **`web/`** - REST controllers
- **`security/`** - Spring Security config, JWT handling
- **`config/`** - Spring configuration classes

### Frontend Structure (`src/main/webapp/app/`)

- **`shared/`** - Shared components (auth, layout, utilities)
- **`entities/`** - Generated entity components (CRUD)
- **`config/`** - Frontend configuration (axios, Redux store, routes)
- **`config/store/`** - Redux Toolkit setup

### Key Architectural Patterns

1. **Layered Architecture**: Controller → Service → Repository → Entity
2. **DTO Pattern**: MapStruct mappers between entities and DTOs
3. **Repository Pattern**: Spring Data JPA repositories
4. **JWT Authentication**: Stateless OAuth2 resource server
5. **Caching**: Redis with Hibernate second-level cache
6. **Database Migrations**: Liquibase changelogs in `src/main/resources/config/liquibase/`

## JHipster Conventions

- Entity configurations in `.jhipster/*.json`
- Use JHipster generators for creating new entities: `jhipster entity`
- Follow existing patterns when adding new features
- Internationalization files in `src/main/resources/i18n/` (supports `en` and `zh-cn`)
- OpenAPI/Swagger documentation available at `/swagger-ui.html`

## Important File Locations

- `.yo-rc.json` - JHipster configuration
- `src/main/resources/config/application*.yml` - Spring configuration
- `src/main/resources/config/liquibase/` - Database migrations
- `webpack/webpack.*.js` - Webpack configuration
- `src/test/javascript/cypress/` - E2E tests
- `pom.xml` - Maven configuration
