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