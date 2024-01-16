// Local Imports
import SubjectCard from "@/components/cards/subject-card";
import TopicCard from "@/components/cards/topic-card";
import PageBanner from "@/components/page-banner";
import { Separator } from "@/components/ui/separator";
import { getSubjects } from "@/data/subjects";
import { getTopicsBySubjectId } from "@/data/topic";
import { montserrat } from "@/lib/fonts";

const TopicsPage = async () => {
    const subjects = await getSubjects();
    const islam = subjects.find(
        (subject) => subject.name.toLowerCase() === "islam"
    );

    const topics = await getTopicsBySubjectId(islam?.id.toString());

    const filteredSubjects = subjects.filter(
        (subject) => subject.name.toLowerCase() !== "islam"
    );

    return (
        <div>
            {/* banner section */}
            <PageBanner
                bannerImg="/page-banner/topics-page-banner.png"
                title1="Play QUIZ"
                title2="Enrich your limit of Knowledge"
            />

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
                        {topics !== null &&
                            topics.map((topic) => (
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
