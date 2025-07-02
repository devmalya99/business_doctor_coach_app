"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

// helper function to generate random suffix
function generateSuffix(length = 4) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let suffix = "";
  for (let i = 0; i < length; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return suffix;
}

/**
 * Updates the username of a user in the database by appending a random suffix for uniqueness.
 * 
 * @param {Object} param0 - The input object.
 * @param {string} param0.username - The desired username to be updated.
 * @param {string} param0.userId - The unique identifier of the user.
 * 
 * @returns {Promise<Object>} An object containing the success status and the final username.
 */

export async function updateUsername({ username, userId }) {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!username || username.trim() === "") {
    throw new Error("Username cannot be empty");
  }

  // Append random suffix to ensure uniqueness
  let finalUsername = `${username}-${generateSuffix()}`;

  // Ensure uniqueness in DB
  let attempt = 0;
  while (await db.user.findUnique({ where: { username: finalUsername } })) {
    finalUsername = `${username}-${generateSuffix()}`;
    attempt++;
    if (attempt > 5) throw new Error("Too many username collisions");
  }

  // Save to DB only
  await db.user.update({
    where: { clerkUserId: userId },
    data: { username: finalUsername },
  });

  return { success: true, username: finalUsername };
}
