"use server";

import { auth } from "@/auth";
import { prismaDb } from "@/lib/db";
import { revalidatePath } from "next/cache";
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
  const authUser = await auth();
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

  const calculatePercentage = (marks / allQuizAnswer.length) * 100;

  try {
    await prismaDb.quiz.update({
      where: {
        id: quizId,
      },
      data: {
        played: true,
        total_marks: marks,
        parcentage: calculatePercentage,
      },
    });
    await prismaDb.user.update({
      where: {
        id: authUser?.user.id,
      },
      data: {
        score: {
          increment: marks,
        },
      },
    });
    revalidatePath("/profile");
    await updateLeaderBoard(authUser?.user?.id as string);
    return { success: `You got ${marks / allQuizAnswer.length}!` };
  } catch (error: any) {
    console.log("QUIZ_COMPLETE_ERROR", error);
    return { error: "Something went wrong!" };
  }
};

export const quizTimeUp = async (ids: string[], quizId: string) => {
  ids.forEach(async (questionId: string) => {
    await prismaDb.quizAnswer.create({
      data: {
        user_answered: [5],
        quizId: quizId,
        question: {
          connect: {
            id: questionId,
          },
        },
      },
    });
  });

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

export const getQuizById = async (quizId: string) => {
  try {
    const result = await prismaDb.quiz.findUnique({
      where: {
        id: quizId,
      },
      include: {
        questions: {
          include: {
            question: true,
          },
        },
      },
    });

    return {
      success: "Quiz data fetched successfully.",
      data: result,
    };
  } catch (error: any) {
    console.log("GET_QUIZ_ERROR", error);
    return { error: "Something went wrong!" };
  }
};

// leaderboard update

const updateLeaderBoard = async (userId: string) => {
  const quizes = await prismaDb.quiz.findMany({
    where: {
      participated: userId,
    },
  });
  const sumPercentage = quizes.reduce((acc, obj) => acc + obj.parcentage!, 0);
  // average marks percentage
  let averatePercentage = sumPercentage / quizes.length;
  // format >> keep one length after decimal
  let formattedPercentage = averatePercentage.toFixed(1);

  // If the decimal part is 0, convert to integer
  if (
    formattedPercentage.indexOf(".") !== -1 &&
    formattedPercentage.split(".")[1] !== "0"
  ) {
    averatePercentage = Number(formattedPercentage);
  } else {
    averatePercentage = Math.floor(Number(formattedPercentage));
  }

  const exisTingLeaderBoard = await prismaDb.leaderBoard.findFirst({
    where: {
      participated: userId,
    },
  });

  if (!exisTingLeaderBoard) {
    await prismaDb.leaderBoard.create({
      data: {
        participated: userId,
        marks: averatePercentage,
      },
    });
  }

  await prismaDb.leaderBoard.update({
    where: {
      id: exisTingLeaderBoard?.id,
    },
    data: {
      marks: averatePercentage,
    },
  });
};
