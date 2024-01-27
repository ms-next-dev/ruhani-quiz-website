// Packages
import dynamic from "next/dynamic";

// Local imports
import { poppins } from "@/lib/fonts";

const PrayerTimeCard = dynamic(() => import("../cards/prayer-time-card"));

// function to get data from api
async function getData() {
    const res = await fetch(
        "http://api.aladhan.com/v1/timingsByCity?city=Dhaka&country=Bangladesh&method=1&school=1"
    );

    if (!res.ok) {
        return "Failed to fetch data";
    }

    return res.json();
}

const PrayerTime = async () => {
    // calling function for getting data from api
    const data = await getData();
    const prayerTimes = data.data.timings;

    // js variables
    const date = data.data.date;
    const engDate = date.readable;
    const hijriDate = `${date.hijri.day} ${date.hijri.month.en} ${date.hijri.year} ${date.hijri.designation.abbreviated}`;

    const modifiedPrayerTimes = [
        {
            id: 1,
            waqt: "Fajr",
            time: prayerTimes.Fajr,
            icon: "/prayerTimeIcon/fajr.svg",
        },
        {
            id: 2,
            waqt: "Dhuhr",
            time: prayerTimes.Dhuhr,
            icon: "/prayerTimeIcon/dhuhr.svg",
        },
        {
            id: 3,
            waqt: "Asr",
            time: prayerTimes.Asr,
            icon: "/prayerTimeIcon/asr.svg",
        },
        {
            id: 4,
            waqt: "Maghrib",
            time: prayerTimes.Maghrib,
            icon: "/prayerTimeIcon/maghrib.svg",
        },
        {
            id: 5,
            waqt: "Isha",
            time: prayerTimes.Isha,
            icon: "/prayerTimeIcon/isha.svg",
        },
    ];

    return (
        <div>
            <div className="bg-[#f6f6f6]">
                <div className="container py-12 lg:py-28">
                    <h2
                        className={`${poppins.className} font-bold text-center text-main text-4xl tracking-wide`}
                    >
                        Today&apos;s Prayer Times
                    </h2>
                    <div className="bg-[#FF004C] h-[2px] w-1/2 md:w-1/4 mx-auto my-8"></div>
                    <div
                        className={`${poppins.className} text-lg font-medium text-main text-center`}
                    >
                        <p>Islamic: {hijriDate}</p>
                        <p>General: {engDate}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-10 lg:gap-16 xl:gap-5 px-6 mt-12 md:mt-20">
                        {modifiedPrayerTimes.map((prayerTime) => (
                            <PrayerTimeCard
                                key={prayerTime.id}
                                prayerTime={prayerTime}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrayerTime;
