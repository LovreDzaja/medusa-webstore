# Webshop Project

## Project Description

This project is a modern webshop built using the Medusa.js framework with Next.js  and Tailwind CSS. 

## Time spent

Approximately 3 days were spent developing this project.

## Most Challenging Implementation

The most challenging implementation would be the Cart functionality, making sure that it is updating and showing the price of the product passed by.

## Implementation I'm Most Proud Of

I am particularly proud of the Cart implementation and the creative use of `mix-blend-difference` mode on the navigation bar for better user expirience.

## Project Structure and considerations
```
storefront/
  ├── src/
  │   ├── app/
  │   │   ├── [productId]/
  │   │   │   └── page.tsx
  │   │   ├── checkout/
  │   │   │   ├── page.tsx
  │   │   ├── _local-cart-provider.tsx
  │   │   ├── _providers.tsx
  │   │   ├── page.tsx
  │   ├── assets/
  │   │   └── logo.png
  │   ├── components/
  │   │   ├── sidebar/
  │   │   │   ├── Filter.tsx
  │   │   │   ├── Search.tsx
  │   │   │   ├── Sidebar.tsx
  │   │   ├── loading.tsx
  │   │   ├── Navbar.tsx
  │   │   ├── NotFound.tsx
  │   │   ├── PageDetailsProduct.tsx
  │   │   ├── ProductCard.tsx
  │   │   └── ProductList.tsx
  │   ├── lib/
  │   │   ├── medusa-client.ts
  │   │   └── tanstack-query.ts
  │   ├── types/
  │   │   └── Product.ts
  │   ├── utils/
  │   │   └── searchProducts.ts
  │   ├── styles/
  │   │   ├── globals.css
  │   │   └── layout.tsx
  ├── .env
  ├── .eslintrc.json
  ├── .gitignore
  ├── next.config.mjs
  ├── package-lock.json
  ├── package.json
  ├── postcss.config.js
  ├── README.md
  ├── tailwind.config.js
  ├── tsconfig.json
  └── yarn.lock
```

## Key Considerations

### Reusability

Each component is designed to be reused.

### Separation of Concers

Components are organized into specific folders such as `sidebar`, making it easier to manage and update related components.

### TypeScript for Type Safety

TypeScript is used throughout the project to ensure project's safety and catch errors in early stages of development. For instance `types/Product.ts` defines the product type used across many components.

### Tailwind CSS for Styling 

Tailwind CSS provides us with a various amount of classes that can be easily integrated into our project to get that smooth look same as responsiveness across all devices.

### Medusa.js Integration

E-commmerce functionality: Medusa.js is integrated to handle core ecommerce functionalities, including showing products on page, adding collections to them, sorting.

Cart Management: The cart functionality, which was the most challenging implementation is maanged through components like `_local-cart-provider.tsx` and `_providers.tsx`

## Performance Optimization

Performance optimization includes lazy loading where components and it's contents are being loaded lazily to enhance user expirience while the components are getting ready to be shown. For example, the `loading.tsx` component is handling loading states for various parts of application.

## Environment Configuration

The `.env` file contains environment-specific variables to configure the application across different environments.
