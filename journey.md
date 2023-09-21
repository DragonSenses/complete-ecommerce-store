# Start of a journey

This will document all the progress and work in creating this project.

# The Design and Setup

This project consists of two parts: 1) E-commerce store front web application & 2) The Admin Dashboard.

These will also include the API Calls.

## Technologies used

The technologies I plan to use:

- TypeScript

Front-End
- Next.js 13's App Router
- Tailwind CSS
- [shadcn/ui](https://ui.shadcn.com/)
- zustand (global state management)

Database
- MySQL
- PlanetScale
- Prisma (ORM)

- Stripe

Authentication
- Clerk

- Axios
- react-hot-toast

Image Delivery
- Cloudinary & Next Cloudinary

## Discussion on why each tech was used

- Next.js 13 App Router is my new favorite way to create front-end application with client-side routing.
- Tailwind CSS is just a preference, I prefer how the ease of styling and responsive design. Another favorite.

### [shadcn/ui](https://ui.shadcn.com/)

Looking at the documentation [shadcn/ui docs intro](https://ui.shadcn.com/docs), it is **NOT** a component library.

Examples of a component library are:

- [Material UI Kit](https://mui.com/material-ui/)
- [ChakraUI](https://chakra-ui.com/)

These are primary npm packages, so you cannot individually install e.g., a button.

On the other hand, what `shadcn/ui` offers instead is that it you can pick out individual components you need and copy and paste it into your project. This offers more control, configuration, and flexibility.

**We can build our own component system and not be dependent on any 3rd party npm library which needs to be updated and maintained.**

#### How can I use `shadcn/ui`?

Let's take a look at the [`Button` element](https://ui.shadcn.com/docs/components/button).

Under the **Installation** tab:

- We can either use **Command Line Interface (CLI)** to install it
  
  ```sh
  npx shadcn-ui@latest add button
  ```

- Or we can click on **Manual** and hit *Expand* to see the exact code to add it into our project.

This will also allow us to modify anything from the `size` of the component or the `variants` names.

#### Install and configure **Next.js** project with `shadcn/ui`

[Install Next.js with `shadcn/ui`](https://ui.shadcn.com/docs/installation/next).

Let's install `shadcn/ui` through the official `create-next-app`.

I want to use typescipt, tailwind, and eslint. I will call this project `ecommerce-admin`.

So in the terminal, here is the command we go with:

```sh
npx create-next-app@latest ecommerce-admin --typescript --tailwind --eslint
```

Here is the prompt in the terminal, you can use arrow keys to choose `Yes` or `No` and press `[Enter]` to select the prompt:

```sh
npx create-next-app@latest ecommerce-admin --typescript --tailwind --eslint
Need to install the following packages:
  create-next-app@13.4.13
Ok to proceed? (y) y
√ Would you like to use `src/` directory? ... [No] / Yes
√ Would you like to use App Router? (recommended) ... No / [Yes]
√ Would you like to customize the default import alias? ... [No] / Yes
Creating a new Next.js app in C:\Users\...\complete-ecommerce-store\ecommerce-admin.
```

Make sure to select Yes to `App Router` which heavily relies on server components. The alternative is `Pages Router`, the old way.

For customizing `import alias`, I select No to default it to the `@` sign. We'll come back to this when we do imports in the code.

The packages have been installed and the app is ready.

Let's change directory into the `/ecommerce-admin`, then proceed with step 2 of the installation.

```sh
cd .\ecommerce-admin\
```

Then initialize `shadcn-ui` to setup project:

```sh
npx shadcn-ui@latest init
```

Here are the prompts, I just pressed Enter to all the default options:

```sh
npx shadcn-ui@latest init                                                                                                          
Need to install the following packages:
  shadcn-ui@0.3.0
Ok to proceed? (y) y
√ Would you like to use TypeScript (recommended)? ... no / [yes]
√ Which style would you like to use? » [Default]
√ Which color would you like to use as base color? » [Slate]
√ Where is your global CSS file? ... [app/globals.css]
√ Would you like to use CSS variables for colors? ... no / [yes]
√ Where is your tailwind.config.js located? ... [tailwind.config.js]
√ Configure the import alias for components: ... [@/components]
√ Configure the import alias for utils: ... [@/lib/utils]
√ Are you using React Server Components? ... no / [yes]
√ Write configuration to components.json. Proceed? ... [yes]
```

## Run the project

Finally we can run the project with the command `npm run dev`. In the terminal:

```sh
npm run dev
```

Now the project should be visible at this URL: `http://localhost:3000`, so open this up in the browser.

And to shut-down the application we can press `[Ctrl + C]` in the terminal. Since we are making big changes, its a good idea to do so now as this may interfere with hot reloading or Next.js feature called *Fast Refresh*.

- Hot reloading is a feature that allows you to see the changes you make to your code in real-time without having to refresh the page. In Next.js, this feature is called Fast Refresh and it's enabled by default in all Next.js applications on 9.4 or newer. With Fast Refresh enabled, most edits should be visible within a second, without losing component state.

## Cleaning Up the Project

Now in Visual Studio Code, let's open up `/app/page.tsx` and go ahead and remove all the boilerplate code within the `Home` component. Also remove the import for `Image`.`

So all we are left with is something like this:

```js
export default function Home() {
  return (
    <div>Admin Dashboard</div>
  )
}
```

Let's also change the `MetaData` in `layout.tsx`, we can just modify the `title` and `description`.

```ts
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard for e-commerce store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

## Add height configuration in `globals.css`

The `globals.css` file contains all the styling for our app. All the code within has been modified by `shadcn-ui`. The only addition we want to add is adding a height configuration to nearly all our content.

Right below the `@tailwind` directives, add this:

```css
html,
body,
:root {
  height: 100%;
}
```

## Organize `/app` folder via Route Groups

Going to use [Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups) to restructure and organize our app folder. I do not want the `page.tsx` to be at the root of the `/app` folder.

This allows us to **organize routes without affecting thhe URL path.** In Next.js, every folder you create inside the `/pages` folder (if using **Pages Router**) or inside the `/app` folder (if using **App Router**), is a route for itself.

> In the `app` directory, nested folders are normally mapped to URL paths. However, you can mark a folder as a **Route Group** to prevent the folder from being included in the route's URL path.

We want to organize things inside folders but don't necessarily want to create the routes. This can be done through *Route Grouping*.

> This allows you to organize your route segments and project files into logical groups without affecting the URL path structure.

How?

#### Convention

A route group can be created by wrapping a folder's name in parenthesis: `(folderName)`

#### Create the Route Group

Let's create a folder named `(root)` inside `/app`.

This folder `/(root)` will not affect the URL, meaning it won't be `/root`, it is simply a normal organization folder. Each Route Group may have the same URL hierarchy, but each group can have its own personalized layout in a `layout.js` file.

Let's create the `page.tsx` file inside `/(root)`, we can just copy the `page.tsx` found in `/app` since the structure is the same and we will modify the contents later.

We can now just remove `/app/page.tsx` from the `/app` folder. This will not change how the app works and we can still run the project again withh `npm run dev` and we can see the `/app/(root)/page.tsx` render.

Despite the folder `/(root)` existing, it does not change the URL `http://localhost:3000`.

# shadcn/ui

Let's add our first component from `shadcn/ui`, let's try a [Button](https://ui.shadcn.com/docs/components/button).

### Using the Command Line Interface (CLI)

In the terminal, make sure to be in the right directory (usually where the `package.json` is located). In this case, `cd` into `/ecommerce-admin` folder.

```sh
cd /ecommerce-admin
```

Then let's run the command:

```sh
npx shadcn-ui@latest add button
```

which will prompt us whether we wish to proceed so type `y` and it will begin the installation.

This made changes to the following files:

- `/ecommerce-admin/components/ui/button.tsx`
- `/ecommerce-admin/package-lock.json`
- `/ecommerce-admin/package.json`

In short, it created our `/components` folder, which contains another folder `/ui` with our `button.tsx` component nested within.

Then it updated our `package.json` file, adding one more dependency:

```json
  "dependencies": {
    "@radix-ui/react-slot": "^1.0.2",
```

Inside the `button.tsx`, we can see the CSS styles in Tailwind CSS. It is fully accessible and customizable to us.

We can modify the `button` component in any way we want. e.g., we can modify its `size` property by changing its height number in `h-10` to something like `h-20`. Or modify the padding.

This is a high quality component that is built for us compared to building our own from scratch. A form of not [re-inventing the wheel](https://en.wikipedia.org/wiki/Reinventing_the_wheel).

The phrase "reinventing the wheel" is an idiom that means to attempt to duplicate a basic method that has already been created or optimized by others. The inspiration for this metaphor is that the wheel is an ancient archetype of human ingenuity (one so profound that it continues to underlie much of modern technology). 

**As it has already been invented and is not considered to have any inherent flaws, an attempt to reinvent it *would add no value to it and be a waste of time, diverting the investigator's resources from possibly more worthy goals.***

However, some people argue that reinventing the wheel is often necessary in order to work around software licensing incompatibilities or around technical and policy limitations present in parts or modules provided by third parties. 

It depends on the context, but for our case this will divert our resources so using `shadcn/ui` is a boon.

### Using the component

To use our `Button` component, we can consult the [docs](https://ui.shadcn.com/docs/components/button).

1. Let's import:

```js
import { Button } from "@/components/ui/button"
```

2. Then use it in our code:

```js
<Button variant="outline">Button</Button>
```

So in `page.tsx`:

```js
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="">
      <div className="p-4">
        Admin Dashboard

        <Button>Click Me!</Button>

      </div>
    </main>
  )
}
```

In VSCode, we can jump straight to step 2 and just use the `Button` component as it auto-completes the import. So by the time you type out `<Button`, right at the `n` we can press `[Enter]` to auto-import the component at the top of the file.

Interesting to note is that the `Button` component from `shadcn/ui` is a *Named Export* rather than a [Default Export](https://javascript.info/import-export#export-default). This means we have to destructure the `Button` in the `import`:

```js
import { Button } from "@/components/ui/button"
```

### Styling the component

Now we can add class styles to the `Button` component.

- Let's say we want it a bit smaller:

```js
<Button size="sm">Click Me!</Button>
```

- Or want to make it an icon?

```js
<Button size="icon">Click Me!</Button>
```

- Or just stick with the default:

```js
<Button size="default">Click Me!</Button>
```

We can also pass in the `variant` prop and give it different `variants`. Let's try `destructive`

```js
<Button size="default" variant="destructive">Click Me!</Button>
```

This looks like a button for deletion.

This is great for our projects in that we have all the components we are using inside the project, under `/components` inside our structure rather than having it inside a random `npm` library inside our `node_modules` as a dependency and have no or little access to it.

This completes our setup for the Next.js 13 project for the admin dashboard. Next let's implement our authentication.

# Authentication

For now we start with the planning of our authentication for admin dashboard.

Let's use [Clerk](https://clerk.com/) user authentication and management platform to handle our authentication.

Create an account @

https://clerk.com/

Then we can build our `<SignIn />` component. Once you've signed in after signing up, we arrive at the dashboard of the page.

Inside the `Application name` input box, let's add the name `ecommerce-admin`.

We can then add the many ways the users can sign-in to our app, I have email address & Google checked as ways to sign-in. There are Phone number, Username, Facebook, and Apple (and more) as choices whhich are off by default.

We can then click `[Create Application]`.

The next screen shows "Your <SignIn/> is ready!

Then it shows "Quickstarts", allowing you to choose frameworks we wish to use. We click Next.js, usually it is there by default.

We can see that it gives us the API Keys with `.env.local` file ready.

## Create `.env` file

Create the environment file named `.env` under `/ecommerce-admin`. This file contains *sensitive* information.

By default `.env` file will be commited to our project, **which is not what we want**.

So we must add this file to `.gitignore`. So this is what we add:

```js
# local env files
.env*.local
.env
```

Now `.env` won't be commited to our git repository.

Next we can now just go into `.env` file and go to the Clerk dashboard and copy the API Keys. It should contain the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.

Copy it from the dashboard and paste it in `.env`.

## Clerk Documentation

Now after pasting the `.env` variables, we can click the [Continue in Docs](https://clerk.com/docs/nextjs/get-started-with-nextjs) which is the Clerk Docs in Next.js.

1. Install Clerk in Next.js

The first step is to install Clerk in our next project:

```sh
npm install @clerk/nextjs
```

2. Set Environment Keys

We already did this step when we passed in our API keys from Clerk dashboard into `.env` file.

3. Mount Clerk Provider

Clerk provides both configurations for App Router and Pages. 
  - 3rd party libraries supporting the latest App Router in Next.js 13? That's a plus in my book.

Let's add the `<ClerkProvider>` component to wrap our Next.js application.

- navigate to `/app/layout.tsx`
- Import `ClerkProvider` from the Clerk package
- Wrap the entire app (The JSX element that we return from `RootLayout`) with `<ClerkProvider> ... </ClerkProvider>`

So in `layout.tsx`, we can provide active session and user context to Clerk's hooks and other components. The `<ClerkProvider>` enables the [context](https://react.dev/learn/passing-data-deeply-with-context) to be accessible anywhere within the app.

```tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard for e-commerce store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

## Add `auth` middleware

What's middleware?

From [The Odin Project - Middleware](https://www.theodinproject.com/lessons/nodejs-express-101#middleware)

> A middleware is just a plain JavaScript function that Express will call for you between the time it receives a network request and the time it fires off a response (i.e. it’s a function that sits in the middle).

Middleware in Next.js is a piece of code that allows you to perform actions before a request is completed and modify the response accordingly. It bridges the incoming request and your application, providing flexibility and control over the request/response flow. Middleware can modify request headers, response headers, and send responses. You can use middleware for a variety of purposes such as adding authentication to pages, dynamically loading data, or even handling errors

As we proceed to [Clerk docs - Protect your Application](https://clerk.com/docs/nextjs/get-started-with-nextjs#protect-your-application) we are tasked in adding a middleware.

Step-by-Step:

1. Navigate to the root of your project: `/ecommerce-admin`
2. Create a new file called `middleware.ts`

Copy the code from Clerk docs and paste it into `middleware.ts`

```ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

Here is the comment associated with the code sample above:

```ts
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
```

It first imports an authentication middleware from Clerk. Then `export default` `authMiddleWare`. Finally, it has an `config` which contains a specific config needed for Clerk authentication (to my understanding).

## Create the *Sign-Up* and *Sign-In* Pages

The next step in the [Clerk docs - Build Sign-In & Sign-Up pages](https://clerk.com/docs/nextjs/get-started-with-nextjs#build-your-own-sign-in-and-sign-up-pages).

Before we do so, let's create a Route Group named `(auth)`, and within it should be another folder named `(routes)`.

So navigate to `/ecommerce-admin/app` folder, then create `/(auth)` folder. Then create `/(routes)` inside of it. Later on the plan is to create a `layout.tsx` for `/(auth)`.

### The *Sign-Up* page

Now finally inside of `/(routes)`, we need to follow the exact structure of creating a Sign-Up page:

```tsx
// app/sign-up/[[...sign-up]]/page.tsx

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp />;
}
```

- So inside `/(routes)` create another folder, this time a route, named `sign-up`.
- Inside of `/sign-up` we create *another* folder named `[[...sign-up]]`

To re-iterate, that folder is named with double square brackets `[[ ]]`, then a spread operator `...` and finally `sign-up`.

- This is the file path so far: `\ecommerce-admin\app\(auth)\(routes)\sign-up\[[...sign-up]]`

This is another convention in Next.js 13, which allows Clerk all the routes it needs to handle the authentication in our project. This must be exactly how the documentation describes it.

FINALLY we can make the file `page.tsx` inside of that folder.

The file path name: `"...\ecommerce-admin\app\(auth)\(routes)\sign-up\[[...sign-up]]\page.tsx"`

Now paste the Sign-Up page component:

```tsx
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp />;
}
```

### The *Sign-In* page

The intended path for sign in page: `app/sign-in/[[...sign-in]]/page.tsx`

Our file path: `"...\ecommerce-admin\app\(auth)\(routes)\sign-in\[[...sign-in]]\page.tsx"`

```tsx
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn />;
}
```

---

#### Side-Note: [Ctrl] + [Shift] + [P] then type "reload window" in VSCode to refresh it without needing to shut it down

---

## Add environment variables

[Clerk Next.js - Update your environment variables](https://clerk.com/docs/nextjs/get-started-with-nextjs#update-your-environment-variables), add the `signIn`, `signUp` and `afterSignUp`, `afterSignIn` paths:

```ts
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

These values control the behavior of the components when you sign in or sign up and when you click on the respective links at the bottom of each component.

- These paths refer to the routes we made where the Sign-In and Sign-Up pages are located.

## Modifying the Sign-Up page

**At this stage of the project, we should be re-directed to the Sign-In page**

Run `npm run dev` in the shell.

There is an issue, the sign-up page isn't centered. There are two ways I can solve this:

1. Go to `page.tsx` where sign-up page is located, and return a JSX element wrapped in a `div` that contains the utility class of `flex`

2. Setup the `layout.tsx` for the Route Group

I am going with number 2 as it reflects all of the routes inside of that group.

So inside of the `/(auth)` directory, create `layout.tsx`.

Inside:

```tsx
import React from 'react'

export default function AuthLayout({
  children
} : {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}
    </div>
  )
}
```

We create an `AuthLayout` component which takes in `children` as a prop.

In TypeScript, we have to specify the type of the parameter so here we set the type of `children` as `React.ReactNode`. Finally, we return a `div` that wraps the `children`.

We can now add any style to it, which will reflect all the routes inside of our folder `(auth)`.

Let's give it the Tailwind CSS utility classes of: `flex items-center justify-center h-full`

```tsx
export default function AuthLayout({
  children
} : {
  children: React.ReactNode
}) {
  return (
    <div className='flex items-center justify-center h-full'>
      {children}
    </div>
  )
}
```

This will fully center our Sign-Up page, along with any of the routes within (this includes the sign-in page).

## Working on the Set-Up page

In the `(root)` folder, we have a `page.tsx` that returns a `Home` component.

```tsx
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        Admin Dashboard
        <Button>Click Me!</Button>
      </div>
    </main>
  )
}
```

Let's change this to return a `SetupPage`, and remove the button. All it should return is some text that states that it is a protected route. This is because this page is what shows up after being logged-in using Clerk.

---

#### Important: to avoid the error: `You cannot have two parallel pages that resolve to the same path. Please check /page and /(root)/page.` make sure you have removed the `page.tsx` at the root of the `/app` folder

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        Admin Dashboard
      </div>
    </main>
  )
}
```

Make sure to either move the `page.tsx` to the `/(root)` folder or delete it and make the `page.tsx` file in the `(root)` and place the code for the `SetupPage` inside.

After you deleted the `page.tsx` at the root of the `/app` folder, go ahead and CTRL + C the terminal and restart next with `npm run dev`. Go to `http://localhost:3000` and you should see the page properly render.

---

Then let's add the `<UserButton />` component from Clerk, this allows the user to manage account information and log out, thus completing the full authentication circle.

[Clerk - Embed the `<UserButton />`](https://clerk.com/docs/nextjs/get-started-with-nextjs#embed-the-user-button).

Inside the `SetupPage`, we return a `div` containing this line of code:

```tsx
<UserButton afterSignOutUrl="/"/>
```

The `afterSignOutUrl` prop is equal to the home route, if this is not specified then it takes the user to the Clerk page.

```tsx
import { UserButton } from "@clerk/nextjs";

export default function SetupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="p=8">
        <UserButton afterSignOutUrl="/"/>
      </div>
    </main>
  )
}
```

You can now see the User profile Icon, where they can log in and manage their account on the page.

# Admin Dashboard - Project Setup

Now that the user authentication is handled by Clerk, we move on to make the first Modal component of the Admin Dashboard.

## First Modal Component - Create store

What does this Modal component do?

- Creates a new store
- Triggers when logging in to Admin Dashboard and there is no store created
- Creates additional stores

It should have a 

- input box that allows us to name the store
- a cancel button for the modal (and cancelling the creation of a store)
- and finally a continue button to create the store and leads to the next window

I am going to use the [Dialog - shadcn/ui](https://ui.shadcn.com/docs/components/dialog) component, which is "A window overlaid on either the primary window or another dialog window, rendering the content underneath inert."

Install it (via npm):

```sh
npx shadcn-ui@latest add dialog
```

### Custom-made Modal component

Now in `/components/ui` folder, let's add another component named `modal.tsx`.

The `modal` will standardize the use of the `Dialog`.

```tsx
"use client";

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}
```

- `"use client"` directive is needed because it will have interactivity
- We create the `interface` named `ModalProps`
- It will have `title`, `description` and `isOpen`
- It will have an `onClose` function
- It will have an [optional property](https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties) `children` which will be of type `React.ReactNode`

Now let's export our `Modal`:

```tsx
"use client";

import { Dialog } from "./dialog";

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children
}) => {
  
  const onChange = (open: boolean) => {
    if(!open) {
      onClose();
    }
  };

  return(
    <Dialog open={isOpen} onOpenChange={onChange}>
      
    </Dialog>
  )

}
```

- Make sure to `import` `Dialog` FROM our `/components` folder which is `./dialog` and not from `radix/ui` which is the underlying library that `shadcn/ui` uses. `radix` does not contain the styles that `shadcn/ui` has.

- We export the Modal component with the its props
- We give Modal component a method which detects the state change of when it is open
- Finally, we return the `<Dialog>` component containing the props `open` and `onOpenChange`

Let's continue working on the `Dialog`

```tsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog";

// ...
  return(
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
```

Again, please make sure the imports are from `"./dialog"` and *not* `"@radix-ui/react-dialog"`, especially when using VSCode's auto-import.

Let's make that import a bit cleaner:

```tsx
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
```

Notice: The usage of the alias `from "@/components/ui/dialog";` which is the same thing as `from "./dialog";`

It is a good practice to use [Module Path Aliases](https://nextjs.org/docs/app/building-your-application/configuring/absolute-imports-and-module-aliases) in NextJS.

### Using the Modal component

Back in `(root)`, in `page.tsx` file let's change the `<UserButton />` component to a `<Modal />`.
Add the `"use client"` directive, then import the `Modal`.


```tsx
"use client";

import { Modal } from "@/components/ui/modal";

export default function SetupPage() {
  return (
    <div className='p-4'>
      <Modal title="Title" description="test desc" isOpen={true} onClose={() => {}}>
        Children
      </Modal>
    </div>
  )
}
```

`zustand` will be used to control whether the Modal is open or not.

## Global State Management using zustand

We will be using [zustand](https://www.npmjs.com/package/zustand) for global state management.

In the shell:

```sh
npm i zustand
```

- Now create a folder named `hooks` in `/ecommerce-admin`.
- Inside we create a file named `use-store-modal.tsx`
- Create a store from zustand
- Create our hook with primitives, obkects, functions. Update state through `set` function

```tsx
import { create } from "zustand";

interface useStoreModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useStoreModal = create<useStoreModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
```

We have `isOpen` state, and two functions that return void.

When creating the store, we hhave the two functions set the state value.

### Creating re-usable modals components

Create a folder named `modals` under `/components`. Then create a file named `StoreModal.tsx`, with some template for a functional component.

```tsx
"use client";

import React from 'react';

export default function StoreModal() {
  return (
    <div>store-modal</div>
  )
}
```

Next import the `Modal` and fill in the props:

```tsx
import { Modal } from "../ui/modal";

export default function StoreModal() {
  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={false}
      onClose={() => {}}
    >
      Create Store Modal
    </Modal>
  )
}
```

Now import the hook and bind our components:

```tsx
import { useStoreModal } from '@/hooks/use-store-modal';

export default function StoreModal() {
  const storeModal = useStoreModal();
  // ...
```

Now that we have the `storeModal`, we can use its values to control the `isOpen` and `onClose` props.

- set `isOpen` to `storeModal.isOpen`
- set `onClose` to `storeModal.onClose`
- Alias module path for `../ui/modal` to `@/components/ui/modal` for consistency

```tsx
"use client";

import React from 'react';
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from '@/hooks/use-store-modal';

export default function StoreModal() {
  const storeModal = useStoreModal();

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Create Store Modal
    </Modal>
  )
}
```

### Modal Provider

I want to make Modal available throughout the application, to be triggered regardless of where it is (e.g., products page, navbar, etc.).

To do that we need to create a `provider`. 

A provider is a way to pass data down the component tree without having to pass props down manually at every level. Providers are used in conjunction with the [Context API](https://react.dev/reference/react/useContext). The Context API is a way to share data between components without having to pass props down manually at every level. Providers are used in conjunction with the Context API. You can use providers to pass data down the component tree and make it available to all child components that need it.

Let's create a folder named `/providers` at the root of our project.

Inside, we create a file named `modal-provider.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";

export const ModalProvider = () => {
  
}
```

Let's setup the hooks:

```tsx
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
}
```

Notice that we use:

- [useState](https://react.dev/reference/react/useState)
- [useEffect](https://react.dev/reference/react/useEffect)

We create a [state variable](https://react.dev/learn/state-a-components-memory) `isMounted` along with its set function `setIsMounted`. The initial state is `false`.

Next we have a `useEffect` lifecycle, with the setup containing `setIsMounted(true)` and with an empty dependency array.

Right after the `useEffect`, we have a conditional check for `isMounted` which returns `null` in the case it is not mounted.

```tsx
  if(!isMounted) {
    return null;
  }
```

#### Modal Provider - Explained

Let's take a step back and analyze what's going on here

```tsx
"use client";

import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if(!isMounted) {
    return null;
  }
}
```

- We will be using `ModalProvider` inside the `/app/layout.tsx`
- However, `layout.tsx` is a [Server Component](https://nextjs.org/docs/getting-started/react-essentials#server-components) which means that we cannot simply add a [Client Component](https://nextjs.org/docs/getting-started/react-essentials#client-components) to it
- We have to ensure that there will not be any [Hydration Errors](https://dev.to/olanetsoft/how-to-fix-react-hydration-error-in-nextjs-practical-guide-cjh), especially with Modals

##### What is a Hydration Error?

The React hydration error in Next.js occurs when the initial UI does not match what was rendered on the server. This error can be caused by inconsistencies between server and client-rendered markup and mismatched component states. When the markup generated on the server side differs from what is generated on the client side, or when the state of a component on the server side doesn’t match the state on the client side, the application can throw errors or behave unexpectedly.

- There are a lot of ways you can trigger a Modal, but that can cause desynchronization between server-side rendering and client-side rendering
- e.g., The server will not have any Modal open, but the client will. This will throw an Hydration Error

The current `Modal Provider`, which has a `useEffect` React Hook that lets you [synchronize a component with an external system.](https://react.dev/learn/synchronizing-with-effects) 

This ensures that until this life-cycle has run, which is only something that can happen in the client component, it will return `null` otherwise.

```tsx
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if(!isMounted) {
    return null;
  }
```

In other words, if it has **not mounted** and it is still in server-side rendering then in that case I will `return null` so that a hydration error will not be possible from happening.

Again, this is a precaution to the Hydration Error. 

**We will not render any Modals in server-side.**

So what if we are on the client-side?

- Import our `StoreModal` from our `/components`
- For readability, we separate the global imports and local imports
- Then let's render our `StoreModal`, wrapped in a [Fragment](https://react.dev/reference/react/Fragment).

```tsx
"use client";

// global imports
import { useEffect, useState } from "react";

// local imports
import StoreModal from "@/components/modals/StoreModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if(!isMounted) {
    return null;
  }

  return(
    <>
      <StoreModal />
    </>
  )
}
```

---

### **ISSUE** Next.Js module not found `lucide-react`

***Import bug in Next.js (v13.4.13)***

[GitHub - Lucide-react Next.js Mapping Issue](https://github.com/lucide-icons/lucide/issues/1482#issuecomment-1672744695), there is a mapping issue regarding the current release of Next.js that I am using as of now (8-15-2023).

This will be resolved in the next release or we can downgrade to `lucide-react version 0.263.1` using:

```sh
pnpm add lucide-react@0.263.1
```

Here is the issue in the terminal when trying to run `npm run dev`

```sh
Module not found: Can't resolve 'C:\Users\...\ecommerce-admin\node_modules\lucide-react\dist\cjs\icons\x'

https://nextjs.org/docs/messages/module-not-found

Import trace for requested module:
./components/ui/dialog.tsx
./components/ui/modal.tsx
./components/modals/StoreModal.tsx
./providers/modal-provider.tsx
```

### **SOLUTION** Update Next.js v13.4.13 to Next.js v13.4.19

If you want to exclusively just update Next.js 13:

```sh
npm i next@latest
```

To **Update core packages**:

```sh
npm i next@latest react@latest react-dom@latest eslint-config-next@latest
```

---

### Use Modal Provider

Back in `/app`, in the file `layout.tsx`:

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

Let's render the `ModalProvider` right before the `children` in `layout.tsx`

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
```

Now let's try to trigger the Modal in our root page, so in `/(root)/page.tsx`:

```tsx
"use client";

import { Modal } from "@/components/ui/modal";

export default function SetupPage() {
  return (
    <div className='p-4'>
      <Modal title="Title" description="test desc" isOpen={true} onClose={() => {}}>
        Children
      </Modal>
    </div>
  )
}
```

Remove the test Modal:

```tsx
export default function SetupPage() {
  return (
    <div className='p-4'>
      Root Page
    </div>
  )
}
```

Write `useState` to trigger our `ModalProvider`. Extract `onOpen` function and `isOpen` state from `zustand`.

To do that we need to import our hook `useStoreModal`:

```tsx
import { useStoreModal } from "@/hooks/use-store-modal";

export default function SetupPage() {
  const storeModal = useStoreModal();
```

#### Issue: Currently `storeModal` works fine, but does not work well when used inside `useEffect`

According to [zustand docs](https://www.npmjs.com/package/zustand), when initializing the store here we are fetching everything with this line:

```ts
  const storeModal = useStoreModal();
```

> ... but bear in mind that it will cause the component to update on every state change!

##### **Solution**: Select multiple state slices

Back in the docs this is the example whhen selecting multiple state slices:

> It detects changes with strict-equality (old === new) by default, this is efficient for atomic state picks.

```tsx
const nuts = useBearStore((state) => state.nuts)
const honey = useBearStore((state) => state.honey)
```

So in our case, we want to directly import `onOpen` and `isOpen` from the `state`

```tsx
import { useStoreModal } from "@/hooks/use-store-modal";

export default function SetupPage() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);
  // ...
}
```

Now we can have this work with `useEffect`:
  - We check for `isOpen`, if it is `false` then we invoke `onOpen()` which sets the `isOpen` state variable to `true`
  - Add `isOpen` state variable and `onOpen` function in the dependency array

```tsx
import { useEffect } from "react";
// ...

  useEffect(() => {
    if(!isOpen){
      onOpen();
    }
  }, [isOpen, onOpen]);
```

Now this should trigger our *Create Store Modal*, which should be rendered on screen. 

#### Modal Behavior 

When we try to close the Modal, we can't. This is the behavior we want as this Modal should hold the *Create Store Form*, which will re-direct the user once we create our first store.

The Navigation bar which also uses a Modal won't have this exact behavior so it can be closed.

But when Modal is viewed from `(root)` organizational file, that means we do not have a store created yet. So user should not be allowed to go anywhere or close the current Modal until a store is created.

#### Globally Accessible Modal

Making the Modal globally accessible is also the goal here, as it now lies inside the `app`'s `layout.tsx` inside `ModalProvider` rather than having to import the `Modal` componenet from `/components` and trying to render it with all its props inside the page.

Another benefit is that we can trigger the Modal inside the root page, auth routes.

e.g., this is the old way:

```tsx
import { Modal } from "@/components/ui/modal";

const Page = () => {

  return (
    <div>
      <StoreModal isOpen />
    </div>
  )
}
```

Better way: 

```tsx
"use client";
// Global Imports
import { useEffect } from "react";

// Local Imports
import { useStoreModal } from "@/hooks/use-store-modal";

export default function SetupPage() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if(!isOpen){
      onOpen();
    }
  }, [isOpen, onOpen]);

  return (
    <div className='p-4'>
      Root Page
    </div>
  )
}
```

## Create Form - Create Store Form

Its time to create a form for Create Store function using `shadcn/ui`'s form element.

- [shadcn/ui - React Hook Form - Zod | docs](https://ui.shadcn.com/docs/components/form)
- The underlying packages used by `shadcn/ui`'s form element are `React Hook Form` and `Zod`

Well-designed HTML forms are:

- Well-structured and semantically correct.
- Easy to use and navigate (keyboard).
- Accessible with ARIA attributes and proper labels.
- Has support for client and server side validation.
- Well-styled and consistent with the rest of the application.

#### Installing `Form` component

**Command**

```sh
npx shadcn-ui@latest add form
```

Press y to continue the instllation.

#### Installing `Input` component

While we are still at the `shadcn/ui` docs, let's install `Input` component.

[Input Component](https://ui.shadcn.com/docs/components/input)

**Command**

```sh
npx shadcn-ui@latest add input
```

Now inside thhe `/ui` folder we have the newly added components:

- `form`
- `input`
- `label`

### Create a form schema

Let's go to our `/components/modals/StoreModal.tsx` file.

Here we want to define our form schema. Define the shape of your form using a [Zod schema](https://zod.dev/).

In the [shadcn/ui Form docs](https://ui.shadcn.com/docs/components/form) the example schema looks like this:

```tsx
"use client"

import Link from "next/link"
import * as z from "zod"

const formSchema = z.object({
  username: z.string().min(2).max(50),
})
```

Let's try to define the form schema through zod in our `StoreModal.tsx`:

```tsx
// Global Imports
import React from 'react';
import * as z from "zod";

// Local Imports
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from '@/hooks/use-store-modal';

const formSchema = z.object({
  name: z.string().min(1),
});

export default function StoreModal() {
```

So what we added before our `StoreModal`:

- `import * as z from "zod";`
- Create the *form schema* / *zod schema*

```tsx
const formSchema = z.object({
  name: z.string().min(1),
});
```

What this means is that *at least* 1 character is required to properly name our Store.

### Define a form

The next step is to define a **hook** for our form. 

Use the `useForm` hook from `react-hook-form` to create a form.

- First import the `useForm` hook, and place it with the global imports for organization
- Next, also `import { zodResolver } from "@hookform/resolvers/zod"`
- Check `package.json` if `"@hookform/resolvers": "^3.2.0",` is in `dependencies`, if so then `shadcn/ui` has installed it and you can continue. Otherwise, you need to install the package.

```tsx
// Global Imports
// ...
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
```

Now use the `useForm` hook inside `StoreModal` to create a form:

```tsx
// ...
export default function StoreModal() {
  const storeModal = useStoreModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  // ...
```

#### Define a submit handler

Create the `onSubmit` function, which is going to be triggered in our form. For now it will just log values, and the implementation will be made later.

```tsx
  // Define a submit handler
  function onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // TODO: Create Store
  }
```

Currently, `onSubmit` will throw a few errors:
- '`onSubmit`', which lacks return-type annotation, implicitly has an 'any' return type.ts(7010)
- Parsing error: '(' expected.eslint
- `(local function) onSubmit(): any`

To temporarily fix this, change `function` to `const`

### Build your form

We are now on step 3 of the [docs](https://ui.shadcn.com/docs/components/form).

Inside the `<Modal> ... </Modal>` component which we `return`, let's actually render the form.

- Import `Form` with module aliases for style consistency

```tsx
import { Form } from '@/components/ui/form';
```

- Then replace the "Create Store Modal" text, with:

```tsx
  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="py-2 pb-4 space-y-4">
          <Form {...form}>

          </Form>
        </div>
      </div>
    </Modal>
  )
```

Notice that we spread out the values of `form` defined earlier from the hook:

```tsx
  // Define a form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })
```

Now inside the `<Form>` component, we can write the actual HTML element `<form>`. We give the `onSubmit` prop to the `form` element the `form.handleSubmit(onSubmit)`:

```tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>

  </form>
</Form>
```

The `handleSubmit` is going to use our `onSubmit` function to provide our values that are going to be defined inside our inputs.

#### Building the form inputs

Let's use the `<FormField>` component inside the `<form>`. It should be imported from `'@/components/ui/form'`.

```tsx
import { Form, FormField } from '@/components/ui/form';
```

Make sure that `<FormField />` has a self-closing tag, meaning it shouldn't be `<FormField> </FormField>`, as the error that the "Type children ..." is not a type. That's because `FormField` is a self-closing tag without children, so remove the `</FormField>` and close it (e.g., `<FormField />`).

Next this `<FormField>` will contain the following props:

- `control` which we get from `form.control`
- `name` a string name
- `render` which takes an arrow function that extracts `field` and returns/renders something

```tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (

      )}
    />

  </form>
</Form>
```

Before we implement the `render`'s function we need to import a few more components: 

- `FormItem`
- `FormLabel`
- `FormControl`

Then build up the form:

```tsx
<FormField
  control={form.control}
  name="name"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Name</FormLabel>
      <FormControl>
        
      </FormControl>
    </FormItem>
  )}
/>
```

Inside the `<FormControl>` we want to use an `<Input>` component, which we must import from `"@/components/ui/input"`.

- `<Input />` is a self-closing tag
- Give it a property of `placeholder`
- pass in the entire `field`, which should be spread out: `{...field}`

```tsx
<FormControl>
  <Input placeholder="text" {...field} />
</FormControl>
```

##### Exploring the `field` prop

So what does passing in the entire `{...field}` mean? 

Well if you work with inputs you know they take `onChange`, `value` prop, `onBlur` and `onFocus`. Usually these are written out ourselves. 

But because we spread out the `field` prop, which we can explore. In VSCode, we can press `[Ctrl] + Click` on the `field` variable in our code. We are led to a file named `controller.d.ts`, the relative path is "ecommerce-admin\node_modules\react-hook-form\dist\types\controller.d.ts".

Inside it we see this:

```tsx
export type ControllerProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
    render: ({ field, fieldState, formState, }: {
        field: ControllerRenderProps<TFieldValues, TName>;
        fieldState: ControllerFieldState;
        formState: UseFormStateReturn<TFieldValues>;
    }) => React.ReactElement;
} & UseControllerProps<TFieldValues, TName>;
```

Now `[Ctrl] + Click` on the `ControllerRenderProps` variable in the code, which will lead us to a location in the same file:

```tsx
export type ControllerRenderProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
    onChange: (...event: any[]) => void;
    onBlur: Noop;
    value: FieldPathValue<TFieldValues, TName>;
    name: TName;
    ref: RefCallBack;
};
```

We can see that the `field` prop has `onChange`, `onBlur`, `value`, `name`, and `ref`.

This means that when we spread out the `field` prop inside this `Input` component like so: 

```tsx
<FormControl>
  <Input placeholder="text" {...field} />
</FormControl>
```

We are now handling `onChange`, `onBlur`, `value`, `name`, and `ref` props from it. This is the behavior we want.

#### Back to building the `FormField`

With that our `render` function's general layout is set:

```tsx
<FormField
  control={form.control}
  name="name"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Name</FormLabel>
      <FormControl>
        <Input placeholder="text" {...field} />
      </FormControl>
    </FormItem>
  )}
/>
```

#### Button Container for "Cancel" and "Continue"

Next, still inside the HTML `<form>` but under the closing tag `/>` of the `<FormField />` we create a `<div>` for the Button Container for 2 button elements. 

Give it a style of `flex items-center justify-end` so I can have these elements at the right corner of the modal. For spacing it should have `pt-6 space-x-2` so the 2 elements are separated. Finally give it the `w-full` to take up the whole space it needs.

The elements inside will have 2 `Button`s which will have Cancel and Continue functionality.

```tsx
import { Button } from '@/components/ui/button';
// ...

<div className="w-full pt-6 space-x-2 flex items-center justify-end">
  <Button>Cancel</Button>
  <Button>Continue</Button>
</div>
```

#### Using `variant` on a `Button`

Let's give some props such as `variant` and `onClick` on the `Button`s to differentiate between them.

```tsx
<Button 
  variant="outline" 
  onClick={storeModal.onClose}
>
  Cancel
</Button>

<Button type="submit">Continue</Button>
```

- For the Cancel button, the `variant` is `outline`. We use the `storeModal` hook's `onClose` function to pass into its `onClick` prop

- Set Continue button's `type` to `"submit"`. We do not need an explicit `onClick` on this button because it is *inside* the `<form>` element. Once this button is clicked, it will trigger the `onSubmit` prop passed into the `<form>`:

```tsx
<form onSubmit={form.handleSubmit(onSubmit)}>
```

#### Adding Error message to the Form

After testing, let's say we have a missing input field to name the store. It should give an error message when this occurs. Back in the [shadcn/ui Form docs](https://ui.shadcn.com/docs/components/form) we will need to use a `FormMessage` component.

Under the `<FormControl>` add the `<FormMessage />` component.

```tsx
// ...
      <FormControl>
        <Input placeholder="text" {...field} />
      </FormControl>
      <FormMessage />
```

To test we can add "test" text inside the input field box of the Modal. We should now see in developer tools (i.e., press `[F12]` in Google Chrome) in the console we should see the object passed in to the `onSubmit` function:

```tsx
  // Define a submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    // TODO: Create Store
  }
```

We can see the text printed out in the console. This means that `values` are ready to be sent to the server, which can be added to the database.

*Optional*: we can add a `<FormDescription>` component to add in between our `<FormControl>` and `<FormMessage>` to describe what the input field is for. 

Example:
```tsx
<FormControl>
  <Input placeholder="shadcn" {...field} />
</FormControl>
<FormDescription>
  This is your public display name.
</FormDescription>
<FormMessage />
```

With that this is a fully working Zod Form validation.

## Prisma & PlanetScale

- [prisma](https://www.npmjs.com/package/prisma)
- [What is PlanetScale?](https://planetscale.com/docs/concepts/what-is-planetscale)

Let's install prisma as a *dev dependency*. To do that we need to add another argument to the `npm install` command: `-D`. 

[npm install docs](https://docs.npmjs.com/cli/v9/commands/npm-install?v=true) mentions that the we can control where packages are save with addtional flags:

- `-D`, `--save-dev`: Package will appear in your `devDependencies`.

Make sure to be in the correct directory: `/ecommerce-admin` in this case.

Install *prisma* as a dev dependency:

```sh
npm i -D prisma
```

### Prisma Client

After prisma is installed, we run another command to install [Prisma Client](https://www.npmjs.com/package/@prisma/client):

```sh
npm install @prisma/client
```

Prisma Client documentation:

- [Prisma Client - Set up](https://www.prisma.io/docs/concepts/components/prisma-client)

- [Prisma Client - CRUD](https://www.prisma.io/docs/concepts/components/prisma-client/crud)

- [Prisma Client - Select Fields](https://www.prisma.io/docs/concepts/components/prisma-client/select-fields)

- [Prisma Client - Relation Queries](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries)

- [Prisma Client - Filtering and Sorting](https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting)

### Create Prisma schema

Finally, we initialize prisma through this command:

```sh
npx prisma init
```

Output of the terminal:

```sh
✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.

More information in our documentation:
https://pris.ly/d/getting-started
```

This creates a `/prisma` folder, with a `schema.prisma` file inside.

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

- the `provider` db will be changed from `"postgresql"` to `"mysql"` later

We can also see that our `.env` file has a new change. It preserved our current environment variables and added a comment & variable `DATABASE_URL="..."`.

 - This URL will be changed to PlanetScale URL later.

### Create a lib for prisma database

We actually already have a `/lib` folder that was installed by `shadcn/ui`. Inside we currently have `utils.ts`:

```ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

We have a `cn` function that is used to merge our classnames in Tailwind.

Let's create a `prismadb.ts` file inside `/lib`. Inside:

```ts
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined
};

const prismadb = globalThis.prisma || new PrismaClient();
```

- We import `PrismaClient`
- `declare global` with `prisma` a type of `PrismaClient` or `undefined`
- `const prismadb = globalThis.prisma || new PrismaClient();` 
- Conditional statement will determine whether it should use `globalThis` or is it safe to initialize a `new PrismaClient`

```ts
const prismadb = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;
```

Why do we have to do this check? Well if we just simply create a `new` `PrismaClient` and exported it:

```ts
// Initialize new Prisma Client
const prismadb = new PrismaClient();
```

What happens in Next.js 13, and its hot reloading feature would initiate multiple prisma instances. This causing a warning and degradation of performance in your development.

Let's wrap it up by exporting our `prismadb`:

```ts
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined
};

const prismadb = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;
```

### Setup PlanetScale

[planetscale](https://planetscale.com/)

Head on over to the website. Go ahead and sign-in.

We are at a landing page named `app.planetscale.com/YOUR_USER_NAME`

We can click on `[See how PlanetScale works >]`, but we can go ahead and create our databse by clicking on the button / hyperlink in [Ready to `create`].

Set the `Database name` to `ecommerce-admin` change Plan Type to `Hobby`. Though you may have to put in your card as the message they give below is:

> Please add a credit or debit card to this organization

> In order to prevent fraud, PlanetScale requires a valid payment method to create databases. You will not be charged unless you create a Scaler or Scaler Pro database.

It should say that your database is successfully created. We have to wait until database is successfully initialized. Afterwards we get a prompt to "Ready to `connect to your database`?". Or the button `[Get connection strings]`.

It prompts us to create a new password. We can leave it exactly as it is and click `[Create password]`.

We are this modal with a title "Connection strings". Here there is a drop-down menu right next to `[Connect with]`, we should select Prisma.

It will give us :
- `.env` file which contains our `DATABASE_URL='...'`
- `schema.prisma` which contains what changes we need to make to this file.

1. Let's place our connection string `DATABASE_URL` inside our `.env` and replace the old one. 

2. Now update our provider in `schema.prisma`. Still inside the "Connecting to your database" window in planetscale, switch from the `.env` tab to `schema.prisma` tab.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  relationMode = "prisma"
}
```

### Adding a simplified model of our store to push to the database

Create a simplified store to attempt to push to the database to test our connection.

Using Prisma Client, we can consult the docs here on [Prisma Docs - Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client) and we can see how to create a sample `Prisma scehma file` with its one model.

So now in `schema.prisma` let's create our `model`:

```prisma
model Store {
  id        String    @id @default(uuid())
  name      String
  userId    String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

With this complete, we can try to run the command in the terminal:

```sh
npx prisma generate
```

Output:

```sh
npx prisma generate                                                                                                  
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma

✔ Generated Prisma Client (5.1.1 | library) to .\node_modules\@prisma\client in 75ms
You can now start using Prisma Client in your code. Reference: https://pris.ly/d/client

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

```

Nothing has been sent to the database yet but our `\node_modules\@prisma\client` has been updated.

#### Testing out the store - demonstrate what `npx prisma generate` does

Go into `/app`, in `layout.tsx`. Right before the `return` let's create an example store using Intellisense to auto-complete / auto-import:

```tsx
import prismadb from '@/lib/prismadb'
// ...

  const store = prismadb.store
```

We can now use `find()`, `delete()`, `update()` to our `prismadb.store`:

```ts
const store = prismadb.store.find(...)
```

- `npx prisma generate` added `store` to our `node_modules` so we can safely use it in our code with Intellisense.

Now we can remove these changes to our `layout.tsx` if all things are in working order.

#### Testing - Successfully setup the Database Connection String?

Let's test in the terminal:

```sh
npx prisma db push
```

Output:
```sh
npx prisma db push                                                                                                   
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
Datasource "db": MySQL database "ecommerce-admin" at "aws.connect.psdb.cloud"

Your database is now in sync with your Prisma schema. Done in 4.60s

✔ Generated Prisma Client (5.1.1 | library) to .\node_modules\@prisma\client in 52ms
```

We can head over to planetscale dashboard and refresh the page, and we can see that we have 1 Table.

We can click the table, which is a `Store` table:

```js
CREATE TABLE `Store` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
	`updatedAt` datetime(3) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;
```

#### Troubleshooting

- Check if `.env` file is correct, that you copied exactly the connection string for `DATABASE_URL`.

- Make sure your project does not have a `.env.local` file because prisma may not be able to read it

## API Routes

Now we are going to attempt to create a `Store` to push to our database, we need to create our API routes.

Inside the `/app` folder create a new folder named `api`, which is a reserved folder.

Inside of `/api`, we will create [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers). Let's create a folder inside of it named `/stores`, with a file named `route.ts`.

### Creating the stores POST route

Inside of the route we create a `async function POST` that is of type `Request`. Inside a `try..catch` where we log the error.

```ts
export async function POST(
  req: Request,
) {
  try {

  } catch (error){
    console.log('[STORES_POST]', error);
  }
}
```

- Let's make sure we return an error response after logging the error. Use `NextResponse`.
- Use Clerk to authenticate this `POST` route

```ts
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
) {
  try {
    // Use Clerk to authenticate POST route
    const { userId } = auth();

  } catch (error){
    console.log('[STORES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
```

With this we now have access to currently logged-in `userId` who is trying to create a new store using our API.

Check if we do not have `userId`, then we can send back an Unauthorized response

```ts
// Send back 401 Unauthorized if userId does not exist
if(!userId) {
  return new NextResponse("Unauthorized", { status: 401 });
}
```

Now extract the body:

```ts
// Extract the body
const body = await req.json();
```

Inside our body, confirm we have what we require in our store model. We can check our `schema.prisma` file for the `Store` model for that:

```prisma
// Create simplified model of our Store
model Store {
  id        String    @id @default(uuid())
  name      String
  userId    String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

We can see that the ones automatically assigned are:

- `id`,`createdAt`, and `updatedAt`

While we still need these fields:

- `name`, which is received from the *store modal*'s input
- `userId`, which is received from Clerk authentication

So we should check the conditions for when these are empty. Let's destructure `name` from body and check:

```ts
const body = await req.json();

const { name } = body;

if (!name) {
  return new NextResponse("Name is required", { status: 400 });
}
```

If the `name` field is not empty, then we can create our `store` with `prismadb.store.create()`.

We need to pass in an object which contains another object named `data`, with `name` and `userId` within:

```ts
// Create store with data passed in
const store = await prismadb.store.create({
  data: {
    name,
    userId
  }
});

// Send back response with the store
return NextResponse.json(store);
```

Our API for creating a store is now ready.

### Disable all our interactive elements when we are submitting our form.

Navigate to `/components/modals/StoreModal.tsx`, and let's add a state variable: `loading`.

This state variable will decide which elements will disabled once our form is loading.

```ts
  // Create loading state variable to disable interactive elements
  const [loading, setLoading] = useState(false);
```

So if `loading` is `true` then it should be passed on to the `disabled` prop.

What I want to disable while the form is loading are:

- `Input`
- Both Submit and Cancel `Button`s

When loading, I do not want user to access the `Input` or click Cancel or Submit.

```tsx
<Input 
  disabled={loading}
  placeholder="text" 
  {...field} 
/>

// ...

<Button
  disabled={loading}
  variant="outline"
  onClick={storeModal.onClose}
>
  Cancel
</Button>
<Button disabled={loading} type="submit">Continue</Button>
```

### Install `axios`

[axios](https://www.npmjs.com/package/axios)

`cd` into the base of the project and run the command to install `axios`, a promise based HTTP client for the browser and node.js:

```sh
npm i axios
```

Now we can try to implement the `onSubmit` handler. We try to set the state variable `loading` to `true` inside a `try`. Then log any error in the `catch`, and we want to make sure to set the `loading` variable `false`, so we use `finally` block.

```tsx
// Define a submit handler
const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
    setLoading(true);
  } catch(error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}
```

Now we can attempt to create a new store through our API. The API route in our app is `/app/api/stores/route.ts`. 

We do this with axios:

```tsx
import axios from "axios";
// ...

  // Define a submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      // Create store via our API
      const response = await axios.post('/api/stores', values);

      // Print out data
      console.log(response.data);
```

We use `axios` `post` into our API route to create a store: `'/api/stores'`, where we pass in `values` which we receive from our form.

The form:

```tsx
  // Define a form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })
```

Which has the `name`, which we can check the `route.ts` and the `name` field is exactly what we expect.

#### Testing our API post route

Now in our project @ `localhost:3000` we can put `test-store` inside the input of the Create-Store-Modal. We should have dev tools open to see the .

What we should see is that our interactive elements are disabled. Then in the console we have our created store, complete with the details of `createdAt`, `id`, `name`, `updatedAt`, & `userId`. 

This is the expected behavior we want.

### Error Handling

We want to find a better way to handle errors. Shut down project in terminal with Ctrl + C.

#### react-hot-toast

Install [react-hot-toast package](https://www.npmjs.com/package/react-hot-toast), this allows us to add beautiful notifications to React app.

```sh
npm i react-hot-toast
```

[react-hot-toast docs](https://react-hot-toast.com/docs)

My plan was to trigger the toast in the `catch` when the error pops up in the submit handler.

To use it we need to create a Toast provider and add it to our layout when using Next.js 13.

Navigate to `/providers` and create `toast-provider.tsx`. It will just return `Toaster` component, which itself is self-closing tag.

```tsx
"use client"

import { Toaster } from "react-hot-toast";

export const ToasterProvider = () => {
  return <Toaster />;
}
```

Now add `ToasterProvider` in our layouts:

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
```

Navigate to `/components/modals/StoreModal.tsx`, and when we are logging the error we can also display a toast notification with `toast.error('error msg')`. Likewise, we can also make a notification when store creation was successful with `toast.success('success msg')`.

```ts
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      // Create store via our API
      const response = await axios.post('/api/stores', values);

      // Print out data
      console.log(response.data);

      // Successful toast notifcation
      toast.success('Store successfully created!');

    } catch(error) {

      console.log(error);

      // Error toast notification
      toast.error('Something went wrong...');

    } finally {
      setLoading(false);
    }
  }
```

#### Planning - What's next?

Where do we go from here? We haven't even made the dashboard yet!

We created the foundation - crucial elements of our project - that we will re-use to help shape our project.

So far we are now able to **Create** a store, which is then saved in the database.

Next, we are going to use the `response` `id` to re-route/re-direct to a new Route group named `dashboard`. 

We can slowly start to implement our nav bar that loads all the stores we just created. This allows us to **Read** our store data.

This dashboard will also have the "settings" form where we can either **Update** and/or **Delete** a store.

This will complete are [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) app for the Admin dashboard where the user can control their ecommerce store(s).

# Admin Dashboard

Create a route in app folder named `(dashboard)/[storeId]/layout.tsx`.

So we know that `(dashboard)` is a route group. So what is `[storeId]` in square brackets?

`[storeId]` is what is known as a [Dynamic Route](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes) which creates a route from dynamic data, when we don't know the exact segment names ahead of time.

In other words, this particular route needs to have a `storeId`.

So our `layout.tsx`, is going to accept `children` and `params`.

- `children` is type `React.ReactNode`
- `params` will contain our `storeId`. We expect an object that contains `storeId`, a type of string.

```tsx
// Global Imports
import React from 'react';

export default async function DashboardLayout({
  children,
  params
} : {
  children: React.ReactNode;
  params: { storeId: string }
}) {

  return (
    <div>layout</div>
  )
}
```

WE want to check if the the user is logged-in. We authenticate with Clerk and get a `userId`.

Then check if `userId` does not exist, which we then redirect to the Sign-In page. But if we do have `userId`, then we can fetch the store to see if it exists.

```tsx
// Global Imports
import { redirect } from "next/navigation";
import React from 'react';

// Local Imports
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

export default async function DashboardLayout({
  children,
  params
} : {
  children: React.ReactNode;
  params: { storeId: string }
}) {
  // Check if user is logged-in
  // Authenticate userId with Clerk
  const { userId } = auth();

  // If userId does not exist, redirect to sign-in
  if(!userId) {
    redirect('/sign-in');
  }

  // If user IS logged-in, then fetch the store
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  });

  // Check if store does not exist, redirect to home-page
  if (!store) {
    redirect('/');
  }

  return (
    <div>
      <nav></nav>
      {children}
    </div>
  )
}
```

Inside `[storeId]`, create a new Route group and a file: `(routes)/page.tsx`.

```tsx
import React from 'react';

export default function DashboardPage() {
  return (
    <div>This is a Dashboard</div>
  )
}
```

So far the `Dashboard` file structure:

- (dashboard)
  |- [storeId]
    |- layout.tsx
    |- (routes)
      |- page.tsx

### Create the `(root)` layout

Next modify the layout of the `(root)`, which we have to make first: `layout.tsx`

```tsx
import React from 'react';

export default async function SetupLayout({
  children
}: {
  children: React.ReactNode;
}) {
  
  
  return (
    <div>layout</div>
  )
}
```

- It has `children`, a `React.ReactNode` as params

Next we extract `userId` with Clerk's `auth()`, and redirect to sign-in page if it doesn't exist.

```tsx
  // Check if user is logged-in
  // Authenticate userId with Clerk
  const { userId } = auth();

  // If userId does not exist, redirect to sign-in
  if(!userId) {
    redirect('/sign-in');
  }
```

So now we need to check the first active store our user has. In root layout, we do not have a `storeId` so there is no specific store we need to load. WE just need to attempt to load the first store. 

That is how we are going to check whether we re-direct the user to `(dashboard)` routes OR keep user inside the `(root)` and show the Modal to create the first store.

```tsx
  // Fetch the first active store user has in database
  const store = await prismadb.store.findFirst({
    where: {
      userId
    }
  });

  // If store exists, redirect to dashboard's [storeId] route
  if (store) {
    redirect(`/${store.id}`);
  }

  // Just render out children if not redirected
  return (
    <>
      {children}
    </>
  )
```

This redirects to the `(dashboard)`'s `[storeId]` route, inside we can see in the `layout.tsx`

```tsx
  // If user IS logged-in, then fetch the store
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  });

  // Check if store does not exist, redirect to home-page
  if (!store) {
    redirect('/');
  }

  return (
    <div>
      <nav>Navbar</nav>
      {children}
    </div>
  )
```

It confirms again that `storeId` exists in combination to the currently logged-in user. 

If it doesn't exist then it will return to the root or home page.

If it does exist then it is going to render the `Navbar` and the `children`.

### Organizing the project

Create a folder named `(routes)` inside `(root)`, and move the `page.tsx` from `(root)` to `/(root)/(routes)`.

- Update imports if necessary
- If you have an issue with `.next` folder, then either re-save the cached file or delete the `.next` folder entirely so that it can be re-made from scratch with `npm run dev`

Now also change the `SetupPage` in `page.tsx` by returning `null` instead of some `div`. We only want to use `SetupPage` to trigger the modal.

`/app/(root)/(routes)/page.tsx`

```tsx
"use client";

// Global Imports
import { useEffect } from "react";

// Local Imports
import { useStoreModal } from "@/hooks/use-store-modal";

export default function SetupPage() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if(!isOpen){
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
```

### Tracking the flow of the project

Run the project

```sh
npm run dev
```

Assuming we are logged in, we can see the Navbar and Dashboard. WE can see the URL has our exact `storeId`.

Let's track the flow starting from `/app` folder.

1. `/app` > `layout.tsx`

This loads the providers, metadata, global css, and renders the `children`.

By default, since we did not define any routes we just typed `localhost:3000` then the default route activated was `/(root)`

2. Default route: `/(root)` > `layout.tsx`

WE checked for currently active user in `layout.tsx`. If user is logged-in, then check if they have any stores created.

```tsx
  // Check if user is logged-in
  // Authenticate userId with Clerk
  const { userId } = auth();

  // If userId does not exist, redirect to sign-in
  if (!userId) {
    redirect('/sign-in');
  }

  // Fetch the first active store user has in database
  const store = await prismadb.store.findFirst({
    where: {
      userId
    }
  });

  // If store exists, redirect to dashboard's [storeId] route
  if (store) {
    redirect(`/${store.id}`);
  }
```

If a store exists, we redirect them to the route with `store.id` which is in the `(dashboard)`.

3. Redirected to `(dashboard)` > `[storeId]` > `layout.tsx`

Now we attempt to load the `store` with an id that was passed from the `redirect` of the `(root)` folder (in step 2). We use `id` in combination with `userId` to confirm the store's existence.

```tsx
// If user IS logged-in, then fetch the store
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  });

  // Check if store does not exist, redirect to home-page
  if (!store) {
    redirect('/');
  }

  return (
    <div>
      <nav>Navbar</nav>
      {children}
    </div>
  )
  ```

  So then we render `Navbar` and `{children}`.

4. Render the `(dashboard)` `children`

What is `{children}`?

We are in `(dashboard)/[storeId]` the `children` is in `(dashboard)/[storeId]/(routes)/page.tsx`, which currently contains:

```tsx
import React from 'react';

export default function DashboardPage() {
  return (
    <div>This is a Dashboard</div>
  )
}
```

Our project's system ensures that there is at least one store user has created before showing `Navbar`, statistics, products, tabs, etc.

## Resetting Database using `prisma`

In the directory `/ecommerce-admin`, in the terminal:

1. Delete the DB

```sh
npx prisma migrate reset
```

This deletes the entire database. It prompts a yes or no.

After reset is successful:

2. Generate prisma

```sh
npx prisma generate
```

3. Push prisma db

```sh
npx prisma db push
```

Now we should be able to be at the Create Store Modal once again @ `localhost:3000`.

## Redirect to Dashboard when creating a new store

Currently, when creating a new store through the Modal it does not redirect to the Dashboard.

Let's fix that.

Inside `/app/components/modals/StoreModal.tsx` we can check our submit handler:

```tsx
  // Define a submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // This will be type-safe and validated.
    console.log(values);
    
    try {
      setLoading(true);

      // Create store via our API
      const response = await axios.post('/api/stores', values);

      // Print out data
      console.log(response.data);

      // Successful toast notifcation
      toast.success('Store successfully created!');
    } catch(error) {
      console.log(error);
      // Error toast notification
      toast.error('Something went wrong...');
    } finally {
      setLoading(false);
    }
  }
```

When we call our API to create our store, the `response` holds our newly created `storeId`.

Our goal is to redirect the user to the `(dashboard)/[storeId]` and user can see the actual Dashboard `/(routes)/page.tsx`.

We can remove the `toast.success()` because we will immediately redirect the user.

So how do we navigate the user?

[MDN - assign()](https://developer.mozilla.org/en-US/docs/Web/API/Location/assign)

```tsx
window.location.assign(`/${response.data.id}`);
```

Why are we using `window.location.assign()` instead of `Next` router / navigation?

**Because this will do a complete refresh on our page.**

```tsx
// ...
    // Create store via our API
    const response = await axios.post('/api/stores', values);

    // redirect the user to the dashboard
    window.location.assign(`/${response.data.id}`);
```

The store that's just been newly created from the `response` after the refresh will be loaded in the database, 100% of the time as of now.

After testing, the issue with Next router was that there was specific cases where:

- database was not ready
- the data was not in sync

And the modal was kept open in the Dashboard. A UI error like that creates a poor user experience.

So for now `window.location.assign()` is the way to go.

#### Further testing

Now when we create a store through the modal we should be redirected to our prototype Dashboard.

Now we still stay on the same page that includes the `storeId` in the URL, in these cases:

- Refresh the page
- Remove the `storeId` from URL
- Re-run the project
- Re-open current browser or open in different browser

Let's test if we can still access the `storeId` through the Dashboard page, so in `page.tsx` in `(routes)`

```tsx
import React from 'react';

export default function DashboardPage() {
  return (
    <div>This is a Dashboard</div>
  )
}
```

What I want to do is: 

- Create interface
- make it `async`
- destructure params
- attempt to load store.

Let's convert it to React Arrow Function Component, then work on the above

```tsx
import React from 'react';

interface DashboardPageProps {
  params: { storeId: string }
};

const DashboardPage: React.FC<DashboardPageProps> = async () => {
  return (
    <div>
      This is a Dashboard!
    </div>
  );
}

export default DashboardPage;
```

Next we have to destructure the params. Then attempt to load store, then render the `store.name`.

```tsx
// Global Imports
import React from 'react';

// Local Imports
import prismadb from '@/lib/prismadb';

interface DashboardPageProps {
  params: { storeId: string }
};

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  });

  return (
    <div>
      Active Store is: {store?.name}
    </div>
  );
}

export default DashboardPage;
```

We should now see in our localhost:3000 page that the active store's name is rendered.

## Navigation Bar

Next step is to make a navbar which holds our Store switcher. Which allows us to change our active `storeId` with other stores created. This should also trigger our modal, which is why we created our `ModalProvider` and zustand store so we can trigger them from multiple places at once.

Create `Navbar.tsx` inside `/components` folder. It is not in the `ui` folder because it is not a re-usable component, it is just a component used for one layout. It does not match the project structure if it was inside `/components/ui`.

Create a React functional component.

```tsx
import React from 'react'

export default function Navbar() {
  return (
    <div>navbar</div>
  )
}
```

Navigate to `(dashboard)/[storeId]/layout.tsx`, and in the `return` statement instead of:

```tsx
  return (
    <div>
      <nav>Navbar</nav>
      {children}
    </div>
  )
```

Render the navbar:

```tsx
import Navbar from '@/components/navbar';
// ...
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
```

Now let's start developing our component Navbar and give it some styles.

```tsx
import React from 'react'

export default function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="store-switcher">
          This will be a <b>Store Switcher</b>
        </div>
        <div className="routes">
          This will be the <b>routes</b>
        </div>
      </div>
    </div>
  )
}
```

Inside the navbar we will have the store switcher and routes.

Then under `routes`, we can create a `div` which will be placed all the way to the right using `ml-auto` by giving it a margin to the left. Give all the items inside some space, add flex and center it.

Then add a `UserButton` component from `Clerk`, with the `afterSignOutUrl` prop set to the home page.

```tsx
import { UserButton } from '@clerk/nextjs'
// ...
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
```

### Create `MainNav` component

Create client react component `MainNav` in `/components`

```tsx
"use client"

import React from 'react';

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div>Main Navigation</div>
  )
}

```

Render main nav component in our `Navbar.tsx`, by replacing the `routes div`.

```tsx
// Global Imports
import { UserButton } from '@clerk/nextjs'
import React from 'react'

// Local Imports
import MainNav from '@/components/MainNav'

export default function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="store-switcher">
          This will be a <b>Store Switcher</b>
        </div>
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  )
}
```

Let's try to style the `MainNav`

```tsx
<MainNav className="mx-6"/>
```

The styles won't render because we have not passed the `className` prop to our element that we returned inside the `MainNav`.

We can add the `className` to our element. We are going to us `cn` function from our `/lib` folder. `cn` allows us to merge multiple classnames. We can merge default classnames and the `className` we pass in.

```tsx
"use client"

// Global Imports
import React from 'react';

// Local Imports
import { cn } from '@/lib/utils';

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
    >

    </nav>
  )
}
```

### Put routes inside `MainNav`

Now we want to iterate over the routes inside the `nav`. But we don't have any routes yet.

Inside the `MainNav` but before the `return`, let's create variables we need for the `routes`. We will use `usePathname` and `useParams` from `Next/Navigation`.

```tsx
import { useParams, usePathname } from 'next/navigation';
// ...
  const pathname = usePathname();
  const params = useParams();

  const routes = [];
```

Now inside the `routes` we can create an object that will use `pathname` and `params`.

Regarding the object inside the `routes` we want to create the settings navigation first because:
- We have the store modal in our database
- This means we can create a form in the settings
- Which will update & remove the very same store

Let's write `href` with template string of `params.storeId`. We are using navigation bar in the dashboard layout, which has the `storeId`. 

```tsx
  const routes = [
    {
      href: `/${params.storeId}`
    }
  ];
```

Regardless of whether the `MainNav` is inside the `/components` folder, where its used we'll define whether we can use `storeId` in the parameters. We need to append `settings` to the special object in `href`.

```tsx
  const routes = [
    {
      href: `/${params.storeId}/settings`
    }
  ];
```

When we click on the link, we can ensure that the settings that are loaded are only going to be for that specific active store.

Next specify the `label` property as `Settings`, and `active` prop.

```tsx
  const routes = [
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
```
#### Map out the routes

Now we can map out each link in the `return` statement. Import `Link` component from `next`. Then map out the routes, for every route create a `Link` with the label as the child. Populate the props: `key`, `href` and `className`.

```tsx
import Link from 'next/link';
// ...
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn("")}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
```

#### Style the Link

Let's add some styles, which we also merge with other classnames using `cn()`. One thing to note is that we can add a conditional as the second parameter to `cn()`, going to use that to decide the text color.

```tsx
<Link
  key={route.href}
  href={route.href}
  className={cn(
    "text-sm font-medium transition-colors hover:text-primary",
    route.active ? "text-black dark:text-white" : "text-muted-foreground"
  )}
>
  {route.label}
</Link>
```

As of now, inside the project site we can see the `Settings` rendered after the store switcher in the main nav. Clicking on it will lead to 404 page since the route does not exist yet.

### Creating Store Switcher Component

What our Store Switcher component should allow the user to search and select between active Stores. 

[shadcn/ui - Combobox](https://ui.shadcn.com/docs/components/combobox) seems to fulfill our need here.

> Autocomplete input and command palette with a list of suggestions.

It is a drop down menu that clearly shows what is the current active store.

Interesting to note that this is one of the components in `shadcn/ui` that *cannot* be installed individually. It is a composition of `Popover` and `Command` components.

Let's go ahead and install them:

```sh
npx shadcn-ui@latest add popover
```

```sh
npx shadcn-ui@latest add command
```

Create `StoreSwitcher.tsx` file in `/components`

```tsx
import React from 'react';

export default function StoreSwitcher() {
  return (
    <div>StoreSwitcher</div>
  )
}
```

Then in `Navbar.tsx`, replace the store switcher `div`:

```tsx
import StoreSwitcher from '@/components/StoreSwitcher'

export default function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher />
        <MainNav className="mx-6"/>
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  )
}
```

#### Adding props to StoreSwitcher

Navigate back to `StoreSwitcher.tsx` and mark it as a client component by putting the `"use client"` directive at the top.

We have to create an `interface StoreSwitcherProps` which will extend `PopoverTriggerProps`  (from `shadcn/ui` Popover component). Do not import the one from `radix/ui`, as we will create our own. For now let's create the type `PopoverTriggerProps` to remove the warning.

```tsx
"use client";

import React from 'react';

import { PopoverTrigger } from '@/components/ui/popover';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
}

export default function StoreSwitcher() {
  return (
    <div>StoreSwitcher</div>
  )
}
```

With the template added we can now work on the interface. We can add the items we want rendered inside our store switcher (i.e., an array of objects, and those objects will be our stores)

```tsx
import { Store } from '@prisma/client';

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
};
```

Now let's go inside the parenthesis of the `StoreSwitcher()` function, and extract the following:

- `className`
- `items = []`, this is given a default value of empty array so we can safely iterate over even if the items have not been loaded
- Then give a type to this object as `StoreSwitcherProps`

```tsx
export default function StoreSwitcher({
  className,
  // Default value of empty array to safely iterate over even if items are not loaded
  items = []
}: StoreSwitcherProps) {
  return (
    <div>StoreSwitcher</div>
  )
}
```

Now let's define all the constants, variables and items we need to be able to add to the element we return.

```tsx
import { useParams, useRouter } from 'next/navigation';

import { useStoreModal } from '@/hooks/use-store-modal';

export default function StoreSwitcher({
  className,
  // Default value of empty array to safely iterate over even if items are not loaded
  items = [] 
}: StoreSwitcherProps) {
  // Constants
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

```

Now we need to format our items. We need to iterate over them. Map each item out to an immediate object with `label` = to `item.name` and value = to `item.id`. 

Recall that in prisma we have the `Store` model with `name`, `id`, `createdAt`, `updatedAt`, etc.

```tsx
  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }));
```

We just need the `name` and `id` to be used in `Popover` and `Command` components.

Now we need to find which store is the currently active store. From all the stores the user has, which ones do we show as selected in the `StoreSwitcher`. We call this `currentStore` and use `find()` on `formattedItems`:

```tsx
  const currentStore = formattedItems.find((item) => item.value === params.storeId);
```

Let's break the above function down:

- Iterate over `formattedItems`
- Pick a specific item
- Compare specific item's value (i.e., `id` of the Store) to the currently active id (which is found in our URL)

#### Implement the function to Switch Store

Now let's add the function that triggers when we click on a different store.

First we need a state variable named `open` that controls the `Popover` component.

```tsx
import React, { useState } from 'react';
// ...
  const [open, setOpen] = useState(false);
```

Now onto the function. It will take a "store", which is a type of "formattedItem". We will just open up an object that has both `value` and `label`, where both are type of strings.

```tsx
const onStoreSelect = (store: { value: string, label: string}) => {}
```
So how do we implement? Well once the user clicks on a new store, we want to do two things:

1. Close the StoreSwitcher (drop down)
2. Redirect the route to `/(dashboard)/[storeId]`, where `storeId` is the new one we selected from the StoreSwitcher

So inside set the `open` state variable as `false`. Then push the route to the `store.value` route, since that contains the `storeId`.

```tsx
const onStoreSelect = (store: { value: string, label: string}) => {
  setOpen(false);
  router.push(`/${store.value}`);
}
```

#### Return element for the Store Switcher

Replace the return element with `Popover` component. Make sure to import from `/components` and not radix-ui.

```tsx
import { Popover, PopoverTrigger } from '@/components/ui/popover';
// ...
  return (
    <Popover></Popover>
  )
```

Inside we have `PopoverTrigger` and `Button`:

```tsx
import { Button } from '@/components/ui/button';
// ...
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button>
          
        </Button>
      </PopoverTrigger>
    </Popover>
  )
}
```

##### Issue: Import name conflict - `Store` name already exists from another package

Next we want to import a Store icon from `lucide-react` but its name is `Store` and we already have a `Store` import from `@prisma/client`. How do we fix this conflict?

**Solution:** Use `as` import syntax to rename the import. See [MDN - import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and [javascript.info - import "as"](https://javascript.info/import-export#import-as).

```tsx
import { Store } from '@prisma/client';
import { Store as StoreIcon} from 'lucide-react';
// ...
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button>
          <StoreIcon />
        </Button>
      </PopoverTrigger>
    </Popover>
  )
```

#### Finishing the `PopoverTrigger`

Styling the `Button`, `StoreIcon` and `ChevronsUpDown`:

```tsx
import { cn } from '@/lib/utils';

<Button
  variant="outline"
  size="sm"
  role="combobox"
  aria-expanded={open}
  aria-label="Select a store"
  className={cn("w-[200px] justify-between", className)}
>
  <StoreIcon className="mr-2 h-4 w-4" />
  Current Store
  <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
</Button>
```

Explanation:

- **`variant`**: This prop specifies the visual style of the button. In this case, it is set to `"outline"`, which means that the button will have an outline border instead of a solid one.

- **`size`**: This prop specifies the size of the button. In this case, it is set to `"sm"` or small.

- **`role`**: This prop specifies the role of the button in the accessibility tree. In this case, it is set to `"combobox"`, which means that the button is part of a combobox widget.

Accessibility features:

- **`aria-expanded`**: This prop specifies whether the combobox is expanded or not. In this case, its value is set to `{open}`, which means that its value depends on the value of the `open` variable.

- **`aria-label`**: This prop specifies a label for the button that will be read by screen readers. In this case, it is set to `"Select a store"`, which means that when a screen reader encounters this button, it will read out "Select a store".

- **`className`**: This prop specifies one or more CSS classes to apply to the button. It will apply two classes: `w-[200px]` and `justify-between`. The first class sets the width of the button to 200 pixels, while the second class aligns its contents to be evenly distributed along its horizontal axis. Then it will merge these classNames together with `className`

#### Create `PopoverContent`

So far we are working with a [Popover](https://ui.shadcn.com/docs/components/popover) component - which is a portal, triggered by a button.

After completing the `PopoverTrigger`, we can now work on the `PopoverContent`.

Inside of the `PopoverContent` component will be a `Command` component from `shadcn/ui`.

[shadcn/ui - Command](https://ui.shadcn.com/docs/components/command) is a fast, composable, unstyled command menu for React. This will contain our user's stores, which are stored in `formattedItems`.

Check out all the items we need to import to implement our `Command`

```tsx
import { Check, ChevronsUpDown, Store as StoreIcon} from 'lucide-react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

// ...
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {store.label}
                  <Check />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
```

##### Dynamically styled `Check` icon component

Now notice that `Check` component is a self-closing tag. It is an icon form `lucide-react`, and we want to dynamically style it. Use `cn()` to do this, by merging classNames we give by default and conditional styles when the currentStore is selected.

In short, we want a Check icon next to the current store selected in the Command menu.

```tsx
<Check 
  className={cn(
    "ml-auto h-4 w-4",
    currentStore?.value === store.value
      ? "opacity-100"
      : "opacity-0"
  )}
/>
```

##### Adding another `CommandList` component &  new group of Commands 

Add a `<CommandSeparator />` component after the `CommandList`, and create another `CommandList`. This time this will contain a `CommandItem` button that will trigger the modal to create new stores.

Import `PlusCircle` icon from `lucide-react` to accompany the text.

```tsx
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
```

Now we can check our app's command menu and see at the bottom of the menu we have a "Create Store" text we can click which triggers the `storeModal`. This will actually create new stores through zustand state management.

### Fetch all stores that user owns inside `Navbar`

Currently, in our `StoreSwitcher` we have the text "Current Store". Instead of this we want to render the actual current store name. We can do this by using the `const currentStore`.

In `StoreSwitcher.tsx`:

```tsx
          <StoreIcon className="mr-2 h-4 w-4" />
          Current Store
```

Is replaced with:

```tsx
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label}
```

The issue is that this will be empty, because we have not passed in any store inside the `StoreSwitcher`. We can see that `StoreSwitcher` accepts the `items`:

```tsx
export default function StoreSwitcher({
  className,
  // Default value of empty array to safely iterate over even if items are not loaded
  items = [] 
}: StoreSwitcherProps) {
```

But in `Navbar` component we have not passed in an `items`. Which yields an error:

```sh
Property 'items' is missing in type '{}' but required in type 'StoreSwitcherProps'.ts(2741)
```

So let's go ahead and solve this by fetching all the stores available to the user.

What we need to do:

- Authenticate `userId`
- Redirect to sign-in if no `userId`
- Get stores with `prisma`

The imports:

```tsx
// Global Imports
import React from 'react';
import { auth, UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

// Local Imports
import MainNav from '@/components/MainNav';
import StoreSwitcher from '@/components/StoreSwitcher';
import prismadb from '@/lib/prismadb';
```

- Make function `async`
- Authenticate `userId` with Clerk
- Redirect user to sign-in if no `userId`
- Use `prismadb.store.findMany` to find all the stores where `userId` is equal to current `userId`

```tsx
export default async function Navbar() {
  const { userId } = auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId
    }
  })
```

Notice that:

```tsx
  const stores = await prismadb.store.findMany({
    where: {
      userId
    }
  })
```

Is shorthand for:

```tsx
  const stores = await prismadb.store.findMany({
    where: {
      userId: userId
    }
  })
```

Now finally, pass in `items` prop to the `StoreSwitcher` component in the `return`:

```tsx
export default async function Navbar() {
  // ...
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
```

### Testing Navbar and Command Menu

Current Features of the Navbar & Command Menu:

- Current Active store name is rendered on the Command
- Can search for an existing Store
- Searching for non-existing store returns the CommandEmpty message
- Click create store > Create store in Modal > Active store has now changed to new store
- URL dynamically changes to the `[storeId]` route in the dashboard
- Can switch between stores through Command

Now we can move on to renaming our store or deleting it through the `Settings`.

#### Troubleshoot - unable to connect to branch *

If you see the following:

```sh
Error: Schema engine error:
unavailable: unable to connect to branch *******
```

Know that this may be due to your database in Planetscale is sleeping, so you must wake it up before you can query it.

See [Planetscale - Sleeping Databases](https://planetscale.com/docs/concepts/database-sleeping#what-is-branch-sleeping)

After waking up your database, you can now run your project again and run these commands:

To reset prisma DB:

1. Delete the DB
2. Generate prisma
3. Push prisma db

```sh
npx prisma migrate reset

npx prisma generate

npx prisma db push
```

## Settings Form

Navigate to `/app/(dashboard)/(routes)` and create a new folder named `settings`, with `page.tsx` file within.

```tsx
import React from 'react';

export default function SettingsPage() {
  return (
    <div>
      Settings Page
    </div>
  )
}
```

### Settings Page

Now we should check in this page is:

- are we authenticated?
- can I get the store in the URL?

Notice that the project structure reflects the URL where it is the "[storeId]/settings".

We are using `NextJS 13` so that means we always have the `params` in the Server components. We can extract the props like so:

```tsx
import React from 'react';

interface SettingsPageProps {
  params: {
    storeId: string;
  }
};

const SettingsPage: React.FC<SettingsPageProps> = ({
  params
}) => {
  return (
    <div>
      Settings Page
    </div>
  )
}

export default SettingsPage
```

The alternative way without using arrow function syntax , replaced with normal function declaration:

```tsx
interface SettingsPageProps {
  params: {
    storeId: string;
  }
};

function SettingsPage({params}: SettingsPageProps): JSX.Element {
  return (
    <div>
      Settings Page
    </div>
  )
}

export default SettingsPage
```

##### TypeScript, React and function declarations

Let's review a bit and take a step back. 

In TypeScript, a normal function declaration with parameters in React can be written as follows:

```typescript
type Props = {
  // declare the type of props
  name: string;
  age: number;
};

function MyComponent(props: Props) {
  // use the props
  const { name, age } = props;

  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}
```

- Here, `Props` is a type that declares the type of the `props` object. 

- The `MyComponent` function takes in an argument of type `Props`, which is destructured to obtain the `name` and `age` properties. 

- These properties are then used to render the component.

The equivalent TypeScript arrow function syntax:

```tsx 
type Props = {
  // declare the type of props
  name: string;
  age: number;
};

const MyComponent = ({name, age}: Props): JSX.Element => (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
);

export default MyComponent;
```

#### Settings Page - Implementation

```tsx
// Global Imports
import React from 'react';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

// Local Imports
import prismadb from '@/lib/prismadb';

interface SettingsPageProps {
  params: {
    storeId: string;
  }
};

const SettingsPage: React.FC<SettingsPageProps> = async ({
  params
}) => {

  // Authenticate userId with Clerk to check if user is logged-in
  const { userId } = auth();
  
  // If userId does not exist, redirect to sign-in page
  if (!userId) {
    redirect("/sign-in");
  }

  // Find the user's store from the parameters
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  })

  // If there is no store, then redirect to dashboard
  if (!store) {
    redirect("/");
  }

  return (
    <div>
      Settings Page
    </div>
  )
}

export default SettingsPage
```

1. Authenticate `userId` with Clerk
2. Redirect if no `userId`
3. Find user `store` from `params`
4. If no store then redirect back to dashboard.

Steps 1-3 are familiar, but let's explain step 4 a bit. 

While we are using the Navigation Bar we are going to get the correct URL with the `storeId`. However, what if the user directly changes the URL?

If the user were to say put any random input inside the `[storeId]` URL, then we want to protect from that kind of behavior. So in this case the user will not find a `store` from the params since it won't exist, and therefore we redirect them back to the dashboard.

Step 4 protects the user from unwanted behavior when manually changing the URL, most notably the `storeId`. 

In short, it is a user experience protection and also TypeScript protection as `store` can potentially be `undefined`. We are going to pass in `store` as data to a child component later.

#### Styling the Settings Page

Going to add Flex to the page and give it some spacing all around:

```tsx
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        Settings Page
      </div>
    </div>
  )
}
```

Next, replace the text inside with a `SettingsForm` component.


### `SettingsForm` component

`SettingsForm` component is *only* going to be used inside of the settings route. So we can safely create it inside settings.

Navigate to `/settings`, create a `components` folder which contains `SettingsForm.tsx`.

`SettingsForm.tsx`
```tsx
import React from 'react';

export default function SettingsForm() {
  return (
    <div>SettingsForm</div>
  )
}
```

Back in `/settings/page.tsx` we can import and render the `SettingsForm`


`/settings/page.tsx`
```tsx
import SettingsForm from "./components/SettingsForm";
// ...
const SettingsPage: React.FC<SettingsPageProps> = async ({
  params
}) => {
  // ...
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm />
      </div>
    </div>
  )
}
```

Notice that we import without Module Path Aliases because we are accessing a different `components` folder that is one directory level below the current file.

#### Passing in data to SettingsForm

In the Settings Page, we load the `store` and we want to pass it into the `SettingsForm` to serve as initial data.

- `SettingsForm` will be a client component
- We want to pre-fill some input coming from the store

Let's change `SettingsForm` so that it can accept these parameters:

```tsx
// Global Imports
import React from 'react';
import { Store } from '@prisma/client';

interface SettingsFormProps {
  initialData: Store
}

const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData
}) => {
  return (
    <div>SettingsForm</div>
  )
}

export default SettingsForm
```

### Heading component

Let's create a re-usable component named `Heading` inside `/components` folder at the root of the app. Navigate to `/app/components/ui` and create `heading.tsx`. It will have two props: `title` and `description`.

```tsx
import React from 'react';

interface HeadingProps {
  title: string;
  description: string;
};

export const Heading: React.FC<HeadingProps> = ({
  title,
  description
}) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>
        {description}
      </p>
    </div>
  )
};
```

We are going to use the Heading component inside our `SettingsForm`.

Let's pass in some data to `title` and `description`:

```tsx
import { Heading } from '@/components/ui/heading';

const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData
}) => {
  return (
    <div className="flex items-center justify-between">
      <Heading
        title="Settings"
        description="Manage store preferences"
      />
    </div>
  )
}
```

Add a bit more stles to the `Heading` component:

```tsx
export const Heading: React.FC<HeadingProps> = ({
  title,
  description
}) => {
  return (
    <div>
      <h2 className='text-3xl font-bold tracking-tight'>{title}</h2>
      <p className='text-sm text-muted-foreground'>
        {description}
      </p>
    </div>
  )
};
```

### Settings Form functionality

We want to have a way for the user to delete the store in the Settings page.

We are going to add a `Button`, which will contain a Trash icon.

```tsx
const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData
}) => {
  return (
    <div className="flex items-center justify-between">
      <Heading
        title="Settings"
        description="Manage store preferences"
      />
      <Button 
        variant="destructive"
        size="icon"
        onClick={() => {}}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  )
}
```

We can either go with `size` as "icon" or "sm".

#### Using a `Separator`

Now after the `Heading` & `Button` we want to add a Separator. First let's wrap the `div` inside a React fragment `<>...</>`.

Then we can go to [shadcn/ui docs - Separator](https://ui.shadcn.com/docs/components/separator) which will visually and/or semantically separates content.

Install `Separator`

```sh
npx shadcn-ui@latest add separator
```

Now we can use it to separate our content:

```tsx
const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData
}) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Settings"
          description="Manage store preferences"
        />
        <Button
          variant="destructive"
          size="icon"
          onClick={() => { }}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
    </>
  )
}
```

### Implementing the Settings Form

Now I want to create a Form Schema using `zod` and `react-hook-form`.

[shadcn/ui - React Hook Form](https://ui.shadcn.com/docs/components/form)

[zod docs - Basic usage - Creating an object schema](https://zod.dev/?id=basic-usage)

#### 1. Defining the shape of form using a [Zod](https://zod.dev/) schema

Form validation for the Settings Form using `zod`.

In `SettingsForm.tsx`, the `formSchema` we will use `z.object()` with a field `name` that is a string with a minimum of one letter.

```tsx
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(1),
});
```

Now we create the type of `SettingsFormValues`

```tsx
// extract the inferred type
type SettingsFormValues = z.infer<typeof formSchema>;
```

So that we don't have to re-write it every time, and we can re-use it when needed.

e.g., instead of:

```tsx
const form = useForm<z.infer<typeof formSchema>>({
```

we use:

```tsx
const form = useForm<SettingsFormValues>({
```

#### 2. Define a form

We go with step 2 in [shadcn/ui - React Hook Form](https://ui.shadcn.com/docs/components/form) by defining our form.

Use the `useForm` hook from `react-hook-form` to create a form.

```tsx
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// ...
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
  })
```

ZodResolver is a **validation resolver** for React Hook Form library that allows you to integrate an external validation library like Zod with the React Hook Form library. It is a function that takes the schema you define as an argument and enables you to access Zod's functions and features. 

You can use zodResolver hook that is imported from `@hookform/resolvers/zod` to validate your schema using Zod.

##### 2.1 Create states for our form

Since we want to `useState`, we need to mark the `SettingsForm` as a client component. 

So add the `"use client"` directive  at the top.

Now let's create two state variables: `open` and `loading`

```tsx
import React, { useState } from 'react';
// ...
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
```
- `loading` & `setLoading` just like before it will be used to track whether an interactive element is loading so that it can be `disabled`

-`open` & `setOpen` will control our Alert modal

Alert modal? Why not create Alert modal in the zustand store just like the Create Store modal.

That's because the Alert modal will call different API routes every single time, so it cannot be reused the same way the create store modal.

The create store modal, wherever its opened does the exact same API call to create a new store.

The delete modal has to confirm deletion of different entities. e.g., in our Settings it will delete our store, in our products it will delete products, in categories it will delete category, etc.

##### 2.2 Define a submit handler for the form

In the [shadcn/ui - React Hook Form docs](https://ui.shadcn.com/docs/components/form):

```tsx
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
```

We will use our inferred type and call it `data` instead of `values`:

```tsx
  // 2. Define a submit handler
  const onSubmit = async (data: SettingsFormValues) => {
    console.log(data);
  }
```

#### 3. Build Settings Form

We can now use the `<Form />` component to build the form. Import `Form` from `components/ui/form` and add it right after the `Separator`.

```tsx
import { Form } from '@/components/ui/form';

const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData
}) => {
//..
  return (
    <>
      <div className="flex items-center justify-between">
        ...
      </div>
      <Separator />
      <Form {...form}>
      </Form>
    </>
  )
}
```

### 3. Building the Settings Form

Import all the components we may need:

```tsx
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
```

Inside the `Form` component will be a native `<form>` element which contains our submit handler and some styles.

Inside of the form, we will have our content divided out in a grid. Right now we have just one input: the name. But later when we make products and categories, they are going to have a lot of inputs so we need a way to manage them. e.g., a grid with 3 inputs in a row.

```tsx
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">

          </div>
        </form>
      </Form>
```

Inside we give it a `FormField`, with props `control` and `name`. The `name` is referring to the property its going to control. It matches the `name` property/field of the store in the database.

```tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
    <div className="grid grid-cols-3 gap-8">
      <FormField 
        control={form.control}
        name="name"
        render={({field}) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
          </FormItem>
        )}
      />
    </div>
  </form>
</Form>
```

Let's work on the JSX element returned by the `render` prop:

```tsx
<FormField 
  control={form.control}
  name="name"
  render={({field}) => (
    <FormItem>
      <FormLabel>Name</FormLabel>
      <FormControl>
        <Input disabled={loading} placeholder="Store name" {...field}/>
      </FormControl>
    </FormItem>
  )}
/>
```

Add a `FormControl` that wraps the `Input` with props `disabled`, `placeholder`, and spread out the `field` object. Spreading out the `field` allows the input to get `onChange`, `onBlur`, and `values`.

Notice that our store name is auto-filled inside the `Input` already. That's because:

- We passed in the `initialData` for the initial values

```tsx
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
  });
```

- `initialData` is passed in from the Settings Page, which is the `store`

```tsx
const SettingsPage: React.FC<SettingsPageProps> = async ({
  params
}) => {
// ...
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store}/>
      </div>
    </div>
  )
}
```

##### Button - Save Changes

Now back to the Settings Form add the `Button` to save changes right after the `div` but right before the `</form>`.

One last thing we should do is add a `FormMessage` component to give us an error when an invalid input is given and user hits submit

```tsx
            <FormField 
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Store name" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
```

Now we can test the data being passed when the submit button is triggered.

```tsx
  const onSubmit = async (data: SettingsFormValues) => {
    console.log(data);
  };
```

It should print the data to the console. So open up developer tools, change the name and hit "Save changes" to see if the store name updated. I named it `test-store-update` and in the console:

```sh
{
    "name": "test-store-update"
}
```

It logged the new changes.

##### Delete Store Button - add  more props

Before moving on, remember the `Button` earlier that deletes a store with a `Trash` icon inside? 

- We should disable it while it is `loading`.
- Also set the `onClick` function to set state variable of `open` to `true`

```tsx
<Button
  disabled={loading}
  variant="destructive"
  size="icon"
  onClick={() => setOpen(true)}
>
  <Trash className="h-4 w-4" />
</Button>
```

## API Route Handler to Update & Delete the store

Let's create the API call to update and delete a store.

Navigate to `/app/stores` directory and create a [Dynamic Route](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes) named `[storeId]`. This allows us to target individual stores.

Inside create the file `route.ts`. Inside we create two routes:

1. PATCH route - updates the store
2. DELETE route - deletes the store

Let's go ahead and create the [Route Handler](https://nextjs.org/docs/app/building-your-application/routing/route-handlers).

Starting with the Patch route:

```tsx
export async function PATCH (
  req: Request,
  { params }: { params: { storeId: string }}
){
  
}
```

Where did `params` come from? Well params are available in here because we use a Dynamic Route Segment to create dynamic routes that can accept parameters.

In Next.js, **Route Handlers** allow you to create custom request handlers for a given route using the Web Request and Response APIs. 

The `params` object is **not** available in Route Handlers by default. However, you can use **Dynamic Route Segments** to create dynamic routes that can accept parameters. 

For instance, if you have a page with the following URL: `/posts/[id]`, you can access the `id` parameter in the corresponding Route Handler as follows:

```javascript
export default function handler(req, res) {
  const { id } = req.query;
  // ...
}
```

Here, `req.query` is an object that contains the query parameters of the request. The `id` parameter is accessed using destructuring assignment.

So since `params` is a parameter, and `storeId` comes from the folder name which is automatically in the route name.

### PATCH Route to Update the Store

- `try..catch` with proper log and generic error response
- authenticate user

```tsx
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function PATCH (
  req: Request,
  { params }: { params: { storeId: string }}
){
  try {
    // Authenticate userId with Clerk to check if user is logged-in
    const { userId } = auth();
    
    // If userId does not exist, redirect to sign-in page
    if (!userId) {
      redirect("/sign-in");
  }

  } catch (error) {
    console.log('[STORE_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
```

- Instead of redirecting the user, send back a 401 status
- Extract the `name` from the `body`
- Send back 400 response if `name` does not exist
- Send back 400 response if `params.storeId` does not exist

```tsx
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH (
  req: Request,
  { params }: { params: { storeId: string }}
){
  try {
    // Authenticate userId with Clerk to check if user is logged-in
    const { userId } = auth();
    
    // If userId does not exist send back 401 response
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    // Extract body from the request
    const body = await req.json();

    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.storeId){
      return new NextResponse("Store id is required", { status: 400 });
    }
  } catch (error) {
    console.log('[STORE_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
```

Now we can find and update our store

- Import and use `prismadb` and `updateMany`
- We have to pass in an object with property `where`

where:
- `id` is equal to `params.storeId`
- `userId` is equal to `userId`

The next propert of the object parameter is `data`
- we pass in the `data` which is an object that contains what we are going to update
- in this case it is the `name`

With that done we can `return` a `NextResponse`. We don't have to use the keyword `new` because we will use `.json()` with the `store` passed in.

```tsx
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH (
  req: Request,
  { params }: { params: { storeId: string }}
){
  try {
    // Authenticate userId with Clerk to check if user is logged-in
    const { userId } = auth();
    
    // If userId does not exist send back 401 response
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    // Extract body from the request
    const body = await req.json();

    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.storeId){
      return new NextResponse("Store id is required", { status: 400 });
    }

    // Find and Update store
    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId
      },
      data: {
        name
      }
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
```

#### Delete Route

Create delete store method in the same API route.

We can copy the same logic we did for PATCH but with some tweaks:

- Replace PATCH or Update with delete
- Remove the extract the `body`, `name` and `name` check

```tsx
export async function DELETE (
  req: Request,
  { params }: { params: { storeId: string }}
){
  try {
    // Authenticate userId with Clerk to check if user is logged-in
    const { userId } = auth();
    
    // If userId does not exist send back 401 response
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.storeId){
      return new NextResponse("Store id is required", { status: 400 });
    }

    // Find and Delete store
    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        userId
      }
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
```

Notice I use `prismadb.store.deleteMany()` as opposed to `delete()`. That is because `userId` is not unique.

###### Note: Why do we still have `req` request in the Delete function?

That's because in the parameters `params` is only available in the 2nd argument of the `DELETE` function.

Likewise, the `req` request is only available as the 1st argument to the function.

Optionally, you can add an underscore to the front of it to mark it private and unused.

```tsx
export async function DELETE (
  _req: Request,
  { params }: { params: { storeId: string }}
){
```

### Modify the Submit Handler of the SettingsForm

With that complete, let's navigate back to `SettingsForm.tsx` and update our submit handler.

- Open up a `try..catch..finally` block
- In the catch, use toast to print an error
- set `loading` state to `true` in `try` block
- set `loading` state to `false` in `finally` block

```tsx
  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
```

We are going to use `axios` but before that we need the `params` and `router` both from `next/navigation`.

```tsx
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
// ...
const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData
}) => {
  // Extract params to get storeId
  const params = useParams();
  const router = useRouter();
  // ...
```

We will need params to get `storeId` which we pass into the template string in `axios.patch()` function.

Inside submit handler's try block:

- in the `axios.patch()` pass in the template string with the api route to `storeId` and pass in the updated data
- `router.refresh()` will re-synchronize our server component with the newly updated initial data in `page.tsx`
- Add toast success message

```tsx
  // 2. Define a submit handler
  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      // Re-synchronize server component that fetches our store
      // Re-initializes the updated `initialData`
      router.refresh();
      toast.success("Store updated.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
```

##### Testing PATCH in Settings Page

Now let's test the Settings page and update the name. 

- Change the name in `Input` component and hit "Save Changes". 
- The navigation bar should also update the name of the store.

### `AlertModal` component to Delete the Store

Next we have to create a delete store modal. Remember we will call this the `AlertModal`.

Create `AlertModal.tsx` in `/components/modals` folder and mark it as a client component.

- A React Arrow Functional component with the interface `AlertModalProps` which contains:
`isOpen`, `onClose`, `onConfirm` and `loading`.
- Assign those props as the type of `React.FC<AlertModalProps>`, a React Functional Component
- Destructure all of the props in the parameters to the arrow function

```tsx
import React from 'react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading
}) => {
  return (
    <div>AlertModal</div>
  )
}
```

Recall the Create store modal uses a `modal-provider.tsx`:

```tsx
"use client";

// global imports
import { useEffect, useState } from "react";

// local imports
import StoreModal from "@/components/modals/StoreModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if(!isMounted) {
    return null;
  }

  return(
    <>
      <StoreModal />
    </>
  )
}
```

Next step is to create a `isMounted` state variable inside our `Alert` Modal.

However, since our provider is not going to work the same way the `StoreModal` is i.e.,

```tsx
export const ModalProvider = () => {
  // ... Alert Modal is added here in the return
  return(
    <>
      <StoreModal />
      <AlertModal />
    </>
  )
```

Since `AlertModal` is not inside `ModalProvider` then it is not protected by the `useEffect()` which delays the execution of client-side-only code until after hydration.

Hydration errors are a type of mismatch between the HTML provided by the server and what is generated by the frontend framework. Hydration is the process of transforming server-side rendered markup into a reactive and dynamic application.

A hydration error can occur when client-side-only code, such as code that depends on the window object, is executed during server rendering. To fix a hydration error, one needs to find and resolve the difference between server and client data.

#### AlertModal - Manually protect from Hydration Error with `useEffect`

The following technique is called "conditional rendering" or "lazy loading":

`useEffect` is used to perform side effects in functional components. It takes two arguments: a function that contains the side effect, and an optional array of dependencies that determines when the effect should run. If the dependency array is empty, the effect will only run once after the initial render.

In this case, the function's side effect will set `isMounted` to `true` which prevents rendering of the `AlertModal` component before the effect has run. This can avoid potential hydration errors or unwanted flashes of content.

By returning `null` when `isMounted` is `false`, the component will not render anything until the `useEffect` hook sets it to `true`.

```tsx
// Global Imports
import React, { useEffect, useState } from 'react';

// Local Imports
import { Modal } from '@/components/ui/modal';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading
}) => {
  // Declare isMounted state variable and initialize it to false
  const [isMounted, setIsMounted] = useState(false);

  // useEffect hook to set isMounted variable to true
  // Delays the execution of client-side-only code until after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []); // Only run once after the initial render

  // Prevent rendering of the component before the effect has run
  // To protect from hydration errors or unwanted flashes of content
  if (!isMounted) {
    return null;
  }

  return (
    <Modal>
      ...
    </Modal>
  )
}
```

1. Create `isMounted` state variable to prevent rendering of component before effect has run
2. `useEffect` will run the side effect once after initial render
3. Side effect sets the `isMounted` to true
4. Return `null` if `isMounted` is `false`, which prevents rendering of component
5. Otherwise, if `isMounted` is `true` render and return the `Modal` component

#### AlertModal - the actual `Modal` component

We will return a `Modal` component that contains a `div` with 2 `Button` components. For both cancel and click buttons.

Pass in the props.

`AlertModal.tsx`
```tsx
// Local Imports
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
// ...
  return (
    <Modal
      title="Are you sure?"
      description="This action is irreversible!"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  )
```

### Using `AlertModal` component in Settings Page

Navigate to `app\(dashboard)\[storeId]\(routes)\settings\components\SettingsForm.tsx`, and inside the fragment we `return` add the `AlertModal` at the top. Pass in the necessary props.

```tsx
"use client"
// ...
// Local Imports
import { AlertModal } from '@/components/modals/AlertModal';
// ...
const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData
}) => {
  // ...
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // ...
  return (
    <>
      <AlertModal 
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {}}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading
          title="Settings"
          description="Manage store preferences"
        />
        <Button
          disabled={loading}
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      // ...
    </>
  )
}

export default SettingsForm
```

With that when we click the Delete button, the trash icon, the `AlertModal` will pop up with the Cancel and Continue buttons to provide the user a way to delete the store.

As of now, the Continue button does not actually delete the store. We need to connect it.

#### Link up the Delete Event Handler to the `AlertModal`

We need to link the `DELETE` API route we created earlier to the `onConfirm` or "Continue" button of the Alert Model.

We have to create the Delete event handler. 

**Event handling is the process of defining and executing functions that respond to user actions, such as clicking a button, typing in a text field, or hovering over an element.**

Event handling in React TypeScript JS involves the following steps:

- Define a function that contains the logic for handling the event, such as updating the state, calling an API, or navigating to another page. The function can be defined inside or outside the component, depending on the scope and reusability of the logic. The function can also accept parameters, such as the event object or custom data.

- Pass the function as a prop to the component that triggers the event, such as a button, an input, or a link. The prop name should match the name of the event type, such as `onClick`, `onChange`, or `onMouseOver`. The prop value should be either the function name or an arrow function that calls the function with arguments.

- Use the prop inside the component to attach the function to the event listener of the corresponding element, such as a button, an input, or a link. The event listener can be added using either the JSX syntax or the React.createElement function.


Let's define our `onDelete` function to handle the event

```tsx
  // 3. Define a delete handler
  const onDelete = async () => {
    try {

    } catch (error) {
      toast.error("Make sure you removed all products and categories first.");
    }
  };
```

- Notice the error message reminds the user to remove all products and categories in the store first. In the delete store api route, we do not manually remove any of these. It will not be possible to delete a store if you have active products and categories still inside a store. A safety-mechanism to be more cautious when it comes to deleting data.

##### prisma - relations & onDelete cascade

The way we are going to create relations in `schema.prisma` file is going to control how the relations will be able to get deleted.

As of now we have no relations in that store yet:

`schema.prisma`
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  relationMode = "prisma"
}

// Create simplified model of our Store
model Store {
  id        String    @id @default(uuid())
  name      String
  userId    String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

We will add relations to this store such as `products`, `categories` and even `billboards`.
We can add a special `onDelete` cascade to that relation.

One of the features of Prisma is the ability to define the schema of your database using the Prisma Schema Language (PSL). The PSL allows you to specify the models, fields, relations, and constraints of your data. One of the constraints that you can define in the PSL is the `onDelete` cascade, which means that when a record is deleted, all the related records are also deleted automatically.

For example, suppose you have two models in your schema: `User` and `Post`. A `User` can have many `Posts`, and a `Post` belongs to one `User`. You can define this relation using the PSL as follows:

```prisma
model User {
  id    Int     @id @default(autoincrement())
  name  String
  posts Post[]
}

model Post {
  id     Int    @id @default(autoincrement())
  title  String
  author User   @relation(fields: [authorId], references: [id])
  authorId Int
}
```

By default, Prisma does not allow you to delete a User if they have any Posts. This is to prevent orphaned records in the database. However, if you want to delete a User and all their Posts at once, you can use the onDelete cascade constraint on the relation field. You can do this by adding `@onDelete(Cascade)` after the `@relation` attribute, like this:

```prisma
model User {
  id    Int     @id @default(autoincrement())
  name  String
  posts Post[]
}

model Post {
  id     Int    @id @default(autoincrement())
  title  String
  author User   @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId Int
}
```

Now, if you delete a User using Prisma Client, all their Posts will also be deleted automatically. This can save you from writing extra code to handle the deletion of related records.

However, for our store as of now we will favor the safety feature that prevents orphaned records in the database. So we will disallow a User from deleting a Store that still has products and categories.

#### Complete Delete event handler

Similarly to submit handler, we set the proper `loading` states in the `try..catch..finally` block.
- in the `try` block, set `loading` to `true`, call the API route, refresh to update, and push the user back to the root page

```tsx
  // 3. Define a delete handler
  const onDelete = async () => {
    try {
      setLoading(true);
      // Call an API with dynamic route to delete the store
      await axios.delete(`/api/stores/${params.storeId}`);
      // Re-synchronize server component to update data
      router.refresh();
      // Push user back to root layout where we check if there is another existing store
      router.push("/");
      toast.success("Store deleted.");
    } catch (error) {
      // Safety mechanism will prompt a warning to delete any related records to the store
      toast.error("Make sure you removed all products and categories first.");
    } finally {
      setLoading(false);
      // Close the Modal
      setOpen(false);
    }
  };
```

###### Tracking the flow of the `router.push("/")`

1. *When the user deletes a store, but still has another store:* 

From here when we delete the store, we refresh to load the updated data. Then we push the user back to the root or the slash route `"/"`.

In other words, we navigate to `ecommerce-admin\app\(root)\layout.tsx` where we check if there is any other existing store for the user:

```tsx
  // Fetch the first active store user has in database
  const store = await prismadb.store.findFirst({
    where: {
      userId
    }
  });
```

Then the navbar will default to the new store.

2. *When the user deletes a store, but has no other store:* 

It will then default to `ecommerce-admin\app\(root)\(routes)\page.tsx`, or the page which triggers the create store modal:

```tsx
"use client";

// Global Imports
import { useEffect } from "react";

// Local Imports
import { useStoreModal } from "@/hooks/use-store-modal";

export default function SetupPage() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if(!isOpen){
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
```

Which will prompt the user to create their first store.

###### Link up the Delete event handler

Now finally we can use this `onDelete` event handler and pass it to the prop of `AlertModal`.

```tsx
<AlertModal 
  isOpen={open}
  onClose={() => setOpen(false)}
  onConfirm={onDelete}
  loading={loading}
/>
```

## Settings Page - Additional Features

Testing:

- Just a final check. GO ahead and delete the stores and see if the behaviors that we expect from tracking the flow works. 

- Also try updating the store name if it immediately reflects in the UI.

After testing there was currently no way for the user to navigate from the Settings page to the Dashboard. We can only select Settings.

### Add a way for user to navigate from Settings page to Dashboard.

Navigate to `ecommerce-admin\components\MainNav.tsx` and in the `routes` we want to create the route to bring us back to the dashboard:

```tsx

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Overview',
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
```

Its route will simply be the home route with `storeId`. We can label it: Home, Dashboard, Overview.

Overview: a general review or summary of a subject.

According to the definition of Overview, I went with that as it best describes what that specific page from the Dashboard is, a summary of its objects.

### Display environment key with `Alert` component

Another thing we want to do in the Settings page is show environment key, which is useful for connecting the front-end.

We will use [shadcn/ui - Alert](https://ui.shadcn.com/docs/components/alert)

```sh
npx shadcn-ui@latest add alert
```

### ApiAlert component

We are going to create another component that will use `Alert` and also call an API.

So we name this component `ApiAlert.tsx` inside of `ecommerce-admin\components\ui`.

We have to give it an interface for the props that contains a `title`, `description` and `variant`.

The following `variant` will either have `public` or `admin`.

It will also contain the `Alert` component as part of the output.

```tsx
import { Alert } from "@/components/ui/alert";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  return (
    <Alert></Alert>
  )
}
```

Why do we have variant as either type: `public` or `admin`?

That's because we re-use this `ApiAlert` for all of the routes that will be shown in the products tab, or categories tab, etc.

It will be quite similar to the code snippets we copy from `shadcn/ui`. It will have the "code" which in this case is the API_URL. And a button to allow copying the link. The only difference is that it has a title that will specify what the API URL is for, and whether its public or admin. 

e.g.,

```sh
NEXT_PUBLIC_API_URL [Public]
[https://... ]  [Clipboard Icon]
```

#### Dynamically render Alert Component based on variant prop

- A **map** is a data structure that holds key/value pairs, where each key is unique. 

- A `Record` utility type allows you to create a map with a predefined set of keys and values of a certain type.

The Record utility type in TypeScript is a way to create an object type that has a fixed set of keys and a specific type for each value. You can use it to map the properties of one type to another type, or to restrict the keys and values of an object type.

To use the Record utility type, you need to specify two type parameters: the first one is the type of the keys, and the second one is the type of the values. For example, if you want to create a type that represents a map from strings to numbers, you can write:

```ts
type StringNumberMap = Record<string, number>;
```

For more, see [TypeScript: Documentation - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html).

We now need to create a `textMap` and `variantMap`.

The `textMap` and `variantMap` objects are used to dynamically render the `Alert` component based on the variant prop. For example, if the variant prop is "admin", then the Alert component will have the text "Admin" and the variant "destructive".

`textMap` and `variantMap` are two objects that use the Record utility type to create a map in TypeScript. 

The `textMap` object has the keys "public" and "admin", which are the possible values of the variant prop in the `ApiAlertProps` interface. The values of these keys are strings that represent the text to be displayed for each variant. 

- For example, `textMap["public"]` returns `"Public"`.

The variantMap object has the same keys as the textMap object, but the values are strings that represent the variant to be passed to the Alert component. 

- For example, `variantMap["admin"]` returns `"destructive"`.

`ApiAlert.tsx`
```tsx
import { Alert } from "@/components/ui/alert";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
};

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin"
};

const variantMap: Record<ApiAlertProps["variant"], string> = {
  public: "secondary",
  admin: "destructive"
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  return (
    <Alert></Alert>
  )
}
```

#### Output of `ApiAlert`

Click on code in docs [shadcn/ui - Alert](https://ui.shadcn.com/docs/components/alert).

To see our `ApiAlert` changing, let's add it in `SettingsForm`. Navigate to `ecommerce-admin\app\(dashboard)\[storeId]\(routes)\settings\components\SettingsForm.tsx`.

Add a `Separator` below the `Form` and then add an `ApiAlert`

```tsx
"use client"
// ...
import { ApiAlert } from '@/components/ui/ApiAlert';
// ...
const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData
}) => {
  // ...
  return (
    // ...
      </Form>
      <Separator />
      <ApiAlert title="test" description="test description" variant="public"/>
    </>
  )
}
```

Now back to `ApiAlert.tsx`, add a `Server` icon from lucide-react in the ouput, inside the `Alert`.

```tsx
import { Server } from "lucide-react";
// ...
export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  return (
    <Alert>
      <Server className="h-4 w-4" />
    </Alert>
  )
}
```

Let's add the `AlertTitle` and render the `title` inside

```tsx
  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
      </AlertTitle>
    </Alert>
  )
```

##### Using `Badge` component

[shadcn/ui - Badge](https://ui.shadcn.com/docs/components/badge)

Install:

```sh
npx shadcn-ui@latest add badge
```

Now add Badge to output, where we interpolate the `textMap[variant]` inside.

```tsx
export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge>{textMap[variant]}</Badge>
      </AlertTitle>
    </Alert>
  )
}
```

That's is the reason why we created the maps. This is how we create safe objects with TypeScript using existing props.

The only variants available are `public` and `admin`.

Our routes will be available either to `public` like **GET** routes or `admin` routes like **PATCH**,**DELETE**, and **POST**.

Now let's add our `variant` to the `Badge`

```tsx
  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>
          {textMap[variant]}
        </Badge>
      </AlertTitle>
    </Alert>
  )
}
```

##### Issue: Type 'string' is not assignable to ...

This code shows an error:

```tsx
<Badge variant={variantMap[variant]}>
  {textMap[variant]}
</Badge>
```

Error Message:
```js
Type 'string' is not assignable to type '"secondary" | "destructive" | "default" | "outline" | null | undefined'.ts(2322)
badge.tsx(10, 7): The expected type comes from property 'variant' which is declared here on type 'IntrinsicAttributes & BadgeProps'
(property) variant?: "secondary" | "destructive" | "default" | "outline" | null | undefined
```

The issue is this:

```tsx
const variantMap: Record<ApiAlertProps["variant"], string> = {
  public: "secondary",
  admin: "destructive"
};
```

The 2nd parameter is defined to be any string, which is not true. As we can see the `Badge variant` can only take: `"secondary" | "destructive" | "default" | "outline"`.

**Solution:** Redefine the 2nd type to be `BadgeProps["variant"]` and pick the variant

```tsx
import { Badge, BadgeProps } from "@/components/ui/badge";

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive"
};
```

`variantMap` is a `Record` with the first string being either `public` or `admin` as that what `ApiAlertProps["variant"]` interpolates to. Whereas the 2nd string can be any choice of `BadgeProps["variant"]`.

Finally, let's work on `AlertDescription`. Inside we will interpolate the `description` prop surrounded by HTML [inline code element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code) to add some semantics.

Then right below we have a `Button`.

```tsx
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>
          {textMap[variant]}
        </Badge>
      </AlertTitle>
      <AlertDescription>
        <code>
          {description}
        </code>
        <Button>

        </Button>
      </AlertDescription>
    </Alert>
  )
}
```

##### Copy function - event handler

Style up the `Button` and have a `Copy` icon inside.

```tsx
import { Copy, Server } from "lucide-react";
// ...
  <Button variant="outline" size="icon" onClick={() => {}}>
    <Copy className="h-4 w-4" />
  </Button>
```

The `onClick` will contain our copy function event handler. What this does is copies the user clipboard the text inside. In this case it is the `description`.

To do this we use [Navigator](https://developer.mozilla.org/en-US/docs/Web/API/Navigator).

The `navigator.clipboard` returns a `Clipboard` object that provides read and write access to the system clipboard.

In action:
```tsx
export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {

  // Copy Event Handler
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("Copied to clipboard.");
  }
```

Notice we use the `description` that is outside of the scope of `onCopy`, but inside `ApiAlert` since we have access to it. So when we attach the `onCopy` event handler to the `onClick` of the `Button` we can call it without parameters:

```tsx
<Button variant="outline" size="icon" onClick={onCopy}>
  <Copy className="h-4 w-4" />
</Button>
```

Alternatively, we can assign a local `description` inside the `onCopy` and pass it in to the `onClick`:

```tsx
  // Copy Event Handler
  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
    toast.success("Copied to clipboard.");
  }
// ...
  return (
    // ...
        <Button variant="outline" size="icon" onClick={() => onCopy(description)}>
          <Copy className="h-4 w-4" />
        </Button>
```

Now whatever we passed into the `description` prop inside the `ApiAlert` component in `SettingsForm`, is what we can copy to the clipboard when we hit the copy `Button`.

### Feature - Display Environment Variables in Settings Page

Navigate back to `SettingsForm.tsx`.

Let's pass in proper data to `title`.

At this point we want to help the user by showing them what environment variables should be named for this store when they connect to their front-end.

For now, going to just set `title` to `NEXT_PUBLIC_API_URL` inside the `ApiAlert`. This gives a more accurate title for what the function of `ApiAlert` is.

Before we change the `description`, let's add another hook.

#### `useOrigin` hook - to safely access Window object in Next.js 13

Note that a key part of Next.js is Server-Side rendering, and on the server the [Window](https://developer.mozilla.org/en-US/docs/Web/API/Window) object does not exist. This is only available in the browser.

How do we work around this? We will use `origin`.

##### What is origin?

In this TypeScript React code, `origin` is a variable that holds the value of the origin of the current page, which is the combination of the *protocol*, *hostname*, and *port* of the URL. 

For example, if the URL is https://www.bing.com/search?q=useOrigin+hook, then the origin is https://www.bing.com. The `origin` variable is useful for generating dynamic base URLs for your application, such as for API calls or links to other pages.

##### Create `useOrigin` hook

Navigate to `/app/hooks` and create `use-origin.tsx`

```tsx
import React, { useState, useEffect } from 'react';

export const useOrigin = () => {
  return (
    <div>useOrigin</div>
  )
}
```

- Create state variable `mounted` to track when element is created and inserted into the DOM. Hydration check to prevent rendering of the component before the effect has run.

```tsx
  // Declare isMounted state variable and initialize it to false
  const [isMounted, setIsMounted] = useState(false);
```

- Get `origin`, with fallbacks. Check if `window` object and its `location` property are defined. If true then assign it to `origin`, which returns the origin variable of the current page. Otherwise, assign `origin` to empty string.

1. First we check if window is available

```tsx
typeof window !== "undefined"
```

2. If `window` is available, then check if `window.location.origin` exists

```tsx
typeof window !== "undefined" && window.location.origin 
```

3. If `window.location.origin` exists then use it, otherwise pass in an empty string

```tsx
window.location.origin ? window.location.origin : ''
```

The full line to get `origin`:

```tsx
  const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : '';
```

- `useEffect` to prevent rendering of component before it is mounted, to protect against Hydration errors

```tsx
  // useEffect hook to set isMounted variable to true
  // Delays the execution of client-side-only code until after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []); // Only run once after the initial render

  // Prevent rendering of the component before the effect has run
  // To protect from hydration errors or unwanted flashes of content
  if (!isMounted) {
    return null;
  }
```

- Otherwise, if `isMounted` is true, then return `origin`

`use-origin.tsx`
```tsx
import React, { useState, useEffect } from 'react';

// Hook that safely access Windows Object in Next.js
export const useOrigin = () => {
  // Declare isMounted state variable and initialize it to false
  const [isMounted, setIsMounted] = useState(false);

  // Check if window object and its location property are defined
  // Assign it to origin if true, otherwise pass in an empty string
  const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : '';

  // useEffect hook to set isMounted variable to true
  // Delays the execution of client-side-only code until after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []); // Only run once after the initial render

  // Prevent rendering of the component before the effect has run
  // To protect from hydration errors or unwanted flashes of content
  if (!isMounted) {
    return null;
  }

  return origin;
}
```

#### Dynamically generate URL using `origin` & `useOrigin` hook

Now we want to use this hook to generate the correct URL to access the store.

Navigate back to `SettingsForm.tsx` and use the hook to dynamically generate base URLs for our application.

Update the `description` prop, from this:

```tsx
<ApiAlert 
  title="NEXT_PUBLIC_API_URL" 
  description="test description" 
  variant="public"
/>
```

To this:

```tsx
"use client"
// ...
import { ApiAlert } from '@/components/ui/ApiAlert';
import { useOrigin } from '@/hooks/use-origin';

const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData
}) => {
  // Extract params to get storeId
  const params = useParams();
  // ...

  // Safely access the window object, only after the component is mounted
  const origin = useOrigin();
  
  // ...

  return (
    <>
      // ...
      <ApiAlert 
        title="NEXT_PUBLIC_API_URL" 
        description={`${origin}/api/${params.storeId}`} 
        variant="public"
      />
    </>
  )
}
```

So why use the hook to safely access the Windows object, rather than using windows object directly?

In short, it would cause hydration errors. Since we are trying to access the window object while the component may still be mounting, Next.js will throw an error that the document or window is not defined.

For example, we could've use the global variable: `origin`

```tsx
<ApiAlert 
  title="NEXT_PUBLIC_API_URL" 
  description={`${origin}/api/${params.storeId}`} 
  variant="public"
/>
```

Which is equivalent to `windows.location.origin`

```tsx
<ApiAlert 
  title="NEXT_PUBLIC_API_URL" 
  description={`${window.location.origin}/api/${params.storeId}`} 
  variant="public"
/>
```

This may work, **but this can cause hydration errors because we are trying to access the window object while the component is still mounting.**

See #2 of [Common NextJS Errors](https://blog.logrocket.com/common-next-js-errors/).

So during that small time-frame of server-side rendering, where the component is still being mounted, we won't have that hydration error by using our `useOrigin` hook.

#### Completing `ApiAlert` component

With that we have completed `ApiAlert`, which helps avoid code re-duplication because we are going to use this throughout the project.

The final thing to do now is to mark it as a client component. 

Add `"use client"` directive to `ecommerce-admin\components\ui\ApiAlert.tsx`.

As of now, it is currently working as a server component because the only place we are using it is inside the `SettingsForm` which is a client component itself. But since we plan to use it in other ways, such as in server components, we need to explicitly mark it as a client component to prevent any problems later.

## Billboards

The next entity we want in our database are Billboards. 

[Prisma Client docs](https://www.prisma.io/docs/concepts/components/prisma-client)

A model represents an entity of your application domain, which maps to maps to a table (in relational databases) or a collection (in MongoDB) in your database. You can use models to query and manipulate data with Prisma Client, which is a type-safe and auto-generated database client.

A model consists of a number of fields, which can be scalar types, enums, or relations. You can also use attributes and functions to change the behavior of fields and models.

#### Relations - Prisma - DB

We will make a [relation in prisma](https://www.prisma.io/docs/concepts/components/prisma-schema/relations). A relation is a connection between two models in the Prisma schema. 

To make a relation in Prisma SQL, you need to define two models in the Prisma schema and use the `@relation` attribute to connect them. The `@relation` attribute specifies which fields are involved in the relation and how they reference each other. For example, if you want to make a one-to-many relation between a `User` model and a `Post` model, you can write something like this:

```prisma
model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}

model Post {
  id       Int    @id @default(autoincrement())
  author   User   @relation(fields: [authorId], references: [id])
  authorId Int    // relation scalar field (used in the `@relation` attribute above)
}
```

This code defines a `User` model with an `id` field and a `posts` field, which is a relation field that represents the connection to the `Post` model. 

Similarly, it defines a `Post` model with an `id` field, an `author` field, which is another relation field that references the `User` model, and an `authorId` field, which is a scalar field that stores the foreign key value of the author. The `@relation` attribute on the author field specifies that it uses the `authorId` field to reference the id field of the User model.

### Create Billboard model in `schema.prisma`

Fields of `Billboard` model:

- `id`, type String

Next we want to create a relation to the `Store`, so `Billboard` can only exist inside a specific `Store`

- `storeId` type String
- `store` type `Store` model with a relation

The relation will be called "StoreToBillboard" and it will have `fields` that contain `[storeId]` and `references` will contain `[id]`

`schema.prisma` file

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  relationMode = "prisma"
}

// Create simplified model of our Store
model Store {
  id        String    @id @default(uuid())
  name      String
  userId    String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Billboard {
  id      String @id @default(uuid())
  storeId String
  store   Store @relation("StoreToBillboard", fields: [storeId], references: [id])
}
```

#### Issue: Error validating field `store` in model `Billboard` ... 

This line:
```prisma
model Billboard {
  store   Store @relation("StoreToBillboard", fields: [storeId], references: [id])
}
```

Throws this error:

```sh
Error validating field `store` in model `Billboard`: The relation field `store` on model `Billboard` is missing an opposite relation field on the model `Store`. Either run `prisma format` or add it manually.
With `relationMode = "prisma"`, no foreign keys are used, so relation fields will not benefit from the index usually created by the relational database under the hood. This can lead to poor performance when querying these fields. We recommend adding an index manually. Learn more at https://pris.ly/d/relation-mode-prisma-indexes" 
```

**Solution:** we have an error because we have defined a relation here inside `Billboard` but we have not defined it in the `Store` model. So add the the field `billboards` with a `Billboard[]` array, just like in the `User` and `Post` model example.

```prisma
model Store {
  id         String    @id @default(uuid())
  name       String
  userId     String
  billboards Billboard[]
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt
}

model Billboard {
  id      String @id @default(uuid())
  store   Store @relation("StoreToBillboard", fields: [storeId], references: [id])
  storeId String // relation scalar field (used in the `@relation` attribute)
}
```

Another issue shows up:

```sh
Error validating field `billboards` in model `Store`: The relation field `billboards` on model `Store` is missing an opposite relation field on the model `Billboard`. Either run `prisma format` or add it manually.
```

**Solution** is to use the `@relation` attribute to connect them. Append `@relation("StoreToBillboard")` to `Billboard[]`

```prisma
model Store {
  id         String    @id @default(uuid())
  name       String
  userId     String
  billboards Billboard[] @relation("StoreToBillboard")
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt
}

model Billboard {
  id      String @id @default(uuid())
  store   Store @relation("StoreToBillboard", fields: [storeId], references: [id])
  storeId String // relation scalar field (used in the `@relation` attribute)
}
```

- We have added a `storeId` property to ths `Billboard`. Then defined a relation, which is connected to the relation in the `Store`. The name, "StoreToBillboard", remains the same.

- In the `fields`, it is targeting the field `storeId`
- In the `references`, it is referring to `id`  in the `Store`

##### prisma warning index relational db

- [Indexes & Index Validation - prisma](https://pris.ly/d/relation-mode-prisma-indexes)

- [Index configuration - prisma docs](https://www.prisma.io/docs/concepts/components/prisma-schema/indexes#index-configuration)

- [Index - prisma](https://www.prisma.io/docs/concepts/components/prisma-schema/indexes)

We still have a warning in our prisma

```sh
With `relationMode = "prisma"`, no foreign keys are used, so relation fields will not benefit from the index usually created by the relational database under the hood. This can lead to poor performance when querying these fields. We recommend adding an index manually. Learn more at https://pris.ly/d/relation-mode-prisma-indexes" 
```

Which is thrown by this code:

```prisma
model Billboard {
  store   Store @relation("StoreToBillboard", fields: [storeId], references: [id])
}
```

**Solution** to the warning regarding "relation fields will not benefit form index..." is by using the `@@index` attribute to configure indexes in Prisma SQL.

The `@@index` attribute is a way to configure indexes in Prisma SQL. 

An *index* is a secondary data structure that helps the database to perform queries faster by storing a subset of the table's data in a sorted order. 

The `@@index` attribute allows you to specify which fields of a model are involved in the index and how they are referenced. You can also use additional arguments to customize the index, such as the name, the type, the sort order, and the length.

For example, if you want to create an index on the title and content fields of a Post model, you can write something like this:

```prisma
model Post {
  id      Int    @id @default(autoincrement())
  title   String
  content String
  @@index([title, content], name: "post_index")
}
```

This code creates an index named `"post_index"` on the `title` and `content` fields of the `Post` model. You can use this index to speed up queries that involve these fields, such as searching for posts by `title` or `content`.

To fix our warning the `Billboard` we should create an index named `store_id` on the `storeId` field of the `Billboard` model to speed up queries involving this field.

```prisma
model Billboard {
  id        String @id @default(uuid())
  store     Store @relation("StoreToBillboard", fields: [storeId], references: [id])
  storeId   String // relation scalar field (used in the `@relation` attribute)
  label     String
  imageUrl  String
  createdAt  DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  @@index([storeId], name: "store_id")
}
```

or we could just give it no name but still index `storeId`:

```prisma
model Billboard {
  // ...
  @@index([storeId])
}
```

#### More to add to `Billboard` model

`Billboard` model will also addition fields:

-  a `label` field
- `imageUrl`
- `createdAt`
- `updatedAt`

```prisma
model Billboard {
  id        String @id @default(uuid())
  store     Store @relation("StoreToBillboard", fields: [storeId], references: [id])
  storeId   String // relation scalar field (used in the `@relation` attribute)
  label     String
  imageUrl  String
  createdAt  DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

### Generate prisma

[Generating Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client)

**Important**: You need to re-run the `prisma generate` command after every change that's made to your Prisma schema to update the generated Prisma Client code.

Before we can start using Prisma Client in our application and start using `Billboard` we need to 

be in the right directory

```sh
cd ./ecommerce-admin/
```

and re-run the command

```sh
npx prisma generate
```

To demonstrate, now we can navigate to `ecommerce-admin\app\(root)\layout.tsx` and use `prisma` to create `billboard`. We can remove this right after we see it auto-complete.

```tsx
const billboard = await prismadb.billboard
```

#### Push new `schema.prisma` to planetscale

Run the command

```sh
npx prisma db push
```

Output:

```sh
npx prisma db push          

Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
Datasource "db": MySQL database "ecommerce-admin" at "aws.connect.psdb.cloud"

Your database is now in sync with your Prisma schema. Done in 2.58s

✔ Generated Prisma Client (5.1.1 | library) to .\node_modules\@prisma\client in 59ms
```

#### Update `prisma`

After `npx prisma db push`, you may get an update message:

```sh
┌─────────────────────────────────────────────────────────┐
│  Update available 5.1.1 -> 5.3.0                        │
│  Run the following to update                            │
│    npm i --save-dev prisma@latest                       │
│    npm i @prisma/client@latest                          │
└─────────────────────────────────────────────────────────┘
```

Let's run those commands:

```sh
npm i --save-dev prisma@latest

npm i @prisma/client@latest
```

### Navigation for Billboard

Navigate to `ecommerce-admin\components\MainNav.tsx`, and create a billboards route

```tsx
  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Overview',
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Billboards',
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
```

Clicking on it will give us a 404, so we need to actually build the page

Create a folder named `billboards` in `ecommerce-admin\app\(dashboard)\[storeId]\(routes)`.

Inside make `page.tsx` with a React Functional Component named `BillboardsPage`

```tsx
// Global Imports
import React from 'react';

// Local Imports
import BillboardClient from './components/client';

const BillboardsPage = () => {
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient />
      </div>
    </div>
  );
}

export default BillboardsPage;
```

### `BillboardClient` component

Notice that in the output we also render another component named `BillboardClient`.

It is a client component that loads all our Billboards. Similar to the `SettingsForm`, we will have this component in a different location.

Under `billboards`, create a `components` folder with `client.tsx` file inside. The file is a React functional component.

`ecommerce-admin\app\(dashboard)\[storeId]\(routes)\billboards\components\client.tsx`

```tsx
"use client"

// Client component that loads all our Billboards
const BillboardClient = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        Billboard Client
      </div>
    </>
  )
}

export default BillboardClient;
```

The `BillboardClient`'s top section will have:

- Add `Heading`
- Add `Button`
- Add `Separator`

The section below the `Separator` will contain a large data table, but since we do not have any billboards or data to iterate over, we will a comment as a reminder for now.

Also note that the `Heading`'s `title` will be dynamically rendered, but for now it is hardcoded.

```tsx
"use client";

// Global Imports
import { Plus } from "lucide-react";

// Local Imports
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

// Client component that loads all our Billboards
const BillboardClient = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
          title="Billboards (0)"
          description="Manage billboards for your store"
        />
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      {/* Data Table */}
    </>
  )
}

export default BillboardClient;
```

### Functionality: Form to create new Billboards

The next goal is to implement the functionality to create new billboards through a Form. This will be linked up with the `Button`.

First get `router` and `params` in `BillboardClient`.

Then for `Button` add an `onClick` function to the following route: `/${params.storeId}/billboards/new`

```tsx
// Client component that loads all our Billboards
const BillboardClient = () => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Billboards (0)"
          description="Manage billboards for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      {/* Data Table */}
    </>
  )
}
```

#### `BillboardPage`

Now we have to create a page for this route, so create a folder in `billboards` named `[billboardId]` with `page.tsx` within:

```tsx
import React from 'react';

const BillboardPage =  async ({}:{}) => {
  return (
    <div>Form for billboards</div>
  )
}

export default BillboardPage;
```

This will return a page for a specific `Billboard`.

Question: Why do we redirect to `/billboards/new` exactly?

Answer: In our `BillboardPage` we will attempt to fetch an existing Billboard. The information we get, whether a Billboard is found in the database or not, will allow us to decide whether we should display a new form or an edit form. The user can either create a new Billboard or edit an existing billboard. 

When we redirect to `/new`, we map it to `billboardId` because of the dynamic route `[billboardId]`. So when we fetch a Billboard with the `id: 'new'`, no Billboard would be found. We will use this fact that nothing was to turn on a specific form that triggers the creation of a new Billboard rather than updating an existing one.

I'll come back to this `/new` idea in a bit, let's start implementing a few things.

Updates to make to `BillboardPage`:

- Convert it to `async`
- We can extract the `params` from `BillboardPage` because it is a server component.
- In the `params` we can get `billboardId` because the page is inside a Next.js Dynamic Route a folder named `[billboardId]`
- With that we can attempt to fetch an existing billboard using `billboardId` found in our . Use `prismadb` and `findUnique` method
- Dynamically render `billboard?.label` in the output

Prisma Client docs:

- [Prisma Client - CRUD](https://www.prisma.io/docs/concepts/components/prisma-client/crud)
- [Prisma Client - API reference - findUnique](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#findunique)

`ecommerce-admin\app\(dashboard)\[storeId]\(routes)\billboards\[billboardId]\page.tsx`
```tsx
import prismadb from '@/lib/prismadb';
import React from 'react';

const BillboardPage =  async ({
  params
}:{
  params: { billboardId: string }
}) => {
  // Fetch an existing billboard
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId
    }
  });
  
  return (
    <div>Existing Billboard: {billboard?.label}</div>
  )
}

export default BillboardPage;
```

##### Tracing the `/new` route in `BillboardPage`

Notice when we fetch

```tsx
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId
    }
  });
```

This maps out to
```tsx
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: 'new'
    }
  });
```

Recall in the `BillboardClient`

```tsx
<Button
  onClick={() => router.push(`/${params.storeId}/billboards/new`)}
>
```

We push to the route new, which becomes the `billboardId` and when we search for `new` as a `billboardId` in the database we won't find it.

So this would trigger the creation of a new Billboard instead of updating an existing one.

*What if the `billboardId` does exist, and the id in the URL is correct?*

Then we use the `billboardId` to fetch an existing `billboard` and just use it as `initialData` just like in the Settings. This `initialData` will trigger the option to update the existing billboard rather than creating a new one.

##### `BillboardPage` output

Working on the return statement. We will create the `BillboardForm` after this.
```tsx
// Global Imports
import prismadb from '@/lib/prismadb';
import React from 'react';

// Local Imports
import BillboardForm from './components/BillboardForm';

const BillboardPage =  async ({
  params
}:{
  params: { billboardId: string }
}) => {

  // Fetch an existing billboard
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard}/>
      </div>
    </div>
  )
}

export default BillboardPage;
```

## `BillboardForm`

Copy the `components` folder of the `settings`, (the relative path is `ecommerce-admin\app\(dashboard)\[storeId]\(routes)\settings\components`).

Paste it into the `[billboardId]` folder (the path is `ecommerce-admin\app\(dashboard)\[storeId]\(routes)\billboards\[billboardId]`).

Now rename the file inside the `\(routes)\billboards\[billboardId]\components` to `BillboardForm.tsx`.

Now rename each instance of `SettingsForm` to `BillboardForm`.

We will still have an error inside `BillboardPage` because we copied it from `SettingsForm`, so we need to make some changes.

### Fixing Errors in `BillboardForm` 

1. `initialData` is incorrect type

- Notice our props and type. The `initialData` in Settings expects it to be of type `Store`.

```tsx
interface BillboardFormProps {
  initialData: Store
}
```

But this should not be the case here in `BillboardForm`. We need to change the type to either be `Billboard` or `null` as there is a chance the billboard was not found. Also import `Billboard` type in place of `Store` from `@prisma/client`.

`BillboardForm.tsx`
```tsx
import { Billboard } from '@prisma/client';

interface BillboardFormProps {
  initialData: Billboard | null
}
```

2. Type is not assignable to type ...

In this code, the `defaultValues` is underlined with an error

```tsx
  // 1. Define form with useForm hook & zodResolver for validation
  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
  });
```

Error message:

```tsx
Type '{ id: string; storeId: string; label: string; imageUrl: string; createdAt: Date; updatedAt: Date; } | null' is not assignable to type 'AsyncDefaultValues<{ name: string; }> | { name?: string | undefined; } | undefined'.
  Type 'null' is not assignable to type 'AsyncDefaultValues<{ name: string; }> | { name?: string | undefined; } | undefined'.ts(2322)
(property) defaultValues?: AsyncDefaultValues<{
    name: string;
}> | {
    name?: string | undefined;
} | undefined
```

Notice the text: "Type 'null' is not assignable to type ..."

That means the error in the line: `defaultValues: initialData` is that there is a possibility that it is `null`. 

**Fix:** Define default value that is not null. An object with the properties set to empty values.

Add a pipe and an object, and manually add the properties to be empty. That means `label` and `imageUrl` should be empty string.

```tsx
  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl: ''
    }
  });
```

3. We still have an error for `defaultValues`

Error message

```tsx
Type '{ id: string; storeId: string; label: string; imageUrl: string; createdAt: Date; updatedAt: Date; } | { label: string; imageUrl: string; }' is not assignable to type 'AsyncDefaultValues<{ name: string; }> | { name?: string | undefined; } | undefined'.
  Type '{ id: string; storeId: string; label: string; imageUrl: string; createdAt: Date; updatedAt: Date; }' is not assignable to type 'AsyncDefaultValues<{ name: string; }> | { name?: string | undefined; } | undefined'.ts(2322)
(property) defaultValues?: AsyncDefaultValues<{
    name: string;
}> | {
    name?: string | undefined;
} | undefined
```

The code, where `defaultValues` is highlighted

```tsx
  // 1. Define form with useForm hook & zodResolver for validation
  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl: ''
    }
  });
```

The error remains because we are using `zod`.

`zod` has different fields defined in our `formSchema`, as we can see here:

`BillboardForm.tsx`
```tsx
// Create zod object schema with string name and min of 1 letter
const formSchema = z.object({
  name: z.string().min(1),
});
```

Recall that in our `prisma.schema`, the `Billboard` model:

```prisma
model Billboard {
  id        String @id @default(uuid())
  store     Store @relation("StoreToBillboard", fields: [storeId], references: [id])
  storeId   String // relation scalar field (used in the `@relation` attribute)
  label     String
  imageUrl  String
  createdAt  DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  // Manually add index on relation scalar field
  @@index([storeId])
}
```

**Fix:** add the required properties within the zod object when creating formSchema

So to fix the error, we make the following changes:

- Change `name` to `label`
- Add `imageUrl` property

```tsx
// Create zod object schema
const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});
```

### Fixing Output

We will create four variables: `title`, `description`, `toastMessage`, and `action`. These variables are used to store some dynamic data that will be passed into the props of a component. The data depends on whether the variable `initialData` is defined or not.

```tsx
  // Create dynamic data to pass into props
  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData ? "Edit a billboard" : "Add a new billboard";
  const toastMessage = initialData ? "Billboard updated." : "Billboard created.";
  const action = initialData ? "Save changes" : "Create";
```

Now we can pass data into props of `Heading`

```tsx
<Heading
  title={title}
  description={description}
/>
```

Also the `Button` that says `Save changes`

```tsx
<Button disabled={loading} className="ml-auto" type="submit">
  {action}
</Button>
```

Let's also remove `ApiAlert`

#### Adding the proper fields in `FormField`

`Billboard` does not have a `name` but a `label` field.
- Set `name` prop to `label`
- Change `FormLabel` to `label`
- Renamed `placeholder` prop of `Input` to `Billboard label`

```tsx
<FormField 
  control={form.control}
  name="label"
  render={({field}) => (
    <FormItem>
      <FormLabel>Label</FormLabel>
      <FormControl>
        <Input disabled={loading} placeholder="Billboard label" {...field}/>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

#### Conditionally render the delete button

Currently, the Create billboard page still has the delete button. We want to only render the delete Button if `initialData` is defined.

```tsx
{initialData && (
  <Button
    disabled={loading}
    variant="destructive"
    size="icon"
    onClick={() => setOpen(true)}
  >
    <Trash className="h-4 w-4" />
  </Button>
)}
```

### Image Upload - Using Cloudinary

We are going to need a component for Image Upload. Before that, we need to set up a [Cloudinary](https://cloudinary.com/) account. If it asks what best describes you, select that you are a developer.

After signing up, go ahead and click the Dashboard tab. We should be in a page with `Product Environment Credentials`.

We will also need [Next Cloudinary](https://next.cloudinary.dev/). We can select installation.

1. Install Next Cloudinary

```sh
npm install next-cloudinary
```

2. Configuration

Add the following variable to your `.env` file.

```sh
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<Your Cloud Name>"
```

You can find your cloud name in the cloudinary Dashboard.

### `ImageUpload` component

Navigate to `ecommerce-admin\components\ui` and create a file named `ImageUpload.tsx`.

It will be a client component.

```tsx
"use client";

import React from 'react';

const ImageUpload = () => {
  return (
    <div>ImageUpload</div>
  )
}

export default ImageUpload
```

#### Setting up `ImageUpload`

- mark as `client`
- This component will both upload an image and display those uploaded images
- `interface` for props
- assign props
  - optional `disabled`, `onChange`, `onRemove` and `value`
  - `disabled` just a boolean that disables
  - `onChange` function that takes a string `value`
  - `onRemove` function that takes a string `value`
  - `value` an array of `string` to display multiple images at once
- Add our `useEffect` mount trick to protect against Hydration errors

```tsx
"use client";

import React, { useEffect, useState } from 'react';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value
}) => {
  // Declare isMounted state variable and initialize it to false
  const [isMounted, setIsMounted] = useState(false);

  // useEffect hook to set isMounted variable to true
  // Delays the execution of client-side-only code until after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []); // Only run once after the initial render

  // Prevent rendering of the component before the effect has run
  // To protect from hydration errors or unwanted flashes of content
  if (!isMounted) {
    return null;
  }

  return (
    <div>ImageUpload</div>
  )
}

export default ImageUpload
```

#### Upload function

```tsx
  // Upload event handler
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  }
```

The paramater is `result` which is a type of `any` because Cloudinary does not have the typings.

Passes a `result.info.secure_url` to `onChange` because that is the result we needed after the image was uploaded using the Next Cloudinary component. That is the information we find out when we console.log the `result`.

Make sure the `isMounted` null check is *below* `ImageUpload`.

```tsx
  // Upload event handler
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  }
  
  // Prevent rendering of the component before the effect has run
  // To protect from hydration errors or unwanted flashes of content
  if (!isMounted) {
    return null;
  }
```

#### Output of `ImageUpload`

We want a `div` that serves as a container for the Images. We need a mapping of each image to display them.

```tsx
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button
               type="button"
               onClick={() => onRemove(url)} 
               variant="destructive"
               size="icon"
              > 
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
```

Next, inside each image is a delete button which will have its `onClick` as `onRemove(url)`.

The last thing to map is the `Image` component, we import from `next/image`.

```tsx
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 aboslute top-2 right-2">
              <Button
               type="button"
               onClick={() => onRemove(url)} 
               variant="destructive"
               size="icon"
              > 
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image 
              fill
              className="object-cover"
              alt="Image"
              src={url}
            />
          </div>
        ))}
      </div>
    </div>
  )
```

#### Connecting to Cloudinary

The first thing we want to make is the Upload functionality using `CldUploadWidget` from Cloudinary.

[Next Cloudinary - CldUploadWidget](https://next.cloudinary.dev/clduploadwidget/basic-usage)

Still inside the main `div` the element right after the mapping will be `<CldUploadWidget>`. Pass in the upload event handler to `onUpload` prop. And an `uploadPreset` prop.

```tsx
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        // ... Mapping images here
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="">
      </CldUploadWidget>
    </div>
  )
}
```

There are two options when using the CldUploadWidget: signed and unsigned. These options allow you to control the amount of security and restrictions you place on uploads.

[Signed & Unsigned upload](https://cloudinary.com/documentation/upload_images#uploading_assets_to_the_cloud)

##### Adding `uploadPreset`

What do we put in `uploadPreset`?

Go to Cloudinary dashboard and in the lower left corner there is a settings button with a cog icon.

Click on `Upload` under `Product environment settings`.

Then you can scroll down to see `Upload presets`. As a first time cloudinary user, you would probably only have `ml_default`.

Click on `Add upload preset`.

- Signing Mode: Unsigned
- Copy the Upload preset name
- Now go ahead and click `Save` in the top right.

The upload preset name we will paste it into the `CldUploadWidget`'s `uploadPreset` prop

Now inside the Widget we should open an object that it expects. 

- `{}`

Open the props

- `{()}`

Destructure the `open` immediately

- `{({ open })}`

Return a function

```tsx
{({ open }) => {

}}
```

Inside create a `onClick` function that just invokes `open()` function. 

Then return a `Button` that holds an `ImagePlus` icon from `lucide-react`. This `Button` will open Cloudinary Upload widget.

Also add some text within the `Button` to define what it does, e.g., "Upload an Image".

`ImageUpload.tsx`
```tsx
<CldUploadWidget onUpload={onUpload} uploadPreset="uiyqivqw">
  {({ open }) => {
    const onClick = () => {
      open();
    }

    return (
      <Button
        type="button"
        disabled={disabled}
        variant="secondary"
        onClick={onClick}
      >
        <ImagePlus className="h-4 w-4 mr-2" />
        Upload an Image
      </Button>
    )
  }}
</CldUploadWidget>
```

### Adding ImageUpload to Billboard Form

Navigate to `BillboardForm.tsx`, and copy the `<FormField />` element and paste it right before the `div` with grid.

In the `FormField`,

- rename the `name` to imageUrl
- rename the `label` to Background image
- Replace `Input` with `ImageUpload` component
- Pass in values to `ImageUpload`

```tsx
// ...
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
    <FormField
      control={form.control}
      name="imageUrl"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Background image</FormLabel>
          <FormControl>
            <ImageUpload 
              value={field.value ? [field.value] : []}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <div className="grid grid-cols-3 gap-8">
// ...
```

Pass in the necessary props to `ImageUpload`

- `value` will be the either `field.value` wrapped in an array or an empty array
  - Billboard only takes one image, but `ImageUpload` expects an array of images
  - Current Billboard has no images, pass in an empty array
- `disabled` prop is based on `loading`
- `onChange` has a function that passes `url` parameter to `field.onChange(url)`
- `onRemove` has no parameters and just passes an empty string to `field.onChange("")` to remove the `url`

```tsx
<ImageUpload 
  value={field.value ? [field.value] : []}
  disabled={loading}
  onChange={(url) => field.onChange(url)}
  onRemove={() => field.onChange("")}
/>
```

### Trying out the ImageUpload

```sh
npm run dev
```

Navigate to Store > Billboards > Create New Billboard

Click on Upload image.

#### Issue: Unhandled Runtime Error - next/image

We get an "Unhandled Runtime Error"

```sh
Unhandled Runtime Error
Error: Invalid src prop (https://res.cloudinary.com/dkepcyjuy/image/upload/v1694969684/wd9xbby7vut4zi1mdipw.jpg) on `next/image`, hostname "res.cloudinary.com" is not configured under images in your `next.config.js`
See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host
```

This is because we are using the `Image` component from `next/image`, inside our `ImageUpload` component.

Whenever we use `Image` component, and when we use an *external URL* (i.e.,  foreign sources and hosts such as Cloudinary), we must add it to [remotePatterns](https://nextjs.org/docs/app/api-reference/components/image#remotepatterns) in `next.config.js`.

- [NextJS - App Router - Image component](https://nextjs.org/docs/app/api-reference/components/image). See [NextJS - Image - src](https://nextjs.org/docs/app/api-reference/components/image#src) section.

- [NextJS - Image - remotePatterns](https://nextjs.org/docs/app/api-reference/components/image#remotepatterns)

*Fix:* Navigate to `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
```

Now according to the [Next Image Unconfigured Host](https://nextjs.org/docs/messages/next-image-unconfigured-host), here is how we add 

res.cloudinary.com

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '',
      },
    ],
  }
}

module.exports = nextConfig
```

##### Update - Misconfiguration in `next.config.js`

The above next config caused an issue, see #### Issue: Unhandled Runtime Error - TypeError: Expected a non-empty string. The fix is to remove the empty `port` and `pathname`.

#### Parsing error: Cannot find module 'next/babel'

In the `next.config.js` we may have another error that looks like this:

```sh
Parsing error: Cannot find module 'next/babel'
Require stack:
- C:\Users\...
- ...
```

*Fix:* Navigate to `.eslintrc.json` that contains:

```json
{
  "extends": "next/core-web-vitals"
}
```

Replace it with:

```json
{
  "extends": ["next/babel","next/core-web-vitals"]
}
```

### Testing ImageUpload

Now uploading an image should create an image with a delete button in the top right.

Now we need to modify the routes inside `BillboardForm`.

### Modifying routes in `BillboardForm`

Navigate back to `ecommerce-admin\app\(dashboard)\[storeId]\(routes)\billboards\[billboardId]\components\BillboardForm.tsx`.

#### Submit Handler

Quite similar to the submit handler of the `SettingsForm`, with the following changes:

1. if clause checks for `initialData` to decide whether to create or update
  - Update is a `patch`
  - Create is a `post`
2. Pass in the `toastMessage` into `toast.success`

```tsx
  // 2. Define a submit handler
  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        // Update specific Billboard
        await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
      } else {
        // Create new Billboard
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }
      // Re-synchronize server component that fetches our store
      // Re-initializes the updated `initialData`
      router.refresh();
      // Success notification with dynamic message
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
```

#### Delete Handler

1. Change the route in `axios.delete`
2. Change notification messages for success and delete
  - A Billboard cannot be delete if they have an active category

```tsx
  // 3. Define a delete handler
  const onDelete = async () => {
    try {
      setLoading(true);
      // Call an API with dynamic route to delete the store
      await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
      // Re-synchronize server component to update data
      router.refresh();
      // Push user back to root layout where we check if there is another existing store
      router.push("/");
      toast.success("Billboard deleted.");
    } catch (error) {
      // Safety mechanism will prompt a warning to delete any related records to the Billboard
      toast.error("Make sure you removed all categories using this billboard first.");
    } finally {
      setLoading(false);
      // Close the Modal
      setOpen(false);
    }
  };
```

### Creating API routes for Billboard

Notice in the routes we updated:

Submit Handler routes for `BillboardForm`
```tsx
if (initialData) {
  // Update specific Billboard
  await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
} else {
  // Create new Billboard
  await axios.post(`/api/${params.storeId}/billboards`, data);
}
```

Delete Handler routes for `BillboardForm`
```tsx
await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
```

The route are `/api/${params.storeId}/billboards` and `/api/${params.storeId}/billboards/${params.billboardId}`.

We immediately go to the `storeId` after `api`.

So create a folder named `[storeId]` inside `ecommerce-admin\app\api`.

Inside `[storeId]` create a folder named `billboards`, with a file named `route.ts`.

We need to create a `POST` route, a `PATCH` route & a `DELETE` route.

Go ahead an copy the code from `ecommerce-admin\app\api\stores\route.ts`.

#### `POST` route for Billboard

- Get `params` with `storeId` inside `POST`
- Authenticate `userId`
  - `userId` check is "Unauthenticated" message
- Extract `label` and `imageUrl` from `body`
  - Check for each field
- Check for `storeId`, taken from `params`
- Check if current user also permission to modify the current store
  - Return a 403 Forbidden response if user does not have the `storeId`
- Create billboard with `prismadb` and pass in data: `label`, `imageUrl` and `storeId`

`ecommerce-admin\app\api\[storeId]\billboards\route.ts`
```tsx
// Global Imports
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // Use Clerk to authenticate POST route
    const { userId } = auth();

    // Send back 401, unauthenticated if user is not logged-in
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    // Extract the body
    const body = await req.json();

    // Destructure fields out of body
    const { label, imageUrl } = body;

    // Check label field
    if (!label){
      return new NextResponse("Label is required", { status: 400 });
    }

    // Check imageUrl field
    if (!imageUrl){
      return new NextResponse("Image URL is required", { status: 400 });
    }

    // Check if storeId exists
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // Check database if store exists for current user
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    // User is logged-in but does not have permission to modify the store
    if (!storeByUserId) {
      // Respond with 403 Forbidden, current user is unauthorized to modify
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Create billboard for user's specific store in the database
    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId
      }
    });

    // Send back response with the billboard
    return NextResponse.json(billboard);
  } catch (error){
    console.log('[BILLBOARDS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
```

#### `GET` route for *all* Billboards

Copy the `POST` function and paste it inside the same file `route.ts`. Rename it to `GET`.

This function will get all the Billboards available within that store. So it will need the `params.storeId`.

```tsx
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // Check if storeId exists
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // Find all billboards available in that store in the database
    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId
      }
    });

    // Send back response with all billboards
    return NextResponse.json(billboards);
  } catch (error){
    console.log('[BILLBOARDS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
```

#### Routes for a *specific* Billboard

Create a folder named `[billboardId]` in `billboards` with a `route.ts` file.

This will contain both a `PATCH` and `DELETE` function, quite similar to `[storeId]/route.ts`.

##### `PATCH` for *specific* Billboard

- Extract params in function, then open up `try..catch`
- `params` will contain `storeId` & `billboardId`
  - Check for required `params`
- Authenticate user
- Extract `data` from `body`
  - `data` includes `label` and `imageUrl`
  - Check for each data field
- Check db if store exists for current user, send back 403 if false
- In db, find specific billboard then update
- Update final response and error message

`ecommerce-admin\app\api\[storeId]\billboards\[billboardId]\route.ts`
```ts
export async function PATCH (
  req: Request,
  { params }: { params: { storeId: string, billboardId: string }}
){
  try {
    // Check parameters
    if (!params.storeId){
      return new NextResponse("Store id is required", { status: 400 });
    }

    if (!params.billboardId){
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    // Authenticate userId with Clerk to check if user is logged-in
    const { userId } = auth();
    
    // If userId does not exist send back 401 response
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    // Extract body from the request
    const body = await req.json();
    
    // Destructure data from body
    const { label, imageUrl } = body;

    // Check data
    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    // Check database if store exists for current user
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    // User is logged-in but does not have permission to modify the store
    if (!storeByUserId) {
      // Respond with 403 Forbidden, current user is unauthorized to modify
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Find and Update a specific Billboard
    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId
      },
      data: {
        label,
        imageUrl
      }
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
```
##### `DELETE` for *specific* Billboard

- All steps are similar in `PATCH` except for the `body` `data` extraction
- Use `prismadb.billboard.deleteMany`

```ts
export async function DELETE (
  req: Request,
  { params }: { params: { storeId: string, billboardId: string }}
){
  try {
    // Check parameters
    if (!params.storeId){
      return new NextResponse("Store id is required", { status: 400 });
    }

    if (!params.billboardId){
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    // Authenticate userId with Clerk to check if user is logged-in
    const { userId } = auth();
    
    // If userId does not exist send back 401 response
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    // Check database if store exists for current user
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    // User is logged-in but does not have permission to modify the store
    if (!storeByUserId) {
      // Respond with 403 Forbidden, current user is unauthorized to modify
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Find and Delete Billboard
    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId
      }
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
```

##### `GET` route for specific billboard

The GET route just needs `billboardId` in parameters. Also uses `prismadb.billboard.findUnique()`.

```ts
export async function GET (
  req: Request,
  { params }: { params: { billboardId: string }}
){
  try {
    // Check parameters
    if (!params.billboardId){
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    // Find the specific Billboard in database
    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      }
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
```

### Testing the Routes

Navigate back to `BillboardForm.tsx`, click the upload widget and choose an image.

Click F12 for developer tools in the browser, click Network tab. Check "Preserve log".

Now click the "Create" and check the tab for "billboards". We should see the Request payload and the Response. We should see an object with all the properties from `id`, `storeId`, `label` and `imageUrl`.

Copy that `id` from the response and replace the `new` inside the URL. 

We should be able to go to the Edit Billboard page. Check the image and label if the data was transmitted properly. Now modify the label and click save changes.

#### Issue: Unhandled Runtime Error - TypeError: Expected a non-empty string

Problem: After uploading an image using Cloudinary's `CldUploadWidget`, we get a "Unhandled Runtime Error. Type Error: Expected a non-empty string".

More Details:
```sh
Unhandled Runtime Error
TypeError: Expected a non-empty string

Call Stack
picomatch.makeRe
node_modules\next\dist\compiled\micromatch\index.js (15:21411)
micromatch.makeRe
node_modules\next\dist\compiled\micromatch\index.js (15:2586)
Next.js
Array.some
<anonymous>
Next.js
Array.map
<anonymous>
Next.js
renderWithHooks
node_modules\next\dist\compiled\react-dom\cjs\react-dom.development.js (10707:0)
// ...
```

Fixes:

- Attempt 1: Update Next.js and core packages

```sh
npm i next@latest react@latest react-dom@latest eslint-config-next@latest 
```

- Attempt 2: Check misconfiguration in `next.config.js`

Currently, `next.config.js` is:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '',
      },
    ],
  }
}

module.exports = nextConfig
```

The issue may be because of the empty `port` and `pathname`.

So updated it to be:

```js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  }
}
```

#### Issue: `ImageUpload` optimizations

- Delete button is not loading for Image, so an issue with the styles was found. Typo with `absolute`

#### Feature - after creating or editing a Billboard, redirect to Billboards page

Navigate to the submit handler of the `BillboardForm`.

Before the `toast.success()`, push the router to `billboards` route.

`BillboardForm.tsx`
```tsx
  // 2. Define a submit handler
  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        // Update specific Billboard
        await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
      } else {
        // Create new Billboard
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }
      // Re-synchronize server component that fetches our store
      // Re-initializes the updated `initialData`
      router.refresh();
      // Re-route the user to the Billboards page
      router.push(`/${params.storeId}/billboards`)
      // Success notification with dynamic message
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
```

While we are still in `BillboardForm` remove any unused items:

- `ApiAlert` import
- `origin` and `useOrigin`

## Data Table

Let's create the Data Table to load all our Billboards.

### Billboards Page

Navigate to `ecommerce-admin\app\(dashboard)\[storeId]\(routes)\billboards\page.tsx`, where we added the `BillboardClient`.

Use prisma to fetch all existing billboards specific to the active store.

- Mark as async
- Destructure params
- Use `prismadb.billboard.findMany()`

```tsx
import prismadb from '@/lib/prismadb';

const BillboardsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  // Fetch all Billboards specific to the active store
  const billboards = await prismadb.billboard.findMany();
```

Now let's add an object to pass into `findMany()`.
  - `where` contains `storeId`
  - `orderBy` `createdAt` descending, so we order billboards by newest

```ts
const BillboardsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  
  // Fetch all Billboards specific to the active store
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
```

Now we can pass in the data to the `BillboardClient`.

```tsx
// ...
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={billboards}/>
      </div>
    </div>
  );
}
```

#### Dynamically render the Billboards title

Navigate to `ecommerce-admin\app\(dashboard)\[storeId]\(routes)\billboards\components\client.tsx` and lets add the interface for the props.

- Describe the shape and type of the props you want to pass to the component
- Then tell TypeScript that your component is a function component that accepts props of the specified interface type.

```tsx
interface BillboardClientProps {
  data: Billboard[]
}

// Client component that loads all our Billboards
const BillboardClient: React.FC<BillboardClientProps> = ({
  data
}) => {
```

Change the hardcoded string in the `title` prop of `Heading`, and add dynamic text.

```tsx
<Heading
  title={`Billboards (${data.length})`}
  description="Manage billboards for your store"
/>
```

### Data Table - Preface

Now we can finally move on to creating the Data Table.

[shadcn/ui - Data Table](https://ui.shadcn.com/docs/components/data-table)

There is an introduction in the shadcn docs on *data table*. 

They all behave differently, have specific sorting and filtering requirements, and work with different data sources.

It doesn't make sense to combine all of these variations into a single component. If we do that, we'll lose the flexibility that [headless UI](https://tanstack.com/table/v8/docs/guide/introduction#what-is-headless-ui) provides.

So instead of a data-table component, shadcn/ui recommends bulding your own starting from the basic `<Table />` and building up from there.

#### Headless UI

[headless UI](https://tanstack.com/table/v8/docs/guide/introduction#what-is-headless-ui)

**Headless UI** is a term for libraries and utilities that provide the logic, state, processing and API for UI elements and interactions, but **do not provide markup, styles, or pre-built implementations.**

Headless UI main goals:

The hardest parts of building complex UIs usually revolve around state, events, side-effects, data computation/management. By removing these concerns from the markup, styles and implementation details, our logic and components can be more modular and reusable.

Building UI is a very branded and custom experience, even if that means choosing a design system or adhering to a design spec. To support this custom experience, component-based UI libraries need to support a massive (and seemingly endless) API surface around markup and style customization. Headless UI libraries decouple your logic from your UI

When you use a headless UI library, the complex task of **data-processing, state-management, and business logic** are handled for you, leaving you worry about higher-cardinality decisions that differ across implementations and use cases.

##### Component-based libraries vs Headless libraries

In the ecosystem of table/datagrid libraries, there are two main categories:

- Component-based table libraries
- Headless table libraries

Which kind of table library should I use?

Each approach has subtle tradeoffs. Understanding these subtleties will help you make the right decision for your application and team.

###### Component-based Table Libraries

Component-based table libraries will typically supply you with a feature-rich drop-in solution and ready-to-use components/markup complete with styles/theming. [AG Grid](https://ag-grid.com/react-data-grid/?utm_source=reacttable&utm_campaign=githubreacttable) is a great example of this type of table library.

Pros:

- Ship with ready-to-use markup/styles
- Little setup required
- Turn-key experience

Cons:

- Less control over markup
- Custom styles are typically theme-based
- Larger bundle-sizes
- Highly coupled to framework adapters and platforms

Use case:

**If you want a ready-to-use table and design/bundle-size are not hard requirements**, then you should consider using a component-based table library.

There are a lot of component-based table libraries out there, but we believe AG Grid is the gold standard and is by far our favorite grid-sibling.

###### Headless Table Libraries

Headless table libraries will typically supply you with functions, state, utilities and event listeners to build your own table markup or attach to existing table markups.

Pros:

- Full control over markup and styles
- Supports all styling patterns (CSS, CSS-in-JS, UI libraries, etc)
- Smaller bundle-sizes
- Portable. Run anywhere JS runs!

Cons:

- More setup required
- No markup, styles or themes provided

Use case:

**If you want a lighter-weight table or full control over the design**, then you should consider using a headless table library.

There are very few headless table libraries out there and obviously, TanStack Table is our favorite!

### Data Table - Implementation

Our Data Table will have a completely unique implementation.

Do we want to have the following features?

- Filter
- Checkbox
- Sort
- Columns
- Pagination

So let's start by building the [TanStack Table](https://tanstack.com/table) while using the [shadcn/ui - Table](https://ui.shadcn.com/docs/components/table) to build our own custom data table.

Follow along the steps in [shadcn/ui - Data Table](https://ui.shadcn.com/docs/components/data-table) documentation.

#### Installation

1. Add the [<Table />](https://ui.shadcn.com/docs/components/table) component

```sh
npx shadcn-ui@latest add table
```

2. Add `tanstack/react-table` dependency

```sh
npm install @tanstack/react-table
```

#### Project Structure

We can see from the sample project structure

```sh
app
└── payments
    ├── columns.tsx
    ├── data-table.tsx
    └── page.tsx
```

In our app, 
  - `columns` is something we will create
  - `data-table` is a re-usable global component
  - `page` is our `client`

#### Basic Table

Let's start by building a basic table.

1. Column Definitions

First we'll define our columns.

Columns are where you define the core of what your table will look like. They define the data that will be displayed, how it will be formatted, sorted and filtered.

Navigate to `\app\(dashboard)\[storeId]\(routes)\billboards\components` and create a file named `columns.tsx`

```tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]
```

Let's modify the code from the docs to fit our project.

Modify the type that defines the shape of our data. A `BillboardColumn` with the `id`, `label` and `createdAt`. We set `createdAt` as a string, yet in our database it is a Date, so we will format it before we pass it into the Data Table.

```tsx
// This type is used to define the shape of our data.
export type BillboardColumn = {
  id: string
  label: string
  createdAt: string
}
```

Next, modify the `accessorKey` and `header` according to the types we have.

```tsx
export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
]
```

Notice, we do not have the `id` in the `columns`. That is because we will add it later, it will come from actions where we are able to copy the `id`.

##### Format `billboards` before passing it into `BillboardClient`

Create a `formattedBillboards` that is an array of `BillboardColumn`. It will map each billboard to an object with `id`, `label`, and `createdAt`.

- In order to safely convert `createdAt` from a Date to a string, we are going to use a package

[date-fns](https://www.npmjs.com/package/date-fns)

```sh
npm i date-fns
```

- Use the `format()` function by passing in the `Date` as the 1st argument and the format style in the 2nd argument. e.g., `format(new Date(2014, 1, 11), 'yyyy-MM-dd')`

- Finally, pass in the `formattedBillboards` into the client

`app\(dashboard)\[storeId]\(routes)\billboards\page.tsx`
```tsx
// Global Imports
import React from 'react';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';

// Local Imports
import BillboardClient from './components/client';
import { BillboardColumn } from './components/columns';

const BillboardsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  
  // Fetch all Billboards specific to the active store
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Format each Billboard into a BillboardColumn
  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards}/>
      </div>
    </div>
  );
}

export default BillboardsPage;
```