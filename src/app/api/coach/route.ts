// app/api/coach/route.ts

import { NextResponse } from 'next/server';
import { db } from "@/lib/prisma"

export async function GET() {
  try {
    const users = await db.user.findMany({
      include: {
        availability: true,
        events: true,
        bookings: true
      }
    });

    return NextResponse.json({ users }, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
