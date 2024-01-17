// Packages
import Image from "next/image";

// Local imports
import { poppins } from "@/lib/fonts";

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
    <div
      style={{
        background: `url(${"/prayer-times-bg.png"})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-black bg-opacity-50">
        <div className="container py-12 lg:py-28">
          <h2
            className={`${poppins.className} font-bold text-center text-white text-4xl tracking-wide`}
          >
            Today&apos;s Prayer Times
          </h2>
          <div className="bg-[#FF004C] h-[2px] w-1/2 md:w-1/4 mx-auto my-8"></div>
          <div
            className={`${poppins.className} text-lg font-medium text-white text-center`}
          >
            <p>Islamic: {hijriDate}</p>
            <p>General: {engDate}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 px-6 mt-12 md:mt-20">
            {modifiedPrayerTimes.map((prayerTime) => (
              <div
                key={prayerTime.id}
                className="text-white px-8 py-14 rounded-t-full flex flex-col items-center bg-stone-500/85"
              >
                <div className="p-3 rounded-full bg-[#FF004C]">
                  <Image
                    src={prayerTime.icon}
                    alt="icon"
                    width={40}
                    height={40}
                  />
                </div>
                <h3
                  className={`${poppins.className} text-3xl font-semibold my-6`}
                >
                  {prayerTime.waqt}
                </h3>
                <p className={`${poppins.className} text-xl font-normal`}>
                  {prayerTime.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerTime;
