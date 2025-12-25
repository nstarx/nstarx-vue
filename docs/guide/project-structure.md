# Project Structure

Recommended directory structure for Vue 3 + PrimeVue applications.

## Directory Layout

```
src/
├── assets/                 # Static assets (images, fonts)
│   └── styles/
│       └── main.css
├── components/
│   ├── common/            # Shared components wrapping PrimeVue
│   │   ├── AppHeader.vue
│   │   ├── AppSidebar.vue
│   │   └── AppFooter.vue
│   ├── forms/             # Form-specific components
│   │   ├── LoginForm.vue
│   │   └── UserForm.vue
│   └── ui/                # Custom UI components
├── composables/           # Custom composables
│   ├── useAuth.ts
│   ├── useApi.ts
│   └── useNotifications.ts
├── layouts/               # Page layouts
│   ├── DefaultLayout.vue
│   ├── AuthLayout.vue
│   └── AdminLayout.vue
├── router/
│   ├── index.ts
│   └── guards.ts
├── stores/                # Pinia stores
│   ├── useAuthStore.ts
│   ├── useUserStore.ts
│   └── index.ts
├── types/                 # TypeScript types
│   ├── api.ts
│   ├── models.ts
│   └── index.ts
├── utils/                 # Utility functions
│   ├── formatters.ts
│   └── validators.ts
├── views/                 # Page components
│   ├── HomeView.vue
│   ├── auth/
│   │   ├── LoginView.vue
│   │   └── RegisterView.vue
│   └── dashboard/
│       └── DashboardView.vue
├── App.vue
└── main.ts
```

## File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `UserCard.vue` |
| Composables | camelCase with `use` prefix | `useAuth.ts` |
| Stores | camelCase with `use` prefix | `useAuthStore.ts` |
| Views | PascalCase with `View` suffix | `HomeView.vue` |
| Types | PascalCase | `User.ts` |
| Utils | camelCase | `formatDate.ts` |

## Component Structure

```vue
<script setup lang="ts">
// 1. Imports (handled by auto-import mostly)
import type { User } from '@/types'

// 2. Props & Emits
const props = defineProps<{
    user: User
}>()

const emit = defineEmits<{
    update: [user: User]
}>()

// 3. Composables
const toast = useToast()

// 4. Reactive state
const isLoading = ref(false)

// 5. Computed
const fullName = computed(() => `${props.user.firstName} ${props.user.lastName}`)

// 6. Methods
function handleSubmit() {
    // ...
}

// 7. Lifecycle
onMounted(() => {
    // ...
})
</script>

<template>
    <!-- Template -->
</template>

<style scoped>
/* Scoped styles */
</style>
```
