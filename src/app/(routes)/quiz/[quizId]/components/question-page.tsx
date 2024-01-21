"use client";

// packages
import { Question } from "@prisma/client";

// Local Imports
import LottiePlayer from "@/components/ui/lottie-player";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import Questions from "./questions";
import Timer from "./timer";

type QuestionPageProps = {
    questions: Question[];
    quizId: string;
};

const QuestionPage: React.FC<QuestionPageProps> = ({ questions, quizId }) => {
    const [questionNum, setQuestionNum] = useState(1);

    return (
        <div>
            <p className="text-center text-xl text-black mb-14">
                {questionNum}/10 Question
            </p>
            <div>
                <div>
                    <Progress
                        value={questionNum * 10}
                        className="rounded-none h-[10px] bg-[#cccccc]"
                    />
                </div>
                <div className="px-16 py-10 bg-white/95 rounded-b-xl shadow-lg grid grid-cols-8 gap-x-10">
                    <div className="col-span-3">
                        <Timer />
                        <LottiePlayer />
                    </div>

                    {/* Questions */}
                    <div className="col-span-5 gap-x-5">
                        <>
                            <Questions
                                {...{ questions, setQuestionNum, quizId }}
                            />
                        </>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionPage;
