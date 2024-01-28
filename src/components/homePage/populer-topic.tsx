import { prismaDb } from "@/lib/db";
import Image from "next/image";
import RuhaniImage from "../ui/ruhani-image";

const PopulerTopic = async () => {
  const topics = await prismaDb.topic.findMany({
    take: 6,
  });
  return (
    <div className="h-[580px] relative">
      <Image
        src="/bg/color.svg"
        alt="color"
        fill
        style={{
          objectFit: "cover",
        }}
      />
      <section className="container pt-[100px]">
        <h1 className=" text-xl md:text-[44px] leading-tight font-semibold">
          Play Quiz Based on Your Subject <br /> and Unleash Your Intellectual
          Prowess!
        </h1>
        <p className=" font-light">
          Unleashing Knowledge, Bangladesh's Biggest Quiz Experience!
        </p>
        <div className="mt-12 flex flex-wrap gap-[20px]">
          {topics?.map(({ id, image }) => (
            <div
              key={id}
              className="w-[188px] h-[239px]  rounded-[0.375rem] relative group z-50 cursor-pointer border-[.3px]  hover:border-main/30 duration-300"
            >
              <div className="h-full w-full relative">
                <RuhaniImage
                  src={image}
                  alt="im"
                  className="rounded-[0.375rem]"
                  fill
                  placeholder={true}
                />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(20,18,18,0.98)12.89%,rgba(4,2,2,0.64)48.38%)] rounded-[0.375rem]"></div>
              </div>
              <div className="absolute  left-[15px] bottom-[10px]">
                <h3 className="text-white text-[12px]">5 Question</h3>
              </div>
              <div className="absolute bottom-0 right-0">
                <button className="rounded-[0.375rem_0px] text-white text-sm font-medium bg-main/30 group-hover:bg-main/35 px-4 py-2">
                  play
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PopulerTopic;
