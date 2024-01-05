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
