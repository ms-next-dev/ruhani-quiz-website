"use client";
import { motion } from "framer-motion";

interface WidthAnimationProps {
  children: React.ReactNode;
}

const WidthAnimation: React.FC<WidthAnimationProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0, height: 0 }}
      animate={{
        width: "100%",
        opacity: 1,
        height: "500px",
        transition: {
          duration: 0.75,
          ease: "easeOut",
        },
      }}
      transition={{
        duration: 0.75,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default WidthAnimation;
