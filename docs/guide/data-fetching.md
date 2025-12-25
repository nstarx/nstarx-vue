# Data Fetching with TanStack Query

TanStack Query (Vue Query) handles server state management.

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
        <Column field="price" header="Price" />
    </DataTable>
</template>
```

## Query with Parameters

```vue
<script setup lang="ts">
const route = useRoute()
const productId = computed(() => route.params.id as string)

const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => api.getProduct(productId.value),
    enabled: computed(() => !!productId.value)
})
</script>
```

## Mutations

```vue
<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query'

const queryClient = useQueryClient()
const toast = useToast()

// Create mutation
const createMutation = useMutation({
    mutationFn: (product: CreateProductDTO) => api.createProduct(product),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] })
        toast.add({ severity: 'success', summary: 'Product created' })
    },
    onError: (error) => {
        toast.add({ severity: 'error', summary: error.message })
    }
})

// Update mutation
const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductDTO }) =>
        api.updateProduct(id, data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] })
        toast.add({ severity: 'success', summary: 'Product updated' })
    }
})

// Delete mutation
const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteProduct(id),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] })
        toast.add({ severity: 'success', summary: 'Product deleted' })
    }
})

// Usage
function handleCreate(data: CreateProductDTO) {
    createMutation.mutate(data)
}
</script>

<template>
    <Button
        label="Save"
        :loading="createMutation.isPending.value"
        @click="handleCreate(formData)"
    />
</template>
```

## Composable Pattern

```typescript
// composables/useProducts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'primevue/usetoast'

export function useProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: () => api.getProducts()
    })
}

export function useProduct(id: Ref<string>) {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => api.getProduct(id.value),
        enabled: computed(() => !!id.value)
    })
}

export function useCreateProduct() {
    const queryClient = useQueryClient()
    const toast = useToast()

    return useMutation({
        mutationFn: api.createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            toast.add({ severity: 'success', summary: 'Created' })
        },
        onError: (error) => {
            toast.add({ severity: 'error', summary: error.message })
        }
    })
}

export function useUpdateProduct() {
    const queryClient = useQueryClient()
    const toast = useToast()

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateProductDTO }) =>
            api.updateProduct(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            queryClient.invalidateQueries({ queryKey: ['product', id] })
            toast.add({ severity: 'success', summary: 'Updated' })
        }
    })
}

export function useDeleteProduct() {
    const queryClient = useQueryClient()
    const toast = useToast()
    const confirm = useConfirm()

    const mutation = useMutation({
        mutationFn: api.deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            toast.add({ severity: 'success', summary: 'Deleted' })
        }
    })

    function deleteWithConfirm(id: string, name: string) {
        confirm.require({
            message: `Delete "${name}"?`,
            header: 'Confirm Delete',
            icon: 'pi pi-trash',
            acceptClass: 'p-button-danger',
            accept: () => mutation.mutate(id)
        })
    }

    return { ...mutation, deleteWithConfirm }
}
```

## Usage in Components

```vue
<script setup lang="ts">
import { useProducts, useCreateProduct, useDeleteProduct } from '@/composables/useProducts'

const { data: products, isLoading } = useProducts()
const createProduct = useCreateProduct()
const { deleteWithConfirm, isPending: isDeleting } = useDeleteProduct()
</script>

<template>
    <Toast />
    <ConfirmDialog />

    <DataTable :value="products" :loading="isLoading">
        <template #header>
            <Button label="Add Product" @click="showDialog = true" />
        </template>

        <Column field="name" header="Name" />
        <Column header="Actions">
            <template #body="{ data }">
                <Button
                    icon="pi pi-trash"
                    severity="danger"
                    text
                    :loading="isDeleting"
                    @click="deleteWithConfirm(data.id, data.name)"
                />
            </template>
        </Column>
    </DataTable>
</template>
```

## Pagination

```vue
<script setup lang="ts">
const page = ref(0)
const rows = ref(10)

const { data, isLoading } = useQuery({
    queryKey: ['products', page, rows],
    queryFn: () => api.getProducts({ page: page.value, limit: rows.value })
})

function onPage(event: PageState) {
    page.value = event.page
    rows.value = event.rows
}
</script>

<template>
    <DataTable
        :value="data?.items"
        :loading="isLoading"
        :paginator="true"
        :rows="rows"
        :totalRecords="data?.total"
        :lazy="true"
        @page="onPage"
    >
        <!-- columns -->
    </DataTable>
</template>
```
