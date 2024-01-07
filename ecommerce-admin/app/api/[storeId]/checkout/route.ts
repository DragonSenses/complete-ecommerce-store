import Stripe from 'stripe';
import { NextResponse } from 'next/server';

import NextCors from 'nextjs-cors';
var cors = require('cors');

import { stripe } from '@/lib/stripe';
import prismadb from '@/lib/prismadb';

// Configure the CORS policy by setting HTTP response headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Initialize the cors middleware
const corsMiddleware = cors({
  origin: "http://localhost:3001", // The origin of frontend app
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // The HTTP methods to allow
  allowedHeaders: ['Content-Type', 'Authorization'], // The headers to allow
  optionsSuccessStatus: 200 // The status code to send for OPTIONS requests
});

// Wrap the cors middleware in a promise
const runCors = (req: Request, res: Response) => {
  return new Promise((resolve, reject) => {
    corsMiddleware(req, res, (result: Error) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  res: Response,
  { params }: { params: { storeId: string } }
) {
  // Run the cors middleware before handling the request
  await runCors(req, res);

  const { productIds } = await req.json();

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product IDs are required", { status: 400 });
  }

  // Fetch products by IDs in checkout route
  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });

  // Create an array of line items which represents a product that customer is purchasing
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  // Populate the array with each product
  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'USD',
        product_data: {
          name: product.name,
        },
        unit_amount: product.price.toNumber() * 100
      }
    });
  });

  // Create the order in the database
  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId
            }
          }
        }))
      }
    }
  });

  // Use line items to create the checkout session using Stripe API
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true
    },
    success_url: '${process.env.FRONTEND_STORE_URL}/cart?success=1',
    cancel_url: '${process.env.FRONTEND_STORE_URL}/cart?canceled=1',
    metadata: {
      orderId: order.id
    }
  });

  return NextResponse.json({ url: session.url }, { headers: corsHeaders });
}