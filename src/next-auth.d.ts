import { AccountType } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: AccountType;
  avatar: string;
};
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

import "@auth/core/jwt";

declare module "@auth/core/jwt" {
  interface JWT {
    role?: AccountType;
  }
}
