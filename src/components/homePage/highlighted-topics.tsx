import { getAllTopics } from "@/data/topic";
import RuhaniImage from "../ui/ruhani-image";
import Title from "../ui/title";
import TopicCardV2 from "../ui/topic-card";

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

const HighlightedTopics = async () => {
  const data: Topics = await getAllTopics();

  return (
    <div className="relative">
      <RuhaniImage
        src="https://res.cloudinary.com/dn2pqzag1/image/upload/v1706613859/ruhani%20quiz/color_tcpxvg.png"
        alt="color"
        fill
        style={{
          objectFit: "cover",
        }}
        placeholder={true}
      />
      <section className="container py-[100px]">
        <Title
          title="Our Diverse Quiz Topics Await Your Curiosity!"
          description="Dive into a World of Learning with an Array of Captivating Quiz Topics
          Designed to Challenge and Enlighten!"
        />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {data.map(({ id, name, image, totalQuestion }) => (
            <TopicCardV2
              key={id}
              name={name}
              image={image}
              totalQuestion={totalQuestion}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HighlightedTopics;
