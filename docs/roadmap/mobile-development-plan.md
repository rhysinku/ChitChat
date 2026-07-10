# Mobile Frontend Development Plan

> **Phase 1: Auth + Shell** -- Built entirely client-side with mock auth.
> Fastify backend integration deferred to Phase 2.

---

## Architecture Shift

Since no backend exists yet, Phase 1 is built with:

| Concern | Approach |
|---------|----------|
| Authentication | **Mock client-side** -- Zustand store simulates login/register with local state |
| API calls | **Stub** (`lib/api.ts`) -- defines `baseURL` placeholder for Fastify, all data is local |
| Token storage | **In-memory** -- `expo-secure-store` will be added when real auth exists |
| Data persistence | **None yet** -- no conversations, no messages, no real-time |

Once the Fastify API is ready, these stubs swap out with minimal refactoring -- the Zustand store interface (`login`, `logout`, `user`, `token`) stays the same; only the implementation changes.

---

## Color System

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#2b2d42` | Headings, nav bars, dark mode bg |
| `secondary` | `#8d99ae` | Secondary text, borders, placeholders |
| `background` | `#edf2f4` | Light mode background |
| `accent` | `#ef233c` | Send button, unread badges, links |
| `textPrimary` | `#2b2d42` | Body text (light mode) |
| `textOnAccent` | `#ffffff` | Text on accent-colored elements |
| `backgroundDark` | `#2b2d42` | Dark mode background |
| `textDark` | `#edf2f4` | Body text (dark mode) |

---

## File Structure

```
app/
  _layout.tsx               Root layout + auth gate
  (auth)/
    _layout.tsx             Auth stack layout
    login.tsx               Login screen
    register.tsx            Register screen
  (tabs)/
    _layout.tsx             Tab navigator (Chats + Settings)
    chats.tsx               Conversation list (placeholder)
    settings.tsx            Settings (sign-out stub)

components/
  ui/
    Button.tsx              Reusable button (accent variant, outline, disabled)
    Input.tsx               Reusable text input
  auth/
    AuthForm.tsx            Email + password form with toggle (login/register)

stores/
  authStore.ts              Zustand: user, token, login, logout, signUp

lib/
  api.ts                    HTTP fetch wrapper (stub -- uses placeholder baseURL)

constants/
  colors.ts                 Color tokens exported as light/dark themes

types/
  index.ts                  User, AuthState, etc.

global.css                  Tailwind directives
tailwind.config.js          Tailwind theme with ChitChat colors
metro.config.js             Expo bundler config + NativeWind
babel.config.js             Babel with NativeWind plugin
```

---

## Phase 1 Deliverables (Completed)

- [x] Colors defined
- [x] Dependencies installed (NativeWind, Zustand)
- [x] Tailwind + Metro + Babel configured
- [x] Color constants + shared types created
- [x] API stub + Zustand auth store
- [x] UI components (Button, Input)
- [x] Auth form component
- [x] Login + Register screens
- [x] Tab layout with Chats + Settings stubs
- [x] Root layout with auth gate

---

## Phase 2 (Next -- Fastify Backend Ready)

- [ ] Fastify API deployed to Railway
- [ ] Connect mobile to real auth endpoints
- [ ] Real token storage via expo-secure-store
- [ ] Real data fetching (conversations, messages)
- [ ] WebSocket integration
