import prismadb from "@/lib/prismadb";

/**
 * Get monthly revenue data for a given store
 * @param storeId - The ID of the store to query
 * @returns revenue data
 */
export default async function getGraphRevenue(storeId: string) {
  // Fetch all paid orders and their associated products for the store
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

  // Initialize an empty oobject to store the monthly revenue data
  const monthlyRevenue: { [key: number]: number } = {};

  // Loop through each order and calculate its revenue
  for (const order of paidOrders) {
    // Get the month number from the order creation date
    const month = order.createdAt.getMonth();
    // Initialize a variable to store the revenue for this order
    let revenueForOrder = 0;

    // Loop through each item in the order and add its product price to the revenue
    for (const item of order.orderItems) {
      revenueForOrder += item.product.price.toNumber();
    }

    // Add the revenue for this order to the corresponding month in the monthly
    // revenue object. If its not available by default then use 0 as the default value.
    // Add the revenue from the order.
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }
};
