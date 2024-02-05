// Local Imports
import PageBanner from "@/components/page-banner";
import SectionTitle from "@/components/ui/section-title";
import { Separator } from "@/components/ui/separator";
import SubjectCard from "@/components/ui/subject-card";
import TopicCardV2 from "@/components/ui/topic-card";
import { getSubjects } from "@/data/subjects";
import { getTopicBySubjectName } from "@/data/topic";

const TopicsPage = async () => {
  const subjects = await getSubjects();
  const islam = subjects.find(
    (subject) => subject.name.toLowerCase() === "islam"
  );

  const { data: topics } = await getTopicBySubjectName(
    islam?.name.split("_").join(" ") as string
  );

  const filteredSubjects = subjects.filter(
    (subject) => subject.name.toLowerCase() !== "islam"
  );

  return (
    <div>
      {/* banner section */}
      <PageBanner
        bannerImg="/page-banner/topics-page-banner.png"
        title1="Play Quiz"
        title2="Enrich your limit of Knowledge"
      />

      <div className="container p-5 lg:p-12 xl:p-20">
        {/* Islamic topic section */}
        <SectionTitle title="Islam - Topics" />

        <div className="h-auto  my-[50px] lg:mb-[100px]">
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-5 lg:gap-10">
            {topics !== null &&
              topics?.map(({ id, image, totalQuestion, name }) => (
                <TopicCardV2
                  key={id}
                  image={image}
                  totalQuestion={totalQuestion}
                  name={name}
                />
              ))}
          </div>
        </div>

        {/* Subject suggestion */}
        <Separator className="h-[2px] bg-black/50" />
        <div className="my-5 lg:my-10">
          <SectionTitle title="Subject Suggestions" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-4 gap-10 my-[50px]">
            {filteredSubjects.map(({ id, name }) => (
              <SubjectCard key={id} name={name} varient="normal" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicsPage;
