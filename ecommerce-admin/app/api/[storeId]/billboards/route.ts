// Global Imports
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
) {
  try {
    // Use Clerk to authenticate POST route
    const { userId } = auth();
    // Now have access to currently logged-in userId who is trying to create a new store using our API

    // Extract the body
    const body = await req.json();

    // Destructure name out of body
    const { name } = body;

    // Send back 401 Unauthorized if userId does not exist
    if(!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    // Check name field
    if(!name){
      return new NextResponse("Name is required", { status: 400 });
    }

    // Create store with data passed in
    const store = await prismadb.store.create({
      data: {
        name,
        userId
      }
    });

    // Send back response with the store
    return NextResponse.json(store);
  } catch (error){
    console.log('[STORES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}