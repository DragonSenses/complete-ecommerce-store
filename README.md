# complete-ecommerce-store
 A full-stack e-commerce store complete with an admin dashboard. Built in Next.JS 13 App Router, React, TailwindCSS, MongoDB, Prisma, & NextAuth

# Description

This project contains two parts:

1. A fully-functional e-commerce store
2. Admin Dashboard for the e-commerce store

Uses Next.js 13

# Live Link - WIP

# Technologies:

Next.JS 13, React, TailwindCSS, MongoDB, Prisma, & NextAuth

# Specifications

## Ecommerce Store

- 

## Dashboard

-

# Instructions to run locally

- Note: You are going to need an existing [MongoDB Atlas account](https://www.mongodb.com/), to [Get a Connection String](https://www.mongodb.com/docs/guides/atlas/connection-string/).

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

Setup values for the following parameters:

- `MONGO_URL` - should be equal to your MongoDB connection string
- `SECRET_KEY` - any string that is secret to you. You can use this [Key Generator](https://www.allkeysgenerator.com/)

Example of a `.env` file:

```js
MONGO_URL="Your_MongoDB_Connection_String"
SECRET_KEY="Secret_Key_You_Generated_Random_Characters"
```

**5. Run the app on localhost:3000**