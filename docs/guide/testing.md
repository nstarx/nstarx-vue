# Testing with Vitest

Vitest is a fast unit testing framework powered by Vite.

## Installation

```bash
npm install -D vitest @vue/test-utils happy-dom @pinia/testing
```

## Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    test: {
        environment: 'happy-dom',
        globals: true,
        setupFiles: ['./src/test/setup.ts']
    },
    resolve: {
        alias: {
            '@': '/src'
        }
    }
})
```

## Test Setup

```typescript
// src/test/setup.ts
import { config } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

config.global.plugins = [
    PrimeVue,
    ToastService,
    ConfirmationService
]
```

## Testing Components

```typescript
// components/__tests__/UserCard.spec.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UserCard from '../UserCard.vue'

describe('UserCard', () => {
    it('renders user name', () => {
        const wrapper = mount(UserCard, {
            props: {
                user: { id: '1', name: 'John Doe', email: 'john@example.com' }
            }
        })

        expect(wrapper.text()).toContain('John Doe')
    })

    it('emits edit event when button clicked', async () => {
        const wrapper = mount(UserCard, {
            props: {
                user: { id: '1', name: 'John Doe', email: 'john@example.com' }
            }
        })

        await wrapper.find('[data-testid="edit-btn"]').trigger('click')

        expect(wrapper.emitted('edit')).toBeTruthy()
        expect(wrapper.emitted('edit')[0]).toEqual(['1'])
    })
})
```

## Testing with Pinia

```typescript
// stores/__tests__/useUserStore.spec.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '../useUserStore'

// Mock API
vi.mock('@/api', () => ({
    api: {
        getUser: vi.fn()
    }
}))

import { api } from '@/api'

describe('useUserStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        vi.clearAllMocks()
    })

    it('starts with no user', () => {
        const store = useUserStore()
        expect(store.user).toBeNull()
        expect(store.isAuthenticated).toBe(false)
    })

    it('fetches user successfully', async () => {
        const mockUser = { id: '1', name: 'John' }
        vi.mocked(api.getUser).mockResolvedValue(mockUser)

        const store = useUserStore()
        await store.fetchUser('1')

        expect(store.user).toEqual(mockUser)
        expect(store.loading).toBe(false)
    })

    it('handles fetch error', async () => {
        vi.mocked(api.getUser).mockRejectedValue(new Error('Failed'))

        const store = useUserStore()
        await store.fetchUser('1')

        expect(store.user).toBeNull()
        expect(store.error).toBe('Failed to fetch user')
    })
})
```

## Testing Components with Pinia

```typescript
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import UserProfile from '../UserProfile.vue'

describe('UserProfile', () => {
    it('shows user data from store', () => {
        const wrapper = mount(UserProfile, {
            global: {
                plugins: [
                    createTestingPinia({
                        initialState: {
                            user: {
                                user: { id: '1', name: 'John' }
                            }
                        },
                        createSpy: vi.fn
                    })
                ]
            }
        })

        expect(wrapper.text()).toContain('John')
    })
})
```

## Testing PrimeVue Components

```typescript
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import MyForm from '../MyForm.vue'

describe('MyForm', () => {
    it('submits form data', async () => {
        const wrapper = mount(MyForm, {
            global: {
                plugins: [PrimeVue],
                components: { Button }
            }
        })

        await wrapper.find('input[name="email"]').setValue('test@example.com')
        await wrapper.find('form').trigger('submit')

        expect(wrapper.emitted('submit')).toBeTruthy()
    })
})
```

## Testing Composables

```typescript
// composables/__tests__/useCounter.spec.ts
import { describe, it, expect } from 'vitest'
import { useCounter } from '../useCounter'

describe('useCounter', () => {
    it('initializes with default value', () => {
        const { count } = useCounter()
        expect(count.value).toBe(0)
    })

    it('increments count', () => {
        const { count, increment } = useCounter()
        increment()
        expect(count.value).toBe(1)
    })

    it('accepts initial value', () => {
        const { count } = useCounter(10)
        expect(count.value).toBe(10)
    })
})
```

## Testing TanStack Query

```typescript
import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import ProductList from '../ProductList.vue'

describe('ProductList', () => {
    it('shows products after loading', async () => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false }
            }
        })

        vi.mocked(api.getProducts).mockResolvedValue([
            { id: '1', name: 'Product 1' }
        ])

        const wrapper = mount(ProductList, {
            global: {
                plugins: [[VueQueryPlugin, { queryClient }]]
            }
        })

        // Initially loading
        expect(wrapper.find('.p-progress-spinner').exists()).toBe(true)

        // Wait for query to resolve
        await flushPromises()

        expect(wrapper.text()).toContain('Product 1')
    })
})
```

## Running Tests

```bash
# Run tests
npm run test

# Watch mode
npm run test -- --watch

# Coverage
npm run test -- --coverage

# UI mode
npm run test -- --ui
```

## Package.json Scripts

```json
{
    "scripts": {
        "test": "vitest run",
        "test:watch": "vitest",
        "test:coverage": "vitest run --coverage",
        "test:ui": "vitest --ui"
    }
}
```
