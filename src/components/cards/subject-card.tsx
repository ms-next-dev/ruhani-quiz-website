// Packages
import { Subject } from "@prisma/client";
import Link from "next/link";

// Local Imports
import { montserrat } from "@/lib/fonts";

interface SubjectCardProps {
  subject: Subject;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject }) => {
  return (
    <div className="md:hover:scale-105 rounded-[20px_0px] hover:rounded-[20px_20px] duration-500">
      <div className=" p-6 rounded-[20px_0px] hover:rounded-[20px_20px] duration-1000 shadow-[3.134px_3.134px_18.804px_3.134px_rgba(0,0,0,0.25)]">
        <p
          className={`${montserrat.className} text-[20px] md:text-[22px] font-bold text-center mt-12 mb-8 capitalize whitespace-nowrap`}
        >
          {subject.name}
        </p>
        <div className="flex justify-between items-center">
          <p className="font-normal text-slate-500 text-[14px] md:text-[16px]">
            10 Topics
          </p>
          <Link
            href={`/subjects/${subject.id}`}
            className="rounded-[4px] rounded-br-[10px] text-white text-sm font-medium bg-main/90 px-3 py-2 hover:rounded-br-[4px] duration-300 hover:bg-main"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
