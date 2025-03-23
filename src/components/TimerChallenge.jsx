import { useState, useRef } from "react";

export default function TimerChallenge({ title, targetTime }) {
    /**
     * We use timer ref (and not a let) so that every TimerChallenge instance has its own timer and we do not have timer conflicts between instances.
     * timer will not be reset or cleared when this component re-executes.
     */
    const timer = useRef();

    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);

    function handleStart() {
        timer.current = setTimeout(() => {
            setTimerExpired(true);
        }, targetTime * 1000);

        // setTimerStarted will be executed when setTimeout was set (not after 1000ms)
        setTimerStarted(true);
    }

    function handleStop() {
        clearTimeout(timer.current);
    }

    return (
        <section className="challenge">
            <h2>{title}</h2>
            {timerExpired && <p>You lost</p>}
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? "s" : ""}
            </p>
            <p>
                <button onClick={timerStarted ? handleStop : handleStart}>
                    {timerStarted ? "Stop" : "Start"} Challenge
                </button>
            </p>
            <p className={timerStarted ? "active" : undefined}>
                {timerStarted ? "Time is running..." : "Timer inactive"}
            </p>

        </section>
    );
}