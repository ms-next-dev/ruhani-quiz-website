import RuhaniImage from "../ui/ruhani-image";

// async function getData() {
//   const res = await fetch(
//     "http://api.aladhan.com/v1/timingsByCity?city=Dhaka&country=Bangladesh&method=1&school=1"
//   );

//   if (!res.ok) {
//     return "Failed to fetch data";
//   }

//   return res.json();
// }

const PrayerTime = async () => {
  // calling function for getting data from api
  // const data = await getData();
  // const prayerTimes = data.data.timings;

  // // js variables
  // const date = data.data.date;
  // const engDate = date.readable;
  // const hijriDate = `${date.hijri.day} ${date.hijri.month.en} ${date.hijri.year} ${date.hijri.designation.abbreviated}`;
  const times = [
    {
      id: 1,
      title: "Fajar",
      time: "4:10 am",
    },
    {
      id: 2,
      title: "Zuhr",
      time: "12:36 am",
    },
    {
      id: 3,
      title: "Asr",
      time: "4:45 am",
    },
    {
      id: 4,
      title: "Maghrib",
      time: "4:45 am",
    },
    {
      id: 5,
      title: "Isha's",
      time: "4:45 am",
    },
  ];
  return (
    <div className="py-[50px] md:py-[100px] lg:py-[150px] container  relative">
      <RuhaniImage
        src="https://res.cloudinary.com/dn2pqzag1/image/upload/v1706444414/10337574_fsgpse.png"
        fill
        className="opacity-10"
        alt="light"
        placeholder={true}
      />
      <div className="flex flex-col md:flex-row gap-y-[50px] justify-center md:gap-x-[20px] lg:gap-x-[100px] items-start w-full">
        <div>
          <h3 className="text-[#222222] text-xl md:text-[44px] leading-tight font-semibold">
            Today Prayer Times
          </h3>
          <div className="mt-4">
            <p className="text-[14px] font-light text-main">
              Islamic: as-Sabt,18 Muharram 1442
            </p>
            <p className="text-[15px] text-gray-500 font-medium">
              Sunday, September 6, 2020
            </p>
          </div>
          <p className="text-gray-500 text-[20px] font-medium w-[400px] mt-4">
            “O you who have believed, seek help through patience and prayer.
            Indeed, Allah is with the patient”
          </p>
        </div>
        <div className="w-full md:w-auto">
          <div className="w-full  md:w-[300px] shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px]">
            <div className="h-[50px] items-center bg-main/15 flex justify-around">
              <span className="font-semibold">Salat</span>
              <span className="font-semibold">Start</span>
            </div>
            <div>
              {times.map(({ id, time, title }) => (
                <div
                  key={id}
                  className="h-[50px] flex justify-around items-center border-b-[.5px] border-gray-200"
                >
                  <span className="font-medium text-gray-600">{title}</span>
                  <span className="font-normal text-gray-400">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerTime;
