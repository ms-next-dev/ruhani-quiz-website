"use client";
// Packages
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

// Local Imports --------------------------------
import { createQuiz } from "@/actions/quiz/quiz";
import { Button } from "@/components/ui/button";
import { hindSiliguriEnglish } from "@/lib/fonts";

interface QuizRulesAction {
  topicName: string;
}

const QuizRulesAction: React.FC<QuizRulesAction> = ({ topicName }) => {
  const [isPending, startTransition] = useState();

  const router = useRouter();
  const handleQuizCreate = () => {
    const toastId = toast.loading("Processing...");
    startTransition(() => {
      createQuiz(topicName).then((res) => {
        if (res.error) {
          toast.error(res.error, {
            id: toastId,
          });
        }

        if (res.success) {
          toast.success(res.success, {
            id: toastId,
          });

          router.push(`/quiz/${res.data.id}`);
        }
      });
    });
  };
  return (
    <Button
      className={`${hindSiliguriEnglish.className} rounded-[4px] bg-main hover:bg-main/60 duration-300 px-4 py-2 text-white`}
      onClick={handleQuizCreate}
      disabled={isPending}
    >
      Start Quiz
    </Button>
  );
};

export default QuizRulesAction;
