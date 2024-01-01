import prismadb from "@/lib/prismadb";

/**
 * Calculate the total revenue of a given store
 * @param storeId - Unique identifier for the given store
 * @returns the total revenue of every paid order for a given store
 */
export default async function getTotalRevenue(storeId: string) {
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
