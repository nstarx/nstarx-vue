# State Management with Pinia

Pinia is the official state management solution for Vue 3.

## Installation

```bash
npm install pinia
```

## Setup

```typescript
// main.ts
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia())
```

## Creating Stores

### Setup Syntax (Recommended)

```typescript
// stores/useUserStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'

export const useUserStore = defineStore('user', () => {
    // State
    const user = ref<User | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    // Getters
    const isAuthenticated = computed(() => !!user.value)
    const fullName = computed(() =>
        user.value ? `${user.value.firstName} ${user.value.lastName}` : ''
    )

    // Actions
    async function fetchUser(id: string) {
        loading.value = true
        error.value = null
        try {
            user.value = await api.getUser(id)
        } catch (e) {
            error.value = 'Failed to fetch user'
        } finally {
            loading.value = false
        }
    }

    function logout() {
        user.value = null
    }

    return {
        // State
        user,
        loading,
        error,
        // Getters
        isAuthenticated,
        fullName,
        // Actions
        fetchUser,
        logout
    }
})
```

## Using Stores in Components

```vue
<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

// Use storeToRefs for reactive state/getters
const { user, loading, isAuthenticated } = storeToRefs(userStore)

// Actions can be destructured directly
const { fetchUser, logout } = userStore

onMounted(() => {
    fetchUser('123')
})
</script>

<template>
    <ProgressSpinner v-if="loading" />
    <div v-else-if="user">
        <p>Welcome, {{ user.firstName }}</p>
        <Button label="Logout" @click="logout" />
    </div>
</template>
```

## Store Patterns

### API Integration

```typescript
export const useProductStore = defineStore('products', () => {
    const products = ref<Product[]>([])
    const loading = ref(false)

    async function fetchProducts() {
        loading.value = true
        try {
            products.value = await api.getProducts()
        } finally {
            loading.value = false
        }
    }

    async function createProduct(data: CreateProductDTO) {
        const product = await api.createProduct(data)
        products.value.push(product)
        return product
    }

    async function updateProduct(id: string, data: UpdateProductDTO) {
        const updated = await api.updateProduct(id, data)
        const index = products.value.findIndex(p => p.id === id)
        if (index !== -1) {
            products.value[index] = updated
        }
        return updated
    }

    async function deleteProduct(id: string) {
        await api.deleteProduct(id)
        products.value = products.value.filter(p => p.id !== id)
    }

    return {
        products,
        loading,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct
    }
})
```

### Persisted State

Use `pinia-plugin-persistedstate`:

```bash
npm install pinia-plugin-persistedstate
```

```typescript
// main.ts
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
```

```typescript
export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(null)
    // ...
    return { token }
}, {
    persist: true // Automatically persists to localStorage
})
```

## Testing Stores

```typescript
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/useUserStore'

describe('useUserStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('starts with no user', () => {
        const store = useUserStore()
        expect(store.user).toBeNull()
        expect(store.isAuthenticated).toBe(false)
    })

    it('logs out correctly', () => {
        const store = useUserStore()
        store.user = { id: '1', name: 'Test' }
        store.logout()
        expect(store.user).toBeNull()
    })
})
```
