# Forms & Validation

Form handling with VeeValidate, Zod, and PrimeVue components.

## Setup

```bash
npm install vee-validate @vee-validate/zod zod
```

## Basic Form with Zod

```vue
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

// Define schema
const schema = toTypedSchema(
    z.object({
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string()
    }).refine(data => data.password === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword']
    })
)

// Setup form
const { handleSubmit, errors, defineField, resetForm } = useForm({
    validationSchema: schema
})

// Define fields
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')

// Handle submit
const toast = useToast()

const onSubmit = handleSubmit(async (values) => {
    try {
        await api.register(values)
        toast.add({ severity: 'success', summary: 'Registered!' })
        resetForm()
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Registration failed' })
    }
})
</script>

<template>
    <Toast />
    <form @submit="onSubmit" class="flex flex-col gap-4">
        <div class="field">
            <label for="email">Email</label>
            <InputText
                id="email"
                v-model="email"
                v-bind="emailAttrs"
                :invalid="!!errors.email"
                class="w-full"
            />
            <small class="p-error">{{ errors.email }}</small>
        </div>

        <div class="field">
            <label for="password">Password</label>
            <Password
                id="password"
                v-model="password"
                v-bind="passwordAttrs"
                :invalid="!!errors.password"
                toggleMask
                class="w-full"
            />
            <small class="p-error">{{ errors.password }}</small>
        </div>

        <div class="field">
            <label for="confirmPassword">Confirm Password</label>
            <Password
                id="confirmPassword"
                v-model="confirmPassword"
                v-bind="confirmPasswordAttrs"
                :invalid="!!errors.confirmPassword"
                :feedback="false"
                toggleMask
                class="w-full"
            />
            <small class="p-error">{{ errors.confirmPassword }}</small>
        </div>

        <Button type="submit" label="Register" />
    </form>
</template>
```

## Reusable Field Component

```vue
<!-- components/forms/FormField.vue -->
<script setup lang="ts">
interface Props {
    name: string
    label: string
    error?: string
}

defineProps<Props>()
</script>

<template>
    <div class="field">
        <label :for="name">{{ label }}</label>
        <slot />
        <small v-if="error" class="p-error">{{ error }}</small>
    </div>
</template>
```

## Complex Form Example

```vue
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const schema = toTypedSchema(
    z.object({
        name: z.string().min(1, 'Name is required'),
        category: z.string().min(1, 'Category is required'),
        price: z.number().min(0.01, 'Price must be positive'),
        quantity: z.number().int().min(0, 'Quantity must be 0 or more'),
        active: z.boolean(),
        releaseDate: z.date().optional(),
        tags: z.array(z.string()).min(1, 'Select at least one tag')
    })
)

const { handleSubmit, errors, defineField, setValues } = useForm({
    validationSchema: schema,
    initialValues: {
        active: true,
        tags: []
    }
})

const [name, nameAttrs] = defineField('name')
const [category, categoryAttrs] = defineField('category')
const [price, priceAttrs] = defineField('price')
const [quantity, quantityAttrs] = defineField('quantity')
const [active, activeAttrs] = defineField('active')
const [releaseDate, releaseDateAttrs] = defineField('releaseDate')
const [tags, tagsAttrs] = defineField('tags')

const categories = ref([
    { label: 'Electronics', value: 'electronics' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Books', value: 'books' }
])

const tagOptions = ref([
    { label: 'New', value: 'new' },
    { label: 'Sale', value: 'sale' },
    { label: 'Featured', value: 'featured' }
])

const onSubmit = handleSubmit(async (values) => {
    console.log('Form values:', values)
})
</script>

<template>
    <form @submit="onSubmit">
        <div class="grid">
            <div class="col-12 md:col-6">
                <div class="field">
                    <label for="name">Product Name</label>
                    <InputText id="name" v-model="name" v-bind="nameAttrs"
                        :invalid="!!errors.name" class="w-full" />
                    <small class="p-error">{{ errors.name }}</small>
                </div>
            </div>

            <div class="col-12 md:col-6">
                <div class="field">
                    <label for="category">Category</label>
                    <Dropdown id="category" v-model="category" v-bind="categoryAttrs"
                        :options="categories" optionLabel="label" optionValue="value"
                        :invalid="!!errors.category" class="w-full" />
                    <small class="p-error">{{ errors.category }}</small>
                </div>
            </div>

            <div class="col-12 md:col-6">
                <div class="field">
                    <label for="price">Price</label>
                    <InputNumber id="price" v-model="price" v-bind="priceAttrs"
                        mode="currency" currency="USD"
                        :invalid="!!errors.price" class="w-full" />
                    <small class="p-error">{{ errors.price }}</small>
                </div>
            </div>

            <div class="col-12 md:col-6">
                <div class="field">
                    <label for="quantity">Quantity</label>
                    <InputNumber id="quantity" v-model="quantity" v-bind="quantityAttrs"
                        :invalid="!!errors.quantity" class="w-full" />
                    <small class="p-error">{{ errors.quantity }}</small>
                </div>
            </div>

            <div class="col-12 md:col-6">
                <div class="field">
                    <label for="releaseDate">Release Date</label>
                    <Calendar id="releaseDate" v-model="releaseDate" v-bind="releaseDateAttrs"
                        dateFormat="yy-mm-dd" class="w-full" />
                </div>
            </div>

            <div class="col-12 md:col-6">
                <div class="field">
                    <label for="tags">Tags</label>
                    <MultiSelect id="tags" v-model="tags" v-bind="tagsAttrs"
                        :options="tagOptions" optionLabel="label" optionValue="value"
                        :invalid="!!errors.tags" class="w-full" />
                    <small class="p-error">{{ errors.tags }}</small>
                </div>
            </div>

            <div class="col-12">
                <div class="field-checkbox">
                    <Checkbox id="active" v-model="active" v-bind="activeAttrs" binary />
                    <label for="active" class="ml-2">Active</label>
                </div>
            </div>
        </div>

        <Button type="submit" label="Save Product" icon="pi pi-check" />
    </form>
</template>
```

## Form Composable Pattern

```typescript
// composables/useProductForm.ts
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export function useProductForm(initialValues?: Partial<ProductFormValues>) {
    const schema = toTypedSchema(
        z.object({
            name: z.string().min(1),
            price: z.number().min(0)
        })
    )

    const form = useForm({
        validationSchema: schema,
        initialValues: {
            name: '',
            price: 0,
            ...initialValues
        }
    })

    return {
        ...form,
        nameField: form.defineField('name'),
        priceField: form.defineField('price')
    }
}
```
