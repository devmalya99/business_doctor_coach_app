import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { handleCors, corsHeaders } from "@/lib/cors";

export async function OPTIONS(req: NextRequest) {
  return handleCors(req);
}

export async function POST(req: NextRequest) {
  const corsResponse = await handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const body = await req.json();
    const { coachId } = body;

    if (!coachId) {
      return new NextResponse(
        JSON.stringify({ error: "Missing coachId" }),
        { status: 400, headers: corsHeaders }
      );
    }

    const coach = await db.user.findUnique({
      where: { clerkUserId: coachId },
    });

    if (!coach) {
      return new NextResponse(
        JSON.stringify({ error: "Coach not found" }),
        { status: 404, headers: corsHeaders }
      );
    }

     return NextResponse.json({ coach }, { headers: corsHeaders });

  } catch (error) {
    console.error("Fetch Coach Error:", error);
      return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400, headers: corsHeaders }
    );
  }
}
