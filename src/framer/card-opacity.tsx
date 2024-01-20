"use client";
import { motion } from "framer-motion";
import React from "react";

interface CardOpacityTransitionProps {
  children: React.ReactNode;
}

const CardOpacityTransition: React.FC<CardOpacityTransitionProps> = ({
  children,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.3,
          ease: "linear",
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.3,
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default CardOpacityTransition;
