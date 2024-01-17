// Packages
import { User } from "@prisma/client";

// Local Imports
import { auth } from "@/auth";
import { prismaDb } from "@/lib/db";
import MySelfCard from "./my-self-card/my-self-card";
import ProfileStatus from "./profile-status";

const ProfileContainer = async () => {
  const authUser = await auth();
  const user = await prismaDb.user.findUnique({
    where: {
      email: authUser?.user?.email as string,
    },
  });

  return (
    <div className="grid grid-cols-12 gap-8 container min-h-[80vh]  py-[20px]">
      <div className="col-span-12 md:col-span-6 lg:col-span-5">
        <MySelfCard user={user as User} />
      </div>
      <div className="col-span-12 md:col-span-6 lg:col-span-7 ">
        <ProfileStatus user={user as User} />
      </div>
    </div>
  );
};

export default ProfileContainer;
