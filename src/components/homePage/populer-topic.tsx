import { getAllTopics } from "@/data/topic";
import RuhaniImage from "../ui/ruhani-image";
import Title from "../ui/title";
import TopicCard from "../ui/topic-card";

type Topics = {
  id: string;
  name: string;
  image: string;
  billboardId: string;
  subjectId: string | null;
  createdAt: Date;
  updatedAt: Date;
  totalQuestion: number;
}[];

const PopulerTopic = async () => {
  const topics: Topics = await getAllTopics();
  return (
    <div className="relative">
      <RuhaniImage
        src="https://res.cloudinary.com/dn2pqzag1/image/upload/v1706613859/ruhani%20quiz/color_tcpxvg.png"
        alt="color"
        fill
        style={{
          objectFit: "cover",
        }}
        placeholder
      />
      <section className="container py-[100px]">
        <Title
          title="Our Diverse Quiz Topics Await Your Curiosity!"
          description="Dive into a World of Learning with an Array of Captivating Quiz Topics
          Designed to Challenge and Enlighten!"
        />
        <div className="mt-12 flex flex-wrap gap-[20px]">
          {topics?.map(({ id, image, name, totalQuestion }) => (
            <TopicCard
              key={id}
              image={image}
              totalQuestion={totalQuestion}
              name={name}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PopulerTopic;
