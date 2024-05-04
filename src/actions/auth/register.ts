"use server";

// Packages
import { AccountType } from "@prisma/client";
import md5 from "md5";
import * as z from "zod";

// Local Imports
import { RegistrationSchema } from "@/Schemas";
import { getUserByEmail } from "@/data/user";
import { prismaDb } from "@/lib/db";
import { sentVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";

/**
 * register is a server action
 * Used for user registration
 */
export const register = async (data: z.infer<typeof RegistrationSchema>) => {
  // Parse the data from registration schema
  const validatedFields = RegistrationSchema.safeParse(data);

  // checking all the schema fields are valid
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, name, password, role } = validatedFields.data;

  // Hash password using md5 password hashing package manager
  const hashedPassword = md5(password);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  // Database operation to create a new user
  await prismaDb.user.create({
    data: {
      email: email,
      name: name,
      password: hashedPassword,
      role: role as AccountType,
    },
  });

  // Generate a verificatio token and sent a email to the user
  const verificationToken = await generateVerificationToken(email);
  await sentVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
