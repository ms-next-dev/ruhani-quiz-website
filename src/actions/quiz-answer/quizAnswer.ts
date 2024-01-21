"use server";

import { prismaDb } from "@/lib/db";

interface CreateQuizAnswerProps {
    questionId: string;
    user_answered: [number];
    quizId: string;
}

export const createQuizAnswer = async ({
    questionId,
    user_answered,
    quizId,
}: CreateQuizAnswerProps) => {
    const isQuestion = await prismaDb.question.findUnique({
        where: {
            id: questionId,
        },
    });

    if (!isQuestion) {
        return { error: "Wrong question credentials !", data: null };
    }

    if (user_answered.length < 1) {
        return { error: "Please select an answer.", data: null };
    }

    const isQuiz = await prismaDb.quiz.findUnique({
        where: {
            id: quizId,
        },
    });

    if (!isQuiz) {
        return { error: "Wrong quiz credentials !", data: null };
    }

    try {
        const result = await prismaDb.quizAnswer.create({
            data: {
                user_answered: user_answered,
                quizId: quizId,
                question: { connect: { id: questionId } },
            },
        });

        return {
            success: true,
            data: result,
        };
    } catch (error) {
        console.log("CREATE_QUIZ_ANSWER_ERROR", error);
        return { error: "Failed to save answer", data: null };
    }
};
