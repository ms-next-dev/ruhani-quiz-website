// Packages
import dynamic from "next/dynamic";

// Local Imports
import { User } from "@prisma/client";
import { useMemo } from "react";
import ProfileSuggestionCards from "./profile-suggestion/profile-suggestion-cards";
const EmailVerificationCard = dynamic(
  () => import("./email-verification-card")
);

const ProfileCompletionCard = dynamic(
  () => import("./profile-completion-card")
);

interface ProfileStatusProps {
  user: User;
}

const ProfileStatus: React.FC<ProfileStatusProps> = async ({ user }) => {
  const emailVerified = useMemo(() => {
    if (user.emailVerified) {
      return true;
    }
    return false;
  }, [user.emailVerified]);

  return (
    <section className="flex flex-col gap-8 ">
      {emailVerified ? (
        <ProfileCompletionCard user={user} />
      ) : (
        <EmailVerificationCard email={user?.email as string} />
      )}

      <ProfileSuggestionCards user={user as User} />
    </section>
  );
};

export default ProfileStatus;
