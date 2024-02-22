import { Card } from "@/components/ui/card";
import RuhaniImage from "@/components/ui/ruhani-image";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const Page = () => {
  const data = [
    {
      ranking: 1,
      name: "Monir Hossain",
      score: "95%",
    },
    {
      ranking: 2,
      name: "Mehedi Hasan",
      score: "77%",
    },
    {
      ranking: 3,
      name: "Mayesa Sorkar",
      score: "95%",
    },
    {
      ranking: 4,
      name: "Hadid Islam",
      score: "77%",
    },
  ];
  return (
    <div className="min-h-[80vh]">
      <div className="bg-black/90 h-[220px] md:h-[300px] w-full flex justify-center items-center">
        <div className="flex flex-col items-center">
          <RuhaniImage
            src="https://res.cloudinary.com/dn2pqzag1/image/upload/v1706361303/trophy_2_vq5dxd.png"
            width={80}
            height={80}
            placeholder={true}
            alt="trophy"
          />
          <h3 className="flex items-center gap-x-2 md:text-[25px] lg:text-[30px] text-white/90">
            <span className="font-semibold">Ruhani Quiz</span>{" "}
            <p>Leaderboard</p>
          </h3>
          <p className="text-gray-400 mt-2">Play quiz and earn score</p>
        </div>
      </div>
      <div className="container my-[50px]">
        <Card className="p-[16px]">
          <div className="w-full grid grid-cols-3 gap-8 my-6">
            <div className=" relative flex flex-row justify-between items-center py-2 px-3 gap-16 overflow-hidden w-full  bg-green-200 rounded-[6px] ">
              <div className="flex items-center gap-2 ">
                <div className="absolute bg-green-600 text-white text-[12px] px-4 shadow-xl -rotate-45 -left-3 top-1">
                  1st
                </div>
                <div className="font-semibold ml-1">1</div>
                <Image
                  src="https://res.cloudinary.com/dzlrpspps/image/upload/v1700392817/profile_bq4fpi.jpg"
                  height={30}
                  width={30}
                  alt="profile"
                  className="rounded-full"
                />
                <h3 className="text-[1rem] capitalize leading-[1.5rem] font-semibold tracking-[.32px]">
                  Monir Hossain
                </h3>
              </div>
              <div className="flex flex-col items-end">
                <h5 className="text-[20px] font-semibold">66%</h5>
                <p className="text-[10px] font-medium leading-[15.6px] tracking-[.24px]">
                  Marks
                </p>
              </div>
            </div>
            <div className=" relative flex flex-row justify-between items-center py-2 px-3 gap-16 overflow-hidden w-full  bg-blue-200 rounded-[6px] ">
              <div className="flex items-center gap-2 ">
                <div className="absolute bg-blue-600 text-white text-[12px] px-4 shadow-xl -rotate-45 -left-3 top-1">
                  2nd
                </div>
                <div className="font-semibold ml-1">2</div>
                <Image
                  src="https://res.cloudinary.com/dzlrpspps/image/upload/v1700392817/profile_bq4fpi.jpg"
                  height={30}
                  width={30}
                  alt="profile"
                  className="rounded-full"
                />
                <h3 className="text-[1rem] capitalize leading-[1.5rem] font-semibold tracking-[.32px]">
                  Monir Hossain
                </h3>
              </div>
              <div className="flex flex-col items-end">
                <h5 className="text-[20px] font-semibold">66%</h5>
                <p className="text-[10px] font-medium leading-[15.6px] tracking-[.24px]">
                  Marks
                </p>
              </div>
            </div>
            <div className=" relative flex flex-row justify-between items-center py-2 px-3 gap-16 overflow-hidden w-full  bg-orange-200 rounded-[6px] ">
              <div className="flex items-center gap-2 ">
                <div className="absolute bg-orange-600 text-white text-[12px] px-4 shadow-xl -rotate-45 -left-3 top-1">
                  3rd
                </div>
                <div className="font-semibold ml-1">3</div>
                <Image
                  src="https://res.cloudinary.com/dzlrpspps/image/upload/v1700392817/profile_bq4fpi.jpg"
                  height={30}
                  width={30}
                  alt="profile"
                  className="rounded-full"
                />
                <h3 className="text-[1rem] capitalize leading-[1.5rem] font-semibold tracking-[.32px]">
                  Monir Hossain
                </h3>
              </div>
              <div className="flex flex-col items-end">
                <h5 className="text-[20px] font-semibold">66%</h5>
                <p className="text-[10px] font-medium leading-[15.6px] tracking-[.24px]">
                  Marks
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-slate-500/20"></div>
          <div className="w-full grid grid-cols-3 gap-8 my-6">
            <div className=" relative flex flex-row justify-between items-center py-2 px-3 gap-16 overflow-hidden w-full  bg-[rgb(255,242,204)] rounded-[6px] ">
              <div className="flex items-center gap-2 ">
                <div className="absolute bg-white text-[12px] px-4 shadow-xl -rotate-45 -left-3 top-1">
                  You
                </div>
                <div className="font-semibold">14</div>
                <Image
                  src="https://res.cloudinary.com/dzlrpspps/image/upload/v1700392817/profile_bq4fpi.jpg"
                  height={30}
                  width={30}
                  alt="profile"
                  className="rounded-full"
                />
                <h3 className="text-[1rem] capitalize leading-[1.5rem] font-semibold tracking-[.32px]">
                  Monir Hossain
                </h3>
              </div>
              <div className="flex flex-col items-end">
                <h5 className="text-[20px] font-semibold">66%</h5>
                <p className="text-[10px] font-medium leading-[15.6px] tracking-[.24px]">
                  Marks
                </p>
              </div>
            </div>
          </div>
          <h3 className="border-b-[1px] border-slate-500/20 pb-2 font-medium">
            Others
          </h3>
          <Separator />
          <div className=" w-full grid grid-cols-3 gap-8 mt-[20px]">
            {data.map(({ name, ranking, score }) => (
              <div
                key={ranking}
                className=" relative flex flex-row justify-between items-center py-2 px-3 gap-16 overflow-hidden w-full rounded-lg border-b-[1px] border-gray-600/20"
              >
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{ranking}</div>
                  <Image
                    src="https://res.cloudinary.com/dzlrpspps/image/upload/v1700392817/profile_bq4fpi.jpg"
                    height={30}
                    width={30}
                    alt="profile"
                    className="rounded-full"
                  />
                  <h3 className="text-[1rem] capitalize leading-[1.5rem] font-semibold tracking-[.32px]">
                    {name}
                  </h3>
                </div>
                <div className="flex flex-col items-end">
                  <h5 className="text-[20px] font-semibold">{score}</h5>
                  <p className="text-[12px] font-medium leading-[15.6px] tracking-[.24px]">
                    Marks
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Page;
