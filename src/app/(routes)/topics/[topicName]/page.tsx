// Local Imports
import PageBanner from "@/components/page-banner";
import { getTopicByName } from "@/data/topic";
import { hindSiliguri } from "@/lib/fonts";
import QuizRulesAction from "./components/quiz-rules-action";

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
            <div className="container py-20">
                <div>
                    <h2
                        className={`${hindSiliguri.className} text-5xl font-bold text-center`}
                    >
                        General Rules of Quiz
                    </h2>
                    <h2
                        className={`${hindSiliguri.className} text-4xl font-bold text-center my-4`}
                    >
                        কুইজের সাধারণ নিয়মাবলী
                    </h2>
                    <div className="w-1/2 h-[3px] bg-[#FF004C] mx-auto mb-12"></div>
                </div>

                <div>
                    {rules.map((rule) => (
                        <div
                            key={rule.id}
                            style={{
                                background: `url(${"/quizRuleBg.png"})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                            }}
                            className="rounded-[20px] w-3/4 p-12 mx-auto mb-6"
                        >
                            <div className="flex justify-start items-center gap-x-12">
                                <div className="rounded-full bg-[#FF004C] flex justify-center items-center w-[108px] h-[108px]">
                                    <p
                                        className={`${hindSiliguri.className} text-[62px] font-bold text-white p-5`}
                                    >
                                        {rule.sl}
                                    </p>
                                </div>
                                <div>
                                    <h3
                                        className={`${hindSiliguri.className} text-left text-xl font-bold mb-2`}
                                    >
                                        নিয়ম নং - {rule.sl}
                                    </h3>
                                    <p
                                        className={`${hindSiliguri.className} font-medium text-xl`}
                                    >
                                        {rule.ruleText}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <QuizRulesAction topicName={params.topicName} />
                </div>
            </div>
        </div>
    );
};

export default TopicPage;
