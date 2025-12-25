# Routing with Vue Router 4

Vue Router 4 is the official router for Vue 3.

## Installation

```bash
npm install vue-router@4
```

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
            },
            {
                path: 'about',
                name: 'about',
                component: () => import('@/views/AboutView.vue')
            }
        ]
    },
    {
        path: '/auth',
        component: () => import('@/layouts/AuthLayout.vue'),
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('@/views/auth/LoginView.vue')
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('@/views/auth/RegisterView.vue')
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFoundView.vue')
    }
]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})
```

## Navigation Guards

```typescript
// router/guards.ts
import type { NavigationGuard } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

export const authGuard: NavigationGuard = (to, from) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return {
            name: 'login',
            query: { redirect: to.fullPath }
        }
    }
}

export const guestGuard: NavigationGuard = (to, from) => {
    const authStore = useAuthStore()

    if (to.meta.requiresGuest && authStore.isAuthenticated) {
        return { name: 'home' }
    }
}
```

```typescript
// router/index.ts
import { authGuard, guestGuard } from './guards'

router.beforeEach(authGuard)
router.beforeEach(guestGuard)
```

## Route Meta Types

```typescript
// types/router.d.ts
import 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        requiresAuth?: boolean
        requiresGuest?: boolean
        title?: string
    }
}
```

```typescript
// Usage in routes
{
    path: 'dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: {
        requiresAuth: true,
        title: 'Dashboard'
    }
}
```

## Using in Components

```vue
<script setup lang="ts">
// Auto-imported with unplugin-auto-import
const route = useRoute()
const router = useRouter()

// Access route params
const userId = computed(() => route.params.id as string)

// Navigate programmatically
function goToUser(id: string) {
    router.push({ name: 'user', params: { id } })
}

// With query params
function search(query: string) {
    router.push({ name: 'search', query: { q: query } })
}
</script>
```

## PrimeVue Integration

### Breadcrumb

```vue
<script setup lang="ts">
const route = useRoute()

const breadcrumbItems = computed(() => {
    const items = [{ label: 'Home', route: '/' }]

    if (route.name === 'products') {
        items.push({ label: 'Products', route: '/products' })
    }

    if (route.name === 'product-detail') {
        items.push(
            { label: 'Products', route: '/products' },
            { label: route.params.id as string }
        )
    }

    return items
})
</script>

<template>
    <Breadcrumb :model="breadcrumbItems">
        <template #item="{ item }">
            <router-link v-if="item.route" :to="item.route">
                {{ item.label }}
            </router-link>
            <span v-else>{{ item.label }}</span>
        </template>
    </Breadcrumb>
</template>
```

### Menu with Router

```vue
<script setup lang="ts">
const menuItems = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        route: '/'
    },
    {
        label: 'Products',
        icon: 'pi pi-box',
        route: '/products'
    },
    {
        label: 'Settings',
        icon: 'pi pi-cog',
        items: [
            { label: 'Profile', route: '/settings/profile' },
            { label: 'Security', route: '/settings/security' }
        ]
    }
])
</script>

<template>
    <Menu :model="menuItems">
        <template #item="{ item }">
            <router-link v-if="item.route" :to="item.route" class="p-menuitem-link">
                <span :class="item.icon" />
                <span>{{ item.label }}</span>
            </router-link>
        </template>
    </Menu>
</template>
```
