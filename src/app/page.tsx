// Packages
import dynamic from "next/dynamic";

// Local Imports
import { getSubjects } from "@/data/subjects";
const Banner = dynamic(() => import("@/components/homePage/banner"));

export default async function Home() {
  // get all subjects
  // in future need to implement pagination
  const subjects = await getSubjects();
  return (
    <div>
      <Banner subjects={subjects} />
      {/* <PopulerTopic /> */}
      {/* <HighlightedTopics />
      <PrayerTime />
      <IslamPillar /> */}
      {/* <UpcomingEvent /> */}
    </div>
  );
}
