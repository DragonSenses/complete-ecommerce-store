// Global Imports
import prismadb from '@/lib/prismadb';
import React from 'react';

// Local Imports

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