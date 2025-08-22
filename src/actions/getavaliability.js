"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getUser(clerkid) {
  if (!clerkid) return null;
  const user = await db.user.findUnique({
    where: { clerkUserId: clerkid },
  });

  return user;
}

export async function getusersavailability(id) {
  if (!id) return null;

  const availability = await db.availability.findUnique({
    where: { userId: id },
  });
  return availability;
}

export async function onboardprocess(data) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: { availability: true },
  });
  console.log(user);
  if (!user) {
    throw new Error("User not found");
  }

  // Extract profile fields
  const { industry, experience, bio, timeGap, ...daysData } = data;

  // Convert days into availability array
  const availabilityData = Object.entries(daysData).flatMap(
    ([day, { isAvailable, startTime, endTime }]) => {
      if (isAvailable) {
        const baseDate = new Date().toISOString().split("T")[0]; // e.g. "2025-08-21"
        return [
          {
            day: day.toUpperCase(),
            startTime: new Date(`${baseDate}T${startTime}:00Z`),
            endTime: new Date(`${baseDate}T${endTime}:00Z`),
          },
        ];
      }
      return [];
    }
  );

  // First update user profile fields
  await db.user.update({
    where: { id: user.id },
    data: {
      industry,
      experience,
      bio,
      isOnboarded: true,
      // achievements,
    },
  });

  // Then update or create availability
  if (user.availability) {
    await db.availability.update({
      where: { id: user.availability.id },
      data: {
        timeGap,
        days: {
          deleteMany: {}, // remove old days
          create: availabilityData, // insert new days
        },
      },
    });
  } else {
    await db.availability.create({
      data: {
        userId: user.id,
        timeGap,
        days: {
          create: availabilityData,
        },
      },
    });
  }

  return { success: true };
}
