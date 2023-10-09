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
    const { name, value } = body;

    // Check name field
    if (!name){
      return new NextResponse("Name is required", { status: 400 });
    }

    // Check value field
    if (!value){
      return new NextResponse("Image URL is required", { status: 400 });
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

    // Create color for user's specific store in the database
    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId
      }
    });

    // Send back response with the color
    return NextResponse.json(color);
  } catch (error){
    console.log('[COLORS_POST]', error);
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

    // Find all colors available in that store in the database
    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId
      }
    });

    // Send back response with all colors
    return NextResponse.json(colors);
  } catch (error){
    console.log('[COLORS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}