# RayShop

A one-page shopping landing page built around an interactive clothing-rail hero.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui

## Run locally

Requires Node.js 20 or newer (22 recommended, see `.nvmrc`).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run lint    # ESLint
```

## Project structure

```
app/
  layout.tsx                 Fonts, metadata, smooth scrolling
  page.tsx                   Renders the landing page
  globals.css                Tailwind v4 + shadcn theme tokens
components/
  ui/product-rail-gallery.tsx       Clothing rail hero component
  ui/product-rail-gallery-demo.tsx  Product data (RAIL_DEMO_ITEMS)
  landing/shop-landing.tsx          Page: hero, perks, story, care guide
  landing/site-nav.tsx              Sticky nav + mobile menu + bag count
  landing/featured-products.tsx     Filterable product grid
  landing/site-footer.tsx           Footer + newsletter form
  landing/logo.tsx                  RayShop wordmark
netlify.toml                 Netlify build settings
```

## Product images

The demo photos are served from `cdn.21st.dev` through a same-origin rewrite
(`/rail-assets/*` in `next.config.ts`). The rail uses photos as CSS masks, and
browsers block cross-origin mask images unless the CDN sends CORS headers.
To use your own photos, put them in `public/` (for example `public/products/`)
and point `image`, `backImage` and `sideImage` at `/products/...`.

## Deploy to GitHub

Create an empty repository on github.com (no README or .gitignore), then:

```bash
git remote add origin https://github.com/YOUR-USERNAME/rayshop.git
git push -u origin main
```

## Deploy to Netlify

1. In Netlify, choose **Add new site → Import an existing project → GitHub** and pick this repository.
2. Netlify reads `netlify.toml`: build command `npm run build`, publish directory `.next`, Node 22.
3. Click **Deploy**. Every push to `main` redeploys automatically.

## Not wired up yet

The bag, search and newsletter work in the browser only: there is no checkout,
no persistence and no email service. Footer links point to sections on this page.
