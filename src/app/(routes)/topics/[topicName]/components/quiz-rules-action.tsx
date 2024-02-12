"use client";
// Packages
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "sonner";

// Local Imports --------------------------------
import { createQuiz } from "@/actions/quiz/quiz";
import { Button } from "@/components/ui/button";
import { hindSiliguri } from "@/lib/fonts";

interface QuizRulesAction {
  topicName: string;
}

const QuizRulesAction: React.FC<QuizRulesAction> = ({ topicName }) => {
  const [isPending, startTransition] = useTransition();

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
      className={`${hindSiliguri.className} button-85`}
      onClick={handleQuizCreate}
      disabled={isPending}
      role="button"
    >
      {isPending ? "Wait..." : "Start Quiz"}
    </Button>
  );
};

export default QuizRulesAction;
