// Packages
import { AccountType } from "@prisma/client";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

// Local Imports
import md5 from "md5";
import { LoginSchema } from "./Schemas";
import { prismaDb } from "./lib/db";

// Local Imports

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
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

                    // Database hashed password
                    const DBPassword = user.password;
                    // Hashing the current password
                    const currentPassword = md5(password);
                    // Checking the password is matched
                    const passwordMatch = currentPassword === DBPassword;

                    if (passwordMatch) return user;
                }
                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
