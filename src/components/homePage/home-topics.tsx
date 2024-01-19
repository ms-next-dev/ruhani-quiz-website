// Local Imports
import { getSubjects } from "@/data/subjects";
import { getTopicBySubjectName } from "@/data/topic";
import { roboto } from "@/lib/fonts";
import TopicCard from "../cards/topic-card";

const HomeTopics = async () => {
  const subjects = await getSubjects();
  const islam = subjects.find(
    (subject) => subject.name.toLowerCase() === "islam"
  );

  const { data: topics } = await getTopicBySubjectName(islam?.name as string);

  return (
    <div>
      <div
        style={{
          background: `url(${"/home-topics-bg.png"})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="container p-10 md:p-14 lg:p-20">
          <h2
            className={`${roboto.className} text-5xl text-[#FF004C] text-center font-bold mb-2`}
          >
            Quiz Topics
          </h2>
          <div className="w-full lg:w-2/3 xl:w-1/3 mx-auto h-[2px] bg-black/50 mb-5 lg:mb-20 rounded-full"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-8">
            {topics !== null &&
              topics?.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTopics;
