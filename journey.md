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

- Does UI reflect changes?
- Add a billboard
- Edit a billboard

## Featured products

Next we should add featured products to the home page. 

We first need to add the types for it. Create a `Product` interface inside `types.ts`, which contains `{ id, category, name, price, isFeatured, size, color, images }`.

`ecommerce-store\types.ts`
```tsx
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
