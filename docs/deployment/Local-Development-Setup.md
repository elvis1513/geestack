# 本地开发环境设置指南

本文档说明如何在本地 Docker Desktop 中启动 GeeStack 项目所需的基础设施服务。

---

## 📋 概述

GeeStack 项目需要以下基础设施服务:

- **PostgreSQL 17.4** - 主数据库
- **Redis 8.0.0** - 缓存和会话存储
- **后端 Spring Boot** - Java 后端服务器 (端口 8080)
- **前端 React** - 开发服务器 (端口 9000/9060)

---

## 🚀 快速启动

### 1. 启动 Docker 服务

使用 Docker Compose 启动 PostgreSQL 和 Redis:

```bash
# 启动所有基础设施服务
docker compose -f src/main/docker/services.yml up -d

# 查看服务状态
docker compose -f src/main/docker/services.yml ps

# 查看日志
docker compose -f src/main/docker/services.yml logs -f

# 停止服务
docker compose -f src/main/docker/services.yml down
```

**预期输出**:
```
NAME                    IMAGE           STATUS                   PORTS
geestack-postgresql-1   postgres:17.4   Up (healthy)             127.0.0.1:5432->5432/tcp
geestack-redis-1        redis:8.0.0     Up                       127.0.0.1:6379->6379/tcp
```

### 2. 验证服务连接

```bash
# 测试 PostgreSQL 连接
docker exec geestack-postgresql-1 pg_isready -U geestack

# 测试 Redis 连接
docker exec geestack-redis-1 redis-cli ping
```

**预期输出**:
```
/var/run/postgresql:5432 - accepting connections
PONG
```

### 3. 启动后端服务器

```bash
# 启动 Spring Boot 后端 (开发模式)
./mvnw spring-boot:run
```

**预期输出**:
```
----------------------------------------------------------
	Application 'geestack' is running! Access URLs:
	Local: 		http://localhost:8080/
	External: 	http://127.0.0.1:8080/
	Profile(s): 	[dev, api-docs]
----------------------------------------------------------
```

后端启动后,Liquibase 会自动创建和更新数据库表结构。

### 4. 启动前端服务器

```bash
# 在另一个终端中启动前端开发服务器
./npmw start
```

前端将在 `http://localhost:9000` 启动,并代理 API 请求到 `http://localhost:8080`。

---

## 🔍 验证服务状态

### 健康检查端点

```bash
# 后端健康检查
curl http://localhost:8080/management/health

# 预期返回:
# {"status":"UP","groups":["liveness","readiness"]}
```

### SEO 端点

```bash
# Sitemap.xml
curl http://localhost:8080/seo/sitemap.xml

# Robots.txt
curl http://localhost:8080/seo/robots.txt

# 预期返回: 有效的 XML 和文本内容
```

### 数据库连接

```bash
# 进入 PostgreSQL 容器
docker exec -it geestack-postgresql-1 psql -U geestack

# 在 psql 中执行:
\l                    # 列出所有数据库
\c geestack           # 连接到 geestack 数据库
\dt                   # 列出所有表
SELECT COUNT(*) FROM jhi_user;  # 查询用户数量
\q                    # 退出
```

### Redis 连接

```bash
# 进入 Redis 容器
docker exec -it geestack-redis-1 redis-cli

# 在 redis-cli 中执行:
PING                  # 测试连接
KEYS *               # 列出所有键
FLUSHALL             # 清空所有键 (开发时使用)
EXIT                 # 退出
```

---

## 🛠️ 故障排查

### PostgreSQL 连接失败

**症状**: `Connection refused: localhost:5432`

**解决方案**:
```bash
# 检查 PostgreSQL 容器状态
docker compose -f src/main/docker/postgresql.yml ps

# 查看日志
docker compose -f src/main/docker/postgresql.yml logs postgresql

# 重启服务
docker compose -f src/main/docker/services.yml restart postgresql
```

### Redis 连接失败

**症状**: `Connection refused: localhost:6379`

**解决方案**:
```bash
# 检查 Redis 容器状态
docker compose -f src/main/docker/redis.yml ps

# 查看日志
docker compose -f src/main/docker/redis.yml logs redis

# 重启服务
docker compose -f src/main/docker/services.yml restart redis
```

### 后端启动失败

**症状**: `Application failed to start`

**检查清单**:
1. ✅ Docker 服务是否运行 (`docker ps`)
2. ✅ PostgreSQL 是否健康 (`docker exec geestack-postgresql-1 pg_isready -U geestack`)
3. ✅ Redis 是否运行 (`docker exec geestack-redis-1 redis-cli ping`)
4. ✅ 端口是否被占用 (`lsof -i :8080`)

**常见解决方案**:
```bash
# 清理并重新启动
docker compose -f src/main/docker/services.yml down
docker compose -f src/main/docker/services.yml up -d

# 清理 Maven 缓存并重新编译
./mvnw clean compile
```

### 端口冲突

如果端口 8080 被占用:
```bash
# 查找占用端口的进程
lsof -i :8080

# 终止进程
kill -9 <PID>

# 或修改 application.yml 中的服务器端口
```

---

## 📊 服务配置详情

### PostgreSQL 配置

**文件**: `src/main/docker/postgresql.yml`

| 配置项 | 值 |
|--------|-----|
| 镜像 | postgres:17.4 |
| 端口 | 5432 |
| 用户名 | geestack |
| 密码 | (无密码,trust 认证) |
| 数据卷 | (可选,取消注释以启用) |

### Redis 配置

**文件**: `src/main/docker/redis.yml`

| 配置项 | 值 |
|--------|-----|
| 镜像 | redis:8.0.0 |
| 端口 | 6379 |
| 持久化 | (未配置) |

### Spring Boot 配置

**文件**: `src/main/resources/config/application.yml`

| 配置项 | 开发环境值 |
|--------|----------|
| 数据库 URL | jdbc:postgresql://localhost:5432/geestack |
| Redis URL | redis://localhost:6379 |
| 服务器端口 | 8080 |
| 配置文件 | application-dev.yml |

---

## 🔧 高级配置

### 启用 PostgreSQL 数据卷持久化

编辑 `src/main/docker/postgresql.yml`:

```yaml
services:
  postgresql:
    volumes:
      - ~/volumes/jhipster/geestack/postgresql/:/var/lib/postgresql/data/
```

这将在您的用户目录下持久化数据库数据。

### 连接外部数据库

修改 `src/main/resources/config/application-dev.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://your-host:5432/geestack
    username: your-username
    password: your-password
  data:
    redis:
      host: your-redis-host
      port: 6379
```

### 自定义端口

修改 `src/main/resources/config/application.yml`:

```yaml
server:
  port: 9090  # 更改后端端口
```

同时更新前端代理配置 `webpack/webpack.dev.js`。

---

## 📝 开发工作流

### 典型开发会话

1. **启动基础设施**
   ```bash
   docker compose -f src/main/docker/services.yml up -d
   ```

2. **启动后端**
   ```bash
   # 终端 1
   ./mvnw spring-boot:run
   ```

3. **启动前端**
   ```bash
   # 终端 2
   ./npmw start
   ```

4. **开发**
   - 前端热重载在 `http://localhost:9000`
   - 后端 API 在 `http://localhost:8080`
   - API 文档在 `http://localhost:8080/swagger-ui.html`

5. **停止服务**
   ```bash
   # Ctrl+C 停止后端和前端
   # 停止 Docker 服务
   docker compose -f src/main/docker/services.yml down
   ```

### 数据库迁移

```bash
# Liquibase 自动在启动时运行迁移
# 手动运行迁移:
./mvnw liquibase:update

# 查看迁移状态:
./mvnw liquibase:status
```

### 重置数据库

```bash
# 停止后端
docker compose -f src/main/docker/services.yml down

# 删除数据卷 (如果启用了持久化)
rm -rf ~/volumes/jhipster/geestack/postgresql/

# 重新启动
docker compose -f src/main/docker/services.yml up -d
./mvnw spring-boot:run
```

---

## 🔗 相关文档

- [Docker Compose 文档](https://docs.docker.com/compose/)
- [PostgreSQL 文档](https://www.postgresql.org/docs/)
- [Redis 文档](https://redis.io/documentation)
- [Spring Boot 文档](https://spring.io/projects/spring-boot)

---

**最后更新**: 2026-01-05
**维护者**: GeeStack 开发团队
