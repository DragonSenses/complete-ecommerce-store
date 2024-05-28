# complete-ecommerce-store

A full-stack e-commerce store with an admin dashboard built using Next.JS's App Router, TypeScript, React, TailwindCSS, PostgreSQL & Prisma.

# Description

This project contains two parts:

1. Admin dashboard to manage the e-commerce store
2. A front-end e-commerce store

# Technologies:

- Next.JS 13 
- TypeScript, React, TailwindCSS
- PostgreSQL and [Prisma ORM](https://www.prisma.io/docs) for database
- [Clerk](https://clerk.com/docs) for authentication
- [Stripe API](https://docs.stripe.com/api) for checkout and payment handling
- [Cloudinary](https://cloudinary.com/developers) for image management
- [zustand](https://github.com/pmndrs/zustand) for state management
- [shadcn/ui](https://ui.shadcn.com/) component collection for admin dashboard
- [headlessui](https://headlessui.com/react/menu) component library for the front-end store

# Specifications

- User can **create**, **read**, **update** and **delete** categories
- User can **create**, **read**, **update** and **delete** products
- Users can upload multiple product images and update them as needed
- User can **create**, **read**, **update** and **delete**  filters such as *Color* and *Size*
- User can apply filters to products

- User can **create**, **read**, **update** and **delete** Billboards, large ads displayed at the top of a store's page to promote products, services, or events
  - Billboards can be attached to a single category or used individually (admin generates API routes for all of these cases)

- User can search through all categories, products, sizes, colors, billboards through a `DataTable` complete with ***pagination***

- User can highlight and promote products using the *featured* functionality which displays the product on the home page

- User can manage orders and sales

- User can view analytics for total revenue, sales & product inventory

- User can copy API routes from the admin dashboard and apply them to the store

## Dashboard

- Admin dashboard uses [shadcn/ui](https://ui.shadcn.com/) component library
- Admin dashboard is both a **CMS** (Content Management System) and **API** (Application Programming Interface)
- Dashboard can manage and control multiple stores and vendors through one CMS
  - e.g., Computer parts store, fruit store and a clothing store can be handled all in the admin dashboard
- CMS dashboard will generate API routes for each store individually

## Ecommerce Store

- Front-end store that displays each store as a collection of products
  - e.g., organize each store as a collection of "shoes", "fruits" or "clothing"
  - Display each store at the navbar at the top
- Responsive design, users can view the website in both mobile, tablet or desktop screens
- User can filter products by size, color and more
- User can view a grid of featured products
- User can click the shopping cart icon
  - User can view their shopping cart, products in shopping cart and order summary
- User can purchase products securely with [Stripe security](https://docs.stripe.com/security) by encrypting sensitive data (such as credit card or account numbers) both in transit and at rest.
  - [Stripe dedicated card technology](https://docs.stripe.com/security#:~:text=Stripe%20encrypts%20sensitive%20data%20both,the%20rest%20of%20our%20services.)

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

Install dependencies for each project. First change directory to the project and then run the command: npm run install-dependencies

    In the terminal:

    ```powershell
    cd /ecommerce-admin
    npm run install-dependencies

    cd /ecommerce-store
    npm run install-dependencies
    ```

**4. Create an `.env` file**

You want to create a local file to hold your sensitive information.

At the root of the project, create your environment variables in a file named `.env` that contains the following template:

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
- [Cloudinary](https://cloudinary.com/) for image and media management
- [Stripe](https://stripe.com/) to handle payments, orders and checkout session
- [Stripe Webhook](https://stripe.com/docs/webhooks) so our app can update payment, product and order data in real time
- A database provider

After creating an account at each service, get your own personal API key and save it inside the `.env` file.

**5. Get Connection URI string from database provider and connect it with Prisma**

To establish a connection with Prisma, one must retrieve the connection URI string. For more details see the [connection URLs in Prisma](https://www.prisma.io/docs/orm/reference/connection-urls) and the documentation from your respective database provider.

**For local PostgreSQL database:** [Set up a local postgreSQL database](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database) on your computer and create the database. Then create your local [connection URL](https://www.prisma.io/docs/orm/reference/connection-urls).

An example connection URI string should be something like this: 

`.env`
```shell
DATABASE_URL="postgresql://johndoe:mypassword@localhost:5432/mydb?schema=public"
```

- **Important note:** For PostgreSQL you must [percentage-encode special characters](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding) in any part of your connection URL - including passwords. For example, `p@$$w0rd` becomes `p%40%24%24w0rd`.

**Setup your database with prisma** by running the following commands in the right directory: `/ecommerce-admin`

```sh
npx prisma generate
npx prisma db push
```

**6. Run the ecommerce-admin app on localhost:3000**

```sh
cd /ecommerce-admin

npm run dev
```

Make sure that admin project is running before you run the front-end store project.

**7. Run ecommerce-store app on localhost:3001**

```sh
cd /ecommerce-store

npm run dev
```

**8. Create a new store**

With all things configured, you can create a new store through the store form. If you already have a store, then click the drop-down menu to the top left and click the "Create Store" option.

**9. Populate store with products, billboards, categories, sizes, colors in the admin dashboard**

After creating a new store we can start going through the billboards, categories, colors, products and sizes.

**Note: make sure to completely fill out a product creation form, which includes adding an image.**

**10. Add your API routes from admin to the front-end, ecommerce-store**

First thing, create an `.env` file under `/ecommerce-store` folder:

```env
NEXT_PUBLIC_API_URL=
```

You can find your `NEXT_PUBLIC_API_URL` key in your `Settings` tab in the `admin-dashboard`'s navigation bar.

After filling that in, we can take a specific billboard's ID through the Admin dashboard > Billboards > and right click on the "..." in the DataTable to press "Copy ID". 

Navigate to home page found in `ecommerce-store\app\(routes)\page.tsx` and paste the ID inside the `getBillboard()`

```tsx
export default async function HomePage() {

  // Fetch featured products
  const products = await getProducts({ isFeatured: true });

  // Fetch billboard
  const billboard = await getBillboard("YOUR_BILLBOARD_ID_HERE");

  //  ...
}
```

**11. Create your Stripe Webhook key**

In order for the payment and checkout to work, you need to set up your Stripe webhook.

- Install [Stripe CLI](https://stripe.com/docs/stripe-cli). Download the windows zip file, unzip the folder, change into the directory where its unzipped and run the commands from there (e.g., `stripe login`).

- [Webhooks quickstart | Stripe Reference](https://stripe.com/docs/webhooks/quickstart)

At this point you should be on the test on `Test the webhook`, and just downloaded the CLI. After successfully running the `stripe login` command, you should receieve a "webhook signing secret" key. Copy that and paste it into the `.env` file as the value to the `STRIPE_WEBHOOK_SECRET` variable.

After testing the webhook locally, you can finally start processing orders.

**12. Deploy to Production**

See the `architectural-decision-log.md` file attached to this repository, and navigate to the section on **# Deployment**.

The **Deployment** section includes a detailed step-by-step guide on how to get this entire app working in production: **live and ready for use by end users**.