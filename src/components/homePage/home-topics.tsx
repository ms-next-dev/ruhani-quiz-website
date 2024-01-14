import { roboto } from "@/lib/fonts";
import TopicCard from "../cards/topic-card";

const HomeTopics = () => {
    const topics = [
        {
            id: "1",
            name: "Kalimah",
            img: "https://res.cloudinary.com/dn2pqzag1/image/upload/v1704005547/kaqasqx6rmncolcvriuv.jpg",
        },
        {
            id: "2",
            name: "Namaz",
            img: "https://res.cloudinary.com/dn2pqzag1/image/upload/v1704005547/kaqasqx6rmncolcvriuv.jpg",
        },
        {
            id: "3",
            name: "Saom/Fasting",
            img: "https://res.cloudinary.com/dn2pqzag1/image/upload/v1704005547/kaqasqx6rmncolcvriuv.jpg",
        },
        {
            id: "4",
            name: "Hajj",
            img: "https://res.cloudinary.com/dn2pqzag1/image/upload/v1704005547/kaqasqx6rmncolcvriuv.jpg",
        },
        {
            id: "5",
            name: "Zakat",
            img: "https://res.cloudinary.com/dn2pqzag1/image/upload/v1704005547/kaqasqx6rmncolcvriuv.jpg",
        },
        {
            id: "6",
            name: "Donation",
            img: "https://res.cloudinary.com/dn2pqzag1/image/upload/v1704005547/kaqasqx6rmncolcvriuv.jpg",
        },
        {
            id: "7",
            name: "Sunnah",
            img: "https://res.cloudinary.com/dn2pqzag1/image/upload/v1704005547/kaqasqx6rmncolcvriuv.jpg",
        },
        {
            id: "8",
            name: "Akhirah",
            img: "https://res.cloudinary.com/dn2pqzag1/image/upload/v1704005547/kaqasqx6rmncolcvriuv.jpg",
        },
    ];

    return (
        <div>
            <div
                style={{
                    background: `url(${"/home-topics-bg.png"})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <div className="container p-28">
                    <h2
                        className={`${roboto.className} text-5xl text-[#FF004C] text-center font-bold mb-2`}
                    >
                        Quiz Topics
                    </h2>
                    <div className="w-full lg:w-2/3 xl:w-1/3 mx-auto h-[2px] bg-black/50 mb-5 lg:mb-20 rounded-full"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-10">
                        {topics.map((topic) => (
                            <TopicCard key={topic.id} topic={topic} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeTopics;
