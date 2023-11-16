import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET (
  req: Request,
  { params }: { params: { categoryId: string }}
){
  try {
    // Check parameters
    if (!params.categoryId){
      return new NextResponse("Category ID is required", { status: 400 });
    }

    // Find the specific Category in the database
    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        billboard: true,
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function PATCH (
  req: Request,
  { params }: { params: { storeId: string, categoryId: string }}
){
  try {
    // Check parameters
    if (!params.storeId){
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!params.categoryId){
      return new NextResponse("Category ID is required", { status: 400 });
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
    const { name, billboardId } = body;

    // Check data
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
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

    // Find and Update a specific Category
    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId
      },
      data: {
        name,
        billboardId,
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE (
  req: Request,
  { params }: { params: { storeId: string, categoryId: string }}
){
  try {
    // Check parameters
    if (!params.storeId){
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!params.categoryId){
      return new NextResponse("Category ID is required", { status: 400 });
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

    // Find and delete a specifc category
    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};