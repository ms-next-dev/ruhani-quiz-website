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
  try {
    const result = await prismaDb.quizAnswer.create({
      data: {
        user_answered: user_answered,
        quizId: quizId,
        question: {
          connect: {
            id: questionId,
          },
        },
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
