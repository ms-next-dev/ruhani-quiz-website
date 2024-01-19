"use server";
// Packages
import * as z from "zod";

// Local Imports
import { NewPasswordSchema, ResetPasswordSchema } from "@/Schemas";
import { auth } from "@/auth";
import { prismaDb } from "@/lib/db";
import md5 from "md5";

export const emailVerify = async (
  values: z.infer<typeof ResetPasswordSchema>
) => {
  const validatingFields = ResetPasswordSchema.safeParse(values);
  const authUser = await auth();
  const loggedInUser = authUser?.user;

  if (!validatingFields.success) {
    return { error: "Invalid field!" };
  }

  const { email } = validatingFields.data;

  if (email !== loggedInUser?.email) {
    return { error: "You entered different email. Not used for login!" };
  }

  try {
    await prismaDb.user.findUnique({
      where: {
        email: email,
        AND: {
          role: "member",
        },
      },
    });

    return { success: "Email verified!" };
  } catch (error) {
    console.log("Email_VERIFY_SERVER_ACTION", error);
    return { error: "Email verification failed!" };
  }
};

export const passwordReset = async (
  values: z.infer<typeof NewPasswordSchema>
) => {
  const validatingFields = NewPasswordSchema.safeParse(values);
  const authUser = await auth();
  const email = authUser?.user?.email;

  if (!authUser) {
    return { error: "Please login again!" };
  }

  if (!validatingFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password, confirmPassword } = validatingFields.data;

  if (password !== confirmPassword) {
    return { error: "Password does not match!" };
  }

  const hashedPassword = md5(password);

  try {
    await prismaDb.user.update({
      where: {
        email: email!,
      },
      data: {
        password: hashedPassword,
      },
    });

    return { success: "Password updated!" };
  } catch (error) {
    console.log("PASSWORD_RESET_SERVER_ACTION", error);
    return { error: "Failed to reset password!" };
  }
};
