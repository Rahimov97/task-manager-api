# Task Manager API

---

## Возможности

- Регистрация и логин (JWT-аутентификация)
- Защита маршрутов
- Управление задачами (CRUD)
- Разделение ролей: `user` / `admin`
- Swagger на `/api`
- Docker + Docker Compose
- Миграции через TypeORM

---

## Стек технологий

- [NestJS]
- [TypeORM]
- [PostgreSQL]
- [Swagger (OpenAPI)]
- [Docker Compose]
- [class-validator]

---

## Установка и запуск

### 1. Клонирование и установка зависимостей

```bash
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
npm install
```

---

### 2. Запуск через Docker Compose

```bash
docker compose up -d
```

Ожидается, что PostgreSQL поднимется на порту `5433`.

---

### 3. Переменные окружения

Создать `.env`:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5433
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=task_manager

JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=3600s
```

---

### 4. Применение миграций

```bash
npm run migration:run
```

---

### 5. Запуск проекта

```bash
npm run start:dev
```

---

## Swagger

```
http://localhost:3000/api
```

Там описание всех маршрутов, схем, авторизацию через JWT и примеры.

---

## Роли и доступ

- **User** — может управлять только своими задачами
- **Admin** — может управлять всеми задачами и пользователями
- Админ создаётся вручную через SQL:
  ```sql
  UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
  ```

---

## Структура проекта

```
src/
├── auth/
├── tasks/
├── users/
├── migrations/
├── main.ts
├── app.module.ts
```

---

## Примеры API-запросов

### POST /auth/register

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

### POST /auth/login

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

---