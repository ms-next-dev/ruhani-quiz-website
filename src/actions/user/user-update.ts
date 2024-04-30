"use server";
// Packages
import { revalidatePath } from "next/cache";

// Local Imports
import { prismaDb } from "@/lib/db";

export const updateUser = async (data: any, userId: string) => {
  try {
    await prismaDb.user.update({
      where: {
        id: userId,
      },
      data: data,
    });

    revalidatePath("/profile");

    return { success: `Data updated successfully!` };
  } catch (error: any) {
    return { error: "Failed to Update your info!" };
  }
};
