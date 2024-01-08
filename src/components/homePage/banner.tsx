"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const images = [
        { img: "/rq-banner.png" },
        { img: "/rq-banner-1.jpg" },
        { img: "/rq-banner-2.jpg" },
    ];

    return (
        <div className="relative w-full h-[100vh] overflow-hidden z-0">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                        transitionDuration: "2500ms",
                        animationDuration: "2500ms",
                    }}
                >
                    <div
                        className={`w-full h-full transform ${
                            index === currentSlide ? "scale-animation" : ""
                        }`}
                    >
                        <Image
                            src={image.img}
                            alt={`Image ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                        />
                        <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>
                    </div>
                </div>
            ))}
            <div className="absolute w-full h-full flex justify-start items-center px-28">
                <div>
                    <h1 className="text-white text-[67px] leading-tight">
                        Welcome To
                    </h1>
                    <h1 className="text-white text-[67px] font-bold leading-tight">
                        Islamic Quiz Competition
                    </h1>
                    <p className="mt-14 mb-10 text-white max-w-2xl text-3xl">
                        Lorem ipsum is placeholder text commonly used in the
                        graphic, print, and publishing industries for previewing
                        layouts and visual mockups.
                    </p>
                    <button className="bg-[#FF004C] rounded-[30px] text-white px-20 py-4 text-3xl font-medium">
                        Let&apos;s do it
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
