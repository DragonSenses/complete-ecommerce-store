// Global Imports
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // Use Clerk to authenticate POST route
    const { userId } = auth();

    // Send back 401, unauthenticated if user is not logged-in
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    // Extract the body
    const body = await req.json();

    // Destructure fields out of body
    const { 
      name, 
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived
     } = body;

    // Check every required field
    if (!name){
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!price){
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!categoryId){
      return new NextResponse("Category ID is required", { status: 400 });
    }

    if (!colorId){
      return new NextResponse("Color ID is required", { status: 400 });
    }

    if (!sizeId){
      return new NextResponse("Size ID is required", { status: 400 });
    }

    if (!images || !images.length){
      return new NextResponse("Images are required", { status: 400 });
    }

    // Check if storeId exists
    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    // Check database if store exists for current user
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    // User is logged-in but does not have permission to modify the store
    if (!storeByUserId) {
      // Respond with 403 Forbidden, current user is unauthorized to modify
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Create product for user's specific store in the database
    const product = await prismadb.product.create({
      data: {
        name,
        value,
        storeId: params.storeId
      }
    });

    // Send back response with the product
    return NextResponse.json(product);
  } catch (error){
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // Check if storeId exists
    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    // Find all products available in that store in the database
    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId
      }
    });

    // Send back response with all products
    return NextResponse.json(products);
  } catch (error){
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}