import prismadb from "@/lib/prismadb";

/**
 * Calculate the total revenue of a store
 * @param storeId - Unique identifier for a store
 */
export const getTotalRevenue = async (storeId: string) => {

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

};
