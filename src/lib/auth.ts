import { auth } from "@clerk/nextjs/server";

export async function requireAdmin() {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const admins = process.env.ADMIN_USER_IDS?.split(",") || [];

  if (!admins.includes(userId)) {
    throw new Error("Forbidden");
  }
}