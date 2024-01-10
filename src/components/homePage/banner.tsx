"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

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
        <div className="relative w-full h-[calc(70vh-72px)] md:h-[calc(85vh-72px)] lg:h-[calc(100vh-72px)] overflow-hidden z-0">
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
                            fill
                            objectFit="cover"
                        />
                        <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>
                    </div>
                </div>
            ))}

            <div className="absolute w-full h-full">
                <div className="container h-full flex justify-start items-center">
                    <div>
                        <h1 className="text-white text-3xl md:text-5xl leading-tight font-light lg:font-normal md:mb-4">
                            Welcome To
                        </h1>
                        <h1 className="text-white text-5xl md:text-[67px] lg:text-[80px]  font-bold leading-tight lg:leading-[1.15] lg:max-w-3xl">
                            Islamic Quiz Competition
                        </h1>
                        <p className="mt-6 md:mt-8 lg:mt-12 xl:mt-14 mb-8 md:mb-10 text-white max-w-lg lg:max-w-xl text-sm md:text-lg lg:text-xl font-light lg:font-normal">
                            Lorem ipsum is placeholder text commonly used in the
                            graphic, print, and publishing industries for
                            previewing layouts and visual mockups.
                        </p>
                        <Button
                            variant="primary"
                            size="lg"
                            className="rounded-xl text-xl"
                        >
                            Let&apos;s do it
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
