"use client";

// packages
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Toaster } from "sonner";

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
            <div className="time text-3xl font-semibold">
                {/* {time} */}
                {dimension === "minutes" ? Math.max(0, time) : time}
            </div>
            <div>{dimension}</div>
        </div>
    );
};

const getTimeSeconds = (time: number) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time: number) =>
    ((time % hourSeconds) / minuteSeconds) | 0;

interface TimerProps {
    onCompleteA: () => void;
}

const Timer: React.FC<TimerProps> = ({ onCompleteA }) => {
    const startTime = Date.now() / 1000;
    const endTime = startTime + 1 + 120;

    const remainingTime = endTime - startTime;

    const onComplete = () => {
        onCompleteA();
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
