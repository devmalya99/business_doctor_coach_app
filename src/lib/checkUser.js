import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export const checkUser = async () => {
 

   const user = await currentUser();

  if (!user) return null;

  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
  const imageUrl = user.imageUrl;
  const clerkUserId = user.id;

  try {
    const loggedInUser = await db?.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

       if (loggedInUser) {
      // Update DB if Clerk name or image has changed
      const needsUpdate =
        loggedInUser.name !== fullName || loggedInUser.imageUrl !== imageUrl;

      if (needsUpdate) {
        const updatedUser = await db.user.update({
          where: { clerkUserId },
          data: {
            name: fullName,
            imageUrl,
          },
        });

        return updatedUser;
      }

      return loggedInUser;
    }

    const name = `${user.firstName} ${user.lastName}`;

    // await clerkClient().users.updateUser(user.id, {
    //   username: name.split(" ").join("-") + user.id.slice(-4),
    // });//issue with versions updating clerk data

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
        username: name.split(" ").join("-") + user.id.slice(-4),
      },
    });

    return newUser;
  } catch (error) {
    console.log(error);
  }
};