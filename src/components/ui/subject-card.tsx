import { cn } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import Image from "next/image";

interface SubjectCardProps {
  name: string;
  varient: "glass" | "normal";
}

const SubjectCard: React.FC<SubjectCardProps> = ({ name, varient }) => {
  return (
    <div
      className={cn(
        "w-[172px] h-[116px] bg-white bg-opacity-5  rounded    flex flex-col items-center justify-center gap-y-2 cursor-pointer group",
        varient === "glass" &&
          "drop-shadow-lg border-slate-50/5 backdrop-blur-lg hover:backdrop-blur-xl hover:border-slate-50/10 hover:border-[.7px] border-[.5px]",
        varient === "normal" &&
          "border-slate-200 hover:border-slate-400 duration-500 border-[.8px] hover:border-[1px]"
      )}
    >
      <div
        className={cn(
          "p-2  rounded-full",
          varient === "glass" && "bg-gray-400/10",
          varient === "normal" &&
            "bg-slate-800/5 group-hover:bg-slate-800/10 duration-500"
        )}
      >
        <Image src="/icon/book.png" alt="bookIcon" width={35} height={35} />
      </div>
      <div
        className={cn(
          "text-[14px]  flex items-center gap-x-2 ",
          varient === "glass" && "text-white/85",
          varient === "normal" && "text-gray-500/90 group-hover:text-gray-600"
        )}
      >
        {name} <MoveRight className="w-3 h-3 mt-1" />
      </div>
    </div>
  );
};

export default SubjectCard;
