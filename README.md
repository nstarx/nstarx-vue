# NStarX Platform - Vue 3 + PrimeVue Stack Documentation

Documentation site for the NStarX Platform development stack built with VitePress.

## Prerequisites

- Node.js 18+
- npm or pnpm

## Installation

```bash
npm install
```

## Development

Start the local dev server with hot reload:

```bash
npm run docs:dev
```

The site will be available at `http://localhost:5173/`

## Build

Build the static site for production:

```bash
npm run docs:build
```

Output will be in `docs/.vitepress/dist/`

## Preview

Preview the production build locally:

```bash
npm run docs:preview
```

## Project Structure

```
vue3-stack-docs/
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts        # VitePress configuration
│   │   └── dist/            # Build output (generated)
│   ├── guide/               # Guide documentation
│   │   ├── getting-started.md
│   │   ├── project-structure.md
│   │   ├── primevue-setup.md
│   │   ├── state-management.md
│   │   ├── routing.md
│   │   ├── forms.md
│   │   ├── data-fetching.md
│   │   ├── testing.md
│   │   └── vite-config.md
│   ├── libraries/           # Library documentation
│   │   ├── core.md
│   │   ├── pinia.md
│   │   ├── vue-router.md
│   │   ├── vueuse.md
│   │   ├── vite.md
│   │   ├── vitest.md
│   │   ├── auto-imports.md
│   │   ├── veevalidate.md
│   │   └── tanstack-query.md
│   ├── agent-prompt.md      # AI coding agent instructions
│   └── index.md             # Home page
├── package.json
└── README.md
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run docs:dev` | Start dev server |
| `npm run docs:build` | Build for production |
| `npm run docs:preview` | Preview production build |

## Deployment

### Static Hosting (Netlify, Vercel, GitHub Pages)

```bash
npm run docs:build
```

Deploy the `docs/.vitepress/dist/` directory.

### GitHub Pages

Add to `.github/workflows/deploy.yml`:

```yaml
name: Deploy VitePress

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run docs:build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs/.vitepress/dist
```

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

Set build command to `npm run docs:build` and publish directory to `docs/.vitepress/dist`.

## Tech Stack

- **VitePress** - Static site generator
- **Vue 3** - Framework
- **Vite** - Build tool

## Related Files

- `vue3-agent-prompt.html` - Standalone HTML with copyable agent prompt

## License

MIT
