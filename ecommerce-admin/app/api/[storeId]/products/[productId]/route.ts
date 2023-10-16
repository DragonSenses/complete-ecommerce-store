import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET (
  req: Request,
  { params }: { params: { productId: string }}
){
  try {
    // Check parameters
    if (!params.productId){
      return new NextResponse("Product ID is required", { status: 400 });
    }

    // Find the specific product in database
    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function PATCH (
  req: Request,
  { params }: { params: { storeId: string, productId: string }}
){
  try {
    // Check parameters
    if (!params.storeId){
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!params.productId){
      return new NextResponse("product ID is required", { status: 400 });
    }

    // Authenticate userId with Clerk to check if user is logged-in
    const { userId } = auth();
    
    // If userId does not exist send back 401 response
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    // Extract body from the request
    const body = await req.json();
    
    // Destructure data from body
    const { name, value } = body;

    // Check data
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
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

    // Find and Update a specific product
    const product = await prismadb.product.updateMany({
      where: {
        id: params.productId
      },
      data: {
        name,
        value
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[product_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE (
  req: Request,
  { params }: { params: { storeId: string, productId: string }}
){
  try {
    // Check parameters
    if (!params.storeId){
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!params.productId){
      return new NextResponse("product ID is required", { status: 400 });
    }

    // Authenticate userId with Clerk to check if user is logged-in
    const { userId } = auth();
    
    // If userId does not exist send back 401 response
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
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

    // Find and Delete product
    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[product_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};