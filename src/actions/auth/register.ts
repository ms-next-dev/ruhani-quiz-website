"use server";

// Packages
import { AccountType } from "@prisma/client";
import * as z from "zod";

// Local Imports
import { RegistrationSchema } from "@/Schemas";
import { getUserByEmail } from "@/data/user";
import { prismaDb } from "@/lib/db";
import { sentVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import md5 from "md5";

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

  const { email, first_name, password, role } = validatedFields.data;

  // Hash password using bcrypt package manager
  const hashedPassword = md5(password);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  // Database operation to create a new user
  await prismaDb.user.create({
    data: {
      email: email,
      first_name: first_name,
      password: hashedPassword,
      role: role as AccountType,
    },
  });

  // Generate a verificatio token and sent a email to the user
  const verificationToken = await generateVerificationToken(email);
  await sentVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
