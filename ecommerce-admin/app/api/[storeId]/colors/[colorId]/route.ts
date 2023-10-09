import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET (
  req: Request,
  { params }: { params: { sizeId: string }}
){
  try {
    // Check parameters
    if (!params.sizeId){
      return new NextResponse("Size ID is required", { status: 400 });
    }

    // Find the specific Size in database
    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId,
      }
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function PATCH (
  req: Request,
  { params }: { params: { storeId: string, sizeId: string }}
){
  try {
    // Check parameters
    if (!params.storeId){
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!params.sizeId){
      return new NextResponse("Size ID is required", { status: 400 });
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

    // Find and Update a specific Size
    const size = await prismadb.size.updateMany({
      where: {
        id: params.sizeId
      },
      data: {
        name,
        value
      }
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE (
  req: Request,
  { params }: { params: { storeId: string, sizeId: string }}
){
  try {
    // Check parameters
    if (!params.storeId){
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!params.sizeId){
      return new NextResponse("Size ID is required", { status: 400 });
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

    // Find and Delete Size
    const size = await prismadb.size.deleteMany({
      where: {
        id: params.sizeId
      }
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};