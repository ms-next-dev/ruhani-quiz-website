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
                className="text-black px-8 py-14 rounded-t-full flex flex-col items-center shadow-xl bg-[#e6e6e6]"
            >
                <div className="p-3 rounded-full bg-stone-400/50">
                    <Image
                        src={prayerTime.icon}
                        alt="icon"
                        width={40}
                        height={40}
                    />
                </div>
                <h3
                    className={`${poppins.className} text-3xl text-main font-semibold my-6`}
                >
                    {prayerTime.waqt}
                </h3>
                <p className={`${poppins.className} text-xl font-normal`}>
                    {prayerTime.time}
                </p>
            </div>
        </Tilt>
    );
};

export default PrayerTimeCard;
