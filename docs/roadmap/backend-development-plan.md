# Backend Development Plan

> Fastify API (Railway) + Supabase (auth, DB, storage) + WebSocket

---

## Architecture

```
[Expo Go App] -- REST (auth, data) + WebSocket (real-time) --> [Fastify API (Railway)]
                                                                      |
                                                         [Supabase Admin SDK]
                                                                      |
                                                              [Supabase]
                                                          ├─ Auth (JWT)
                                                          ├─ Postgres (users, conversations, messages)
                                                          └─ Storage (images, attachments)
```

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Runtime | Node.js + TypeScript + tsx (dev) | TypeScript-native, Fastify preferred |
| Framework | Fastify v5 | Faster than Express, schema validation, plugin system |
| Real-time | `@fastify/websocket` | Bidirectional, low latency |
| Database | Supabase Postgres | Managed Postgres, built-in Auth + Realtime |
| Auth | Supabase Auth + JWT verification | Client gets JWT, server verifies with Admin SDK |
| ORM/Query | Supabase JS Admin SDK | Direct Postgres access with service role |
| Validation | Zod + `@fastify/type-provider-typebox` | Runtime validation + types |
| Deploy | Railway | Simple git-push deploy |
| CI | GitHub Actions | Lint + typecheck on PR |

---

## File Structure (Separate Repo)

```
chitchat-api/
├── src/
│   ├── index.ts                    Entry: create Fastify instance, register plugins
│   ├── config.ts                   Environment variables (Supabase URL, service key, JWT secret, port)
│   ├── plugins/
│   │   ├── auth.ts                 JWT verification decorator/hook
│   │   ├── websocket.ts            WebSocket connection handler plugin
│   │   └── supabase.ts             Supabase Admin SDK client init
│   ├── routes/
│   │   ├── auth.ts                 POST /auth/signup, POST /auth/login, GET /auth/verify
│   │   ├── users.ts                GET /users, GET /users/:id
│   │   ├── conversations.ts        GET /conversations, POST /conversations, GET /conversations/:id
│   │   └── messages.ts             GET /conversations/:id/messages (paginated)
│   ├── websocket/
│   │   ├── handler.ts              WS on-connect: verify JWT, join rooms, relay messages
│   │   └── rooms.ts                Room management (track connected users per conversation)
│   ├── lib/
│   │   └── supabase-admin.ts       Admin SDK helpers (upsert user, query messages)
│   └── types/
│       └── index.ts                Shared types (User, Message, Conversation)
├── db/
│   ├── schema.sql                  Full DDL for Supabase Postgres
│   └── seed.sql                    Optional dev seed data
├── package.json
├── tsconfig.json
├── .env.example
└── Dockerfile                      (Railway auto-detects)
```

---

## Supabase Schema

### Tables

```sql
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT UNIQUE NOT NULL,
  username        TEXT UNIQUE NOT NULL,
  avatar_url      TEXT,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE conversations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE conversation_participants (
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  joined_at       TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE messages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id       UUID REFERENCES users(id) ON DELETE CASCADE,
  content         TEXT NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT now()
);
```

### Indexes

```sql
CREATE INDEX idx_messages_conversation_created
  ON messages(conversation_id, created_at DESC);

CREATE INDEX idx_conversation_participants_user
  ON conversation_participants(user_id);
```

---

## REST Endpoints

> All authenticated routes require `Authorization: Bearer <jwt>` header.
> Fastify verifies the JWT via Supabase Admin SDK on every request.

| Method | Path | Auth | Body | Response |
|--------|------|------|------|----------|
| POST | `/auth/signup` | No | `{ email, password, username }` | `{ user, token }` |
| POST | `/auth/login` | No | `{ email, password }` | `{ user, token }` |
| GET | `/auth/verify` | Yes | -- | `{ user }` |
| GET | `/conversations` | Yes | -- | `{ conversations: [...] }` |
| POST | `/conversations` | Yes | `{ participant_ids: [uuid, ...] }` | `{ conversation }` |
| GET | `/conversations/:id` | Yes | -- | `{ conversation, participants: [...] }` |
| GET | `/conversations/:id/messages` | Yes | `?before=<timestamp>&limit=50` | `{ messages: [...] }` |

---

## WebSocket Protocol

### Connection

```
ws://<host>/ws?token=<jwt>
```

### Events (Server to Client)

| Event | Payload |
|-------|---------|
| `message:new` | `{ id, conversation_id, sender_id, content, created_at }` |
| `user:typing` | `{ conversation_id, user_id }` |

### Events (Client to Server)

| Event | Payload |
|-------|---------|
| `message:send` | `{ conversation_id, content }` |
| `typing:start` | `{ conversation_id }` |
| `typing:stop` | `{ conversation_id }` |

### Flow

1. Client connects with `?token=<jwt>` query param
2. Server verifies JWT -- rejects connection if invalid
3. Server loads user's conversation list and subscribes them to those rooms
4. Client sends `message:send` -> server persists to Supabase -> broadcasts `message:new` to all participants in that conversation room
5. If a recipient is offline (not connected to the room), server flags the message as unread (future: push notification)

---

## Environment Variables

```
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_SERVICE_KEY=<service-role-key>
PORT=3000
```

---

## Deployment (Railway)

1. Create a new GitHub repo for `chitchat-api`
2. Push the Fastify project
3. Connect repo to Railway via GitHub
4. Set environment variables in Railway dashboard
5. Railway auto-detects Node.js and runs `npm start`
6. Railway provides a public HTTPS URL for the API

> Note: Postgres lives in Supabase (not Railway's built-in add-on) because Supabase provides Auth + Realtime on top of it.

---

## Phases

### Phase 1: Foundation

- [ ] Scaffold Fastify project with TypeScript (`npm init`, install deps)
- [ ] Add Zod for input validation
- [ ] Create Supabase Admin SDK client (`src/plugins/supabase.ts`)
- [ ] Create JWT verification plugin (`src/plugins/auth.ts`)
- [ ] Set up `@fastify/websocket` plugin
- [ ] Create Supabase project and run `db/schema.sql`
- [ ] Add health check endpoint (`GET /health`)
- [ ] Deploy to Railway (via GitHub)

### Phase 2: Auth Endpoints

- [ ] `POST /auth/signup` -- create user in Supabase Auth + `users` table
- [ ] `POST /auth/login` -- verify credentials, return JWT
- [ ] `GET /auth/verify` -- validate current token
- [ ] Wire mobile `authStore` to real endpoints (replace mock auth)

### Phase 3: Conversations

- [ ] `GET /conversations` -- list user's conversations with last message preview
- [ ] `POST /conversations` -- create new conversation with participants
- [ ] `GET /conversations/:id` -- get conversation details + participants

### Phase 4: Real-Time Messaging

- [ ] WebSocket connection handler with JWT auth
- [ ] Room management (join / leave per conversation)
- [ ] Handle `message:send` -- persist to Supabase, broadcast `message:new`
- [ ] `GET /conversations/:id/messages` with cursor-based pagination
- [ ] Handle `typing:start` / `typing:stop` events

### Phase 5: Push Notifications

- [ ] `POST /users/push-token` -- store Expo push token per user
- [ ] On `message:new`, if recipient is offline -- send push via Expo Push API
