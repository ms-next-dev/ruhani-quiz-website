// Packages
import dynamic from "next/dynamic";
import Image from "next/image";

// Local Imports
import { getQuizById } from "@/actions/quiz/quiz";
import { Separator } from "@/components/ui/separator";
import { prismaDb } from "@/lib/db";
import { hindSiliguri, manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
const LottiePlayer = dynamic(() => import("@/components/ui/lottie-player"));

const ResultPage = async ({
  params,
  searchParams,
}: {
  params: { quizId: string };
  searchParams: { new: boolean };
}) => {
  const isNew = searchParams.new;

  const quizData = await getQuizById(params.quizId);

  const topic = await prismaDb.topic.findFirst({
    where: {
      id: quizData.data?.topicId,
    },
  });

  const wrongAnswer =
    quizData?.data?.questions?.length !== undefined &&
    quizData?.data?.total_marks !== null &&
    quizData?.data?.questions?.length - quizData?.data?.total_marks;

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="relative h-fit bg-black">
      {/* <Image
        src="https://res.cloudinary.com/dn2pqzag1/image/upload/v1706613859/ruhani%20quiz/color_tcpxvg.png"
        alt="color"
        fill
        style={{
          objectFit: "cover",
        }}
      /> */}
      <div className="container ">
        {isNew && (
          <div>
            <LottiePlayer
              src="https://lottie.host/627d04c2-b575-41ac-a9f7-ad58362b1f4a/6VfpkYcgeL.json"
              height="200px"
              width="200px"
            />
            <h3
              className={`${hindSiliguri.className} text-center text-[22px] text-white md:text-[26px] font-medium mb-1 md:mb-2`}
            >
              Quiz Result
            </h3>
            <p
              className="text-center text-white/60 text-[12px] 
            mb-1 md:mb-2"
            >
              {formattedDate}
            </p>
            <Separator className="h-[1px] w-[240px] mx-auto bg-white/10" />
          </div>
        )}
        <div className={`${isNew ? "py-4" : "py-8"}`}>
          <div className={`${hindSiliguri.className}`}>
            <div>
              <div className=" max-w-[1100px] mx-auto grid grid-cols-2 gap-16  border-[1px] border-white/20 rounded-[8px] p-3 lg:p-5 gap-y-3">
                <div className="col-span-2 md:col-span-1 bg-white/5 rounded-[8px] px-3 lg:px-6 py-2">
                  <div className="flex justify-center mb-6">
                    <Image
                      src="/icons/question-answer.svg"
                      alt="questionIcon"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="text-[15px] md:text-lg font-semibold">
                    <div className="flex justify-between items-center mb-2">
                      <p
                        className={`${manrope.className} font-semibold text-white/70`}
                      >
                        Total Question
                      </p>
                      <p className="text-yellow-500 font-medium">
                        {quizData?.data?.questions.length}
                      </p>
                    </div>
                    <Separator className="h-[1px] bg-white/10" />
                    <div className="flex justify-between items-center my-2">
                      <p
                        className={`${manrope.className} font-semibold text-white/70`}
                      >
                        Wrong Answer
                      </p>
                      <p className="text-main font-medium">{wrongAnswer}</p>
                    </div>
                    <Separator className="h-[1px] bg-white/10" />
                    <div className="flex justify-between items-center mt-2 mb-1">
                      <p
                        className={`${manrope.className} font-semibold text-white/70`}
                      >
                        Correct Answer
                      </p>
                      <p className="text-green-600 font-medium">
                        {quizData.data?.total_marks}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1 bg-white/5 rounded-[8px] px-3 lg:px-6 py-2 pt-5">
                  <div className="flex justify-center mb-7">
                    <Image
                      src="/icons/clock-icon.svg"
                      alt="time"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className="text-[15px] md:text-lg font-semibold whitespace-nowrap">
                    <div className="flex justify-between items-center mb-2">
                      <p
                        className={`${manrope.className} font-semibold text-white/70`}
                      >
                        Quiz Topic
                      </p>
                      <p className="text-yellow-500 font-medium">
                        {topic?.name}
                      </p>
                    </div>
                    <Separator className="h-[1px] bg-white/10" />
                    <div className="flex justify-between items-center my-2">
                      <p
                        className={`${manrope.className} font-semibold text-white/70`}
                      >
                        Quiz Time
                      </p>
                      <p className="text-main font-medium">10 minutes</p>
                    </div>
                    <Separator className="h-[1px] bg-white/10" />
                    <div className="flex justify-between items-center mt-2 mb-1">
                      <p
                        className={cn(
                          manrope.className,
                          "font-semibold text-white/70"
                        )}
                      >
                        Total Score
                      </p>
                      <p className="text-green-600 font-medium">
                        {quizData.data?.total_marks}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quiz question & answers */}
          <div className={cn(hindSiliguri.className)}>
            <div>
              <h2
                className={`text-center text-[22px] md:text-[28px] font-medium mt-8 md:mt-14 md:mb-4 text-white`}
              >
                Quiz Answers
              </h2>
            </div>
            <div className="columns-1 md:columns-2 gap-10 py-12 ">
              {quizData?.data?.questions.map((question) => (
                <div
                  key={question.id}
                  className="break-inside-avoid border-[1px] border-white/20 rounded-xl h-fit p-5 mb-6 relative"
                >
                  <h1
                    className={cn(
                      manrope.className,
                      "font-semibold mb-5 tracking-wider"
                    )}
                  >
                    {question.question?.question}
                  </h1>
                  <div className="space-y-4 w-full">
                    {question.question?.options.map((option, i) => (
                      <div key={option} className="">
                        <div
                          className={cn(
                            question.question?.correct_answer[0] ===
                              question.user_answered[0] &&
                              question.question?.correct_answer[0] === i
                              ? "border-[1px] bg-green-400/30 border-green-500 text-green-500 font-medium"
                              : question.question?.correct_answer[0] === i
                              ? "border-[1px] border-green-500 text-green-500 bg-green-400/30 font-medium"
                              : question.user_answered[0] === i
                              ? "border-[.2px] bg-red-50 border-red-500 bg-red-400/30 text-red-500"
                              : "bg-slate-100",
                            "bg-white/10 text-white/70 py-2 px-4 text-[14px] font-normal rounded-[4px] w-full ",
                            question.user_answered[0] === 5 && "border-0"
                          )}
                        >
                          {option}
                        </div>
                      </div>
                    ))}
                  </div>
                  {question.user_answered[0] === 5 && (
                    <p className="text-red-500/70 text-[12px] mt-4">
                      You didn't answer this question because of time up
                    </p>
                  )}
                  <p
                    className={`mt-4 border-[1px] border-gray-300/15 py-2 px-4 md:py-4 md:px-6 text-[14px] md:text[16px]base font-normal text-white/80 rounded-[6px] w-full selection:bg-gray-700`}
                  >
                    {question.question?.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>{" "}
      </div>
    </section>
  );
};

export default ResultPage;
