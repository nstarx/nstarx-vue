import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'NStarX Platform - Vue 3 + PrimeVue Stack',
  description: 'Documentation for the NStarX Platform Vue 3 + PrimeVue development stack',

  // GitHub Pages deployment - set to repo name (e.g., '/vue3-stack-docs/')
  // Change to '/' if deploying to custom domain or root
  base: '/vue3-stack-docs/',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Libraries', link: '/libraries/core' },
      { text: 'Agent Prompt', link: '/agent-prompt' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Project Structure', link: '/guide/project-structure' },
            { text: 'Vite Configuration', link: '/guide/vite-config' }
          ]
        },
        {
          text: 'Essentials',
          items: [
            { text: 'PrimeVue Setup', link: '/guide/primevue-setup' },
            { text: 'State Management', link: '/guide/state-management' },
            { text: 'Routing', link: '/guide/routing' },
            { text: 'Forms & Validation', link: '/guide/forms' },
            { text: 'Data Fetching', link: '/guide/data-fetching' },
            { text: 'Testing', link: '/guide/testing' }
          ]
        }
      ],
      '/libraries/': [
        {
          text: 'Core Ecosystem',
          items: [
            { text: 'Overview', link: '/libraries/core' },
            { text: 'Pinia', link: '/libraries/pinia' },
            { text: 'Vue Router', link: '/libraries/vue-router' },
            { text: 'VueUse', link: '/libraries/vueuse' }
          ]
        },
        {
          text: 'Build & Tools',
          items: [
            { text: 'Vite', link: '/libraries/vite' },
            { text: 'Vitest', link: '/libraries/vitest' },
            { text: 'Auto Imports', link: '/libraries/auto-imports' }
          ]
        },
        {
          text: 'Forms & Data',
          items: [
            { text: 'VeeValidate', link: '/libraries/veevalidate' },
            { text: 'TanStack Query', link: '/libraries/tanstack-query' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vue' }
    ],

    footer: {
      message: 'Vue 3 + PrimeVue Development Stack',
      copyright: 'Built with VitePress'
    },

    search: {
      provider: 'local'
    }
  }
})
