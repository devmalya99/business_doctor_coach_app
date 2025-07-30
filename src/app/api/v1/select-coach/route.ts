import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

import { handleCors, corsHeaders } from "@/lib/cors";

export async function OPTIONS(req: NextRequest) {
  return handleCors(req);
}

export async function POST(req: NextRequest) {
  const cors = await handleCors(req);
  if (cors) return cors;

  try {
    const body = await req.json();
    const { coachId, clientId } = body;

    if (!coachId || !clientId) {
      return new NextResponse(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: corsHeaders }
      );
    }

    //check if coach exists
    const coach = await db.user.findUnique({
      where: { clerkUserId: coachId },
    });

    if (!coach) {
      return NextResponse.json(
        {
          error: "Coach not found",
        },
        {
          status: 404,
          headers: corsHeaders,
        }
      );
    }

    //update coach clientID array
    const updatedCoach = await db.user.update({
      where: { clerkUserId: coachId },
      data: {
        clientIds: {
          set: Array.from(new Set([...(coach.clientIds || []), clientId])),
        },
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: "Client added to coach successfully",
        coach: updatedCoach,
      }),
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}
