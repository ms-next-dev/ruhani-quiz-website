// Packages
import dynamic from "next/dynamic";

// Local Imports
import IslamPillar from "@/components/homePage/islam-pillar";
import PopulerTopic from "@/components/homePage/populer-topic";
import PrayerTime from "@/components/homePage/prayer-time";
import { prismaDb } from "@/lib/db";
const Banner = dynamic(() => import("@/components/homePage/banner"));

export default async function Home() {
  const topics = await prismaDb.topic.findMany({
    include: {
      _count: true,
    },
  });

  const data = topics.map(({ _count, id, name, image, ...rest }) => ({
    id,
    name,
    image,
    totalQuestion: _count.questions,
  }));

  return (
    <div>
      <Banner />
      <PopulerTopic topics={data} />
      {/* <HomeTopics /> */}
      <PrayerTime />
      <IslamPillar />
      <h1 className="flex justify-center items-center my-80 text-2xl lg:text-8xl">
        Welcome to Ruhani Quiz
      </h1>
    </div>
  );
}
