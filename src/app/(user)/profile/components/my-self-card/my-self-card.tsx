// Packages
import { User } from "@prisma/client";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

// Local Imports
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
        {/* <div className="absolute top-0 left-0 h-[160px] bg-red-100 w-full rounded-t-[20px]"></div> */}
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
          className="z-20 h-[100px] absolute top-[95%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#FF004C]"
          placeholder="blur"
          blurDataURL={base64}
        />
      </CardHeader>
      <CardContent className="mt-14">
        <h3 className="text-center text-gray-600 font-medium text-[18px]">
          {user.first_name} {user.last_name}
        </h3>
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
        <Separator className="my-4" />
        <MySelfBody user={user} />
      </CardContent>
    </Card>
  );
};

export default MySelfCard;
