# VELORA — React eCommerce Storefront

A bright, modern eCommerce frontend built with React, TypeScript and Vite. Products and categories are loaded live from the public DummyJSON API, so no backend or API key is required.

## Tech Stack

| Area | Technology |
| --- | --- |
| UI library | React 18 |
| Language | TypeScript 5 (strict mode) |
| Build tool / dev server | Vite 6 with @vitejs/plugin-react |
| Icons | Lucide React |
| Styling | Plain CSS (`src/styles.css`) |
| Data | DummyJSON REST API |

## Features

- Product catalog and categories fetched from the API
- Live search by title, brand and category
- Category filtering
- Sorting: featured, top rated, price low → high, price high → low
- Favorites with a counter in the header
- Shopping cart drawer with quantity controls, item removal and subtotal
- Loading skeletons, error state with retry, and empty-results state
- Responsive layout with a mobile menu and a floating cart button
- Fully typed components and state

## Getting Started

Requirements: Node.js 18 or newer.

# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

## Scripts

| Command | Description |
| --- | --- |
| npm run dev | Start the Vite dev server with hot reload |
| npm run build | Type-check with tsc and create a production build in dist/ |
| npm run preview | Serve the production build locally |

## Project Structure

eCommerce/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json          # references the two configs below
├── tsconfig.app.json      # app code (src/)
├── tsconfig.node.json     # Vite config
└── src/
    ├── main.tsx           # entry point
    ├── App.tsx            # data loading, filters, cart and favorites state
    ├── types.ts           # Product, CartItem, Category, SortOption
    ├── styles.css
    └── components/
        ├── Header.tsx       # logo, navigation, search, cart button
        ├── Hero.tsx
        ├── Shop.tsx         # categories, sorting, product grid, states
        ├── ProductCard.tsx
        ├── CartDrawer.tsx
        ├── Story.tsx
        ├── Newsletter.tsx
        └── Footer.tsx

## Data Source

| Endpoint | Purpose |
| --- | --- |
| https://dummyjson.com/products?limit=100 | Product list |
| https://dummyjson.com/products/categories | Category list |

An internet connection is required for products to load.
