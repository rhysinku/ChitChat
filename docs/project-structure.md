# Project Structure

```
ChitChat/
├── app/                        # Expo Router source code (file-based routes)
│   ├── _layout.tsx             # Root layout (Stack navigator)
│   └── index.tsx               # Home screen
├── assets/
│   └── images/                 # Static images (icons, splash, logos)
├── docs/                       # Project documentation
│   ├── README.md               # Documentation index
│   ├── getting-started.md      # Setup & installation guide
│   ├── architecture.md         # Architecture & tech stack
│   ├── project-structure.md    # This file
│   └── development-guide.md    # Coding conventions & workflows
├── .vscode/
│   ├── extensions.json         # Recommended VS Code extensions
│   └── settings.json           # Editor settings (format-on-save, etc.)
├── app.json                    # Expo app configuration
├── eslint.config.js            # ESLint flat config
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project overview
```

## Key Directories

### `app/`
The application source root. Each file maps to a route:
- `_layout.tsx` -- Shared layout wrappers (stack, tabs, drawers)
- `index.tsx` -- Route `/` (home screen)
- Additional files/folders are added as the app grows

### `assets/images/`
App icons, splash screen images, and other static image assets used by `app.json` and the app.

### `docs/`
All project documentation. See [docs/README.md](README.md) for the full index.

## File Naming Conventions

| Convention | Example | Purpose |
|------------|---------|---------|
| `_layout.tsx` | `app/(tabs)/_layout.tsx` | Route group layout |
| `index.tsx` | `app/chat/index.tsx` | Route index |
| `[param].tsx` | `app/chat/[id].tsx` | Dynamic route segment |
| Kebab-case | `message-bubble.tsx` | Component files |
| PascalCase | `MessageBubble.tsx` | Component exports |
