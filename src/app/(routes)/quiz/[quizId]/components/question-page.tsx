"use client";

// packages
import { useCallback, useState } from "react";

// Local Imports
import { createQuizAnswer } from "@/actions/quiz-answer/quizAnswer";
import { quizComplete, quizTimeUp } from "@/actions/quiz/quiz";
import LottiePlayer from "@/components/ui/lottie-player";
import { QuizQuestion } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Questions from "./questions";
import Timer from "./timer";

type QuestionPageProps = {
  questions: QuizQuestion[];
  quizId: string;
};

const QuestionPage: React.FC<QuestionPageProps> = ({ questions, quizId }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  // Option Selection Index
  const [selectedOptIndex, setSelectedOptIndex] = useState<number | null>(null);
  const [isLoading, setLoading] = useState(false);

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

          setCurrentQuestionIndex((prev) => prev + 1);
          setSelectedOptIndex(null);
        }
      })
      .finally(() => {
        toast.dismiss(toastId);
        setLoading(false);
      });
  }, [selectedOptIndex, currentQuestion?._id, quizId]);

  const timeUpHandler = () => {
    setLoading(true);
    const toastId = toast.loading("Auto Submitting...");
    const currentQuestion = currentQuestionIndex;
    const totalQ = questions?.length;
    const notSubmitted = questions.slice(currentQuestion, totalQ);
    const idsOfNotSubmitted = notSubmitted.map((item) => {
      return item._id;
    });

    quizTimeUp(idsOfNotSubmitted, quizId)
      .then((res) => {
        if (res.error) {
          toast.error(res.error, {
            id: toastId,
          });
        }

        if (res.success) {
          router.push(`/quiz/${quizId}/result?new=true`);
        }
      })
      .finally(() => {
        toast.dismiss(toastId);
      });
  };

  return (
    <div>
      <p className="text-center text-[16px] md:text-xl text-black mb-8 md:mb-14">
        {currentQuestionIndex + 1}/{questions?.length} Question
      </p>
      <div>
        <div>
          {/* <Progress
            value={questionNum * 10}
            className="rounded-none h-[10px] bg-[#cccccc]"
          /> */}
        </div>
        <div className="px-4 py-8 md:px-16 md:py-10 bg-white/95 rounded-b-xl shadow-lg grid grid-cols-8 gap-x-10">
          <div className="col-span-8 md:col-span-3">
            <Timer onCompleteA={timeUpHandler} />
            <div className="hidden md:block">
              <LottiePlayer src="https://lottie.host/9e8fec58-3b6e-4176-bd74-591b3208b9a5/uRfqpO0LZ4.json" />
            </div>
          </div>

          {/* Questions */}
          <div className="col-span-8 md:col-span-5 ">
            <>
              <Questions
                {...{
                  isLoading,
                  selectedOptIndex,
                  setSelectedOptIndex,
                  currentQuestion,
                  nextQuestion,
                }}
              />
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
