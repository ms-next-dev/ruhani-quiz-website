import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const MySelfCard = () => {
  return (
    <Card className="rounded-[20px] relative shadow-md h-auto ">
      <CardHeader className="relative h-[160px]">
        <div className="absolute top-0 left-0 h-[160px] bg-red-100 w-full rounded-t-[20px]"></div>
        <Image
          src="https://www.monirhrabby.com/images/monir_with_laptop.jpg"
          alt="profile"
          width={100}
          height={100}
          className="z-20 absolute top-[95%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#FF004C]"
        />
      </CardHeader>
      <CardContent className="mt-14">
        <h3 className="text-center text-gray-600 font-medium text-[18px]">
          Monir Hossain Rabby
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
        <p className="text-[14px] text-slate-600 text-left">
          Passionate Next.js developer with a knack for crafting seamless and
          performant web applications. Proficient in leveraging React and
          Next.js to create dynamic and engaging user experiences.
        </p>

        <div className="mt-6 w-full flex justify-center">
          <Button
            variant="outline"
            className="border-[#FF004C]/60 rounded-[20px] hover:bg-[#FF004C]/10 hover:text-[#FF004C] duration-500 text-[#FF004C]"
          >
            Edit profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MySelfCard;
