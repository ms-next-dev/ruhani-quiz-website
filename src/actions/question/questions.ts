"use server";

import { prismaDb } from "@/lib/db";
import { QuizQuestion } from "@/types";

export const getQuizQuestion = async (topicId: string, take: number) => {
  try {
    const result = await prismaDb.question.aggregateRaw({
      pipeline: [
        {
          $match: {
            topicId: {
              $oid: topicId,
            },
            published: true,
          },
        },
        {
          $sample: { size: take },
        },
      ],
    });

    if (!result) {
      return { error: "Empty Result from database!", data: null };
    }

    const formattedQuestion: QuizQuestion[] = Object.values(result).map(
      (item: any) => {
        return {
          _id: item._id["$oid"],
          question: item.question,
          correct_answer: item.correct_answer,
          options: item.options,
          explanation: item.explanation,
        };
      }
    );

    return { success: "retrieved", data: formattedQuestion };
  } catch (error: any) {
    console.log("QUESTION_GET_ERROR", error);
    return { error: "Something went wrong!", data: null };
  }
};
