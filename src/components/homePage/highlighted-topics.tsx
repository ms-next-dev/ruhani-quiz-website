import { getAllTopics } from "@/data/topic";
import Link from "next/link";
import RuhaniImage from "../ui/ruhani-image";
import Title from "../ui/title";

type Topics = {
  id: string;
  name: string;
  image: string;
  billboardId: string;
  subjectId: string | null;
  createdAt: Date;
  updatedAt: Date;
  totalQuestion: number;
}[];

const HighlightedTopics = async () => {
  const data: Topics = await getAllTopics();

  return (
    <div className="relative">
      <RuhaniImage
        src="https://res.cloudinary.com/dn2pqzag1/image/upload/v1706613859/ruhani%20quiz/color_tcpxvg.png"
        alt="color"
        fill
        style={{
          objectFit: "cover",
        }}
        placeholder={true}
      />
      <section className="container py-[100px]">
        <Title
          title="Our Diverse Quiz Topics Await Your Curiosity!"
          description="Dive into a World of Learning with an Array of Captivating Quiz Topics
          Designed to Challenge and Enlighten!"
        />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {data.map(({ id, name, image, totalQuestion }) => {
            const prepareTopicName = name.split(" ").join("_");
            const url = `/topics/${prepareTopicName}`;

            return (
              <Link
                key={id}
                href={url}
                className="w-[168px] md:w-[188px] h-[219px]  rounded-[0.375rem] relative group  cursor-pointer border-[.3px]  hover:border-main/30 duration-300"
              >
                <div className="h-full w-full relative">
                  <RuhaniImage
                    src="https://res.cloudinary.com/dn2pqzag1/image/upload/v1706848548/ruhani%20quiz/26768_necpnd.jpg"
                    alt="im"
                    className="rounded-[0.375rem]"
                    fill
                    placeholder={true}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(20,18,18,0.98)12.89%,rgba(4,2,2,0.64)48.38%)] rounded-[0.375rem]"></div>
                </div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <h3 className="text-white text-[25px]">{name}</h3>
                </div>
                <div className="absolute  left-[15px] bottom-[10px]">
                  <h3 className="text-white text-[12px]">
                    {totalQuestion} Question
                  </h3>
                </div>
                <div className="absolute bottom-0 right-0">
                  <button className="rounded-[0.375rem_0px] text-white text-sm font-medium bg-main/30 group-hover:bg-main/50 px-4 py-2">
                    play
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HighlightedTopics;
