"use server";

// Packages
import { AccountType } from "@prisma/client";
import bcrypt from "bcryptjs";
import * as z from "zod";

// Local Imports
import { RegistrationSchema } from "@/Schemas";
import { getUserByEmail } from "@/data/user";
import { prismaDb } from "@/lib/db";
import { sentVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";

export const register = async (data: z.infer<typeof RegistrationSchema>) => {
  const validatedFields = RegistrationSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, first_name, password, role } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await prismaDb.user.create({
    data: {
      email: email,
      first_name: first_name,
      password: hashedPassword,
      role: role as AccountType,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sentVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
