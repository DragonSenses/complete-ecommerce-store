import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
) {
  try {
    // Use Clerk to authenticate POST route
    const { userId } = auth();
    // Now have access to currently logged-in userId who is trying to create a new store using our API

    // Send back 401 Unauthorized if userId does not exist
    if(!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
  } catch (error){
    console.log('[STORES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}