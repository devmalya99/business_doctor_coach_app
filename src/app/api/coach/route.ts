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

    // console.log(users)
     return new NextResponse(JSON.stringify({ users }), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // 🛑 For public API (or replace * with frontend origin)
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }

}
