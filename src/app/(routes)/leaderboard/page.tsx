// // Components
// import { auth } from "@/auth";
// import { Card } from "@/components/ui/card";
// import RuhaniImage from "@/components/ui/ruhani-image";
// import { Separator } from "@/components/ui/separator";
// import { prismaDb } from "@/lib/db";
// import Image from "next/image";

// interface leaderBoardData {
//   id: string;
//   participated: string;
//   marks: number;
//   user: {
//     name: string | null;
//     avatar: string | null;
//   };
//   ranking?: number;
// }

// const Page = async () => {
//   const authUser = await auth();
//   const loggedInUserId = authUser?.user.id;

//   const allData: leaderBoardData[] = await prismaDb.leaderBoard.findMany({
//     include: {
//       user: {
//         select: {
//           name: true,
//           avatar: true,
//         },
//       },
//     },
//     orderBy: {
//       marks: "desc",
//     },
//     take: 500,
//   });

//   console.log(allData);

//   allData.sort((a, b) => b.marks - a.marks);
//   allData.forEach((item, index) => {
//     item.ranking = index + 1;
//   });
//   const loggedInUserRanking = allData.filter(
//     (item) => item.participated === loggedInUserId
//   );

//   const topThree = allData.splice(0, 3);

//   // others ids
//   allData.filter((item) => item.id !== loggedInUserId);

//   return (
//     <div className="min-h-[80vh]">
//       <div className="bg-black/90 h-[220px] md:h-[300px] w-full flex justify-center items-center">
//         <div className="flex flex-col items-center">
//           <RuhaniImage
//             src="https://res.cloudinary.com/dn2pqzag1/image/upload/v1706361303/trophy_2_vq5dxd.png"
//             width={80}
//             height={80}
//             placeholder={true}
//             alt="trophy"
//           />
//           <h3 className="flex items-center gap-x-2 md:text-[25px] lg:text-[30px] text-white/90">
//             <span className="font-semibold">Ruhani Quiz</span>{" "}
//             <p>Leaderboard</p>
//           </h3>
//           <p className="text-gray-400 mt-2">Play quiz and earn score</p>
//         </div>
//       </div>
//       <div className="container my-[50px]">
//         <Card className="p-[16px]">
//           <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-6">
//             <div className=" relative flex flex-row justify-between items-center py-2 px-3 gap-16 overflow-hidden w-full  bg-green-200 rounded-[6px] ">
//               <div className="flex items-center gap-2 ">
//                 <div className="absolute bg-green-600 text-white text-[12px] px-4 shadow-xl -rotate-45 -left-3 top-1">
//                   1st
//                 </div>
//                 <div className="font-semibold ml-2">{topThree[0].ranking}</div>
//                 <Image
//                   src={
//                     topThree[0].user.avatar ||
//                     "https://res.cloudinary.com/dzlrpspps/image/upload/v1700392817/profile_bq4fpi.jpg"
//                   }
//                   height={30}
//                   width={30}
//                   alt="profile"
//                   className="rounded-full"
//                 />
//                 <h3 className="text-[1rem] capitalize leading-[1.5rem] font-semibold tracking-[.32px]">
//                   {topThree[0].user.name}
//                 </h3>
//               </div>
//               <div className="flex flex-col items-end">
//                 <h5 className="text-[20px] font-semibold">
//                   {topThree[0].marks}%
//                 </h5>
//                 <p className="text-[10px] font-medium leading-[15.6px] tracking-[.24px]">
//                   Marks
//                 </p>
//               </div>
//             </div>
//             <div className=" relative flex flex-row justify-between items-center py-2 px-3 gap-16 overflow-hidden w-full  bg-blue-200 rounded-[6px] ">
//               <div className="flex items-center gap-2 ">
//                 <div className="absolute bg-blue-600 text-white text-[12px] px-4 shadow-xl -rotate-45 -left-3 top-1">
//                   2nd
//                 </div>
//                 <div className="font-semibold ml-2">{topThree[1].ranking}</div>
//                 <Image
//                   src={
//                     topThree[1].user.avatar ||
//                     "https://res.cloudinary.com/dzlrpspps/image/upload/v1700392817/profile_bq4fpi.jpg"
//                   }
//                   height={30}
//                   width={30}
//                   alt="profile"
//                   className="rounded-full"
//                 />
//                 <h3 className="text-[1rem] capitalize leading-[1.5rem] font-semibold tracking-[.32px]">
//                   {topThree[1].user.name}
//                 </h3>
//               </div>
//               <div className="flex flex-col items-end">
//                 <h5 className="text-[20px] font-semibold">
//                   {topThree[1].marks}%
//                 </h5>
//                 <p className="text-[10px] font-medium leading-[15.6px] tracking-[.24px]">
//                   Marks
//                 </p>
//               </div>
//             </div>
//             <div className=" relative flex flex-row justify-between items-center py-2 px-3 gap-16 overflow-hidden w-full  bg-orange-200 rounded-[6px] ">
//               <div className="flex items-center gap-2 ">
//                 <div className="absolute bg-orange-600 text-white text-[12px] px-4 shadow-xl -rotate-45 -left-3 top-1">
//                   3rd
//                 </div>
//                 <div className="font-semibold ml-1">{topThree[2].ranking}</div>
//                 <Image
//                   src={
//                     topThree[2].user.avatar ||
//                     "https://res.cloudinary.com/dzlrpspps/image/upload/v1700392817/profile_bq4fpi.jpg"
//                   }
//                   height={30}
//                   width={30}
//                   alt="profile"
//                   className="rounded-full"
//                 />
//                 <h3 className="text-[1rem] capitalize leading-[1.5rem] font-semibold tracking-[.32px]">
//                   {topThree[2].user.name}
//                 </h3>
//               </div>
//               <div className="flex flex-col items-end">
//                 <h5 className="text-[20px] font-semibold">
//                   {topThree[2].marks}%
//                 </h5>
//                 <p className="text-[10px] font-medium leading-[15.6px] tracking-[.24px]">
//                   Marks
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="w-full h-[1px] bg-slate-500/20"></div>
//           <div className="w-full grid grid-cols-3 gap-8 my-6">
//             <div className=" relative flex flex-row justify-between items-center py-2 px-3 gap-16 overflow-hidden w-full  bg-[rgb(255,242,204)] rounded-[6px] ">
//               <div className="flex items-center gap-2 ">
//                 <div className="absolute bg-white text-[12px] px-4 shadow-xl -rotate-45 -left-3 top-1">
//                   You
//                 </div>
//                 <div className="font-semibold ml-2">
//                   {loggedInUserRanking[0].ranking}
//                 </div>
//                 <Image
//                   src={
//                     loggedInUserRanking[0].user.avatar ||
//                     "https://res.cloudinary.com/dzlrpspps/image/upload/v1700392817/profile_bq4fpi.jpg"
//                   }
//                   height={30}
//                   width={30}
//                   alt="profile"
//                   className="rounded-full"
//                 />
//                 <h3 className="text-[1rem] capitalize leading-[1.5rem] font-semibold tracking-[.32px]">
//                   {loggedInUserRanking[0].user.name}
//                 </h3>
//               </div>
//               <div className="flex flex-col items-end">
//                 <h5 className="text-[20px] font-semibold">
//                   {loggedInUserRanking[0].marks}%
//                 </h5>
//                 <p className="text-[10px] font-medium leading-[15.6px] tracking-[.24px]">
//                   Marks
//                 </p>
//               </div>
//             </div>
//           </div>
//           <h3 className="border-b-[1px] border-slate-500/20 pb-2 font-medium">
//             Others
//           </h3>
//           <Separator />
//           <div className=" w-full grid grid-cols-3 gap-8 mt-[20px]">
//             {allData.map(({ marks, ranking, user }) => (
//               <div
//                 key={ranking}
//                 className=" relative flex flex-row justify-between items-center py-2 px-3 gap-16 overflow-hidden w-full rounded-lg border-b-[1px] border-gray-600/20"
//               >
//                 <div className="flex items-center gap-2">
//                   <div className="font-semibold ml-2">{ranking}</div>
//                   <Image
//                     src="https://res.cloudinary.com/dzlrpspps/image/upload/v1700392817/profile_bq4fpi.jpg"
//                     height={30}
//                     width={30}
//                     alt="profile"
//                     className="rounded-full"
//                   />
//                   <h3 className="text-[1rem] capitalize leading-[1.5rem] font-semibold tracking-[.32px]">
//                     {user.name}
//                   </h3>
//                 </div>
//                 <div className="flex flex-col items-end">
//                   <h5 className="text-[20px] font-semibold">{marks}%</h5>
//                   <p className="text-[12px] font-medium leading-[15.6px] tracking-[.24px]">
//                     Marks
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Page;

const Page = () => {
  return <div>Page</div>;
};

export default Page;
