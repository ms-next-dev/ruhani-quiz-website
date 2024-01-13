import { Card, CardContent } from "@/components/ui/card";

const ProfileStatus = () => {
  return (
    <Card className="rounded-[20px]">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Complete your profile</h3>
          <p className="text-[14px] max-w-[500px] text-slate-600">
            Your profile is 45% complete. Complete it now to maximize your
            experience and make the most of our platform's capabilities
          </p>
        </div>
        <div>
          <div
            className="progress-bar flex justify-center items-center"
            role="progressbar"
            aria-valuenow={75}
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

export default ProfileStatus;
