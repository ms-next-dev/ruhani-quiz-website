"use server";

import { auth } from "@/auth";
import { prismaDb } from "@/lib/db";
import { redirect } from "next/navigation";

export const createQuiz = async (topicName: string) => {
  const authUser = await auth();
  if (!authUser) {
    redirect("/login");
  }
  const loggedInUserId = authUser?.user.id;

  const name = topicName.split("_").join(" ");

  const existingTopic = await prismaDb.topic.findUnique({
    where: {
      name: name,
    },
  });

  if (!existingTopic) {
    return { error: "Wrong topic name!", data: null };
  }

  try {
    const result = await prismaDb.quiz.create({
      data: {
        participated: loggedInUserId!,
        topicId: existingTopic.id,
      },
      select: {
        id: true,
        participated: true,
      },
    });
    return {
      success: "Success! You will redirect to the ground in a second...",
      data: result,
    };
  } catch (error: any) {
    console.log("QUIZ_CREATE_ERROR", error);
    return { error: "Failed to start quiz!", data: null };
  }
};

export const quizComplete = async (quizId: string) => {
  const allQuizAnswer = await prismaDb.quizAnswer.findMany({
    where: {
      quizId: quizId,
    },
    include: {
      question: true,
    },
  });

  let marks = 0;

  allQuizAnswer.forEach(({ user_answered, question }) => {
    if (user_answered[0] === question?.correct_answer[0]) {
      marks += 1;
    }
  });

  try {
    await prismaDb.quiz.update({
      where: {
        id: quizId,
      },
      data: {
        played: true,
        total_marks: marks,
      },
    });
    return { success: `You got ${marks / allQuizAnswer.length}!` };
  } catch (error: any) {
    console.log("QUIZ_COMPLETE_ERROR", error);
    return { error: "Something went wrong!" };
  }
};
