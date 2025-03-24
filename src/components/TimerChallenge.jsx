import { useState, useRef } from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({ title, targetTime }) {
    /**
     * We use timer ref (and not a let) so that every TimerChallenge instance has its own timer and we do not have timer conflicts between instances.
     * timer will not be reset or cleared when this component re-executes.
     */
    const timer = useRef();
    const dialog = useRef();
    const targetTimeInMs = targetTime * 1000;

    const [timeRemaining, setTimeRemaining] = useState(targetTimeInMs);
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTimeInMs;

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(previousTimeRemaining => previousTimeRemaining - 10);
        }, 10);
    }

    /**
     * When time runs out and we haven't pressed the stop button.
     */
    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset() {
        setTimeRemaining(targetTimeInMs);
    }

    /**
     * When we press the stop button.
     */
    function handleStop() {
        clearInterval(timer.current);
        dialog.current.open();
    }

    return (
        <>
            <ResultModal
                ref={dialog}
                targetTime={targetTime}
                remainingTime={timeRemaining}
                onReset={handleReset}
            />
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? "s" : ""}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? "Stop" : "Start"} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? "active" : undefined}>
                    {timerIsActive ? "Time is running..." : "Timer inactive"}
                </p>
            </section>
        </>
    );
}