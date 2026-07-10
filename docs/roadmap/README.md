# ChitChat Roadmap

> Real-time chat app: Expo Go (mobile) + Fastify API (Railway) + Supabase (auth, DB, storage)

---

## Where We Are Now

Mobile frontend Phase 1 (auth shell) complete. No backend yet.

- Login / Register screens with mock auth
- Tab layout (Chats placeholder + Settings with sign-out)
- Zustand auth store, reusable UI components, color theme
- NativeWind v4 + Tailwind configured
- `scripts/validate.js` -- run `npm run validate` to check project health
- Full backend spec written (Fastify + Supabase + WebSocket)
- No backend code exists yet

---

## Final Goal

A fully functional real-time chat mobile app delivered via Expo Go:

- User authentication (sign-up / login)
- Contact / conversation list
- Real-time 1-on-1 messaging via WebSocket
- Message bubbles with timestamps
- Push notifications for new messages
- Light / dark mode (userInterfaceStyle: automatic already configured)

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

**Key flows:**

| Flow | Transport | Details |
|------|-----------|---------|
| Sign-up / Login | REST (Fastify) | Validates via Supabase Auth, returns JWT |
| Fetch conversations | REST (Fastify) | GET endpoints, Fastify queries Supabase |
| Send / receive messages | WebSocket (Fastify) | Real-time bidirectional messaging |
| Push notifications | REST (Fastify) | Server sends via FCM / APNs when user is offline |

---

## Step-by-Step Checklist

### Phase 1: Foundation

- [x] **Mobile: run `npm install`** -- dependencies installed
- [x] **Mobile: install state management** -- Zustand added
- [ ] **API: scaffold Fastify project** -- separate repo, TypeScript, WebSocket plugin (`@fastify/websocket`), Supabase client SDK
- [ ] **API: add Supabase Admin SDK** -- initialize with service role key
- [ ] **API: add JWT verification hook** -- verify Supabase JWTs on every authenticated request
- [ ] **Supabase: design DB schema** -- schema designed in docs, not created yet
- [ ] **Supabase: configure Auth** -- email/password or magic link, get JWT working

### Phase 2: Auth

- [x] **Mobile: build auth screens** -- Login / Register forms (mock auth)
- [ ] **Mobile: persist JWT** -- store token securely (expo-secure-store -- deferred until real backend)
- [x] **Mobile: set up routing guard** -- redirect to auth if no token, to main if token exists
- [ ] **API: build auth routes** -- sign-up, sign-in, verify-token endpoints

### Phase 3: Conversations

- [x] **Mobile: build conversation list screen** -- placeholder ("No conversations yet")
- [ ] **Mobile: build real conversation list** -- FlatList fetching from API
- [ ] **API: build conversation endpoints** -- create, list, get-by-id
- [x] **Mobile: set up navigation structure** -- tab navigator for Chats / Settings

### Phase 4: Real-time Chat

- [ ] **API: implement WebSocket handler** -- authenticate via JWT on connect, join room per conversation
- [ ] **Mobile: connect WebSocket on app start** -- maintain persistent connection
- [ ] **Mobile: build chat screen** -- message bubbles, input bar, timestamps
- [ ] **Mobile: implement message sending** -- emit via WebSocket, optimistic update in UI
- [ ] **API: persist messages** -- write to Supabase on receive, broadcast to conversation room
- [ ] **Mobile: handle incoming messages** -- listen to WebSocket, append to message list
- [ ] **API: store offline messages** -- flag unread, deliver on user reconnect

### Phase 5: Push Notifications

- [ ] **Mobile: set up expo-notifications** -- get push token from Expo
- [ ] **Mobile: send push token to API** -- store on user profile
- [ ] **API: send push on new message when offline** -- use Expo push API (works with Expo Go)

### Phase 6: Settings & Polish

- [x] **Mobile: build settings screen** -- user profile, sign-out stub
- [ ] **Mobile: add loading states** -- skeleton loaders for lists
- [ ] **Mobile: add error handling** -- toast / alert on API failure
- [x] **Mobile: add empty states** -- "No conversations yet" messaging
- [x] **Mobile: implement color tokens** -- centralized light/dark theme tokens in `constants/colors.ts`
- [ ] **Mobile: wire dark mode** -- respect system preference with theme context
- [ ] **API: add rate limiting** -- protect against abuse

### Phase 7: Optimizations

- [ ] **Mobile: switch to FlashList** -- better performance for long chat histories
- [ ] **Mobile: implement message pagination** -- load older messages on scroll to top
- [ ] **Mobile: add image attachment support** -- expo-image-picker, upload to Supabase Storage
- [ ] **API: add typing indicators** -- WebSocket event for "user is typing"
- [ ] **Mobile: add read receipts** -- mark messages as seen

---

## Key Decisions (Confirmed)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Mobile framework | Expo SDK 54 (Expo Go) | Managed workflow, no native builds needed |
| Backend framework | Fastify | Faster than Express, TypeScript-native |
| Backend deployment | Railway | Simple deploy, good DX |
| Database / Auth | Supabase | Postgres + Auth + Storage + Realtime |
| Server-to-Supabase | Admin SDK (service role) | Bypasses RLS, full control server-side |
| Mobile-to-Server auth | JWT (Supabase Auth) | Client passes token, Fastify verifies |
| Real-time transport | WebSocket (`@fastify/websocket`) | Bidirectional, low latency |
| API repository | Separate from mobile | Cleaner deploy, independent CI |

---

## Open Questions (Deferred)

| Question | Options | Notes |
|----------|---------|-------|
| State management | Zustand / Jotai | Both lightweight, pick one in Phase 1 |
| Testing strategy | Jest / RNTL / Detox | Add when features stabilize |
| CI/CD | GitHub Actions | Both repos, add during Phase 1 |
| Image attachment UX | Full-res vs thumbnail | Decide when implementing Phase 7 |
