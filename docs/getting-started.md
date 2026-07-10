# Getting Started

## Prerequisites

- Node.js >= 18
- npm
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS Simulator (macOS) or Android Emulator, or the [Expo Go](https://expo.dev/go) app on a physical device

## Installation

```bash
git clone <repository-url>
cd ChitChat
npm install
```

## Running the App

Start the Expo development server:

```bash
npx expo start
```

Once the server starts, you can open the app on:

- **Android Emulator** -- Press `a`
- **iOS Simulator** -- Press `i` (macOS only)
- **Web** -- Press `w`
- **Expo Go** -- Scan the QR code with your phone

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the Expo dev server |
| `npm run android` | Start with Android target |
| `npm run ios` | Start with iOS target |
| `npm run web` | Start with web target |
| `npm run lint` | Run ESLint across the project |
| `npm run reset-project` | Reset project to a blank slate |

## Development Builds

For full native functionality (push notifications, camera, etc.), create a development build:

```bash
npx expo run:android   # Android
npx expo run:ios       # iOS (macOS only)
```

See the [Expo Development Builds docs](https://docs.expo.dev/develop/development-builds/introduction/) for more details.
