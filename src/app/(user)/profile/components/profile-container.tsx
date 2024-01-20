// Packages
import { User } from "@prisma/client";

// Local Imports
import { auth } from "@/auth";
import CardOpacityTransition from "@/framer/card-opacity";
import { prismaDb } from "@/lib/db";
import MySelfCard from "./my-self-card/my-self-card";
import ProfileStatus from "./profile-status";
import QuizHistory from "./quiz-history/quiz-history";
import QuizMonthSummary from "./quiz-month-summary/quiz-month-summary";
import QuizReportSummary from "./quiz-report-summary/quiz-report-summary";

const ProfileContainer = async () => {
  const authUser = await auth();
  const user = await prismaDb.user.findUnique({
    where: {
      email: authUser?.user?.email as string,
    },
  });

  return (
    <div className="min-h-[80vh]">
      <div className="grid grid-cols-12 gap-4 gap-y-8 md:gap-8 container py-[20px]">
        <div className="col-span-12 md:col-span-6 lg:col-span-5  ">
          <CardOpacityTransition>
            <MySelfCard user={user as User} />
          </CardOpacityTransition>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-7 h-fit ">
          <CardOpacityTransition>
            <ProfileStatus user={user as User} />
          </CardOpacityTransition>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 gap-y-8 md:gap-8 container py-[20px]">
        <div className="col-span-12 md:col-span-6 lg:col-span-5  ">
          <CardOpacityTransition>
            <QuizReportSummary user={user as User} />
          </CardOpacityTransition>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-7 h-fit ">
          <CardOpacityTransition>
            <QuizMonthSummary />
          </CardOpacityTransition>
        </div>
        <div className="col-span-12">
          <QuizHistory />
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
