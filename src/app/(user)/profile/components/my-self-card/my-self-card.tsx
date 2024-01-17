// Packages
import { User } from "@prisma/client";
import {
  Briefcase,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Phone,
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

// Local Imports
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface MySelfCardProps {
  user: User;
}

const MySelfCard: React.FC<MySelfCardProps> = async ({ user }) => {
  const profileImage =
    user.avatar ||
    "https://res.cloudinary.com/dn2pqzag1/image/upload/v1703740293/ruhani%20quiz/avatar_itcz1v.jpg";

  const coverPhoto =
    user.coverPhoto ||
    "https://res.cloudinary.com/dn2pqzag1/image/upload/v1705403352/pf9jdnlmk9vdhem71z9q.jpg";

  const profileBuffer = await fetch(profileImage).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const coverBuffer = await fetch(coverPhoto).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const { base64 } = await getPlaiceholder(profileBuffer);
  const { base64: coverBase64 } = await getPlaiceholder(coverBuffer);

  return (
    <Card className="rounded-[20px] relative shadow-md h-auto w-full">
      <CardHeader className="relative h-[160px] w-full">
        <Image
          src={
            user.coverPhoto ||
            "https://res.cloudinary.com/dn2pqzag1/image/upload/v1705403352/pf9jdnlmk9vdhem71z9q.jpg"
          }
          alt="cover"
          fill
          className="rounded-t-[20px]"
          placeholder="blur"
          blurDataURL={coverBase64}
        />
        <Image
          src={
            user.avatar ||
            "https://res.cloudinary.com/dn2pqzag1/image/upload/v1703740293/ruhani%20quiz/avatar_itcz1v.jpg"
          }
          alt="profile"
          width={100}
          height={100}
          className="z-20 h-[100px] absolute top-[95%] left-[80px] transform -translate-x-1/2 -translate-y-1/2 rounded-full border-[8px] border-white"
          placeholder="blur"
          blurDataURL={base64}
        />
      </CardHeader>
      <CardContent className="w-full relative">
        <section className="flex justify-between w-full">
          <div className="mt-14 w-full ">
            <Name user={user} />
            <Info user={user} />
          </div>
          <section className="absolute top-0 right-6">
            <div className="flex justify-center mt-4 gap-8">
              <div className="flex flex-col items-center">
                <h3 className="font-semibold">1.1k</h3>
                <span className="text-[14px] text-gray-400">Quizes</span>
              </div>
              <Separator orientation="vertical" className="w-5" />
              <div className="flex flex-col items-center">
                <h3 className="font-semibold">10k</h3>
                <span className="text-[14px] text-gray-400">Score</span>
              </div>
            </div>
          </section>
        </section>
        {/* action button */}
        <section className="my-4 ">
          <div className="space-x-3">
            <Button variant="primary" className="rounded-[20px] " size="sm">
              Edit Profile
            </Button>
            <Button
              variant="outline"
              className="rounded-[20px] border-main/80 hover:border-main text-main/80 hover:text-main"
              size="sm"
            >
              Settings
            </Button>
          </div>
        </section>

        <Separator className="mb-4" />
        <p className="text-left text-slate-600 text-[14px]">{user.bio}</p>
      </CardContent>
    </Card>
  );
};

export default MySelfCard;

// Name Components
const Name: React.FC<MySelfCardProps> = ({ user }) => {
  return (
    <h3 className="text-left text-gray-600 font-medium text-[18px] flex items-center gap-x-2">
      {user.first_name} {user.last_name}{" "}
      <HoverCard>
        <HoverCardTrigger asChild>
          <CheckCircle2
            className={cn(
              "w-5 h-5 cursor-pointer",
              user.emailVerified ? "text-main" : ""
            )}
          />
        </HoverCardTrigger>
        <HoverCardContent className="w-80 bg-white">
          <div className="flex justify-between space-x-4">
            <Avatar>
              <AvatarImage src={user.avatar!} />
              <AvatarFallback>PC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">
                @{user.first_name?.split(" ").join("_")}
              </h4>
              <p className="text-sm">
                Account is verified by email address – maintained by @ruhani
              </p>
              <div className="flex items-center pt-2">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  Joined {moment(user.emailVerified).format("LL")}
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </h3>
  );
};

// Info Component
const Info: React.FC<MySelfCardProps> = ({ user }) => {
  return (
    <div className="w-full grid grid-cols-3 mt-2 space-y-1 ">
      <p className="text-[12px] md:text-[14px] font-normal text-gray-500 flex items-center gap-x-2">
        <Briefcase className="w-3 h-3" />
        {user.designation}
      </p>
      <p className="text-[12px] md:text-[14px] col-span-2 font-normal text-gray-500 flex items-center gap-x-2">
        <GraduationCap className="w-3 h-3" />
        {user.educational_qualification}
      </p>
      <p className="text-[12px] md:text-[14px] font-normal text-gray-500 flex items-center gap-x-2">
        <MapPin className={cn("w-3 h-3")} />
        {user.district}
      </p>

      <p className="text-[12px] md:text-[14px] font-normal text-gray-500 flex items-center gap-x-2">
        <Phone className={cn("w-3 h-3")} />
        {user.phone}
      </p>
    </div>
  );
};