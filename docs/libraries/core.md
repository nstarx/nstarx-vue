# Core Ecosystem

The essential libraries for any Vue 3 + PrimeVue project.

## Overview

| Library | Purpose | Status |
|---------|---------|--------|
| [Pinia](/libraries/pinia) | State management | Essential |
| [Vue Router 4](/libraries/vue-router) | Routing | Essential |
| [VueUse](/libraries/vueuse) | Composables | Essential |

## Why These Libraries?

### Pinia

The official state management solution for Vue 3, replacing Vuex.

- **Composition API native** - Designed for `<script setup>`
- **TypeScript first** - Full type inference
- **DevTools integration** - Time travel, state inspection
- **Modular by design** - No global state pollution

```typescript
export const useStore = defineStore('main', () => {
    const count = ref(0)
    const double = computed(() => count.value * 2)
    function increment() { count.value++ }
    return { count, double, increment }
})
```

### Vue Router 4

The official router, rebuilt for Vue 3.

- **Composition API hooks** - `useRoute()`, `useRouter()`
- **Typed routes** - Full TypeScript support
- **Navigation guards** - Flexible auth/permissions
- **Lazy loading** - Automatic code splitting

```typescript
const routes = [
    { path: '/', component: () => import('./Home.vue') }
]
```

### VueUse

200+ essential composables for every need.

- **Zero dependencies** - Tree-shakeable
- **SSR compatible** - Works with Nuxt
- **TypeScript** - Full type support
- **Well tested** - Production ready

```typescript
const isDark = useDark()
const { x, y } = useMouse()
const data = useStorage('key', defaultValue)
```

## Installation

```bash
# All core libraries
npm install pinia vue-router@4 @vueuse/core
```

## Quick Setup

```typescript
// main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
```
