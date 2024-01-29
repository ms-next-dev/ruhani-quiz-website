// Local Imports
import { getQuizQuestion } from "@/actions/question/questions";
import { prismaDb } from "@/lib/db";
import { hindSiliguri } from "@/lib/fonts";
import { QuizQuestion } from "@/types";
import { redirect } from "next/navigation";
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
        <div>
            <div
                className={`${hindSiliguri.className} h-[calc(100vh-72px)]`}
                style={{
                    background: `url(${"/quizbg.jpg"})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <div className="max-w-[1440px] mx-auto md:px-12 py-14 h-full">
                    <QuestionPage
                        questions={questions as QuizQuestion[]}
                        quizId={params.quizId}
                    />
                </div>
            </div>
        </div>
    );
};

export default QuizGround;
