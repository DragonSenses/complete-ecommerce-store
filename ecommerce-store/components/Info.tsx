"use client";

import React, { MouseEventHandler } from 'react';
import { ShoppingCart } from 'lucide-react';

import { Product } from '@/types';
import Currency from '@/components/ui/Currency';
import Button from '@/components/ui/Button';
import useCart from '@/hooks/use-cart';

interface InfoProps {
  data: Product;
}

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
      <h1 className='text-3xl font-bold text-gray-900'>
        {data.name}
      </h1>

      <div className='mt-3 flex items-end justify-between'>
        <p className='text-2xl text-gray-900'>
          <Currency value={data?.price} />
        </p>
      </div>

      <hr className='my-4' />

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

export default Info