"use client";

import { motion } from "framer-motion";
import { ChevronRight, MoveRight } from "lucide-react";
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

  const subjects = [
    {
      id: 1,
      name: "Islam",
    },
    {
      id: 2,
      name: "Web Development",
    },
    {
      id: 3,
      name: "App Development",
    },
    {
      id: 4,
      name: "Current Affairs",
    },
    {
      id: 5,
      name: "Englist",
    },
    {
      id: 6,
      name: "History Of Islam",
    },
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
            className={`w-full relative h-full transform ${
              index === currentSlide ? "scale-animation" : ""
            }`}
          >
            <Image
              src={image.img}
              alt={`Image ${index + 1}`}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>
          </div>
        </div>
      ))}

      <div className="absolute w-full h-full">
        <div className="container h-full flex justify-start items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.75,
              ease: "easeOut",
            }}
            className="space-y-4"
          >
            <h1 className="text-white text-xl md:text-[44px] leading-tight font-semibold">
              Play Quiz Based on Your Subject <br /> and Unleash Your
              Intellectual Prowess!
            </h1>
            <p className="text-white/80 font-light">
              Unleashing Knowledge, Bangladesh's Biggest Quiz Experience!
            </p>
            <section className="flex flex-wrap gap-3">
              {subjects.map(({ id, name }) => (
                <div
                  key={id}
                  className="w-[172px] h-[116px] bg-white bg-opacity-5 backdrop-blur-lg rounded drop-shadow-lg hover:backdrop-blur-xl hover:border-slate-50/10 hover:border-[.7px] border-slate-50/5 border-[.5px] flex flex-col items-center justify-center gap-y-2 cursor-pointer group"
                >
                  <div className="p-2 bg-gray-400/10 rounded-full">
                    <Image
                      src="/icon/book.png"
                      alt="bookIcon"
                      width={35}
                      height={35}
                    />
                  </div>
                  <div className="text-[14px] text-white/85 flex items-center gap-x-2 ">
                    {name} <MoveRight className="w-3 h-3 mt-1" />
                  </div>
                </div>
              ))}
            </section>
            <p className="text-green-500/80 flex items-center group cursor-pointer">
              Want to know more{" "}
              <ChevronRight className="w-4 h-4 mt-1 ml-2 group-hover:ml-3 duration-300" />
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
