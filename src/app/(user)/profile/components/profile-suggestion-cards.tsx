import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Image, Phone, User } from "lucide-react";

const ProfileSuggestionCards = () => {
  const content = [
    {
      id: 1,
      title: "Add bio",
      desc: "Tell our networks a bit about yourself.",
      icon: User,
      buttonText: "Add bio",
    },
    {
      id: 2,
      title: "Add Profile",
      desc: "Upload your profile photo ",
      icon: Camera,
      buttonText: "Upload",
    },
    {
      id: 3,
      title: "Add Phone",
      desc: "Add your phone number.",
      icon: Phone,
      buttonText: "Add phone",
    },
    {
      id: 4,
      title: "Add banner",
      desc: "Upload your profile banner.",
      icon: Image,
      buttonText: "Add banner",
    },
  ];
  return (
    <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {content?.map(({ icon: Icon, desc, id, title, buttonText }) => (
        <Card className="rounded-[20px]" key={id}>
          <CardContent className="p-6 flex flex-col items-center justify-center gap-2">
            <div className="bg-red-100 h-[40px] w-[40px] rounded-full flex justify-center items-center">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-center text-[10px] lg:text-[12px] text-slate-600">
              {desc}
            </p>
            <Button
              variant="primary"
              size="sm"
              className="rounded-[20px]"
              disabled={false}
            >
              {buttonText}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProfileSuggestionCards;
