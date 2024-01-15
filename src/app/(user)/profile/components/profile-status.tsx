// Packages
import dynamic from "next/dynamic";

// Local Imports
import { auth } from "@/auth";
import { prismaDb } from "@/lib/db";
import ProfileSuggestionCards from "./profile-suggestion-cards";
const EmailVerificationCard = dynamic(
  () => import("./email-verification-card")
);

const ProfileCompletionCard = dynamic(
  () => import("./profile-completion-card")
);

const ProfileStatus = async () => {
  const authUser = await auth();
  const user = await prismaDb.user.findUnique({
    where: {
      email: authUser?.user?.email as string,
    },
  });

  const emailVerified = user?.emailVerified;

  return (
    <section className="flex flex-col gap-8">
      {emailVerified ? (
        <ProfileCompletionCard user={user} />
      ) : (
        <EmailVerificationCard email={user?.email as string} />
      )}

      <ProfileSuggestionCards />
    </section>
  );
};

export default ProfileStatus;
