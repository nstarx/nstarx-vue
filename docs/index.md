---
layout: home

hero:
  name: NStarX Platform
  text: Vue 3 + PrimeVue Stack
  tagline: A curated collection of libraries for building the NStarX Platform with Vue 3 and PrimeVue
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View Libraries
      link: /libraries/core
    - theme: alt
      text: Agent Prompt
      link: /agent-prompt

features:
  - icon: 💎
    title: PrimeVue
    details: 80+ professionally designed UI components with themes, accessibility, and incredible depth.
  - icon: 🍍
    title: Pinia
    details: Intuitive state management with Composition API support, TypeScript, and DevTools integration.
  - icon: 🛣️
    title: Vue Router 4
    details: Official routing with typed routes, navigation guards, and lazy loading.
  - icon: ⚡
    title: Vite
    details: Lightning-fast build tool with instant HMR, ES modules, and optimized production builds.
  - icon: 🧰
    title: VueUse
    details: 200+ essential composables for state, browser APIs, sensors, and more.
  - icon: ✅
    title: VeeValidate
    details: Form validation with Zod/Yup schemas and PrimeVue integration.
---

## The Stack at a Glance

| Category | Library | Purpose |
|----------|---------|---------|
| UI Components | **PrimeVue** | Complete UI component suite |
| State | **Pinia** | Store management |
| Routing | **Vue Router 4** | Navigation |
| Utilities | **VueUse** | Composables |
| Forms | **VeeValidate + Zod** | Validation |
| Data | **TanStack Query** | Server state |
| Build | **Vite** | Dev & bundling |
| Testing | **Vitest** | Unit tests |
| DX | **unplugin-auto-import** | Auto imports |

## Quick Start

```bash
# Create new Vite project
npm create vite@latest my-app -- --template vue-ts

# Install the stack
npm install primevue @primevue/themes primeicons
npm install pinia vue-router@4 @vueuse/core
npm install vee-validate @vee-validate/zod zod
npm install @tanstack/vue-query

# Dev dependencies
npm install -D unplugin-vue-components unplugin-auto-import
npm install -D @primevue/auto-import-resolver
npm install -D vitest @vue/test-utils
```
