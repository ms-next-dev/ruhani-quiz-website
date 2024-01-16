import { User as UserModal } from "@prisma/client";
import BioCard from "./cards/bio-card";
import CoverPhotoUploadCardCopy from "./cards/cover-photo-upload-card copy";
import DesignationCard from "./cards/designation-card";
import DistrictCard from "./cards/district-card";
import EducationCard from "./cards/education-card";
import NameCard from "./cards/name-card";
import PhoneCard from "./cards/phone-card";
import ProfilePhotoUploadCard from "./cards/profile-photo-upload-card";
import VerificationCard from "./cards/verification-card";

interface ProfileSuggestionCardsProps {
  user: UserModal;
}

const ProfileSuggestionCards: React.FC<ProfileSuggestionCardsProps> = ({
  user,
}) => {
  // const content = [
  //   {
  //     id: 1,
  //     title: "Add name",
  //     desc: "Enter name to personalize profile.",
  //     icon: User,
  //     buttonText: "Enter name",
  //     completed: user.first_name || user.last_name,
  //     Action: <NameCard />,
  //   },
  //   {
  //     id: 2,
  //     title: "Verification",
  //     desc: "Complete your email verification",
  //     icon: Mail,
  //     buttonText: "Verify",
  //     completed: user.emailVerified,
  //     Action: <NameCard />,
  //   },
  //   {
  //     id: 3,
  //     title: "Add bio",
  //     desc: "Tell our networks a bit about yourself.",
  //     icon: GraduationCap,
  //     buttonText: "Add bio",
  //     completed: user.bio,
  //     Action: <NameCard />,
  //   },
  //   {
  //     id: 4,
  //     title: "Add Profile",
  //     desc: "Upload your profile photo ",
  //     icon: Camera,
  //     buttonText: "Upload",
  //     completed: user.avatar,
  //     Action: <NameCard />,
  //   },
  //   {
  //     id: 5,
  //     title: "Add Phone",
  //     desc: "Add your phone number.",
  //     icon: Phone,
  //     buttonText: "Add phone",
  //     completed: user.phone,
  //     Action: <NameCard />,
  //   },
  //   {
  //     id: 6,
  //     title: "Add banner",
  //     desc: "Upload your profile banner.",
  //     icon: Image,
  //     buttonText: "Add banner",
  //     completed: user.cover_photo,
  //     Action: <NameCard />,
  //   },

  //   {
  //     id: 7,
  //     title: "Education",
  //     desc: "Specify your education level.",
  //     icon: GraduationCap,
  //     buttonText: "Enter",
  //     completed: user.educational_qualification,
  //     Action: <NameCard />,
  //   },
  //   {
  //     id: 8,
  //     title: "Designation",
  //     desc: "Specify your current job title.",
  //     icon: Briefcase,
  //     buttonText: "Enter",
  //     completed: user.designation,
  //     Action: <NameCard />,
  //   },
  //   {
  //     id: 9,
  //     title: "District",
  //     desc: "Enter your residential district location.",
  //     icon: MapPin,
  //     buttonText: "Add Now",
  //     completed: user.district,
  //     Action: <NameCard />,
  //   },
  //   {
  //     id: 10,
  //     title: "Connect",
  //     desc: "Enter your social media account.",
  //     icon: Facebook,
  //     buttonText: "Connect",
  //     completed: user.connect,
  //     Action: <NameCard />,
  //   },
  // ];

  const content = [
    {
      id: 1,
      data: <NameCard user={user} />,
    },
    {
      id: 2,
      data: <VerificationCard user={user} />,
    },
    {
      id: 3,
      data: <BioCard user={user} />,
    },
    {
      id: 4,
      data: <ProfilePhotoUploadCard user={user} />,
    },
    {
      id: 5,
      data: <PhoneCard user={user} />,
    },
    {
      id: 6,
      data: <CoverPhotoUploadCardCopy user={user} />,
    },
    {
      id: 7,
      data: <EducationCard user={user} />,
    },
    {
      id: 8,
      data: <DesignationCard user={user} />,
    },
    {
      id: 9,
      data: <DistrictCard user={user} />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4">
      {/* {content
          ?.filter((item) => !item.completed)
          .slice(0, 4)
          .map(({ icon, desc, id, title, buttonText, Action, completed }) => (
            <ProfileSuggestionCard
              key={id}
              buttonText={buttonText}
              completed={!!completed}
              desc={desc}
              icon={icon}
              title={title}
              action={Action}
            />
          ))} */}
      {content?.map(({ data, id }) => (
        <div key={id}>{data}</div>
      ))}
    </div>
  );
};

export default ProfileSuggestionCards;
