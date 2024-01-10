import { PrismaAdapter } from "@auth/prisma-adapter";
import { AccountType } from "@prisma/client";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import { prismaDb } from "./lib/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      const existingUser = await getUserById(user.id);
      if (!existingUser) {
        return false;
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as AccountType;
      }

      if (token.avatar && session.user) {
        session.user.avatar = token.avatar as string;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token?.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      token.avatar = existingUser.avatar;

      return token;
    },
  },
  adapter: PrismaAdapter(prismaDb),
  session: { strategy: "jwt" },
  ...authConfig,
});
