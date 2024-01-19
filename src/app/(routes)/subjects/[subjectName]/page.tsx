// Local Import
import SubjectCard from "@/components/cards/subject-card";
import TopicCard from "@/components/cards/topic-card";
import PageBanner from "@/components/page-banner";
import SectionTitle from "@/components/ui/section-title";
import { Separator } from "@/components/ui/separator";
import { getSubjects } from "@/data/subjects";
import { getTopicBySubjectName } from "@/data/topic";

const SubjectPage = async ({ params }: { params: { subjectName: string } }) => {
  const { data: topics } = await getTopicBySubjectName(params.subjectName);
  const allSubjects = await getSubjects();

  const filteredSubjects = allSubjects.filter(
    (subject) => subject.name !== params.subjectName.split("_").join(" ")
  );

  return (
    <div>
      {/* banner section */}
      <PageBanner
        bannerImg="/page-banner/subject-banner.jpg"
        title1="Play QUIZ"
        title2="Enrich your limit of Knowledge"
      />

      <div className="container p-5 lg:p-12 xl:p-20">
        {/* Islamic topic section */}
        <SectionTitle title="Topics Lists" />

        <div className="min-h-[50vh] mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-10">
            {topics !== null &&
              (topics?.length === 0 ? (
                <p className=" py-32 text-center text-xl text-gray-500 font-normal col-span-4">
                  Oops! No topics are available in this subject. <br /> Please,
                  explore others.
                </p>
              ) : (
                topics?.map((topic) => (
                  <TopicCard key={topic.id} topic={topic} />
                ))
              ))}
          </div>
        </div>

        {/* Subject suggestion */}
        <Separator className="h-[2px] bg-black/50" />
        <div className="my-5 lg:10">
          <SectionTitle title="Subject Suggestions" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 my-[50px]">
            {filteredSubjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
