// Local Imports
import PageBanner from "@/components/page-banner";
import { getTopicByName } from "@/data/topic";
import { hindSiliguri } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Anek_Bangla } from "next/font/google";
import QuizRulesAction from "./components/quiz-rules-action";

const anek = Anek_Bangla({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
});

const TopicPage = async ({ params }: { params: { topicName: string } }) => {
  const topic = await getTopicByName(params.topicName);

  const rules = [
    {
      id: 1,
      sl: "০১",
      ruleText:
        "প্রতিটি কুইজে ১০ টি করে প্রশ্ন থাকবে এবং সম্পুর্ণ কুইজ শেষ করার জন্য ১০ মিনিট সময় পাবেন।",
    },
    {
      id: 2,
      sl: "০২",
      ruleText:
        "প্রতিটি প্রশ্নের জন্য ০১ পয়েন্ট করে পাবেন। প্রতিটি প্রশ্নের উওর করে 'Next' বাটনে ক্লিক করলেই পরবর্তী আসবে।",
    },
    {
      id: 3,
      sl: "০৩",
      ruleText:
        "একটি প্রশ্ন উওর করে 'Next' বাটনে ক্লিক করার পর আর পূর্ববর্তী প্রশ্নে ফেরত যাওয়া যাবে না।",
    },
    {
      id: 4,
      sl: "০৪",
      ruleText: "সময় শেষ হলে আপনাআপনি কুইজ সাবমিট হয়ে যাবে।",
    },
  ];

  return (
    <div>
      {/* Banner section */}
      <PageBanner
        bannerImg={topic?.data?.billboard?.image}
        title1="Play Quiz"
        title2="দোলনা থেকে মৃত্যু পর্যন্ত জ্ঞান অর্জন করো"
      />

      {/* Rules section */}
      <div className="container flex justify-center flex-col items-center py-6 md:py-8 lg:py-20">
        <div>
          <h2
            className={`${hindSiliguri.className} text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-left underline`}
          >
            Rules
          </h2>
        </div>

        <ol type="1" className="space-y-4 mt-[50px] ">
          {rules.map(({ id, ruleText, sl }) => (
            <li key={id} className={cn(anek.className, "font-normal")}>
              <span className="font-medium">{sl}।</span> {ruleText}
            </li>
          ))}
        </ol>

        <div className="flex justify-center mt-6 lg:mt-12">
          <QuizRulesAction topicName={params.topicName} />
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
