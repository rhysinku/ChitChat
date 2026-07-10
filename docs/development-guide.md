# Development Guide

## Code Conventions

### TypeScript

- **Strict mode** is enabled -- avoid `any` unless absolutely necessary
- Use the `@/` path alias for imports (e.g., `import { x } from '@/app'`)
- Prefer `interface` over `type` for object shapes
- Use `const` assertions (`as const`) for literal types

### Components

- One component per file, exported as default
- Use functional components with hooks
- File name should match the exported component name (PascalCase)

### Styles

- Use `StyleSheet.create()` for static styles
- Co-locate styles with their component
- _(Consider adding a theming system and/or NativeWind)_

### Navigation

- Use Expo Router's `<Link>` component for navigation
- Use `useRouter()` hook for programmatic navigation
- Use `useLocalSearchParams()` to access route params

## Git Workflow

- Feature branches: `feature/<short-description>`
- Bug fixes: `fix/<short-description>`
- Commit messages: concise, imperative mood (e.g., "Add login screen")

## Linting & Formatting

- Run `npm run lint` before committing
- VS Code auto-formats on save (configured in `.vscode/settings.json`)
- ESLint configuration extends `eslint-config-expo`

## Recommended VS Code Extensions

- [Expo Tools](https://marketplace.visualstudio.com/items?itemName=expo.vscode-expo-tools) -- route autocomplete, `app.json` validation

## Testing

_(Not yet configured -- recommended: Jest + React Native Testing Library for unit tests, Detox or Maestro for E2E)_
