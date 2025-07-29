// lib/cors.ts

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // 🔒 Use your domain in prod
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function handleCors(req: Request) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  return null; // means continue to actual handler
}
