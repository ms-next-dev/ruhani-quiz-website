"use client";

// Packages
import { Player } from "@lottiefiles/react-lottie-player";
import { memo } from "react";

interface LottiePlayerProps {
  src: string;
}

const LottiePlayer: React.FC<LottiePlayerProps> = ({ src }) => {
  return (
    <Player
      autoplay
      loop
      src={src}
      style={{
        height: "400px",
        width: "400px",
      }}
    ></Player>
  );
};

export default memo(LottiePlayer);
