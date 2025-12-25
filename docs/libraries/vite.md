# Vite

Next generation frontend tooling.

## Key Features

- **Instant server start** - Native ES modules
- **Lightning fast HMR** - Updates in milliseconds
- **Optimized builds** - Rollup-based production
- **Rich plugin ecosystem** - Extensible

## Vue 3 Project

```bash
npm create vite@latest my-app -- --template vue-ts
```

## Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: 3000,
        open: true,
        proxy: {
            '/api': 'http://localhost:8080'
        }
    },
    build: {
        target: 'esnext',
        sourcemap: true
    }
})
```

## Environment Variables

```bash
# .env
VITE_API_URL=http://localhost:8080
VITE_APP_TITLE=My App
```

```typescript
// Usage
const apiUrl = import.meta.env.VITE_API_URL
```

```typescript
// Type definitions (env.d.ts)
interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_APP_TITLE: string
}
```

## Links

- [Vite Docs](https://vitejs.dev/)
- [GitHub](https://github.com/vitejs/vite)
