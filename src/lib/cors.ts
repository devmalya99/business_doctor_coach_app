// lib/cors.ts
// lib/cors.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // 🔒 Use your domain in prod
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function handleCors(req: NextRequest) {
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  return undefined; // means continue to actual handler
}
