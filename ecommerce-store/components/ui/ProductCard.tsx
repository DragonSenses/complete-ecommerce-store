"use client";

import Image from 'next/image';
import React, { MouseEventHandler } from 'react';
import { Expand, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Product } from '@/types';
import Currency from '@/components/ui/Currency';
import IconButton from '@/components/ui/IconButton';
import usePreviewModal from '@/hooks/use-preview-modal';
import useCart from '@/hooks/use-cart';

interface ProductCard {
  data: Product;
}

const ProductCard: React.FC<ProductCard> = ({
  data
}) => {

  // Use custom hook to access and manipulate the preview modal state
  const previewModal = usePreviewModal();

  // Create router object to perform client-side navigation
  const router = useRouter();

  // On click navigate to individual product page
  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  }

  // Define mouse event handler for the preview button
  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    // Prevent the event from bubbling up to the parent elements
    event.stopPropagation();

    // Display preview modal with the product data
    previewModal.onOpen(data);
  }


  return (
    <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      {/* Images & Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={data?.images?.[0]?.url}
          fill
          alt="Product Image"
          className='aspect-square object-cover rounded-md'
        />
        <div className='opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5'>
          <div className='flex gap-x-6 justify-center'>
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={() => { }}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className='font-semibold text-lg'>
          {data.name}
        </p>
        <p className='text-sm text-gray-500'>
          {data.category?.name}
        </p>
      </div>
      {/* Price */}
      <div className='flex items-center justify-between'>
        <Currency value={data?.price} />
      </div>
    </div>
  )
}

export default ProductCard