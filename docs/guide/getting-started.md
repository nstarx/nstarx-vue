# Getting Started

This guide walks you through setting up a Vue 3 project with PrimeVue and the complete recommended stack.

## Prerequisites

- Node.js 18+
- npm, pnpm, or yarn
- Basic Vue 3 knowledge

## Create New Project

```bash
npm create vite@latest my-vue-app -- --template vue-ts
cd my-vue-app
```

## Install Core Dependencies

### PrimeVue (UI Components)

```bash
npm install primevue @primevue/themes primeicons
```

### State & Routing

```bash
npm install pinia vue-router@4
```

### Utilities

```bash
npm install @vueuse/core
```

### Forms & Validation

```bash
npm install vee-validate @vee-validate/zod zod
```

### Data Fetching

```bash
npm install @tanstack/vue-query
```

## Install Dev Dependencies

```bash
npm install -D unplugin-vue-components unplugin-auto-import
npm install -D @primevue/auto-import-resolver
npm install -D vitest @vue/test-utils happy-dom
```

## Configure main.ts

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import Tooltip from 'primevue/tooltip'
import Aura from '@primevue/themes/aura'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'

import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.dark-mode'
        }
    }
})
app.use(ToastService)
app.use(ConfirmationService)
app.use(VueQueryPlugin)
app.directive('tooltip', Tooltip)

app.mount('#app')
```

## Next Steps

- [Project Structure](/guide/project-structure) - Organize your files
- [PrimeVue Setup](/guide/primevue-setup) - Deep dive into PrimeVue
- [Vite Configuration](/guide/vite-config) - Configure auto-imports
