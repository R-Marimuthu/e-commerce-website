# Current Audio — React storefront

A small e-commerce demo built with React + Vite: product catalog, search &
category filtering, and a shopping cart — fully responsive.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  main.jsx              entry point
  App.jsx                top-level layout & state (search/filter)
  index.css              design tokens & global styles
  data/
    products.js          product catalog
  context/
    CartContext.jsx      cart state (React context + useReducer)
  components/
    Header.jsx            sticky nav + cart button
    Hero.jsx               landing headline
    SearchFilter.jsx       search input + category chips
    ProductGrid.jsx        responsive product grid
    ProductCard.jsx        single product card
    CartDrawer.jsx         slide-in cart panel
    Footer.jsx              footer
    Icons.jsx               inline SVG icons
```

## Notes

- No backend — "Add to cart" and "Checkout" are client-side only.
- Product art is generated with CSS gradients + inline SVG glyphs (no image
  assets needed).
- Responsive from ~360px mobile up through desktop; the product grid steps
  from 1 → 2 → 3 → 4 columns, and the cart becomes a full-width slide-in
  panel on small screens.
