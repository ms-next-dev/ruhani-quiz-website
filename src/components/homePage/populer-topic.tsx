import Image from "next/image";
import TopicCardV2 from "../ui/topic-card";

interface Topic {
  id: string;
  name: string;
  image: string;
  totalQuestion: number;
}

interface PopularTopicProps {
  topics: Topic[];
}

const PopulerTopic: React.FC<PopularTopicProps> = async ({ topics }) => {
  return (
    <div className="relative">
      <Image
        src="/bg/color.svg"
        alt="color"
        fill
        style={{
          objectFit: "cover",
        }}
      />
      <section className="container py-[100px]">
        <h1 className=" text-[24px] md:text-[44px] leading-tight font-semibold lg:w-1/2">
          Our Diverse Quiz Topics Await Your Curiosity!
        </h1>
        <p className="font-light">
          Dive into a World of Learning with an Array of Captivating Quiz Topics
          Designed to Challenge and Enlighten!
        </p>
        <div className="mt-12 flex flex-wrap gap-[20px]">
          {topics?.map(({ id, image, name, totalQuestion }) => (
            <TopicCardV2
              key={id}
              image={image}
              totalQuestions={totalQuestion}
              name={name}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PopulerTopic;
