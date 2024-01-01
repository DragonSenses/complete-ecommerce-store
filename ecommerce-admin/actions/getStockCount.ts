import prismadb from "@/lib/prismadb";

/**
 * Get the count of available products in a given store's inventory. 
 * Only non-archived products are available.
 * @param storeId
 * @returns the count of available products in the store
 */
export default async function getStockCount(storeId: string) {
  // Query product table for the count of available products
  const stockCount = await prismadb.product.count({
    where: {
      storeId: storeId,
      isArchived: false,
    },
  });

  return stockCount;
};
