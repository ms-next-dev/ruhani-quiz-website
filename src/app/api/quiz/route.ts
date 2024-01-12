import { prismaDb } from "@/lib/db";
import { NextResponse } from "next/server";

// 1ast attempt
// export async function POST(req: Request) {
//   try {
//     const result = await prismaDb.quiz.create({
//       data: {
//         participated: "658ef2caa7c9cf8a7dbebbc1",
//         questions: {
//           create: {
//             question: "659b4e2ed272f4629d4079e5",
//             user_answered: [1],
//           },
//         },
//       },
//       include: {
//         questions: true,
//       },
//     });

//     return NextResponse.json(result);
//   } catch (error) {
//     console.log("error", error);
//   }

//   return NextResponse.json(true, { status: 200 });
// }

const data = [
  {
    user_answered: [1],
    question: "659b4e2ed272f4629d4079e5",
  },
  {
    user_answered: [1],
    question: "659ff07aa6e1ab648fb8c3fa",
  },
];

export async function POST(req: Request) {
  try {
    const result = await prismaDb.quiz.create({
      data: {
        participated: "658ef2caa7c9cf8a7dbebbc1",
        questions: {
          create: {
            user_answered: [1],
            question: {
              connect: { id: "659ff11ea6e1ab648fb8c3fc" },
            },
          },
        },
      },
      include: {
        questions: {
          include: {
            question: true,
          },
        },
      },
    });

    const question = await prismaDb.question.findUnique({
      where: {
        id: "659ff11ea6e1ab648fb8c3fc",
      },
    });

    return NextResponse.json({
      postResult: result,
      individual_Question: question,
    });
  } catch (error) {
    console.log("error", error);
  }

  return NextResponse.json(true, { status: 200 });
}
