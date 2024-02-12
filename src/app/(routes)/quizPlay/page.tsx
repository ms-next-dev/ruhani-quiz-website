"use client";
// Packages
import { AlarmClock, CheckCircle2 } from "lucide-react";
import { Manrope } from "next/font/google";
import Image from "next/image";
import { useState } from "react";

// Local Imports
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const manrope = Manrope({ subsets: ["latin"] });

const page = () => {
  const [selected, setSelected] = useState(0);
  const arr = ["Monir Hossain", "Mayesa", 3, 4];
  return (
    <div className="w-full flex justify-center items-start pt-[100px] min-h-screen relative bg-black">
      <Image
        src="https://res.cloudinary.com/dn2pqzag1/image/upload/v1706613859/ruhani%20quiz/color_tcpxvg.png"
        alt="color"
        fill
        style={{
          objectFit: "cover",
        }}
      />
      <div className="w-1/2 absolute h-fit py-[50px] text-black drop-shadow-lg border-slate-50/10 backdrop-blur-lg hover:backdrop-blur-xl  border-[1px]">
        <div className="flex justify-center items-center h-auto gap-x-2 mt-2">
          <AlarmClock className="text-slate-400 w-5 h-5" />
          <span className="font-semibold text-white/80">10:00</span>
        </div>

        <section className="w-3/4 mx-auto shadow-[rgba(9,30,66,0.1)_0px_1px_1px,rgba(9,30,66,0.2)_0px_0px_1px_1px] border-white/10 border-[1px] p-4 mt-10 relative">
          <div className="bg-main text-white w-fit text-[12px] py-1 px-3 rounded-2xl absolute -top-4 left-1/2 transform -translate-x-1/2">
            Question 3/10
          </div>
          <h3
            className={`${manrope.className} text-white/70 text-center tracking-wider mt-3 selection:bg-main selection:text-white`}
          >
            Which of the following explains correctly what happens when a
            JavaScript program is developed on a Unix Machine?
          </h3>
        </section>

        <section className="w-3/4 mx-auto  mt-6 grid grid-cols-2 gap-4">
          {arr.map((item, index) => (
            <div
              key={item}
              className={cn(
                `${manrope.className} shadow-[rgba(9,30,66,0.1)_0px_1px_1px,rgba(9,30,66,0.2)_0px_0px_1px_1px] p-2 duration-300 hover:bg-main/10 text-white/60 text-[14px] text-center font-semibold cursor-pointer border-[1px] border-white/10 `,
                selected == index &&
                  "shadow-[rgba(255,0,76,0.3)_0px_1px_1px,rgba(255,0,76,0.2)_0px_1px_1px_1px] bg-main/10 text-white/70"
              )}
              onClick={() => setSelected(index)}
            >
              <CheckCircle2
                className={cn(
                  "absolute text-main/60",
                  index === selected ? "block" : "hidden"
                )}
              />
              {item}
            </div>
          ))}
        </section>
        <section className=" flex justify-center w-3/4 mx-auto mt-10">
          <Button
            variant="primary"
            className="px-8 active:translate-y-[1px] duration-200 rounded-lg"
          >
            Next
          </Button>
        </section>
      </div>
    </div>
  );
};

export default page;
