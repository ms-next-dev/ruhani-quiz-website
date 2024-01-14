import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { getUserByEmail } from "@/data/user";
import EmailVerificationCard from "./email-verification-card";
import ProfileSuggestionCards from "./profile-suggestion-cards";

const ProfileStatus = async () => {
  const authUser = await auth();
  const user = await getUserByEmail(authUser?.user?.email as string);

  const emailVerified = user?.emailVerified;

  return (
    <section className="flex flex-col gap-8">
      {emailVerified ? (
        <ProfileCompletionCard />
      ) : (
        <EmailVerificationCard email={user?.email as string} />
      )}

      <ProfileSuggestionCards />
    </section>
  );
};

export default ProfileStatus;

const ProfileCompletionCard = () => {
  return (
    <Card className="rounded-[20px]">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Complete your profile</h3>
          <p className="text-[12px] lg:text-[14px] max-w-[500px] text-slate-600">
            Your profile is 45% complete. Complete it now to maximize your
            experience and make the most of our platform's capabilities
          </p>
        </div>
        <div>
          <div
            className="progress-bar flex justify-center items-center"
            role="progressbar"
            aria-valuenow={45}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            45%
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
