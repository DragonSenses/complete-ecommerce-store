import React from 'react';

import getProduct from '@/actions/getProduct';
import getProducts from '@/actions/getProducts';
import Container from '@/components/ui/Container';

interface ProductPageProps {
  params: {
    productId: string;
  }
}

const ProductPage: React.FC<ProductPageProps> = async ({
  params
}) => {
  // Fetch the individual product
  const product = await getProduct(params.productId);

  // Fetch suggested products using the same category
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id
  })

  return (
    <div className='bg-white'>
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Gallery */}
            <div>Gallery</div>
            <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
              {/* Info */}
              Product Info
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ProductPage