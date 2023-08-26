// Global Imports
import React from 'react';
import { auth } from '@clerk/nextjs';
import { redirect } from "next/navigation";

// Local Imports
import prismadb from '@/lib/prismadb';

export default async function SetupLayout({
  children
}: {
  children: React.ReactNode;
}) {
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

  // Just render out children if not redirected
  return (
    <>
      {children}
    </>
  )
}
