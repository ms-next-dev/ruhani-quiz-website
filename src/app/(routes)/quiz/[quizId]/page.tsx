// Packages
import Image from "next/image";
import { redirect } from "next/navigation";

// Local Imports
import { getQuizQuestion } from "@/actions/question/questions";
import { prismaDb } from "@/lib/db";
import { QuizQuestion } from "@/types";
import QuestionPage from "./components/question-page";

const QuizGround = async ({ params }: { params: { quizId: string } }) => {
  if (params.quizId.length > 24) {
    redirect("/topics");
  }
  const quiz = await prismaDb.quiz.findUnique({
    where: {
      id: params.quizId,
    },
  });

  if (!quiz) {
    redirect("/");
  }

  if (quiz.played) {
    redirect(`/quiz/${params.quizId}/result?new=false`);
  }

  const allQuestions = await getQuizQuestion(quiz.topicId, 10);
  if (allQuestions?.error) {
    redirect("/");
  }
  const questions = allQuestions?.data;

  return (
    <div className="w-full flex justify-center items-start pt-[100px] min-h-screen relative bg-black">
      <Image
        src="https://res.cloudinary.com/dn2pqzag1/image/upload/v1706613859/ruhani%20quiz/color_tcpxvg.png"
        alt="color"
        fill
        style={{
          objectFit: "cover",
        }}
      />
      <QuestionPage
        questions={questions as QuizQuestion[]}
        quizId={params.quizId}
      />
    </div>
  );
};

export default QuizGround;
