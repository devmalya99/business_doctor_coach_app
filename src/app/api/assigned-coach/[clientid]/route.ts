import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";



export async function GET(
  req: Request,
  { params }: { params: Promise<{ clientid: string }> }
) {
  try {
    const { clientid } = await params;
    console.log(clientid);
    const coaches = await db.user.findMany({
      where: {
        role: "coach",
        clientIds: {
          has: clientid, // ✅ checks if array contains the given value
        },
      },
      include: {
        availability: true,
        events: true,
        bookings: true,
      },
    });
    console.log(coaches);
    return NextResponse.json({ coaches }, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // 🛑 For public API (or replace * with frontend origin)
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error("Error fetching coaches:", error);
    return NextResponse.json(
      { error: "Failed to fetch coaches" },
      { status: 500 }
    );
  }
}
