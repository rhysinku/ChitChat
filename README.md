# ChitChat

A real-time chat application built with [Expo SDK 54](https://expo.dev) and React Native.

## Quick Start

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `a` (Android) / `i` (iOS) / `w` (web).

## Documentation

Full documentation is available in the [`docs/`](docs/) folder:

| Document | Description |
|----------|-------------|
| [Getting Started](docs/getting-started.md) | Setup, installation, and running |
| [Architecture](docs/architecture.md) | Tech stack and design decisions |
| [Project Structure](docs/project-structure.md) | File and folder layout |
| [Development Guide](docs/development-guide.md) | Coding conventions and workflows |

## Tech Stack

- **Framework**: Expo SDK 54, React Native 0.81.5, React 19.1.0
- **Navigation**: Expo Router 6 (file-based routing)
- **Language**: TypeScript 5.9 (strict mode)
- **Bundler**: Metro
- **Linting**: ESLint 9 + `eslint-config-expo`

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the dev server |
| `npm run android` | Start with Android |
| `npm run ios` | Start with iOS |
| `npm run web` | Start with web |
| `npm run lint` | Run ESLint |
