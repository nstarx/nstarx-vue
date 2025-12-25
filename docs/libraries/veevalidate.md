# VeeValidate

Painless Vue forms with validation.

## Installation

```bash
npm install vee-validate @vee-validate/zod zod
```

## Key Features

- **Composition API** - `useForm`, `useField`
- **Schema validation** - Zod, Yup, Valibot
- **TypeScript** - Full type inference
- **i18n support** - Localized messages

## Basic Usage with PrimeVue

```vue
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const schema = toTypedSchema(
    z.object({
        email: z.string().email('Invalid email'),
        password: z.string().min(8, 'Min 8 characters')
    })
)

const { handleSubmit, errors, defineField } = useForm({
    validationSchema: schema
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit((values) => {
    console.log(values)
})
</script>

<template>
    <form @submit="onSubmit">
        <div class="field">
            <label for="email">Email</label>
            <InputText
                id="email"
                v-model="email"
                v-bind="emailAttrs"
                :invalid="!!errors.email"
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
            />
            <small class="p-error">{{ errors.password }}</small>
        </div>

        <Button type="submit" label="Submit" />
    </form>
</template>
```

## Common Schemas

```typescript
// schemas/user.ts
import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().min(1, 'Required').email('Invalid email'),
    password: z.string().min(8, 'Min 8 characters')
})

export const registerSchema = loginSchema.extend({
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword']
})

export const productSchema = z.object({
    name: z.string().min(1, 'Required'),
    price: z.number().min(0.01, 'Must be positive'),
    category: z.string().min(1, 'Required'),
    active: z.boolean()
})
```

## Links

- [VeeValidate Docs](https://vee-validate.logaretm.com/v4/)
- [GitHub](https://github.com/logaretm/vee-validate)
