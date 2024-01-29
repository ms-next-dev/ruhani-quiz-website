// Packages
import Image from "next/image";

// Local Imports
import { getQuizById } from "@/actions/quiz/quiz";
import LottiePlayer from "@/components/ui/lottie-player";
import { Separator } from "@/components/ui/separator";
import { getTopicById } from "@/data/topic";
import { hindSiliguri } from "@/lib/fonts";

const ResultPage = async ({
    params,
    searchParams,
}: {
    params: { quizId: string };
    searchParams: { new: boolean };
}) => {
    const isNew = searchParams.new;

    const quizData = await getQuizById(params.quizId);

    const topic =
        quizData.data !== undefined &&
        quizData.data !== null &&
        (await getTopicById(quizData.data.topicId));

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
        <div className="container">
            {isNew && (
                <div>
                    <LottiePlayer
                        src="https://lottie.host/627d04c2-b575-41ac-a9f7-ad58362b1f4a/6VfpkYcgeL.json"
                        height="300px"
                        width="300px"
                    />
                    <h3
                        className={`${hindSiliguri.className} text-center text-2xl md:text-4xl font-medium mb-1 md:mb-4`}
                    >
                        Quiz Completed
                    </h3>
                    <Separator className="h-[1px] bg-black/10" />
                </div>
            )}
            <div className={`${isNew ? "my-14" : "my-8"}`}>
                <div className={`${hindSiliguri.className}`}>
                    <p className="text-center text-sm md:text-xl">
                        {formattedDate}
                    </p>
                    <p className="text-center text-xl md:text-3xl font-semibold mt-2 md:mt-4 mb-4 md:mb-10">
                        Topic - {topic && topic.name}
                    </p>

                    <div>
                        <div className="grid grid-cols-2 md:grid-cols-11 border rounded-[8px] p-3 lg:p-5 bg-gray-50 gap-y-3">
                            <div className="col-span-2 md:col-span-5 bg-white rounded-[8px] px-3 lg:px-6 py-2">
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
                                        <p>Total Question</p>
                                        <p className="text-yellow-500">
                                            {quizData?.data?.questions.length}
                                        </p>
                                    </div>
                                    <Separator className="h-[1px] bg-black/10" />
                                    <div className="flex justify-between items-center my-2">
                                        <p>Wrong Answer</p>
                                        <p className="text-main">
                                            {wrongAnswer}
                                        </p>
                                    </div>
                                    <Separator className="h-[1px] bg-black/10" />
                                    <div className="flex justify-between items-center mt-2 mb-1">
                                        <p>Correct Answer</p>
                                        <p className="text-green-600">
                                            {quizData.data?.total_marks}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden col-span-1 md:flex justify-center items-center gap-x-5 px-5">
                                <Separator className="w-[1px] h-full bg-black/10" />
                                <Separator className="w-[1px] h-full bg-black/10" />
                            </div>
                            <div className="col-span-2 md:col-span-5 bg-white rounded-[8px] px-3 lg:px-6 py-2 pt-5">
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
                                        <p>Quiz Time</p>
                                        <p className="text-yellow-500">
                                            10 minute
                                        </p>
                                    </div>
                                    <Separator className="h-[1px] bg-black/10" />
                                    <div className="flex justify-between items-center my-2">
                                        <p>Quiz Submission Time</p>
                                        <p className="text-main">7 minute</p>
                                    </div>
                                    <Separator className="h-[1px] bg-black/10" />
                                    <div className="flex justify-between items-center mt-2 mb-1">
                                        <p>Total Score</p>
                                        <p className="text-green-600">
                                            {quizData.data?.total_marks}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quiz question & answers */}
                <div className={`${hindSiliguri.className}`}>
                    <div>
                        <h2
                            className={`text-center text-2xl md:text-4xl font-medium mt-8 md:mt-14 md:mb-4`}
                        >
                            Quiz Answers
                        </h2>
                        <div className="w-3/5 mx-auto">
                            <Separator className="h-[1px] bg-black/10" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-6 md:my-10">
                        {quizData?.data?.questions.map((question) => (
                            <div
                                key={question.id}
                                className="border border-t-8 border-gray-200 rounded-xl p-5"
                            >
                                <h1
                                    className={`text-[16px] lg:text-[20px] font-semibold mb-5 md:h-20`}
                                >
                                    {question.question?.question}
                                </h1>
                                <div className="space-y-4 w-full">
                                    {question.question?.options.map(
                                        (option, i) => (
                                            <div key={option} className="">
                                                <div
                                                    className={`${
                                                        question.question
                                                            ?.correct_answer[0] ===
                                                            question
                                                                .user_answered[0] &&
                                                        question.question
                                                            ?.correct_answer[0] ===
                                                            i
                                                            ? "border-2 border-green-500 text-green-500 font-semibold"
                                                            : question.question
                                                                  ?.correct_answer[0] ===
                                                              i
                                                            ? "border-2 border-green-500 text-green-500 font-semibold"
                                                            : question
                                                                  .user_answered[0] ===
                                                              i
                                                            ? "border-2 border-red-500 text-red-500"
                                                            : "bg-gray-100"
                                                    } bg-gray-100 py-2 px-4 md:py-4 md:px-6 text-[16px] md:text-base font-normal rounded-[6px] w-full`}
                                                >
                                                    {option}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                                <p
                                    className={`mt-8 border border-gray-300 py-2 px-4 md:py-4 md:px-6 text-[16px] md:text-base font-normal rounded-[6px] w-full`}
                                >
                                    {question.question?.explanation}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>{" "}
        </div>
    );
};

export default ResultPage;
