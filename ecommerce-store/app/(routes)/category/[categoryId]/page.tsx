import React from 'react';

import getProducts from '@/actions/getProducts';
import getSizes from '@/actions/getSizes';
import getColors from '@/actions/getColors';
import getCategory from '@/actions/getCategory';
import Billboard from '@/components/Billboard';
import Container from '@/components/ui/Container';
import NoResults from '@/components/ui/NoResults';

import Filter from './components/Filter';

// Revalidate the page on every request, purge cache & fetch latest data
export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  },
  searchParams: {
    colorId: string;
    sizeId: string;
  }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams
}) => {

  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });
  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);

  return (
    <div className='bg-white'>
      <Container>
        <Billboard
          data={category.billboard}
        />
        <div className='px-4 sm:px-6 lg:px-8 pb-24'>
          <div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
            {/* Mobile Filters */}
            {/* Desktop Filters */}
            <div className='hidden lg:block'>
              <Filter
                valueKey="sizeId"
                name="Sizes"
                data={sizes}
              />
              <Filter
                valueKey="colorId"
                name="Colors"
                data={colors}
              />
            </div>
            <div className='mt-6 lg:col-span-4 lg:mt-0'>
              {products.length == 0 && <NoResults />}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CategoryPage