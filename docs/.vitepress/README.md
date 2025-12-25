# VitePress Configuration

This folder contains the VitePress configuration for the NStarX Platform Vue 3 + PrimeVue documentation site.

## Structure

```
.vitepress/
├── config.ts      # Main VitePress configuration
├── cache/         # Build cache (auto-generated)
└── README.md      # This file
```

## Configuration Overview

The `config.ts` file defines:

- **Site metadata**: Title, description, favicon
- **Base path**: Set to `/vue3-stack-docs/` for GitHub Pages deployment
- **Navigation**: Top navbar with Home, Guide, Libraries, and Agent Prompt links
- **Sidebar**: Structured navigation for Guide and Libraries sections
- **Theme**: Logo, social links, footer, and local search

## Development

```bash
# Start dev server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

## Customization

### Adding Pages

1. Create `.md` files in `docs/` or subdirectories
2. Update `sidebar` in `config.ts` to include navigation links

### Theme Customization

To customize the theme, create a `theme/` folder with:
- `index.ts` - Theme entry point
- `style.css` - Custom styles

### Assets

Place static assets in `docs/public/`:
- `logo.svg` - Site logo
- `favicon.ico` - Browser favicon

## GitHub Pages Deployment

This site is configured for automatic deployment to GitHub Pages.

### Setup

1. Push the repository to GitHub
2. Go to **Settings > Pages**
3. Under "Build and deployment", select **GitHub Actions** as the source
4. The workflow at `.github/workflows/deploy.yml` handles the rest

### How It Works

- Pushes to `main` branch trigger automatic deployment
- The workflow builds the site and deploys to GitHub Pages
- Site will be available at: `https://<username>.github.io/vue3-stack-docs/`

### Custom Domain

To use a custom domain:

1. Update `base` in `config.ts` to `'/'`
2. Add a `CNAME` file in `docs/public/` with your domain
3. Configure DNS settings in your domain provider
