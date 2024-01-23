"use client";

// Packages
import Image from "next/image";
import Link from "next/link";
import { Tilt } from "react-next-tilt";

// Local Imports
import PageBanner from "@/components/page-banner";

const TeamPage = () => {
    const members = [
        {
            id: 1,
            name: "Monir H Rabby",
            designation: "Full-Stack Developer",
            bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            img: "/dummy-member.png",
        },
        {
            id: 2,
            name: "Mobashirul Seam",
            designation: "Front-end Developer",
            bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            img: "/dummy-member.png",
        },
        {
            id: 3,
            name: "Monir H Rabby",
            designation: "Full-Stack Developer",
            bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            img: "/dummy-member.png",
        },
        {
            id: 4,
            name: "Mobashirul Seam",
            designation: "Front-end Developer",
            bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            img: "/dummy-member.png",
        },
    ];

    return (
        <div>
            <div>
                <PageBanner
                    bannerImg="/team.jpg"
                    title1="Team Members"
                    title2="দোলনা থেকে মৃত্যু পর্যন্ত জ্ঞান অর্জন করো"
                />
            </div>

            <div
                className="-mt-[120px] pt-[120px]"
                style={{
                    background: `url(${"/bg/team-bg-2.jpg"})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-16 gap-x-10 py-20">
                        {members.map((member) => (
                            <Tilt key={member.id}>
                                <div className="flex justify-center">
                                    <div className="w-96 shadow-xl rounded-[40px]  pt-6 px-7 pb-10 bg-[#e6e6e6] text-white flex flex-col items-center">
                                        <div className="rounded-full w-[220px] h-[220px] bg-[rgba(14,14,14,0.32)] p-[15px] mb-5">
                                            <Image
                                                alt=""
                                                src={member.img}
                                                height={190}
                                                width={190}
                                                className="rounded-full"
                                            />
                                        </div>
                                        <h2 className="text-2xl font-semibold mb-2 text-[#FF004C]">
                                            {member.name}
                                        </h2>
                                        <h2 className="font-normal mb-4 text-black">
                                            {member.designation}
                                        </h2>
                                        <div className="w-[204px] h-[1px] bg-[rgba(192,183,232,0.33)] mb-5"></div>
                                        <p className="text-xs mb-9 max-w-xs text-black">
                                            {member.bio}
                                        </p>
                                        <Link
                                            href={"/"}
                                            className="text-white text-base font-bold bg-[#FF004C] rounded-[40px] px-14 py-4"
                                        >
                                            Contact Now
                                        </Link>
                                    </div>
                                </div>
                            </Tilt>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamPage;
