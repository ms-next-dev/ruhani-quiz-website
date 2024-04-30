"use client";

// Packages
import { Player } from "@lottiefiles/react-lottie-player";
import { memo } from "react";

interface LottiePlayerProps {
    src: string;
    height: string;
    width: string;
}

const LottiePlayer: React.FC<LottiePlayerProps> = ({ src, height, width }) => {
    return (
        <Player
            autoplay
            loop
            src={src}
            style={{
                height: height,
                width: width,
            }}
        ></Player>
    );
};

export default memo(LottiePlayer);
