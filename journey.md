# Start of a journey

This will document all the progress and work in creating this project.

# The Design and Setup

This project consists of two parts: 1) E-commerce store front web application & 2) The Admin Dashboard.

These will also include the API Calls.

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

# Admin Dashboard

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

Create a folder named `modals` under `/components`. Then create a file named `store-modal.tsx`, with some template for a functional component.

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
import StoreModal from "@/components/modals/store-modal";

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
./components/modals/store-modal.tsx
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

Let's go to our `/components/modals/store-modal.tsx` file.

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

Let's try to define the form schema through zod in our `store-modal.tsx`:

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

After prisma is installed, we run another command to install [Prisma Client](https://www.npmjs.com/package/@prisma/client):

```sh
npm install @prisma/client
```

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
  createAt  DateTime  @default(now())
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
	`createAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
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
  createAt  DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

We can see that the ones automatically assigned are:

- `id`,`createAt`, and `updatedAt`

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

Navigate to `/components/modals/store-modals.tsx`, and let's add a state variable: `loading`.

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

Now we can try to implement the `onSubmit` handler:

// TODO install axios and work on `onSubmit`