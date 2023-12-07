"use client";

import React from 'react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { X } from 'lucide-react';

import IconButton from '@/components/ui/IconButton';
import Currency from '@/components/ui/Currency';
import useCart from '@/hooks/use-cart';
import { Product } from '@/types';

interface CartItemProps {
  data: Product;
};

const CartItem: React.FC<CartItemProps> = ({
  data
}) => {
  return (
    <li className='flex py-6 border-b'>
      <div className='relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48'>
        <Image
          fill
          src={data.images[0].url}
          alt=''
          className='object-cover object-center'
        />
      </div>
    </li>
  )
}

export default CartItem
