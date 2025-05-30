import { useImperativeHandle, useRef } from "react";
import { createPortal } from 'react-dom';

export default function ResultModal({ ref, targetTime, remainingTime, onReset }) {
    const dialog = useRef();
    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    /**
     * We can use useImperativeHandle to encapsulate the main functionality we want from this component to a single function.
     * We will need another ref here also (dialog).
     * E.g. if another developer changes the <section> to a <div>, TimeChallenge -> showModal() will result in an error.
     * With this way, anyone can call open() (can have any name we want) and if such change is done within ResultModal, all we have to do is change the open() function.
     * Can be used with forwardRef also.
     */
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        };
    });

    return (
        /**
         * Creates a portal and renders this JSX component to index.html -> <div id="modal">. 
         * We want ResultModal on top of other components and not among them. 
         * Syntax: createPortal(JSX code, DOM element).
         */
        createPortal(
            <dialog
                ref={dialog}
                className="result-modal"
                // dialog closes by default with Esc key. In our case we want to execute onReset when dialog closes. This is why we have to add dialog onClose
                onClose={onReset}
            >
                {userLost && <h2>You lost</h2>}
                {!userLost && <h2>Your Score: {score}</h2>}
                <p>
                    The target time was <strong>{targetTime} seconds.</strong>
                </p>
                <p>
                    You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong>
                </p>
                {
                    /**
                     * method="dialog" is a build-in HTML feature that closes the dialog when we press the button.
                     * onSubmit attribute is also a build-in HTML feature that executes onReset when the form closes (when we press the button).
                     */
                }
                <form method="dialog" onSubmit={onReset}>
                    <button>Close</button>
                </form>
            </dialog>, document.getElementById("modal"))
    );
}