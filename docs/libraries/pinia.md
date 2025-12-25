# Pinia

The intuitive store for Vue 3.

## Installation

```bash
npm install pinia
```

## Key Features

- **No mutations** - Just state, getters, and actions
- **TypeScript support** - Full type inference
- **DevTools** - Time travel, state editing
- **Modular** - Multiple independent stores
- **SSR ready** - Works with Nuxt 3

## Setup Store Pattern

```typescript
// stores/useProductStore.ts
import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', () => {
    // State
    const products = ref<Product[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    // Getters
    const productCount = computed(() => products.value.length)
    const getById = computed(() => (id: string) =>
        products.value.find(p => p.id === id)
    )

    // Actions
    async function fetchProducts() {
        loading.value = true
        error.value = null
        try {
            products.value = await api.getProducts()
        } catch (e) {
            error.value = 'Failed to fetch products'
        } finally {
            loading.value = false
        }
    }

    async function createProduct(data: CreateProductDTO) {
        const product = await api.createProduct(data)
        products.value.push(product)
        return product
    }

    function $reset() {
        products.value = []
        loading.value = false
        error.value = null
    }

    return {
        products,
        loading,
        error,
        productCount,
        getById,
        fetchProducts,
        createProduct,
        $reset
    }
})
```

## Usage in Components

```vue
<script setup lang="ts">
import { useProductStore } from '@/stores/useProductStore'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()

// Reactive refs for state/getters
const { products, loading, productCount } = storeToRefs(productStore)

// Actions directly
const { fetchProducts, createProduct } = productStore

onMounted(() => {
    fetchProducts()
})
</script>

<template>
    <ProgressSpinner v-if="loading" />
    <div v-else>
        <p>Total: {{ productCount }}</p>
        <DataTable :value="products">
            <!-- columns -->
        </DataTable>
    </div>
</template>
```

## Persisted State

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
    return { token }
}, {
    persist: true
})
```

## Links

- [Pinia Docs](https://pinia.vuejs.org/)
- [GitHub](https://github.com/vuejs/pinia)
