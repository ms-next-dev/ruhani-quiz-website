// Local Imports
import SubjectCard from "@/components/cards/subject-card";
import TopicCard from "@/components/cards/topic-card";
import { Separator } from "@/components/ui/separator";
import { getSubjects } from "@/hooks/get-subjects";
import { montserrat } from "@/lib/fonts";

const TopicsPage = async () => {
    const topics = [
        {
            id: "1",
            name: "Kalimah",
            img: "https://res.cloudinary.com/dn2pqzag1/image/upload/v1704005547/kaqasqx6rmncolcvriuv.jpg",
        },
        {
            id: "2",
            name: "Namaz",
            img: "https://res.cloudinary.com/dn2pqzag1/image/upload/v1704005547/kaqasqx6rmncolcvriuv.jpg",
        },
        {
            id: "3",
            name: "Saom/Fasting",
            img: "https://res.cloudinary.com/dn2pqzag1/image/upload/v1704005547/kaqasqx6rmncolcvriuv.jpg",
        },
        {
            id: "4",
            name: "Hajj",
            img: "https://res.cloudinary.com/dn2pqzag1/image/upload/v1704005547/kaqasqx6rmncolcvriuv.jpg",
        },
        {
            id: "5",
            name: "Zakat",
            img: "https://res.cloudinary.com/dn2pqzag1/image/upload/v1704005547/kaqasqx6rmncolcvriuv.jpg",
        },
    ];

    const subjects = await getSubjects();

    const filteredSubjects = subjects.filter(
        (subject) => subject.name.toLowerCase() !== "islam"
    );

    return (
        <div>
            {/* banner section */}
            <div
                className="h-[30vh] md:h-[40vh] lg:h-[50vh]"
                style={{
                    background: `url(${"/page-banner/topics-page-banner.png"})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            ></div>
            <div className="flex justify-center">
                <div
                    className={`${montserrat.className} text-center text-[#FF004C] bg-black/50 py-6 md:py-14 xl:py-20 px-4 md:px-16 xl:px-36 tracking-wider rounded-[25px_0px] shadow-[3.134px_3.134px_18.804px_3.134px_rgba(0,0,0,0.50)] -mt-16 md:-mt-28 xl:-mt-44 mb-8 lg:mb-12`}
                >
                    <h1 className="text-4xl md:text-6xl xl:text-8xl font-bold uppercase">
                        Play QUIZ
                    </h1>
                    <h3 className="text-lg md:text-3xl xl:text-6xl mt-2 md:mt-4 lg:mt-6 font-medium text-white capitalize">
                        Enrich your limit of Knowledge
                    </h3>
                </div>
            </div>

            <div className="container p-5 lg:p-12 xl:p-20">
                {/* Islamic topic section */}
                <h1
                    className={`${montserrat.className} text-xl lg:text-3xl font-bold mb-1`}
                >
                    Islam - Topics
                </h1>
                <div className="w-full lg:w-2/3 xl:w-1/3 h-[2px] bg-black mb-5 lg:mb-10"></div>

                <div className="min-h-[70vh] mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-10">
                        {topics.map((topic) => (
                            <TopicCard key={topic.id} topic={topic} />
                        ))}
                    </div>
                </div>

                {/* Subject suggestion */}
                <Separator className="h-[2px] bg-black/50" />
                <div className="my-5 lg:my-10">
                    <h1
                        className={`${montserrat.className} text-xl lg:text-3xl font-bold mb-5 lg:mb-10`}
                    >
                        More Subject Suggestions
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {filteredSubjects.map((subject) => (
                            <SubjectCard key={subject.id} subject={subject} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopicsPage;
