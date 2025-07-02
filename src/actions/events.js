"use server";
import { auth } from "@clerk/nextjs/server";

export async function createEvent(data) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  console.log("creating event for:", userId);

  // You can now safely save `userId` with the event in the DB
  return { success: true };
}
