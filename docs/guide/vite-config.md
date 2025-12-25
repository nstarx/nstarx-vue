# Vite Configuration

Complete Vite setup for Vue 3 + PrimeVue with auto-imports.

## Full Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import AutoImport from 'unplugin-auto-import/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
    plugins: [
        vue(),

        // Auto-import Vue, VueUse, Pinia, Vue Router APIs
        AutoImport({
            imports: [
                'vue',
                'vue-router',
                'pinia',
                '@vueuse/core'
            ],
            dts: 'src/auto-imports.d.ts',
            dirs: [
                'src/composables',
                'src/stores'
            ],
            vueTemplate: true
        }),

        // Auto-import components
        Components({
            resolvers: [
                PrimeVueResolver()
            ],
            dts: 'src/components.d.ts',
            dirs: ['src/components']
        })
    ],

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },

    server: {
        port: 3000,
        open: true
    },

    build: {
        target: 'esnext',
        sourcemap: true
    }
})
```

## Auto Import Benefits

### Before (Manual Imports)

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useDark, useStorage } from '@vueuse/core'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useUserStore } from '@/stores/useUserStore'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const isDark = useDark()
const name = ref('')
</script>
```

### After (Auto Imports)

```vue
<script setup lang="ts">
// Everything is auto-imported!
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const isDark = useDark()
const name = ref('')
</script>

<template>
    <!-- PrimeVue components auto-imported -->
    <InputText v-model="name" />
    <Button label="Submit" />
    <DataTable :value="items">
        <Column field="name" header="Name" />
    </DataTable>
</template>
```

## TypeScript Support

The auto-import plugins generate declaration files:

```typescript
// src/auto-imports.d.ts (generated)
declare global {
    const ref: typeof import('vue')['ref']
    const computed: typeof import('vue')['computed']
    const useRoute: typeof import('vue-router')['useRoute']
    const useDark: typeof import('@vueuse/core')['useDark']
    // ... more
}
```

```typescript
// src/components.d.ts (generated)
declare module 'vue' {
    export interface GlobalComponents {
        Button: typeof import('primevue/button')['default']
        InputText: typeof import('primevue/inputtext')['default']
        // ... more
    }
}
```

## Path Aliases

Configure TypeScript to understand the `@` alias:

```json
// tsconfig.json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"]
        }
    }
}
```

## Environment Variables

```bash
# .env
VITE_API_URL=http://localhost:8080/api
VITE_APP_TITLE=My App
```

```typescript
// Access in code
const apiUrl = import.meta.env.VITE_API_URL
```

```typescript
// Type definitions (env.d.ts)
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_APP_TITLE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
```
