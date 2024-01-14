// Packages
import Link from "next/link";

// Local Imports
import { montserrat } from "@/lib/fonts";

interface TopicCardProps {
    topic: {
        id: string;
        name: string;
        img: string;
    };
}
const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
    return (
        <div
            style={{
                background: `url(${topic.img})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
            className="hover:scale-110 rounded-[0px_20px] hover:rounded-[20px_20px] duration-700 shadow-[3.134px_3.134px_18.804px_3.134px_rgba(0,0,0,0.40)]"
        >
            <div className="text-white p-6 bg-[linear-gradient(0deg,rgba(20,18,18,0.98)12.89%,rgba(4,2,2,0.64)48.38%)] shadow-lg rounded-[0px_20px] hover:rounded-[20px_20px] duration-1000">
                <p
                    className={`${montserrat.className} text-3xl font-bold text-center text-white mt-12 mb-8 uppercase`}
                >
                    {topic.name}
                </p>
                <div className="flex justify-between items-center">
                    <p>10 Questions</p>
                    <Link
                        href={"/"}
                        className="rounded-[10px_0px] text-white text-sm font-medium bg-[#FF004C] px-3 py-2"
                    >
                        Play Quiz
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TopicCard;
