// Local Imports
import { montserrat, roboto } from "@/lib/fonts";

const IslamPillar = () => {
    const infos = [
        {
            id: 1,
            pillar: "Shahadah",
            pillarEng: "Faith",
            icon: "i",
        },
        {
            id: 2,
            pillar: "Salah",
            pillarEng: "Prayer",
            icon: "i",
        },
        {
            id: 3,
            pillar: "Sawm",
            pillarEng: "Fasting",
            icon: "i",
        },
        {
            id: 4,
            pillar: "Zakat",
            pillarEng: "Almsgiving",
            icon: "i",
        },
        {
            id: 5,
            pillar: "Hajj",
            pillarEng: "Pilgrimage",
            icon: "i",
        },
    ];

    return (
        <div>
            <div
                style={{
                    background: `url(${"/bg/pillar-islam-bg-1.jpg"})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <div className=" bg-black/90">
                    <div className="container py-20 md:py-28 lg:py-32 md:px-12 grid grid-cols-3 lg:grid-cols-4">
                        <div className="col-span-3 xl:col-span-3">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-y-8 gap-x-8 mb-20 md:mb-28">
                                <div className="relative">
                                    <div className="absolute top-0 w-20 h-20 border-4 border-[#FF004C] bg-black"></div>
                                    <div className="w-20 h-20 border-4 border-[#FF004C] bg-black rotate-45"></div>
                                    <p className="absolute top-0 text-white text-5xl font-bold w-full h-full flex justify-center items-center">
                                        i
                                    </p>
                                </div>
                                <h1
                                    className={`${roboto.className} text-4xl md:text-5xl font-semibold tracking-wide text-white whitespace-nowrap md:whitespace-normal`}
                                >
                                    The Pillars of Islam
                                </h1>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-28 md:gap-x-24 gap-y-20 lg:gap-24">
                                {infos.map((info) => (
                                    <div
                                        key={info.id}
                                        className="flex items-center gap-x-8"
                                    >
                                        <div className="relative group">
                                            <div className="absolute top-0 w-20 h-20 border-4 border-[#FF004C] bg-black group-hover:rotate-45 duration-500"></div>
                                            <div className="w-20 h-20 border-4 border-[#FF004C] bg-black rotate-45 group-hover:rotate-0 duration-500"></div>
                                            <p className="absolute top-0 text-white text-5xl font-bold w-full h-full flex justify-center items-center">
                                                {info.icon}
                                            </p>
                                        </div>
                                        <div>
                                            <h2 className="text-white text-3xl font-medium ">
                                                {info.pillar}
                                            </h2>
                                            <h3
                                                className={`${montserrat.className} text-base font-normal text-[#FF004C] uppercase`}
                                            >
                                                {info.pillarEng}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IslamPillar;
