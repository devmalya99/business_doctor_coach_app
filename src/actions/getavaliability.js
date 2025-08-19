"use server";

import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";

export async function getUser(clerkid) {

    if(!clerkid) return null
  const user = await db.user.findUnique({
        where:{clerkUserId:clerkid}
  })

  return user
}


export async function getusersavailability(id){
    if(!id) return null
    
    const availability = await db.availability.findUnique({
        where:{userId:id}
    })
    return availability
}
