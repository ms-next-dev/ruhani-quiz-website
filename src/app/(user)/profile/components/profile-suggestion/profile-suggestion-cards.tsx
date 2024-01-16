// Packages
import { User as UserModal } from "@prisma/client";

// Local Imports
import { useMemo } from "react";
import BioCard from "./cards/bio-card";
import ConnectCard from "./cards/connect-card";
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
  const content = [
    {
      id: 1,
      data: <NameCard user={user} />,
      completed: !!user.first_name || !!user.last_name,
    },
    {
      id: 2,
      data: <VerificationCard user={user} />,
      completed: !!user.emailVerified,
    },
    {
      id: 3,
      data: <BioCard user={user} />,
      completed: !!user.bio,
    },
    {
      id: 4,
      data: <ProfilePhotoUploadCard user={user} />,
      completed: !!user.avatar,
    },
    {
      id: 5,
      data: <PhoneCard user={user} />,
      completed: !!user.phone,
    },
    {
      id: 6,
      data: <CoverPhotoUploadCardCopy user={user} />,
      completed: !!user.coverPhoto,
    },
    {
      id: 7,
      data: <EducationCard user={user} />,
      completed: !!user.educational_qualification,
    },
    {
      id: 8,
      data: <DesignationCard user={user} />,
      completed: !!user.designation,
    },
    {
      id: 9,
      data: <DistrictCard user={user} />,
      completed: !!user.district,
    },
    {
      id: 10,
      data: <ConnectCard user={user} />,
      completed: !!user.connect,
    },
  ];

  const items = useMemo(() => {
    let data = [];
    let completedItem = content.filter((item) => !item.completed).slice(0, 4);
    const incompletedItem = content.filter((item) => item.completed);

    if (completedItem.length < 4) {
      const inCompletedItemNeed = 4 - completedItem.length;
      const externelItem = incompletedItem.slice(0, inCompletedItemNeed);
      data = [...externelItem, ...completedItem];
    } else {
      data = completedItem;
    }
    return data;
  }, [content]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map(({ data, id }) => (
        <div key={id}>{data}</div>
      ))}
    </div>
  );
};

export default ProfileSuggestionCards;
