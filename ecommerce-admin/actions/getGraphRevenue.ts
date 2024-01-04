import prismadb from "@/lib/prismadb";

/**
 * Get monthly revenue data for a given store
 * @param storeId - The ID of the store to query
 * @returns revenue data
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

  const monthlyRevenue: { [key: number]: number } = {};
};
