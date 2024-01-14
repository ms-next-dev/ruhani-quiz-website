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
        <div className="hover:scale-110 rounded-[20px_0px] hover:rounded-[20px_20px] duration-500">
            <div className=" p-6 rounded-[20px_0px] hover:rounded-[20px_20px] duration-1000 shadow-[3.134px_3.134px_18.804px_3.134px_rgba(0,0,0,0.25)]">
                <p
                    className={`${montserrat.className} text-2xl font-bold text-center mt-12 mb-8 capitalize`}
                >
                    {subject.name}
                </p>
                <div className="flex justify-between items-center">
                    <p>10 Topics</p>
                    <Link
                        href={"/"}
                        className="rounded-xl text-white text-sm font-medium bg-[#FF004C] px-3 py-2"
                    >
                        Explore
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SubjectCard;
