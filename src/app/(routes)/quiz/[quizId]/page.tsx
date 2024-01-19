// Local Imports
import { prismaDb } from "@/lib/db";
import { redirect } from "next/navigation";

const QuizGround = async ({ params }: { params: { quizId: string } }) => {
  if (params.quizId.length > 24) {
    redirect("/topics");
  }
  const quiz = await prismaDb.quiz.findUnique({
    where: {
      id: params.quizId as string,
      AND: {
        played: false,
      },
    },
  });

  if (!quiz) {
    redirect("/");
  }
  return <div>QuizGround</div>;
};

export default QuizGround;
