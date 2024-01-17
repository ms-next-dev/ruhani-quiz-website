// Local Imports
import PageBanner from "@/components/page-banner";
import { Button } from "@/components/ui/button";
import { getTopicById } from "@/data/topic";
import { hindSiliguriBangla, hindSiliguriEnglish } from "@/lib/fonts";

const TopicPage = async ({ params }: { params: { topicId: string } }) => {
    const topic = await getTopicById(params.topicId);

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
                bannerImg={topic?.billboard?.image}
                title1="Play Quiz"
                title2="Enrich Your Limit Of Knowledge"
            />

            {/* Rules section */}
            <div className="container py-20">
                <div>
                    <h2
                        className={`${hindSiliguriEnglish.className} text-5xl font-bold text-center`}
                    >
                        General Rules of Quiz
                    </h2>
                    <h2
                        className={`${hindSiliguriBangla.className} text-4xl font-bold text-center my-4`}
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
                                        className={`${hindSiliguriBangla.className} text-[62px] font-bold text-white p-5`}
                                    >
                                        {rule.sl}
                                    </p>
                                </div>
                                <div>
                                    <h3
                                        className={`${hindSiliguriBangla.className} text-left text-xl font-bold mb-2`}
                                    >
                                        নিয়ম নং - {rule.sl}
                                    </h3>
                                    <p
                                        className={`${hindSiliguriBangla.className} font-medium text-xl`}
                                    >
                                        {rule.ruleText}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <Button
                        variant="primary"
                        size="lg"
                        className={`${hindSiliguriEnglish.className} text-2xl tracking-wide font-bold py-6 px-28 rounded-3xl border-[2px] border-[#FF004C] hover:text-[#FF004C] hover:bg-white duration-500`}
                    >
                        Start Quiz
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TopicPage;
