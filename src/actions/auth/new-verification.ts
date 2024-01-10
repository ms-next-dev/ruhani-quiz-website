"use server";

// Local imports
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { prismaDb } from "@/lib/db";

/**
 * newVerification is a server action
 * Used for checking the email verification token
 */
export const newVerification = async (token: string) => {
  // get the verification token from database operation
  const existingToken = await getVerificationTokenByToken(token);

  // Checking if the verification token exists
  if (!existingToken) {
    return {
      error: "Token does not exist!",
    };
  }

  const tokenExpiredTime = new Date(existingToken.expires).getTime();
  const currentTime = new Date().getTime();

  // Check: if already token not expired
  const hasExpired = tokenExpiredTime < currentTime;

  if (hasExpired) {
    return {
      error: "Token has expired!",
    };
  }

  const existinUser = await getUserByEmail(existingToken.email!);

  if (!existinUser) {
    return {
      error: "Email does not exist!",
    };
  }

  await prismaDb.user.update({
    where: {
      id: existinUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existinUser.email,
    },
  });

  await prismaDb.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return {
    success: "Email verified",
  };
};
