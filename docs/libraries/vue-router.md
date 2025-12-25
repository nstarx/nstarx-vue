# Vue Router 4

The official router for Vue.js.

## Installation

```bash
npm install vue-router@4
```

## Key Features

- **Composition API** - `useRoute()`, `useRouter()`
- **Typed routes** - TypeScript integration
- **Lazy loading** - Automatic code splitting
- **Navigation guards** - Route protection
- **Nested routes** - Layout patterns

## Basic Setup

```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/layouts/DefaultLayout.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/views/HomeView.vue')
            }
        ]
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
```

## Composition API

```vue
<script setup lang="ts">
const route = useRoute()
const router = useRouter()

// Access params
const id = computed(() => route.params.id)

// Navigate
function goToProduct(id: string) {
    router.push({ name: 'product', params: { id } })
}
</script>
```

## Navigation Guards

```typescript
router.beforeEach((to, from) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return { name: 'login', query: { redirect: to.fullPath } }
    }
})
```

## PrimeVue Integration

```vue
<template>
    <Menubar :model="menuItems">
        <template #item="{ item }">
            <router-link v-if="item.route" :to="item.route">
                <span :class="item.icon" />
                <span>{{ item.label }}</span>
            </router-link>
        </template>
    </Menubar>
</template>
```

## Links

- [Vue Router Docs](https://router.vuejs.org/)
- [GitHub](https://github.com/vuejs/router)
