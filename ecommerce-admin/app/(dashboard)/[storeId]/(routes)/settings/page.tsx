// Global Imports
import React from 'react';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

// Local Imports
import prismadb from '@/lib/prismadb';

import SettingsForm from "./components/SettingsForm";

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
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store}/>
      </div>
    </div>
  )
}

export default SettingsPage