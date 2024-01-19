"use client";
import { cn } from "@/lib/utils";
// Packages
import { motion } from "framer-motion";

// Local Imports
import Image from "next/image";

interface BrandLoader {
  variant: "white" | "black";
}

const BrandLoader: React.FC<BrandLoader> = ({ variant }) => {
  let logoPath: string;

  if (variant === "black") {
    logoPath = "/logo/logo-white-edited.png";
  } else if (variant === "white") {
    logoPath = "/logo/black.png";
  }
  return (
    <div
      className={cn(
        "min-h-screen flex justify-center bg-white items-center",
        variant === "white" && "bg-white",
        variant === "black" && "bg-black"
      )}
    >
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
        exit={{
          opacity: 0,
          transition: {
            duration: 0.5,
          },
        }}
        className="loader flex justify-center items-center"
      >
        <Image src={logoPath!} alt="logo" height={80} width={70} />
      </motion.span>
    </div>
  );
};

export default BrandLoader;
