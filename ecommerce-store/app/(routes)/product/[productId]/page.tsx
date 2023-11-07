import React from 'react';

interface ProductPageProps {
  params: {
    productId: string;
  }
}

const ProductPage: React.FC<ProductPageProps> = ({
  params
}) => {
  return (
    <div>Individual Product Page</div>
  )
}

export default ProductPage