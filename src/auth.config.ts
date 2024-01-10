// Packages
import { AccountType } from "@prisma/client";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Local Imports
import { LoginSchema } from "./Schemas";
import { prismaDb } from "./lib/db";

// Local Imports

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password, role } = validatedFields.data;
          const user = await prismaDb.user.findUnique({
            where: {
              email,
              role: role as AccountType,
            },
          });

          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
