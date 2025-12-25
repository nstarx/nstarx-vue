# VueUse

Collection of essential Vue Composition Utilities.

## Installation

```bash
npm install @vueuse/core
```

## Key Features

- **200+ composables** - Covers most common needs
- **Tree-shakeable** - Only ship what you use
- **TypeScript** - Full type support
- **SSR friendly** - Works with Nuxt

## Essential Composables

### State

```typescript
// Reactive localStorage
const user = useStorage('user', { name: '', theme: 'light' })

// Reactive sessionStorage
const token = useSessionStorage('token', '')

// Memory storage (not persisted)
const temp = useStorage('temp', {}, sessionStorage)
```

### Browser

```typescript
// Dark mode toggle
const isDark = useDark()
const toggleDark = useToggle(isDark)

// Clipboard
const { copy, copied } = useClipboard()
await copy('Hello!')

// Online status
const isOnline = useOnline()

// Window size
const { width, height } = useWindowSize()
```

### Utilities

```typescript
// Debounce
const searchQuery = ref('')
const debouncedQuery = useDebounce(searchQuery, 300)

// Throttle
const scrollPosition = useThrottle(rawScrollPosition, 100)

// Toggle
const [isOpen, toggle] = useToggle(false)
```

### Sensors

```typescript
// Mouse position
const { x, y } = useMouse()

// Scroll position
const { y: scrollY } = useScroll(window)

// Element visibility
const target = ref<HTMLElement>()
const isVisible = useElementVisibility(target)
```

### Network

```typescript
// Fetch with reactive URL
const url = ref('/api/users')
const { data, isFetching, error } = useFetch(url).json()

// With options
const { data } = useFetch('/api/users', {
    refetch: true,
    timeout: 5000
}).json()
```

## PrimeVue Integration

### Dark Mode with PrimeVue

```typescript
const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark-mode',
    valueLight: ''
})

const toggleDark = useToggle(isDark)
```

### Debounced DataTable Search

```vue
<script setup lang="ts">
const searchQuery = ref('')
const debouncedSearch = useDebounce(searchQuery, 300)

const filteredProducts = computed(() =>
    products.value.filter(p =>
        p.name.toLowerCase().includes(debouncedSearch.value.toLowerCase())
    )
)
</script>

<template>
    <InputText v-model="searchQuery" placeholder="Search..." />
    <DataTable :value="filteredProducts">
        <!-- columns -->
    </DataTable>
</template>
```

### Intersection Observer for Lazy Loading

```vue
<script setup lang="ts">
const target = ref<HTMLElement>()
const isVisible = useElementVisibility(target)

watch(isVisible, (visible) => {
    if (visible) {
        loadMoreData()
    }
})
</script>

<template>
    <div ref="target">
        <ProgressSpinner v-if="loading" />
    </div>
</template>
```

## Links

- [VueUse Docs](https://vueuse.org/)
- [GitHub](https://github.com/vueuse/vueuse)
