import prismadb from "@/lib/prismadb";

/**
 * Retrieve the total count of sales of a given store
 * @param storeId - Unique identifier for the given store
 * @returns the sales count for a given store
 */
export default async function getSalesCount(storeId: string) {
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

  // Sum up the product prices of all paid orders
  const totalRevenue = paidOrders.reduce((total, order) => {
    // Sum up the product prices of each order item
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.product.price.toNumber();
    }, 0)
    return total + orderTotal;
  }, 0);

  return totalRevenue;
};
