// Packages
import { User } from "@prisma/client";
import { Briefcase, CalendarDays, CheckCircle2, MapPin } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

// Local Imports
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import MySelfBody from "./my-self-body";

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
    <Card className="rounded-[20px] relative shadow-md h-auto ">
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
      <CardContent className="">
        <section className="flex justify-between">
          <div className="mt-14">
            <Name user={user} />
            <p className="text-[14px] font-medium text-gray-500 flex items-center gap-x-2">
              <Briefcase className="w-3 h-3" />
              {user.designation}
            </p>
            <p className="text-[14px] font-normal text-gray-500 flex items-center gap-x-2">
              <MapPin className={cn("w-3 h-3")} />
              {user.district}
            </p>
          </div>
          <section>
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

        <Separator className="my-4" />
        <MySelfBody user={user} />
      </CardContent>
    </Card>
  );
};

export default MySelfCard;

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
