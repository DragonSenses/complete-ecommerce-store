// Global Imports
import React from 'react';
import { auth } from '@clerk/nextjs';
import { redirect } from "next/navigation";

// Local Imports
import prismadb from '@/lib/prismadb';
import Navbar from '@/components/Navbar';

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
      <Navbar />
      {children}
    </div>
  )
}
