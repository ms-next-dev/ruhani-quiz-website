"use client";
// Packages
import { User } from "@prisma/client";

// Local Imports
import { Card, CardContent } from "@/components/ui/card";

interface ProfileCompletionCardProps {
  user: User;
}

const ProfileCompletionCard: React.FC<ProfileCompletionCardProps> = ({
  user,
}) => {
  // Required fields to complete profile 100%
  const requiredFields = [
    user.first_name,
    user.avatar,
    user.educational_qualification,
    user.designation,
    user.district,
    user.phone,
    user.connect,
    user.emailVerified,
    user.bio,
    user.coverPhoto,
  ];
  const totalFields = requiredFields.length;

  // Result of total completed fields
  const completedFields = requiredFields.filter(Boolean).length;

  // each fields percentage
  const eachFieldPercentage = Math.round(100 / totalFields);

  // total completed profile percentage
  const completed_percentage = completedFields * eachFieldPercentage;

  // Dynamic css of circle > progress-bar css located on globals.css
  const progressBarStyle = {
    "--progress": `${completed_percentage > 100 ? 100 : completed_percentage}%`,
    height: "80px",
    width: "80px",
    borderRadius: "50%",
  } as React.CSSProperties;

  return (
    <Card className="rounded-[20px]">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold ">Complete your profile</h3>
          <p className="text-[12px] lg:text-[14px] max-w-[500px] text-slate-600">
            Your profile is {completed_percentage}% complete. Complete it now to
            maximize your experience and make the most of our platform's
            capabilities
          </p>
        </div>
        <div>
          <div
            className="progress-bar flex justify-center items-center"
            role="progressbar"
            style={progressBarStyle}
            aria-valuenow={40}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {completed_percentage}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletionCard;
