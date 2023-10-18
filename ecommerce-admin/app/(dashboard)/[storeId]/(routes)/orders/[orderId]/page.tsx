// Global Imports
import prismadb from '@/lib/prismadb';
import React from 'react';

// Local Imports
import orderForm from './components/orderForm';

const orderPage =  async ({
  params
}:{
  params: { orderId: string }
}) => {

  // Fetch an existing order
  const order = await prismadb.order.findUnique({
    where: {
      id: params.orderId
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <orderForm initialData={order}/>
      </div>
    </div>
  )
}

export default orderPage;