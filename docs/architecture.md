# Architecture

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Expo SDK 54 (managed workflow) |
| UI | React Native 0.81.5 + React 19.1.0 |
| Language | TypeScript 5.9 (strict mode) |
| Navigation | Expo Router 6 (file-based) + React Navigation 7 |
| Animations | react-native-reanimated 4.1.1 |
| Gestures | react-native-gesture-handler 2.28 |
| Bundler | Metro (via Expo) |
| Linting | ESLint 9 + eslint-config-expo |
| Package Manager | npm |

## Navigation (Expo Router)

This project uses **file-based routing** via Expo Router 6. Every file inside `app/` automatically becomes a route:

- `app/index.tsx` → `/` (home screen)
- `app/_layout.tsx` → Root layout (Stack navigator)

Routes are organized using folders for feature grouping (e.g., `app/(tabs)/`, `app/chat/[id].tsx`).

## Config & Experiments

- **New Architecture** enabled (`newArchEnabled: true`) -- uses Fabric rendering and TurboModules
- **React Compiler** experiment enabled for automatic memoization
- **Typed Routes** enabled for type-safe navigation
- **Edge-to-Edge** display on Android
- **Automatic UI Style** -- supports light and dark mode via system preference

## Styling Approach

_(To be decided -- recommended: StyleSheet, Tailwind via NativeWind, or a UI library)_

## State Management

_(Not yet implemented -- recommended: Zustand, Jotai, or React Context)_

## Data Layer

_(Not yet implemented -- recommended: Firebase, Supabase, or a custom API client)_
