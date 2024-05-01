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

export async function POST(req: Request) {
  return NextResponse.json(true, { status: 200 });
}
