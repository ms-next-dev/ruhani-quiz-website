import MySelfCard from "./my-self-card";
import ProfileStatus from "./profile-status";

const ProfileContainer = () => {
  return (
    <div className="grid grid-cols-12 gap-8 container min-h-[80vh]  py-[20px]">
      <div className="col-span-12 md:col-span-6 lg:col-span-5">
        <MySelfCard />
      </div>
      <div className="col-span-12 md:col-span-6 lg:col-span-7 ">
        <ProfileStatus />
      </div>
    </div>
  );
};

export default ProfileContainer;
