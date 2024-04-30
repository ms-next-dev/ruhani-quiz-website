"use client";

// Packages
import Image from "next/image";
import Tilt from "react-next-tilt";

// Local Imports
import { poppins } from "@/lib/fonts";

interface PrayerTimeProps {
  prayerTime: { id: number; waqt: string; time: string; icon: string };
}

const PrayerTimeCard: React.FC<PrayerTimeProps> = ({ prayerTime }) => {
  return (
    <Tilt key={prayerTime.id}>
      <div
        // className="text-white px-8 py-14 rounded-t-full flex flex-col items-center bg-stone-500/85"
        className="text-black px-6 py-12 rounded-t-full flex flex-col items-center  bg-white hover:bg-slate-50 transition-colors duration-300 border-1"
      >
        <div className="p-3 rounded-full bg-main/10">
          <Image src={prayerTime.icon} alt="icon" width={30} height={30} />
        </div>
        <h3
          className={`${poppins.className} text-[18px] text-main font-semibold my-6`}
        >
          {prayerTime.waqt}
        </h3>
        <p className={`${poppins.className} text-[18px] font-normal`}>
          {prayerTime.time}
        </p>
      </div>
    </Tilt>
  );
};

export default PrayerTimeCard;
