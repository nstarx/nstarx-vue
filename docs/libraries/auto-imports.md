# Auto Imports

Eliminate boilerplate with automatic imports.

## Libraries

### unplugin-auto-import

Auto-imports APIs from Vue, VueUse, Pinia, etc.

```bash
npm install -D unplugin-auto-import
```

### unplugin-vue-components

Auto-imports Vue components including PrimeVue.

```bash
npm install -D unplugin-vue-components @primevue/auto-import-resolver
```

## Configuration

```typescript
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

export default defineConfig({
    plugins: [
        vue(),

        AutoImport({
            imports: [
                'vue',
                'vue-router',
                'pinia',
                '@vueuse/core'
            ],
            dts: 'src/auto-imports.d.ts',
            dirs: ['src/composables', 'src/stores'],
            vueTemplate: true
        }),

        Components({
            resolvers: [PrimeVueResolver()],
            dts: 'src/components.d.ts',
            dirs: ['src/components']
        })
    ]
})
```

## Before & After

### Before (Manual)

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useDark } from '@vueuse/core'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useUserStore } from '@/stores/useUserStore'

const route = useRoute()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const isDark = useDark()
const name = ref('')
</script>

<template>
    <InputText v-model="name" />
    <Button label="Submit" />
</template>
```

### After (Auto-imported)

```vue
<script setup lang="ts">
const route = useRoute()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const isDark = useDark()
const name = ref('')
</script>

<template>
    <InputText v-model="name" />
    <Button label="Submit" />
</template>
```

## Generated Types

The plugins generate TypeScript declaration files:

```typescript
// src/auto-imports.d.ts
declare global {
    const ref: typeof import('vue')['ref']
    const computed: typeof import('vue')['computed']
    const useRoute: typeof import('vue-router')['useRoute']
    const useDark: typeof import('@vueuse/core')['useDark']
}
```

```typescript
// src/components.d.ts
declare module 'vue' {
    export interface GlobalComponents {
        Button: typeof import('primevue/button')['default']
        InputText: typeof import('primevue/inputtext')['default']
    }
}
```

## Links

- [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import)
- [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components)
