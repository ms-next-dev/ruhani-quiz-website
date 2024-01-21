"use client";

import { Player } from "@lottiefiles/react-lottie-player";

const LottiePlayer = () => {
    return (
        <Player
            autoplay
            loop
            src="https://lottie.host/9e8fec58-3b6e-4176-bd74-591b3208b9a5/uRfqpO0LZ4.json"
            style={{
                height: "450px",
                width: "450px",
            }}
        ></Player>
    );
};

export default LottiePlayer;
