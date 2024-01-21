// Local Imports
import { prismaDb } from "@/lib/db";
import { hindSiliguri } from "@/lib/fonts";
import { redirect } from "next/navigation";
import QuestionPage from "./components/question-page";

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

    const questions = await prismaDb.question.aggregateRaw({
        pipeline: [
            {
                $match: {
                    topicId: {
                        $oid: quiz.topicId,
                    },
                },
            },
            {
                $sample: { size: 10 },
            },
        ],
    });

    // FORMAT QUESTION

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
                <div className="max-w-[1440px] mx-auto px-12 py-14 h-full">
                    <QuestionPage {...{ questions, quizId: params.quizId }} />
                </div>
            </div>
        </div>
    );
};

export default QuizGround;
