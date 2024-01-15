// Packages
import dynamic from "next/dynamic";

// Local Imports
import HomeTopics from "@/components/homePage/home-topics";
import PrayerTime from "@/components/homePage/prayer-time";
const Banner = dynamic(() => import("@/components/homePage/banner"));

export default async function Home() {
    return (
        <div>
            <Banner />
            <HomeTopics />
            <PrayerTime />
            <h1 className="flex justify-center items-center my-80 text-2xl lg:text-8xl">
                Welcome to Ruhani Quiz
            </h1>
        </div>
    );
}
