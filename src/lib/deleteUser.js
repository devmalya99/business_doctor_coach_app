import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export const deleteUser = async () => {
  const user = await currentUser();
  if (!user) return null;

  // Clerk user ID
  const clerkUserId = user.id;
  const email = user.emailAddresses[0]?.emailAddress;

  // Fetch from your DB to compare
  const loggedInUser = await db.user.findUnique({
    where: { email:email },
  });

//   console.log(loggedInUser.clerkUserId)
  if (!loggedInUser) {
    console.log("User not found in DB");
    return null;
  }
  // Compare email and Clerk ID
  if (email === loggedInUser.email && clerkUserId != loggedInUser.clerkUserId) {
    try {
      const deletedUser = await db.user.delete({
        where: { clerkUserId: loggedInUser.clerkUserId },
      });

      console.log("Deleted user:", deletedUser);
      return deletedUser;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("User deletion failed");
    }
  }

  return null;
};
