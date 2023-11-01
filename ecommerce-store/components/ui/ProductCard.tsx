"use client";

import React from 'react';

import { Product } from '@/types';

interface ProductCard {
  data: Product;
}

const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  return (
    <div>
      Product Card
    </div>
  )
}

export default ProductCard