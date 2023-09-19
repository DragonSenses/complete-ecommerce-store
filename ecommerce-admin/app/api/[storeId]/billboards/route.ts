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
    // Now have access to currently logged-in userId who is trying to create a new store using our API

    // Extract the body
    const body = await req.json();

    // Destructure name out of body
    const { label, imageUrl } = body;

    // Send back 401 Unauthorized if userId does not exist
    if(!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    // Check label field
    if(!label){
      return new NextResponse("Label is required", { status: 400 });
    }

    // Check imageUrl field
    if(!imageUrl){
      return new NextResponse("Image URL is required", { status: 400 });
    }

    // Create store with data passed in
    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId
      }
    });

    // Send back response with the store
    return NextResponse.json(store);
  } catch (error){
    console.log('[STORES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}