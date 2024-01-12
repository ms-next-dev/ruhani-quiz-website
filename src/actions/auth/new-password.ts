"use server";

// Packages
import md5 from "md5";
import * as z from "zod";

// Local Imports
import { NewPasswordSchema } from "@/Schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { prismaDb } from "@/lib/db";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string
) => {
  // Validating schema
  const validatedFields = NewPasswordSchema.safeParse(values);

  // If schema not validated return a error
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { confirmPassword, password } = validatedFields.data;

  // Checking password and confirm password are matched
  if (password !== confirmPassword) return { error: "Password do not match" };

  // Get the token info from database
  const existingResetToken = await getPasswordResetTokenByToken(token);

  // if token does not exist on the database return a error
  if (!existingResetToken) {
    return { error: "Token does not exist!" };
  }

  const tokenExpiredTime = new Date(existingResetToken.expires).getTime();
  const currentTime = new Date().getTime();

  // Check: if already token not expired
  const tokenExpired = tokenExpiredTime < currentTime;

  // If token expired delete the existing token and return a error
  if (tokenExpired) {
    await prismaDb.passwordResetToken.delete({
      where: {
        id: existingResetToken.id,
      },
    });

    return { error: "Token expired! Please try again." };
  }

  // Hashing password for store on the database
  const hashedPassword = md5(password);

  // DB OPERATION: password update by email
  await prismaDb.user.update({
    where: {
      email: existingResetToken.email,
    },
    data: {
      password: hashedPassword,
    },
  });

  // DB OPERATION: Delete password reset token from database
  await prismaDb.passwordResetToken.delete({
    where: {
      id: existingResetToken.id,
    },
  });

  return {
    success:
      "password reset successfully! you will redirect to login within a few seconds",
  };
};
