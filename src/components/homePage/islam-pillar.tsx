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
                <div className="h-[70vh] bg-black/90">
                    <div className="container p-20 grid grid-cols-3">
                        <div className="col-span-2">
                            <div className="flex items-center gap-x-8 mb-24">
                                <div className="relative">
                                    <div className="absolute top-0 w-20 h-20 border-4 border-[#FF004C] bg-black"></div>
                                    <div className="w-20 h-20 border-4 border-[#FF004C] bg-black rotate-45"></div>
                                    <p className="absolute top-0 text-white text-5xl font-bold w-full h-full flex justify-center items-center">
                                        i
                                    </p>
                                </div>
                                <h1
                                    className={`${roboto.className} text-5xl font-semibold tracking-wide text-white`}
                                >
                                    The Pillars of Islam
                                </h1>
                            </div>

                            <div className="grid grid-cols-3 gap-20">
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