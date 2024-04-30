"use client";

// packages
import { useCallback, useEffect, useState } from "react";

// Local Imports
import { createQuizAnswer } from "@/actions/quiz-answer/quizAnswer";
import { quizComplete, quizTimeUp } from "@/actions/quiz/quiz";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { QuizQuestion } from "@/types";
import { AlarmClock, CheckCircle2 } from "lucide-react";
import { Manrope } from "next/font/google";
import { useRouter } from "next/navigation";
import { useTimer } from "react-timer-hook";
import { toast } from "sonner";

type QuestionPageProps = {
  questions: QuizQuestion[];
  quizId: string;
};
const manrope = Manrope({ subsets: ["latin"] });

const QuestionPage: React.FC<QuestionPageProps> = ({ questions, quizId }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  // Option Selection Index
  const [selectedOptIndex, setSelectedOptIndex] = useState<number | null>(null);
  const [isLoading, setLoading] = useState(false);

  const currentQuestion: QuizQuestion = questions[currentQuestionIndex];
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);
  const { minutes, seconds } = useTimer({
    expiryTimestamp: time,
    onExpire: () => {
      timeUpHandler();
    },
  });

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
  }, [
    selectedOptIndex,
    currentQuestion?._id,
    quizId,
    currentQuestionIndex,
    questions,
    router,
  ]);

  const timeUpHandler = useCallback(() => {
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
  }, [currentQuestionIndex, questions, quizId, router]);

  const handleVisibilityChange = useCallback(() => {
    if (document !== undefined && document.hidden) {
      timeUpHandler();
    }
  }, [timeUpHandler]);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  // calculate is the last question
  const isLastQuestion = questions.length === currentQuestionIndex + 1;

  return (
    <div className="w-1/2 absolute h-fit py-[50px] text-black drop-shadow-lg border-slate-50/10 backdrop-blur-lg hover:backdrop-blur-xl  border-[1px]">
      <div className="flex justify-center items-center h-auto gap-x-2 mt-2">
        <AlarmClock className="text-slate-400 w-5 h-5" />
        <span className="font-semibold text-white/80">
          {minutes}:{seconds}
        </span>
      </div>

      <section className="w-3/4 mx-auto shadow-[rgba(9,30,66,0.1)_0px_1px_1px,rgba(9,30,66,0.2)_0px_0px_1px_1px] border-white/10 border-[1px] p-4 mt-10 relative">
        <div className="bg-main text-white w-fit text-[12px] py-1 px-3 rounded-2xl absolute -top-4 left-1/2 transform -translate-x-1/2">
          Question {currentQuestionIndex + 1}/{questions.length}
        </div>
        <h3
          className={`${manrope.className} text-white/70 text-center tracking-wider mt-3 selection:bg-main selection:text-white`}
        >
          {currentQuestion.question}
        </h3>
      </section>

      <section className="w-3/4 mx-auto  mt-6 grid grid-cols-2 gap-4">
        {currentQuestion?.options.map((item, index) => (
          <div
            key={item}
            className={cn(
              `${manrope.className} shadow-[rgba(9,30,66,0.1)_0px_1px_1px,rgba(9,30,66,0.2)_0px_0px_1px_1px] p-2 duration-300 hover:bg-main/10 text-white/60 text-[14px] text-center font-semibold cursor-pointer border-[1px] border-white/10 `,
              selectedOptIndex == index &&
                "shadow-[rgba(255,0,76,0.3)_0px_1px_1px,rgba(255,0,76,0.2)_0px_1px_1px_1px] bg-main/10 text-white/70"
            )}
            onClick={() => {
              setSelectedOptIndex(index);
            }}
          >
            <CheckCircle2
              className={cn(
                "absolute text-main/60",
                index === selectedOptIndex ? "block" : "hidden"
              )}
            />
            <div className={cn("h-fit", index === selectedOptIndex && "pl-3")}>
              {item}
            </div>
          </div>
        ))}
      </section>
      <section className=" flex justify-center w-3/4 mx-auto mt-10">
        <Button
          variant="primary"
          className="px-8 active:translate-y-[1px] duration-200 rounded-lg"
          onClick={nextQuestion}
          disabled={isLoading}
        >
          {isLastQuestion ? "Finish" : "Next"}
        </Button>
      </section>
    </div>
  );
};

export default QuestionPage;
