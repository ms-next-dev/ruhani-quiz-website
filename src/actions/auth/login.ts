"use server";
// Packages
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import * as z from "zod";

// Local Imports
import { LoginSchema } from "@/Schemas";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

/**
 * login is a server action
 * Used for user login like user verification, password matching and next auth login
 */
export const login = async (values: z.infer<typeof LoginSchema>) => {
  // Parse the parameters values from LoginSchema
  const validatedFields = LoginSchema.safeParse(values);

  // Checking if the alll schema is valid
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, role } = validatedFields.data;

  // Check if the user is exist on the database
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Account doesn't exist!" };
  }

  // Checking if the user password is correct
  const isPasswordMatched = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isPasswordMatched) {
    return { error: "Password mismatch!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      role,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return {
      success: "Login successful",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };

        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
};
