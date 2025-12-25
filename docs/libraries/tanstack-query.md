# TanStack Query

Powerful async state management for Vue.

## Installation

```bash
npm install @tanstack/vue-query
```

## Setup

```typescript
// main.ts
import { VueQueryPlugin } from '@tanstack/vue-query'

app.use(VueQueryPlugin)
```

## Key Features

- **Caching** - Smart request deduplication
- **Background refetching** - Keep data fresh
- **Optimistic updates** - Instant UI feedback
- **DevTools** - Visualize query state

## Basic Query

```vue
<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'

const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => api.getProducts()
})
</script>

<template>
    <ProgressSpinner v-if="isLoading" />
    <Message v-else-if="error" severity="error">{{ error.message }}</Message>
    <DataTable v-else :value="products">
        <Column field="name" header="Name" />
    </DataTable>
</template>
```

## Mutations with PrimeVue Toast

```typescript
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'primevue/usetoast'

export function useCreateProduct() {
    const queryClient = useQueryClient()
    const toast = useToast()

    return useMutation({
        mutationFn: api.createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            toast.add({
                severity: 'success',
                summary: 'Product created',
                life: 3000
            })
        },
        onError: (error) => {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: error.message,
                life: 5000
            })
        }
    })
}
```

## Composable Pattern

```typescript
// composables/useProducts.ts
export function useProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: api.getProducts
    })
}

export function useProduct(id: Ref<string>) {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => api.getProduct(id.value),
        enabled: computed(() => !!id.value)
    })
}
```

## Links

- [TanStack Query Vue Docs](https://tanstack.com/query/latest/docs/vue/overview)
- [GitHub](https://github.com/TanStack/query)
