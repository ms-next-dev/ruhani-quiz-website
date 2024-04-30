"use client";

import { Subject } from "@prisma/client";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SubjectCard from "../ui/subject-card";
import Title from "../ui/title";

interface BannerProps {
  subjects: Subject[];
}

const Banner: React.FC<BannerProps> = ({ subjects }) => {
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
            <Title
              title="Play Quiz Based on Your Subject and Unleash Your
              Intellectual Prowess!"
              titleClassName="text-white w-2/3"
              description="Unleashing Knowledge, Bangladesh's Biggest Quiz Experience!"
              descriptionClassName="text-white/80"
            />
            <section className="flex flex-wrap gap-3">
              {subjects.map(({ id, name }) => (
                <SubjectCard key={id} name={name} varient="glass" />
              ))}
            </section>
            <Link href="/subjects">
              <p className="text-green-500/80 flex items-center group cursor-pointer mt-2">
                Want to know more{" "}
                <ChevronRight className="w-4 h-4 mt-1 ml-2 group-hover:ml-3 duration-300" />
              </p>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
