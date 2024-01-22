"use client";

// packages
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { toast } from "sonner";

// local imports
import { createQuizAnswer } from "@/actions/quiz-answer/quizAnswer";
import { quizComplete } from "@/actions/quiz/quiz";
import { QuizQuestion } from "@/types";
import { useRouter } from "next/navigation";

type QuestionProps = {
  questions: QuizQuestion[];
  setQuestionNum: Dispatch<SetStateAction<number>>;
  quizId: string;
};

const Questions: React.FC<QuestionProps> = ({
  questions,
  setQuestionNum,
  quizId,
}) => {
  // loading state
  const [isLoading, setLoading] = useState(false);
  // Current Question Index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  // Option Selection Index
  const [selectedOptIndex, setSelectedOptIndex] = useState<number | null>(null);
  const [error, setError] = useState<true | false>(false);

  // Current Question
  const currentQuestion: QuizQuestion = questions[currentQuestionIndex];

  const router = useRouter();

  // Function for submit the answer and get the next question
  // if This is the last question quiz will be submit and redirect to the result page
  const nextQuestion = useCallback(() => {
    setLoading(true);
    const toastId = toast.loading("submitting...");
    createQuizAnswer({
      questionId: currentQuestion._id,
      user_answered: [selectedOptIndex!],
      quizId: quizId,
    })
      .then(async (res) => {
        if (res.error) {
          toast.error(res.error);
          return;
        }
        if (res.success) {
          if (currentQuestionIndex + 1 == questions?.length) {
            await quizComplete(quizId)
              .then((res) => {
                if (res.error) {
                  toast.error(res.error);
                }

                if (res.success) {
                  router.push(`/quiz/${quizId}/result?new=true`);
                }
              })
              .finally(() => {
                toast.dismiss(toastId);
                setLoading(false);
              });

            return;
          }

          setQuestionNum((prev) => prev + 1);
          setCurrentQuestionIndex((prev) => prev + 1);
          setSelectedOptIndex(null);
        }
      })
      .finally(() => {
        toast.dismiss(toastId);
        setLoading(false);
      });
  }, [selectedOptIndex, currentQuestion?._id, quizId]);

  return (
    <div className="pt-6">
      <h1
        className={`text-[20px] md:text-[25px] lg:text-[30px] font-semibold mb-12`}
      >
        {currentQuestion?.question}
      </h1>
      <div className="space-y-5 w-full">
        {currentQuestion?.options.map((option, i) => (
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
              } py-2 px-4 md:py-4 md:px-6 text-[15px] md:text-xl font-medium rounded-md   duration-300 cursor-pointer`}
            >
              {i === 0 && "A"} {i === 1 && "B"} {i === 2 && "C"}{" "}
              {i === 3 && "D"}
            </div>
            <div
              className={`${
                selectedOptIndex === i
                  ? "bg-[#FF004C] text-white"
                  : "bg-[#cccccc]"
              } py-2 px-4 md:py-4 md:px-6 text-[16px] md:text-lg font-normal  rounded-lg w-full group-hover:bg-main  duration-300 group-hover:text-white cursor-pointer`}
            >
              {option}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end items-center gap-x-5 mt-6">
        {error && (
          <p className="text-base text-red-500">** Please select an answer</p>
        )}
        <button
          onClick={nextQuestion}
          disabled={isLoading}
          className="py-2 md:py-4 w-32 md:w-44 text-[16px] md:text-lg font-medium bg-[#cccccc] rounded-md disabled:bg-slate-200 disabled:text-slate-400 hover:bg-[#ff004c] hover:text-white duration-300 text-center flex justify-center "
        >
          <span>Next Question</span>
        </button>
      </div>
    </div>
  );
};

export default Questions;
