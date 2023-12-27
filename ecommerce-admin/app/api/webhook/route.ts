import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import prismadb from '@/lib/prismadb';

/**
 * Handle the POST request and verify the webgook signature
 * @param req the POST request
 * @returns 
 */
export async function POST(req: Request) {
  const body = await req.text();

  // Verify the event came from Stripe
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    // On error, log and return the error message
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // Successfully constructed event

  // Save the event as a Stripe checkout session
  const session = event.data.object as Stripe.Checkout.Session;
  
  // Extract address from the checkout session using customer details
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
  const addressString = addressAttributes
    .filter((attribute) => attribute !== null)
    .join(', ');


  // Check for successful payment event, if so then update the order status
  if (event.type === "checkout.session.completed") {
    const order = await prismadb.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: phone || ''
      },
      include: {
        orderItems: true,
      }
    });
  }
}