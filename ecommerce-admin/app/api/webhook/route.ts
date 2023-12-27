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
  

}