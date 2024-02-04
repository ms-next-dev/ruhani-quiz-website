"use client";
// Packages

// Local Imports
import { useRouter } from "next/navigation";
import RuhaniImage from "./ruhani-image";

interface TopicCardV2 {
  image: string;
  totalQuestions: number;
  name: string;
}

const TopicCardV2: React.FC<TopicCardV2> = ({
  image,
  totalQuestions,
  name,
}) => {
  const prepareTopicName = name.split(" ").join("_");
  const url = `/topics/${prepareTopicName}`;
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(url)}
      className="w-[168px] md:w-[188px] h-[219px]  rounded-[0.375rem] relative group  cursor-pointer border-[.3px]  hover:border-main/30 duration-300"
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
        <h3 className="text-white text-[12px]">{totalQuestions} Question</h3>
      </div>
      <div className="absolute bottom-0 right-0">
        <button className="rounded-[0.375rem_0px] text-white text-sm font-medium bg-main/30 group-hover:bg-main/50 px-4 py-2">
          play
        </button>
      </div>
    </div>
  );
};

export default TopicCardV2;
