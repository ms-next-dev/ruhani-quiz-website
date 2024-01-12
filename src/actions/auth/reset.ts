"use server";
import { ResetPasswordSchema } from "@/Schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";
import * as z from "zod";

export const reset = async (values: z.infer<typeof ResetPasswordSchema>) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email" };
  }
  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }
  // TODO: Generate token & send email
  const resetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(resetToken.email, resetToken.token);

  return { success: "Reset email sent!" };
};
