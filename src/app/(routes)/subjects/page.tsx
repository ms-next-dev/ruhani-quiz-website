import SectionTitle from "@/components/ui/section-title";
import SubjectCard from "@/components/ui/subject-card";
import { getSubjects } from "@/data/subjects";

const Page = async () => {
  const allSubjects = await getSubjects();
  return (
    <div className="relative w-full h-[calc(70vh-72px)] md:h-[calc(85vh-72px)] lg:h-[calc(100vh-72px)] overflow-hidden z-0 bg-black">
      <div className="container p-5 lg:p-12 xl:p-20">
        <SectionTitle title="Choose subjects" varient="dark" />

        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 gap-y-6 mt-6">
          {allSubjects.map(({ id, name }) => (
            <SubjectCard key={id} name={name} varient="glass" />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Page;
