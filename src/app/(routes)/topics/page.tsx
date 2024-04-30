// Local Imports
import PageBanner from "@/components/page-banner";
import SectionTitle from "@/components/ui/section-title";
import SubjectCard from "@/components/ui/subject-card";
import TopicCard from "@/components/ui/topic-card";
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
        <SectionTitle title="Choose topics" />

        <div className="h-auto  my-[50px] lg:mb-[100px]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {topics !== null &&
              topics?.map(({ id, image, totalQuestion, name }) => (
                <TopicCard
                  key={id}
                  image={image}
                  totalQuestion={totalQuestion}
                  name={name}
                />
              ))}
          </div>
        </div>

        {/* Subject suggestion */}
        <div className="my-5 lg:my-10">
          <SectionTitle title="More Subjects" />

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-10 my-[50px]">
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
