## аксис деск
> Курсовая работа за 3 курс

[![wakatime](https://wakatime.com/badge/user/42e0f82b-2688-4a48-85af-5eedd1812f70/project/f3aeb456-3b6e-42a5-8d2e-3be1ba379ffd.svg?style=flat)](https://wakatime.com/badge/user/42e0f82b-2688-4a48-85af-5eedd1812f70/project/f3aeb456-3b6e-42a5-8d2e-3be1ba379ffd)

Моно-репозиторий системы управления инцидентами с маршрутизацией обращений. Позволяет регистрировать и отслеживать проблемы. В сервисе реализована авторизация пользователя. Фичи реализованы как отдельный модуль, который может быть независимо подключён или отключён без изменения основной архитектуры приложения.

> ⚠️ Мультипользовательский режим в разработке. Требуется PostgreSQL.
> 
> ⚠️ Не весь функционал готов

<img width="1424" height="635" alt="аксис деск" src="https://github.com/user-attachments/assets/77e1daf4-301b-4dda-803d-57eb58acae5a" />

___
Стек: `Nuxt`, `TypeScript`, `Tailwind`, `Better Auth`, `Bun`, `Elysia`, `PostgreSQL`, `Oxc`

![stack](https://skills.syvixor.com/api/icons?perline=15&i=nuxt,ts,tailwind,betterauth,bun,elysia,postgresql,oxc)
___
## Фичи
- Авторизация
- Создание и отслеживание инцидентов
- Маршрутизация обращений
- Статистика по инцидентам
___
## .env
Поля (отдельно для `frontend` и `backend`):

Фронтенд:
```env
NUXT_PUBLIC_AUTH_BASE_URL=
BETTER_AUTH_URL=

DATABASE_URL=
```

Бэкенд:
```env
DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

## Запуск

#### Фронтенд
```bash
cd frontend
bun install
bun dev
```

#### Бэкенд
```bash
cd backend
bun install

bun prisma generate
bun prisma db push
bun dev
```
