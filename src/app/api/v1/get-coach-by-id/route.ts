import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { handleCors, corsHeaders } from "@/lib/cors";

export async function OPTIONS(req: Request) {
  return handleCors(req);
}

export async function POST(req: Request) {
  const cors = await handleCors(req);
  if (cors) return cors;

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

    return new NextResponse(
      JSON.stringify({ coach }),
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("Fetch Coach Error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}
