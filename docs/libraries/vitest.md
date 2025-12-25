# Vitest

Blazing fast unit test framework powered by Vite.

## Installation

```bash
npm install -D vitest @vue/test-utils happy-dom
```

## Key Features

- **Vite-powered** - Shares config with your app
- **Jest compatible** - Easy migration
- **TypeScript native** - No configuration needed
- **UI mode** - Visual test debugging

## Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    test: {
        environment: 'happy-dom',
        globals: true,
        setupFiles: ['./src/test/setup.ts']
    }
})
```

## Test Setup for PrimeVue

```typescript
// src/test/setup.ts
import { config } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

config.global.plugins = [PrimeVue, ToastService]
```

## Writing Tests

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from '../MyComponent.vue'

describe('MyComponent', () => {
    it('renders correctly', () => {
        const wrapper = mount(MyComponent)
        expect(wrapper.exists()).toBe(true)
    })
})
```

## Scripts

```json
{
    "scripts": {
        "test": "vitest run",
        "test:watch": "vitest",
        "test:coverage": "vitest run --coverage",
        "test:ui": "vitest --ui"
    }
}
```

## Links

- [Vitest Docs](https://vitest.dev/)
- [GitHub](https://github.com/vitest-dev/vitest)
