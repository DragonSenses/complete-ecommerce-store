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
- Headless UI

Database
- PostgreSQL
- Prisma (ORM)

(Formerly used for Database)
  - MySQL
  - PlanetScale  

Financial management
- Stripe

Authentication
- Clerk

Promise-based HTTP Client library
- Axios

Pop-ups (toasts)
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
npx shadcn-ui@latest init                                                                                                          
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

## Updating shadcn/ui component

We will need to manually update the project to get the latest changes.

[shadcn/ui - Updating your project](https://ui.shadcn.com/docs/changelog#updating-your-project)

To update our components one needs to run the `add` command again followed by the `--overwrite` argument.

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
    // ... Create Store here
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
    // ... Create Store here
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

# Database

## PostgreSQL

**PostgreSQL** is an advanced, enterprise-class, and open-source **relational database system**. It supports both SQL (relational) and JSON (non-relational) querying. 

refactor: Migrate from Planetscale to PostgreSQL

To quickly get a local PostgreSQL database and prisma working see [Summary: PostgreSQL and Prisma ORM](#summary-postgresql-and-prisma-orm). Read further for more detailed instructions.

### Install local PostgreSQL database

- [Set up a local postgresql database | Prisma](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database)

To install on Windows

1. Get [Windows postgresql installer](https://www.postgresql.org/download/windows/), get the Windows x86-64
2. Go through the installer steps
3. Confirm a password for the PostgreSQL superuser called `postgres`
   - Write this password down physically somewhere to be used later
4. Setup port (default at 5432)
5. Default locale
6. Review the pre installation summary log (can be found in the directory "C:\Program Files\PostgreSQL\16\installation_summary.log" )
7. Finish installation
8. Skip or cancel Stack Builder

docs: Add PostgreSQL installation instructions

### Set up postgreSQL and prisma

docs: Add Prisma setup instructions for PostgreSQL

- [PostgreSQL | Prisma.io](https://www.prisma.io/dataguide/postgresql)
- [Setting up a PostgreSQL database](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database)
- [Connecting to PostgreSQL databases](https://www.prisma.io/dataguide/postgresql/connecting-to-postgresql-databases)
- [Intro to PostgreSQL connection URIs](https://www.prisma.io/dataguide/postgresql/short-guides/connection-uris)
- [Data Sources in Prisma Schema](https://www.prisma.io/docs/orm/prisma-schema/overview/data-sources)

### Set up prisma schema with local database

- [Connection Urls | Prisma docs](https://pris.ly/d/connection-strings)
- [PostgreSQL in prisma connection string](https://www.prisma.io/docs/orm/overview/databases/postgresql)

Create an `.env` file. Add an environment variable for the postgresql connection URI.

Inside the `.env` file create a `DATABASE_URL` variable. This will store the connection URI string to our local database. 

An example connection URI string should be something like this: 

`.env`
```shell
DATABASE_URL="postgresql://johndoe:mypassword@localhost:5432/mydb?schema=public"
```

1. **Provider**: The `provider` specifies the type of database you're connecting to. In this case, it's PostgreSQL.

2. **URL Components**:
   - **User**: `"johndoe"` is the username for the database.
   - **Password**: `"mypassword"` is the password for the user.
   - **Host**: `"localhost"` refers to the machine where the PostgreSQL server is running.
   - **Port**: `5432` is the default port for PostgreSQL.
   - **Database Name**: `"mydb"` is the name of the database.
   - **Schema**: `"public"` specifies the schema within the database.
     - If you omit the schema, Prisma will use the `"public"` schema by default

So, the complete URL connects to a PostgreSQL database with the given credentials and schema. If you're using Prisma, this URL allows Prisma ORM to connect to your database when executing queries with Prisma Client or making schema changes with Prisma Migrate. If you need to make the URL dynamic, you can pass it programmatically when creating the Prisma Client. 

To connect to a PostgreSQL database server, you need to configure a [datasource](https://www.prisma.io/docs/orm/prisma-schema/overview/data-sources) block in your [Prisma schema file](https://www.prisma.io/docs/orm/prisma-schema):

`schema.prisma`
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

The fields passed to the datasource block are:

- `provider`: Specifies the `postgresql` data source connector.
- `url`: Specifies the [connection URL](https://www.prisma.io/docs/orm/overview/databases/postgresql#connection-url) for the PostgreSQL database server. In this case, an [environment variable is used](https://www.prisma.io/docs/orm/prisma-schema/overview#accessing-environment-variables-from-the-schema) to provide the connection URL.

Or without environment variables (not recommended):

```prisma
datasource db {
  provider = "postgresql"
  url      = "postgresql://johndoe:mypassword@localhost:5432/mydb?schema=public"
}
```

#### Connection URI strings

- [Connection Urls | Prisma docs](https://pris.ly/d/connection-strings)

- [Intro to PostgreSQL connection URIs](https://www.prisma.io/dataguide/postgresql/short-guides/connection-uris)

Let's look at the spec for a PostgreSQL connection URI:
```sh
postgres[ql]://[username[:password]@][host[:port],]/database[?parameter_list]

\_____________/\____________________/\____________/\_______/\_______________/
     |                   |                  |          |            |
     |- schema           |- userspec        |          |            |- parameter list
                                            |          |
                                            |          |- database name
                                            |
                                            |- hostspec
```

We can test a PostgreSQL connection string in the terminal by running the command `pg_isready`

```sh
pg_isready -d DATABASE_NAME -h HOST_NAME -p PORT_NUMBER -U DATABASE_USER
```

##### **Important** Connection URL for PostgreSQL must percentage-encode special characters!

For MySQL, PostgreSQL and CockroachDB you must [percentage-encode special characters](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding) in any part of your connection URL - including passwords. For example, `p@$$w0rd` becomes `p%40%24%24w0rd`.

For Microsoft SQL Server, you must escape special characters in any part of your connection string.

### Summary: PostgreSQL and Prisma ORM

Steps to quickly set up a local postgreSQL database and get it to work with prisma client:

- Install PostgreSQL with username and password credentials.
- Set up a local database, name it `ecommerce-store`
- **Configure the Prisma Schema**
  ```prisma
  datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  }

  generator client {
    provider = "prisma-client-js"
  }
  ```
- Using the schema, postgreSQL credentials and database name we can create a [connection string](https://pris.ly/d/connection-strings) for the prisma client
  - Remeber that your password must be [percentage-encoded](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding)
- Create the **Connection string/Connection URI**
  - Given a username of `postgresUsername`, a password of `p@$$w0rd`, a local host on port `5432` and a database named `ecommerce-store` here is the PostgreSQL connection URI:
  - `postgres://postgresUsername:p%40%24%24w0rd@localhost:5432/ecommerce-store`
- In `.env` file create the environment variable `DATABASE_URL` and set the value to the **Connection URI**

  ```.env
  DATABASE_URL="postgres://postgresUsername:p%40%24%24w0rd@localhost:5432/ecommerce-store"
  ```

feat: Set up PostgreSQL database for Prisma Client

- Install PostgreSQL with credentials
- Create a local database named "ecommerce-store"
- Configure Prisma Schema with PostgreSQL data source
- Generate a connection string for Prisma Client
- Remember to percentage-encode the password
- Set the DATABASE_URL environment variable in .env

## Prisma ORM

**Prisma** is a next-generation **object-relational mapper (ORM)** for Node.js and TypeScript. Unlike traditional ORMs, Prisma uses a custom **Schema Definition Language (SDL)** that automatically handles migrations and generates type-safe code. It simplifies database access by providing a type-safe query builder and auto-generator, making it easier for developers to work with databases and build faster, more reliable applications.

- [prisma](https://www.npmjs.com/package/prisma)

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

We can also see that our `.env` file has a new change. It preserved our current environment variables and added a comment & variable `DATABASE_URL="..."`.

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

## Database Models

The Prisma schema is a declarative way to define your application models and map them to your database. The Prisma schema is independent of the database provider you choose, so you can use the same syntax and logic to define your models for MySQL or PostgreSQL. 

However, there may be some differences in how Prisma handles certain features or data types depending on the database provider. For example, PostgreSQL supports enums and arrays, while MySQL does not. Prisma will automatically generate the appropriate SQL code for each database provider based on your Prisma schema.

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
npx prisma generate                                                                                                  
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
npx prisma db push                                                                                                 
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
Datasource "db": MySQL database "ecommerce-admin" at "aws.connect.psdb.cloud"

Your database is now in sync with your Prisma schema. Done in 4.60s

✔ Generated Prisma Client (5.1.1 | library) to .\node_modules\@prisma\client in 52ms
```

We can check our local database to see that we have 1 Table. We can do this with a database management tool such as [pgAdmin](https://www.pgadmin.org/) or [DBeaver](https://dbeaver.io/).

We can see a `Store` table:

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

## Database Providers

A database provider allows us to host our project online. Choose one to host our SQL or PostgreSQL database and set it up with Prisma.

### Neon tech

We can use postgresql with [neon tech](https://neon.tech/docs/connect/connect-from-any-app).

### (Optional) Database providers

We can host our database online with database providers. Here are some free or affordable options:

1. **Supabase**: Offers a fantastic free tier with PostgreSQL, authentication, real-time subscriptions, and storage. It's an open-source alternative to Firebase
2. **Neon**: Fully managed serverless platform with a free tier, providing autoscaling, branching, and unlimited storage
3. **Turso**: Offers a generous free tier with SQLite, especially known for ultra-low latency edge deployments
4. **CockroachDB**: Provides a free tier with distributed SQL, suitable for most hobby projects
5. **AWS RDS**: AWS offers free usage (750 hours and 20GB storage) for Amazon RDS with MySQL, MariaDB, and PostgreSQL

### (Optional) PlanetScale

**Update note (2024)**: This project formerly relied on planetscale, a MySQL database platform, because it included a free tier and expedited development time. The **planetscale** team **removed their Hobby plan — a free tier** developers used to manage and deploy their serverless databases. Therefore this project was refactored to use a local PostgreSQL database instead. This section is preserved here for posterity.

- [What is PlanetScale?](https://planetscale.com/docs/concepts/what-is-planetscale)

- [planetscale](https://planetscale.com/)

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

# API Routes

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
      return new NextResponse("Store ID is required", { status: 400 });
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
      return new NextResponse("Store ID is required", { status: 400 });
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
      return new NextResponse("Store ID is required", { status: 400 });
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
  provider = "postgresql"
  url      = env("DATABASE_URL")
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
  provider = "postgresql"
  url      = env("DATABASE_URL")
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

#### Push new `schema.prisma` to database

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
      // Refresh current route to make new request to server
      // Re-fetch data requests & re-render server components
      // Re-initializes initialData
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
      return new NextResponse("Store ID is required", { status: 400 });
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
      return new NextResponse("Store ID is required", { status: 400 });
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
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!params.billboardId){
      return new NextResponse("Billboard ID is required", { status: 400 });
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
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!params.billboardId){
      return new NextResponse("Billboard ID is required", { status: 400 });
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
      return new NextResponse("Billboard ID is required", { status: 400 });
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
      // Refresh current route to make new request to server
      // Re-fetch data requests & re-render server components
      // Re-initializes initialData
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

1. Add the [`<Table />`](https://ui.shadcn.com/docs/components/table) component

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

### Basic Table

Let's start by building a basic table.

#### **1. Column Definitions**

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

##### Fix the `BillboardClient` props

```tsx
import { BillboardColumn } from "./columns";

interface BillboardClientProps {
  data: BillboardColumn[]
}
```

#### **2. `<DataTable />` component**

Next, create a `DataTable` component to render our table.

Inside `\components\ui`, create the file `data-table.tsx`

```tsx
"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
```

#### **3. Render the table**

Finally, we'll render our table in our page component.

Let's render the `DataTable` like this:

```tsx
<DataTable columns={columns} data={data} />
```

Now back to the `BillboardClient`, in `client.tsx`,
```tsx
"use client";

// Global Imports
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

// Local Imports
import { BillboardColumn, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface BillboardClientProps {
  data: BillboardColumn[]
}

// Client component that loads all our Billboards
const BillboardClient: React.FC<BillboardClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
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
      <DataTable columns={columns} data={data}/>
    </>
  )
}

export default BillboardClient;
```

### Enhance the Data Table

We will now add more features to our Data Table to make it more advanced.

[shadcn/ui - Data Table](https://ui.shadcn.com/docs/components/data-table)

The documentation has these features:

- Cell Formatting
- Row Actions
- Pagination
- Sorting
- Filtering
- Visibility
- Row Selection

What do I want currently?

1. Search Option
2. Pagination
3. Row Actions - individual action for each row item

#### ***Pagination***

Next, we'll add pagination to our table.

##### **1. Update `<DataTable />`**

```tsx
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  // ...
}
```

We have to add `getPaginationRowModel` then add it as a property to the object we pass into `useReactTable()`.

1. import getPaginationRowModel from `"@tanstack/react-table"`
2. Add property `getPaginationRowModel` with its value as a function call, `getPaginationRowModel()`, to the object passed into `useReactTable` 

This will automatically paginate your rows into pages of 10. See the [pagination docs](https://tanstack.com/table/v8/docs/api/features/pagination) for more information on customizing page size and implementing manual pagination.

##### **2. Add Pagination Controls**

We can add pagination controls to our table using the `<Button />` component and the `table.previousPage()`, `table.nextPage()` API methods.

The code sample:
```tsx
import { Button } from "@/components/ui/button"

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          { // .... }
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
```

Updating our Data Table with pagination controls,

1. import `Button`

```tsx
import { Button } from "@/components/ui/button";
```

2. Wrap entire Data Table with a `div`
3. Add the pagination controls at the end of `</div>` that contains the `</Table>`

The pagination controls:

```tsx
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
```

So what is added? A `div` with `flex items-center justify-end`, with two `Button`s:
  - A "Previous" `Button`
  - A "Next" `Button`

Now in our project, when we have more than 10 billboards the buttons will be activated.

> See [Reusable Components](https://ui.shadcn.com/docs/components/data-table#reusable-components) section for a more advanced pagination component.

#### ***Filtering***

Let's add filtering so we can *search* through our billboard labels.

This adds a search input to filter a field in our table.

##### **1. Update `<DataTable>`**

The code sample that adds a search input to filter emails in our table.

`app/payments/data-table.tsx`
```tsx
"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>{ ... }</Table>
      </div>
    </div>
  )
}
```

To add filtering for our Data Table:

1. Import `ColumnFiltersState` and `getFilteredRowModel` from `"@tanstack/react-table"`

2. `import { Input } from "@/components/ui/input"`

3. Add the state variable `columnFilters` with setter method `setColumnFilters` to `DataTableProps`,

Add this:
```tsx
const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
)
```

Just above the `const table = useReactTable({...})`, we add it to the `DataTableProps`:

```tsx
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
```

###### ReferenceError: React is not defined

We can fix this by importing React

```tsx
import * as React from "react"
```

Or we can be more specific:

```tsx
import React, { useState } from "react";
```

Or we can remove the `React` and just import `useState`

```tsx
import { useState } from "react";
// ...
  // Remove `React` and just have `useState`
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
```

4. Now add the following to the `table`

As properties to the object passed into `useReactTable()`:

- `onColumnFiltersChange: setColumnFilters,`
- `getFilteredRowModel: getFilteredRowModel(),`
- Create a `state`'s object as a property, and inside it is an object with a property named `columnFilters`

```tsx
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })
```

5. Finally, add the *filtering* to the output of `<DataTable />`

We add this code:

```tsx
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
```

Inside the main `div` that wraps the `div` containing the `Table` component. Looks like this:

```tsx
  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>{ ... }</Table>
      </div>
    </div>
  )
}
```

##### **2. Adjust filtering search input to filter dynamically**

The output so far filterings through email in the data table. But our billboards don't email,  so when we try to search it does nothing.

We need to filter by labels. But an even better idea is to filter *dynamically*.

This is not within the docs, but to suit our needs we want to filter our data table through not just one static data field. Sometimes it would be labels, other times a date, we want to filter these things dynamically.

1. Add a `searchKey` to the `DataTable` props and interface

```tsx
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
}: DataTableProps<TData, TValue>) {
```

2. Modify the `Input` prop data

- Change the value of `placeholder`
- Replace instances of `"email"` with `searchKey`

```tsx
  return (
    <div>
      {/* Filtering Search Input */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Search..."
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
```

3. Pass in `searchKey` prop to `DataTable` inside `BillboardClient`

For now, let's set the `searchKey` to "label"

```tsx
const BillboardClient: React.FC<BillboardClientProps> = ({
  data
}) => {
  // ...
  return (
    <>
      // ...
      <Separator />
      <DataTable columns={columns} data={data} searchKey={"label"}/>
    </>
  )
}
```

Now test our filtering search input. It should now filter the data table based on the input in the search bar.

#### ***Cell Actions***

What I want to add is a way to interact with each row. Going to add another column that contains the list of actions that allows the user to edit or delete a row.

*What I did differently:* I'm separating the *Row Actions* logic into a different component called *Cell Actions* instead of placing it all in the Columns definition. We will still be using a Dropdown menu and TanStack table's API.

Where we created the `columns.tsx`, we want to add another component named `cell-action.tsx`.

`app\(dashboard)\[storeId]\(routes)\billboards\components\cell-action.tsx`
```tsx
import React from 'react';

export const CellAction = () => {
  return (
    <div>cell-action</div>
  )
}
```

Now in `columns.tsx`, let's add a column that contains `id` of actions and a function that renders the `<CellAction />`.

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
  {
    id: "actions",
    cell: () => <CellAction />
  },
]
```

Continue working on `CellAction`,

- Mark as client component
- Add interface for props. `data` is of type `BillboardColumn`
- Give `CellAction` the type of `React.FC<CellActionProps>`
- Extract the props, the `data`

```tsx
"use client";

import React from 'react';
import { BillboardColumn } from './columns';

interface CellActionProps {
  data: BillboardColumn
}

export const CellAction: React.FC<CellActionProps> = ({
  data
}) => {
  return (
    <div>cell-action</div>
  )
}
```

Now we can extract the `row` and use `row.original`.

This is from the [TanStack Table docs - Row](https://tanstack.com/table/v8/docs/api/core/row).

Let's go into `columns.tsx` and extract the `row` inside `cell`'s function. Then pass in the data as `row.original`.

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
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
]
```

What `row.original` allows us to do is to work with the "original row object provided to the table." And that original object is the `BillboardColumn` which we defined right before inside the same `columns.tsx`:

```tsx
// This type is used to define the shape of our data.
export type BillboardColumn = {
  id: string
  label: string
  createdAt: string
}
```

It has an `id`, a `label` and a `createdAt`.

##### **Dropdown Menu**

Next we can finally add a `Dropdown` so that we can see the cell actions.

[shadcn/ui - Dropdown Menu](https://ui.shadcn.com/docs/components/dropdown-menu)

```sh
npx shadcn-ui@latest add dropdown-menu
```

##### Update `<CellAction />` component

1. Render `DropdownMenu`

Now back in `cell-action.tsx`, instead of a `div` render a `<DropdownMenu />`

```tsx
export const CellAction: React.FC<CellActionProps> = ({
  data
}) => {
  return (
    <DropdownMenu>
      
    </DropdownMenu>
  )
}
```

2. `import` packages

Let's `import` all the things we may need

```tsx
// Global Imports
import React from 'react';
import { MoreHorizontal } from "lucide-react"
 
// Local Imports
import { BillboardColumn } from './columns';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
```

From here we can follow along the [shadcn/ui docs - Data Table's Row Actions](https://ui.shadcn.com/docs/components/data-table#row-actions) while make the changes we need.

3. Implement output of `DropdownMenu`

- Inside `DropdownMenu`, add the `DropdownMenuTrigger`.
- Then inside the `DropdownMenuTrigger` add a `Button` 
  - Give the `Button` a variant of ghost and className of `h-8 w-8 p-0`
  - Inside make a `span` with a classname of `sr-only` and the child text of "Open menu"
  - `sr-only` class ensures that it is readable by screen readers, an accessibility feature
  - Right after the `span`, and still inside the `Button`, add a `<MoreHorizontal />`

```tsx
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  )
```

4. Add options to `DropdownMenu`

Next we have to give the `DropdownMenu` options. To do that we need to use `DropdownMenuContent`.

- Give it `align="end"`
- Insert `DropdownMenuLabel` within content, and add "Actions" as to label our menu
- Below Label, create a `DropdownMenuItem`, which should allow us to Copy the id of our billboard
- The next `DropdownMenuItem`. Inside it:
  - This item should allow us to *update* or edit, so import and use `Edit` icon from `lucide-react`
  - The text that describes our menu item, for our case it is "Update"
- Another `DropdownMenuItem` should allow us to *delete* the Billboard item

`cell-action.tsx`
```tsx
export const CellAction: React.FC<CellActionProps> = ({
  data
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          Actions
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <Copy className="mr-2 h-4 w-4" />
          Copy ID
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

##### Create the actions for `<CellAction />`

5. Implement the actions for the options to actually happen

Now that we have the actions for our `<DropdownMenu />`, we need to create the functionality for them to operate properly.

###### Cell Action: **Copy**

The first one we can implement is the **Copy** action. We've done something similar to `ApiAlert` component.

```tsx
  // Copy Event Handler
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("Copied to clipboard.");
  }
```

Let's paste this into our `cell-action`, then modify it. It needs to be able to copy the `id` of the `Billboard` in the cell and into the clipboard of the user.

- Give the Copy Event Handler function a parameter of `id` with a type `string`
- Pass the `id` into the clipboard

```tsx
  // Copy Event Handler
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Billboard ID copied to clipboard.");
  }
```

Now link up the copy event handler to the `DropdownMenuItem` for "Copy Id".

```tsx
<DropdownMenuItem onClick={() => onCopy(data.id)}>
  <Copy className="mr-2 h-4 w-4" />
  Copy ID
</DropdownMenuItem>
```

###### Aside: Id vs ID? 

- "ID" means "identification"
- "Id" means "the set of uncoordinated instinctual desires" [Freudian id](https://en.wikipedia.org/wiki/Id,_ego_and_super-ego#Id)

Here we refer to "identification" in our app. The mistake occurs when we apply *camelCase*, a style method to programming, to the word *id*. The correct abbreviation for "identification" is ID, so this one will be used. 

There is a difference between the accepted abbreviation of identication of [ID](https://www.britannica.com/dictionary/ID[2]) and [Id](https://www.britannica.com/dictionary/Id) (as it represents the idea of id) which is a part of a person's unconscious mind that relates to basic needs and desires.

Also for user experience, "Id" can look a lot like "ld" the one with an lowercased "L" which may cause confusion.

- "ID" for any output: text for user, logging, outputting a string, etc.
- "Id" for code, as it follows camel-case convention

###### Cell Action: **Update**

This action should let our user edit the cell's specific Billboard. How they can edit is through the `BillboardForm`. 

This means that we can just redirect the user to the route for the `BillboardForm` but instead of the id set to "/new" it should be "/[billboardId]".

- `import { useParams, useRouter } from 'next/navigation';`
  - Initialize `router` and `params`
- Assign `DropdownMenuItem` for Edit the `router.push()` function to its `onClick`
  - route is `/${params.storeId}/billboards/${data.id}`

```tsx
import { useParams, useRouter } from 'next/navigation';
// ...
export const CellAction: React.FC<CellActionProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <DropdownMenu>
    // ...
        <DropdownMenuItem 
          onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}
        >
          <Edit className="mr-2 h-4 w-4" />
          Update
        </DropdownMenuItem>
```

###### Cell Action: **Delete**

Now the delete cell action would require a delete event handler.

1. Create the delete event handler

- `async`
- `try..catch..finally`
- Needs `loading` and `open` state variables
  - To disable the component during `loading`
  - `open` for confirmation modal
- Needs `axios`
- The logic is just like the delete event handler of `BillboardForm`

```tsx
import axios from 'axios';
import React, { useState } from 'react';

export const CellAction: React.FC<CellActionProps> = ({
  data
}) => {
  // Create router object to perform client-side navigation (pushing to new URL)
  const router = useRouter();
  
  // Hook returns an object containing current route's filled in dynamic parameters
  const params = useParams();

  // Create open state to control the Alert modal
  const [open, setOpen] = useState(false);

  // Create loading state to disable interactive elements
  const [loading, setLoading] = useState(false);

  // Define a delete handler
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

2. Assign delete event handler

Now assign the delete event handler (because it is triggered by an click event on an element `DropdownMenuItem`).

Before that we need to wrap the entire output by a React fragment, so we can safely encapsulate the `AlertModal`.

- Render the `AlertModal` at the top and pass in the right props

```tsx
<>
  <AlertModal 
    isOpen={open}
    onClose={() => setOpen(false)}
    onConfirm={(onDelete)}
    loading={loading}
  />
  //...
</>
```

- Update the delete `DropdownMenuItem`'s `onClick` to open the `AlertModal`

```tsx
<DropdownMenuItem
  onClick={() => setOpen(true)}
>
  <Trash className="mr-2 h-4 w-4" />
  Delete
</DropdownMenuItem>
```

Full output:

```tsx
 return (
    <>
      <AlertModal 
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={(onDelete)}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            Actions
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
```

###### Testing - Cell Action: **Delete**

At this point there are a few issues to take note of.

- Let's use the Billboards page to trigger the delete cell action
- The `AlertModal` opens up, and pressing continue will redirect us to the store route
- Upon checking the Billboards page it seems that the billboard was not deleted.


1. Behavior fix: *Billboard was not deleted.*

- The reason why Billboard was not delete via cell actions was because of the following line of code:

```tsx
await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
```

The route is incorrect because we are using `params.billboardId` instead of `data.Id`. The `params` do not contain the `billboardId` here. We find the `billboardId` inside `data` prop.

Why? Because of our project structure. `CellAction.tsx` is not inside the `[billboardId]`. It is together with the `billboard\components` together with the `client.tsx` where we load all the billboards. Unlike `BillboardForm.tsx` which has access to the dynamic route parameters of `[billboardId]`.

Comparing the routes:
  - `app\(dashboard)\[storeId]\(routes)\billboards\components\cell-action.tsx`
  - `app\(dashboard)\[storeId]\(routes)\billboards\[billboardId]\components\BillboardForm.tsx`

2. Behavior fix: *route is pushed to active store*

We should not re-direct the user to the store page, instead they should stay where the `DataTable` is but refresh the route to re-synchronize the server components.

- Let's remove the `router.push()` in the delete handler. Also change the comments for `router` and `router.refresh()` to reflect the changes.

Note: `router.refresh()` from [Next.js useRouter()](https://nextjs.org/docs/app/api-reference/functions/use-router)

`router.refresh()` is a method that allows you to refresh the current route in Next.js. 

It makes a new request to the server, re-fetches data requests, and re-renders Server Components. 

The client will merge the updated React Server Component payload without losing unaffected client-side React (e.g. useState) or browser state (e.g. scroll position).

This method is useful for cases where you want to update the page after a data mutation or a change in query parameters. 

For example, if you have a page that displays a list of posts and you want to refresh the page after adding a new post, you can use `router.refresh()` to do so. You can also use `router.refresh()` to reload the current URL, which is equivalent to clicking the browser’s refresh button.


3. Behavior fix: the code changes

- Change comment for `router`
- Update API route and its comment. From `params.billboardId` to `data.id`
- Remove `router.push("/")`
- Change comment for `router.refresh()`

```tsx
export const CellAction: React.FC<CellActionProps> = ({
  data
}) => {
  // Create router object to perform client-side navigation
  const router = useRouter();
  
    // Define a delete handler
  const onDelete = async () => {
    try {
      setLoading(true);
      // Call an API with dynamic route to delete the store
      await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
      // Refresh current route to make new request to server
      // Re-fetch data requests & re-render server components
      router.refresh();
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

###### `BillboardForm` delete redirects to `/billboards`

4. Behavior feature: `BillboardForm` delete should redirect back to Billboards

The delete handler of `BillboardForm` and `CellAction` are similar, but have some minor differences.

- `CellAction` should refresh the route, such that after deleting a Billboard we arrive at the Billboards page where the `DataTable` is
- `BillboardForm`, when we navigate to the page to update or delete a Billboard, upon deletion we should *redirect* to the Billboards page where the `DataTable` is

Let's update the delete handler for `BillboardForm`.

- Update the `router.push()` route to billboards page for specific store
- Update comments to reflect new behavior

```tsx
  // 3. Define a delete handler
  const onDelete = async () => {
    try {
      setLoading(true);
      // Call an API with dynamic route to delete the Billboard
      await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
      // Re-synchronize server component to update data
      router.refresh();
      // Navigate back to the specific store's billboards page after deletion
      router.push(`${params.storeId}/billboards`);
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

4.1 `BillboardForm` remove `<Separator />`

Let's also remove the last `Separator` in the output to tidy up our form.

### API List

Next thing we want after Data Table is a list of API calls for our Billboards.

1. `<ApiList />`

Create client component `ApiList` inside `ecommerce-admin\components\ui` folder.

```tsx
"use client";

import React from 'react';

export const ApiList = () => {
  return (
    <div>ApiList</div>
  )
}
```

2. Render `<ApiList />`

Now back inside our `BillboardClient`, in the output:

- Append `<Heading />`
- Append `<Separator />` 
- Append `<ApiList />`

3. Develop `<ApiList />`

- Add interface for props
  - `entityName`, `entityIdName`
- Destructure props in parameters of ApiList
- `params` and `origin`
- Create `baseUrl` using `params` and `origin`

```tsx
// Global imports
import React from 'react';
import { useParams } from 'next/navigation';

// Local imports
import { useOrigin } from '@/hooks/use-origin';
import { ApiAlert } from '@/components/ui/ApiAlert';


interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

export const ApiList: React.FC<ApiListProps> = ({
  entityName,
  entityIdName,
}) => {
  // Safely access the window object, only after the component is mounted
  const origin = useOrigin();

  // Hook returns an object containing current route's filled in dynamic parameters
  const params = useParams();

  // Create base URL for the API call
  const baseUrl = `${origin}/api/${params.storeId}`;
```


4. Return an `<ApiAlert />` in the output

Let's try adding an `ApiAlert` that contains our API call. This will be a public `GET`.

```tsx
  return (
    <>
      <ApiAlert 
        title="GET" 
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
    </>
  )
```

5. Pass in data to `<ApiList />` props inside `BillboardClient`

- Pass in `billboards` and its id as data to `ApiList` inside `BillboardClient`

```tsx
// Client component that loads all our Billboards
const BillboardClient: React.FC<BillboardClientProps> = ({
  data
}) => {
  // ...
  return (
    <>
      // ...
      <Separator />
      <DataTable columns={columns} data={data} searchKey={"label"}/>
      <Heading title="API" description="API calls for Billboards" />
      <Separator />
      <ApiList 
        entityName="billboards"
        entityIdName="billboardId"
      />
    </>
  )
}

export default BillboardClient;
```

6. Add more `ApiAlert` components for other routes

- Add another `GET` but this time for an individual entity
  - Make sure to surround `entityIdName` with a curly brackets to show the user that they need to substitute that text
- Add admin `POST` route, because only admins can POST new routes through the `API`
  - description is the same as `GET` all billboards

`ecommerce-admin\components\ui\ApiList.tsx`
```tsx
  return (
    <>
      <ApiAlert 
        title="GET" 
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert 
        title="GET" 
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert 
        title="POST" 
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
    </>
  )
```

7. Add the PATCH and DELETE routes to `ApiAlert`

```tsx
"use client";

// Global imports
import React from 'react';
import { useParams } from 'next/navigation';

// Local imports
import { useOrigin } from '@/hooks/use-origin';
import { ApiAlert } from '@/components/ui/ApiAlert';

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

export const ApiList: React.FC<ApiListProps> = ({
  entityName,
  entityIdName,
}) => {
  // Safely access the window object, only after the component is mounted
  const origin = useOrigin();

  // Hook returns an object containing current route's filled in dynamic parameters
  const params = useParams();

  // Create base URL for the API call
  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert 
        title="GET" 
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert 
        title="GET" 
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert 
        title="POST" 
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert 
        title="PATCH" 
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert 
        title="DELETE" 
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  )
}
```

With this we reduced code duplication and increased modularity. We can now just add `<ApiList />` to our client and re-use it in other places such as `products` or `categories`.

#### Testing `<ApiList />`

Go ahead and copy the `GET` request for all billboards and paste it to as the URL in the browser.

```sh
http://localhost:3000/api/*YOUR-STORE-ID-HERE*/billboards
```

We should see the response that should contain all our billboards for that specific store.

```json
[
  {
    "id": "5297187f-d293-45dc-9c72-e60fe2e29ca9",
    "storeId": "2ff28da4-0440-48b8-aad1-255159fed78a",
    "label": "fruit-billboard",
    "imageUrl": "https://res.cloudinary.com/dkepcyjuy/image/upload/v1695186366/dt6pwixkibdvr0vk6nsw.jpg",
    "createdAt": "2023-09-20T05:06:30.229Z",
    "updatedAt": "2023-09-27T21:27:20.865Z"
  },
  {
    "id": "f2bb3c25-1e24-4909-868d-b5606f64435b",
    "storeId": "2ff28da4-0440-48b8-aad1-255159fed78a",
    "label": "fruit-board-2",
    "imageUrl": "https://res.cloudinary.com/dkepcyjuy/image/upload/v1695850027/zh5yha1dxw1lytpemzq6.jpg",
    "createdAt": "2023-09-27T21:27:11.830Z",
    "updatedAt": "2023-09-27T21:27:11.830Z"
  }
]
```

We can see that we an array of our billboards. We can copy an individual id , append it to our URL request 

```sh
http://localhost:3000/api/*YOUR-STORE-ID-HERE*/billboards/*individual-id*
```

And get the specific billboard data we need. This is very useful for the front-end when we want to load all billboards or a single billboard just copy the API call.

As for the `admin` routes, we need to add authentication cookies or JWT, or what Clerk needs.

##### Issue: What happens if we are unauthenticated?

Test the scenarios where we call these routes but do not have the authentication to do so.

- Incognito
- Postman
- Insomnia

When we test routes we either get a `null` object and/or `401` unauthorized

Here is the **response** in Postman after making folders that represent our route structure in next.js.


```sh
Response: 401 Unauthorized  Time: 20ms  Size: 224 B
null
```

**Public routes need to actually be *public* so others can see them.**

Output from the terminal of the project during development mode:

```sh
INFO: Clerk: The request to /api/2ff28da4-0440-48b8-aad1-255159fed78a/billboards is being redirected because there is no signed-in user, and the path is not included in `ignoredRoutes` or `publicRoutes`. To prevent this behavior, choose one of:

1. To make the route accessible to both signed in and signed out users, pass `publicRoutes: ["/api/2ff28da4-0440-48b8-aad1-255159fed78a/billboards"]` to authMiddleware
2. To prevent Clerk authentication from running at all, pass `ignoredRoutes: ["/((?!api|trpc))(_next|.+\..+)(.*)", "/api/2ff28da4-0440-48b8-aad1-255159fed78a/billboards"]` to authMiddleware
3. Pass a custom `afterAuth` to authMiddleware, and replace Clerk's default behavior of redirecting unless a route is included in publicRoutes

For additional information about middleware, please visit https://clerk.com/docs/nextjs/middleware
(This log only appears in development mode, or if `debug: true` is passed to authMiddleware)
```

##### **Fix:** make route accessible to both signed-in & signed-out users by **updating the middleware**

As we can see in the terminal message, we can pass `publicRoutes` to `authMiddleware`.

For more information, we can see the docs in [Clerk - NextJS - authMiddleware](https://clerk.com/docs/references/nextjs/auth-middleware).

[Making pages public using publicRoutes](https://clerk.com/docs/references/nextjs/auth-middleware#making-pages-public-using-public-routes), within the docs we have a way to make all routes accessible to all users. This is not the behavior we want exactly, but it's a start.

```tsx
import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  // "/" will be accessible to all users
  publicRoutes: ["/"]
});
 
export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

Under the [Clerk - NextJS - auth-middleware#Options](https://clerk.com/docs/references/nextjs/auth-middleware#options) we can see that the `publicRoutes?` takes in an array of strings `string[]` which contain:

A list of routes that should be accessible without authentication. You can use glob patterns to match multiple routes or a function to match against the request object. For example: `['/foo', '/bar(.*)']` or `[/^\/foo\/.*$/]`.

The sign in and sign up URLs are included by default, unless a function is provided.

Let's look at our `middleware.ts`,

`ecommerce-admin\middleware.ts`
```ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

To the object we pass into `authMiddleware` give it a key of `publicRoutes`. The value to that key is an array containing the string: "/api/:path*".

```ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/api/:path*"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

Now when we try to access the public `GET` route for all billboards of a specific store

```sh
http://localhost:3000/api/2ff28da4-0440-48b8-aad1-255159fed78a/billboards
```

We now get the output we want. A status of 200 OK with our response

```json
[
    {
        "id": "5297187f-d293-45dc-9c72-e60fe2e29ca9",
        "storeId": "2ff28da4-0440-48b8-aad1-255159fed78a",
        "label": "fruit-billboard",
        "imageUrl": "https://res.cloudinary.com/dkepcyjuy/image/upload/v1695186366/dt6pwixkibdvr0vk6nsw.jpg",
        "createdAt": "2023-09-20T05:06:30.229Z",
        "updatedAt": "2023-09-27T21:27:20.865Z"
    },
    {
        "id": "f2bb3c25-1e24-4909-868d-b5606f64435b",
        "storeId": "2ff28da4-0440-48b8-aad1-255159fed78a",
        "label": "fruit-board-2",
        "imageUrl": "https://res.cloudinary.com/dkepcyjuy/image/upload/v1695850027/zh5yha1dxw1lytpemzq6.jpg",
        "createdAt": "2023-09-27T21:27:11.830Z",
        "updatedAt": "2023-09-27T21:27:11.830Z"
    }
]
```

Does that mean every single route is available to the public?

Remember when we built our routes, in our `PATCH` or `DELETE` routes we manually use Clerk to authenticate:

`app\api\stores\[storeId]\route.ts`
```ts
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
```

And in some places, we not only handled authentication but also authorization

`app\api\[storeId]\billboards\route.ts`
```ts
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

    // ... more checks here

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
```

The only routes that are public are the `GET` routes, which is what we need for this project.

Another Postman test: go ahead create a `GET` request for a specific billboard. So copy the id of a billboard and append it to the request.

```sh
http://localhost:3000/api/2ff28da4-0440-48b8-aad1-255159fed78a/billboards/5297187f-d293-45dc-9c72-e60fe2e29ca9
```

We should now see the response of 200 OK and the data inside showing that it also works as well.

## Admin Dashboard Recap

With the final test on our Billboard API calls, we have completed the first *entity* (billboards) for our dashboard. 

### Quality Assurance checks for *Entity*

*quality assurance*: the maintenance of a desired level of quality in a service or product, especially by means of attention to every stage of the process of delivery or production.

Ensure that all things within Billboard are in working order, before we move on to make the next entity (categories).

We are going to re-use a lot of the logic. So a checkbox of features for assurance checks:

- DataTable
- CellAction
  - Update, Delete, Copy events
- Form
- ImgUpload

# Category Entity

The next thing we want to add is the *Category* entity.

## Category Model

Let's add the model to our database. Similar to Billboard model, it should have an unique `id`. A relation to the Store as `store`. `storeId`

`ecommerce-admin\prisma\schema.prisma`
```prisma
model Category {
  id        String  @id @default(uuid())
  store     Store   @relation("StoreToCategory", fields: [storeId], references: [id])
  storeId   String  // relation scalar field (used in the `@relation` attribute)

}
```

We have an error with our `@relation` because we don't have it in the `Store` model. Add `categories` relation to the Store.

```prisma
model Store {
  id         String       @id @default(uuid())
  name       String
  userId     String
  billboards Billboard[]  @relation("StoreToBillboard")
  categories Category[]   @relation("StoreToCategory")
  createdAt  DateTime     @default(now())
  updatedAt  DateTime     @updatedAt
}
```

Then a warning shows:

```sh
With `relationMode = "prisma"`, no foreign keys are used, so relation fields will not benefit from the index usually created by the relational database under the hood. This can lead to poor performance when querying these fields. We recommend adding an index manually. Learn more at https://pris.ly/d/relation-mode-prisma-indexes" 
```

Same fix as `Billboard`, by adding index manually in Category.

```prisma
model Category {
  id        String  @id @default(uuid())
  store     Store   @relation("StoreToCategory", fields: [storeId], references: [id])
  storeId   String  // relation scalar field (used in the `@relation` attribute)

  // Manually add index on relation scalar field
  @@index([storeId])
}
```

Let's continue development of Category. It should also have:

- billboardId
- billboard relation

```prisma
model Category {
  id          String    @id @default(uuid())
  storeId     String    // relation scalar field (used in the `@relation` attribute)
  store       Store     @relation("StoreToCategory", fields: [storeId], references: [id])
  billboardId String
  billboard   Billboard @relation(fields: [billboardId], references: [id])

  // Manually add index on relation scalar field
  @@index([storeId])
}
```

The error:

```
Error validating field `billboard` in model `Category`: The relation field `billboard` on model `Category` is missing an opposite relation field on the model `Billboard`. Either run `prisma format` or add it manually.
```

The fix: add an array of `Category` named `categories` inside `Billboard` model

```prisma
model Billboard {
  id        String    @id @default(uuid())
  storeId   String    // relation scalar field (used in the `@relation` attribute)
  store     Store     @relation("StoreToBillboard", fields: [storeId], references: [id])
  label     String
  imageUrl  String
  categories  Category[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  // Manually add index on relation scalar field
  @@index([storeId])
}
```

Then using the [Prisma VS Code extension](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) the warning is augmented with a Quick Fix that adds the required index for you. According to the [prisma docs](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/relation-mode#indexes).

After the quick-fix, add the following to Category model:
- String `name`
- `createdAt`
- `updatedAt` which uses decorator `@updatedAt`

```prisma
model Category {
  id          String    @id @default(uuid())
  storeId     String    // relation scalar field (used in the `@relation` attribute)
  store       Store     @relation("StoreToCategory", fields: [storeId], references: [id])
  billboardId String
  billboard   Billboard @relation(fields: [billboardId], references: [id])
  name        String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  // Manually add index on relation scalar field
  @@index([storeId])
  @@index([billboardId])
}
```

### Regenerate `prisma` and push to DB

```sh
npx prisma generate

npx prisma db push
```

Database is now in sync with your Prisma schema.

### Add Categories to navigation

Add "categories" within the array of `routes` in the `MainNav`.

`ecommerce-admin\components\MainNav.tsx`
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
      href: `/${params.storeId}/categories`,
      label: 'Categories',
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
```

## Category - project structure

Because they share a similar structure, we can copy the `billboards` folder and paste it into `(routes)` while renaming each instance to category.

```sh
- app
  |- (dashboard)
    |-  [storeId]
      |-  (routes)
        |- billboards
        |- categories
          |- [categoryId]
            |- components
              |- CategoryForm.tsx
            |- page.tsx
          |- components
            |- cell-action.tsx
            |- client.tsx
            |- columns.tsx
          |- page.tsx
```

## Categories Page

Let's modify `categories/page.tsx`, after renaming we get

```tsx
// Global Imports
import React from 'react';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';

// Local Imports
import CategoryClient from './components/client';
import { CategoryColumn } from './components/columns';

const CategoriesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  
  // Fetch all Categories specific to the active store
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Format each Category into a CategoryColumn
  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories}/>
      </div>
    </div>
  );
}

export default CategoriesPage;
```

### Nested reads with Category

[prismadb - relation queries - nested reads](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries).

Notice for our `CategoryColumn`, we changed `label` to `name` but also search for `billboardLabel`. But we get an error:

```sh
Property 'billboard' does not exist on type '{ id: string; storeId: string; billboardId: string; name: string; createdAt: Date; updatedAt: Date; }'. Did you mean 'billboardId'?ts(2551)
```

The fix: we have to include the billboard in the `prismadb` fetch. We have to populate the relation that categories has with the billboard.

When we create our category, we are going to select which billboard we want to use. So we need the object inside

```tsx
  // Fetch all Categories specific to the active store
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      billboard: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
```

This is how we read related data from multiple tabes in the database, in this case a `Category` and that `Category`'s `Billboard`. We do this with the `include` API to include related records in the query response. More about this in the docs here: [Nested reads - prismadb](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#nested-reads).

### `CategoryColumn`

- Rename to CategoryColumn
- `type` contains: `{ id, name, billboardLabel, createdAt}`
- Add proper objects in `columns`, for billboardLabel access the cell with `row.original`

`app\(dashboard)\[storeId]\(routes)\categories\components\columns.tsx`
```tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
export type CategoryColumn = {
  id: string
  name: string
  billboardLabel: string
  createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => row.original.billboardLabel,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
]
```

### `CategoryClient`

Let's change our client component.

- Rename all instances of Billboard to Category and billboards to categories
- Change the `searchKey`


#### Question: Why not create an `Entity` component that can handle both Billboards and Categories?

Its possible to ensure modularity and avoid code reduplication. But the entities may seem similar but they have a few differences. 

We are still in the development stage such that creating a smart, specialized component that handles all entities now may prove to be an *inflexible* approach. There may be subtle or drastic differences to our entities that may require a more specialized component. Plus the benefit of readability and understanding right now is great. 

We can always refactor the code later.

### `CategoryPage`

In our dynamic route `[categoryId]`, let's edit our `page.tsx`.

- Rename to Category

```tsx
// Global Imports
import prismadb from '@/lib/prismadb';
import React from 'react';

// Local Imports
import CategoryForm from './components/CategoryForm';

const CategoryPage =  async ({
  params
}:{
  params: { categoryId: string }
}) => {

  // Fetch an existing category
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category}/>
      </div>
    </div>
  )
}

export default CategoryPage;
```

### `CategoryForm`

-`app\(dashboard)\[storeId]\(routes)\categories\[categoryId]\components\CategoryForm.tsx`
- Rename to Category
- Update interface `initialData` and import `Category`

Next we modify `formSchema`.

```tsx
// Create zod object schema
const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});
```

Then change `defaultValues` to reflect this:

```tsx
  // 1. Define form with useForm hook & zodResolver for validation
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      billboardId: ''
    }
  });
```

- Remove the `FormField` that contains image upload / `imgUrl`
- Also remove the import for `ImageUpload` 

```tsx
import ImageUpload from '@/components/ui/ImageUpload';
// ...
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload 
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
```

- Inside the form output, where we have our first `FormField`
  - rename `"label"` to `"name"`
  - rename the contents of `FormLabel` to `Name`

```tsx
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
```

With the `CategoryForm` cleaned up and ready, we can work on development.

#### `Select` component

We are going to add a select field that provides us the options of existing `billboards` where we can attach the `Category`.


[shadcn/ui - Select](https://ui.shadcn.com/docs/components/select)

- Displays a list of options for the user to pick from—triggered by a button.


1. Install

```sh
npx shadcn-ui@latest add select
```

2. Render `Select` component in `CategoryForm`

- Copy the FormField below the `Name`
- Rename name to billboard id

This `FormField` will control the `billboardId` value from form values. We want to replace the `FormControl` that contains the `Input` and replace this with `Select`.

```tsx
<FormField
  control={form.control}
  name="billboardId"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Billboard ID</FormLabel>
      <Select 
        disabled={loading} 
        onValueChange={field.onChange} 
        value={field.value}
        defaultValue={field.value}
      >
        
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
```

Let's import it all the `Select` modules at once and refactor later.

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
```
Now we want to open up a `FormControl`, a `SelectTrigger` and `SelectValue` each inside the next. The `SelectValue` has props of `defaultValue` and `placeholder`

```tsx
<FormField
  control={form.control}
  name="billboardId"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Billboard ID</FormLabel>
      <Select 
        disabled={loading} 
        onValueChange={field.onChange} 
        value={field.value}
        defaultValue={field.value}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue
            defaultValue={field.value}
            placeholder="Select a billboard"
            >
              
            </SelectValue>
          </SelectTrigger>
        </FormControl>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
```

##### Iterating over billboards that can be selected

Now outside of `</FormControl>` but still inside `</Select>` add the `SelectContent`.

```tsx
// ...
  <FormControl>
    <SelectTrigger>
      <SelectValue
      defaultValue={field.value}
      placeholder="Select a billboard"
      >
        
      </SelectValue>
    </SelectTrigger>
  </FormControl>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>
```

- Inside of `SelectContent` we want to iterate over our billboards that we can select. This will be the `SelectItem`

But how do we do that? **We need to pass in the billboards data.** Before that we need to fetch that data.

1. Navigate back to the page for `[categoryId]`, and in here we need to fetch our billboards. 

- Extract `storeId` from the parameters
- Use `storeId` to fetch the billboards
- Pass the billboards data as a prop to `CategoryForm`

`app\(dashboard)\[storeId]\(routes)\categories\[categoryId]\page.tsx`
```tsx
// Global Imports
import prismadb from '@/lib/prismadb';
import React from 'react';

// Local Imports
import CategoryForm from './components/CategoryForm';

const CategoryPage =  async ({
  params
}:{
  params: { categoryId: string, storeId: string }
}) => {

  // Fetch an existing category
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId
    }
  });

  // Fetch all billboards we can select from
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm 
          billboards={billboards}
          initialData={category}
        />
      </div>
    </div>
  )
}

export default CategoryPage;
```

2. Modify `CategoryForm` prop interface to match the data

So then we need to change the props in `CategoryForm` to match the shape of the data.

```tsx
// Define type and shape of props
interface CategoryFormProps {
  billboards: Billboard[];
  initialData: Category | null;
}
```

3. Extract the props alongside `initialData`

```tsx
const CategoryForm: React.FC<CategoryFormProps> = ({
  billboards,
  initialData
}) => {
```

Now we can map out each billboard as a `SelectItem` within `SelectContent`.

```tsx
// ...
  <SelectContent>
    {billboards.map((billboard) => (
      <SelectItem
        key={billboard.id}
        value={billboard.id}
      >
        {billboard.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
```

## Categories API routes

Quite similar to the `app\api\[storeId]\billboards`, so we can copy it and paste it inside `[storeId]`. Rename the copy into `categories`. Also rename the dynamic route for id into `[categoryid]`.

Let's work on the `route.ts` inside `categories` folder.

#### Categories `POST`

The `POST` route, the body will need `name` and `billboardId`.

`api\[storeId]\categories\route.ts`
```ts
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
    const { name, billboardId } = body;

    // Check name field
    if (!name){
      return new NextResponse("Name is required", { status: 400 });
    }

    // Check billboardId field
    if (!billboardId){
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    // Check if storeId exists
    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
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

    // Create category for user's specific store in the database
    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId
      }
    });

    // Send back response with the category
    return NextResponse.json(category);
  } catch (error){
    console.log('[CATEGORIES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
```

#### Categories `GET`

- GET route checks `storeId`, fetches all categories using `storeId`, send back response

```ts
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // Check if storeId exists
    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    // Find all categories available in that store in the database
    const categories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId
      }
    });

    // Send back response with all categories
    return NextResponse.json(categories);
  } catch (error){
    console.log('[CATEGORIES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
```

### Specific Category routes

Using the Dynamic Segment `[categoryId]` we can create routes from dynamic data. The Dynamic Segments are filled in at request time. [Dynamic Routes](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes).

#### Category `GET`

- Using specific `categoryId` from the parameters, fetch the Category and make the proper response

```ts
export async function GET (
  req: Request,
  { params }: { params: { categoryId: string }}
){
  try {
    // Check parameters
    if (!params.categoryId){
      return new NextResponse("Category ID is required", { status: 400 });
    }

    // Find the specific Category in the database
    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
```

#### Category `PATCH`

- PATCH route shows how we update our category

```ts
export async function PATCH (
  req: Request,
  { params }: { params: { storeId: string, categoryId: string }}
){
  try {
    // Check parameters
    if (!params.storeId){
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!params.categoryId){
      return new NextResponse("Category ID is required", { status: 400 });
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
    const { name, billboardId } = body;

    // Check data
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
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

    // Find and Update a specific Category
    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId
      },
      data: {
        name,
        billboardId,
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
```

#### Category `DELETE`

- DELETE route deletes the specific category in the database

```ts
export async function DELETE (
  req: Request,
  { params }: { params: { storeId: string, categoryId: string }}
){
  try {
    // Check parameters
    if (!params.storeId){
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!params.categoryId){
      return new NextResponse("Category ID is required", { status: 400 });
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

    // Find and delete a specifc category
    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
```

### Testing Category Routes

Go ahead and click on the Categories page on the `MainNav`.

Open up the **Network** tab in developer tools, then create a category by linking it up with a billboard.

We should see a Response that contains the data for the category : `{ id, storeId, billboardId, name, etc...}`.

Let's test the route from the API List of calls. Let's try the GET route, so click the copy icon and paste it into the browser.

- We need to fix the `cell-action` for update and delete for the category data table.

### Update Category's Cell Actions

Navigate to `app\(dashboard)\[storeId]\(routes)\categories\components\cell-action.tsx`

- Update the props with `CategoryColumn`

```tsx
import { CategoryColumn } from './columns';

interface CellActionProps {
  data: CategoryColumn
}
```

- Update the copy handler message

```tsx
  // Copy Event Handler
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Category ID copied to clipboard.");
  }
```

- Update the route and messages in delete handler

```tsx
  // Define a delete handler
  const onDelete = async () => {
    try {
      setLoading(true);
      // Call an API with dynamic route to delete the specific category
      await axios.delete(`/api/${params.storeId}/categories/${data.id}`);
      // Refresh current route to make new request to server
      // Re-fetch data requests & re-render server components
      router.refresh();
      toast.success("Category deleted.");
    } catch (error) {
      // Safety mechanism will prompt a warning to delete any related records
      toast.error("Make sure you removed all products using this category first.");
    } finally {
      setLoading(false);
      // Close the Modal
      setOpen(false);
    }
  };
```

- In the Dropdown's Edit button, lets change the route to categories

```tsx
<DropdownMenuItem
  onClick={() => router.push(`/${params.storeId}/categories/${data.id}`)}
>
  <Edit className="mr-2 h-4 w-4" />
  Update
</DropdownMenuItem>
```

#### Testing Category - cell actions

- Create a Category
- Filter categories by name in Data Table
- Update a Category with a cell action
- Delete a Category with a cell action
- Delete a Cateogry through the form
  - Click the update category cell action to arrive at the form
  - Click on the Trash icon to delete the selected category

With this check list, we can move on to create the next entity.

# Size entity

The size entity allows another way to filter our records of products through sizes. It will have a `name` mapped to a `value`.

For example, we can create a size entity where we map a name "Large" to its value of "L" for easier filtering of products. 

```json
{
  name: "Large",
  value: "L"
}
```

A user can filter or search for a superset of a product such as a shirt. Then we allow the user to narrow down the set of "shirts" to a subset through the *size entity*. The user can click on an option that allows for the shirt to be filtered by size. Later on we will have a color entity to further narrow down the subset of products.

## Size - Model

In `prisma.schema`, create the `Size` model which contains id, storeId, store relation

```prisma
model Size {
  id          String    @id @default(uuid())
  storeId     String    // relation scalar field (used in the `@relation` attribute)
  store       Store     @relation("StoreToSize", fields: [storeId], references: [id])
}
```

Add `Size` relation  in `Store` model

```prisma
model Store {
  id         String       @id @default(uuid())
  name       String
  userId     String
  billboards Billboard[]  @relation("StoreToBillboard")
  categories Category[]   @relation("StoreToCategory")
  sizes      Size[]       @relation("StoreToSize")
  createdAt  DateTime     @default(now())
  updatedAt  DateTime     @updatedAt
}
```

- Fix to the warning for the `storeId` relation inside `Size` model.
- Add `name`, `value`, `createdAt` and `updatedAt` fields as well

```prisma
model Size {
  id          String    @id @default(uuid())
  storeId     String    // relation scalar field (used in the `@relation` attribute)
  store       Store     @relation("StoreToSize", fields: [storeId], references: [id])
  name        String
  value       String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  // Manually add index on relation scalar field
  @@index([storeId])
}
```

### Push Size model to database

```sh
npx prisma generate

npx prisma db push
```

After generating prisma client and syncing database with prisma schema we can start creating the same project structure we did for previous entities.

### Size - Project structure

Because entities share a similar structure, we can copy the `app\(dashboard)\[storeId]\(routes)\billboards` folder and paste it into `(routes)` while renaming them.

```sh
- app
  |- (dashboard)
    |-  [storeId]
      |-  (routes)
        |- billboards
        |- categories
        |- sizes
          |- [sizeId]
            |- components
              |- SizeForm.tsx
            |- page.tsx
          |- components
            |- cell-action.tsx
            |- client.tsx
            |- columns.tsx
          |- page.tsx
```

### Size - add route to Navigation

In `MainNav` add sizes route after categories

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
      href: `/${params.storeId}/categories`,
      label: 'Categories',
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: 'Sizes',
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
```

## Sizes - Page

- The page for all sizes
- Like previous entity pages, we have our imports and take `storeId` out of `params`

`app\(dashboard)\[storeId]\(routes)\sizes\page.tsx`
```tsx
// Global Imports
import React from 'react';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';

// Local Imports
import BillboardClient from './components/client';
import { SizeColumn } from './components/columns';

const SizesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
```

- Fetch all size entities specific to the active store

```tsx
  // Fetch all sizes specific to the active store
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
```

- Format each entity into a column

```tsx
  // Format each Size into a SizeColumn
  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))
```

Finally, pass in formatted data as a prop to the client in the return

```tsx
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes}/>
      </div>
    </div>
  );
}

export default SizesPage;
```

## Size - Column

- The Size column will have `{ id, name, value, createdAt}`

`app\(dashboard)\[storeId]\(routes)\sizes\components\columns.tsx`
```tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
export type SizeColumn = {
  id: string
  name: string
  value: string
  createdAt: string
}

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
]
```

## Size - Client

- Similar imports, interface and data parameter as previous entities

```tsx
"use client";

// Global Imports
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

// Local Imports
import { SizeColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/ApiList";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface SizesClientProps {
  data: SizeColumn[]
}

// Client component that loads all our Sizes
const SizesClient: React.FC<SizesClientProps> = ({
  data
}) => {
```

- invoke `useRouter()` and `useParams()`

```tsx
  // Create router object to perform client-side navigation
  const router = useRouter();

  // Hook returns an object containing current route's filled in dynamic parameters
  const params = useParams();
```

- Output is similar to previous entities, with heading, button, DataTable, ApiList

```tsx
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage sizes for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey={"name"}/>
      <Heading title="API" description="API calls for Sizes" />
      <Separator />
      <ApiList 
        entityName="sizes"
        entityIdName="sizeId"
      />
    </>
  )
}

export default SizesClient;
```

- Notice the `searchKey` inside `DataTable` is set to `name`
  - We can also set the `searchKey` to `value` depending how we want to filter our DataTable

## Specific Size - page

This will be the page that shows for a specific size.

`app\(dashboard)\[storeId]\(routes)\sizes\[sizeId]\page.tsx`
```tsx
// Global Imports
import prismadb from '@/lib/prismadb';
import React from 'react';

// Local Imports
import SizeForm from './components/SizeForm';

const SizePage =  async ({
  params
}:{
  params: { sizeId: string }
}) => {

  // Fetch an existing size
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size}/>
      </div>
    </div>
  )
}

export default SizePage;
```

## Size - Form

- Make the Size Form schema

```tsx
// Create zod object schema
const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

// extract the inferred type
type SizeFormValues = z.infer<typeof formSchema>;
```

- Let's set the props

```tsx
// Define type and shape of props
interface SizeFormProps {
  initialData: Size | null
}
```

Checklist
  - `initialData` in parameter
  - `params`, `router`, state variables `open` and `loading`
  - dynamic messages for `title`, `description`, `toastMessage` and `action`
  - Define a form with `useForm` hook

```tsx
const SizeForm: React.FC<SizeFormProps> = ({
  initialData
}) => {
  // Create router object to perform client-side navigation
  const router = useRouter();

  // Hook returns an object containing current route's filled in dynamic parameters
  const params = useParams();

  // Create open state to control the Alert modal
  const [open, setOpen] = useState(false);

  // Create loading state to disable interactive elements
  const [loading, setLoading] = useState(false);

  // Create dynamic data to pass into output
  const title = initialData ? "Edit size" : "Create size";
  const description = initialData ? "Edit a size" : "Add a new size";
  const toastMessage = initialData ? "Size updated." : "Size created.";
  const action = initialData ? "Save changes" : "Create";

  // 1. Define form with useForm hook & zodResolver for validation
  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      value: ''
    }
  });
```

### SizeForm output

Similar structure to other entity. It only has two form fields containg `name` and `value`.

```tsx
return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading
          title={title}
          description={description}
        />
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
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Size name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Size value" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default SizeForm
```

### SizeForm - function handlers

The submit handler

```tsx
  // 2. Define a submit handler
  const onSubmit = async (data: SizeFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        // Update specific Size
        await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data);
      } else {
        // Create new Size
        await axios.post(`/api/${params.storeId}/sizes`, data);
      }
      // Refresh current route to make new request to server
      // Re-fetch data requests & re-render server components
      // Re-initializes initialData
      router.refresh();
      // Re-route the user to the sizes page
      router.push(`/${params.storeId}/sizes`)
      // Success notification with dynamic message
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
```
The delete handler

```tsx
  // 3. Define a delete handler
  const onDelete = async () => {
    try {
      setLoading(true);
      // Call an API with dynamic route to delete the Size
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
      // Re-synchronize server component to update data
      router.refresh();
      // Navigate back to the specific store's sizes page after deletion
      router.push(`${params.storeId}/sizes`);
      toast.success("Size deleted.");
    } catch (error) {
      // Safety mechanism will prompt a warning to delete any related records to the Size
      toast.error("Make sure you removed all products using this size first.");
    } finally {
      setLoading(false);
      // Close the Modal
      setOpen(false);
    }
  };
```

## Size - API routes

Create `app\api\[storeId]\sizes`, inside a `route.ts`.

It will have a `POST` and `GET` route. Same with previous entities, the `POST` will do the checks and create a `size` with `{ name, value }` from the body.

`POST` sizes route:
```ts
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
    const { name, value } = body;

    // Check name field
    if (!name){
      return new NextResponse("Name is required", { status: 400 });
    }

    // Check value field
    if (!value){
      return new NextResponse("Image URL is required", { status: 400 });
    }

    // Check if storeId exists
    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
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

    // Create size for user's specific store in the database
    const size = await prismadb.size.create({
      data: {
        name,
        value,
        storeId: params.storeId
      }
    });

    // Send back response with the size
    return NextResponse.json(size);
  } catch (error){
    console.log('[SIZES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
```

`GET` sizes route:
```ts
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // Check if storeId exists
    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    // Find all sizes available in that store in the database
    const sizes = await prismadb.size.findMany({
      where: {
        storeId: params.storeId
      }
    });

    // Send back response with all sizes
    return NextResponse.json(sizes);
  } catch (error){
    console.log('[SIZES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
```

### sizeId route

Create `app\api\[storeId]\sizes\[sizeId]\route.ts`.

`GET` size route
```ts
export async function GET (
  req: Request,
  { params }: { params: { sizeId: string }}
){
  try {
    // Check parameters
    if (!params.sizeId){
      return new NextResponse("Size ID is required", { status: 400 });
    }

    // Find the specific Size in database
    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId,
      }
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
```

`PATCH` size route
```ts
export async function PATCH (
  req: Request,
  { params }: { params: { storeId: string, sizeId: string }}
){
  try {
    // Check parameters
    if (!params.storeId){
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!params.sizeId){
      return new NextResponse("Size ID is required", { status: 400 });
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
    const { name, value } = body;

    // Check data
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
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

    // Find and Update a specific Size
    const size = await prismadb.size.updateMany({
      where: {
        id: params.sizeId
      },
      data: {
        name,
        value
      }
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
```

`DELETE` size route
```ts
export async function DELETE (
  req: Request,
  { params }: { params: { storeId: string, sizeId: string }}
){
  try {
    // Check parameters
    if (!params.storeId){
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!params.sizeId){
      return new NextResponse("Size ID is required", { status: 400 });
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

    // Find and Delete Size
    const size = await prismadb.size.deleteMany({
      where: {
        id: params.sizeId
      }
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
```

### Testing Size Routes

Go ahead and click on the Categories page on the `MainNav`.

Open up the **Network** tab in developer tools, then create a category by linking it up with a billboard.

We should see a Response that contains the data for the category : `{ id, storeId, sizeId, name, etc...}`.

Let's test the route from the API List of calls. Let's try the GET route, so click the copy icon and paste it into the browser.

- We need to fix the `cell-action` for update and delete for the category data table.

### Update Size's Cell Actions

Navigate to `app\(dashboard)\[storeId]\(routes)\sizes\components\cell-action.tsx`.

Update:

- Copy Event Handler
- Delete Event Handler, and its routes
- `DropdownMenuItem` in charge of pushing to a new route

Now continue with the testing of the Size, SizeForm and each cell action.

# Colors entity

The color entity allows another way to filter our records of products through colors. It will have a `name` mapped to a `value`. The name is the name of the color and the value is the HEX code for that particular color.

For example, we can create a color entity where we map a name "Red" to its value of "#FF0000" for easier filtering of products. 

```json
{
  name: "Red",
  value: "#FF0000"
}
```

A user can filter or search for a superset of a product such as a shirt. Then we allow the user to narrow down the set of "shirts" to a subset through the *color entity*. The user can click on an option that allows for the shirt to be filtered by color.

## Colors - Model

Back in `prisma.schema`, it is just like `Size` model. 

- It has `{ id, storeId, store relation, name, value, createdAt, updatedAt }`.

```prisma
model Color {
  id          String    @id @default(uuid())
  storeId     String    // relation scalar field (used in the `@relation` attribute)
  store       Store     @relation("StoreToColor", fields: [storeId], references: [id])
  name        String
  value       String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  // Manually add index on relation scalar field
  @@index([storeId])
}
``
- Add relation to `Store` model

```prisma
model Store {
  id         String       @id @default(uuid())
  name       String
  userId     String
  billboards Billboard[]  @relation("StoreToBillboard")
  categories Category[]   @relation("StoreToCategory")
  colors     Color[]      @relation("StoreToColor")
  sizes      Size[]       @relation("StoreToSize")
  createdAt  DateTime     @default(now())
  updatedAt  DateTime     @updatedAt
}
```

Then generate prisma client and push to database to sync the changes.

```sh
npx prisma generate
```

```sh
npx prisma db push
```

### Colors - Project structure

Because the size entity is most similar to colors, we can copy the `app\(dashboard)\[storeId]\(routes)\sizes` folder and paste it into `(routes)` while renaming it to `colors`.

```sh
- app
  |- (dashboard)
    |-  [storeId]
      |-  (routes)
        |- billboards
        |- categories
        |- sizes
        |- colors
          |- [colorId]
            |- components
              |- ColorForm.tsx
            |- page.tsx
          |- components
            |- cell-action.tsx
            |- client.tsx
            |- columns.tsx
          |- page.tsx
```

### Colors - add route to Navigation

In `MainNav` add sizes route after categories

`ecommerce-admin\components\MainNav.tsx`
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
      href: `/${params.storeId}/categories`,
      label: 'Categories',
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: 'Colors',
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: 'Sizes',
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
```

## Colors - Page

Just like Size entity, this page under `/colors` will cover all colors.

1. Fetch all the colors in the active store
2. Format each color to a color column
3. Pass formatted data to color client

`app\(dashboard)\[storeId]\(routes)\colors\page.tsx`
```tsx
// Global Imports
import React from 'react';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';

// Local Imports
import ColorsClient from './components/client';
import { ColorColumn } from './components/columns';

const ColorsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  
  // Fetch all colors specific to the active store
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Format each Color into a ColorColumn
  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsClient data={formattedColors}/>
      </div>
    </div>
  );
}

export default ColorsPage;
```

## Color - Column

The color column will be used within the `DataTable`. Similar to `SizeColumn`, but with one key difference: a special cell inside the value.

`ecommerce-admin\app\(dashboard)\[storeId]\(routes)\colors\components\columns.tsx`
```tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
export type ColorColumn = {
  id: string
  name: string
  value: string
  createdAt: string
}

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => {
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div 
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.value }}
        >
        </div>
      </div>
    }
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
]
```

A closer look:
```tsx
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => {
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div 
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.value }}
        >
        </div>
      </div>
    }
  },
```

- We take the `row.original.value` and render it inside a `div`. 
- We have another `div` inside that will display the color.
  - This will be a self-closing element
  - We also use `style` property

Why not use dynamic classes? TailwindCSS only works with predefined fully written classes. A just-in-time compiler, so if there is dynamic classes there is a chance Tailwind is not going to compile that css and styles are not going to work.

Its safer to use `style` with dynamic classes, instead of using dynamic classes through TailwindCSS. For example,

```tsx
<div 
  className="h-6 w-6 rounded-full border bg-[${dynamicClass}]"
>
```

## Colors - Client

The colors client will load our colors and the DataTable.

- imports, interface and function
- Also have `router` and `params`

`app\(dashboard)\[storeId]\(routes)\colors\components\client.tsx`
```tsx
"use client";

// Global Imports
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

// Local Imports
import { ColorColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/ApiList";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface ColorsClientProps {
  data: ColorColumn[]
}

// Client component that loads all our Colors
const ColorsClient: React.FC<ColorsClientProps> = ({
  data
}) => {
  // Create router object to perform client-side navigation
  const router = useRouter();

  // Hook returns an object containing current route's filled in dynamic parameters
  const params = useParams();
```

- Next the output is similar with other entity, but with names and routes updated
```tsx
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${data.length})`}
          description="Manage colors for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/colors/new`)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey={"name"}/>
      <Heading title="API" description="API calls for Colors" />
      <Separator />
      <ApiList 
        entityName="colors"
        entityIdName="colorId"
      />
    </>
  )
}

export default ColorsClient;
```
## Color - Page

- Now inside the route `[colorId]`, we work on the individual page for a color
- Gets id from params, fetch a unique entity, and pass entity data into form

```tsx
// Global Imports
import prismadb from '@/lib/prismadb';
import React from 'react';

// Local Imports
import ColorForm from './components/ColorForm';

const ColorPage =  async ({
  params
}:{
  params: { colorId: string }
}) => {

  // Fetch an existing color
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color}/>
      </div>
    </div>
  )
}

export default ColorPage;
```

## Colors - Form

- Create zod form object schema
- Extract inferred type
- Color form props
- ColorForm function

```tsx
// Create zod object schema
const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

// extract the inferred type
type ColorFormValues = z.infer<typeof formSchema>;

// Define type and shape of props
interface ColorFormProps {
  initialData: Color | null
}

const ColorForm: React.FC<ColorFormProps> = ({
  initialData
}) => {
```

Now recall in the column we had the `value` of the color set to the `style` prop

```tsx
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => {
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div 
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.value }}
        >
        </div>
      </div>
    }
  },
```

We want the `value` to be a HEX code that defines the proper color. That is how it will be turned into a CSS color.

To do this, we need to modify our zod object schema, by validating whether the value is a minimum of 4 characters and follows a certain regex pattern. We also pass in a message if the string is not a valid hex code.

```tsx
const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(4).regex(/^#/, {
    message: 'String must be a valid hex code',
  }),
});
```

Next create the state variables, use the hooks, make dynamic data to pass to output and define the form.

```tsx
const ColorForm: React.FC<ColorFormProps> = ({
  initialData
}) => {
  // Create router object to perform client-side navigation
  const router = useRouter();

  // Hook returns an object containing current route's filled in dynamic parameters
  const params = useParams();

  // Create open state to control the Alert modal
  const [open, setOpen] = useState(false);

  // Create loading state to disable interactive elements
  const [loading, setLoading] = useState(false);

  // Create dynamic data to pass into output
  const title = initialData ? "Edit color" : "Create color";
  const description = initialData ? "Edit a color" : "Add a new color";
  const toastMessage = initialData ? "Color updated." : "Color created.";
  const action = initialData ? "Save changes" : "Create";

  // 1. Define form with useForm hook & zodResolver for validation
  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      value: ''
    }
  });
```

Let's look into the output for ColorForm. The first part is the conditional render of AlertModal, Heading and destructive Button.

Next is the `Form`. It contains two `FormField`s with name and value.

```tsx
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Color name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Color value" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
```

The major change however, is that the "value" `FormField` will also render the color.

We create a `div` that wraps around both the `Input` and another div that dynamically renders the background color to that of the `value` of the field.

```tsx
<FormField
  control={form.control}
  name="value"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Value</FormLabel>
      <FormControl>
        <div className="flex items-center gap-x-4">
          <Input disabled={loading} placeholder="Color value" {...field} />
          <div
            className="border p-4 rounded-full"
            style={{ backgroundColor: field.value }}
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### ColorForm - handlers

Now let's modify the submit handler

```tsx
 // 2. Define a submit handler
  const onSubmit = async (data: ColorFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        // Update specific Color
        await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data);
      } else {
        // Create new Color
        await axios.post(`/api/${params.storeId}/colors`, data);
      }
      // Refresh current route to make new request to server
      // Re-fetch data requests & re-render server components
      // Re-initializes initialData
      router.refresh();
      // Re-route the user to the colors page
      router.push(`/${params.storeId}/colors`)
      // Success notification with dynamic message
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
```

And delete handler

```tsx
// 3. Define a delete handler
  const onDelete = async () => {
    try {
      setLoading(true);
      // Call an API with dynamic route to delete the Color
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      // Re-synchronize server component to update data
      router.refresh();
      // Navigate back to the specific store's colors page after deletion
      router.push(`${params.storeId}/colors`);
      toast.success("Color deleted.");
    } catch (error) {
      // Safety mechanism will prompt a warning to delete any related records to the Color
      toast.error("Make sure you removed all products using this color first.");
    } finally {
      setLoading(false);
      // Close the Modal
      setOpen(false);
    }
  };
```

## Colors - API routes

Create `colors` folder inside `/api/[storeId]`. Then create a `route.ts` and a `[colorId]` folder in the same directory.

The route here will be for all colors.

Almost the entire route is exactly the same as size route except for the fetch. We have to fetch the color or create a color in the database.

`app\api\[storeId]\colors\route.ts`
```ts
export async function POST(
// ...
){
  // Create color for user's specific store in the database
    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId
      }
    });
}

export async function GET(
// ...
    // Find all colors available in that store in the database
    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId
      }
    });
}
```

### Color - API routes for specific color

- `GET`, `PATCH` and `DELETE` routes for specific color given a `colorId`
-`app\api\[storeId]\colors\[colorId]\route.ts`

GET route
```ts
export async function GET (
  req: Request,
  { params }: { params: { colorId: string }}
){
  try {
    // Check parameters
    if (!params.colorId){
      return new NextResponse("Color ID is required", { status: 400 });
    }

    // Find the specific color in database
    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      }
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
```

PATCH route
```ts
export async function PATCH (
  req: Request,
  { params }: { params: { storeId: string, colorId: string }}
){
  try {
    // Check parameters
    if (!params.storeId){
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!params.colorId){
      return new NextResponse("Color ID is required", { status: 400 });
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
    const { name, value } = body;

    // Check data
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
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

    // Find and Update a specific color
    const color = await prismadb.color.updateMany({
      where: {
        id: params.colorId
      },
      data: {
        name,
        value
      }
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
```

Delete route
```ts
export async function DELETE (
  req: Request,
  { params }: { params: { storeId: string, colorId: string }}
){
  try {
    // Check parameters
    if (!params.storeId){
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!params.colorId){
      return new NextResponse("Color ID is required", { status: 400 });
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

    // Find and Delete color
    const color = await prismadb.color.deleteMany({
      where: {
        id: params.colorId
      }
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
```

## Color - Cell Action

- `app\(dashboard)\[storeId]\(routes)\colors\components\cell-action.tsx`
- Similar to previous entity cell action
- List of changes:
  - import column
  - copy handler
  - delete handler
  - DropdownMenuItem that pushes route

## Colors testing

- Create a Color
- Test the cell actions:
  - Copy, Update and Delete
- Filter/Search color by name
- Copy an API route
  - Test route url
  - Test route url with individual `colorId`

# Product entity

Now we create the entity that serves as a cornerstone of our ecommerce store: the *product*.

## Product - Model

The Product model should contain the following:
  - `id` of product
  - relation to `Store`
    - `storeId` with relation with store with decorator `@relation`, fields and references
    - equivalent relation in `Store` model
  - relation to `Category`
    - `categoryId` with `@relation` to category
    - equivalent relation in `Category` model
  - `name`
  - `price` a type of decimal
  - `isFeatured` boolean
  - `isArchived` boolean
  - filter relations:
    - relation to `Size`. No name just `field` and `references`
      - equivalent relation in `Size` model
    - relation to `Color`
      - equivalent relation in `Color` model

Our schema so far:

`ecommerce-admin\prisma\schema.prisma`
```prisma
model Store {
  // ...
  products   Product[]    @relation("StoreToProduct")
}

model Category {
  // ...
  products    Product[] @relation("CategoryToProduct")
}

model Size {
  // ...
  products    Product[]
}

model Color {
  // ...
  products    Product[]
}

model Product {
  id          String    @id @default(uuid())
  storeId     String    // relation scalar field (used in the `@relation` attribute)
  store       Store     @relation("StoreToProduct", fields: [storeId], references: [id])
  categoryId  String
  category    Category  @relation("CategoryToProduct", fields: [categoryId], references: [id])
  name        String
  price       Decimal
  isFeatured  Boolean   @default(false)
  isArchived  Boolean   @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  // Filter relations
  sizeId      String
  size        Size      @relation(fields: [sizeId], references: [id])
  colorId     String
  color       Color     @relation(fields: [colorId], references: [id])

}
```

### Image - Model

Now unlike `Billboard`, our `Product` model will have many images. So we cannot simply add an `imageUrl`. We need to create a way to store and display many images for a particular product. 

We will create a `Image` model which will store our Images. Then add a relation to Image and Product.

Has the properties:
- `id` 
- `productId`
- `product` relation
- `url` String
- Special rule for what happens to `Image` model when `Product` has been deleted

`onDelete: Cascade` will delete the **child** records when the **Parent** record is deleted.

```prisma
model Image {
  id  String @id @default(uuid())
  productId String
  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}
```

#### Prisma `onDelete` cascade delete and **Referential Actions**

*Important:* we have a specific case where we should be able to delete our product even if we have an existing `Image` model that uses that product. This case needs to be handled, otherwise we cannot delete a product without deleting the related record `Image` from the database.

[Prisma schema - @relation](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#relation), in the docs we can see that one of the arguments is `onDelete`. We can pass in a [referential action](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/referential-actions), actions that determines what happens to a record when your app deletes/updates a related record.

In the following example, adding `onDelete: Cascade` to the `author` field on the `Post` model means that deleting the `User` record will also delete all related `Post` records

```prisma
model Post {
  id       Int    @id @default(autoincrement())
  title    String
  author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId Int
}

model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}
```
In our case, adding `onDelete: Cascade` to the `product` field on the `Image` model means that deleting the `Product` record will also delete all related `Image` records.

```prisma
model Product {
  // ...
  images Image[]
}

model Image {
  id  String @id @default(uuid())
  productId String
  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}
```

### Product & Image Model complete

Now resolve the warnings regarding indexing and relations for `Product` & `Image` models.

```prisma
model Product {
  id          String    @id @default(uuid())
  storeId     String    // relation scalar field (used in the `@relation` attribute)
  store       Store     @relation("StoreToProduct", fields: [storeId], references: [id])
  categoryId  String
  category    Category  @relation("CategoryToProduct", fields: [categoryId], references: [id])
  name        String
  price       Decimal
  isFeatured  Boolean   @default(false)
  isArchived  Boolean   @default(false)
  images      Image[]
  // Filter relations
  sizeId      String
  size        Size      @relation(fields: [sizeId], references: [id])
  colorId     String
  color       Color     @relation(fields: [colorId], references: [id])
  // Time 
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  // Manually add index on relation scalar fields
  @@index([storeId])
  @@index([categoryId])
  @@index([sizeId])
  @@index([colorId])
}

model Image {
  id        String @id @default(uuid())
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  url       String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  // Manually add index on relation scalar fields
  @@index([productId])
}
```

#### Prisma Schema `@@index`

[Prisma Schema - index](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#index) defines an index in the database.

In Prisma, you can add an index to a field in the Prisma schema using the `@@index()` attribute function. The `@@index()` attribute function accepts multiple arguments such as fields and map. The `fields` argument is the only required argument that allows you to list the table columns that are being indexed inside your data models. 

An index is a database structure that improves the speed of data retrieval operations on a database table at the cost of additional writes and storage space to maintain the index data structure. In other words, an index is a way to optimize queries for faster execution by creating a copy of a subset of data from a table sorted in a specific order. 

In Prisma, you can configure indexes, unique constraints, and primary key constraints with the following attribute arguments:

- The `length` argument allows you to specify a maximum length for the subpart of the value to be indexed on String and Bytes types.
- The `sort` argument allows you to specify the order that the entries of the constraint or index are stored in the database.
- The `type` argument allows you to support index access methods other than PostgreSQL's default BTree access method.
- The `clustered` argument allows you to configure whether a constraint or index is clustered or non-clustered.

### Update the prisma schema

Then generate prisma client and push to database to sync the changes.

```sh
npx prisma generate
```

```sh
npx prisma db push
```

## Product - add route to main navigation

Add products to main navigation

`ecommerce-admin\components\MainNav.tsx`
```tsx
  const routes = [
    // ...
    {
      href: `/${params.storeId}/products`,
      label: 'Products',
      active: pathname === `/${params.storeId}/products`,
    },
```

### Products - Project structure

Because the billboards entity is most similar to billboards, we can copy the `app\(dashboard)\[storeId]\(routes)\billboards` folder and paste it into `(routes)` while renaming it to `products`.

```sh
- app
  |- (dashboard)
    |-  [storeId]
      |-  (routes)
        |- billboards
        |- categories
        |- sizes
        |- colors
        |- products
          |- [productId]
            |- components
              |- ProductForm.tsx
            |- page.tsx
          |- components
            |- cell-action.tsx
            |- client.tsx
            |- columns.tsx
          |- page.tsx
```

## Products - Page

- imports and `ProductPage` with params

```tsx
// Global Imports
import React from 'react';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';

// Local Imports
import ProductClient from './components/client';
import { ProductColumn } from './components/columns';

const ProductsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
```

- fetch all products in the database
  - using `findMany` and add `where` and `orderBy` property
  - also `include` category, size, and color relations
    - can access these individual models in the form of an object to display in `DataTable`

```tsx
  // Fetch all products specific to the active store
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
```

- format the products into a column to pass as data

```tsx
  // Format each product into a ProductColumn
  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isArchived: item.isArchived,
    isFeatured: item.isFeatured,
    price: item.price,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))
```

- pass formatted products into the ProductClient in the output

```tsx
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts}/>
      </div>
    </div>
  );
}

export default ProductsPage;
```

### Formatting data better

Currently when we format the products into a column, the `price` is simply passed as `item.price`. 

```tsx
  // Format each product into a ProductColumn
  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isArchived: item.isArchived,
    isFeatured: item.isFeatured,
    price: item.price,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))
```

We would like to format the `price` in a nicer way.

Let's create a formatting utility.

Navigate to `ecommerce-admin\lib\utils.ts` and add the function

```tsx
export const priceFormatter = new Intl.NumberFormat("en-US", {
  style: 'currency',
  currency: 'USD'
});
```

Now we can wrap the price with this formatter using the `format()` method.

```tsx
  // Format each product into a ProductColumn
  const formattedProducts: ProductColumn[] = products.map((item) => ({
    // ...
    price: priceFormatter.format(item.price),
  }))
```

But `item.price` is of type `Decimal` as we define in our schema:

```prisma
model Product {
  // ...
  price       Decimal
}
```

So we have to turn it into a number using `toNumber()`.

```tsx
  // Format each product into a ProductColumn
  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isArchived: item.isArchived,
    isFeatured: item.isFeatured,
    price: priceFormatter.format(item.price.toNumber()),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))
```

### ProductColumn

Let's continue adding more data to our `formattedProducts`.

- Add `category`, `size` and `color`

```tsx
 // Format each product into a ProductColumn
  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isArchived: item.isArchived,
    isFeatured: item.isFeatured,
    price: priceFormatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
```

## Product - Column

`ProductColumn` will have the following properties:

- id, name, price, size, color, isArchived, isFeatured, createdAt
- its color property will render the passed in color

```tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  size: string;
  color: string;
  isArchived: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "archived",
  },
  {
    accessorKey: "isFeatured",
    header: "featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
]
```

## Product - Client

- imports
- define props
- use router and params
- Button, DataTable, APIList in output

```tsx
"use client";

// Global Imports
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

// Local Imports
import { ProductColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/ApiList";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface ProductClientProps {
  data: ProductColumn[]
}

// Client component that loads all our products
const ProductClient: React.FC<ProductClientProps> = ({
  data
}) => {
  // Create router object to perform client-side navigation
  const router = useRouter();

  // Hook returns an object containing current route's filled in dynamic parameters
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/products/new`)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey={"name"}/>
      <Heading title="API" description="API calls for Products" />
      <Separator />
      <ApiList 
        entityName="products"
        entityIdName="productId"
      />
    </>
  )
}

export default ProductClient;
```

## Product Page

- A page to fetch an existing product, then render the `ProductForm` as `initialData`.

`app\(dashboard)\[storeId]\(routes)\products\[productId]\page.tsx`
```tsx
// Global Imports
import prismadb from '@/lib/prismadb';
import React from 'react';

// Local Imports
import ProductForm from './components/ProductForm';

const ProductPage =  async ({
  params
}:{
  params: { productId: string }
}) => {

  // Fetch an existing product
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm initialData={product}/>
      </div>
    </div>
  )
}

export default ProductPage;
```

### Include image to product page

In the fetch, we also want to include the array of images which is a separate model. If we want to load the URL of all those images and not just the image ids then we need to add an `include`.

[Prisma Client API - include](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#include)

```tsx
  // Fetch an existing product
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true
    }
  });
```

## Product Form

- Let's start with imports

```tsx
"use client"

// Global Imports
import * as z from 'zod';
import axios from 'axios';
import React, { useState } from 'react';
import { Product } from '@prisma/client';
import { toast } from 'react-hot-toast';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

// Local Imports
import { AlertModal } from '@/components/modals/AlertModal';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ImageUpload from '@/components/ui/ImageUpload';
```

#### `ProductFormProps`

- Product form props are not just a simple Product, unlike previous entities.
  - Product Form props and an object that contains images which is an array of `Image`s

```tsx
import { Image, Product } from '@prisma/client';

// Define type and shape of props
interface ProductFormProps {
  initialData: Product & {
    images: Image[]
  } | null
}
```

#### `ProductForm`

- Then the `ProductForm` component, router/params, state variables `open` & `loading`, and dynamic data.

```tsx
const ProductForm: React.FC<ProductFormProps> = ({
  initialData
}) => {
  // Create router object to perform client-side navigation
  const router = useRouter();

  // Hook returns an object containing current route's filled in dynamic parameters
  const params = useParams();

  // Create open state to control the Alert modal
  const [open, setOpen] = useState(false);

  // Create loading state to disable interactive elements
  const [loading, setLoading] = useState(false);

  // Create dynamic data to pass into output
  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit a product" : "Add a new product";
  const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save changes" : "Create";
```

#### Defining the Product Form

- Next we define form with useForm hook & zodResolver for validation
  - Resolve `defaultValues` to empty counterparts

```tsx
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      images: [],
      price: 0,
      categoryId: '',
      colorId: '',
      sizeId: '',
      isFeatured: false,
      isArchived: false,
    }
  });
```

#### zod object schema for Product Form

When we defined our form this way, we also need to reflect this inside zod.

[zod docs](https://zod.dev/).

- Create the zod object schema, then infer the type
  - `images` will be an array that contains a object with a url string
  - `price` is of type Decimal so we have to use the [coerce()](https://zod.dev/?id=coercion-for-primitives) method to coerce primitive values.

```tsx
// Create zod object schema
const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

// extract the inferred type
type ProductFormValues = z.infer<typeof formSchema>;
```

#### Issue: type error with `defaultValues`. Type of property price are incompatible.

The errors:
```sh
      Types of property 'price' are incompatible.
        Type 'Decimal' is not assignable to type 'number'.ts(2322)
```

Type errors occurs here:

```tsx
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      images: [],
      price: 0,
      categoryId: '',
      colorId: '',
      sizeId: '',
      isFeatured: false,
      isArchived: false,
    }
  });
```

First we need to understand that here `defaultValues` is assigned to either `initialData` **OR** the object with all default values set.

Currently, `initialData` is this type (when hovered over in VSCode)

```sh
(parameter) initialData: ({
    id: string;
    storeId: string;
    categoryId: string;
    name: string;
    price: Decimal;
    isFeatured: boolean;
    isArchived: boolean;
    sizeId: string;
    colorId: string;
    createdAt: Date;
    updatedAt: Date;
} & {
    ...;
}) | null
```

So in essence, when `initialData` is present as a prop then it is set to it OR it is set to a default object. Again let's breakdown the steps

If `initialData` exists:

1. True => Set `defaultValues` to `initialData`
2. False => Set `defaultValues` to default object

*Solution:* modify the `initialData`'s `price` to match the type. Change the condition where `initialData` does exist.

We have to open up a ternary operator to modify case #1. To break it down,

If `initialData` exists:

1. True => Set `defaultValues` to all values in `initialData` **AND** `price` property is formatted properly as a Float.
2. False => Set `defaultValues` to default object

***Note***: in prisma and MySQL, the price is of type Decimal. But in this case, we need it to be a Float. We may have to come back to this later.

So in the code, for the 1st case we have to spread out the `initialData` values and format `price`. The 2nd case stays the same, just the second part of the ternary operator.

```tsx
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      ...initialData,
      price: parseFloat(String(initialData?.price)),
    } : {
      name: '',
      images: [],
      price: 0,
      categoryId: '',
      colorId: '',
      sizeId: '',
      isFeatured: false,
      isArchived: false,
    }
  });
```

### Product Form Output

- Start with a fragment that contains the `AlertModal`, `Heading` and delete `Button`

```tsx
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading
          title={title}
          description={description}
        />
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
      </div>
      <Separator />
```

- Create the `Form`, `form` and the `FormField` that contains our images
- The name/label of the `FormField` will be is images, with an `ImageUpload` component which contains the props:

  1. `value` - each value inside the `field` is mapped from an `image` to `image.url`
  2. `disabled` set to `loading`
  3. `onChange` is set to a function that takes `url` as parameter, and add that `url` to the existing collection of values. We spread out `field.value` and add an object containing `url`
  4. `onRemove` will iterate over the values of `field.value` but filter it out by the current image. 
    - The first function takes the parameter `url` and pass it to `field.onChange()`. The first parameter inside `onChange()` will spread out the values of `field.value` and use `filter` on it
    - The function inside the filter will have a parameter named `current`, which is the current image, and check if the `url` is equal to the passed in `url`.

```tsx
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url )}
                    disabled={loading}
                    onChange={
                      (url) => field.onChange([...field.value, { url }])
                    }
                    onRemove={
                      (url) => field.onChange([...field.value.filter((current) => current.url !== url)])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
```

- Another `FormField` will render the name and product name to enter by. Finally a submit button to create the product.

```tsx
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url )}
                    disabled={loading}
                    onChange={
                      (url) => field.onChange([...field.value, { url }])
                    }
                    onRemove={
                      (url) => field.onChange([...field.value.filter((current) => current.url !== url)])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default ProductForm
```

- Add the **price** `FormField`

```tsx
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} placeholder="9.99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
```

#### Product Form Select

In categories, we created a `FormField` that contains the `Select` component. We will create the same thing that allows us to select a category for a product.

[shadcn/ui - Select](https://ui.shadcn.com/docs/components/select)

Right after the price FormField, we will add the category select FormField.

```tsx
<FormField
  control={form.control}
  name="categoryId"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Category ID</FormLabel>
      <Select 
        disabled={loading} 
        onValueChange={field.onChange} 
        value={field.value}
        defaultValue={field.value}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue
            defaultValue={field.value}
            placeholder="Select a category"
            />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem
              key={category.id}
              value={category.id}
            >
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
```

To make this work we have to navigate back to the page that holds this form (the server component) where we load our initial product. We fetch the `categories` inside this store. While we are at it, we can also fetch `sizes` and `colors`

- Add `storeId` in the params
- fetch `colors` found in the store
- fetch `categories` found in the store
- fetch `sizes`
- pass in all this data into the client

`app\(dashboard)\[storeId]\(routes)\products\[productId]\page.tsx`
```tsx
// imports...
const ProductPage = async ({
  params
}: {
  params: { productId: string, storeId: string }
}) => {

  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true
    }
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    }
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    }
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm 
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={product} 
        />
      </div>
    </div>
  )
}

export default ProductPage;
```

Next we,

1. fix the typings in `ProductFormProps` then 
2. destructure them in the props of `ProductForm`

`ProductForm.tsx`
```tsx
import { Category, Color, Image, Product, Size } from '@prisma/client';
// ...

// Define type and shape of props
interface ProductFormProps {
  initialData: Product & {
    images: Image[]
  } | null;
  categories: Category[];
  colors: Color[];
  sizes: Size[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  colors,
  sizes
}) => {
  // ...
```

Now with that we can also add a `FormField` `Select` for both `sizes` and `colors` in the output.

```tsx
<FormField
  control={form.control}
  name="sizeId"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Size ID</FormLabel>
      <Select 
        disabled={loading} 
        onValueChange={field.onChange} 
        value={field.value}
        defaultValue={field.value}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue
            defaultValue={field.value}
            placeholder="Select a size"
            />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {sizes.map((size) => (
            <SelectItem
              key={size.id}
              value={size.id}
            >
              {size.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
<FormField
  control={form.control}
  name="colorId"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Color ID</FormLabel>
      <Select 
        disabled={loading} 
        onValueChange={field.onChange} 
        value={field.value}
        defaultValue={field.value}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue
            defaultValue={field.value}
            placeholder="Select a color"
            />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {colors.map((color) => (
            <SelectItem
              key={color.id}
              value={color.id}
            >
              {color.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
```

#### Checkbox component

The next thing to add to our output is the `isFeatured` and `isArchived` for our `ProductForm`.

We are going to use the `Checkbox` component.

[shadcn/ui - Checkbox](https://ui.shadcn.com/docs/components/checkbox)

```sh
npx shadcn-ui@latest add checkbox
```

Now create a `FormField` right after the price form field. Now inside this `FormField` for `isFeatured` is the following props: `control`, `name` and `render`. Then a `FormItem`, followed by a `FormControl` and a `Checkbox` within that. The checkbox will have the props `checked` set to `field.value` and `onCheckChange` set to `field.onChange`.

```tsx
<FormField
  control={form.control}
  name="isFeatured"
  render={({ field }) => (
    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
      <FormControl >
        <Checkbox 
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      </FormControl>
    </FormItem>
  )}
/>
```

##### Issue to note: type error event under `onCheckedChange`

Now in certain cases, you may get a type error within the `Checkbox` prop of `onCheckChange`. Now in may work in development as intended but in production this type error may prevent deployment.

The issue revolves around React Hook Form, `onChange` values and mismatch with `FormValues`. Here is a related GitHub issue regarding this [react-hook-form issue with onChange](https://github.com/react-hook-form/react-hook-form/pull/10342).

The workaround is to either get the compiler to ignore the type error with a comment `@ts-ignore` to suppress ts errors in the next line.

```tsx
<Checkbox 
  checked={field.value}
  // @ts-ignore
  onCheckedChange={field.onChange}
/>
```

If you have no error, then we can move on.

##### `isFeatured` checkbox

Now to wrap up the `isFeatured` form field, we need to add a `div` right below `FormControl` that contains `FormLabel` and `FormDescription`. Label is the title of the checkbox and description is the paragraph that describes what the checkbox will do.

```tsx
<FormField
  control={form.control}
  name="isFeatured"
  render={({ field }) => (
    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
      <FormControl >
        <Checkbox 
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      </FormControl>
      <div className="space-y-1 leading-none">
        <FormLabel>
          Featured
        </FormLabel>
        <FormDescription>
          This product will appear on the home page
        </FormDescription>
      </div>
    </FormItem>
  )}
/>
```

##### `isArchived` checkbox

We can copy the `isFeatured` `FormField` and just change the `name`, `FormLabel` and `FormDescription`.

```tsx
<FormField
  control={form.control}
  name="isArchived"
  render={({ field }) => (
    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
      <FormControl >
        <Checkbox 
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      </FormControl>
      <div className="space-y-1 leading-none">
        <FormLabel>
          Archived
        </FormLabel>
        <FormDescription>
          This product will not appear anywhere in the store
        </FormDescription>
      </div>
    </FormItem>
  )}
/>
```

### Product Form - function handlers

Now to wrap up our product form, we create the submit and delete handlers with the correct routes.

```tsx
  // 2. Define a submit handler
  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        // Update specific product
        await axios.patch(`/api/${params.storeId}/products/${params.productId}`, data);
      } else {
        // Create new product
        await axios.post(`/api/${params.storeId}/products`, data);
      }
      // Refresh current route to make new request to server
      // Re-fetch data requests & re-render server components
      // Re-initializes initialData
      router.refresh();
      // Re-route the user to the products page
      router.push(`/${params.storeId}/products`)
      // Success notification with dynamic message
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Define a delete handler
  const onDelete = async () => {
    try {
      setLoading(true);
      // Call an API with dynamic route to delete the product
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      // Re-synchronize server component to update data
      router.refresh();
      // Navigate back to the specific store's products page after deletion
      router.push(`${params.storeId}/products`);
      toast.success("Product deleted.");
    } catch (error) {
      // Safety mechanism will prompt a warning to delete any related records to the product
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      // Close the Modal
      setOpen(false);
    }
  };
```

## Product API routes

Under `api/[storeId]` folder, create `products` folder with a `route.ts` inside.

- Inside the `api/[storeId]/products`, create a `[productId]` folder with a route.ts inside.

### Routes for all products

Starting with `app\api\[storeId]\products\route.ts`, which will be our route for all products.

### Products - `POST` route

- Create a `POST` route that authenticates the user, 401 if unauthenticated.
- Extract the body of the request and destructure the fields
  - Fields are { name, price, categoryId, colorId, sizeId, images, isFeatured, isArchived}
  - Check for each field

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
    const { 
      name, 
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived
     } = body;
```

Next we check every *required* field in the body. Recall that `isFeatured` and `isArchived` are optional properties.

- Since images is an array we have to check for both if `images` is empty and if `images.length` is non-positive 
- Also check store exists for current user

`app\api\[storeId]\products\route.ts`
```tsx
    // Check every required field
    if (!name){
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!price){
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!categoryId){
      return new NextResponse("Category ID is required", { status: 400 });
    }

    if (!colorId){
      return new NextResponse("Color ID is required", { status: 400 });
    }

    if (!sizeId){
      return new NextResponse("Size ID is required", { status: 400 });
    }

    if (!images || !images.length){
      return new NextResponse("Images are required", { status: 400 });
    }

    // Check if storeId exists
    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
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
```

- Create the product passing in all the data. Then send back the response.
  - Note that we can't just pass in `images` as it is a separate model

We need to open up an object for `images`, and use `createMany` to pass in an object with `data`. Open up an array for `data` and spread out the `images` while mapping each image that is of type string url and return that image.


```tsx
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // ...

    // Create product for user's specific store in the database
    const product = await prismadb.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        colorId,
        sizeId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image )
            ]
          }
        }
      }
    });

    // Send back response with the product
    return NextResponse.json(product);
  } catch (error){
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
```

### Products - GET route

The `GET` route will be used heavily on the front-end side, as it will retrieve all products related to that store.

Because it will be used extensively, we want to give it filters to the products we retrieve.

We want to get the subset of products for a specific `categoryId` or a specific `colorId` and so on.

To do this we have to use the [URL interface](https://developer.mozilla.org/en-US/docs/Web/API/URL).

In the given code, `searchParams` is a property of the `URL` interface in JavaScript. It returns a `URLSearchParams` object that allows access to the GET decoded query arguments contained in the URL. In this code, `searchParams` is used to extract the value of the `categoryId` parameter from the URL query string. If `categoryId` is not present in the query string, it is set to `undefined`. 

The `URLSearchParams` object provides utility methods to work with the query string of a URL. It can be used to parse out the parameters from the query string. 

In this code, `searchParams.get("categoryId")` returns the value of the `categoryId` parameter from the URL query string. If it is not present, it returns `undefined`. The value of `categoryId` is then assigned to a constant variable named `categoryId`.

```tsx
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    
    const categoryId = searchParams.get("categoryId") || undefined;

    // ...
}
```

Now we do the same for the other filters: `colorId`, `sizeId`. We'll also have `isFeatured` but since its optional, we don't need to set it to undefined.

```tsx
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);

    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");
```

Now when we load all the products using `prismadb.product.findMany` we pass in these arguments to the `where`.

- Pass in the IDs to `where`
- If `isFeatured` is passed in, then `true` otherwise `undefined` to ignore it
- `isArchived` will *always* be `false` because we never want to load back products that are archived from our store

```tsx
    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false
      }
    });
```

Next we have to `include` the related records to properly display it in the front-end. Also `orderBy` descending so we can load the newest products.

```tsx
    // Find all products in the store filtered by query arguments
    // Never load archived products
    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: `desc`
      }
    });
```

### Product - GET route

Navigate to `app\api\[storeId]\products\[productId]\route.ts`, and create a `GET` function. This will fetch the individual product given a `productId`. When fetching the `product` make sure to include the related records.

```tsx
export async function GET (
  req: Request,
  { params }: { params: { productId: string }}
){
  try {
    // Check parameters
    if (!params.productId){
      return new NextResponse("Product ID is required", { status: 400 });
    }

    // Find the specific product in database
    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
```

### Product - PATCH route

Similar to the products patch route, we have to 

- check params
- authenticate user
- extract & check fields in the body
- check if store exists for user
- Find and update the specific product
- Send response with product

```tsx
export async function PATCH (
  req: Request,
  { params }: { params: { storeId: string, productId: string }}
){
  try {
    // Check parameters
    if (!params.storeId){
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!params.productId){
      return new NextResponse("Product ID is required", { status: 400 });
    }

    // Authenticate userId with Clerk to check if user is logged-in
    const { userId } = auth();
    
    // If userId does not exist send back 401 response
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    // Extract body from the request
    const body = await req.json();
    
    // Destructure fields out of body
    const { 
      name, 
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived
     } = body;

    // Check every required field
    if (!name){
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!price){
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!categoryId){
      return new NextResponse("Category ID is required", { status: 400 });
    }

    if (!colorId){
      return new NextResponse("Color ID is required", { status: 400 });
    }

    if (!sizeId){
      return new NextResponse("Size ID is required", { status: 400 });
    }

    if (!images || !images.length){
      return new NextResponse("Images are required", { status: 400 });
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

    // Find and Update a specific product
    const product = await prismadb.product.updateMany({
      where: {
        id: params.productId
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {}
        },
        isFeatured,
        isArchived,
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

```

#### Issue with Product PATCH route

The `images` in this code is what throws the error:
```tsx
    const product = await prismadb.product.updateMany({
      where: {
        id: params.productId
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {}
        },
        isFeatured,
        isArchived,
      }
    });
```

The error msg:

```sh
Type '{ name: any; price: any; categoryId: any; colorId: any; sizeId: any; images: { deleteMany: {}; }; isFeatured: any; isArchived: any; }' is not assignable to type '(Without<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput> & ProductUncheckedUpdateManyInput) | (Without<...> & ProductUpdateManyMutationInput)'.
  Object literal may only specify known properties, and 'images' does not exist in type '(Without<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput> & ProductUncheckedUpdateManyInput) | (Without<...> & ProductUpdateManyMutationInput)'.ts(2322)
index.d.ts(7431, 5): The expected type comes from property 'data' which is declared here on type '{ data
```

*Solution:* Modify the query to update a bit. We are going to have to use `update` instead of `updateMany`. Next we also don't assign the result of the query yet to a constant. 

The solution comes in two parts:

1. Update the specific product with the latest data using a general (use `update()`). Here we delete images.
2. Add `const` to specific product by creating it with new images.

```tsx
    // General query to find and update a specific product
    // Also deletes the images
    await prismadb.product.update({
      where: {
        id: params.productId
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {}
        },
        isFeatured,
        isArchived,
      }
    });

    // Update the product by creating new images
    const product = await prismadb.product.update({
      where: {
        id: params.productId
      },
      data: {
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image),
            ]
          }
        }
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
```

### Product - DELETE route

Delete route deletes a specific product.

- Check params, authorization step, store check, delete product, send response

```tsx
export async function DELETE (
  req: Request,
  { params }: { params: { storeId: string, productId: string }}
){
  try {
    // Check parameters
    if (!params.storeId){
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!params.productId){
      return new NextResponse("Product ID is required", { status: 400 });
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

    // Find and Delete product
    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
```

## Product - Cell Action

Like previous cell action, update the 
- imports, prop, handlers, and route in menu item

```tsx
"use client";

// Global Imports
import axios from 'axios';
import React, { useState } from 'react';
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// Local Imports
import { AlertModal } from '@/components/modals/AlertModal';
import { ProductColumn } from './columns';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CellActionProps {
  data: ProductColumn
}

export const CellAction: React.FC<CellActionProps> = ({
  data
}) => {
  // Create router object to perform client-side navigation
  const router = useRouter();

  // Hook returns an object containing current route's filled in dynamic parameters
  const params = useParams();

  // Create open state to control the Alert modal
  const [open, setOpen] = useState(false);

  // Create loading state to disable interactive elements
  const [loading, setLoading] = useState(false);

  // Copy Event Handler
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Product ID copied to clipboard.");
  }

  // Define a delete handler
  const onDelete = async () => {
    try {
      setLoading(true);
      // Call an API with dynamic route to delete the product
      await axios.delete(`/api/${params.storeId}/products/${data.id}`);
      // Refresh current route to make new request to server
      // Re-fetch data requests & re-render server components
      router.refresh();
      toast.success("Product deleted.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      // Close the Modal
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal 
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={(onDelete)}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            Actions
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${params.storeId}/products/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
```

## Product - Testing

- Create a product
  - Upload image, fill out form fields
- Test the cell actions:
  - Copy, Update and Delete
- Filter/Search color by name
- Copy an API route
  - Test route url
  - Test route url with individual `productId`

- Test the filter query, load an API url filtered by `sizeId`
  - Copy the `sizeId` property
  - In the url, add in front of `products` the string `?sizeId=SIZE_ID_HERE`
  - Test the API parameter query with the parameter of `sizeId`, should yield the same result
- Test color filter query
- Test `products?isFeatured=false` in the query URL

- Test Archived. Set the product to archived in the form. Then load the API route to that product to see if we retrieve anything from the response.
  - Should see product doesn't load any data because `isArchived` is `true`

# Order entity

We build the next entity for orders in our ecommerce store.

## Order Model

The order entity will represent our orders, a request for something to be made, supplied, or served. It contains the following properties `{ id, storeId, store relation, orderItems, isPaid, phone, address, createdAt, updatedAt }`.

- Both `phone` and `address` is initialized to an empty string, and will be set when an order has been made.

```prisma
model Order {
  id         String    @id @default(uuid())
  storeId    String
  store      Store @relation("StoreToOrder", fields: [storeId], references: [id])
  orderItems OrderItem[]
  isPaid     Boolean
  phone      String    @default("")
  address    String    @default("")
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt

  // Manually add index on relation scalar fields
  @@index([storeId])
}
```

At to `Store` model

```prisma
model Store {
  // ...
  orders     Order[]      @relation("StoreToOrder")
}
```

### OrderItem model

The `OrderItem` will be an intermediary for many relationships between `OrderItems` and `products`.

It will have `{ id, orderId, order relation, productId, product relation }`

```prisma
model OrderItem {
  id        String  @id @default(uuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id])
  productId String
  product   Product @relation(fields: [productId], references: [id])

  // Manually add index on relation scalar fields
  @@index([orderId])
  @@index([productId])
}
```

Add the OrderItem to `Product` model.

```prisma
model Product {
  // ...
  orderItems  OrderItem[]
}
```

### Update the prisma schema

Then generate prisma client and push to database to sync the changes.

```sh
npx prisma generate
```

```sh
npx prisma db push
```

## Orders - Main Nav

Let's add `orders` to the `routes` in `MainNav`. I put it below `products`.

`ecommerce-admin\components\MainNav.tsx`
```tsx
export default function MainNav({
// ...
  const routes = [
    // ...
    {
      href: `/${params.storeId}/orders`,
      label: 'Orders',
      active: pathname === `/${params.storeId}/orders`,
    },
  ];
```

### Orders - Project structure

Because the orders entity is most similar to colors, we can copy the `app\(dashboard)\[storeId]\(routes)\colors` folder and paste it into `(routes)` while renaming it to `orders`.

```sh
- app
  |- (dashboard)
    |-  [storeId]
      |-  (routes)
        |- orders
          |- components
            |- cell-action.tsx
            |- client.tsx
            |- columns.tsx
          |- page.tsx
```

Orders will be more simpler as it will *not* have a Form and API List.

We can delete the `[orderId]` folder as it won't need a specific order page.

## Orders Page

Navigate to `app\(dashboard)\[storeId]\(routes)\orders\page.tsx`

- The `imports` and `OrdersPage`

```tsx
// Global Imports
import React from 'react';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';

// Local Imports
import OrdersClient from './components/client';
import { OrderColumn } from './components/columns';
import { priceFormatter } from '@/lib/utils';

const OrdersPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
```

- Fetch all orders, make sure to include `orderItems` which includes `product`. 
  - Our order can have many items inside which individual products, that way we can combine the prices

```tsx
  // Fetch all orders specific to the active store
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
```

- Format the orders to an `OrderColumn`
  - it will follow the format: `{ id, phone, adress, products, totalPrice, createdAt }`
  - `products` will map `orderItems` to the `products` name joined by a comma
  -`totalPrice` will use our `priceFormatter` to reduce our array to a total price

To repeat, we run a `reduce` function over all our `orderItems` and we combine the previous item's price with the next item's price. We accumulate this value starting from 0. We finally format the result of this reduction with our `priceFormatter`.

```tsx
  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
    totalPrice: priceFormatter.format(item.orderItems.reduce((total, item) => {
      return total + Number(item.product.price)
    }, 0)),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }));
```

- Finally the output of the page is pass in the formatted data to the client

```tsx
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrdersClient data={formattedOrders}/>
      </div>
    </div>
  );
}

export default OrdersPage;
```

## Order Column

The column for Orders will simply have the properties: `{ id, phone, address, isPaid, totalPrice, products, createdAt }`. We will also have no `CellAction` because we will only display the data. We will later use Stripe API to handler orders, not us.

`app\(dashboard)\[storeId]\(routes)\orders\components\columns.tsx`
```tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
]
```

## Order Client

The `OrderClient` will simply present all the orders data in the `DataTable`. The output is simply a `Heading`, `Separator` and `DataTable`.

```tsx
"use client";

// Local Imports
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { OrderColumn, columns } from "./columns";

interface OrderClientProps {
  data: OrderColumn[]
}

// Client component that loads all our Orders
const OrderClient: React.FC<OrderClientProps> = ({
  data
}) => {

  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey={"products"} />
    </>
  )
}

export default OrderClient;
```

# Important: Updating projects with NextJS 14

[Next.js 14](https://nextjs.org/blog/next-14) was officially released on October 26, 2023, at the Next.js Conf, where Vercel announced the new features and improvements of the latest version of the React framework. Some of the highlights of Next.js 14 are:

- Turbopack: A Rust-based compiler that boosts the performance and reliability of local development, with faster server startup and code updates.
- Server Actions: A way to perform mutations and handle forms with progressive enhancement, integrated caching, and revalidation.
- Partial Prerendering: A new rendering mode that combines static and dynamic content, with fast initial response and streaming data.
- Next.js Learn: A free course that teaches the basics of Next.js, such as the App Router, authentication, databases, and more.

[Upgrading from NextJS 13 to 14](https://nextjs.org/docs/pages/building-your-application/upgrading/version-14)

We are going to update our core packages with the following command

```sh
npm i next@latest react@latest react-dom@latest eslint-config-next@latest
```

Then we get an error in the terminal

```sh
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve
npm ERR! 
npm ERR! While resolving: next-cloudinary@4.22.0
npm ERR! Found: next@14.0.2
npm ERR! node_modules/next
npm ERR!   next@"^14.0.2" from the root project
npm ERR!   peer next@">=10" from @clerk/nextjs@4.27.1
npm ERR!   node_modules/@clerk/nextjs
npm ERR!     @clerk/nextjs@"^4.23.2" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer next@"^12 || ^13" from next-cloudinary@4.22.0
npm ERR! node_modules/next-cloudinary
npm ERR!   next-cloudinary@"^4.22.0" from the root project
npm ERR!
npm ERR! Conflicting peer dependency: next@13.5.6
npm ERR! node_modules/next
npm ERR!   peer next@"^12 || ^13" from next-cloudinary@4.22.0
npm ERR!   node_modules/next-cloudinary
npm ERR!     next-cloudinary@"^4.22.0" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
```

To solve `ERESOLVE` error in 2 steps:

1. Remove `node_modules` and `package_lock.json`
2. Run the command to install packages & dependencies using `--legacy-peer-deps` flag

```sh
npm install --legacy-peer-deps
```

#### What does `--legacy-peer-deps` dependency do?

The command `npm install --legacy-peer-deps` is used to install packages and dependencies in a Node.js project, but with a specific purpose. This command is used to install dependencies that are specified in the `peerDependencies` section of a package's `package.json` file, but with a twist.

Normally, npm v7+ will automatically install peer dependencies and check for any conflicts or incompatible versions. However, this can sometimes cause errors or breakages, especially if you are using older or unmaintained packages that have not updated their peer dependencies.

The `--legacy-peer-deps` flag tells npm to ignore all peer dependencies when installing, in the style of npm version 4 through version 6. This means that npm will not try to install or resolve peer dependencies, and will not throw any errors if there are any mismatches or conflicts. Instead, it will just give you warnings and let you handle the peer dependencies manually.

This can be useful if you want to avoid potential dependency issues, or if you want to have more control over the versions of your peer dependencies. However, it also comes with some risks, such as introducing breaking changes or missing features that depend on the peer dependencies. Therefore, you should use this flag with caution and only when necessary.

#### Upgrade NodeJS version

Got another error:

```sh
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: 'next@14.0.2',
npm WARN EBADENGINE   required: { node: '>=18.17.0' },
npm WARN EBADENGINE   current: { node: 'v18.15.0', npm: '9.1.3' }
npm WARN EBADENGINE }
```

This means that the package `next@14.0.2` requires a specific version of Node.js which is `18.17.0` or higher, but I am still using Node.js version `18.15.0`.

Install the latest version of Node.js here: [Nodejs download](https://nodejs.org/en/download).

Then after installing check the version of Nodejs by running the command:

```sh
node -v
```

#### Updating Clerk & Cloudinary

We still have the following issues

```sh
npm WARN ERESOLVE overriding peer dependency
npm WARN While resolving: ecommerce-admin@0.1.0
npm WARN Found: next@14.0.2
npm WARN node_modules/next
npm WARN   peer next@">=10" from @clerk/nextjs@4.27.1
npm WARN   node_modules/@clerk/nextjs
npm WARN     @clerk/nextjs@"^4.23.2" from the root project
npm WARN   1 more (the root project)
npm WARN
npm WARN Could not resolve dependency:
npm WARN peer next@"^12 || ^13" from next-cloudinary@4.28.0
npm WARN node_modules/next-cloudinary
npm WARN   next-cloudinary@"^4.22.0" from the root project
```

Error means that there is a conflict between the peer dependencies of some of the packages used in the project. A peer dependency is a requirement that a package has on another package, usually to ensure compatibility or functionality. 

For example, `next-cloudinary` requires `next` version 12 or 13 as a peer dependency, meaning that it expects your project to have that version of `next` installed.

However, in this case, we have `next` version 14.0.2 installed, which is not compatible with `next-cloudinary`'s peer dependency. This causes npm to warn you that it is overriding the peer dependency and installing the version of `next` that you specified in your package.json file. This can lead to potential issues or unexpected behavior when using the packages together.

To fix this error, we can either:

- Upgrade or downgrade your `next` version to match the peer dependency of `next-cloudinary`. For example, you can run `npm install next@13` to install the latest version of `next` 13.x.

- Use the `--force` or `--legacy-peer-deps` flags when installing your packages to ignore the peer dependency conflicts. For example, you can run `npm install --force` or `npm install --legacy-peer-deps` to install all your packages without checking for peer dependencies. However, this can also cause problems or breakages, so use it with caution.

- Find an alternative package that does not have a conflicting peer dependency with `next`. For example, you can look for other packages that provide cloudinary integration for next.js, such as `next-cms-cloudinary`⁴ or `next-optimized-images`.


Let's re-install Clerk

```sh
npm install @clerk/nextjs
```

Next re-install cloudinary

```sh
npm install next-cloudinary
```

Why use cloudinary instead of Next.js Image? In short, `Image` from Next.js does not actually resize images resulting in larger file sizes. Cloudinary's `CldImage` actually does resize images as specified, resulting in smaller file sizes. See this [blog post on nextjs image optimization with cloudinary](https://filiptrivan.com/nextjs-image-optimization-with-cloudinary).

Although the issue still persists, after some testing both Clerk and Cloudinary still works on the admin dashboard.

# Front-End Store

Now we need to implement the actual Dashboard page for the Overview tab, which will contain the API calls for the Web hooks and Stripe API.

We cannot manually create orders because it can only be done through Stripe which needs to be connected to the front-end store.

So this marks the second half of the major project, to create the front-end ecommerce store.

We will need to create a new next project. The admin project needs to run concurrently with the store, on the port 3000.

I have the entire repo inside a folder named `complete-ecommerce-store`, which has a folder named `ecommerce-admin`. We are going to create a new next project named `ecommerce-store`.

### Project structure overview:

```sh
- complete-ecommerce-store
  |- ecommerce-admin
    |- app
    |- ...
  |- ecommerce-store
    |- app
    |- ...
```

*This project will run on port 3001*.

To run the next.js project on a different port, we can run the command

```sh
npm run dev -p 3001
```

OR, modify the specify the port in the scripts inside `package.json`

```json
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001",
    "lint": "next lint"
  },
```

### Setting up the Next.js project for the store

1. Navigate to the base directory of the project `complete-ecommerce-store`.

2. Create a new Next 13 project

```sh
npx create-next-app@latest ecommerce-store --typescript --tailwind --eslint
```

- No for `/src`
- Yes for app router
- No for import alias

3. Clean up Next project

Going to modify and remove some files that comes with create a next project.

- Modify global css

Navigate inside the project and go inside the `app` folder and find the `global.css`.

The only styles should be `height: 100%`. You can remove the rest of the boilerplate.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
 
html,
body,
:root {
  height: 100%;
}
```

- Remove the `ecommerce-store/app/page.tsx`

4. Create folder named `(routes)` inside `app` folder

Inside `(routes)`, create a `page.tsx` file. This will contain the `HomePage`.

`ecommerce-store\app\(routes)\page.tsx`
```tsx
export default function HomePage() {
  return(
    <div>
      Store
    </div>
  )
}
```

5. Use a different font

We are not going to use `Inter`, instead we use `Urbanist` font. While we are here, also update the `metadata`.

`ecommerce-store\app\layout.tsx`
```tsx
import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'

const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Store',
  description: 'Ecommerce store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
```

## Creating Components

Create a `folder` named `components` inside `ecommerce-store`.

Create a `Footer` component.

`ecommerce-store\components\Footer.tsx`
```tsx
import React from 'react';

export default function Footer() {
  return (
    <div>Footer</div>
  )
}
```

Now let's import `Footer` and add it to the output of our layout

```tsx
// ...
import Footer from '@/components/Footer';
// ...
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

### Footer

Let's style the footer a bit.

Going to take the `Date` object and take its year to render. We are going to make it client-side component. Also do the mounting trick to ensure that `Date` object is properly loaded in.

```tsx
"use client";

// global imports
import React, { useEffect, useState } from "react";

export default function Footer() {
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

  // Create Date object with current date & time
  const date = new Date();

  return (
    <footer className="bg-white border-t">
      <div className="mx-auto py-10">
        <p className="text-center text-xs text-black">
          &copy; {date.getFullYear()} StoreName. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
```

### Navbar component

- Create `Navbar` component in `/app/components`

`ecommerce-store\components\Navbar.tsx`
```tsx
import React from 'react';

export default function Navbar() {
  return (
    <div className="border-b">
      Navbar
    </div>
  )
}
```

- Render the Navbar in the root layout

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

### UI components

#### `Container` component 

Create inside `components` a file `ui/Container.tsx`.

Now create a react functional component for `Container`. Give it a margin auto. Given a large screen (1280px), limit the width that our `Container` can extend.

`ecommerce-store\components\ui\Container.tsx`
```tsx
import React from 'react';

const Container = () => {
  return (
    <div className="mx-auto max-w-7xl">
      Container
    </div>
  )
}

export default Container;
```

We will also have props for our `Container`, so we need to create an interface for the props.

```tsx
interface ContainerProps {
  children: React.ReactNode;
}
```

Then add the typings

```tsx
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="mx-auto max-w-7xl">
      {children}
    </div>
  )
}


export default Container;
```

Alternatively, we can avoid using `React.FC` and use `JSX.Element`.

```tsx
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps): JSX.Element => {
  return (
    <div className="mx-auto max-w-7xl">
      {children}
    </div>
  )
}

export default Container;
```

Be aware that `JSX.Element` is an alias for `React.ReactElement<any, any>` which means it can accept any type and props. However, this also means it loses some type safety and can allow invalid values to be passed as props.

```tsx
// This is valid TypeScript, but invalid JSX
const element: JSX.Element = <div>{42}</div>;
```

`React.ReactElement` is a TypeScript type that represents the return type of `React.createElement`. It is defined as an interface with generic parameters for the type and props. It also has a `key` and a `ref` property. **This means it can enforce more type safety and prevent invalid values to be passed as props**. e.g.,

```tsx
// This is invalid TypeScript, because 42 is not a valid prop for div
const element: React.ReactElement = <div>{42}</div>;
```

The main difference between `JSX.Element` and `React.ReactElement` is that `JSX.Element` is more flexible and can represent any JSX expression, while `React.ReactElement` is more specific and can only represent an object with a type and props. 

Therefore, when typing the return value of a component, it is usually better to use `React.ReactElement`, as it provides more type safety and avoids errors when passing props. 

However, when typing the children prop of a component, it might be better to use `React.ReactNode`, which is a more general type that includes any possible value that can be rendered by a component.

##### Note on `React.FC`

AS of Typescript 5.1 and React 18, `React.FC` is now officially "fine" because

1. It no longer implicitly includes `children` in the props type
2. It no longer breaks if you return `undefined`, `string` or `number`

The better alternative is to simply annotate props instead of using `React.FC`.

Here is a blog post on the topic, [stop hating react fc](https://www.totaltypescript.com/you-can-stop-hating-react-fc).

##### Back to `Container`

Again using arrow functional component with props to create `Container`

```tsx
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="mx-auto max-w-7xl">
      {children}
    </div>
  )
}


export default Container;
```

But you know what? Even in times of arrow functions and transpilation, I still want to write a simple named function with props.

```tsx
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="mx-auto max-w-7xl">
      {children}
    </div>
  )
}
```

Some code improvements for above:

- Specify `return` type of function component as `JSX.Element`
- Use more specific type for `children` prop such as `React.ReactElement`

```tsx
// ...
export default function Container({ children }: ContainerProps): JSX.Element {
```

### Further develop `Navbar`

- Create a `MainNav` component under `/ui`
  - React arrow functional component export (rafce)
- Wrap `Navbar` with `Container`
- Inside `Container` add a `div` that contains the Links. Create the first `Link` with a text of "Store"
- After the `Link`, add a `MainNav` component

```tsx
import React from 'react';
import Link from 'next/link';

import Container from '@/components/ui/Container';
import MainNav from '@/components/ui/MainNav';

export default function Navbar() {
  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
        <Link
          className="ml-4 flex lg:ml-0 gap-x-2"
          href="/"
        >
          <p className="font-bold text-xl">STORE</p>
        </Link>
        <MainNav />
        </div>
      </Container>
    </div>
  )
}
```

### `MainNav` component

This component contains our `routes`.

- Add prop interface with `data` inside. For now it's of type `any` but we will fix this later.

```tsx
import React from 'react';

interface MainNavProps {
  data: any
}

const MainNav: React.FC<MainNavProps> = ({
  data
}) => {
  return (
    <nav>
      MainNav
    </nav>
  )
}

export default MainNav
```

- Now use the `data`, an array of our `routes`, and map it to a more usable route object
  - Get the pathname

```tsx
import { usePathname } from 'next/navigation';

const MainNav: React.FC<MainNavProps> = ({
  data
}) => {
  // Hook that reads current URL pathname from a client component
  // URL pathname comes after domain name and before query string
  const pathname = usePathname();
```

- Map each `route` in `data` to an object that contains `href`, `label` and `active`.
  - `href` is a template string with "/.../${route.id}"
  - `label` is set to `route.name`
  - `active` is set to pathname equal to href's template string, like this "pathname === /.../${route.id}"
- Create the first routes object with `category`

```tsx
  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`
  }));
```

- In the output, map each route to a Link filling in the props

```tsx
  return (
    <nav
      className="mx-6 flex items-center space-x-4 lg:space-x-6"
    >
      {routes.map((route) => {
        <Link
          key={route.href}
          href={route.href}
          className={}
        >
          {route.label}
        </Link>
      })}
    </nav>
  )
```

#### Issue: need to merge class names for Link

We have to create a `ecommerce-store\lib\utils.ts`, to hold our function that merges class name utilities for Tailwind. Similar to our previous project with the admin.

```ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

The two packages to install to make this work:

- [clsx](https://www.npmjs.com/package/clsx) is a utility for constructing `className` strings conditionally.
- [tailwind-merge](https://www.npmjs.com/package/tailwind-merge) is a utility function to efficiently merge Tailwind CSS classes in JS without style conflicts.

```sh
npm i clsx tailwind-merge
```

#### Style active `Link` with Tailwind classes

Now we can import the function `cn` to merge classnames. We want this so that we can render tailwind class names on the condition of which route is active.

We add the conditional as the second parameter to `cn` allowing us to style the link based on which route is the active one.

```tsx
import { cn } from "@/lib/utils";

// ...
  return (
    <nav
      className="mx-6 flex items-center space-x-4 lg:space-x-6"
    >
      {routes.map((route) => {
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-medium transition-colors hover:text-black",
            route.active ? "text-black" : "text-neutral-500"
          )}
        >
          {route.label}
        </Link>
      })}
    </nav>
  )
}
```

#### Adding types to data

Let's fix `MainNavProp` typings. Currently we have `data: any`

```tsx
interface MainNavProps {
  data: any
}
```

##### Primer: interface in Typescript

Before we start defining the shape of our data, we should step back and talk about interfaces.

- An interface in TypeScript is an abstract type that defines the shape of an object, specifying the names and types of its properties. 

- Interfaces are used to enforce contracts within your code, as well as with external code. 

- Interfaces are not converted to JavaScript, but only used for type checking by the TypeScript compiler. 

- You can declare an interface using the `interface` keyword, followed by the interface name and a set of curly braces containing the property definitions.

- You can use interfaces to define the types of function parameters, return values, class members, and more. 

- Interfaces can also have optional properties, readonly properties, index signatures, function types, etc.

For example:

```ts
interface Person {
  name: string;
  age: number;
  greet(): void;
}
```

This interface defines a `Person` type that has three properties: `name`, `age`, and `greet`. The `name` and `age` properties are of type `string` and `number`, respectively, while the `greet` property is a method that returns nothing (`void`). Any object that implements this interface must have these three properties with the same types. 

For example:

```ts
let luna: Person = {
  name: "Luna",
  age: 20,
  greet() {
    console.log("Hello, I am " + this.name);
  }
};
```

This object `luna` is of type `Person`, and it has all the properties required by the interface. 

##### Defining our data

To create the actual types for `data`, navigate to root of the project and create `types.ts`.

As of now, we have one route that contains our `Category`. We need to define the interface for a `Category`. To define the basic shape of our `Category`, we should give it a `{ id, name, billboard }`.

`types.ts`
```ts
export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}
```

However, there is an error: `Billboard` is unresolved. We have to also define the `Billboard`, which should have `{ id, name, imageUrl }`.

```ts
export interface Billboard {
  id: string;
  name: string;
  imageUrl: string;
};

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
};
```

Now we can navigate back to our `MainNav` and change our `data` to type `Category[]`. Make sure to import `Category` from `types.ts`

`MainNav.tsx`
```tsx
import { Category } from '@/types';

// Define type and shape of props
interface MainNavProps {
  data: Category[];
}
```

##### Issue: Type `void[]` is not assignable to type `ReactNode`

```sh
Type 'void[]' is not assignable to type 'ReactNode'.
  Type 'void[]' is not assignable to type 'Iterable<ReactNode>'.
    The types returned by '[Symbol.iterator]().next(...)' are incompatible between these types.
      Type 'IteratorResult<void, any>' is not assignable to type 'IteratorResult<ReactNode, any>'.
        Type 'IteratorYieldResult<void>' is not assignable to type 'IteratorResult<ReactNode, any>'.
          Type 'IteratorYieldResult<void>' is not assignable to type 'IteratorYieldResult<ReactNode>'.
            Type 'void' is not assignable to type 'ReactNode'.ts(2322)
index.d.ts(1434, 9): The expected type comes from property 'children' which is declared here on type 'DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>'
```

The code that engenders the error:

```tsx
      {routes.map((route) => {
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-medium transition-colors hover:text-black",
            route.active ? "text-black" : "text-neutral-500"
          )}
        >
          {route.label}
        </Link>
      })}
```

Solution: The callback function should be returning a `ReactNode` rather than a type `void[]`. We are using a `{}` curly bracket when we should be using a `()` parenthesis in the callback function when returning the `Link element`.

```tsx
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-medium transition-colors hover:text-black",
            route.active ? "text-black" : "text-neutral-500"
          )}
        >
          {route.label}
        </Link>
      ))}
```

## Setup the Environment

Now we can attempt to fetch and load our data. 

Let's try to fetch our categories.

However, before we can do that we need to create a `.env` file in `/ecommerce-store`.

### Ignore .env file to protect sensitive data

**Important:** Ignore `.env` file in git.

Navigate to `ecommerce-store\.gitignore` and add the line `.env`

`ecommerce-store\.gitignore`
```s
# local env files
.env*.local
.env
```

Now we can commit the `.gitignore` file with the message: 

Ignore .env file to protect sensitive data

This commit message is concise, imperative and informative. Explains what the change does and why it is important. 

A `.env` file contains environment variables that store sensitive or dynamic information, such as API keys, database credentials, or mode settings. Adding it to .gitignore prevents it from being tracked by Git and uploaded to source control, which could expose your data to unauthorized access or modification.

### Configuring the Environment

Now we can put our routes inside the `.env` file.

We have to create the environment variable `NEXT_PUBLIC_API_URL`. When we create a variable they should be in key-value pairs, like this:

```sh
key_name=value_name
```

Run the `ecommerce-admin` project, click on `Settings` and look for `NEXT_PUBLIC_API_URL` which will be the key in our environment. The value will the API route.

Copy the API route and paste it inside the `.env` file as the key to `NEXT_PUBLIC_API_URL`.

`.env`
```sh
NEXT_PUBLIC_API_URL=http://localhost:3000/api/YOUR_API_ROUTE_HERE
```

Now we can finally connect our front-end store to the admin dashboard.

### Attempt to load data for the store

Navigate to `ecommerce-store\components\Navbar.tsx`, and in here we will use *actions* that will load our categories.

At the root of the project, create the folder named `actions` with a file named `getCategories.tsx`

Inside we

1. import type Category
2. Build a URL using `NEXT_PUBLIC_API_URL` and `categories` as the path
3. Fetch the categories and return the response in JSON

`ecommerce-store\actions\getCategories.tsx`
```tsx
import { Category } from "@/types";

// Dynamically build address to fetch a resource on the web
// The scheme/protocol & domain name are defined as an environment variable
const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

/**
 * 
 * @returns an array of Categories
 */
const getCategories = async (): Promise<Category[]> => {
  // Send network request to the URL and save the response
  const res = await fetch(URL);

  // Return the response in JSON format
  return res.json();
}

export default getCategories;
```

With this we can navigate back to our `Navbar.tsx`, mark it `async`, and use the get function to create a variable for `categories.` Then pass in that data as the prop to `MainNav`.

```tsx
import getCategories from '@/actions/getCategories';

export default async function Navbar() {

  const categories = await getCategories();

  return (
    <div className="border-b">
      // ...
        <MainNav data={categories}/>
    </div>
  )
}
```

### Rendering the Navigation

With the `MainNav` implemented, we can now see the categories of the store rendered in the navigation.

- Let's try editing a category name to see if it reflects in the store.
- Delete a category that does not have a product

#### `NavbarActions` component

Create client component 
  - Should be on the right side of the navbar

`ecommerce-store\components\NavbarActions.tsx`
```tsx
"use client";

import React from 'react';

export default function NavbarActions() {
  return (
    <div className="ml-auto flex items-center gap-x-4">
      NavbarActions
    </div>
  )
}
```

Now render `NavbarActions` right after `MainNav`

```tsx
// ...
export default async function Navbar() {
  const categories = await getCategories();

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
        <Link
          className="ml-4 flex lg:ml-0 gap-x-2"
          href="/"
        >
          <p className="font-bold text-xl">STORE</p>
        </Link>
        <MainNav data={categories}/>
        <NavbarActions />
        </div>
      </Container>
    </div>
  )
}
```

#### Custom `Button` component

We will need to give it a `Button`, so create a `Button` component under `/components/ui`.

```tsx
import React from 'react';

const Button = () => {
  return (
    <div>Button</div>
  )
}

export default Button
```

I'm going to opt for a custom made button over shadcn.

[Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs)

[forwardRef in React](https://react.dev/reference/react/forwardRef) lets your component expose a DOM node to parent component with `ref`.

`ecommerce-store\components\ui\Button.tsx`
```tsx
import React, { forwardRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  disabled,
  type = "button",
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button";

export default Button;
```

##### Styling the Button

To see changes, render the `Button` in `NavbarActions.tsx`

```tsx
import Button from '@/components/ui/Button';

export default function NavbarActions() {
  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button>
        
      </Button>
    </div>
  )
}
```

Style the Button, center the items inside with rounding and padding.

```tsx
<Button className="flex items-center rounded-full bg-black px-4 py-2">
```

Next we want an icon and text inside the Button.

Let's install [lucide-react](https://www.npmjs.com/package/lucide-react).

```sh
npm i lucide-react
```

Now we can render an icon, let's use `ShoppingBag` with a size of 20.

```tsx
      <Button className="flex items-center rounded-full bg-black px-4 py-2">
        <ShoppingBag 
          size={20}
          color="white"
        />
      </Button>
```

In our `Button` component, let's use `cn` to merge default classnames. Then we can pass it a `className` to the `cn` function that enables us to overwrite any default classes.

e.g., in `NavBarActions` the `padding` and `rounded-full` will overwrite the default classes for a Button.

Let's add those default styles:

`ecommerce-store\components\ui\Button.tsx`
```tsx
import React, { forwardRef } from "react";

import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  disabled,
  type = "button",
  ...props
}, ref) => {
  return (
    <button
      className={cn(
        `
        w-auto
        rounded-full
        bg-black
        border-transparent
        px-5
        py-3
        disabled:cursor-not-allowed
        disabled:opacity-50
        text-white
        font-semibold
        hover:opacity-75
        transition
        `,
        className
      )}
      ref={ref}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button";

export default Button;
```

#### NavbarActions continued

Now lets add some text next to the icon.

- Use `span` to represent the amount of cart items, which is 0 for now

```tsx
export default function NavbarActions() {
  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button className="flex items-center rounded-full bg-black px-4 py-2">
        <ShoppingBag 
          size={20}
          color="white"
        />
        <span className="ml-2 text-sm font-medium text-white">
          0
        </span>
      </Button>
    </div>
  )
}
```

Here we'll use `localStorage` to preserve the amount of items a user can hold in their cart. 

So we have to do the mounting trick to protect against hydration errors.

```tsx
import React, { useEffect, useState } from 'react';

export default function NavbarActions() {
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
  // ...
```

## HomePage

Our homepage will contain a `Billboard` component. 

### Billboard component

Navigate to `ecommerce-store\components`,

- Create `Billboard` component
- import `Billboard` as `BillboardType` from types
- Create `BillboardProps`
- Arrow functional component with `data` as parameter
- Output contains a `div`

```tsx
import React from 'react';

import { Billboard as BillboardType } from "@/types";

interface BillboardProps {
  data: BillboardType
}

const Billboard: React.FC<BillboardProps> = ({
  data
}) => {
  return (
    <div>

    </div>
  );
}

export default Billboard;
```

Now inside the output, we will have a child `div` that has style of `backgroundImage` set to that of the `imageUrl` from `data`. Then it will have two more divs inside, with the `data.label` variabled interpolated.

```tsx

const Billboard: React.FC<BillboardProps> = ({
  data
}) => {
  return (
    <div>
      <div style={{ backgroundImage: `url(${data?.imageUrl})` }}>
        <div>
          <div>
            {data.label}
          </div>
        </div>
      </div>
    </div>
  );
}
```

Now let's add some styles to each `div`.

- Our outermost `div` will have styles that contain the elements within with responsive padding
- The next div contains our image so styles for the image using `aspect-square`, on medium screens an aspect of 2.4/1 seems to be best
- The next div has special alignment for the text, while the innermost div has styles for the text with responsive design

```tsx
const Billboard: React.FC<BillboardProps> = ({
  data
}) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
      >
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
            {data.label}
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Revalidating Data

*Issue:* when we make changes in the admin dashboard, the store needs to be able to reflect the change in the UI. We can do this with a hard refresh. 

WE CAN set the `revalidate` property to 0 so that *it won't be cached*.

[Nextjs - revalidating data](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)

> Revalidation is the process of purging the Data Cache and re-fetching the latest data. This is useful when your data changes and you want to ensure you show the latest information.

Cached data can be revalidated in two ways:

1. **Time-based revalidation:** Automatically revalidate data after a certain amount of time has passed. This is useful for data that changes infrequently and freshness is not as critical.

2. **On-demand revalidation:** Manually revalidate data based on an event (e.g. form submission). On-demand revalidation can use a tag-based or path-based approach to revalidate groups of data at once. This is useful when you want to ensure the latest data is shown as soon as possible (e.g. when content from your headless CMS is updated).

The `revalidate` **property in Next.js is used to specify the amount of time (in seconds) that a page should be revalidated after being built.** This means that the page will be regenerated with the latest data at most every `revalidate` seconds, if there is a new request. This is useful for pages that have frequently changing data and need to be updated without rebuilding the entire site.

`export const revalidate = 0;` means that the page will be revalidated on every request, as soon as possible. This is equivalent to setting `revalidate` to `1`. 

- However, this is not recommended for pages that have high traffic or complex data fetching, as it may cause performance issues or rate limits. 

- A better approach is to use a higher value for `revalidate`, such as `60` (one minute) or `3600` (one hour), depending on how often your data changes and how fresh you want your page to be. You can also use the `revalidateTag` or `revalidatePath` functions from `next/cache` to manually trigger revalidation for a specific tag or path.

### Revalidate our components

For now we will set `Navbar` to revalidate the page on every request.

```tsx
// Revalidate the page on every request, purge cache & fetch latest data
export const revalidate = 0;

export default async function Navbar() {
  // ...
```

Similarly, let's revalidate for `HomePage`.

`ecommerce-store\app\(routes)\page.tsx`
```tsx
// Revalidate the page on every request, purge cache & fetch latest data
export const revalidate = 0;

export default function HomePage() {
```

## HomePage output

Now for the HomePage output, render a container with a div

- Render a `Container` with a `div`
- Fetch individual Billboard

```tsx
// Revalidate the page on every request, purge cache & fetch latest data
export const revalidate = 0;

export default function HomePage() {

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={ } />
      </div>
    </Container>
  )
}
```

We need to make the action to fetch a Billboard. 

Create `ecommerce-store\actions\getBillboard.tsx`, we need to:

- get `Billboard` type
- Construct URL
- async function with `id` as parameter, returns a `Promise<Billboard>`
- fetch Billboard, using `URL` and `id`
- respond with fetched data

```tsx
import { Billboard } from "@/types";

// Dynamically build address to fetch a resource on the web
// The scheme/protocol & domain name are defined as an environment variable
const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

/**
 * 
 * @returns an individual Billboard
 */
const getBillboard = async (id: string): Promise<Billboard> => {
  // Send network request to the URL and save the response
  const res = await fetch(`${URL}/${id}`);

  // Return the response in JSON format
  return res.json();
}

export default getBillboard;
```

Now use this action to fetch a billboard for the home page,

`ecommerce-store\app\(routes)\page.tsx`
```tsx
import getBillboard from "@/actions/getBillboard";
import Billboard from "@/components/Billboard";
import Container from "@/components/ui/Container";

// Revalidate the page on every request, purge cache & fetch latest data
export const revalidate = 0;

export default async function HomePage() {

  const billboard = await getBillboard();

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
      </div>
    </Container>
  )
}
```

We can pass in an individual billboard `id` we can get from admin dashboard.

### Testing home page

Now go ahead and upload a billboard to see it rendered on the page.

We can see the billboard by passing in the `id` that we get from admin project. We can click on `Billboards` in the main navigation then click the 3 dots in the data table to trigger cell action. We can then copy the Billboard id and paste it inside the `getBillboard` function as a string.

`ecommerce-store\app\(routes)\page.tsx`
```tsx
export default async function HomePage() {
  // Fetch billboard
  const billboard = await getBillboard("5129787f-d293-45dc-9c72-e6fe2e290ca9");
```

Now that the billboard is rendered, we can now see it in the front page store. 

- Does UI reflect changes?
- Add a billboard
- Edit a billboard

## Featured products

Next we should add featured products to the home page. 

### Product type

We first need to add the types for it. Create a `Product` interface inside `types.ts`, which contains `{ id, category, name, price, isFeatured, size, color, images }`.

`ecommerce-store\types.ts`
```ts
export interface Product {
  id: string;
  category: Category;
  name: string;
  price: string;
  isFeatured: boolean;
  size: Size;
  color: Color;
  images: Image[]
}
```

Similarly, make the interfaces for `Image`, `Size` and `Color`

```ts
export interface Color {
  id: string;
  name: string;
  value: string;
}

export interface Image {
  id: string;
  url: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}
```

### Product action

#### query-string

Before we implement `getProducts`, we need to install [query string](https://www.npmjs.com/package/query-string).

```sh
npm i query-string
```

Parse and stringify URL [query string](https://en.wikipedia.org/wiki/Query_string), a part of a uniform resource locator (URL) that assigns values to specified parameters. 

A query string commonly includes fields added to a base URL by a Web browser or other client application, for example as part of an HTML document, choosing the appearance of a page, or jumping to positions in multimedia content.

e.g., In the URL "https://en.wikipedia.org/w/index.php?title=Query_string&action=edit", the query string is `title=Query_string&action=edit`

A web server can handle a Hypertext Transfer Protocol (HTTP) request either by reading a file from its file system based on the URL path or by handling the request using logic that is specific to the type of resource. In cases where special logic is invoked, the query string will be available to that logic for use in its processing, along with the path component of the URL.

#### Using query-string

We are going to need `query-string` because we will use filters for our products. This will aid us in generating a URL constant with parameters.

`stringifyUrl()`: Stringify an object into a URL with a query string and sorting the keys.

- import `queryString` and `Product`
- Dynamically build the URL
- Create the interface `Query` that will be passed into parameters

Next inside `getProducts`

```tsx
import queryString from "query-string"

import { Product } from "@/types";

// Dynamically build address to fetch a resource on the web
// The scheme/protocol & domain name are defined as an environment variable
const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

/**
 * 
 * @returns an array of products
 */
const getProducts = async (query: Query): Promise<Product[]> => {
  // Stringify an object into a URL with a query string and sorting the keys
  const url = queryString.stringifyUrl({
    url: URL,
    query: {
      colorId: query.colorId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  })

  // Send network request to the URL and save the response
  const res = await fetch(URL);

  // Return the response in JSON format
  return res.json();
}

export default getProducts;
```

Now let's fetch those featured products in the home page

`ecommerce-store\app\(routes)\page.tsx`
```tsx
import getProducts from "@/actions/getProducts";

export default async function HomePage() {

  // Fetch featured products
  const products = await getProducts({isFeatured: true});
```

### `ProductList` componenet

We want to be able to show the products we fetched so we will create a `ProductList` component. We should put it inside the `components` folder.

Note: `compenents/ui` is where we put components that are re-usable. Whereas everything else will fall inside `components`.

`ecommerce-store\components\ProductList.tsx`
```tsx
import React from 'react';

export default function ProductList() {
  return (
    <div>ProductList</div>
  )
}
```

Let's add a new div inside the container. It will contain our `ProductList` component.


`ecommerce-store\app\(routes)\page.tsx`
```tsx
import ProductList from "@/components/ProductList";

export default async function HomePage() {
  // Fetch featured products
  const products = await getProducts({isFeatured: true});

  // Fetch billboard
  const billboard = await getBillboard("5129787f-d293-45dc-9c72-e6fe2e290ca9");

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
      </div>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <ProductList />
      </div>
    </Container>
  )
}
```

Now let's develop the ProductList component.

It will have props of `{ title, items }` where items is a `Product[]`.

Destructure those props in the parameters, and return a `div` with `space-y-4` that contains an `h3` with the `title` interpolated.

```tsx
import React from 'react';

import { Product } from '@/types';

interface ProductListProps {
  title: string;
  items: Product[];
};

const ProductList: React.FC<ProductListProps> = ({
  title,
  items
}) => {
  return (
    <div className="space-y-4">
      <h3>{title}</h3>
    </div>
  )
}

export default ProductList;
```

Style the `h3` text bold and size of 3xl.

```tsx
<h3 className="font-bold text-3xl">{title}</h3>
```

### `NoResults` component

Now the next thing to do is to create a re-usable component that will represent when fetching any data results to empty.

Create the `NoResults.tsx` inside `components/ui`, and create a div that centers the text with height and width to full and with text-neutral-500.

`ecommerce-store\components\ui\NoResults.tsx`
```tsx
import React from 'react';

const NoResults = () => {
  return (
    <div className="flex items-center justify-center h-full w-full text-neutral-500">
      No results found.
    </div>
  )
}

export default NoResults
```

No go back to `ProductList` and check if the length of `items` is 0. Then we render a `NoResults` component.

```tsx
const ProductList: React.FC<ProductListProps> = ({
  title,
  items
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {items.length === 0 && <NoResults />}
    </div>
  )
}
```

Now in the home page we can pass the data to the props to `ProductList`,

```tsx
export default async function HomePage() {
// ... fetch items
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
      </div>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <ProductList title="Featured Products" items={products}/>
      </div>
    </Container>
  )
}
```

### Render featured products

Now if we had products from the admin dashboard then we won't see the `NoResults`. But if we had products then we should not see anything as of now.

Navigate back to `ProductList` so we can render our products. 

Let's use `grid`, following mobile-first responsive design. Create a `div` right after `NoResults` With a gap of 4, for each device we have:

- Mobile: 1 column
- Small: 2 columns
- Medium: 3 cols
- Large: 4 cols

Inside this map out each item, for now just map out a `div` with a key of `item.id` and inside interpolate `item.name`.

```tsx
const ProductList: React.FC<ProductListProps> = ({
  title,
  items
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {items.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Product Card

Let's create a client component in the UI named `ProductCard`.

```tsx
"use client";

import React from 'react';

const ProductCard = () => {
  return (
    <div>
      Product Card
    </div>
  )
}

export default ProductCard
```

Instead of a generic `div` that we map out, instead we can pass in the product `item` to our `ProductCard` component.

```tsx
const ProductList: React.FC<ProductListProps> = ({
  title,
  items
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {items.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ProductCard key={item.id} data={item}/>
        ))}
      </div>
    </div>
  )
}
```

Let's create the `interface` of ProductCard, which will take `data` which is a type of `Product` we import from `types.ts`.

Then we assign the interface, and extract the data inside.

`ecommerce-store\components\ui\ProductCard.tsx`
```tsx
import { Product } from '@/types';

interface ProductCard {
  data: Product;
}

const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  return (
    <div>
      Product Card
    </div>
  )
}
```

Now we can work on the output of the Product Card.

First we create a container with some styles. This will serve as the container and backdrop to the entire card. It will contain the images and actions for the product card. Make sure to give this parent container the `group` style. I'll come back to explain this later.

Next is another `div` that should have a gray background, this will contain our product's image. Inside we can use `Image` from `next/image` and fill out the props.

```tsx
const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      {/* Images & Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image 
          src={data?.images?.[0]?.url}
          fill
          alt="Product Image"
        />
      </div>
    </div>
  )
}
```

- Note that we have the `fill` prop because we got an Unhandled Runtime Error, "Error: Image with src "...." is missing required "width" property.

#### Environment setup to fix some issues

While making the ProductCard, came across some issues which will be addressed.

##### Issue: "Error: Invalid `src` prop

We've had this issue before, back in the `BillboardForm` when we were testing the `ImageUpload`.

Here is the example "Unhandled Runtime Error"

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
      },
    ],
  }
}

module.exports = nextConfig
```

##### Parsing error: Cannot find module 'next/babel'

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

#### ProductCard output continued

With the host configured and issues out of the way we can continue by adding styles to the `Image`, which we can now see on our store's front page.

For now we'd want the image to be square, have the image maintain its aspect ratio while filling the element's entire content box. We can use the [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)'s `cover` property for that. Let's also make it a rounded.

```tsx
<Image 
  src={data?.images?.[0]?.url}
  fill
  alt="Product Image"
  className='aspect-square object-cover rounded-md'
/>
```

##### ProductCard styling based on parent state (group-{modifier})

Next, we should create a space where icons can show when we hover over an individual product.
But first, let's look at our `ProductCard` again.

```tsx
const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      {/* Images & Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image />
      </div>
    </div>
  )
}
```

Remember that we put `group` in the parent container in the output. Our goal is to have one of the child components trigger and show itself when our parent is hovered over. To do this we have a default opacity of 0 for a `div` and when the group is hovered over we give it a opacity of 100. Add this `div` below `Image`.

```tsx
const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      {/* Images & Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image 
          src={data?.images?.[0]?.url}
          fill
          alt="Product Image"
          className='aspect-square object-cover rounded-md'
        />
        <div className='opacity-0 group-hover:opacity-100'>
          
        </div>
      </div>
    </div>
  )
}
```

See: [TailwindCSS - Styling based on parent state (group-{modifier})](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state).

#### `IconButton` component

Now we should have the icons inside this `div`. We want the following icons:

1. Add to Cart
2. Quick Preview

Before we do that, we need to create the `IconButton` inside `components/ui`

`ecommerce-store\components\ui\IconButton.tsx`
```tsx
import React from 'react';

const IconButton = () => {
  return (
    <div>IconButton</div>
  )
}

export default IconButton
```

Then make the icon container and render an `IconButton` inside.

```tsx
const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      {/* Images & Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image 
          src={data?.images?.[0]?.url}
          fill
          alt="Product Image"
          className='aspect-square object-cover rounded-md'
        />
        
        <div className='opacity-0 group-hover:opacity-100'>
          <div className='flex gap-x-6 justify-center'>
            <IconButton />
          </div>
        </div>
      </div>
    </div>
  )
}
```

Let's develop the `IconButton`

- Output is a native HTML `button`
- Add an `onClick` function to its `onClick` prop
- for `className` use `cn()` utility
- rounded button, center all the items inside, white background, box shadow,  padding of 8 px all around, on hover scale it to 1.1x size, add transition
- Also pass in `className` prop as 2nd parameter to `cn`
- Interpolate `icon` prop inside the `button`

```tsx
import React from 'react';

import { cn } from '@/lib/utils';

const IconButton = () => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition",
        className
      )}
    >
      {icon}
    </button>
  )
}

export default IconButton
```

Now let's add those props through an interface. We have the following for the `IconButtonProps`:

- `onClick` (optional), type `MouseEventHandler<HTMLButtonElement>` or `undefined`. 
  - Import `MouseEventHandler` from react
- `icon` an `ReactElement`
- `className` (optional), a string containing our tailwind utility classnames

Finally, assign those props to `IconButton`

```tsx
import React, { MouseEventHandler } from 'react';

import { cn } from '@/lib/utils';

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  icon: React.ReactElement;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  className
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition",
        className
      )}
    >
      {icon}
    </button>
  )
}

export default IconButton
```

#### Quick preview - actions in `ProductCard`

Let's finish the implementation of the quick preview.

Navigate back to `ProductCard`, and before we pass in the props to `IconButton` we have to finish our styling for its container.

Add `transition absolute w-full px-6 bottom-5` to the `div` className. Next, we pass an empty function to the `onClick` prop of `IconButton`. Pass in an `Expand` icon from lucide react to the `icon` prop.

```tsx
const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      {/* Images & Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image 
          // ...
        />
        <div className='opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5'>
          <div className='flex gap-x-6 justify-center'>
            <IconButton 
              onClick={() => {}}
              icon={<Expand size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
```

Now when we hover over the product card in the front page of the store, we can see the expand icon appear.

#### Add to Cart - action in `ProductCard`

Let's add the next one for shopping cart. 

```tsx
import { Expand, ShoppingCart } from 'lucide-react';

const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      {/* Images & Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image 
          // ...
        />
        <div className='opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5'>
          <div className='flex gap-x-6 justify-center'>
            <IconButton 
              onClick={() => {}}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton 
              onClick={() => {}}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
```

#### ProductCard description

The next part to add to the card is the description. We'll create a container for our description and later price. We are going to render the we got to add more information to the product card.

```tsx

const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      {/* Images & Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        // ...
      </div>
      {/* Description */}
      <div>
        <p className='font-semibold text-lg'>
          {data.name}
        </p>
        <p className='text-sm text-gray-500'>
          {data.category?.name}
        </p>
      </div>
      {/* Price */}
      <div className='flex items-center justify-between'>

      </div>
    </div>
  )
}
```

#### `Currency` component

Inside `components/ui` create `Currency.tsx`, a react arrow function export component.

We need a formatter function for the price, so create a `priceFormatter` just like what we did for the admin project.

Next give `Currency`'s output a semibold font style. Now define the type of props passed to function component. To do that, create a prop interface that contains an optional `value` that may either be string or number. Finally, use thhe formatter to format the value to a Number.

```tsx
import React from 'react';

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: 'currency',
  currency: 'USD'
});

interface CurrencyProps {
  value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({
  value
}) => {
  return (
    <div className="font-semibold">
      {priceFormatter.format(Number(value))}
    </div>
  )
}

export default Currency
```

Back to the `ProductCard`, we can now use the `Currency` component to handle displaying the product's price

```tsx
const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      {/* Images & Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        // ...
      </div>
      {/* Description */}
      <div>
        // ...
      </div>
      {/* Price */}
      <div className='flex items-center justify-between'>
        <Currency value={data?.price} />
       </div>
    </div>
  )
}
```

##### Issue: hydration error when displaying the price

After some quick testing, there can be hydration error when displaying the price on a product card.

So let's add the mounting state and useEffect hook for the `Currency` component to delay execution of client-side code until after hydration.

```tsx
"use client";

import React, { useEffect, useState } from 'react';

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: 'currency',
  currency: 'USD'
});

interface CurrencyProps {
  value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({
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
    <div className="font-semibold">
      {priceFormatter.format(Number(value))}
    </div>
  )
}

export default Currency
```

## Update the home page

Let's fix the home page a bit. We want to add a space between the footer, and close the space between the billboard and featured products. We do so by putting the `Billboard` and `ProductList` inside the same container:

`ecommerce-store\app\(routes)\page.tsx`
```tsx
export default async function HomePage() {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("5129787f-d293-45dc-9c72-e6fe2e290ca9");

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  )
}
```

## Individual product page

Now what we want is for the `ProductCard` to lead to the individual product page. Let's start with the setup.

### ProductCard - Click Handler

Before we add a redirect to individual page we need to do the following.

- Create router with `useRouter` from `next/navigation`
- Create a click handler function that pushes router to the route of the product id
- Assign the click handler function to `onClick` of the entire `ProductCard`

```tsx
import { useRouter } from 'next/navigation';

const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  // Create router object to perform client-side navigation
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  }

  return (
    <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
```

### Individual Product Page route

Create `product/productId/page.tsx` inside `(routes)`, then create a `ProductPage`.

ecommerce-store\app\(routes)\product\[productId]\page.tsx
```tsx
import React from 'react';

const ProductPage = () => {
  return (
    <div>Individual Product Page</div>
  )
}

export default ProductPage
```

Lets add an interface that contains the `params` with `productId` within. Then extract those `params` in the component.

```tsx
interface ProductPageProps {
  params: {
    productId: string;
  }
}

const ProductPage: React.FC<ProductPageProps> = ({
  params
}) => {
  return (
    <div>Individual Product Page</div>
  )
}
```

### Action to fetch the individual product

Next we need to create an action that fetches the individual product.

Similar to `getBillboard.tsx`, create a file named `getProduct.tsx` where we

- Build the `URL` with the route to `${process.env.NEXT_PUBLIC_API_URL}/products`
- Create a function `getProduct`
- Extract `id` in the params
- For the response, fetch with the `URL` and `id` combined
- Return the response in JSON format

`ecommerce-store\actions\getProduct.tsx`
```tsx
import { Product } from "@/types";

// Dynamically build address to fetch a resource on the web
// The scheme/protocol & domain name are defined as an environment variable
const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

/**
 * 
 * @returns an individual Product
 */
const getProduct = async (id: string): Promise<Product> => {
  // Send network request to the URL and save the response
  const res = await fetch(`${URL}/${id}`);

  // Return the response in JSON format
  return res.json();
}

export default getProduct;
```

First let's fetch the product using the `productId` with the action `getProduct()`.

Next let's fetch the suggested products for the individual product. The suggested products are products that are within the same category of the individual product. It has some relation to the individual product and the customer may take interest in the suggested products.

Let's extract the suggested products based on the same category as the individual product, using the action `getProducts()`.

```tsx
import React from 'react';

import getProduct from '@/actions/getProduct';
import getProducts from '@/actions/getProducts';

interface ProductPageProps {
  params: {
    productId: string;
  }
}

const ProductPage: React.FC<ProductPageProps> = async ({
  params
}) => {
  // Fetch the individual product
  const product = await getProduct(params.productId);

  // Fetch suggested products using the same category
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id
  })

  return (
    <div>Individual Product Page</div>
  )
}

export default ProductPage
```

### Individual Product Page output

Now let's style the product page. 

- Individual product page will be a `div` with a white background
- Inside is a `Container`, with a `div` within that contains our padding
- Inside the padding `div` we have a `div` that sets a grid and gap on large screens

```tsx
const ProductPage: React.FC<ProductPageProps> = async ({
  params
}) => {
  // ...
  return (
    <div className='bg-white'>
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            
          </div>
        </div>
      </Container>
    </div>
  )
}
```

Next, what we want is a section for the Gallery. So just create a `div` with Gallery text within. 

Then a `div` below the gallery, which contains our product info. It will contain some responsive styles that controls the top margin. What we want is that on large screens we have the product gallery and info side-by-side, but on smaller screens we have them in vertical order.

```tsx
const ProductPage: React.FC<ProductPageProps> = async ({
  params
}) => {
  // ...
  return (
    <div className='bg-white'>
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Gallery */}
            <div>Gallery</div>
            <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
              {/* Info */}
              Product Info
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
```

Now after the `div` that contains the gallery and info, we add a horizontal rule and render our `ProductList` component using our `suggestedItems` as a prop.

```tsx
const ProductPage: React.FC<ProductPageProps> = async ({
  params
}) => {
  const product = await getProduct(params.productId);

  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id
  })

  return (
    <div className='bg-white'>
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Gallery */}
            <div>Gallery</div>
            <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
              {/* Info */}
              Product Info
            </div>
          </div>
          <hr className='my-10' />
          <ProductList title="Suggested Items" items={suggestedProducts} />
        </div>
      </Container>
    </div>
  )
}
```

#### Issue: suggested products does not fetch properly

After testing the product page, when we add or remove products to a particular category it should reflect in the suggested product list. The issue is that it does not change.

The issue was found inside `ecommerce-store\actions\getProducts.tsx`, when we send the network request to fetch at the specific url, we pass in `URL` and not `url` that we built with `queryString`. 

We generated a `url` constant given a set of parameters, whereas the `URL` that we currently use was simply a general route to products.

`ecommerce-store\actions\getProducts.tsx`
```tsx
import queryString from "query-string"

import { Product } from "@/types";

// Dynamically build address to fetch a resource on the web
// The scheme/protocol & domain name are defined as an environment variable
const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  // Stringify an object into a URL with a query string and sorting the keys
  const url = queryString.stringifyUrl({
    url: URL,
    query: {
      colorId: query.colorId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  })

  // Send network request to the URL and save the response
  const res = await fetch(URL);

  // Return the response in JSON format
  return res.json();
}

export default getProducts;
```

The fix is passing in `url` instead of `URL` to the `fetch()` when saving the response.

`const res = await fetch(url);` 

`ecommerce-store\actions\getProducts.tsx`
```tsx
/**
 * 
 * @returns an array of products
 */
const getProducts = async (query: Query): Promise<Product[]> => {
  // Generate a url constant where we add parameters via queryString
  // Stringify an object into a URL with a query string and sorting the keys
  const url = queryString.stringifyUrl({
    url: URL,
    query: {
      colorId: query.colorId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  })

  // Send network request to the URL and save the response
  const res = await fetch(url);

  // Return the response in JSON format
  return res.json();
}
```

With that fixed the individual product page should only load the items related to its own category.

### Gallery component

Create `ecommerce-store\components\gallery\index.tsx`. We will have a `gallery` folder within components because it will be made up of multiple components.

```tsx
import React from 'react'

const Gallery = () => {
  return (
    <div>Gallery</div>
  )
}

export default Gallery
```

Now interpolate the `Gallery` inside the individual product page. Let's also pass in a prop `images={product.images}` to the `Gallery`.

```tsx
import Gallery from '@/components/gallery';

// ...
const ProductPage: React.FC<ProductPageProps> = async ({
  params
}) => {
  // ...
  return (
    <div className='bg-white'>
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">

            <Gallery images={product.images}/>

            <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
              {/* Info */}
              Product Info
            </div>
          </div>
          <hr className='my-10' />
          <ProductList title="Suggested Items" items={suggestedProducts} />
        </div>
      </Container>
    </div>
  )
}

export default ProductPage
```

## HeadlessUI

Going to use [HeadlessUI](https://headlessui.com/react/menu), instead of radix, for more exposure to another component librarry.

[HeadlessUI/React](https://www.npmjs.com/package/@headlessui/react) is where we install.

```sh
npm i @headlessui/react
```

### Developing the Gallery component

Now let's mark Gallery as a client component and import `Tab` from `headlessui/react`. Next import `Image` from next. Also import `Image` as `ImageType` from our types.

Then we create an interface for `GalleryProps` that has an array of images.

Finally, assign that interface as the type to `Gallery` component and extract the data inside which is `images`.

`ecommerce-store\components\gallery\index.tsx`
```tsx
"use client"

import React from 'react';
import Image from "next/image";
import { Tab } from "@headlessui/react";

import { Image as ImageType } from "@/types";

interface GalleryProps {
  images: ImageType[];
};

const Gallery: React.FC<GalleryProps> = ({
  images
}) => {
  return (
    <div>Gallery</div>
  )
}

export default Gallery
```

Now let's work on the gallery output. Instead of a `div`, render a `Tab`.

[Headless UI - Tabs](https://headlessui.com/react/tabs).

Tabs
Easily create accessible, fully customizable tab interfaces, with robust focus management and keyboard navigation support.

Basic example
Tabs are built using the `Tab.Group`, `Tab.List`, `Tab`, `Tab.Panels`, and `Tab.Panel` components. By default the first tab is selected, and clicking on any tab or selecting it with the keyboard will activate the corresponding panel.

```tsx
import { Tab } from '@headlessui/react'

function MyTabs() {
  return (
    <Tab.Group>
      <Tab.List>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>Content 1</Tab.Panel>
        <Tab.Panel>Content 2</Tab.Panel>
        <Tab.Panel>Content 3</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
```

Styling different states
Headless UI keeps track of a lot of state about each component, like which tab option is currently checked, whether a popover is open or closed, or which item in a menu is currently active via the keyboard.

But because the components are headless and completely unstyled out of the box, you can't see this information in your UI until you provide the styles you want for each state yourself.

[Headless UI/React Tabs Component API](https://headlessui.com/react/tabs#component-api).

### Adding Tabs to Gallery component

Let's start by making a `Tap.Group` as a `div`.

Notice that if we just render the `Tab` as is with a `className` it will give us an error:

```tsx
const Gallery: React.FC<GalleryProps> = ({
  images
}) => {
  return (
    <Tab.Group className=''>Gallery</Tab.Group>
  )
}
```

Error: 

```sh
Type '{ children: string; className: string; }' is not assignable to type 'IntrinsicAttributes & CleanProps<ExoticComponent<{ children?: ReactNode; }>, "defaultIndex" | "onChange" | "selectedIndex" | "vertical" | "manual"> & OurProps<...> & { ...; } & { ...; }'.
  Property 'className' does not exist on type 'IntrinsicAttributes & CleanProps<ExoticComponent<{ children?: ReactNode; }>, "defaultIndex" | "onChange" | "selectedIndex" | "vertical" | "manual"> & OurProps<...> & { ...; } & { ...; }'.ts(2322)
```

We need to use the prop `as` to determine the element or component the `Tabs` should render as [See headlessui/react - tab component API](https://headlessui.com/react/tabs#component-api).

So to fix this we set the `Tab` as a `div`, like so:

```tsx
const Gallery: React.FC<GalleryProps> = ({
  images
}) => {
  return (
    <Tab.Group as='div' className=''>
      Gallery
    </Tab.Group>
  )
}
```

Now we can give it tailwind styles, like `flex-col-reverse`. Next create a `div` that will contain our `Tab.List` with styles `mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none`. 

Then create our `Tabb.List` with `grid-cols-4` with a `gap-6` in between.

```tsx
const Gallery: React.FC<GalleryProps> = ({
  images
}) => {
  return (
    <Tab.Group as='div' className='flex flex-col-reverse'>
      <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none'>
        <Tab.List className='grid grid-cols-4 gap-6'>

        </Tab.List>
      </div>
    </Tab.Group>
  )
}
```

Inside our `Tab.List` let's map outt each of our images into a `Tab` with `image.id` for the `key` prop and `image` for `image prop`.

```tsx
const Gallery: React.FC<GalleryProps> = ({
  images
}) => {
  return (
    <Tab.Group as='div' className='flex flex-col-reverse'>
      <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none'>
        <Tab.List className='grid grid-cols-4 gap-6'>
          {images.map((image) => (
            <Tab key={image.id} image={image}/>
          ))}
        </Tab.List>
      </div>
    </Tab.Group>
  )
}
```

#### GalleryTab component

Because the headless UI `Tab` component does not contain the prop for `image`, we have to make a custom-component that does.

Inside `components/gallery` create `GalleryTab.tsx`, a react functional component.

```tsx
import React from 'react';

const GalleryTab = () => {
  return (
    <div>
      GalleryTab
    </div>
  )
}

export default GalleryTab
```

Then we import and use it inside Gallery. Since they are within the same directory we can import 

```tsx
import GalleryTab from './GalleryTab';

interface GalleryProps {
  images: ImageType[];
};

const Gallery: React.FC<GalleryProps> = ({
  images
}) => {
  return (
    <Tab.Group as='div' className='flex flex-col-reverse'>
      <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none'>
        <Tab.List className='grid grid-cols-4 gap-6'>
          {images.map((image) => (
            <GalleryTabTab key={image.id} image={image}/>
          ))}
        </Tab.List>
      </div>
    </Tab.Group>
  )
}

export default Gallery
```

Now let's develop the `GalleryTab`.

The imports:
- `React`
- `Image` from next
- `cn` from utils
- `Image` as `ImageType` from types

Next the prop interface which takes `image` a type of `ImageType`. Then extract `image` in the parameters of `GalleryTab`.

```tsx
import React from 'react';
import Image from 'next/image';
import { Tab } from '@headlessui/react';

import { cn } from '@/lib/utils';
import { Image as ImageType } from '@/types';

interface GalleryTabProps {
  image: ImageType
}

const GalleryTab: React.FC<GalleryTabProps> = ({
  image
}) => {
  return (
    <div>
      GalleryTab
    </div>
  )
}

export default GalleryTab
```

##### GalleryTab output

For the entire output we are going to render a `Tab`, and based on the selected state we will render a `div` containing an `Image` inside a `span`. We will go step-by-step.

First render a `Tab` with the following classNames: `relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white`

```tsx
const GalleryTab: React.FC<GalleryTabProps> = ({
  image
}) => {
  return (
    <Tab className='relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white'>

    </Tab>
  )
}
```

Next, look into the docs on how each component exposes information about its current state via render props.

[HeadlessUI/react - Tabs - Using render props](https://headlessui.com/react/tabs#using-render-props)

Each component exposes information about its current state via [render props](https://reactjs.org/docs/render-props.html) that you can use to conditionally apply different styles or render different content.

For example, the `Tab` component exposes a `selected` state, which tells you if the tab is currently selected.

Let's extract the `selected` state for the `Tab` and render a`div`.

```tsx
const GalleryTab: React.FC<GalleryTabProps> = ({
  image
}) => {
  return (
    <Tab className='relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white'>
      {({ selected }) => (
        <div>

        </div>
      )}
    </Tab>
  )
}

```
Next inside the `div` is a span with the className of `'absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md'`. Finally, inside the `span` we have an `Image` with all its props. Give it a classname of `object-cover object-center`. 

```tsx
const GalleryTab: React.FC<GalleryTabProps> = ({
  image
}) => {
  return (
    <Tab className='relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white'>
      {({ selected }) => (
        <div>
          <span className='absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md'>
            <Image
              fill
              src={image.url}
              alt=""
              className="object-cover object-center"
            />
          </span>
        </div>
      )}
    </Tab>
  )
}
```

Make a sibling `span` that is a self-closing tag, or [void element](https://developer.mozilla.org/en-US/docs/Glossary/Void_element). We will use it to create a border around the single `Tab`.

```tsx
const GalleryTab: React.FC<GalleryTabProps> = ({
  image
}) => {
  return (
    <Tab className='relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white'>
      {({ selected }) => (
        <div>
          <span className='absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md'>
            <Image
              fill
              src={image.url}
              alt=""
              className="object-cover object-center"
            />
          </span>
          <span />
        </div>
      )}
    </Tab>
  )
}
```

Now we want this span to be the border but should be highlighted when `selected` is `true`. In this case we will use `cn()` function to conditionally render styles based on the current state of `Tab` component.

```tsx
const GalleryTab: React.FC<GalleryTabProps> = ({
  image
}) => {
  return (
    <Tab className='relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white'>
      {({ selected }) => (
        <div>
          <span className='absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md'>
            <Image
              fill
              src={image.url}
              alt=""
              className="object-cover object-center"
            >
            </Image>
          </span>
          <span className={cn(
            "absolute inset-0 rounded-md ring-2 ring-offset-2",
            selected ? "ring-black" : "ring-transparent"
          )}/>
        </div>
      )}
    </Tab>
  )
}
```

## Gallery component continued

[Headless UI - Tabs](https://headlessui.com/react/tabs).

Let's continue developing the `Gallery`. We want to use `Tab.Panels` next, give it `aspect-square w-full`.

Inside the `Tab.Panels` group we want to iterate over each `image` and map them to a `Tab.Panel` with a key of `image.id`.

`ecommerce-store\components\gallery\index.tsx`
```tsx
const Gallery: React.FC<GalleryProps> = ({
  images
}) => {
  return (
    <Tab.Group as='div' className='flex flex-col-reverse'>
      <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none'>
        <Tab.List className='grid grid-cols-4 gap-6'>
          {images.map((image) => (
            <GalleryTab key={image.id} image={image}/>
          ))}
        </Tab.List>
      </div>

      <Tab.Panels className='aspect-square w-full'>
        {images.map((image) => (
          <Tab.Panel key={image.id}>
            
          </Tab.Panel>
        ))}
      </Tab.Panels>

    </Tab.Group>
  )
}
```

Inside the `Tab.Panel`, create a `div` with the className `aspect-square relative h-full w-full sm:rounded-lg overflow-hidden` as a container for our `Image`.

Then we render an `Image` inside.

```tsx
const Gallery: React.FC<GalleryProps> = ({
  images
}) => {
  return (
    <Tab.Group as='div' className='flex flex-col-reverse'>
      <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none'>
        <Tab.List className='grid grid-cols-4 gap-6'>
          {images.map((image) => (
            <GalleryTab key={image.id} image={image}/>
          ))}
        </Tab.List>
      </div>

      <Tab.Panels className='aspect-square w-full'>
        {images.map((image) => (
          <Tab.Panel key={image.id}>
            <div className='aspect-square relative h-full w-full sm:rounded-lg overflow-hidden'>
              <Image 
                fill
                src={image.url}
                alt="Image"
                className="object-cover object-center"
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
      
    </Tab.Group>
  )
}
```

### Gallery expectations

With that the `Gallery` is implemented. It should be able to hover over a product images and the selected one should have a black outline. The selected image would show up in a bigger picture next to he product description/info. The other images would be in a tabbed format below it which can be clicked on.

Now we can re-use `Gallery` for the modal as well.

Things to test:
- Responsive design
- Images load
- Images proper size

## Product Info

Create a component named `Info.tsx` in `/components`.

`ecommerce-store\components\Info.tsx`
```tsx
import React from 'react';

const Info = () => {
  return (
    <div>Info</div>
  )
}

export default Info
```

### Developing the Info component

- Create the interface that takes the `product` as `data`
- render a `div` in the output
- Inside the `div` create an `h1` that interpolates `data.name`

```tsx
import React from 'react';

import { Product } from '@/types';

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({
  data
}) => {
  return (
    <div>
      <h1 className=''>
        {data.name}
      </h1>
    </div>
  )
}

export default Info
```

Let's style the output

```tsx
const Info: React.FC<InfoProps> = ({
  data
}) => {
  return (
    <div>
      <h1 className='text-3xl font-bold text-gray-900'>
        {data.name}
      </h1>
    </div>
  )
}
```

Let's see our output by rendering `Info` component in our product page. Pass in the product to the `data` prop.

`ecommerce-store\app\(routes)\product\[productId]\page.tsx`
```tsx
import Info from '@/components/Info';
// ...

const ProductPage: React.FC<ProductPageProps> = async ({
  params
}) => {
  // ...
  return (
    <div className='bg-white'>
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product.images}/>
            <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>

              <Info data={product} />

            </div>
          </div>
          <hr className='my-10' />
          <ProductList title="Suggested Items" items={suggestedProducts} />
        </div>
      </Container>
    </div>
  )
}
```

Let's continue developing the `Info` component.

- Create a division from the `h1` header, a `div` that will contain our product description. 
- Inside that `div` will be a `p` containing the price. We will re-use the `Currency` component to render this properly.
- Next is an `hr` right below that `div` to separate the product title and price from the description

```tsx
const Info: React.FC<InfoProps> = ({
  data
}) => {
  return (
    <div>
      <h1 className='text-3xl font-bold text-gray-900'>
        {data.name}
      </h1>

      <div className='mt-3 flex items-end justify-between'>
        <p className='text-2xl text-gray-900'>
          <Currency value={data?.price} />
        </p>
      </div>

      <hr className='my-4'/>

    </div>
  )
}
```

After the `hr`, we want to start rendering some properties of the `product` such as `size`. Create a `div` that centers its contents with flex and with a `gap-x-4`. Then render a `h3` with the text `Size` and a `div` as its sibling that interpolates `data.size.name` with optional chaining.

```tsx
const Info: React.FC<InfoProps> = ({
  data
}) => {
  return (
    <div>
      <h1 className='text-3xl font-bold text-gray-900'>
        {data.name}
      </h1>

      <div className='mt-3 flex items-end justify-between'>
        <p className='text-2xl text-gray-900'>
          <Currency value={data?.price} />
        </p>
      </div>

      <hr className='my-4'/>
      
      <div className='flex items-center gap-x-4'>
        <h3 className='font-semibold text-black'>
          Size:
        </h3>
        <div>
            {data?.size?.name}
        </div>
      </div>
      
    </div>
  )
}
```

Similarly, we can display the product color in the same way. But instead of simply interpolating the products color in text we are going to display the actual color.

```tsx
const Info: React.FC<InfoProps> = ({
  data
}) => {
  return (
    <div>
      <h1 className='text-3xl font-bold text-gray-900'>
        {data.name}
      </h1>

      <div className='mt-3 flex items-end justify-between'>
        <p className='text-2xl text-gray-900'>
          <Currency value={data?.price} />
        </p>
      </div>

      <hr className='my-4'/>

      <div className='flex items-center gap-x-4'>
        <h3 className='font-semibold text-black'>
          Size:
        </h3>
        <div>
            {data?.size?.name}
        </div>
      </div>

      <div className='flex items-center gap-x-4'>
        <h3 className='font-semibold text-black'>
          Color:
        </h3>
        <div 
          className='h-6 w-6 rounded-full border-gray-600'
          style={{ backgroundColor: data?.color?.value }}  
        />
      </div>

    </div>
  )
}
```

Let's refactor our code and encapsulate both the size and color division. Let's use a `flex-col` layout to encapsulate our product attributes.

```tsx
const Info: React.FC<InfoProps> = ({
  data
}) => {
  return (
    <div>
      <h1 className='text-3xl font-bold text-gray-900'>
        {data.name}
      </h1>

      <div className='mt-3 flex items-end justify-between'>
        <p className='text-2xl text-gray-900'>
          <Currency value={data?.price} />
        </p>
      </div>

      <hr className='my-4' />

      {/* Product Attributes*/}
      <div className='flex flex-col gap-y-6'>
        <div className='flex items-center gap-x-4'>
          <h3 className='font-semibold text-black'>
            Size:
          </h3>
          <div>
            {data?.size?.name}
          </div>
        </div>

        <div className='flex items-center gap-x-4'>
          <h3 className='font-semibold text-black'>
            Color:
          </h3>
          <div
            className='h-6 w-6 rounded-full border-gray-600'
            style={{ backgroundColor: data?.color?.value }}
          />
        </div>
      </div>

    </div>
  )
}
```

Now after our product attributes container, let's add a `Button` that will have the add to cart functionality later. While we do so, let's mark `Info` as "use client".

```tsx
"use client";

import React from 'react';

import { Product } from '@/types';
import Currency from '@/components/ui/Currency';
import Button from '@/components/ui/Button';
import { ShoppingCart } from 'lucide-react';

const Info: React.FC<InfoProps> = ({
  data
}) => {
  return (
    <div>
      {/* Product name & price... */}
      <hr className='my-4' />
      {/* Product Attributes*/}
      {/* ... */}

      <div className='mt-10 flex items-center gap-x-3'>
        <Button className='flex items-center gap-x-2'>
          Add To Cart
          <ShoppingCart />
        </Button>
      </div>

    </div>
  )
}
```

## Individual Category Page

Now when we click on a category at the top navbar we get a 404 page. Let's create the route, make a file named `app\(routes)\category\[categoryId]\page.tsx` and create a react functional component named `CategoryPage`.

```tsx
import React from 'react';

const CategoryPage = () => {
  return (
    <div>
      CategoryPage
    </div>
  )
}

export default CategoryPage
```

Now when we click on a category it should render `CategoryPage`.

This will resolve the 404 error because as we can see in the `MainNav`, the `href` has the following path of `/category/${route.id}`:

```tsx
const MainNav: React.FC<MainNavProps> = ({
  data
}) => {
  const pathname = usePathname();

  // Map the data to usable route objects
  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`
  }));
```

Let's add the `CategoryPageProps`, which contains `params` that contains `categoryId`. We will also be able to filter/search by size and color, so we are going to have `searchParams` that contain `colorId` and `sizeId`.

1. Create prop interface that contains `params` and `searchParams`
2. Assign the interface to type of `CategoryPage` and extract parameters

```tsx
import React from 'react';

interface CategoryPageProps {
  params: {
    categoryId: string;
  },
  searchParams: {
    colorId: string;
    sizeId: string;
  }
}

const CategoryPage:React.FC<CategoryPageProps> = ({
  params,
  searchParams
}) => {
  return (
    <div>
      CategoryPage
    </div>
  )
}

export default CategoryPage
```

Also set the revalidation option for the page to zero seconds. The page will be revalidated on every request, purging the cache and fetching the latest data from the data source. 

We also need to convert it to `async` so that we can fetch our products by `categoryId` while including the `searchParams`.

`ecommerce-store\app\(routes)\category\[categoryId]\page.tsx`
```tsx
// Revalidate the page on every request, purge cache & fetch latest data
export const revalidate = 0;
```

### Actions for sizes, colors & individual category

Create the actions to fetch each of the product attributes.

For sizes, create the file `ecommerce-store\actions\getSizes.tsx`

```tsx
import { Size } from "@/types";

// Dynamically build address to fetch a resource on the web
// The scheme/protocol & domain name are defined as an environment variable
const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

/**
 * 
 * @returns an array of sizes
 */
const getSizes = async (): Promise<Size[]> => {
  // Send network request to the URL and save the response
  const res = await fetch(URL);

  // Return the response in JSON format
  return res.json();
}

export default getSizes;
```

Similarly for colors, create file `ecommerce-store\actions\getColors.tsx`

```tsx
import { Color } from "@/types";

// Dynamically build address to fetch a resource on the web
// The scheme/protocol & domain name are defined as an environment variable
const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

/**
 * 
 * @returns an array of colors
 */
const getColors = async (): Promise<Color[]> => {
  // Send network request to the URL and save the response
  const res = await fetch(URL);

  // Return the response in JSON format
  return res.json();
}

export default getColors;
```

Finally, for the action to fetch an individual category create the file `ecommerce-store\actions\getCategory.tsx`

```tsx
import { Category } from "@/types";

// Dynamically build address to fetch a resource on the web
// The scheme/protocol & domain name are defined as an environment variable
const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

/**
 * 
 * @returns an individual Category
 */
const getCategory = async (id: string): Promise<Category> => {
  // Send network request to the URL and save the response
  const res = await fetch(`${URL}/${id}`);

  // Return the response in JSON format
  return res.json();
}

export default getCategory;
```

With the actions created, we can now fetch all the things we need to build our Category page. Fetch `products`, `sizes`, `colors` and `category` in `CategoryPage`.

```tsx
const CategoryPage:React.FC<CategoryPageProps> = async ({
  params,
  searchParams
}) => {
  
  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });
  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);

  return (
    <div>
      CategoryPage
    </div>
  )
}
```

Now we can work on the output of CategoryPage, recall that each category has its own billboard. We render a `Container` with a `Billbaord` passing in the data.

```tsx
const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams
}) => {

  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });
  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);

  return (
    <div className='bg-white'>
      <Container>
        <Billboard
          data={category.billboard}
        />
      </Container>
    </div>
  )
}
```

### Issue: Unhandled runtime error, cannot read properties reading 'label'

Diagnosing the issue shows that we are not including the individual billboard in the GET route for the individual category. Let's add the billboard data in category GET response.

`ecommerce-admin\app\api\[storeId]\categories\[categoryId]\route.ts`
```tsx
export async function GET (
  req: Request,
  { params }: { params: { categoryId: string }}
){
  try {
    // Check parameters
    if (!params.categoryId){
      return new NextResponse("Category ID is required", { status: 400 });
    }

    // Find the specific Category in the database
    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        billboard: true,
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
```

### Adding filters to CategoryPage

Next we want to add our filter components with responsive layout, first the set-up:

```tsx
const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams
}) => {

  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });
  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);

  return (
    <div className='bg-white'>
      <Container>
        <Billboard
          data={category.billboard}
        />
        <div className='px-4 sm:px-6 lg:px-8 pb-24'>
          <div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
            {/* Mobile Filters */}
            <div className='hidden lg:block'>
              <Filter />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
```

Let's add the props for our `Filter` component for sizes in `CategoryPage`.

```tsx
const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams
}) => {

  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });
  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);

  return (
    <div className='bg-white'>
      <Container>
        <Billboard
          data={category.billboard}
        />
        <div className='px-4 sm:px-6 lg:px-8 pb-24'>
          <div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
            {/* Mobile Filters */}
            {/* Desktop Filters */}
            <div className='hidden lg:block'>
              <Filter 
                valueKey="sizeId"
                name="Sizes"
                data={sizes}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
```

### Filter component

Let's create a local `/components` folder inside `ecommerce-store\app\(routes)\category\[categoryId]`. Then create a file `ecommerce-store\app\(routes)\category\[categoryId]\components\Filter.tsx`, a react functional component.

```tsx
import React from 'react';

const Filter = () => {
  return (
    <div>Filter</div>
  )
}

export default Filter
```

Now we can import `Filter` in the individual category page. Since it is within a local `components` folder we can use the dot (.) in the import statement which means that the file/module to be imported is in the same directory as the current file. It is a way of specifying a *relative path* to the module or file.

```tsx
import Filter from './components/Filter';
// ...
const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams
}) => {
  // ...
    return (
    <div className='bg-white'>
      {/* Output with Filters */}
    </div>
  )
}
```

Developing the `Filter` component.

- Mark as "use client"
- Create `FilterProps` which contains 
  - `data` of type `Size[]` or `Color[]`
  - `name: string`
  - `valueKey: string`
- Assign the props and extract the keys in the props

```tsx
"use client";

import { Color, Size } from '@/types';
import React from 'react';

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
}

const Filter: React.FC<FilterProps> = ({
  data,
  name,
  valueKey
}) => {
  return (
    <div>Filter</div>
  )
}

export default Filter
```

Next, we want to import two hooks from Next.js app router module.

The statement `import { useRouter, useSearchParams } from 'next/navigation';` is used to import two hooks from the Next.js app router module. These hooks are:

- `useRouter`: This hook returns an object that contains the current route information and methods to manipulate the app router. For example, you can use `useRouter` to access the route path, query, params, or push a new route programmatically.

- `useSearchParams`: This hook returns a read-only version of the [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) interface, which provides utility methods for reading and updating the query string of the current URL. For example, you can use `useSearchParams` to get or set a query parameter, check if a parameter exists, or get the keys and values of all the parameters.

These hooks are useful for creating dynamic and interactive app components that depend on the URL state.

Now to get the currently selected value we want to use `searchParams.get()` which "returns the first value associated with the given search parameter (or null if it does not exist)". The query parameter is specified by the `valueKey` variable, which is a prop passed to the `Filter` component. 

For example, earlier we passed in `sizeId` to the `valueKey` prop in `Filter`, then the `selectedValue` will be the value of the `sizeId` parameter in the URL.

```tsx
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
}

const Filter: React.FC<FilterProps> = ({
  data,
  name,
  valueKey
}) => {
  // URLSearchParams interface to read & update the query string of current URL
  const searchParams = useSearchParams();

  // object that contains current route info & methods to manipulate app router
  const router = useRouter();
```

#### Filter's click handler

In the case that a user clicks on a `Filter` component, what is the expected behavior? When clicking on a filter the user expects the filters be applied. But when clicked on an active filter, the user expects to remove the filter. 

This means that the query string of the URL should update accordingly. So the `onClick` function is responsible for updating the URL query parameters when a user clicks on a filter. It should also remove the filter if it is already active.

We are going to use `queryString` from [query-string](https://www.npmjs.com/package/query-string) to handle parsing and stringifying our URL query strings.

Create a `onClick` function that does these things:

1. Parse the current query parameters from the URL
2. Generate a new `query` object that contains updated query parameters
3. If a user clicks on an already active filter, then the user wants to remove it
4. Generate a URL with the updated query parameters
  - Using `query-string` pass in `skipNull: true` to the second parameter of `stringify()` to skil keys with `null` as the value
5. Push to the new URL

`ecommerce-store\app\(routes)\category\[categoryId]\components\Filter.tsx`
```tsx
/**
 * Update the URL query parameters when a user clicks on a filter, and remove
 * the filter if it is already active
 * @param id a string that represents the unique identifier of the element
 *           that triggered the event 
 */
const onClick = (id: string) => {
  // Parse the current URL's query string into an object
  const currentQuery = queryString.parse(searchParams.toString());

  // Generate a new object that contains the updated query parameters
  const query = {
    ...currentQuery,
    [valueKey]: id
  };

  // Remove filter from query parameters if it is already active
  if (currentQuery[valueKey] == id) {
    query[valueKey] = null;
  }

  // Generate a URL with updated query parameters
  const url = queryString.stringifyUrl({
    url: window.location.href,
    query
  }, { skipNull: true });

  // Navigate to the specified URL
  router.push(url);
}
```

#### Filter output

Recall that in `Filter`, we have 3 props: `{ data, name, valueKey }`. 

- `data` is an array of the data we want to filter
- `name` of the filter
- `valueKey` is the unique identifier for the filter

Inside a parent `div` we have an `h3` and `hr` as siblings. After the `hr` we have another sibling `div` that is a flex container which maps out the `data` into a `div` element with the `key` being `filter.id` and styles that center the contents within. 

- `Filter` will include an `h3` element and an `hr` element to provide context for the filtered data 
- Component will `map()` out each item in `data` array to a new `div` element
- This improves user experience by allowing users to filter data and update the URL query parameters without reloading the page

```tsx
const Filter: React.FC<FilterProps> = ({
  data,
  name,
  valueKey
}) => {
  // ...
  return (
    <div className='mb-8'>
      <h3 className='text-lg font-semibold'>
        {name}
      </h3>
      <hr className='my-4'/>
      <div className='flex flex-wrap gap-2'>
        {data.map((filter) => (
          <div
            className='flex items-center'
            key={filter.id}
          >
          </div>
        ))}
      </div>
    </div>
  )
}
```

##### Add interaction to `Filter` component

- Render a `Button` with `filter.name` as the child inside the mapping

```tsx
import Button from '@/components/ui/Button';

const Filter: React.FC<FilterProps> = ({
  data,
  name,
  valueKey
}) => {
// ...
  {data.map((filter) => (
    <div
      className='flex items-center'
      key={filter.id}
    >
      <Button>
        {filter.name}
      </Button>
    </div>
  ))}
```

- Now add the props `className` and `onClick` to the `Button`
  - `className` use `cn` utility function to combine classNames so we can conditionally apply a style. In this case, we want to check for the condition that a `Filter` is selected, if so then we invert the background and text color
  - For `onClick` pass in the click handler function with the `filter.id` parameter

```tsx
{data.map((filter) => (
  <div
    className='flex items-center'
    key={filter.id}
  >
    <Button
      className={cn(
        "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
        selectedValue === filter.id && "bg-black text-white"
      )}
      onClick={() => onClick(filter.id)}
    >
      {filter.name}
    </Button>
  </div>
))}
```

##### Issue: Filter `Button` not applying styles accordingly

After debugging, the issue stems from the actual `Button` component 

`ecommerce-store\components\ui\Button.tsx`
```tsx
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  disabled,
  type = "button",
  ...props
}, ref) => {
  return (
    <button
      className={cn(
        `
        w-auto
        rounded-full
        bg-black
        border-transparent
        px-5
        py-3
        disabled:cursor-not-allowed
        disabled:opacity-50
        text-white
        font-semibold
        hover:opacity-75
        transition
        `,
        className
      )}
      ref={ref}
    >
      {children}
    </button>
  )
})
```

Notice that we spread out the `props` but we do not use it inside the return. So after the `ref`, let's spread the `props`.

```tsx
import React, { forwardRef } from "react";

import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  disabled,
  type = "button",
  ...props
}, ref) => {
  return (
    <button
      className={cn(
        `
        w-auto
        rounded-full
        bg-black
        border-transparent
        px-5
        py-3
        disabled:cursor-not-allowed
        disabled:opacity-50
        text-white
        font-semibold
        hover:opacity-75
        transition
        `,
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button";

export default Button;
```

With the addition of `{...props}` to the `button`'s props, this allows for additional props to be passed in.

#### Color Filter

Let's add a `Filter` for color inside the individual `CategoryPage`.

`ecommerce-store\app\(routes)\category\[categoryId]\page.tsx`
```tsx
// ... imports & interface
const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams
}) => {

  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });
  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);

  return (
    <div className='bg-white'>
      <Container>
        <Billboard
          data={category.billboard}
        />
        <div className='px-4 sm:px-6 lg:px-8 pb-24'>
          <div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
            {/* Mobile Filters */}
            {/* Desktop Filters */}
            <div className='hidden lg:block'>
              <Filter
                valueKey="sizeId"
                name="Sizes"
                data={sizes}
              />
              <Filter
                valueKey="colorId"
                name="Colors"
                data={colors}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CategoryPage
```

### Products in Category Page

Before adding our products, we need to add a `NoResults` component when the filters applied yields no products. 

So create a products container in a `div` with the styles `mt-6 lg:col-span-4 lg:mt-0`, then conditionally render `NoResults` component when `products.length` is zero.

```tsx
import NoResults from '@/components/ui/NoResults';

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams
}) => {
  // ...
  return (
    <div className='bg-white'>
      <Container>
        <Billboard
          data={category.billboard}
        />
        <div className='px-4 sm:px-6 lg:px-8 pb-24'>
          <div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
            {/* Mobile Filters */}
            {/* Desktop Filters */}
            <div className='hidden lg:block'>
              <Filter
                valueKey="sizeId"
                name="Sizes"
                data={sizes}
              />
              <Filter
                valueKey="colorId"
                name="Colors"
                data={colors}
              />
            </div>
            <div className='mt-6 lg:col-span-4 lg:mt-0'>
              {products.length == 0 && <NoResults />}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
```

Now we can show our `products`, create another `div` with a responsive grid. And inside this `div` we map out each of the `products`.

```tsx
<div className='mt-6 lg:col-span-4 lg:mt-0'>
  {products.length == 0 && <NoResults />}
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
    {products.map((item) => (
      <div>

      </div>
    ))}
  </div>
</div>
```

We will map out each product to a `ProductCard` while passing in the necessary data to the props `key` and `data`.

```tsx
import ProductCard from '@/components/ui/ProductCard';
// ...
    <div className='mt-6 lg:col-span-4 lg:mt-0'>
      {products.length == 0 && <NoResults />}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {products.map((item) => (
          <ProductCard 
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </div>
```

### Mobile Filters

Let's now create Mobile Filters for our individual category page. Create the react functional export component under the local `components` folder inside the category route named `MobileFilters`. 

`ecommerce-store\app\(routes)\category\[categoryId]\components\MobileFilters.tsx`
```tsx
import React from 'react';

const MobileFilters = () => {
  return (
    <div>MobileFilters</div>
  )
}

export default MobileFilters
```

Then import and render `MobileFilters` inside our individual category page. Let's also pass in `sizes` data and `colors` data as props.

```tsx
import MobileFilters from './components/MobileFilters';
// ...
const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams
}) => {
  // ...
  return (
    <div className='bg-white'>
      <Container>
        <Billboard
          data={category.billboard}
        />
        <div className='px-4 sm:px-6 lg:px-8 pb-24'>
          <div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
            {/* Mobile Filters */}
            <MobileFilters sizes={sizes} colors={colors}/>
```

Then we can add the prop interface which contains the `sizes` and `colors`. Also assign the type with the prop interface to `MobileFilters` and destructure the props.

`ecommerce-store\app\(routes)\category\[categoryId]\components\MobileFilters.tsx`
```tsx
import React from 'react';

import { Color, Size } from '@/types';

interface MobileFiltersProps {
  sizes: Size[];
  colors: Color[];
}

const MobileFilters:React.FC<MobileFiltersProps> = ({
  sizes,
  colors
}) => {
  return (
    <div>MobileFilters</div>
  )
}

export default MobileFilters
```

Let's add a state variable `open` which enables or disables `MobileFilters`. Let's also define functions `onOpen` and `onClose` that set the `open` state to `true` and `false` respectively.

```tsx
import React, { useState } from 'react';

const MobileFilters:React.FC<MobileFiltersProps> = ({
  sizes,
  colors
}) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
```

#### Important note: causing an error with `useState` hook

The error message:
```sh
Argument of type 'true' is not assignable to parameter of type 'SetStateAction<undefined>'.ts(2345)
```

Is caused by the following code:

```tsx 
  const [open, setOpen] = useState();
  // Error happens below
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
```

That is because we are trying to assign a value of type `true` to a state variable that has been initialized with an `undefined` value. To fix this error you need to provide an initial value for the `open` state variable that is of the correct type. In this case, we want to initialize `open` to `false` by passing it as the initial value to `useState`

```tsx
  const [open, setOpen] = useState(false);
  // Error fixed
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
```

#### Output of MobileFilters

We want `MobileFilters` to be a `Button` that only displays on mobile screens. First, the output should be wrapped in a [Fragment](https://react.dev/reference/react/Fragment) `(<>...</>)`. Then inside we should have a `Button` that is hidden on large screens. It should center its items. Also assign its `onClick` prop to function`onOpen`.

Inside the `Button` we have the text "Filters" and a `Plus` icon from "lucide-react", with a size of 20.

```tsx
const MobileFilters:React.FC<MobileFiltersProps> = ({
  sizes,
  colors
}) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button onClick={onOpen} className='flex items-center gap-x-2 lg:hidden'>
        Filters
        <Plus size={20} />
      </Button>
    </>
  )
}
```

##### Dialog from `headlessui/react`

Now we are going to render a [Dialog(Modal) from headlessui/react](https://headlessui.com/react/dialog), which is a fully-managed, renderless dialog component jam-packed with accessibility and keyboard features, perfect for building completely custom modal and dialog windows.

A Dialog is a modal that will display additional content when the user clicks the "Filters" button.

Now `import` and add `Dialog` right after the `Button` as a sibling. Make sure to include the props `{ open, onClose, as, className }`. Similar to `Button`, we want it to be `lg:hidden` but also add a z-index of 40 and `relative` styles.

```tsx
import { Dialog } from '@headlessui/react';
// ...
const MobileFilters:React.FC<MobileFiltersProps> = ({
  sizes,
  colors
}) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button onClick={onOpen} className='flex items-center gap-x-2 lg:hidden'>
        Filters
        <Plus size={20} />
      </Button>

      <Dialog open={open} onClose={onClose} as='div' className='relative z-40 lg:hidden'>

      </Dialog>
    </>
  )
}
```

Add a `Dialog.Panel` which contains an `IconButton` using the "X" icon from lucide-react.

```tsx
      <Dialog open={open} onClose={onClose} as='div' className='relative z-40 lg:hidden'>
        {/* Background */}
        <div className='fixed inset-0 bg-black bg-opacity-25' />

        {/* Dialog Position */}
        <div className='fixed inset-0 z-40 flex'>
          <Dialog.Panel className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl'>

            {/* Close Button */}
            <div className='flex items-center justify-end px-4'>
              <IconButton icon={<X size={15} />} onClick={onClose} />
            </div>

          </Dialog.Panel>
        </div>
      </Dialog>
```

Now to finish up the `Dialog` modal for `MobileFilters`, we need to render the filters. We will have the sizes and colors filters available just like the main individual category page on larger screens.

```tsx
const MobileFilters: React.FC<MobileFiltersProps> = ({
  sizes,
  colors
}) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button onClick={onOpen} className='flex items-center gap-x-2 lg:hidden'>
        Filters
        <Plus size={20} />
      </Button>

      <Dialog open={open} onClose={onClose} as='div' className='relative z-40 lg:hidden'>
        {/* Background */}
        <div className='fixed inset-0 bg-black bg-opacity-25' />

        {/* Dialog Position */}
        <div className='fixed inset-0 z-40 flex'>
          <Dialog.Panel className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl'>

            {/* Close Button */}
            <div className='flex items-center justify-end px-4'>
              <IconButton icon={<X size={15} />} onClick={onClose} />
            </div>

            {/* Render the filters */}
            <div className='p-4'>
              <Filter
                valueKey="sizeId"
                name="Sizes"
                data={sizes}
              />
              <Filter
                valueKey="colorId"
                name="Colors"
                data={colors}
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
```

## zustand: state management for the store

The next thing we want is to create a popover for our product.

"A popover is a transient view that appears above other content when people click or tap a control or interactive area." Use a popover to expose small amount of information or functionality.

Before we can do that we need to create a store. We are going to use [zustand](https://github.com/pmndrs/zustand), a small and scalable state management solutioon for react.

[zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) uses hooks to create and consume state without the need for reducers, action creators, or context providers. It supports immutable state, action-based updates, multiple state slices, async actions and more. 

Install zustand in the store directory.

```sh
npm install zustand
```

### Create the hook

Create a folder named `hooks` wih a file named `use-preview-modal.ts`. Inside we import `create` from zustand, also import `Product`.

Then we create the interface `PreviewModalStore` which contains the following:
  - `isOpen` a boolean
  - `data` an optional `Product`
  - `onOpen` is a function which takes in the parameter `data`, an optional `Product` and returns a `void`
  - `onClose` is a function which returns `void`

`ecommerce-store\hooks\use-preview.modal.ts`
```ts
import { create } from 'zustand';

import { Product } from '@/types';

interface PreviewModalStore {
  isOpen: boolean;
  data?: Product;
  onOpen: (data: Product) => void;
  onClose: () => void;
};
```

Let's finish up by using `create()` which uses the `set` function which merges state. In this case when we call `onOpen` we set the `data` and set `isOpen` to `true`.

```tsx
import { create } from 'zustand';

import { Product } from '@/types';

interface PreviewModalStore {
  isOpen: boolean;
  data?: Product;
  onOpen: (data: Product) => void;
  onClose: () => void;
};

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: Product) => set({ data: data, isOpen: true}),
  onClose: () => set({ isOpen: false })
}));

export default usePreviewModal;
```

## Create the Preview Modal

Create a client component `Modal.tsx` inside `ecommerce-store\components\ui`.

```tsx
"use client";

import React from 'react';

const Modal = () => {
  return (
    <div>Modal</div>
  )
}

export default Modal
```

Next make the prop interface which includes the properties `{ open, onClose, children }`. Then assign the interface to the type of `Modal` and destructure out those properties.

```tsx
"use client";

import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <div>Modal</div>
  )
}

export default Modal
```

### `Transition` component

We are going to use `Transition` from `headless/ui` and `Fragment from `React`.

- [Transition](https://headlessui.com/react/transition) is a component that lets you add enter/leave transitions to conditionally rendered elements, using CSS classes to control the actual transition styles in the different stages of the transition.

- [Fragment](https://react.dev/reference/react/Fragment), often used via `<>...</>` syntax, lets you group elements without a wrapper node.

We want to use `Transition` as a `Fragment`, with the `show` prop (which controls whether the children should be shown or hidden) set to `open` state.

```tsx
const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <Transition show={open} as={Fragment}>

    </Transition>
  )
}
```

Inside the `Transition`, we render a `Dialog` as a `div` which is also from `headlessui/react`.

```tsx
const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className='relative z-10' onClose={onClose}>

      </Dialog>
    </Transition>
  )
}
```

We will add a background shadow `div` that is self-closing inside `Dialog`,

```tsx
<div className="fixed inset-0 bg-black bg-opacity-50" />
```

Next create a sibling `div` that encompasses another container `div` that centers the contents of the `Transition.Child` as a `Fragment`.

```tsx
const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className='relative z-10' onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-50" />

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
            >

            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
```

#### `Transition` lifecycle props

The `Transition` component has the following props:

- `show` prop that controls whether the children should be shown or hidden 

- and a set of lifecycle props (life `enterFrom` & `leaveTo`) that let you add CSS classes at specific phases of a transition

Here are a list of the lifecycle props:

- `enter`
- `enterFrom`
- `enterTo`
- `leave`
- `leaveFrom`
- `leaveTo`

And we can give it the proper css styles from tailwind such as changing the `opacity` or control the easing of CSS transitions such as `ease-out` which is the CSS properties regarding `transition-timing-function`.

##### Animating transitions

[Animating transitions (headlessui/react)](https://headlessui.com/react/transition#animating-transitions).

By default, a `Transition` will enter and leave instantly, which is probably not what you're looking for if you're using this component.

To animate your enter/leave transitions, add classes that provide the styling for each phase of the transitions using these props:

- `enter`: Applied the entire time an element is entering. Usually you define your duration and what properties you want to transition here, for example `transition-opacity duration-75`.

- `enterFrom`: The starting point to enter from, for example `opacity-0` if something should fade in.

- `enterTo`: The ending point to enter to, for example `opacity-100` after fading in.

- `leave`: Applied the entire time an element is leaving. Usually you define your duration and what properties you want to transition here, for example `transition-opacity duration-75`.

- `leaveFrom`: The starting point to leave from, for example `opacity-100` if something should fade out.

- `leaveTo`: The ending point to leave to, for example `opacity-0` after fading out.

##### Coordinating multiple transitions

Sometimes you need to transition multiple elements with different animations but all based on the same state. For example, say the user clicks a button to open a sidebar that slides over the screen, and you also need to fade-in a background overlay at the same time.

You can do this by wrapping the related elements with a parent `Transition` component, and wrapping each child that needs its own transition styles with a `Transition.Child` component, which will automatically communicate with the parent `Transition` and inherit the parent's `show` state.

e.g.,

```tsx
import { Transition } from '@headlessui/react'

function Sidebar({ isShowing }) {
  return (
    /* The `show` prop controls all nested `Transition.Child` components. */
    <Transition show={isShowing}>
      {/* Background overlay */}
      <Transition.Child
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {/* ... */}
      </Transition.Child>

      {/* Sliding sidebar */}
      <Transition.Child
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        {/* ... */}
      </Transition.Child>
    </Transition>
  )
}
```

The `Transition.Child` component has the exact same API as the `Transition` component, but with no `show` prop, since the `show` value is controlled by the parent.

Parent `Transition` components will always automatically wait for all children to finish transitioning before unmounting, so you don't need to manage any of that timing yourself.


#### Adding the transition 

Use Dialog and Transition components to create a modal window.

The `Dialog` component handles the accessibility and focus management of a modal window.

The `Transition` component provides animations and transitions for the React element(s).

We will use the `Transition` component to wrap the `Dialog` component and its children, and use the `Transition.Child` to coordinate multiple transitions with multiple elements but all based on the same state. It will apply a fade-in and fade-out effect to the modal window. The result should be a modal window that appears and disappears smoothly while being accessible and responsive.

Use lifecycle props to style each phase of the transitions. 

Change modal window styles using lifecycle props

```tsx
const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className='relative z-10' onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-50" />

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >

            </Transition.Child>

          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
```

### `Dialog` Panel

Inside the `Transition.Child` we should create the `Dialog.Panel` that sets up the accessibility and focus management of a modal window.

Remember that a `Dialog` is a modal that pops up over the main content and blocks interaction with the rest of the page. The `Dialog.Panel` renders the modal content inside the `Dialog` component. Clicking outside the `Dialog.Panel` or pressing the `Escape` key willl fire the `close` event and close the dialog.

Make the `Dialog.Panel` have the following styles: "w-full max-w-3xl overflow-hidden roounded-lg text-left align-middle".

```tsx
<Dialog.Panel className="w-full max-w-3xl overflow-hidden rounded-lg text-left align-middle">
</Dialog.Panel>
```

Inside the `Dialog.Panel` is a flex `div` container that has items centered.

```tsx
<Dialog.Panel className="w-full max-w-3xl overflow-hidden rounded-lg text-left align-middle">
  
  <div className='relative flex w-full items-center'>

  </div>
  
</Dialog.Panel>
```

Let's style the relative container a bit more with `overflow-hidden` and `bg-white`.

Then apply a `shadow-2xl`. Finally add responsive padding to make the `Dialog.Panel` more user-friendly.

```tsx
<Dialog.Panel className="w-full max-w-3xl overflow-hidden rounded-lg text-left align-middle">
  
  <div className='relative flex w-full items-center overflow-hidden bg-white shadow-2xl px-4 pb-8 pt-14 sm:px-6 sm:pt-8 md:p-6 lg:p-8'>

  </div>

</Dialog.Panel>
```

Finally add a `div` that positions the content to the top right, and add a `IconButton` within that has the `X` icon and pass in `onClose` to the `onClick` prop.

```tsx
<Dialog.Panel className="w-full max-w-3xl overflow-hidden rounded-lg text-left align-middle">
  
  <div className='relative flex w-full items-center overflow-hidden bg-white shadow-2xl px-4 pb-8 pt-14 sm:px-6 sm:pt-8 md:p-6 lg:p-8'>
    <div className='absolute right-4 top-4'>
      <IconButton onClick={onClose} icon={<X size={15}/>}/>
    </div>
  </div>

</Dialog.Panel>
```

After the `div` that contains the `IconButton`, render the `children`.

```tsx
<Dialog.Panel className="w-full max-w-3xl overflow-hidden rounded-lg text-left align-middle">
  
  <div className='relative flex w-full items-center overflow-hidden bg-white shadow-2xl px-4 pb-8 pt-14 sm:px-6 sm:pt-8 md:p-6 lg:p-8'>
    <div className='absolute right-4 top-4'>
      <IconButton onClick={onClose} icon={<X size={15}/>}/>
    </div>
    {children}
  </div>

</Dialog.Panel>
```

### `PreviewModal` component

Create `ecommerce-store\components\PreviewModal.tsx`.

```tsx
import React from 'react';

const PreviewModal = () => {
  return (
    <div>PreviewModal</div>
  )
}

export default PreviewModal
```

Let's mark as "use client", then use our custom hook `usePreviewModal` to access the state variables to display product info.

```tsx
"use client";

import React from 'react';

import usePreviewModal from '@/hooks/use-preview-modal';

const PreviewModal = () => {
  const previewModal = usePreviewModal();

  // Use custom hook to access the state of PreviewModal to display product info
  const product = usePreviewModal((state) => state.data);


  return (
    <div>PreviewModal</div>
  )
}

export default PreviewModal
```

Now if the product has not loaded any data, do not return a preview modal.

Next, we render a `Modal` passing in the `open` and `onClose` props to that of the `previewModal` state variables.

```tsx
"use client";

import React from 'react';

import usePreviewModal from '@/hooks/use-preview-modal';
import Modal from '@/components/ui/Modal';

const PreviewModal = () => {
  const previewModal = usePreviewModal();

  // Use custom hook to access the state of PreviewModal to display product info
  const product = usePreviewModal((state) => state.data);

  // If product has not loaded any data, do not return a preview modal
  if (!product){
    return null;
  }

  return (
    <Modal
      open={previewModal.isOpen}
      onClose={previewModal.onClose}
    >
      <div className='grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8'>
        
      </div>
    </Modal>
  )
}

export default PreviewModal
```

Now inside `PreviewModal` we want to render the children next. The first one will contain a `div` with the `Gallery` component.

```tsx
const PreviewModal = () => {
  const previewModal = usePreviewModal();

  // Use custom hook to access the state of PreviewModal to display product info
  const product = usePreviewModal((state) => state.data);

  // If product has not loaded any data, do not return a preview modal
  if (!product){
    return null;
  }

  return (
    <Modal
      open={previewModal.isOpen}
      onClose={previewModal.onClose}
    >
      {/* Children */}
      <div className='grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8'>
        <div className='sm:col-span-4 lg:col-span-5'>
          <Gallery />
        </div>
        <div className='sm:col-span-8 lg:col-span-7'>

        </div>
      </div>
    </Modal>
  )
}
```

Recall that Gallery component required `images` for its props, so lets pass in `product.images`.

```tsx
import Gallery from '@/components/gallery';

const PreviewModal = () => {
  // ...

  return (
    <Modal
      open={previewModal.isOpen}
      onClose={previewModal.onClose}
    >
      <div className='grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8'>

        <div className='sm:col-span-4 lg:col-span-5'>
          <Gallery images={product.images} />
        </div>

        <div className='sm:col-span-8 lg:col-span-7'>

        </div>
      </div>
    </Modal>
  )
}
```

Next thing we want to add to the preview is our product info. So we render an `Info` component inside the next `div`. It has a `data` prop which we pass in the `product` data to.

```tsx
import Info from '@/components/Info';

const PreviewModal = () => {
  // ...

  return (
    <Modal
      open={previewModal.isOpen}
      onClose={previewModal.onClose}
    >
      <div className='grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8'>
        <div className='sm:col-span-4 lg:col-span-5'>
          <Gallery images={product.images} />
        </div>
        <div className='sm:col-span-8 lg:col-span-7'>
          <Info data={product} />
        </div>
      </div>
    </Modal>
  )
}
```

## Modal Providers

Next we want to create a `ModalProvider` component. Inside a `providers` folder at the root of the project, create a file named `ModalProvider.tsx` at the file path `ecommerce-store\providers\ModalProvider.tsx`.

```tsx
import React from 'react';

const ModalProvider = () => {
  return (
    <div>ModalProvider</div>
  )
}

export default ModalProvider
```

Let's do the following

- Mark as client component
- Return a fragment that renders the `PreviewModal`

```tsx
"use client";

import React from 'react';

import PreviewModal from '@/components/PreviewModal';

const ModalProvider = () => {
  return (
    <>
      <PreviewModal />
    </>
  )
}

export default ModalProvider
```

#### ModalProvider mounting trick to prevent hydration errors

Next we need to add `isMounted` state variable to delay execution of client-side code until after hydration.

- Import React and two hooks: `useEffect` and `useState`
- Declare a state variable `isMounted` and initialize it to `false`. This tracks whether the component has been mounted or not.
- Use the `useEffect` hook to set the `isMounted` variable to `true` after the initial render. Hook takes a function as the first argument and empty array as the second argument. The function will be executed only once after the component mounts, and the empty array indicates that there are no dependencies for the effect. This way, the effect will not run on every update, but only on the first render.
- Use a conditional statement to return `null` if `isMounted` is `false`. This means that the component will not render anything bbefore the effect has run. This is done to prevent hydration errors or unwanted flashes of content when using client-side only code.
  - ***Hydration** is the process of attaching event listeners to the existing markup rendered by the server*
- Return the `PreviewModal` component wrapped in a fragment if `isMounted` state variable is `true`. 
  - A fragment is a way of grouping multiple elements without adding extra nodes to the DOM.

This is a common pattern for using client-side-only code in React. It ensures that the code will only run after the component has been mounted and hydrated. This can be useful for code that relies on browser APIs, such as window or document, that are not available on the server.

`ecommerce-store\providers\ModalProvider.tsx`
```tsx
"use client";

import React, { useEffect, useState } from 'react';

import PreviewModal from '@/components/PreviewModal';

const ModalProvider = () => {
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
    <>
      <PreviewModal />
    </>
  )
}

export default ModalProvider
```

Now we can add this `ModalProvider` to our global layout. 

- Import ModalProvider from '@/providers/ModalProvider'
- Render ModalProvider as a child of body element
- Use ModalProvider to handle modal state and display

Right above the `Navbar` add `ModalProvider`.

`ecommerce-store\app\layout.tsx`
```tsx
import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';

import './globals.css';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ModalProvider from '@/providers/ModalProvider';

const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Store',
  description: 'Ecommerce store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ModalProvider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

### Preview Event handler

Now to trigger Modals from various places, we will use the hook we created. 

We will create a function named `onPreview` to be used inside the individual `ProductCard`.

Navigate to `ecommerce-store\components\ui\ProductCard.tsx`. Our goals are:

- Define `onPreview` function as a `MouseEventHandler` type
- Pass `onPreview` function as `onClick` prop to `IconButton` with `Expand` icon

Then write a function that is a type of `MouseEventHandler<HTMLButtonElement>` that takes in an `event` as the parameter.

`ecommerce-store\components\ui\ProductCard.tsx`
```tsx
const ProductCard: React.FC<ProductCard> = ({
  data
}) => {

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    // preview Modal
  }
```

Now let's assign this `onPreview` function to the `onClick` prop of the `IconButton` that has the `Expand` icon. This will trigger the preview modal.

`ecommerce-store\components\ui\ProductCard.tsx`
```tsx
const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  // ...

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    // preview Modal
  }

  return (
    <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      {/* Images & Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={data?.images?.[0]?.url}
          fill
          alt="Product Image"
          className='aspect-square object-cover rounded-md'
        />
        <div className='opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5'>
          <div className='flex gap-x-6 justify-center'>
            {/* Assign the onPreview function to IconButton with Expand*/}
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />

            <IconButton
              onClick={() => { }}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
```

Next what we want to do now is 

- Call `event.stopPropagation()` to prevent event bubbling
- Add logic to display preview modal with product data

#### event: stopPropagation()

[stopPropagation](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation), a method of the [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) interface, prevents further propagation of the current event in the capturing and bubbling phases.

In other words, we want to prevent the event from bubbling up to the parent elements.

**Event bubbling** is a mechanism that allows an event to be handled by multiple elements in a nested hierarchy, starting from the innermost element and propagating to the outermost element. Sometimes, this behavior is not desirable, and we want to stop the event from reaching the parent elements that may have their own event handlers.

In React, events are handled using synthetic events, which are wrappers around the native browser events. Synthetic events have the same interface as native events, including the `stopPropagation()` method. However, React also attaches its own event listeners at the root of the document, meaning that the event has already bubbled up to the top by the time it reaches the React event handler. Therefore, calling `stopPropagation()` on a synthetic event will only stop the event from reaching other React event handlers, but not the native event handlers [^1](https://stackoverflow.com/questions/66229908/how-to-use-stoppropagation-with-next-js).

To stop the event from reaching the native event handlers, you can use the `nativeEvent` property of the synthetic event, which points to the original browser event. Then, you can call `stopPropagation()` or `stopImmediatePropagation()` on the native event object. The difference between these two methods is that `stopPropagation()` only prevents the event from bubbling up further, while `stopImmediatePropagation()` also prevents other event listeners on the same element from being executed.

This [stackoverflow discussion on event.stopPropagation](https://stackoverflow.com/questions/24415631/reactjs-syntheticevent-stoppropagation-only-works-with-react-events) has an interesting discussion on this subject with the case of click events attached with JQuery in legacy code and React's event listener.

#### Prevent event bubbling in preview handler

- Call `event.stopPropagation()` to prevent event bubbling

Let's add the function in `onPreview`

```tsx
  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    // preview Modal
  }
```

Now look at the code where the `onPreview` function will be assigned to

```tsx
const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  // ...
  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    // preview Modal
  }
  return (
    // ...
        <div className='opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5'>
          <div className='flex gap-x-6 justify-center'>

            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />

            <IconButton
              onClick={() => { }}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
```

The purpose of `stopPropagation()` in the code is to prevent the click event on the `IconButton` from bubbling up to the parent elements, such as the `div` or the `body`, that may have their own click event handlers. 

Event bubbling is a mechanism that allows an event to be handled by multiple elements in a nested hierarchy, starting from the innermost element and propagating to the outermost element. Sometimes, this behavior is not desirable, and we want to stop the event from reaching the parent elements that may have different actions or effects.

The `stopPropagation()` method is a method of the Event interface that can be called on an event object to stop the event from bubbling up further. It does not, however, prevent any default behaviors from occurring, such as clicks on links or buttons. If you want to stop those behaviors, you can use the [preventDefault() method](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault). It also does not prevent propagation to other event handlers of the current element. If you want to stop those, you can use the [stopImmediatePropagation() method](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation).

Now look back at the entire output of `ProductCard.tsx`, notice how the main `div` has on `onClick` prop with `handleClick` assigned.

`ecommerce-store\components\ui\ProductCard.tsx`
```tsx
return (
    <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      {/* Images & Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={data?.images?.[0]?.url}
          fill
          alt="Product Image"
          className='aspect-square object-cover rounded-md'
        />
        <div className='opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5'>
          <div className='flex gap-x-6 justify-center'>
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={() => { }}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className='font-semibold text-lg'>
          {data.name}
        </p>
        <p className='text-sm text-gray-500'>
          {data.category?.name}
        </p>
      </div>
      {/* Price */}
      <div className='flex items-center justify-between'>
        <Currency value={data?.price} />
      </div>
    </div>
  )
```

Because we want to isolate the `onPreview` event to the `IconButton`. We call `event.stopPropagation()` on the `onPreview` function so that we can override the main `div` that has the `onClick` set to `handleClick`.

Next let's call the hook for our preview modal, so that we can create and manage global state using zustand.

```tsx
import usePreviewModal from '@/hooks/use-preview-modal';

interface ProductCard {
  data: Product;
}

const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  // Use custom hook to access and manipulate the preview modal state
  const previewModal = usePreviewModal();

  // Define mouse event handler for the preview button
  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    // Prevent the event from bubbling up to the parent elements
    event.stopPropagation();

    // Display preview modal with the product data
    previewModal.onOpen(data);
  }
```

With this in place we can test the preview modal for our `ProductCard`.

## Add to Cart functionality

### Notifications using `react-hot-toast`

Before we start implementing the Add-to-Cart function, lets install a toast notification system named [react-hot-toast](https://react-hot-toast.com/docs). Toasts are brief messages that appear on the screen to provide users with non-intrusive feedback or information. It is lightweight, customizable, and quite pretty.

Change to the right directory:

```sh
cd .\ecommerce-store\
```

Then install

```sh
npm i react-hot-toast
```

#### Create toast provider

Inside `ecommerce-store\providers` create a new file called `ToastProvider.tsx`.

- Mark it as a client component
- import `Toaster` from `react-hot-toast`
- Return react arrow functional component that returns `Toaster` as JSX element

```tsx
"use client";

import React from 'react';
import { Toaster } from 'react-hot-toast';

/**
 * Defines a functional component that serves as a provider, 
 * to pass data to any nested components that need to access it. 
 * @returns a Toaster element
 */
const ToastProvider = () => {
  return (
    // Render the Toaster element with default props
    <Toaster />
  )
}

// Export the ToastProvider component
export default ToastProvider
```

This renders a toast notification container using `react-hot-toast` library.

This provider will pass data to any nested components that need to access it. A provider can be used to share global state, theme, localization, or any other data that is common to many components in the app. A provider accepts a value prop that contains the data to be passed, and a children prop that contains the component tree to be rendered. Any component that is a descendant of a provider can access the data using a consumer component or a custom hook.

Now add `ToastProvider` to the global (root) layout. Navigate to `ecommerce-store\app\layout.tsx` and render `ToastProvider` right under `ModalProvider`.

`ecommerce-store\app\layout.tsx`
```tsx
import ToastProvider from '@/providers/ToastProvider';
// ...
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ModalProvider />
        <ToastProvider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

### Create store for our cart

Go into `hooks` and create the file `use-cart.ts`. 

Import:
-  `create` from zustand 
- `toast` from `react-hot-toast`
- `Product` from `@/types`

Create the interfrace `CartStore`. Finally create the hook `useCart`.

`ecommerce-store\hooks\use-cart.ts`
```ts
import { create } from 'zustand';
import toast from 'react-hot-toast';

import { Product } from '@/types';

interface CartStore {
  // ...
};

const useCart = create<CartStore>((set) => ({
  // ...
}));

export default useCart;
```

Let's update the `CartStore` interface. It will contain

- `items`, an array of Products
- `addItem`, function that takes a `Product` and adds it to the cart, returns `void`
- `removeItem`, function that takes a `string`, removes a single item and returns `void`
- `removeAll` a function that removes all items in the cart and returns `void`

```ts
interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
};
```

#### zustand middleware

Next let's import two more packages namely `persist` & `createJSONStorage` from `zustand/middleware`.

```ts
import { createJSONStorage, persist } from 'zustand/middleware';
```
##### `createJSONStorage` from zustand/middleware

- The `createJSONStorage` function is a helper function that can be used to create a storage object from any object that has a JSON property. For example, `localStorage`, `sessionStorage`, and `AsyncStorage` all have a JSON property, which is an object that can store and retrieve JSON strings. 

- The `createJSONStorage` function takes a function that returns the object with the JSON property, and returns a storage object that implements the methods `getItem`, `setItem`, and `removeItem`. 

- The storage object uses the JSON property of the object to store and retrieve the state as JSON strings

##### `persist` from zustand/middleware

- The `persist` middleware is used to persist the state of a store in a storage system, such as `localStorage`, `sessionStorage`, or `AsyncStorage`. 

- It can also perform migrations, versioning, and filtering of the state. 

- The persist middleware takes a state creator function, an options object, and an optional callback function as arguments. The options object must have a name property, which is used as a key to store the state in the storage system. 

- The options object can also have a storage property, which is a function that returns a custom storage object. The storage object must implement the methods `getItem`, `setItem`, and `removeItem`

#### How to create a store that persists in `localStorage`

So why do we need `persist` & `createJSONStorage` from `zustand/middleware`? 

We want to create a store that persists in `localStorage`. 

Let's try doing that, first off we need to `create` a store with `persist` middleware. We use the type `CartStore` to do so. We call this hook `useCart`.

```ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Product } from '@/types';

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
};

const useCart = create(
  persist<CartStore>(
```

Next, inside the state creator function (inside `persist`) we have a function with the parameters `set` and `get` which returns an immediate object that contains the properties we declared in the interface `CartStore` for now we can set each property to a default value.

`ecommerce-store\hooks\use-cart.ts`
```ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Product } from '@/types';

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
};

const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: Product) => {
    },
    removeItem: (id: string) => {
    },
    removeAll(): () => set({}),
  }))
);

export default useCart;
```

So far we have a `useCart` hook made with `zustand` and using `persist` middleware.

- Import create, persist, and createJSONStorage from zustand and zustand/middleware
- Import Product type from '@/types'
- Define CartStore interface with items, addItem, removeItem, and removeAll properties
- Create useCart hook with persist middleware and an empty state
- Export useCart hook as default

Now let's try working through what we should put inside `persist`, which takes two arguments:

1. A function that defines the state & actions of the store (state creator function, same signature as the `create` function)
2. an object that specifies the options for the persistence

[zustand - persisting store data](https://docs.pmnd.rs/zustand/integrations/persisting-store-data).

##### zustand/middleware - persist and state creator function

Let's work through each part of the state creator function. 

- `items`, a state, will be an empty array of Products

- `addItem`, an action, is a function that takes `data`, a type Product, and add the item to the cart.

How do we do that? Well let's get the current amount of items, named `currentItems` then call `get().items`. The `get()` function in zustand allows you to access the current state of the Zustand store. Used inside actions/selectors to get the values of state properties, in thtis case it gets the array of items in the cart store.  `get()` is provided by the `create` function from zustand. 

```tsx
const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: Product) => {
      const currentItems = get().items;
    },
```

If the user adds a duplicate, already existing item in the cart let's notify them with a toast message. We can check for a duplicate item by comparing the `item.id` to that of the passed-in `data.id`.

```tsx
const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: Product) => {
      // Get the current state of items
      const currentItems = get().items;
      
      // Check if user already has an existing item in the cart
      const existingItem = currentItems.find((item) => item.id === data.id);

      if (existingItem) {
        return toast("Item already in cart.");
      }
    },
```

Finally, if the current item is not already in the cart the we should add the `data`, the `Product`, to the `items` array. We do this by using the `set` function to update the state. We open up the array of `items` using `get()`, spread it and add the new `data`. Finally, end it with a successful toast message that the item was added to the cart.

```tsx
const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: Product) => {
      // Get the current state of items
      const currentItems = get().items;
      
      // Check if user already has an existing item in the cart
      const existingItem = currentItems.find((item) => item.id === data.id);

      if (existingItem) {
        return toast("Item already in cart.");
      }

      set({ items: [...get().items, data] });
      toast.success("Item added to cart.");
    },
```

- `removeItem`, an action, will take `id` a `string` as parameter and remove the following item inside the cart

Here we call the `set` function, open up an object that contains `items` property. It will spread out the array of `items` and `filter()` the items if their `id` is NOT equivalent to the `id` of the item in the parameter. Also add a success toast message that the item was removed from the cart.

```tsx
const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: Product) => {
      // ...
    },
    removeItem: (id: string) => {
      set({ items: [...get().items.filter((item) => item.id !== id)] });
      toast.success("Item removed from the cart.");
    },
```

- `removeAll` is an action that calls a function that simply resets the `items` array. It will use `set()` to update the state.

```tsx
const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: Product) => {
      // ...
    },
    removeItem: (id: string) => {
      // ...
    },
    removeAll(): () => set({ items: [] }),
  }))
```

That should complete our state creator function, the first parameter to `persist` for now.

[zustand - persisting store data](https://docs.pmnd.rs/zustand/integrations/persisting-store-data)

Finally, we can work on the second parameter of the `persist`. Recall its two arguments:

1. A function that defines the state & actions of the store (state creator function, same signature as the `create` function)
2. an object that specifies the options for the persistence

The object we pass in will have two properties: `{ name, storage }`. We will give it a name of `cart-storage` and the storage type will use `createJSONStorage()` which takes in an arrow function to `localStorage`.

The object we pass in:

```ts
  {
    name: 'cart-storage',
    storage: createJSONStorage(() => localStorage),
  }
```

The `useCart` hook with `persist` middleware:

```tsx
const useCart = create(
  persist<CartStore>(
    (set, get) => ({
    items: [],
    addItem: (data: Product) => {
      // Get the current state of items
      const currentItems = get().items;
      
      // Check if user already has an existing item in the cart
      const existingItem = currentItems.find((item) => item.id === data.id);

      if (existingItem) {
        return toast("Item already in cart.");
      }

      set({ items: [...get().items, data] });
      toast.success("Item added to cart.")
    },
    removeItem: (id: string) => {
      set({ items: [...get().items.filter((item) => item.id !== id)] });
      toast.success("Item removed from the cart.")
    },
    removeAll(): () => set({ items: [] }),
  }), 
  {
    name: 'cart-storage',
    storage: createJSONStorage(() => localStorage),
  }),
);
```

Troubleshooting: "This expression is not callable".

The error message:

```sh
This expression is not callable.
  Type '{ items: never[]; addItem: (data: Product) => any; removeItem: (id: string) => void; removeAll(): () => set; }' has no call signatures.ts(2349)
```

This happens when you are trying to call something that is not a function as a function. In TypeScript, a function is a type that has a call signature, which means that it can be invoked with some arguments and return a value.

Find the error in the code:

```ts
const useCart = create(
  persist<CartStore>(
    (set, get) => ({
    items: [],
    addItem: (data: Product) => {
      // ...
    },
    removeItem: (id: string) => {
      //  ...
    },
    removeAll(): () => set({ items: [] }),
  }), 
  {
    name: 'cart-storage',
    storage: createJSONStorage(() => localStorage),
  }),
);
```

Notice that `removeAll` has `()` which indicates that it is a function that is trying to be called. The fix is to remove the parenthesis after `removeAll`, like so:

```ts
const useCart = create(
  persist<CartStore>(
    (set, get) => ({
    items: [],
    addItem: (data: Product) => {
      // ...
    },
    removeItem: (id: string) => {
      //  ...
    },
    removeAll: () => set({ items: [] }),
  }), 
  {
    name: 'cart-storage',
    storage: createJSONStorage(() => localStorage),
  }),
);
```

- Use the create function from zustand instead of the default import
to avoid the TypeScript error that occurs when using persist middleware.
- Add toast notifications for adding and removing items from the cart.
- Indent code to improve readability

Now we can use this cart to add items to, complete with toast messages. We can also check the count of items.

### Add `useCart` in components

Inside `NavbarActions.tsx` create the `cart` with `useCart` hook. Then render `cart.items.length` in the `span` inside the output.

`ecommerce-store\components\NavbarActions.tsx`
```tsx
"use client";

import React, { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';

import Button from '@/components/ui/Button';
import useCart from '@/hooks/use-cart';

export default function NavbarActions() {
  const cart = useCart();
  // ...
  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button className="flex items-center rounded-full bg-black px-4 py-2">
        <ShoppingBag
          size={20}
          color="white"
        />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.length}
        </span>
      </Button>
    </div>
  )
}
```

Next we navigate to `ProductCard.tsx` and update it with the add to cart functionality.

Import the `useCart` hook and declare `cart` variable to assign it the value returned by the hook.

```tsx
import useCart from '@/hooks/use-cart';

interface ProductCard {
  data: Product;
}

const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  const cart = useCart();
```

Similar to the `onPreview` event handler. Let's create the `onAddToCart` function. 

`ecommerce-store\components\ui\ProductCard.tsx`
```tsx
  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    // Prevent the event from bubbling up to the parent elements
    event.stopPropagation();

    // Add product to cart logic
  }
```

Then we assign it to `ShoppingCart` `IconButton`.

```tsx
const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  // ...
  return (
    <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      {/* Images & Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={data?.images?.[0]?.url}
          fill
          alt="Product Image"
          className='aspect-square object-cover rounded-md'
        />
        <div className='opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5'>
          <div className='flex gap-x-6 justify-center'>

            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />

            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />

          </div>
        </div>
      </div>
```

Add onAddToCart button to ProductCard component

- Use the useCart custom hook to access the cart state and items
from the zustand store. 
- Define a mouse event handler for the button that prevents the event from bubbling up and calls the addItem method from the cart hook with the product data. 
- Display the button with a shopping cart icon on the bottom of the product image.

Now let's develop the `onAddToCart` function. To implement the add-to-cart functionality, when the user clicks a button we want to add the product item to the cart using its product data.

`ecommerce-store\components\ui\ProductCard.tsx`
```tsx
  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    // Prevent the event from bubbling up to the parent elements
    event.stopPropagation();

    // Add product data to cart
    cart.addItem(data);
  }
```

### Testing Add-To-Cart functionality

Run the project with `npm run dev`, in the main page we should be able to see a rendered `ProductList` containing `ProductCard`s. When user hovers over the card, they should see two `IconButton`s near the bottom of the component. One is the preview button, the other is the shopping cart button.

- First time clicking the shopping cart button while the product is not added to the cart yet, should add the item to the user's cart. Then a toast notification should display at the top.
- Clicking the cart button again will give the user a toast notification that the "Item already in cart". *It will not add the product again in the cart*.
- Clicking ANOTHER item's `ProductCard` should add a different product to the cart.
- Refreshing the page should persist the data in the cart.
- The amount of items in the cart should be rendered at the top right, inside `NavbarActions` component

### Product page with Add-To-Cart functionality

Now we can finally add an individual product to the cart in both the individual product page and the preview modal (found in the `ProductCard` when a user hovers over). Both places use the `Info` component, where we can add the functionality to add items to the cart.

`ecommerce-store\components\Info.tsx`
```tsx
import React, { MouseEventHandler } from 'react';

import useCart from '@/hooks/use-cart';

const Info: React.FC<InfoProps> = ({
  data
}) => {
  // Use hook to access and manipulate the shopping cart state and properties
  const cart = useCart();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    // Prevent the event from bubbling up to the parent elements
    event.stopPropagation();

    // Add product data to cart
    cart.addItem(data);
  }

return (
    <div>
      {/* ... */}

      <div className='mt-10 flex items-center gap-x-3'>
        <Button
          onClick={onAddToCart}
          className='flex items-center gap-x-2'
        >
          Add To Cart
          <ShoppingCart />
        </Button>
      </div>

    </div>
  )
}
```

feat: Implement Add-To-Cart functionality in Info

This commit adds the Add-To-Cart feature to the Info component. Users can now browse to an individual product page and click the "Add To Cart" button to add the product data to their shopping cart.

## Cart view

Next we want to create the cart view when the user clicks on their cart.

Navigate to `NavbarActions.tsx`, and add `router` from `next/navigation`.

`ecommerce-store\components\NavbarActions.tsx`
```tsx
import { useRouter } from 'next/navigation';

export default function NavbarActions() {
  // Create router object to perform client-side navigation
  const router = useRouter();
```

Now add an `onClick` prop to the `Button` in the output. Then assign a function that uses `router` to push to the route `/cart`.

```tsx
"use client";

import React, { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Button from '@/components/ui/Button';
import useCart from '@/hooks/use-cart';

export default function NavbarActions() {
  const router = useRouter();
  const cart = useCart();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []); 

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">

      <Button 
        onClick={() => router.push("/cart")}
        className="flex items-center rounded-full bg-black px-4 py-2"
      >

        <ShoppingBag
          size={20}
          color="white"
        />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.length}
        </span>
      </Button>
    </div>
  )
}
```

With our routing set up, we now need tot create the actual page for the route "/cart"

### Cart Page

Navigate to `ecommerce-store\app\(routes)` folder. Create a new folder named `cart`, with a file named `page.tsx` inside.

`ecommerce-store\app\(routes)\cart\page.tsx`
```tsx
import React from 'react';

const CartPage = () => {
  return (
    <div>
      CartPage
    </div>
  )
}

export default CartPage
```

- mark as use client
- ensure that the code will only run after the component has been mounted and hydrated

`ecommerce-store\app\(routes)\cart\page.tsx`
```tsx
"use client";

import React, { useEffect, useState } from 'react';

const CartPage = () => {

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
    <div>
      CartPage
    </div>
  )
}

export default CartPage
```

#### Developing the Cart Page

Cart Page will return:

- A `div`, which has a `className` of `bg-white`
- The children will have a `Container` wrapped around
- A `div` containing an `h1` with the text "Shopping Cart" as the children

```tsx
const CartPage = () => {
  // ...
  return (
    <div className='bg-white'>
      <Container>
        <div>
          <h1>Shopping Cart</h1>
        </div>
      </Container>
    </div>
  )
}
```

Let's make the `div` that contains the `h1` responsive with padding styles.

```tsx
const CartPage = () => {
  // ...
  return (
    <div className='bg-white'>
      <Container>
        <div className='px-4 py-16 sm:px-6 lg:px-8'>
          <h1>Shopping Cart</h1>
        </div>
      </Container>
    </div>
  )
}
```

Next let's style the title. Then as a sibling, create a `div` that has `grid grid-cols-12 items-start` style for large screen breakpoints. Then inside we have a `div` that has a `col-span-7` also for large scren breakpoints. This inner `div` will render our cart items.

```tsx
const CartPage = () => {
  // ...
  return (
    <div className='bg-white'>
      <Container>
        <div className='px-4 py-16 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-black'>Shopping Cart</h1>
          <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12'>
            <div className='lg:col-span-7'>
              {/* Iterate over cart items, if no items then render a message */}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
```

Now let's call the `useCart` hook to access the shopping cart state. We want to iterate over the items in the cart.

- Import useCart hook from '@/hooks/use-cart'
- Use useCart hook to access cart state and items

Before we do, we should handle the case where there is no items in the cart. Then render a `p` with neutral text saying that "No items added to cart".

- Add a conditional rendering to display a message if cart is empty

Next, in the case we do have cart items then we should render an unordered list `ul` and map out each item. For now we will render a `li` or list item as an example.

- Add a ul element to display cart items

```tsx
import useCart from '@/hooks/use-cart';

const CartPage = () => {
  const cart = useCart();
  // ...
  return (
    <div className='bg-white'>
      <Container>
        <div className='px-4 py-16 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-black'>Shopping Cart</h1>
          <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12'>
            <div className='lg:col-span-7'>
              {cart.items.length === 0 &&
                <p className='text-neutral-500'>No items added to cart</p>
              }
              <ul>
                {cart.items.map((item) => (
                  <li
                    key={item.id}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
```

#### CartItem component

Instead of a `li` item to render while mapping out `cart.items`. I'd like to render a custom component specifically for the `cart` route.

Create `components` folder inside `/app/(routes)/cart`. Inside create a file named `CartItem.tsx`.

`ecommerce-store\app\(routes)\cart\components\CartItem.tsx`
```tsx
import React from 'react';

const CartItem = () => {
  return (
    <div>CartItem</div>
  )
}

export default CartItem
```

Let's develop `CartItem`.

- mark as use client

Add imports:

`ecommerce-store\app\(routes)\cart\components\CartItem.tsx`
```tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { X } from 'lucide-react';

import IconButton from '@/components/ui/IconButton';
import Currency from '@/components/ui/Currency';
import useCart from '@/hooks/use-cart';
import { Product } from '@/types';

const CartItem = () => {
  return (
    <div>CartItem</div>
  )
}

export default CartItem
```

Next develop the interface: `CartItemProps`, it will contain `data` which is a type of `Product`. Then assign this interface to the `CartItem` function.

```tsx
interface CartItemProps {
  data: Product;
};

const CartItem: React.FC<CartItemProps> = ({
  data
}) => {
  return (
    <div>CartItem</div>
  )
}

export default CartItem
```

refactor: create CartItemProps interface

#### Using CartItem in Cart Page

Now replace the `li` in `CartPage` when iterating over `cart.items` to `CartItem` element

```tsx
import CartItem from './components/CartItem';

const CartPage = () => {
  const cart = useCart();
  // ...
  return (
    <div className='bg-white'>
      <Container>
        <div className='px-4 py-16 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-black'>Shopping Cart</h1>
          <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12'>
            <div className='lg:col-span-7'>
              {cart.items.length === 0 &&
                <p className='text-neutral-500'>No items added to cart</p>
              }

              <ul>
                {cart.items.map((item) => (
                  <CartItem
                    key={item.id}
                    data={item}
                  />
                ))}
              </ul>
              
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CartPage
```

#### Develop the UI output of `CartItem`

Instead of `div` we return a `li`, list item that contains a `div` with a responsive height and width.

```tsx
const CartItem: React.FC<CartItemProps> = ({
  data
}) => {
  return (
    <li className='flex py-6 border-b'>
      <div className='relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48'>
        
      </div>
    </li>
  )
}
```

Next render an `Image` from "next/image" that has the `src` from `data.images[0].url` and has the styles `object-cover object-center`.

```tsx
const CartItem: React.FC<CartItemProps> = ({
  data
}) => {
  return (
    <li className='flex py-6 border-b'>
      <div className='relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48'>
        <Image
          fill
          src={data.images[0].url}
          alt=''
          className='object-cover object-center'
        />
      </div>
    </li>
  )
}
```

Next we want to create a remove button for the CartItem. 

Outside of the first `div`, make a sibling `div` that is also relative. with the following styles: `relative ml-4 sm:ml-6 flex flex-1 flex-col justify-between`. Then inside is a `div` with style `absolute z-10 right-0 top-0` to position it at the top right. Finally, within we render the `IconButton` that contains the `X` icon from lucide with size 15.

```tsx
const CartItem: React.FC<CartItemProps> = ({
  data
}) => {
  return (
    <li className='flex py-6 border-b'>
      <div className='relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48'>
        <Image
          fill
          src={data.images[0].url}
          alt=''
          className='object-cover object-center'
        />
      </div>
      <div className='relative ml-4 sm:ml-6 flex flex-1 flex-col justify-between'>
        <div className='absolute z-10 right-0 top-0'>
          <IconButton onClick={() => {}} icon={<X size={15} />}/>
        </div>
      </div>
    </li>
  )
}
```

Let's take a step back and notice how the styles work in tandem. The `CartItem` component takes up the full screen width in mobile but on Desktop it only takes up half the screen. 

See in `CartPage`:

`ecommerce-store\app\(routes)\cart\page.tsx`
```tsx
const CartPage = () => {
  const cart = useCart();
  // ...
  return (
    <div className='bg-white'>
      <Container>
        <div className='px-4 py-16 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-black'>Shopping Cart</h1>
          <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12'>
            <div className='lg:col-span-7'>
              {cart.items.length === 0 &&
                <p className='text-neutral-500'>No items added to cart</p>
              }
              <ul>
                {cart.items.map((item) => (
                  <CartItem
                    key={item.id}
                    data={item}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
```

This is because the `CartPage` will also contain a "summary" for each `CartItem` to the right of it on Desktop and large screens.

Now back to `CartItem` let's create the containers that render the other data besides the cart image. 

Create a sibling `div` after the `IconButton`'s container `div`. Give it `relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0`, with another `div` that has the style `flex justify-between`. Inside this will be a `p`.

```tsx
const CartItem: React.FC<CartItemProps> = ({
  data
}) => {
  return (
    <li className='flex py-6 border-b'>
      <div className='relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48'>
        <Image
          fill
          src={data.images[0].url}
          alt=''
          className='object-cover object-center'
        />
      </div>

      <div className='relative ml-4 sm:ml-6 flex flex-1 flex-col justify-between'>

        <div className='absolute z-10 right-0 top-0'>
          <IconButton onClick={() => {}} icon={<X size={15} />} />
        </div>

        <div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
          <div className='flex justify-between'>
            <p>Cart Item's Name</p>
          </div>
        </div>

      </div>
    </li>
  )
}
```

Give the `p` a `className` of `text-lg font-semibold text-black` and interpolate `data.name` as the children. This should render the name of the Cart Item.

```tsx
<div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
  <div className='flex justify-between'>
    <p className='text-lg font-semibold text-block'>
      {data.name}
    </p>
  </div>
</div>
```

Next we want to add information about the `CartItem`. Let's interpolate the data for product color and product size. Create a sibling `div` that contains two `p` children that interpolates `data.color.name` and `data.size.name` respectively.

```tsx
const CartItem: React.FC<CartItemProps> = ({
  data
}) => {
  return (
    <li className='flex py-6 border-b'>
      {/* Image */}
      <div className='relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48'>
        <Image
          fill
          src={data.images[0].url}
          alt=''
          className='object-cover object-center'
        />
      </div>
      
      <div className='relative ml-4 sm:ml-6 flex flex-1 flex-col justify-between'>
        {/* Remove Button */}
        <div className='absolute z-10 right-0 top-0'>
          <IconButton onClick={() => {}} icon={<X size={15} />} />
        </div>
        {/* Product Information */}
        <div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
          {/* Name */}
          <div className='flex justify-between'>
            <p className='text-lg font-semibold text-block'>
              {data.name}
            </p>
          </div>

          {/* Size and Color */}
          <div className='mt-1 flex text-sm'>
            <p className='text-gray-500'>{data.color.name}</p>
            <p className='text-gray-500 ml-4 border-l border-gray-200 pl-4'>{data.size.name}</p>
          </div>

        </div>
      </div>
    </li>
  )
}
```

After that we render the `Currency` as a sibling to the size/color `div`. Interpolate `data.price`.

```tsx
{/* Size and Color */}
<div className='mt-1 flex text-sm'>
  <p className='text-gray-500'>{data.color.name}</p>
  <p className='text-gray-500 ml-4 border-l border-gray-200 pl-4'>{data.size.name}</p>
</div>

{/* Price */}
<Currency value={data.price} />
```

#### Remove a product in cart functionality

Let's add the ability to remove a product in the cart. 

Declare `cart` with `useCart` hook. Then create a function `onRemove` that calls `cart.removeItem(data.id)`.

```tsx
import useCart from '@/hooks/use-cart';

const CartItem: React.FC<CartItemProps> = ({
  data
}) => {
  // useCart hook: access and manipulate cart state and props
  const cart = useCart();

  /**
   * Removes an item from the cart by its id
   */
  const onRemove = () => {
    cart.removeItem(data.id);
  }
```

Now assign the `onRemove` function to the `IconButton`'s `onClick`.

```tsx
const CartItem: React.FC<CartItemProps> = ({
  data
}) => {
  // useCart hook: access and manipulate cart state and props
  const cart = useCart();

  /**
   * Removes an item from the cart by its id
   */
  const onRemove = () => {
    cart.removeItem(data.id);
  }

  return (
    <li className='flex py-6 border-b'>
      {/* Image */}
      <div className='relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48'>
        <Image
          fill
          src={data.images[0].url}
          alt=''
          className='object-cover object-center'
        />
      </div>

      <div className='relative ml-4 sm:ml-6 flex flex-1 flex-col justify-between'>
        {/* Remove Button */}
        <div className='absolute z-10 right-0 top-0'>
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
```

- Use useCart hook to access and manipulate cart state and props
- Add onRemove function that removes an item from the cart by its id
- Add IconButton component to trigger onRemove function

#### Cart Page Summary

Let's create the `Summary` component for our Cart Page.

Under `/app/(routes)/cart/components` create `Summary.tsx` a react functional component. Add "use client" directive at the top.

`ecommerce-store\app\(routes)\cart\components\Summary.tsx`
```tsx
"use client";

import React from 'react';

const Summary = () => {
  return (
    <div>Summary</div>
  )
}

export default Summary
```

Now add `Summary` component right after the `div` that contains the `ul` in the output of `CartPage`.

`ecommerce-store\app\(routes)\cart\page.tsx`
```tsx
import Summary from './components/Summary';

const CartPage = () => {
  const cart = useCart();
  // ...
  return (
    <div className='bg-white'>
      <Container>
        <div className='px-4 py-16 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-black'>Shopping Cart</h1>
          <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12'>

            <div className='lg:col-span-7'>
              {cart.items.length === 0 &&
                <p className='text-neutral-500'>No items added to cart</p>
              }
              <ul>
                {cart.items.map((item) => (
                  <CartItem
                    key={item.id}
                    data={item}
                  />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  )
}
```

Next we need [axios](https://www.npmjs.com/package/axios) package.

- [axios documentation](https://axios-http.com/docs/intro)

Let's install it:

```sh
npm i axios
```

Now back to the `Summary.tsx`, here are the following imports:

Global and local imports:
```tsx
// Global Imports
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast'; 

// Local imports
import Button from '@/components/ui/Button';
import Currency from '@/components/ui/Currency';
import useCart from '@/hooks/use-cart';
```

Next develop the `Summary` component.

- Give the `div` a `className` with responsive styles. On large screens allow it to span 5 columns. Also give it a light gray backgrounded.
- Inside the `div` create an `h2` with large text and medium font and have a darker gray for the text color. Inside the children will be "Order Summary"

```tsx
const Summary = () => {
  return (
    <div className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:pt-8'>
      <h2 className='text-lg font-medium text-gray-900'>
        Order Summary
      </h2>
    </div>
  )
}
```

Next add a nested `div` with 2 levels of outer `div`s. Inside the children render an "Order Total".

```tsx
const Summary = () => {
  return (
    <div className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:pt-8'>
      <h2 className='text-lg font-medium text-gray-900'>
        Order Summary
      </h2>

      <div>
        <div>
          <div>
            Order Total
          </div>
        </div>
      </div>
      
    </div>
  )
}
```

Next we render a `Currency` to the `Summary` next to the `div` that contains Order Total. After that, right before the last div we add the checkout `Button`, with the children text "Checkout".

- Add `Currency` to Order Total, it has an arbitrary placeholder for `value` prop
- Add `Button` for checkout

```tsx
const Summary = () => {
  return (
    <div className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:pt-8'>
      <h2 className='text-lg font-medium text-gray-900'>
        Order Summary
      </h2>

      <div>
        <div>
          <div>
            Order Total
          </div>
          <Currency value={20} />
        </div>
      </div>

      <Button>
        Checkout
      </Button>
    </div>
  )
}
```

Let's style the `Order Total`. We give the outermost `div` a top margin and some space between child elements. The second `div` will center our items and have a gray top border. Finally the `div` that contains the text will have `text-base font-medium text-gray-900`.

```tsx
      <div className='mt-6 space-y-4'>
        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
          <div className='text-base font-medium text-gray-900'>
            Order Total
          </div>
          <Currency value={20} />
        </div>
      </div>
```

Next style the checkout `Button` with `w-full mt-6`. It sets the width of an element to 100% of its parent container, while adding a top margin of 1.5rem.

```tsx
const Summary = () => {
  return (
    <div className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:pt-8'>
      <h2 className='text-lg font-medium text-gray-900'>
        Order Summary
      </h2>

      <div className='mt-6 space-y-4'>
        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
          <div className='text-base font-medium text-gray-900'>
            Order Total
          </div>
          <Currency value={20} />
        </div>
      </div>

      <Button className='w-full mt-6'>
        Checkout
      </Button>
    </div>
  )
}
```

#### Calculate total price of order

To calculate the order total we need to access the state of the cart, in this case we want to use a selector function as an argument to extract the items property of the state, which is an array of Products.

- Add `useSearchParams` to read & update the query string of current URL
- Add `items` from the cart state
- Add `removeAll` action from the cart state

```tsx
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import useCart from '@/hooks/use-cart';

const Summary = () => {
  // URLSearchParams interface to read & update the query string of current URL
  const searchParams = useSearchParams();

  // Get items, an array of products, from cart state
  const items = useCart((state) => state.items);

  // Get removeAll action from the cart state
  const removeAll = useCart((state) => state.removeAll);
```

Next we `reduce` the items by taking the array of items and taking the price and adding it to the `total`.

```tsx
const Summary = () => {
  // ...
  // Calculate the total price of all the items in the cart
  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0);
```

Now use the `totalPrice` and pass it into the `Currency` component's `value` prop.

```tsx
const Summary = () => {
  // ...
  // Calculate the total price of all the items in the cart
  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0);

  return (
    <div className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:pt-8'>
      <h2 className='text-lg font-medium text-gray-900'>
        Order Summary
      </h2>

      <div className='mt-6 space-y-4'>
        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
          <div className='text-base font-medium text-gray-900'>
            Order Total
          </div>
          
          <Currency value={totalPrice} />

        </div>
      </div>

      <Button className='w-full mt-6'>
        Checkout
      </Button>
    </div>
  )
}
```

Now test the cart's order total functionality, check whether the order total is reflected after these changes:

- Add a an item in the cart
- Remove an item in the cart
- Check order total if there are no items in the cart

#### onCheckout function

Next we add the `onCheckout` function handler that will send user to checkout.

We will use `axios` for this. We want to access the `POST` route of the admin dashboard. So to communicate with it we need to use a template string to access our `process.env.NEXT_PUBLIC_API_URL`. WE should also add `/checkout` at the end of that URL to access the checkout route (which will be made later). Then we pass in the data, which is the cart `items` mapped to their `item.id` which is essentially their `productIds`

`ecommerce-store\app\(routes)\cart\components\Summary.tsx`
```tsx
  const onCheckout = async () => {
    // Send a POST request to the admin dashboard checkout, with item data
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds: items.map((item) => item.id),
    });
  }
```

Next we have do something with the `response`, in this case we want to re-route and navigate the user to the `checkout`. The `response` will contain a `URL` inside `response.data.url` which will lead us to the checkout page. We will be using Stripe API to do this.

```tsx
  const onCheckout = async () => {
    // Send a POST request to the admin dashboard checkout, with item data
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds: items.map((item) => item.id),
    });

    // Change the URL of the browser window to the checkout response's URL
    window.location = response.data.url;
  }
```

Finally, assign the `onCheckout` function to the `onClick` prop of the checkout `Button` in the output.

```tsx
const Summary = () => {
  // ...
  const onCheckout = async () => {
    // Send a POST request to the admin dashboard checkout, with item data
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds: items.map((item) => item.id),
    });

    // Change the URL of the browser window to the checkout response's URL
    window.location = response.data.url;
  }

  return (
    <div className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:pt-8'>
      <h2 className='text-lg font-medium text-gray-900'>
        Order Summary
      </h2>

      <div className='mt-6 space-y-4'>
        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
          <div className='text-base font-medium text-gray-900'>
            Order Total
          </div>
          <Currency value={totalPrice} />
        </div>
      </div>

      <Button onClick={onCheckout} className='w-full mt-6'>
        Checkout
      </Button>
    </div>
  )
}
```

##### `window.location` error and `useEffect`

As it stands currently the `Summary` component will throw an error. Why? Let's look at it in its current state:

```tsx
"use client";

// Global Imports
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';

// Local Imports
import Button from '@/components/ui/Button';
import Currency from '@/components/ui/Currency';
import useCart from '@/hooks/use-cart';

const Summary = () => {
  // URLSearchParams interface to read & update the query string of current URL
  const searchParams = useSearchParams();

  // Get items, an array of products, from cart state
  const items = useCart((state) => state.items);

  // Get removeAll action from the cart state
  const removeAll = useCart((state) => state.removeAll);

  // Calculate the total price of all the items in the cart
  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0);


  const onCheckout = async () => {
    // Send a POST request to the admin dashboard checkout, with item data
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds: items.map((item) => item.id),
    });

    // Change the URL of the browser window to the checkout response's URL
    window.location = response.data.url;
  }

  return (
    <div className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:pt-8'>
      <h2 className='text-lg font-medium text-gray-900'>
        Order Summary
      </h2>

      <div className='mt-6 space-y-4'>
        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
          <div className='text-base font-medium text-gray-900'>
            Order Total
          </div>
          <Currency value={totalPrice} />
        </div>
      </div>

      <Button onClick={onCheckout} className='w-full mt-6'>
        Checkout
      </Button>
    </div>
  )
}

export default Summary
```

An error is caused by the use of `window.location`. 

`window` object in JavaScript returns the current URL of the browser window. In our Next.js app, `window.location` is used to access the URL of the current page. However, `window` *is not defined on the server-side, so it should only be used on the client-side*.

`window.location` functions as a way to change the URL of the browwser window to the checkout response's URL when the user clicks on the "Checkout" button. This code will throw an error on the server-side because `window` is not defined.

But the component has a "use client" directive, will it still have the error? Yes, because after the `onCheckout` which navigates to the checkout URL (in this case the Stripe checkout page) it will redirect us back to `Summary` so we still need to address the problem.

- To avoid this error, wrap the code inside a `useEffect` hook which ensures that the code only runs on the client-side.

To do this we:

Add useEffect hook to display success & error messages on checkout

- Add a `useEffect` hook
- Listen to changes in the `searchParams` and `removeAll` variables
- If `searchParams` contains the `success` key, hook displays a success message to the user & removes all products from the cart state using `removeAll` action
- If `searchParams` contains the `canceled` key, the hook displays an error message to the user using the `toast.error` method
- The `onCheckout` function sends a POST reequest to the dashboard with the item data nad retrieves the checkout response's URL
- The `window.location` property is then used to change the URL of the browser window to the checkout response's URL

```tsx
  useEffect(() => {
    // If checkout was successful, notify the user
    if (searchParams.get("success")){
      toast.success("Payment completed.");
      // After a checkout is complete, remove all products from the cart
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);
```

Here is code with similar logic on `useEffect`, just as an example:

```tsx
  useEffect(() => {
    const onCheckoutSuccess = (message: string) => {
      toast.success(message);
      removeAll();
      searchParams.delete('session_id');
    };

    const onCheckoutError = (error: Error) => {
      toast.error(error.message);
    };

    const checkoutSessionId = searchParams.get('session_id');

    if (checkoutSessionId) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/checkout-session?session_id=${checkoutSessionId}`)
        .then((response) => {
          const { data } = response;

          if (data.success) {
            onCheckoutSuccess(data.message);
          } else {
            onCheckoutError(new Error(data.message));
          }
        })
        .catch((error) => {
          onCheckoutError(error);
        });
    }
  }, []);
```

Now let's look at our `Summary` component with our current `useEffect`:

```tsx
"use client";

// Global Imports
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';

// Local Imports
import Button from '@/components/ui/Button';
import Currency from '@/components/ui/Currency';
import useCart from '@/hooks/use-cart';

const Summary = () => {
  // URLSearchParams interface to read & update the query string of current URL
  const searchParams = useSearchParams();

  // Get items, an array of products, from cart state
  const items = useCart((state) => state.items);

  // Get removeAll action from the cart state
  const removeAll = useCart((state) => state.removeAll);

  // Calculate the total price of all the items in the cart
  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0);

  useEffect(() => {
    // If checkout was successful, notify the user
    if (searchParams.get("success")){
      toast.success("Payment completed.");
      // After a checkout is complete, remove all products from the cart
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const onCheckout = async () => {
    // Send a POST request to the admin dashboard checkout, with item data
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds: items.map((item) => item.id),
    });

    // Change the URL of the browser window to the checkout response's URL
    window.location = response.data.url;
  }

  return (
    <div className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:pt-8'>
      <h2 className='text-lg font-medium text-gray-900'>
        Order Summary
      </h2>

      <div className='mt-6 space-y-4'>
        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
          <div className='text-base font-medium text-gray-900'>
            Order Total
          </div>
          <Currency value={totalPrice} />
        </div>
      </div>

      <Button onClick={onCheckout} className='w-full mt-6'>
        Checkout
      </Button>
    </div>
  )
}

export default Summary
```

## Stripe API

In order to finish the checkout we need to create the functionality to communicate with Stripe API which handles the check out process.

- [Stripe API](https://stripe.com/docs/api)

Let's setup our imports. Navigate to the correct project which is `ecommerce-admin`, which contains our dashboard.

```sh
cd ecommerce-admin
```

Now in the correct project locatiton, install stripe:

```sh
npm i stripe
```

With that installed we can now move on to creating the `util` for `Stripe`.

Navigate back to the admin-dashboard project and enter its `lib` folder. Here is the pathname: `ecommerce-admin\lib`.

Inside create a file named: `stripe.ts`.

`ecommerce-admin\lib\stripe.ts`
```ts
import Stripe from "stripe";

export const stripe = new Stripe("YOUR_STRIPE_API_KEY");
```

Go ahead and use your browser to navigate to [Stripe](https://dashboard.stripe.com/) or the link 

```sh
https://dashboard.stripe.com/
```

and register if you don't have an account. Once you have an account go to the top left and click the dropdown menu to create a store for our project. I named it "ecommerce-admin".

Now you can click the `Developers` in the dashboard and find your "Publishable key" and Secret key.

**Your Stripe secret API key is sensitive information!**.

You have to add an environment variable. So navigate to your `.env` file and add a variable named `STRIPE_API_KEY`. Then set it equal to the Stripe secret key you copied from the website.

Your `env` should look something like this:

`ecommerce-admin\.env`
```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=****
CLERK_SECRET_KEY=****

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

DATABASE_URL="mysql://*****"

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="****"

STRIPE_API_KEY=***YOUR_STRIPE_SECRET_KEY_HERE***
```

With that in place we can work on the `stripe.ts` file

```ts
export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2022-11-15",
  typescript: true,
});
```

### Update Stripe apiVersion to the latest

Currently, we have an error when using `apiVersion` to `2022-11-15`.

The error:

```sh
Type '"2022-11-15"' is not assignable to type '"2023-10-16"'.ts(2322)

(property) Stripe.StripeConfig.apiVersion?: "2023-10-16" | undefined

This library's types only reflect the latest API version.

We recommend upgrading your account's API Version to the latest version if you wish to use TypeScript with this library.

If you wish to remain on your account's default API version, you may pass null or another version instead of the latest version, and add a @ts-ignore comment here and anywhere the types differ between API versions.

@docs — https://stripe.com/docs/api/versioning
```

Therefore let's update the API version, in `stripe.ts`:

```ts
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true,
});
```

Now we can finally create the API route for the checkout page.

Navigate to `ecommerce-admin\app\api\[storeId]` and create a new folder named `checkout`, with a file named `route.ts`.

Let's add the following imports:

```ts
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import prismadb from '@/lib/prismadb';
```

Next we have to create a constant named `corsHeaders`, which will be re-used. Why do we need it? Well let's recap CORS (Cross-Origin Resource Sharing).

#### CORS: Cross-Origin Resource Sharing

The current `POST` request as of now won't work. Recall that in `Summary` component:

```tsx
const Summary = () => {
  // ...

  const onCheckout = async () => {
    // Send a POST request to the admin dashboard checkout, with item data
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds: items.map((item) => item.id),
    });
```

We use `axios` inside the front-end store to make a `POST` request to the admin dashboard's checkout route.

However, the issue is that CORS will prevent this because it is on a different origin.

What is CORS?

[Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

- CORS is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources. 

- CORS also relies on a mechanism by which browsers make a "preflight" request to the server hosting the cross-origin resource, in order to check that the server will permit the actual request. In that preflight, the browser sends headers that indicate the HTTP method and headers that will be used in the actual request.

An example of a cross-origin request: the front-end JavaScript code served from `https://domain-a.com` uses `XMLHttpRequest` to make a request for `https://domain-b.com/data.json`.

For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. For example, `XMLHttpRequest` and the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) follow the [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy). This means that a web application using those APIs can only request resources from the same origin the application was loaded from unless the response from other origins includes the right CORS headers.

##### Simple requests

Some requests don't trigger a [CORS preflight](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request). Those are called simple requests from the obsolete [CORS spec](https://www.w3.org/TR/2014/REC-cors-20140116/#terminology), though the [Fetch spec](https://fetch.spec.whatwg.org/) (which now defines CORS) doesn't use that term.

The motivation is that the `<form>` element from HTML 4.0 (which predates cross-site `XMLHttpRequest` and `fetch`) can submit simple requests to any origin, so anyone writing a server must already be protecting against [cross-site request forgery (CSRF)](https://developer.mozilla.org/en-US/docs/Glossary/CSRF). Under this assumption, the server doesn't have to opt-in (by responding to a preflight request) to receive any request that looks like a form submission, since the threat of CSRF is no worse than that of form submission. However, the server still must opt-in using `Access-Control-Allow-Origin` to share the response with the script.

A simple request is one that *meets all the following conditions*:

1. One of the allowed methods:
  - `GET`
  - `HEAD`
  - `POST`

2. Apart from the headers automatically set by the user agent (for example, [Connection](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Connection), [User-Agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent), or [the other headers defined in the Fetch spec as a forbidden header name](https://fetch.spec.whatwg.org/#forbidden-header-name)), the only headers which are allowed to be manually set are those which the Fetch spec defines as a CORS-safelisted request-header, which are:

  - `Accept`
  - `Accept-Language`
  - `Content-Language`
  - `Content-Type` (please note the additional requirements below)
  - `Range` (only with a simple range header value; e.g., bytes=256- or bytes=127-255)

3. The only type/subtype combinations allowed for the [media type](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type) specified in the [Content-Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) header are:

  - `application/x-www-form-urlencoded`
  - `multipart/form-data`
  - `text/plain`

4. If the request is made using an `XMLHttpRequest` object, no event listeners are registered on the object returned by the `XMLHttpRequest.upload` property used in the request; that is, given an `XMLHttpRequest` instance `xhr`, no code has called `xhr.upload.addEventListener()` to add an event listener to monitor the upload.

5. No `ReadableStream` object is used in the request.

## Integrating the front-end with the back-end

So how do we make that POST request from the front-end store to the admin dashboard back-end? 

After making the request through axios we have to remeber that both projects are from a different origin. The admin-dashboard is from localhost:3000 whereas the front-end store is on localhost:3001.

### Configure the CORS policy for Next.js application

So create the `corsHeader` object inside our checkout route, and let's give the object 3 properties.

- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods`
- `Access-Control-Allow-Headers`

These are properties are used to configure the **Cross-Origin Resource Sharing (CORS)** policy for our Next.js application.

`ecommerce-admin\app\api\[storeId]\checkout\route.ts`
```tsx
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import prismadb from '@/lib/prismadb';

// Configure the CORS policy by setting HTTP response headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
```

- The `Access-Control-Allow-Origin` property specifies which domains are allowed to access the resources on the server. The value `*` means that any domain can access the resources

- The `Access-Control-Allow-Methods` property specifies which HTTP methods are allowed to be used for accessing the resources. In this case, the allowed methods are `GET`, `POST`, `PUT`, `DELETE`, and `OPTIONS`

- The `Access-Control-Allow-Headers` property specifies which headers are allowed to be used in the request. In this case, the allowed headers are `Content-Type` and `Authorization`

These headers are sent by the server in response to a preflight request made by the browser to check if the cross-origin request is allowed.

#### Add in OPTIONS request

With the headers set we now need to set the OPTIONS request.

[OPTIONS request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS) is an HTTP method used to describe communication options for a given URL or server. It is a preflight request that is sent by the browser to check if the cross-origin request is allowed.

When a browser sends an OPTIONS request, it is asking the server to provide information about the allowed methods, headers, and other options that can be used to access the resources on the server. The server responds with an HTTP response that contains the allowed methods, headers, and other options.

The OPTIONS request is part of the Cross-Origin Resource Sharing (CORS) mechanism that allows web servers to specify which origins are allowed to access the resources on their server, and which methods are allowed to be used for accessing those resources.

- Create an `async` function named `OPTIONS` that returns a JSON response with an empty object and the headers specified in the `corsHeaders` object.

- We have to do the OPTIONS request *before* we do the POST request

`ecommerce-admin\app\api\[storeId]\checkout\route.ts`
```ts
// Configure the CORS policy by setting HTTP response headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
```
#### Create the POST request

Now take a step back and see what type of request the front-end is trying to make.

In `Summary.tsx`, we send a `POST` request in the `onCheckout` handler:

`ecommerce-store\app\(routes)\cart\components\Summary.tsx`
```tsx
  const onCheckout = async () => {
    // Send a POST request to the admin dashboard checkout, with item data
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds: items.map((item) => item.id),
    });
```

The object we pass in to the POST request contains `productIds` which is a mapping of each cart item to their product id. `productIds` uses `map()` which applies a callback function to every element of an array and returns a new array with the results. The result is a new array that contains the transformed elements of the original array.

So extract the `productIds` from the request in JSON format inside our `POST` function:

`ecommerce-admin\app\api\[storeId]\checkout\route.ts`
```ts
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { productIds } = await req.json();
}
```

Next check the request if it contains our data, whether `productIds` is falsy or its length is 0.

```ts
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { productIds } = await req.json();

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product IDs are required", { status: 400 });
  }
}
```

Next we want to find all the products given an id using Prisma with the `findMany` method of the Prisma client. This method allows us to query multiple records from a table based on a condition such as matching an id or a list of ids.

```ts
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { productIds } = await req.json();

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product IDs are required", { status: 400 });
  }

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });
}
```

##### Adding Line Items for the checkout session

Next create an empty array named `line_items` that will store the line items for the Stripe Checkout session.

Here are the docs on [Stripe API - Line Item](https://stripe.com/docs/api/checkout/sessions/create#create_checkout_session-line_items).

A [Stripe seesion](https://stripe.com/docs/api/checkout/sessions/create) requires `line_items` which is an array of objects.

> A list of items the customer is purchasing. Use this parameter to pass one-time or recurring Prices.

A line item is an object that represents a product or service that the customer is purchasing, along with its quantity, price and other details. 

Therefore the `line_items` array will be populated with the products that are fetched from the Prisma database using the `productIds` parameter.

The `line_items` array will then be used to create the checkout session using the Stripe API.

```ts
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { productIds } = await req.json();

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product IDs are required", { status: 400 });
  }

  // Fetch products by IDs in checkout route
  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });

  // Create an array of line items which represents a product that customer is purchasing
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

}
```

Next populate the array of `line_items` by converting each product to a line item.

```ts
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { productIds } = await req.json();

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product IDs are required", { status: 400 });
  }

  // Fetch products by IDs in checkout route
  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });

  // Create an array of line items which represents a product that customer is purchasing
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  // Populate the array with each product
  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'USD',
        product_data: {
          name: product.name,
        },
        unit_amount: product.price.toNumber() * 100
      }
    });
  });

}
```

Next we want to create an `Order` in our prisma database.

Recall the models for `Order` and `OrderItem`:

`ecommerce-admin\prisma\schema.prisma`
```prisma
model Order {
  id         String    @id @default(uuid())
  storeId    String
  store      Store @relation("StoreToOrder", fields: [storeId], references: [id])
  orderItems OrderItem[]
  isPaid     Boolean
  phone      String    @default("")
  address    String    @default("")
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt

  // Manually add index on relation scalar fields
  @@index([storeId])
}

model OrderItem {
  id        String  @id @default(uuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id])
  productId String
  product   Product @relation(fields: [productId], references: [id])

  // Manually add index on relation scalar fields
  @@index([orderId])
  @@index([productId])
}
```

Now back to the checkout route's `POST` method.

- use `prismadb.order.create()` to create an `Order` in our database
- pass in `data` which contains `{ storeId, isPaid, orderItems}`
  - `storeId` is the `params.storeId`
  - `isPaid` is false because the `Order` has not been fulfilled yet, we are still in the checkout session
  - `orderItems` is a field that represeents the one-to-many relation between `order` and `orderItem` models. It allows us to create multiple `orderItem` records that are linked to the `order` record in one query

We will be mapping an array of productIds to an array of objects that contain a `product` field.

For each `productId`, create an `OrderItem` that references a product by its ID.

- [prisma client - relation queries - connect multiple records](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries#connect-multiple-records)

- [prisma client - relation queries - connect a single record](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries#connect-a-single-record)

Use `connect` method in PrismaDB to link an existing record to a relation field.
  - Associate each `orderItem` with a product by its ID
  - `orderItem` model has a one-to-one relation with the `product` model

```ts
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { productIds } = await req.json();

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product IDs are required", { status: 400 });
  }

  // Fetch products by IDs in checkout route
  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });

  // Create an array of line items which represents a product that customer is purchasing
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  // Populate the array with each product
  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'USD',
        product_data: {
          name: product.name,
        },
        unit_amount: product.price.toNumber() * 100
      }
    });
  });

  // Create the order in the database
  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId
            }
          }
        }))
      }
    }
  })

}
```

### Create checkout session from products in checkout route.

- [Sessions | Stripe API Reference](https://stripe.com/docs/api/checkout/sessions)
- [Create a Session | Stripe API Reference](https://stripe.com/docs/api/checkout/sessions/create)
- [How Checkout works | Stripe Documentation](https://stripe.com/docs/payments/checkout/how-checkout-works)

Stripe checkout sessions are a way to create and manage payments or subscriptions using Stripe's hosted payment page. A checkout session represents your customer's session as they pay for one-time purchases or subscriptions. You can create a checkout session on your server and redirect to its URL to begin checkout. After the payment is successful, you can use a webhook to fulfill the order using the checkout.session.completed event.

Some of the parameters you can use to create a checkout session are:

- `client_reference_id`: A unique string to reference the checkout session. This can be a customer ID, a cart ID, or similar, and can be used to reconcile the session with your internal systems.
- `currency`: The currency of the payment. Must be a supported currency.
- `customer`: The ID of an existing customer, if one exists. This will prefill the customer's email, name, card details, and billing address on the checkout page.
- `customer_email`: The email of the customer, if known. This will prefill the customer's email on the checkout page.
- `line_items`: A list of items the customer is purchasing. You can use this parameter to pass one-time or recurring prices.
- `adjustable_quantity`: A configuration for the item's quantity to be adjusted by the customer during checkout.

Use `create()` method from `stripe.checkout.sessions` and pass in an object that contains `line_items` as a property.

```ts
import Stripe from 'stripe';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  // ...

  // Use line items to create the checkout session using Stripe API
  const session = await stripe.checkout.sessions.create({
    line_items,
  });
}
```

Look at the list of paraemeters in the [create a session reference](https://stripe.com/docs/api/checkout/sessions/create). The required ones are:

- `line_items`, a list of items the customer is purchasing. Use this parameter to pass one-time or recurring Prices

- `mode`, an `enum`, is the mode of the Checkout Session. Pass subscription if the Checkout Session includes at least one recurring item. The possible enum values:
  - `payment`
  - `setup`
  - `subscription`

The parameters that are required conditionally:
  
- `currency`
- `return_url`, the URL to redirect your customer back to after they authenticate or cancel their payment on the payment method’s app or site. 
- `success_url`, the URL to which Stripe should send customers when payment or setup is complete.
- `cancel_url`, if set, Checkout displays a back button and customers will be directed to this URL if they decide to cancel payment and return to your website.

Some extra parameters that's interesting are:

- `phone_number_collection`, controls phone number collection settings for the session.
- `shipping_address_collection`, when set, provides configuration for Checkout to collect a shipping address from a customer.

So let's add these properties to our checkout session:

```ts
import Stripe from 'stripe';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  // ...
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true
    },
    success_url: ''
  });
}
```

For the `success_url`, we need to create an environment variable. In the `.env` file create a variable named `FRONTEND_STORE_URL` and set it equal to `http://localhost:3001` or the URL for the front-end store is hosted on.

With that we can set the `success_url` through the environment variable in the `/cart` route while adding a query string.

A query string is a set of key-value pairs that provide additional information to the server, such as parameters, filters, or search terms.

The question mark indicates the start of the query string, and the equal sign separates each key from its value.

We want to have a query string of "success=1" where the key is success with a value of 1. This indicates that the customer will be redirected to the cart page with a success flag.

We can use this flag to show a thank you message or any other relevant content to the customer.

```ts
import Stripe from 'stripe';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  // ...
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`
  });
}
```

Let's also add the `cancel_url` property to the checkout session,

```ts
import Stripe from 'stripe';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  // ...
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
  });
}
```

Navigate back to `ecommerce-store\app\(routes)\cart\components\Summary.tsx`, the front-end store's Summary component to see how these URLs work. Take a look at the `useEffect` hook:

```tsx
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';

const Summary = () => {

  // URLSearchParams interface to read & update the query string of current URL
  const searchParams = useSearchParams();

  // Get removeAll action from the cart state
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    // If checkout was successful, notify the user
    if (searchParams.get("success")){
      toast.success("Payment completed.");
      // After a checkout is complete, remove all products from the cart
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  // ...
}
```

The `success_url` will redirect to the `toast.success()` inside the `useEffect`, whereas the `cancel_url` will redirect to `toast.error()`.

#### metadata in checkout session

Let's also add the `metadata` property, which will be used after the webhook. Once the user has paid, we are going to load this exact checkout session, use the `metadata` to find the `order` that was created. Then change the status of the `order` to `paid`.

```ts
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id
    }
  });
```

Now let's send back the response with `Next.Response` in json format. Make sure to pass in the `session.url `inside on object as the first parameter and for the second parameter an object containing the key-value pair of `headers: corsHeaders`.

Now the `POST` method in checkout route:

```ts
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { productIds } = await req.json();

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product IDs are required", { status: 400 });
  }

  // Fetch products by IDs in checkout route
  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });

  // Create an array of line items which represents a product that customer is purchasing
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  // Populate the array with each product
  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'USD',
        product_data: {
          name: product.name,
        },
        unit_amount: product.price.toNumber() * 100
      }
    });
  });

  // Create the order in the database
  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId
            }
          }
        }))
      }
    }
  });

  // Use line items to create the checkout session using Stripe API
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id
    }
  });

  return NextResponse.json({ url: session.url}, { headers: corsHeaders });
}
```

Add checkout functionality for store

- Use Stripe API to create checkout sessions with line items from products
- Use prismadb to fetch products and create orders
- Handle CORS and error cases
- Add various properties to the checkout session
- Include metadata that tracks the order ID

#### Testing the checkout functionality

Now we can test this by now placing a product in our cart.

- Clicking the product `Summary` or Shopping Cart to arrive at the checkout page.
- Open up the network tab in developer tools
- Clicking the checkout button on the checkout page
- Redirected to the checkout session page
- Do not fill out anything yet on the checkout session page
- An order is created in the database

Now we have to check the `admin-dashboard` and see under the `Orders` tab if an order was created in the store.

- In the `Orders` `DataTable` we should see the product that the customer plans to purchase, along with the total price and the `Paid` flag that is `false` currently.

For now in the checkout session page we can click the `Back` button and it should bring us back to the `Shopping Cart` page.

We should get an error, a toast message saying "Something went wrong" because we canceled the order.

This is the result we want so far, an unpaid order. 

We now need to create the webhook which will observe when the customer has paid the order.

#### Webhooks

A webhook is a way for one web application to send data to another web application when a certain event happens. For example, you can use a webhook to notify your email service when someone signs up on your website. A webhook usually consists of a URL and a payload, which is the data that is sent with the request.

- [Webhook](https://en.wikipedia.org/wiki/Webhook)

- A webhook in web development is a method of augmenting or altering the behavior of a web page or web application with custom callbacks. These callbacks may be maintained, modified, and managed by third-party users and developers who may not necessarily be affiliated with the originating website or application.

- Webhooks are "user-defined HTTP callbacks". They are usually triggered by some event, such as pushing code to a repository, a comment being posted to a blog, etc. When that event occurs, the source site makes an HTTP request to the URL configured for the webhook. Users can configure them to cause events on one site to invoke behavior on another.

- Common uses are to trigger builds with continuous integration systems, or to notify bug tracking systems. Because webhooks use HTTP, they can be integrated into web services without adding new infrastructure.

##### Connect to webhook locally using Stripe

- [Webhook endpoints | Stripe API reference](https://stripe.com/docs/api/webhook_endpoints/object)

Because we are not in production right now, we have to connect to a webhook locally. We can set this up by configuring a webhook endpoint via the API or configure webhooks from the dashboards, which provides a UI for registering and testing your webhook endpoints.

Access the stripe website and sign-in, click the `Developers` tab, and click the `Webhooks` tab.

In production we will click "Add an endpoint", but since we are testing a webhook locally we click the "Test in a local environment" button.

Install the `Stripe CLI` and open up the terminal.

- Make sure to navigate the the `admin-dashboard` nextjs project, in the directory: `/ecommerce-admin`

Follow the instructions on Stripe Dashboard > Webhooks > Test in a local environment.

1. Listen to Stripe events

- Open up your respective OS terminal and login through the Stripe CLI

```sh
stripe login
```

- Allow Stripe CLI to access acount information with the same code

2. Forward events to your webhook

```sh
stripe listen --forward-to localhost:3000/webhook
```

And here we get the **webhook signing secret** from our command line interface.

Copy that key we get to create our webhook.

Then add the webhook signing secret as an environment variable. Inside the `.env` file, add the variable named `STRIPE_WEBHOOK_SECRET` and set it equal to the key you copied.

```env
//...

STRIPE_WEBHOOK_SECRET=YOUR_WEBHOOK_SIGNING_SECRET_KEY_HERE
```

3. Trigger events with the CLI

```sh
stripe trigger
```

With our **stripe webhook signing secret** we got from step 2, we can create our webhook.

### Develop the Webhook

[Handle verification outcomes | Stripe Reference](https://stripe.com/docs/identity/handle-verification-outcomes)

Navigate to our `ecommerce-admin` dashboard project inside the directory `ecommerce-admin\app\api`.

Now create the following folder and file: `ecommerce-admin\app\api\webhook\route.ts`.

1. Add the following imports:

`ecommerce-admin\app\api\webhook\route.ts`
```ts
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import prismadb from '@/lib/prismadb';
```

2. Create the `POST` function that extracts `body` from the request `req.text()`. Note because this is a web hook it is a special case such that we need to do `req.text()` rather than `req.json()`.

```ts
export async function POST(req: Request) {
  const body = await req.text();
}
```

3. Access the HTTP headers of the incoming request from a server component in Next.js using `headers()`. Then save it to a variable named `signature`.

We need to add another import: `headers` from `next/headers`. Then inside the `POST` function we can extract the `signature` from `Stripe-Signature` using `headers()`. This `signature` should be of a type string, so we will use [type assertions, or the 'as type' syntax](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions).

```ts
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
}
```

- Import the Stripe module, which is a library for interacting with the Stripe API
- Import the NextResponse type from the next/server module, which is a utility for creating server-side responses in Next.js
- Import the headers function from next/headers which allows you to access the HTTP headers of the incoming request from a server component in Next.js
- It imports the stripe and prismadb objects from the local files @/lib/stripe and @/lib/, which are wrappers for the Stripe and Prisma clients respectively.
- awaits the text() method of the Request object, which returns a Promise that resolves to the body of the request as a string, and assigns it to the body variable.
- Finally, the signature variable in the code is used to get the value of the Stripe-Signature header from the incoming request. 

This header is generated by Stripe when it sends a webhook event to your endpoint, and it contains a timestamp and a signature that you can use to verify the authenticity and integrity of the event. 

To do this, you need to pass the signature, along with the raw body of the request and your webhook secret, to the stripe.webhooks.constructEvent function. This function will either return the event object or throw an error if the verification fails.

4. Declare an `event` variable which is a type of `Stripe.Event`. Then open a `try..catch` block, where we assign the result of `stripe.webhooks.constructEvent` to event. Pass in `body`, `signature`, and `process.env.STRIPE_WEBHOOK_SECRET`. Meanwhile in the catch, return a `NextResponse` status 400 while printing the error message. Note that `process.env.STRIPE_WEBHOOK_SECRET!` has an `!` at the end to fix the typescript error.

  - The ! operator in TypeScript is called the non-null assertion operator. It is used to assert that a value is not null or undefined when the type checker cannot infer that fact. 

On a high-level, this allows us to verify that the event came from Stripe.

See [Handle Verification Outcomes - create webhook | Stripe Reference](https://stripe.com/docs/identity/handle-verification-outcomes#create-webhook)

```ts
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  const body = await req.text();

  // Verify the event came from Stripe
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    // On error, log and return the error message
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // Successfully constructed event
}
```

With `constructEvent` we now can:

- Verify stripe event signature in webhook endpoint

#### Create stripe checkout session in POST route

Next after successfully constructing the event, create a variable `session` casted to a `Stripe.Checkout.Session` type. `session` will have the properties and methods of a Stripe checkout session object, such as `{ id, customer, line_items, cuurrency, etc... }`.

```ts
export async function POST(req: Request) {
  const body = await req.text();

  // Verify the event came from Stripe
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    // On error, log and return the error message
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // Successfully constructed event

  // Save the event as a Stripe checkout session
  const session = event.data.object as Stripe.Checkout.Session;

}
```

Create and save Stripe checkout session from webhook event

- Handle the POST request from Stripe and verify the webhook signature
- Use the stripe.webhooks.constructEvent method to parse the event
- Cast the event data object as a Stripe.Checkout.Session type
- Save the session in the database or use it for further processing

Recall that in our checkout route we created a session:

`ecommerce-admin\app\api\[storeId]\checkout\route.ts`
```ts
  // Use line items to create the checkout session using Stripe API
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id
    }
  });
```

- [Session object | Stripe API Reference](https://stripe.com/docs/api/checkout/sessions)

A Checkout Session represents your customer's session as they pay for one-time purchases or subscriptions through Checkout or Payment Links.

**Once payment is successful, the Checkout Session will contain a reference to the Customer**, and either the successful PaymentIntent or an active Subscription.

You can create a Checkout Session on your server and redirect to its URL to begin Checkout.

- [Customer object | Stripe API Reference](https://stripe.com/docs/api/customers)

This object represents a customer of your business. Use it to create recurring charges and track payments that belong to the same customer.

Now how do we access this customer information inside our webhook? We use the `customer_details` object, which is the customer details including the customer's tax exempt status and the customer's tax IDs. Only the customer's email is present on Sessions in setup mode.

- [Session object - customer_details | Stripe API Reference](https://stripe.com/docs/api/checkout/sessions/object#checkout_session_object-customer_details)

The `customer_details` object has the properties: `{ address, email, name, phone, tax_exempt }`.

Get customer address from checkout session

- Use the optional chaining operator to access the address property
- Check if the session is in payment mode and has customer details
- Use the address for shipping or billing purposes

```ts
export async function POST(req: Request) {
  const body = await req.text();

  // Verify the event came from Stripe
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    // On error, log and return the error message
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // Successfully constructed event

  // Save the event as a Stripe checkout session
  const session = event.data.object as Stripe.Checkout.Session;
  
  // Get the customer's address from the checkout session using customer details
  const address = session?.customer_details?.address;
}
```

##### Consolidate payment field properties to a single string

Now if we look at the actual Stripe checkout session, we can see a payment form with the following form fields:

- Contact Information
  - Email
  - Phone number
- Card Information
  - Card number
  - MM/YY & CVC
- Name on card
- Billing address
  - Country
  - Address line 1
  - Address line 2
  - Postal Code
  - City
- Checkbox to save information for 1-click checkout

Each of these are separate fields in an object. So we need to create a function that will consolidate each of these properties to a single string.

We will focus on the address and its many child attributes. The [checkout session's customer_details](https://stripe.com/docs/api/checkout/sessions/object#checkout_session_object-customer_details) has a child attribute `customer_details.address`.

`customer_details.address` itself has its own child attributes such as `{ city, country, line1, line2, postal_code, state }`. This means we can access the "address line 1" that the customer filled out in the payment form during the checkout session.

We are going to create a `const` named `addressAttributes` which is an array that contains each of these child attributes. Make sure to use [optional chaining | MDN reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) because some of these attributes are optional and the customer may not have filled them out during the checkout session.

`ecommerce-admin\app\api\webhook\route.ts`
```ts
export async function POST(req: Request) {
  const body = await req.text();

  // Verify the event came from Stripe
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    // On error, log and return the error message
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // Successfully constructed event

  // Save the event as a Stripe checkout session
  const session = event.data.object as Stripe.Checkout.Session;
  
  // Extract address from the checkout session using customer details
  const address = session?.customer_details?.address;

  // Extract customer's shipping address details after a checkout session
  const addressAttributes = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

}
```

Extract customer address from Stripe checkout session

Use the customer_details object from the Stripe checkout session to
create an array of address attributes. This array can be used to access
or display the customer's shipping address after a successful payment.

Next we need to create the function that consolidates all of these attributes to a single `addressString` to display it in a readable format.

Create address string from address attributes

Use the filter and join methods to consolidate the address attributes
array into a single string. This string can be used to display the
customer's shipping address in a readable format.

```ts
export async function POST(req: Request) {
  const body = await req.text();

  // Verify the event came from Stripe
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    // On error, log and return the error message
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // Successfully constructed event

  // Save the event as a Stripe checkout session
  const session = event.data.object as Stripe.Checkout.Session;
  
  // Extract address from the checkout session using customer details
  const address = session?.customer_details?.address;

  // Extract customer's shipping address details after a checkout session
  const addressAttributes = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  // Consolidate each property of address to a single string
  const addressString = addressAttributes
    .filter((attribute) => attribute !== null)
    .join(', ');

}
```

#####  Use webhook to check for payment events

A **Stripe webhook** is an HTTP endpoint that receives events from Stripe. Webhooks allow you to be notified about payment events that happen in the real world outside of your payment flow, such as successful payments, disputed payments, or available balance. You can use webhooks to trigger actions on your server, such as sending a confirmation email, updating a database, or scheduling a shipment.

A **Stripe event** is an object that represents a change or activity in your Stripe account. When an event occurs, Stripe generates a new Event object and sends it to your webhook endpoint as part of a POST request. The Event object contains information about the type of event, the data object that was modified, and the previous attributes of the object, if applicable. You can use the event type and the data object to determine what processing your application needs to perform.

In this case, our webhook will check for the Stripe event that the customer has paid the order. 

- [Webhooks | Stripe API](https://stripe.com/docs/webhooks)

To enable webhook events, you need to register webhook endpoints. 

After you register them, Stripe can push real-time event data to your application’s webhook endpoint when events happen in your Stripe account. 

Stripe uses HTTPS to send webhook events to your app as a JSON payload that includes an [Event object](https://stripe.com/docs/api/events).

Stripe generates event data that we can send you to inform you of activity in your account. When an event occurs, Stripe generates a new Event object.

By registering webhook endpoints in your Stripe account, you enable Stripe to automatically send Event objects as part of POST requests to the registered webhook endpoint hosted by your application. After your webhook endpoint receives the Event, your app can run backend actions (for example, calling your shipping provider’s APIs to schedule a shipment after you receive a payment_intent.succeded event).

The Event object we send to your webhook endpoint provides a snapshot of the object that changed. They might include a previous_attributes property that indicates the change, when applicable.

See the [full list of event types](https://stripe.com/docs/api/events/types) that we send to your webhook.

As we can see in the reference of event types, we can check for many events that Stripe sends. They follow the pattern: `resource.event`. Some event types include:

- `payment_intent.succeeded`
- `payment_method.attached`
- `charge.failed`
- `charge.succeeded`
- `invoice.payment_action_required`
- `payout.paid`
- `checkout.session.async_payment_failed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.completed`

The event will listen to for now will be [checkout.session.completed](https://stripe.com/docs/api/events/types#event_types-checkout.session.completed).

In the case that the event is the type `checkout.session.completed`, we want to use the webhook to trigger an action on our seerver. In this case, we want to update the database and schedule a shipment.

Recall during the checkout API route, we create an `order` in the database.

`ecommerce-admin\app\api\[storeId]\checkout\route.ts`
```ts
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { productIds } = await req.json();

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product IDs are required", { status: 400 });
  }

  // Fetch products by IDs in checkout route
  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });

  // Create an array of line items which represents a product that customer is purchasing
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  // Populate the array with each product
  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'USD',
        product_data: {
          name: product.name,
        },
        unit_amount: product.price.toNumber() * 100
      }
    });
  });

  // Create the order in the database
  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId
            }
          }
        }))
      }
    }
  });

  // Use line items to create the checkout session using Stripe API
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id
    }
  });

  return NextResponse.json({ url: session.url}, { headers: corsHeaders });
}
```

#####  Use webhook to check for payment events part 2

Notice when we created the `session` with line items, we also included the `metadata` an object that contains the `orderId`. The reason for this is so we can access the `metadata` in the webhook in order to find the `order` in the database.

We want to update the `order` in our database, so we `prismadb.order.update()` and set the `isPaid` property to `true`. We also update the address using the address string we created. Make sure to use the `session` object which stores many details from the `orderId` to the `customer_details` which have the child attributes `address, email, name, phone, tax_exempt`.

Navigate back to the `route.ts` webhook and do the following:

Update order status and address on payment success

Use the checkout.session.completed event from Stripe to update the order
status and address in the database. Use the customer_details object from
the checkout session to create a string of the customer's shipping
address. This string can be used to display the address in a readable
format.

`ecommerce-admin\app\api\webhook\route.ts`
```ts
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  const body = await req.text();

  // Verify the event came from Stripe
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    // On error, log and return the error message
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // Successfully constructed event

  // Save the event as a Stripe checkout session
  const session = event.data.object as Stripe.Checkout.Session;
  
  // Extract address from the checkout session using customer details
  const address = session?.customer_details?.address;

  // Extract customer's shipping address details after a checkout session
  const addressAttributes = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  // Consolidate each property of address to a single string
  const addressString = addressAttributes
    .filter((attribute) => attribute !== null)
    .join(', ');


  // Check for successful payment event, if so then update the order status
  if (event.type === "checkout.session.completed") {
    const order = await prismadb.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || ''
      },
      include: {
        orderItems: true,
      }
    });
  }
}
```

The `if` statement looks at the stripe event type and checks if it is `checkout.session.completed`, which implies a successful payment event.

In that case, we want to get the `order` in the database using its `orderId`. Update its `data` properties of `isPaid` flag to `true`, set the `address` to `addressString` and save the `phone` to that of the customer's `phone`. We should also include `orderItems` related records because they will be modified later.

```ts
export async function POST(req: Request) {
  // ...
  // Check for successful payment event, if so then update the order status
  if (event.type === "checkout.session.completed") {
    const order = await prismadb.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || ''
      },
      include: {
        orderItems: true,
      }
    });
  }
```

Update webhook handler to use metadata for orderId

- Use checkout sessions metadata to access the orderId, to be able to access the order record in the database.
- Update order status and address on payment success
- Use session customer_details property to update the customer's phone number

Next we want to remove the ordered products from the inventory. To do this we set the archive property of each product to `true`.

We want to map `orderItems` into their respective `productId` and store it in a `const productIds`. Next we use `prismadb.product.updateMany` to update their `isArchived` flag to `true`.

Add code to remove ordered products from inventory.

First we want to map each `orderItems` to their respective `productId` which will return an array of `productIds`.

```ts
export async function POST(req: Request) {
  // ...
  // Check for successful payment event, if so then update the order status
  if (event.type === "checkout.session.completed") {
    const order = await prismadb.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || ''
      },
      include: {
        orderItems: true,
      }
    });

    // Archive the ordered products from the inventory
    const productIds = order.orderItems.map((orderItem) => orderItem.productId);
  }
```

Next, we create the [query to update multiple records](https://www.prisma.io/docs/orm/prisma-client/queries/crud#update-multiple-records). We use the array of `productIds`, so for each ordered product in the database we set the `isArchived` flag to `true`.

Add code to archive ordered products in inventory.

- This code prevents selling products that are no longer available
- It also updates the product database with the latest isArchived status

```ts
export async function POST(req: Request) {
  // ...
  // Check for successful payment event, if so then update the order status
  if (event.type === "checkout.session.completed") {
    const order = await prismadb.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || ''
      },
      include: {
        orderItems: true,
      }
    });

    // Archive the ordered products from the inventory
    const productIds = order.orderItems.map((orderItem) => orderItem.productId);

    await prismadb.product.updateMany({
      where: {
        id: {
          in: [...productIds],
        },
      },
      data: {
        isArchived: true,
      },
    });
  }
```

Update database to mark the ordered products as archived.

Archive ordered products in DB.

- This prevents selling products that are no longer available
- Also prevents selling out-of-stock products
- It also updates the product status in the database

Finally after all is done, we return a NextResponse of 200 with a null body inside the POST request.

```ts
export async function POST(req: Request) {
  // ...
  // Return a response with a status code of 200 and a null body
  return new NextResponse(null, { status: 200 });
}
```

Let's all add more descriptive comments to each section:

`ecommerce-admin\app\api\webhook\route.ts`
```ts
import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

/**
 * Handles a POST request from a Stripe webhook and updates the order and 
 * product data accordingly.
 * @param req - the POST request
 * @returns A NextResponse object with a status code of 200 if successful, or 400
 *          if an error occurs
 */
export async function POST(req: Request) {
  // Get the request body as a string
  const body = await req.text();

  // Verify the event came from Stripe
  // Get signature from the request headers
  const signature = headers().get("Stripe-Signature") as string;

  // Declare a variable to store the Stripe event
  let event: Stripe.Event;

  try {
    // Construct the event from the body, signature, and webhook secret
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    // On error, return a response with the error message and a status code of 400
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // If the event is successfully constructed, get the checkout session 
  // object from the event data
  const session = event.data.object as Stripe.Checkout.Session;

  // Get the customer address from the session object, if it exists
  const address = session?.customer_details?.address;

  // Extract customer's shipping address details after a checkout session
  const addressAttributes = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  // Consolidate each property of address to a single string
  // Filter out any null values and join the remaining attributes with commas
  const addressString = addressAttributes
    .filter((attribute) => attribute !== null)
    .join(", ");

  // Check for successful payment event, if so then update the order status
  if (event.type === "checkout.session.completed") {
    // Update the order record in the database with the payment status, 
    // address, and phone number
    const order = await prismadb.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || "",
      },
      include: {
        orderItems: true,
      },
    });

    // Get the product IDs from the order items
    const productIds = order.orderItems.map(
      (orderItem) => orderItem.productId
    );

    // Archive the ordered products from the database by setting the isArchived field to true
    await prismadb.product.updateMany({
      where: {
        id: {
          in: [...productIds],
        },
      },
      data: {
        isArchived: true,
      },
    });
  }

  // Return a response with a status code of 200 and a null body
  return new NextResponse(null, { status: 200 });
}
```

Handle Stripe webhook and update order and product data

- Use stripe.webhooks.constructEvent to verify the webhook signature and get the checkout session object. 
- Update the order record with the payment status, address, and phone number. 
- Archive the ordered products from the database by setting the isArchived field to true.  
- Return a NextResponse object with a status code of 200 if successful, or 400 if an error occurs.
- Add descriptive comments that explain the purpose and functionality of the POST method in detail

##### Connect to webhook locally using Stripe - final part

With the webhook completed, we can move on to step 3 on connect to webhook locally.

- [Webhook endpoints | Stripe API reference](https://stripe.com/docs/api/webhook_endpoints/object)

1. Listen to Stripe events

- Open up your respective OS terminal and login through the Stripe CLI

```sh
stripe login
```

- Allow Stripe CLI to access acount information with the same code

2. Forward events to your webhook

```sh
stripe listen --forward-to localhost:3000/webhook
```

And here we get the **webhook signing secret** from our command line interface.

Copy that key we get to create our webhook.

Then add the webhook signing secret as an environment variable. Inside the `.env` file, add the variable named `STRIPE_WEBHOOK_SECRET` and set it equal to the key you copied.

```env
//...

STRIPE_WEBHOOK_SECRET=YOUR_WEBHOOK_SIGNING_SECRET_KEY_HERE
```

3. Trigger events with the CLI

```sh
stripe trigger payment_intent.succeeded
```

Back on the terminal with Stripe CLI, run the above command: `stripe trigger payment_intent.succeeded`.

### Testing the Webhook

After the `stripe trigger payment_intent.succeeeded`, it seems that we get a [401] POST from the terminal.

#### Issue: `[401]` POST after running `stripe trigger` command

We get a [401 Unauthorized](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401) which is a esponse status code indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource.

#### Solution: `[401]` POST after running `stripe trigger` command

After some debugging, backtracking and stack tracing the issue of the `[401]` after running `stripe trigger` comes down to webhook endpoint.

**An endpoint is a digital location where an API receives requests about a specific resource on its server**. In APIs, an endpoint is typically a uniform resource locator (URL) that provides the location of a resource on the server. 

- [What is an API Endpoint? | blog.hubspot.com](https://blog.hubspot.com/website/api-endpoint)

For example, if you want to access the latest news articles from a news site's API, you would use an endpoint URL like `https://newsapi.org/v2/top-headlines`. This URL tells the API that you want the top headlines resource from its server.

Another example is a way to get videos through YouTube’s API is by requesting them from the endpoint `https://www.googleapis.com/youtube/v3/videos`, which returns a list of videos that match the parameters you specified in your request.

In our case what is our API endpoint? Well we specified it in step 2 of connecting to webhook locally, when we forward events to our webhook:

```sh
stripe listen --forward-to localhost:3000/webhook
```

Notice the issue?

**We are running on `localhost:3000/webhook`**, when we *should* be running on the `localhost:3000/api/webhook`.

Now let's redo the steps again, but this time with the correct endpoint.

1. Listen to Stripe events

```sh
stripe login
```

2. Forward events to your webhook

```sh
stripe listen --forward-to localhost:3000/api/webhook
```

3. Trigger events with the CLI

```sh
stripe trigger payment_intent.succeeded
```

With that we get a proper 200 response after we trigger the event with the CLI.

Now we can move on to another test. 

- Add a product to the cart
- Proceed to the checkout session
- Fill out the payment form (in Test Mode, we can write anything)
- Check the dashboard's Order page to see if the phone number, address, and paid flag has been updated

Does the flow from front-end store, to Stripe API, to back-end dashboard all reflect the changes in data? If yes, then we have completed integrating the front-end with the back-end.

For an in-depth walkthrough see the section on [Test: Submit an Order](#test-submit-an-order).

# Develop the Dashboard Overview page

Navigate to `ecommerce-admin\app\(dashboard)\[storeId]\(routes)\page.tsx`, which we have so far:

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

Remove the `store` query for now and clear out the output to start fresh. Then render the following:

- `div` with `flex-col`
- inner `div` with `flex-1 space-y-4 p-8 pt-6`
- Inside the 2nd `div` a `Heading` and `Separator` component
  - `Heading` has a `title` prop of `Dashboard` and a `description` prop

Update the dashboard page component for each store

- Render the dashboard page for a given store ID
- Use prismadb to fetch the store data 
- Display store data using Heading and Separator components

`ecommerce-admin\app\(dashboard)\[storeId]\(routes)\page.tsx`
```tsx
// Global Imports
import React from 'react';

// Local Imports
import prismadb from '@/lib/prismadb';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

interface DashboardPageProps {
  params: { storeId: string }
};

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <Heading title='Dashboard' description='Overview of your store' />
        <Separator />
        
      </div>
    </div>
  );
}

export default DashboardPage;
```

## Add `Card` components to Dashboard Overview Page

Next install [shadcn/ui - Card](https://ui.shadcn.com/docs/components/card) component.

```sh
npx shadcn-ui@latest add card
```

Then after the `Separator` a `div` with `grid gap-4 grid-cols-3`.

Then we use the `Card` component, with a `CardHeader` and a `CardTitle` within.

`CardHeader` will be a flexible container set in the horizontal direction while centering the items. It also has `justify-between`, `space-y-0` and `pb-2`.

`CardTitle` will have `text-sm font-medium` and have the text "Total Revenue".

Finally, outside of `CardTitle` but still inside the `CardHeader` we will render an icon `DollarSign` from `lucide-react`.

```tsx
import { DollarSign } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <Heading title='Dashboard' description='Overview of your store' />
        <Separator />

        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Revenue
              </CardTitle>
              <DollarSign />
            </CardHeader>
          </Card>
        </div>

      </div>
    </div>
  );
}
```

Also give the `DollarSign` a `className='h-4 w-4 text-muted-foreground'`.

After the `CardHeader`, we add the `CardContent` component that contains a `div` of `text-2xl font-bold`. We intepolate the revenue data here, but for now we will use the number '100'. Use the `priceFormatter.format()` method from `/lib/utils`. This will:

Add total revenue card to dashboard page

Use priceFormatter to format the revenue amount and display it in a CardContent component inside a Card component. Add DollarSign icon from lucide-react to the CardHeader.

```tsx
import { priceFormatter } from '@/lib/utils';

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <Heading title='Dashboard' description='Overview of your store' />
        <Separator />
        
        <div className="grid gap-4 grid-cols-3">

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Revenue
              </CardTitle>
              <DollarSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {priceFormatter.format(100)}
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}
```

Next copy the same `Card` component and change the `CardTitle` inner text to "Sales" and the `DollarSign` icon to `CreditCard` from `lucide-react`.

Also replace the inner text of `CardContent` to "+25" to represent the amount of sales.

Add sales card to dashboard page

Create a Card component with a CardHeader and a CardContent to display the number of sales made by the store. Add CreditCard icon from lucide-react to the CardHeader.

```tsx
import { CreditCard, DollarSign } from 'lucide-react';

// Local Imports
import prismadb from '@/lib/prismadb';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { priceFormatter } from '@/lib/utils';

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <Heading title='Dashboard' description='Overview of your store' />
        <Separator />

        <div className="grid gap-4 grid-cols-3">

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Revenue
              </CardTitle>
              <DollarSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {priceFormatter.format(100)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Sales
              </CardTitle>
              <CreditCard className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                +25
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}
```

Finally, create another `Card` component that represents the stores inventory.

The `CardTitle` will have "Products In Stock" as inner text. It will also use `Package` icon from `lucide-react`. And it will interpolate a non-negative number representing the number of products in stock at the store. Put "12" for now, we will substitue this later.

Add products in stock card to dashboard page

Create a Card component with a CardHeader and a CardContent to display the number of products in stock for the store. Add Package icon from lucide-react to the CardHeader.

```tsx
import { CreditCard, DollarSign, Package } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <Heading title='Dashboard' description='Overview of your store' />
        <Separator />

        <div className="grid gap-4 grid-cols-3">

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Revenue
              </CardTitle>
              <DollarSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {priceFormatter.format(100)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Sales
              </CardTitle>
              <CreditCard className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                +25
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Products In Stock
              </CardTitle>
              <Package className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                12
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
```

### Parameterize the data used in Card components

So far what we did was hard code values for the Card components.

[Hard coding](https://en.wikipedia.org/wiki/Hard_coding) (also hard-coding or hardcoding) is the software development practice of embedding data directly into the source code of a program or other executable object, as opposed to obtaining the data from external sources or generating it at runtime.

Hard coding is when actual data or parameter appears literally in the source-code, or more precisely - whether it's determined at compile-time or at run-time (e.g., getting input from user, read from config file, taken from command line).

The opposite of hard coding is the process of *parameterization* (e.g., we need to parameterize the threshold value used in function X).

Parameterizing is a technique of using variables or parameters to store data or values that can be changed or modified without altering the source code of a program. Hard coding is the opposite of parameterizing, as it means embedding data or values directly into the source code of a program, making it difficult or impossible to change or modify without altering the source code. Parameterizing is generally considered a good practice, as it makes the program more flexible, scalable, and maintainable. Hard coding is sometimes necessary, but can also be an anti-pattern.

Now instead of hard coding the values for total revenue, sales, and products-in-stock we need to create the functions to parameterize these values.

Create three variables: `totalRevenue`, `salesCount`, `stockCount`.

```tsx
const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {

  const totalRevenue = () => {};
  const salesCount = () => {};
  const stockCount = () => {};
  // ...
```

Now for `totalRevenue` it will `await` a function named `getTotalRevenue()` with `storeId` passed in as the argument: 

```tsx
interface DashboardPageProps {
  params: { storeId: string }
};

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {

  const totalRevenue = () => await getTotalRevenue(params.storeId);
```

Now we need to create an action. At the root directory of the project (i.e., `/ecommerce-admin`) create a folder named `actions` and inside create a file named `getTotalRevenue.ts`.

Inside we import `prismadb` and create a `async` function with the parameter `storeId`.

`ecommerce-admin\actions\getTotalRevenue.ts`
```ts
import prismadb from "@/lib/prismadb";

export const getTotalRevenue = async (storeId: string) => {
  
}
```

Fetch paid orders and items

- Use storeId as a parameter to filter orders by store and isPaid flag
- Include orderItems and product details in the query result

```ts
import prismadb from "@/lib/prismadb";

/**
 * Calculate the total revenue of a store
 * @param storeId - Unique identifier for a store
 */
export const getTotalRevenue = async (storeId: string) => {
  
  // Query database for orders & product items that have been paid for
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId: storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

};
```

Now that we have the `paidOrders`, we need to reduce each order to a single sum named `totalRevenue`. But each order has `orderItems`, so we need to calculate the `orderSum` first then add that to the `totalRevenue`.

#### Arrow Function or Function Declaration?

- Also note we convert the arrow function expression (which uses the `=>` syntax) to a function declaration. 

Arrow functions inherit `this` from the enclosing scope and are **non-constructible** (i.e., called with `new` keyword) but **callable* (can be called without `new`).

If you want to be more familiar with `this` keyword, check out this source [You Don't Know: this & Object Prototypes](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20&%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes).

- Functions created through function declarations / expressions are both constructable and callable.

1. Arrow functions do not have lexical `this` and `arguments` binding and 

2. Arrow functions cannot be called with `new`

Here are examples highlighting some differences between Arrow function, function declaration, function expression.

```tsx
// Arrow function
const App: React.FC = ( {children}) => {
  return (
    <div className="App">
      {children}
    </div>
  );
}

// Function declaration
function App ( {children}: {children: JSX.Element}) {
  return (
    <div className="App">
      {children}
    </div>
  );
}

// Function expression
const App: React.FC = function ( {children}) {
  return (
    <div className="App">
      {children}
    </div>
  );
}
```

The choice between using an arrow function or a function declaration/expression for React components is mostly a matter of preference and style, [as there is no significant difference in terms of functionality or performance](https://timmousk.com/blog/typescript-arrow-function/). 

However, some developers prefer using arrow functions for functional components, as they provide type information for some component properties, such as `propTypes`, `defaultProps`, and `displayName`. Others prefer using function declarations/expressions, as they are more familiar and consistent with the official React documentation.

#### Implement `getTotalRevenue` using prismadb

Implement getTotalRevenue function using prismadb

- Use function declaration over arrow function
- Use storeId as a parameter to filter orders by store
- Filter for paid orders by the `isPaid` flag
- Include orderItems and product details in the query result
- Sum up the product prices of all paid orders

```ts
import prismadb from "@/lib/prismadb";

/**
 * Calculate the total revenue of a given store
 * @param storeId - Unique identifier for the given store
 * @returns the total revenue of every paid order for a given store
 */
export default async function getTotalRevenue(storeId: string) {
  // Query database for orders & product items that have been paid for
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId: storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  // Sum up the product prices of all paid orders
  const totalRevenue = paidOrders.reduce((total, order) => {
    // Sum up the product prices of each order item
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.product.price.toNumber();
    }, 0)
    return total + orderTotal;
  }, 0);

  return totalRevenue;
};
```

Now we can import the function `getTotalRevenue` and use it in the dashboard page:

Use getTotalRevenue in dashboard

- Use storeId from params to get the revenue for the current store
- Display the totalRevenue in the dashboard page component

```tsx
import getTotalRevenue from '@/actions/getTotalRevenue';

interface DashboardPageProps {
  params: { storeId: string }
};

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {

  const totalRevenue = await getTotalRevenue(params.storeId);

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <Heading title='Dashboard' description='Overview of your store' />
        <Separator />

        <div className="grid gap-4 grid-cols-3">

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Revenue
              </CardTitle>
              <DollarSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>

                {priceFormatter.format(totalRevenue)}
                
              </div>
            </CardContent>
          </Card>
  );
}
```

Next, create the file `getSalesCount.ts` in `/actions`. 

Unlike `getTotalRevenue`, we simplify the function to simply return the sales count for a store. This function takes a `storeId` as a parameter and queries the database for the count of paid orders of that store. It then returns the sales count as a number.

`ecommerce-admin\actions\getSalesCount.ts`
```ts
import prismadb from "@/lib/prismadb";

/**
 * Get the number of orders that have been paid for a given store
 * @param storeId - The ID of the store to query
 * @returns the sales count as a number
 */
export default async function getSalesCount(storeId: string) {
  // Use prismadb to count the paid orders that match the storeId
  const salesCount = await prismadb.order.count({
    where: {
      storeId: storeId,
      isPaid: true,
    },
  });

  return salesCount;
};
```

Now we can import and use this function in the dashboard overview page:

```tsx
// ...
import getSalesCount from '@/actions/getSalesCount';

interface DashboardPageProps {
  params: { storeId: string }
};

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {
  // ...
  const salesCount = await getSalesCount(params.storeId);

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <Heading title='Dashboard' description='Overview of your store' />
        <Separator />

        <div className="grid gap-4 grid-cols-3">

          <Card>
            // ...
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Sales
              </CardTitle>
              <CreditCard className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {salesCount}
              </div>
            </CardContent>
          </Card>

          <Card>
            // ...
          </Card>

        </div>

      </div>
    </div>
  );
}

export default DashboardPage;
```

Use getSalesCount to display sales data

- Use the getSalesCount function to fetch and display the number of sales for a given store on the dashboard overview page

Finally, let's import `getStockCount` first in the dashboard page, use the method and assign the result to `stockCount` variable which we will render in the "Products in Stock" `Card`

Show product availability with stockCount

- Use the getStockCount function to fetch and display the number of products in stock for a given store on the dashboard overview page

`ecommerce-admin\app\(dashboard)\[storeId]\(routes)\page.tsx`
```tsx
// ...
import getStockCount from '@/actions/getStockCount';

interface DashboardPageProps {
  params: { storeId: string }
};

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {

  const stockCount = await getStockCount(params.storeId);

  return (
    <div className='flex-col'>
      // ...

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Products In Stock
              </CardTitle>
              <Package className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {stockCount}
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}
```

Now create the file `getStockCount.ts` in `/actions` and implement the function.

Add function that displays product availability

- Takes a storeId as a parameter and queries the product table of the given store with prismadb. 
- It returns the count of available & non-archived products

`ecommerce-admin\actions\getStockCount.ts`
```ts
import prismadb from "@/lib/prismadb";

/**
 * Get the count of available products in a given store's inventory. 
 * Only non-archived products are available.
 * @param storeId
 * @returns the count of available products in the store
 */
export default async function getStockCount(storeId: string) {
  // Query product table for the count of available products
  const stockCount = await prismadb.product.count({
    where: {
      storeId: storeId,
      isArchived: false,
    },
  });

  return stockCount;
};
```

## Add the Overview Card to the dashboard

After finishing the card container that displays the analytics of revenue, sales and inventory we can move on to the `Overview` `Card`. After the container but before the second to last `div`, add another `Card` component with title of "Overview".

```tsx
const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {
  // ...
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <Heading title='Dashboard' description='Overview of your store' />
        <Separator />

        {/* Card container that displays analytics for revenue, sales & product inventory */}
        <div className="grid gap-4 grid-cols-3">
          {/* Total Revenue Card */}
          {/* Sales Card */}
          {/* Stock Card */}
        </div>

        {/* Card Overview */}
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardContent className='pl-2'>

            </CardContent>
          </CardHeader>
        </Card>

      </div>
    </div>
  );
}

export default DashboardPage;
```

## Create the `Overview` component

Navigate to `ecommerce-admin\components` and create the component `Overview.tsx`.

`ecommerce-admin\components\Overview.tsx`
```tsx
import React from 'react';

const Overview = () => {
  return (
    <div>Overview</div>
  )
}

export default Overview
```

In the dashboard, put `Overview` inside `CardContent`. Give it a prop `data`, for now we can pass it an empty array.

```tsx
const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {
  // ...
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <Heading title='Dashboard' description='Overview of your store' />
        <Separator />

        {/* Card container that displays analytics for revenue, sales & product inventory */}
        <div className="grid gap-4 grid-cols-3">
          {/* Total Revenue Card */}
          {/* Sales Card */}
          {/* Stock Card */}
        </div>

        {/* Card Overview */}
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardContent className='pl-2'>
              <Overview data={[]} />
            </CardContent>
          </CardHeader>
        </Card>

      </div>
    </div>
  );
}
```

The `Overview` component will display store data visually. To do this we use a composable charting library built on React components called [recharts](https://recharts.org/en-US/).

Install the [recharts npm package](https://www.npmjs.com/package/recharts).

```sh
npm i recharts
```

We can look at the [recharts API reference](https://recharts.org/en-US/api) to see what we can work with.

- [recharts - BarChart](https://recharts.org/en-US/api/BarChart)
- [recharts - ResponsiveContainer](https://recharts.org/en-US/api/ResponsiveContainer) is the parent component of `BarChart`

Let's develop the `Overview` component using the `BarChart`.

- Mark as client component
- Import `{ Bar, BarChart, ResponsiveContainer, XAxis, YAxis }`
  - Optionally, we can use `CartesianGrid`, `Tooltip`, or `Legend` components
- Define the prop interface `OverviewProps` that contains `data` which is of type `any[]` for now
- Assign the type and prop interface to `Overview`
- Return a `ResponsiveContainer` with props `width` of 100% and `height` of 350. This is the parent container for `BarChart`
- Inside render the `BarChart` with the prop `data`, passing in our `data` argument

`ecommerce-admin\components\Overview.tsx`
```tsx
"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';

import React from 'react';

interface OverviewProps {
  data: any[];
}

const Overview: React.FC<OverviewProps> = ({
  data,
}) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>

      </BarChart>
    </ResponsiveContainer>
  )
}

export default Overview
```

Display data using recharts

- Import recharts components and use client hook
- Define OverviewProps interface and Overview component
- Use ResponsiveContainer and BarChart to render data
- Export Overview component as default

Let's develop `BarChart`. Add an `XAxis` and `YAxis` child components and configure their properties.

Add XAxis and YAxis components to BarChart

- Import XAxis and YAxis from recharts library
- Configure XAxis and YAxis properties such as dataKey, stroke, fontSize, tickLine, axisLine, and tickFormatter
- Render XAxis and YAxis inside BarChart component

```tsx
const Overview: React.FC<OverviewProps> = ({
  data,
}) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
```

Now add the cartesian component [Bar](https://recharts.org/en-US/api/Bar). Configure the properties `dataKey` to "total", `fill` to "#3498db" and `radius` to `[4, 4, 0, 0]`.

Add Bar component to BarChart

- Import Bar from recharts library
- Add Bar component as a child of BarChart component
- Set dataKey, fill, and radius properties for Bar component

```tsx
const Overview: React.FC<OverviewProps> = ({
  data,
}) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
```

Next we need a function that will organize our data so that we can pass it into the `Overview`'s `data` property.

Create a file in `/actions` named `getGrapheRevenue.ts`.

`ecommerce-admin\actions\getGraphRevenue.ts`
```ts
import prismadb from "@/lib/prismadb";

/**
 * Get monthly revenue data for a given store
 * @param storeId - The ID of the store to query
 * @returns revenue data
 */
export default async function getGraphRevenue(storeId: string) {
  
};
```

Next we want to query the database for a list of paid orders along with the products purchased in those orders. So we include the related records `orderItems`.

Then create a variable `monthlyRevenue` that has the type of an object with numeric keys and numeric values. The object is initialized as an empty object. This way we can assign values to this object like this:

```ts
monthlyRevenue[1] = 1000; // January revenue
monthlyRevenue[2] = 2000; // February revenue
monthlyRevenue[3] = 1500; // March revenue
```

```tsx
import prismadb from "@/lib/prismadb";

/**
 * Get monthly revenue data for a given store
 * @param storeId - The ID of the store to query
 * @returns revenue data
 */
export default async function getGraphRevenue(storeId: string) {
  // Query database for orders & product items that have been paid for
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId: storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const monthlyRevenue: { [key: number]: number } = {};
};
```

Add getGraphRevenue function to actions

- Import prismadb from "@/lib/prismadb"
- Define getGraphRevenue function that takes storeId as a parameter
- Query prismadb for paid orders and order items for a given store
- Initialize monthlyRevenue object with numeric keys and values

After initializing an empty object to store monthly revenue data, we want to loop through each order then calculate the total revenue and save it inside `monthlyRevenue`.

Calculate monthly revenue from paid orders

- Loop through each paid order and its order items
- Get the month number from the order creation date
- Add the product prices to the revenue for each month
- Store the monthly revenue data in an object
- Return the monthly revenue object from the function

```ts
import prismadb from "@/lib/prismadb";

/**
 * Get monthly revenue data for a given store
 * @param storeId - The ID of the store to query
 * @returns revenue data
 */
export default async function getGraphRevenue(storeId: string) {
  // Fetch all paid orders and their associated products for the store
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId: storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  // Initialize an empty object to store the monthly revenue data
  const monthlyRevenue: { [key: number]: number } = {};

  // Loop through each order and calculate its revenue
  for (const order of paidOrders) {
    // Get the month number from the order creation date
    const month = order.createdAt.getMonth();
    // Initialize a variable to store the revenue for this order
    let revenueForOrder = 0;

    // Loop through each item in the order and add its product price to the revenue
    for (const item of order.orderItems) {
      revenueForOrder += item.product.price.toNumber();
    }

    /* Add the revenue for this order to the corresponding month in the monthly 
    revenue object. If data for that month is not available then use 0 as 
    the default value. Add the revenue from the order.
    */
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }
};
```

### Create Graph data

Define a `GraphData` interface which has a `name` and a `total`. This will be our format for our monthly revenue data.

Inside `getGraphRevenue` function, initialize an array of `GraphData` named `monthlyGraphData`, which contains 12 objects. Each object will have their `name` property set to 3 letter month names, and their `total` to 0.

`ecommerce-admin\actions\getGraphRevenue.ts`
```ts
interface GraphData {
  name: string;
  total: number;
}

export default async function getGraphRevenue(storeId: string) {

  // ...

  const monthlyGraphData: GraphData[] = [
    {name: "Jan", total: 0  },
    {name: "Feb", total: 0  },
    {name: "Mar", total: 0  },
    {name: "Apr", total: 0  },
    {name: "May", total: 0  },
    {name: "Jun", total: 0  },
    {name: "Jul", total: 0  },
    {name: "Aug", total: 0  },
    {name: "Sep", total: 0  },
    {name: "Oct", total: 0  },
    {name: "Nov", total: 0  },
    {name: "Dec", total: 0  },
  ];

}
```

Finally, after initializing `monthlyGraphData` set each month's revenue to the `total` inside `GraphData` then return the `monthlyGraphData`.

```ts
interface GraphData {
  name: string;
  total: number;
}

export default async function getGraphRevenue(storeId: string) {

  // ...

  // After populating monthly revenue data, transform it to GraphData

  // Initialize an array of GraphData that contains each month and a total of 0
  const monthlyGraphData: GraphData[] = [
    {name: "Jan", total: 0  },
    {name: "Feb", total: 0  },
    {name: "Mar", total: 0  },
    {name: "Apr", total: 0  },
    {name: "May", total: 0  },
    {name: "Jun", total: 0  },
    {name: "Jul", total: 0  },
    {name: "Aug", total: 0  },
    {name: "Sep", total: 0  },
    {name: "Oct", total: 0  },
    {name: "Nov", total: 0  },
    {name: "Dec", total: 0  },
  ];

  // For each month, set the GraphData total to their respective monthly revnue
  for (const month in monthlyRevenue) {
    monthlyGraphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return monthlyGraphData;
}
```

Here is the full form of `getGraphRevenue.ts`:

```ts
import prismadb from "@/lib/prismadb";

interface GraphData {
  name: string;
  total: number;
}

/**
 * Get monthly revenue data for a given store
 * @param storeId - The ID of the store to query
 * @returns an array of graph data that contains the total monthly revenue
 */
export default async function getGraphRevenue(storeId: string) {
  // Fetch all paid orders and their associated products for the store
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId: storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  // Initialize an empty object to store the monthly revenue data
  const monthlyRevenue: { [key: number]: number } = {};

  // Loop through each order and calculate its revenue
  for (const order of paidOrders) {
    // Get the month number from the order creation date
    const month = order.createdAt.getMonth();
    // Initialize a variable to store the revenue for this order
    let revenueForOrder = 0;

    // Loop through each item in the order and add its product price to the revenue
    for (const item of order.orderItems) {
      revenueForOrder += item.product.price.toNumber();
    }

    /* Add the revenue for this order to the corresponding month in the monthly 
    revenue object. If data for that month is not available then use 0 as 
    the default value. Add the revenue from the order. 
    */
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  // After populating monthly revenue data, transform it to GraphData

  // Initialize an array of GraphData that contains each month and a total of 0
  const monthlyGraphData: GraphData[] = [
    {name: "Jan", total: 0  },
    {name: "Feb", total: 0  },
    {name: "Mar", total: 0  },
    {name: "Apr", total: 0  },
    {name: "May", total: 0  },
    {name: "Jun", total: 0  },
    {name: "Jul", total: 0  },
    {name: "Aug", total: 0  },
    {name: "Sep", total: 0  },
    {name: "Oct", total: 0  },
    {name: "Nov", total: 0  },
    {name: "Dec", total: 0  },
  ];

  // For each month, set the GraphData total to their respective monthly revnue
  for (const month in monthlyRevenue) {
    monthlyGraphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return monthlyGraphData;
};
```

Transform monthly revenue to graph data for store

- Extract monthly revenue from paid orders
- Transform monthly revenue to monthlyGraphData, an array of GraphData, and return it

## Putting it all together

Now navigate back to dashboard overview page and create a constant `graphRevenue` where we use the function `getGraphRevenue`. Finally, pass in the `graphRevenu` to the `data` prop of `Overview` component.

`ecommerce-admin\app\(dashboard)\[storeId]\(routes)\page.tsx`
```tsx
import getGraphRevenue from '@/actions/getGraphRevenue';

interface DashboardPageProps {
  params: { storeId: string }
};

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {

  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId);

 return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <Heading title='Dashboard' description='Overview of your store' />
        <Separator />

        {/* Card container that displays analytics for revenue, sales & product inventory */}
        {/* ... */}

        {/* Card Overview */}
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardContent className='pl-2'>

              <Overview data={[graphRevenue]} />

            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
```

Display monthly revenue graph on dashboard page

- Use recharts to display a bar graph that contains the monthly revenue for a given store

# Dark Mode

One essential feature to add is dark mode. To do that we will add a theme provider for our nextjs project.

- [shadcn/ui - Dark Mode - Next.js | Reference](https://ui.shadcn.com/docs/dark-mode/next)

1. Install next-themes

```sh
npm install next-themes
```

2. Create a theme provider

Navigate to our project's `/providers` folder and create a `theme-provider.tsx`.

`ecommerce-admin\providers\theme-provider.tsx`
```ts
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

3. Wrap your root layout

Add the `ThemeProvider` to your root layout.

So we navigate to our `ecommerce-admin\app\layout.tsx`, then wrap everything inside the `body` that includes the `children` by the `ThemeProvider`.

`ecommerce-admin\app\layout.tsx`
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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToasterProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
```

4. Add a mode toggle

Place a mode toggle on your site to toggle between light and dark mode.

Add `ThemeToggle.tsx` to the `/components` folder.

`ecommerce-admin\components\ThemeToggle.tsx`
```tsx
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

5. Add the theme toggle to the site

In the `Navbar.tsx`, right before `UserButton` we can render the `ThemeToggle`.

```tsx
// Global Imports
import React from 'react';
import { auth, UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

// Local Imports
import MainNav from '@/components/MainNav';
import StoreSwitcher from '@/components/StoreSwitcher';
import prismadb from '@/lib/prismadb';
import { ThemeToggle } from '@/components/ThemeToggle';

export default async function Navbar() {
  // Authenticate userId with Clerk to check if user is logged-in
  const { userId } = auth();
  
  // If userId does not exist, redirect to sign-in page
  if (!userId) {
    redirect("/sign-in");
  }

  // Find All the stores whose userId matches the userId authenticated with Clerk
  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  })
  
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6"/>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  )
}
```

Now we can toggle between the themes dark, light, and system from the navbar.

## Add Dark Mode to Clerk components using the appearance prop

An issue we come across is that the Clerk `UserProfile` component does not share the same theme as the rest of the UI. In order to do that we need to use a pre-built theme and also modify the `appearance` prop.

- [Clerk Customization - Appearance prop | Reference](https://clerk.com/docs/components/customization/overview)

- [Pass a theme to `<ClerkProvider>`](https://clerk.com/docs/components/customization/overview#pass-a-theme-to-clerk-provider), to apply a theme to all Clerk components, pass the `appearance` prop to the `<ClerkProvider>` component

- [Pass a theme to a single Clerk component](https://clerk.com/docs/components/customization/overview#pass-a-theme-to-a-single-clerk-component)


First we want to install the pre-built themes offered by Clerk.

```sh
npm install @clerk/themes
```

Next let's pass the theme to `<ClerkProvider>` using the `appearance` prop

`ecommerce-admin\app\layout.tsx`
```tsx
// Global Imports
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import { dark } from '@clerk/themes';

// Local Imports
import './globals.css'
import { ModalProvider } from '@/providers/modal-provider'
import { ToasterProvider } from '@/providers/toast-provider'
import { ThemeProvider } from '@/providers/theme-provider'

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
    <ClerkProvider
      appearance={{
        baseTheme: dark
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToasterProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
```

Another option is using the `shadesOfPurple` theme from `@clerk/themes` as it contrasts well in both light and dark modes. This will improve readability.

```tsx
import { shadesOfPurple } from '@clerk/themes';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToasterProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
```

# Deployment

To bring the project into production we can [deploy to Vercel](https://nextjs.org/learn-pages-router/basics/deploying-nextjs-app/deploy).

**Update note:** Ensure that you use a database provider to host the project's data. This step is necessary for others to access the project online.

## Get ready for production

- Add a [postinstall](https://docs.npmjs.com/cli/v10/using-npm/scripts) script 
  - in `ecommerce-admin/package.json`
  - runs `prisma generate`

feat: Add postinstall script for Prisma generation

`ecommerce-admin\package.json`
```json
{
  "name": "ecommerce-admin",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "postinstall": "prisma generate"
  },
```

In the given `package.json` snippet, the **`postinstall` script** serves a specific purpose related to package management. Let me explain:

1. **`postinstall` Script**:
   - The `postinstall` script is one of the **lifecycle scripts** defined in the `scripts` section of a `package.json` file.
   - It runs **automatically** after a package is installed using `npm install`.
   - Specifically, it executes **immediately after the installation process** completes.
   - Developers commonly use the `postinstall` script to perform additional setup steps or tasks related to the installed package.
   - Here, the `postinstall` script runs the command `prisma generate`.

So, whenever someone installs the `ecommerce-admin` package using `npm install`, the `prisma generate` command will be executed as part of the post-installation process. This allows you to generate Prisma artifacts or perform any other necessary actions after the package is installed.

## Deployment steps:

1. Create a GitHub repository for `ecommerce-admin`
2. Create a GitHub repository for `ecommerce-store`
   - Note: you can rename the repositories to anything you'd like
3. Navigate to [https://vercel.com/](https://vercel.com/)
    - Sign up and log in
4. In the Overview, click "Add New" project
5. Import the admin project repo
6. Inside "Configure Project" window, copy and paste all the environment variables (i.e., .env file)to Vercel's Environment Variables
7. Click deploy, and wait for the new URL
8. Take the essential parts of the URL:
   - Scheme (Protocol): HTTPS
   - Subdomain: blog (if URL is blog.example.com)
   - Second-level Domain: example (from example.com)
   - Top-Level domain: .com (or .org, .net. edu, etc.)

  If we named the repository "ecommerce-admin-project", then vercel wwill give us the following URL:
  - https://ecommerce-admin-project.vercel.app
9. Update the environment variable `NEXT_PUBLIC_API_URL` for `ecommerce-store` with the new URL

  - In the `.env` file for the `ecommerce-store` project, replace the "http://localhost:3000" with the new URL given by Vercel or other hosting platform

   ```.env
   NEXT_PUBLIC_API_URL=https://ecommerce-admin-project.vercel.app/api/...
   ```
10. Back to Vercel, add the new project `ecommerce-store`
  - Add the environment variable `NEXT_PUBLIC_API_URL`
11. Deploy the store and get the new URL
  - e.g., https://ecommerce-store-project.vercel.app
12. Update environment variable `FRONTEND_STORE_URL` in `ecommerce-admin-project` with the new store URL inside of Vercel
  - we change the environment variable from `FRONTEND_STORE_URL=http://localhost:3001` to the new store URL: `FRONTEND_STORE_URL=https://ecommerce-store-project.vercel.app`
13. Update Stripe with the proper sign-in key
    1.  In Stripe dashboard, log-in and navigate to Developers then Webhooks
    2.  As of now we have a Local listener, but we need to add Hosted endpoint
    3.  Add endpoint with endpoint URL, which is the deployed dashboard: 
    - https://ecommerce-admin-project.vercel.app/api/webhook
14. Select events to listen to in Stripe
    - Select events for Checkout: `checkout.session.completed`
    - Click add event
    - Click Add Endpoint
15. Click "reveal" on the "Signing secret" in the webhook `https://ecommerce-admin-project.vercel.app/api/webhook` to get the signing secret key
16. Paste the signing secret into the environment variable `STRIPE_WEBHOOK_SECRET` for the `ecommerce-admin-project` inside Vercel
17. Redeploy `ecommerce-admin-project`
    1.  Inside Vercel, click on your dashboard
    2.  Click Deployments
    3.  Under deloyments tab, find the latest successful deployment of `ecommerce-admin-project-...`
    4.  Click the "..." at the end to open a menu, and click "Redeploy"
    5.  A modal with "Redeploy to Production" opens, do **not** click checkbox for **Use existing Build Cache**
    6.  Click redeploy inside the Modal
    
With that, we now have our projects in production (i.e., **live and ready for use by end users**).

Go ahead and test the following:
1. Admin dashboard, create a product
2. Front end store, purchase a product
3. Checkout product with Stripe
  - Keep the stripe dashboard open to see if stripe webhook is listening to events
4. Inside checkout session
  - Check admin dashboard's Order table, for an *unpurchased* order
  - Back in the checkout session, fill out the order details
5. Click pay
  - Check admin dashboard's Order table for a *purchased* order
  - Check Stripe dashboard webhook to see if the event `checkout.session.completed` is complete
  - Check if dashboard analytics in the Overview page reflects the new total revenue and products in stock
6. Enjoy the successful deployment of the ecommerce store
7. For the complete production version where the store is monetized, [activate your Stripe account](https://docs.stripe.com/payments/account/activate)
   - In full production, you must turn off "test mode" in Stripe
   - Register your business

docs: Add detailed guide for deployment on Vercel

# Extra features

## Disable checkout button when shopping cart is empty

feat: Disable checkout button when cart is empty

`ecommerce-store\app\(routes)\cart\components\Summary.tsx`
```tsx
import useCart from '@/hooks/use-cart';

const Summary = () => {
  // Get items, an array of products, from cart state
  const items = useCart((state) => state.items);
  
  return (
    <div className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:pt-8'>
      { /* ... */ }

      <Button 
        disabled={items.length === 0}
        onClick={onCheckout} 
        className='w-full mt-6'
      >
        Checkout
      </Button>
    </div>
  )
}
```

We also need to extend the `Button` functionality to actually disable the component.

feat: Extend Button with disabled functionality

`ecommerce-store\components\ui\Button.tsx`
```tsx
import React, { forwardRef } from "react";

import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  disabled,
  type = "button",
  ...props
}, ref) => {
  return (
    <button
      className={cn(
        `
        w-auto
        rounded-full
        bg-black
        border-transparent
        px-5
        py-3
        disabled:cursor-not-allowed
        disabled:opacity-50
        text-white
        font-semibold
        hover:opacity-75
        transition
        `,
        className
      )}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button";

export default Button;
```

# Updates and Maintenance

## Refactored database solution to PostgreSQL

**Update:** On 6 March 2024, the **Planetscale** team announced their decision **to remove their Hobby plan — a free tier developers used to manage and deploy their serverless databases**. According to Sam Lambert, the CEO of Planetscale, they made this decision to "prioritize profitability and build a company that can last forever."

This means we have to look to a new database management solution, see the sections on [Database](#database) and [database providers](#database-providers).

## Update added a test walkthrough on how to submit an order

Receieved a request on creating a step-by-step guide on how to use the `complete-ecommerce-store` and complete an order. 

See [Test: Submit an order](#test-submit-an-order) section to have a complete walkthrough on how to complete an order.

docs: Add walkthrough for simulating orders in the checkout process

This commit includes detailed instructions on how to simulate an order, which is crucial for testing and ensuring proper functionality.

## Dependency management

**Package management** or **dependency management** is the process of updating packages and dependencies for a project. Specifically, tools like npm (Node Package Manager) are used to update packages to their latest versions.

We can run the following command to check for outdated packages in our project:

```sh
npm outdated
```

- [npm outdated](https://docs.npmjs.com/cli/v10/commands/npm-outdated)

#### **Wanted version** of a package

The `wanted` column in the `npm outdated` command refers to the **maximum version** of a package that satisfies the semver range specified in your `package.json`. Here's what it means:

- If a semver range is defined in your `package.json`, the `wanted` version represents the latest version within that range.
- If there's no semver range (e.g., when running `npm outdated --global` or if the package isn't included in `package.json`), the `wanted` version shows the currently-installed version.

In summary, `wanted` indicates the version you should update to based on your package constraints. If you prefer the latest version, consider updating to the one shown in the `latest` column. 

#### What's **semver**?

**Semver** (short for **Semantic Versioning**) is a versioning system used in the Node.js ecosystem, particularly by npm (Node Package Manager). It provides a consistent way to manage package dependencies. Here are the key points about semver:

1. **Version Format:**
   - Semver follows the format `MAJOR.MINOR.PATCH`.
   - **MAJOR**: Indicates breaking changes.
   - **MINOR**: Introduces new features without breaking existing functionality.
   - **PATCH**: Fixes issues or provides backward-compatible updates.

2. **Usage in npm:**
   - All packages published to npm are assumed to follow semver semantics.
   - Package authors use semver to define dependency versions bundled with their packages.

3. **Example:**
   - Suppose a package has version `1.2.3`.
     - Incrementing the **MAJOR** version (e.g., `2.0.0`) implies breaking changes.
     - Incrementing the **MINOR** version (e.g., `1.3.0`) adds features without breaking compatibility.
     - Incrementing the **PATCH** version (e.g., `1.2.4`) includes backward-compatible fixes.

semver helps maintain compatibility and ensures smooth package updates.

#### Install the latest minor version of npm package

To install only the **wanted** versions of each npm package run the following command:

chore: Update dependencies to latest semver range

chore: Update npm packages and address vulnerabilities

```sh
npm update --save
```

Or we can run `npm install` with specific requirements. 

To install the latest minor version:

```sh
npm install package-name@"^2.x.x"
```

To install a package right before the latest major update run the following command:

```sh
npm install package-name@"<next-major.0.0"
```

For example:

```sh
npm install package-name@"<3.0.0" 
```

Would install the latest right before 3.0.0 (e.g. 2.11.1)

### Update @clerk/nextjs to 4.29.3 IMMEDIATELY, critical security vulnerability

Update @clerk/nextjs to 4.29.3 for security fix

This commit updates the @clerk/nextjs package to version 4.29.3, which contains a critical security patch. The patch fixes a vulnerability that could allow an attacker to bypass authentication and access user data. See  [clerk changelog](https://clerk.com/changelog/2024-01-12) for more details.

### Dependency log

#### ecommerce-admin

chore: Update dependencies to latest versions

```sh
npm i @hookform/resolvers@latest
npm i @prisma/client@latest
npm i @tanstack/react-table@latest
npm i axios@latest
npm i clsx@latest
npm i prisma@latest
npm i react@latest
npm i react-dom@latest
npm i react-hook-form@latest
npm i recharts@latest
npm i zustand@latest
npm i zod@latest
```

chore: Update dependencies to latest minor version

```sh
npm i stripe@14.25.0
```

#### ecommerce-store

```sh
# ...
```

#### Components that need maintenance

##### `Command` component depends on `cmdk` package

chore: Update Command component and dependencies

To quickly update the `Command` component run this command in the terminal:

```sh
npx shadcn-ui@latest add command
```

Or update `cmdk` package manually:

- Update `cmdk` to the latest *minor* version or what the maximum allowed in **semver**
  
```sh
npm install cmdk
```

# Test: Submit an Order

This assumes you set up all the details found in the README.md which includes

- Installing project dependencies
- Setting up environment variables
- Connecting to services such as prisma and database providder
- Creating Stripe webhook key

## Setup Stripe webhook to test locally

In the Stripe dashboard we should be on the page where we Listen to Stripe events. We can test in a local environment and should see the 3 steps.

But we need to setup the Stripe CLI on our OS.

- [Stripe CLI](https://docs.stripe.com/stripe-cli)

The Windows installation steps:

1. Download the latest `windows` zip file from [GitHub](https://github.com/stripe/stripe-cli/releases/latest).
2. Unzip the `stripe_X.X.X_windows_x86_64.zip` file.
3. Add the path to the unzipped `stripe.exe` file to your Path environment variable. To learn how to update environment variables, see the [Microsoft PowerShell documentation](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_environment_variables?view=powershell-7.3#saving-changes-to-environment-variables).

At this point we should have a directory such as "C:/Program Files/Stripe". We have to `cd` into it and run the commands. 

**Important: make sure you are in Command Prompt and not in Powershell or Windows Terminal**.

The `stripe login` command won't work or will be recognized but won't be run if you are not in command prompt. After this command it will send a stripe link in the terminal, navigate to it and allow access to authenticate. now we can forward events to webhook.

1. Log in to CLI
   
```sh
stripe login
```

2. Forward events to your webhook

```sh
stripe listen --forward-to localhost:3000/api/webhook
```

if using Stripe CLI online then just the command

```sh
stripe listen
```

3. Trigger events with the CLI

```sh
stripe trigger payment_intent.succeeded
```

## Make an order

Keep the following open on separate terminals:
Key:
- `FE`: Front-End store
- `Admin`: Admin dashboard
- `webhook`: Stripe webhook

Steps to reproduce:
1. Create a store, then a product in the Admin
2. In FE, as a user add a product to the shopping cart
3. In FE, click the checkout button in the top right to arrive at the shopping cart page
4. In FE, shopping cart page, click checkout
5. Fill out the order details

```sh
Contact Information
test@test.com
(201)555-0123

Card information
4242 4242 4242 4242
05/55 555

Name on card
Luna Berry

Billing address
United States
9999
Dog City 99999
Alaska
```

6. Click pay

We should see the front-end store redirect the user to the success page.

7. Trigger a Stripe `payment_intent.succeeded` through the CLI to update our order status
8. Check `admin` Order tab to see the order details.