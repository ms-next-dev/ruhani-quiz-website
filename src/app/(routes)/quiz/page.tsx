"use client";

// Packages
import { Player } from "@lottiefiles/react-lottie-player";
import { Anek_Bangla } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

// Local Imports
import { createQuiz } from "@/actions/quiz/quiz";
import { Button } from "@/components/ui/button";
import lottieFile from "../../../../public/lottie/question.json";

const anek = Anek_Bangla({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
});

const QuizPage = ({ params }: { params: { topicId: string } }) => {
  const [mount, setMount] = useState<true | false>(false);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) {
    return null;
  }

  const router = useRouter();

  const quizHandler = () => {
    const toastId = toast.loading("Please wait a second...");
    startTransition(() => {
      createQuiz(params.topicId).then((res) => {
        if (res.error) {
          toast.error(res.error, {
            id: toastId,
          });
        }
        if (res.success) {
          toast.success(res.success, {
            id: toastId,
          });
          const quizId = res.data.id;
          router.push(`/topics/${params.topicId}/quiz/${quizId}`);
        }
      });
    });
  };

  return (
    <div className="bg-slate-100 min-h-[60vh] flex justify-center items-center">
      <div className="container bg-white w-full md:w-1/2 lg:w-1/3 h-[300px] flex flex-col items-center justify-between p-[30px]">
        <Player
          autoplay
          loop={true}
          style={{ height: "60px", width: "60px" }}
          src={lottieFile}
        />
        <p className={`${anek.className} text-[30px]`}>
          ১০ মিনিটে ১০টি প্রশ্নের উত্তর দিতে হবে
        </p>
        <Button
          variant="primary"
          className="rounded-[4px]"
          onClick={quizHandler}
          disabled={isPending}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default QuizPage;
