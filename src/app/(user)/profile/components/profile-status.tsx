import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProfileSuggestionCards from "./profile-suggestion-cards";

const ProfileStatus = () => {
  return (
    <section className="flex flex-col gap-8">
      <ProfileCompletionCard />
      {/* <EmailVerificationCard /> */}
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

const EmailVerificationCard = () => {
  return (
    <Card className="rounded-[20px]">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Please verify your email</h3>
          <p className="text-[12px] lg:text-[14px] max-w-[500px] text-slate-600">
            Welcome! 🌟 Verify your email to unlock quizzes. Check inbox/spam.
            Let's start quizzing!
          </p>
        </div>
        <div>
          <Button variant="primary" className="rounded-[10px]">
            Send Email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
