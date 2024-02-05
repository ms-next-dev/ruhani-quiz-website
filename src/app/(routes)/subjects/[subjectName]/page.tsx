// Local Import
import PageBanner from "@/components/page-banner";
import SectionTitle from "@/components/ui/section-title";
import SubjectCard from "@/components/ui/subject-card";
import TopicCardV2 from "@/components/ui/topic-card";
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
        <SectionTitle title="Choose topics" />

        <div className="h-auto lg:mb-[100px] my-[50px]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 lg:gap-10">
            {topics !== null &&
              (topics?.length === 0 ? (
                <p className=" py-32 text-center text-xl text-gray-500 font-normal col-span-4">
                  Oops! No topics are available in this subject. <br /> Please,
                  explore others.
                </p>
              ) : (
                topics?.map(({ id, image, name, totalQuestion }) => (
                  <TopicCardV2
                    key={id}
                    image={image}
                    name={name}
                    totalQuestion={totalQuestion}
                  />
                ))
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

export default SubjectPage;
