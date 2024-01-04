import prismadb from "@/lib/prismadb";

interface GraphData {
  name: string;
  total: number;
}

/**
 * Get monthly revenue data for a given store
 * @param storeId - The ID of the store to query
 * @returns an array of graph data that contains the total monthly revenue
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

  // Initialize an empty object to store the monthly revenue data
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

    /* Add the revenue for this order to the corresponding month in the monthly 
    revenue object. If data for that month is not available then use 0 as 
    the default value. Add the revenue from the order. 
    */
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  // After populating monthly revenue data, transform it to GraphData

  // Initialize an array of GraphData that contains each month and a total of 0
  const monthlyGraphData: GraphData[] = [
    {name: "Jan", total: 0  },
    {name: "Feb", total: 0  },
    {name: "Mar", total: 0  },
    {name: "Apr", total: 0  },
    {name: "May", total: 0  },
    {name: "Jun", total: 0  },
    {name: "Jul", total: 0  },
    {name: "Aug", total: 0  },
    {name: "Sep", total: 0  },
    {name: "Oct", total: 0  },
    {name: "Nov", total: 0  },
    {name: "Dec", total: 0  },
  ];

  // For each month, set the GraphData total to their respective monthly revnue
  for (const month in monthlyRevenue) {
    monthlyGraphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return monthlyGraphData;
};
