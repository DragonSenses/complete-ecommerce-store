import prismadb from "@/lib/prismadb";

/**
 * Get graph revenue for a given store
 * @param storeId - The ID of the store to query
 * @returns the data on revenue
 */
export default async function getGraphRevenue(storeId: string) {
  // Query database for orders & product items that have been paid for
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId: storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  return paidOrders;
};
