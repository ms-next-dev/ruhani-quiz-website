"use client";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Toaster, toast } from "sonner";

const minuteSeconds = 60;
const hourSeconds = 3600;

const timerProps = {
    isPlaying: true,
    size: 120,
    strokeWidth: 10,
};

const renderTime = (dimension: string, time: number) => {
    return (
        <div className="time-wrapper">
            <div className="time text-3xl font-semibold">{time}</div>
            <div>{dimension}</div>
        </div>
    );
};

const getTimeSeconds = (time: number) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time: number) =>
    ((time % hourSeconds) / minuteSeconds) | 0;

const Timer = () => {
    const startTime = Date.now() / 1000;
    const endTime = startTime + 600;

    const remainingTime = endTime - startTime;

    const onComplete = () => {
        toast.error("Time up. Quiz will be auto submitted.");
    };

    return (
        <div className="flex justify-center items-center gap-x-10 text-center">
            <Toaster />
            <CountdownCircleTimer
                {...timerProps}
                colors="#FF004C"
                duration={hourSeconds}
                initialRemainingTime={remainingTime % hourSeconds}
                onComplete={onComplete}
            >
                {({ elapsedTime, color }) => (
                    <span style={{ color }}>
                        {renderTime(
                            "minutes",
                            getTimeMinutes(hourSeconds - elapsedTime)
                        )}
                    </span>
                )}
            </CountdownCircleTimer>
            <CountdownCircleTimer
                {...timerProps}
                colors="#FF004C"
                duration={minuteSeconds}
                initialRemainingTime={remainingTime % minuteSeconds}
                onComplete={(totalElapsedTime) => ({
                    shouldRepeat: remainingTime - totalElapsedTime > 0,
                })}
            >
                {({ elapsedTime, color }) => (
                    <span style={{ color }}>
                        {renderTime("seconds", getTimeSeconds(elapsedTime))}
                    </span>
                )}
            </CountdownCircleTimer>
        </div>
    );
};

export default Timer;
