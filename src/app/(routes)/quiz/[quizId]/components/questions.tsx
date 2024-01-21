"use client";

// packages
import { Question } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

// local imports
import { createQuizAnswer } from "@/actions/quiz-answer/quizAnswer";

type QuestionProps = {
    questions: Question[];
    setQuestionNum: Dispatch<SetStateAction<number>>;
    quizId: string;
};

const Questions: React.FC<QuestionProps> = ({
    questions,
    setQuestionNum,
    quizId,
}) => {
    const [isPending, startTransition] = useState();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedOptIndex, setSelectedOptIndex] = useState<number | null>(
        null
    );
    const [error, setError] = useState(false);

    const currentQuestion: Question = questions[currentQuestionIndex as number];

    const handleNextQuestion = () => {
        if (selectedOptIndex === null) {
            setError(true);
        } else {
            const toastId = toast.loading("Processing...");
            startTransition(() => {
                createQuizAnswer({
                    questionId: currentQuestion.id,
                    user_answered: [selectedOptIndex],
                    quizId: quizId,
                }).then((res) => {
                    if (res.error) {
                        toast.error(res.error, {
                            id: toastId,
                        });
                    }

                    if (res.success) {
                        // Move to the next question
                        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                        setQuestionNum((prev) => prev + 1);
                        setSelectedOptIndex(null);
                        setError(false);
                    }
                });
            });
        }
    };

    return (
        <div>
            <h1 className={`text-[30px] font-semibold mb-12`}>
                {currentQuestion.question}
            </h1>
            <div className="space-y-5 w-full">
                {currentQuestion.options.map((option, i) => (
                    <div
                        key={option}
                        className="flex justify-start items-center gap-x-3 group"
                        onClick={() => {
                            setSelectedOptIndex(i);
                            setError(false);
                        }}
                    >
                        <div
                            className={`${
                                selectedOptIndex === i
                                    ? "bg-[#FF004C] text-white"
                                    : "bg-[#cccccc]"
                            } py-4 px-6 text-xl font-medium rounded-md group-hover:bg-[#FF004C] group-hover:text-white duration-300 cursor-pointer`}
                        >
                            {i === 0 && "A"} {i === 1 && "B"} {i === 2 && "C"}{" "}
                            {i === 3 && "D"}
                        </div>
                        <div
                            className={`${
                                selectedOptIndex === i
                                    ? "bg-[#FF004C] text-white"
                                    : "bg-[#cccccc]"
                            } py-4 px-6 text-xl font-medium  rounded-md w-full group-hover:bg-[#FF004C] group-hover:text-white duration-300 cursor-pointer`}
                        >
                            {option}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end items-center gap-x-5 mt-6">
                {error && (
                    <p className="text-base text-red-500">
                        ** Please select an answer
                    </p>
                )}
                <button
                    onClick={handleNextQuestion}
                    disabled={isPending}
                    className="py-4 w-44 text-xl font-semibold bg-[#cccccc] rounded-md hover:bg-[#ff004c] hover:text-white duration-300 text-center flex justify-center"
                >
                    {isPending ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                        "Next Question"
                    )}
                </button>
            </div>
        </div>
    );
};

export default Questions;
