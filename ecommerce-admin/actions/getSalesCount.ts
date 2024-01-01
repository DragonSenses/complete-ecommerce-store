import prismadb from "@/lib/prismadb";

/**
 * Get the number of orders that have been paid for a given store
 * @param storeId - The ID of the store to query
 * @returns the sales count as a number
 */
export default async function getSalesCount(storeId: string) {
  // Use prismadb to count the paid orders that match the storeId
  const salesCount = await prismadb.order.count({
    where: {
      storeId: storeId,
      isPaid: true,
    },
  });

  return salesCount;
};
