# complete-ecommerce-store

A full-stack e-commerce store with an admin dashboard built using Next.JS's App Router, TypeScript, React, TailwindCSS, MySQL, Prisma, & NextAuth.

# Description

This project contains two parts:

1. Admin dashboard to manage the e-commerce store
2. A front-end e-commerce store

Uses Next.js 13

# Live Link - WIP

- TODO: live link (still finding a service to host on)
- TODO: add mock up 
- TODO: Sample Screenshots
- TODO: Sample Data

# Technologies:

- Next.JS 13 
- TypeScript, React, TailwindCSS
- MySQL, Prisma and PlanetScale for database
- NextAuth
- Stripe API
- Clerk for authentication
- Cloudinary for image management

# Specifications

- User can **create**, **read**, **update** and **delete** categories
- User can **create**, **read**, **update** and **delete** products

- User can upload multiple images for products, and update them whenever
- User can **create**, **read**, **update** and **delete**  filters such as *Color* and *Size*
- User can apply filters to products

- User can **create**, **read**, **update** and **delete** Billboards, large ads displayed at the top of a store's page to promote products, services, or events
  - Billboards can be attached to a single category or used individually (admin generates API routes for all of these cases)

- User can search through all categories, products, sizes, colors, billboards complete with pagination

- User can highlight and promote products using the *featured* functionality which displays the product on the home page

- User can manage orders and sales

- User can view analytics for total revenue, sales & product inventory

## Dashboard

- Admin dashboard uses [shadcn/ui](https://ui.shadcn.com/) component library
- Admin dashboard is both a **CMS** (Content Management System) and **API** (Application Programming Interface)
- Dashboard can manage and control multiple stores and vendors through one CMS
  - e.g., Computer parts store, fruit store and a clothing store can be handled all in the admin dashboard
- CMS dashboard will generate API routes for each store individually


## Ecommerce Store

- 

## Prerequisites

- [Node](https://nodejs.org/en/download) version 14 or higher

# Instructions to run locally

**1. Clone this repo (or download zip on GitHub)**

**2. Go to the directory the files are located**

    In the terminal:

    ```powershell
    cd /complete-ecommerce-store
    ```

**3. Install dependencies**

    In the terminal:

    ```powershell
    npm run install-dependencies
    ```

**4. Create an `.env` file**

At the root of the project, create a file named `.env` that contains the following template:

```.env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL=''
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
STRIPE_API_KEY=
FRONTEND_STORE_URL=http://localhost:3001
STRIPE_WEBHOOK_SECRET=
```

The services you'll need to create an account in to fill in these variables are:

- [Clerk](https://clerk.com/) for user authentication and management
- [PlanetScale](https://planetscale.com/) for a MySQL database platform
- [Cloudinary](https://cloudinary.com/) for image and media management
- [Stripe](https://stripe.com/) to handle payments, orders and checkout session
- [Stripe Webhook](https://stripe.com/docs/webhooks) so our app can update payment, product and order data in real time

After creating an account at each service, get your own personal API key and save it inside the `.env` file.

**5. Connect to PlanetScale and Push Prisma**

Setup your database by running the following commands in the right directory: `/ecommerce-admin`

```sh
npx prisma generate
npx prisma db push
```

**6. Run the ecommerce-admin app on localhost:3000**

```sh
cd /ecommerce-admin

npm run dev
```

**7. Run ecommerce-store app on localhost:3001**

```sh
cd /ecommerce-store

npm run dev
```