"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { sentVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";

export const resendVerificationEmail = async (email: string) => {
  const existingToken = await getVerificationTokenByEmail(email);
  const existingUser = await getUserByEmail(email);

  if (existingUser?.emailVerified) {
    return { success: "Email verified successfully!" };
  }

  if (existingToken) {
    const tokenExpired = new Date(existingToken.expires).getTime();
    const currentTime = new Date().getTime();
    const hasExpired = tokenExpired < currentTime;

    if (!hasExpired) {
      return {
        success:
          "Verification email already sent to your inbox. Please check inbox/spam!",
      };
    }

    const verificationToken = await generateVerificationToken(email);

    await sentVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Verification email sent" };
  }

  const verificationToken = await generateVerificationToken(email);

  await sentVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Verification email sent" };
};
