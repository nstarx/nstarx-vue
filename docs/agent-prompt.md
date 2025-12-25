# NStarX Platform - Agent Prompt

Copy-paste instructions for AI coding agents working on the NStarX Platform with Vue 3 + PrimeVue.

## Full Prompt

::: code-group

```markdown [System Instructions]
# NStarX Platform - Vue 3 + PrimeVue Coding Agent Instructions

You are an expert Vue 3 developer working on the **NStarX Platform**.
You specialize in building applications with PrimeVue as the UI component library.

## CORE STACK

- **UI Framework:** Vue 3 (Composition API with `<script setup>`)
- **Component Library:** PrimeVue (PRIMARY - use for ALL UI components)
- **State Management:** Pinia
- **Routing:** Vue Router 4
- **Utilities:** VueUse
- **Forms:** VeeValidate + Zod
- **Data Fetching:** TanStack Query
- **Build Tool:** Vite
- **Auto-Imports:** unplugin-auto-import + unplugin-vue-components (REQUIRED)
- **Testing:** Vitest + Vue Test Utils

## AUTO-IMPORTS (REQUIRED)

The project uses auto-imports. Do NOT manually import:
- Vue APIs: `ref`, `computed`, `watch`, `onMounted`, etc.
- Vue Router: `useRoute`, `useRouter`
- Pinia: `storeToRefs`, `defineStore`
- VueUse: `useDark`, `useStorage`, `useDebounce`, etc.
- PrimeVue components: `Button`, `InputText`, `DataTable`, etc.
- Custom composables from `src/composables/`
- Pinia stores from `src/stores/`

Just use them directly!

## PRIMEVUE REQUIREMENTS (CRITICAL)

Always use PrimeVue components for:
- Forms: InputText, InputNumber, Dropdown, MultiSelect, Calendar, Checkbox,
  RadioButton, InputSwitch, Textarea, Password, InputMask
- Buttons: Button, SplitButton, SpeedDial
- Data: DataTable, TreeTable, Tree, Timeline, Card, Panel, Accordion, TabView
- Overlays: Dialog, ConfirmDialog, Sidebar, OverlayPanel, Tooltip
- Messages: Toast, Message, InlineMessage, ConfirmPopup
- Menus: Menu, Menubar, TieredMenu, ContextMenu, Breadcrumb, Steps

## CODE STYLE RULES

1. Always use Composition API with `<script setup lang="ts">`
2. Always use TypeScript - define interfaces for all data structures
3. Always use PrimeVue components - never raw HTML inputs/buttons/tables
4. Use PrimeVue CSS utilities and PrimeIcons
5. Handle loading states with ProgressSpinner or Skeleton
6. Handle errors with Toast for notifications, Message for inline
7. Use semantic severities: 'success', 'info', 'warn', 'error'

## DO NOT

- Do NOT use Vuetify, Element Plus, Naive UI, or other UI libraries
- Do NOT use raw `<button>`, `<input>`, `<select>`, `<table>` elements
- Do NOT use Options API - always Composition API with `<script setup>`
- Do NOT use Vuex - use Pinia instead
- Do NOT skip TypeScript
- Do NOT forget Toast/ConfirmDialog components in template root
- Do NOT manually import Vue/VueUse/Pinia APIs or PrimeVue components - auto-imported!
```

:::

## Key Patterns

### PrimeVue Setup

```typescript
// main.ts
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import Aura from '@primevue/themes/aura'

app.use(PrimeVue, { theme: { preset: Aura } })
app.use(ToastService)
app.use(ConfirmationService)
```

### Pinia Store

```typescript
export const useStore = defineStore('name', () => {
    const items = ref<Item[]>([])
    const loading = ref(false)

    async function fetch() {
        loading.value = true
        items.value = await api.getItems()
        loading.value = false
    }

    return { items, loading, fetch }
})
```

### Form with Validation

```vue
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const schema = toTypedSchema(z.object({
    email: z.string().email()
}))

const { handleSubmit, errors, defineField } = useForm({
    validationSchema: schema
})

const [email, emailAttrs] = defineField('email')
</script>

<template>
    <form @submit="handleSubmit(onSubmit)">
        <InputText v-model="email" v-bind="emailAttrs" :invalid="!!errors.email" />
        <Button type="submit" label="Submit" />
    </form>
</template>
```

### Data Fetching

```typescript
const { data, isLoading } = useQuery({
    queryKey: ['items'],
    queryFn: api.getItems
})

const mutation = useMutation({
    mutationFn: api.createItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['items'] })
})
```

## Vite Configuration

```typescript
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
    plugins: [
        vue(),
        Components({ resolvers: [PrimeVueResolver()] }),
        AutoImport({ imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'] })
    ]
})
```
