import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

/**
 * Handles a POST request from a Stripe webhook and updates the order and 
 * product data accordingly.
 * @param req - the POST request
 * @returns A NextResponse object with a status code of 200 if successful, or 400
 *          if an error occurs
 */
export async function POST(req: Request) {
  // Get the request body as a string
  const body = await req.text();

  // Verify the event came from Stripe
  // Get signature from the request headers
  const signature = headers().get("Stripe-Signature") as string;

  // Declare a variable to store the Stripe event
  let event: Stripe.Event;

  try {
    // Construct the event from the body, signature, and webhook secret
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    // On error, return a response with the error message and a status code of 400
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // If the event is successfully constructed, get the checkout session 
  // object from the event data
  const session = event.data.object as Stripe.Checkout.Session;

  // Get the customer address from the session object, if it exists
  const address = session?.customer_details?.address;

  // Extract customer's shipping address details after a checkout session
  const addressAttributes = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  // Consolidate each property of address to a single string
  // Filter out any null values and join the remaining attributes with commas
  const addressString = addressAttributes
    .filter((attribute) => attribute !== null)
    .join(", ");

  // Check for successful payment event, if so then update the order status
  if (event.type === "checkout.session.completed") {
    // Update the order record in the database with the payment status, 
    // address, and phone number
    const order = await prismadb.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || "",
      },
      include: {
        orderItems: true,
      },
    });

    // Get the product IDs from the order items
    const productIds = order.orderItems.map(
      (orderItem) => orderItem.productId
    );

    // Archive the ordered products from the database by setting the isArchived field to true
    await prismadb.product.updateMany({
      where: {
        id: {
          in: [...productIds],
        },
      },
      data: {
        isArchived: true,
      },
    });
  }

  // Return a response with a status code of 200 and a null body
  return new NextResponse(null, { status: 200 });
}
