# PrimeVue Setup

Complete guide to setting up and using PrimeVue in your Vue 3 application.

## Installation

```bash
npm install primevue @primevue/themes primeicons
```

## Basic Setup

```typescript
// main.ts
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})
```

## Available Themes

PrimeVue 4 comes with styled presets:

- **Aura** - Modern, clean design (recommended)
- **Lara** - Bootstrap-inspired
- **Nora** - Compact, dense

```typescript
import Aura from '@primevue/themes/aura'
import Lara from '@primevue/themes/lara'
import Nora from '@primevue/themes/nora'
```

## Services

### Toast Service

```typescript
// main.ts
import ToastService from 'primevue/toastservice'
app.use(ToastService)
```

```vue
<script setup lang="ts">
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const showSuccess = () => {
    toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Operation completed',
        life: 3000
    })
}
</script>

<template>
    <Toast />
    <Button label="Show" @click="showSuccess" />
</template>
```

### Confirmation Service

```typescript
// main.ts
import ConfirmationService from 'primevue/confirmationservice'
app.use(ConfirmationService)
```

```vue
<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm'

const confirm = useConfirm()

const confirmDelete = () => {
    confirm.require({
        message: 'Are you sure you want to delete?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        accept: () => {
            // Delete logic
        }
    })
}
</script>

<template>
    <ConfirmDialog />
    <Button label="Delete" severity="danger" @click="confirmDelete" />
</template>
```

## Directives

### Tooltip

```typescript
// main.ts
import Tooltip from 'primevue/tooltip'
app.directive('tooltip', Tooltip)
```

```vue
<template>
    <Button v-tooltip="'Click me'" label="Hover" />
    <Button v-tooltip.top="'Top tooltip'" label="Top" />
    <Button v-tooltip.bottom="'Bottom tooltip'" label="Bottom" />
</template>
```

## Auto Import Components

Use `unplugin-vue-components` with PrimeVue resolver:

```typescript
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [PrimeVueResolver()]
        })
    ]
})
```

Now you can use PrimeVue components without importing:

```vue
<template>
    <!-- No import needed! -->
    <Button label="Click me" />
    <InputText v-model="value" />
    <DataTable :value="items" />
</template>
```

## Common Components

### Forms

| Component | Use For |
|-----------|---------|
| `InputText` | Text input |
| `InputNumber` | Numeric input |
| `Dropdown` | Single select |
| `MultiSelect` | Multiple select |
| `Calendar` | Date picker |
| `Checkbox` | Boolean toggle |
| `RadioButton` | Single choice |
| `Textarea` | Multi-line text |
| `Password` | Password input |

### Data

| Component | Use For |
|-----------|---------|
| `DataTable` | Tabular data |
| `TreeTable` | Hierarchical tables |
| `Tree` | Tree structure |
| `Timeline` | Event timeline |

### Feedback

| Component | Use For |
|-----------|---------|
| `Toast` | Notifications |
| `Message` | Inline messages |
| `ProgressBar` | Progress indicator |
| `Skeleton` | Loading placeholder |

## Dark Mode

```typescript
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.dark-mode'
        }
    }
})
```

Toggle with VueUse:

```typescript
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark-mode',
    valueLight: ''
})

const toggleDark = useToggle(isDark)
```
