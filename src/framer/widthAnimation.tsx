"use client";
import { motion } from "framer-motion";

interface WidthAnimationProps {
  children: React.ReactNode;
}
interface OpacityAnimationProps {
  children: React.ReactNode;
}

const WidthAnimation: React.FC<WidthAnimationProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        // height: "500px",
        transition: {
          duration: 0.75,
          ease: "easeOut",
          delay: 0.25,
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

export const OpacityAnimation: React.FC<OpacityAnimationProps> = ({
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        // width: "100%",
        opacity: 1,
        // height: "500px",
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
