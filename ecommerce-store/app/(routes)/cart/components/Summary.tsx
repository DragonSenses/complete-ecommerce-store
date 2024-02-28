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

export default Summary