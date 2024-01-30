import Image from "next/image";
import Title from "../ui/title";
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
        <Title
          title="Our Diverse Quiz Topics Await Your Curiosity!"
          description="Dive into a World of Learning with an Array of Captivating Quiz Topics
          Designed to Challenge and Enlighten!"
        />
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
