// Local Imports
import { prismaDb } from "@/lib/db";

const QuizGround = async ({ params }: { params: { quizId: string } }) => {
  if (params.quizId.length > 24) {
    throw new Error("Sorrry");
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
    throw new Error("Sorrry");
  }
  return <div>QuizGround</div>;
};

export default QuizGround;
