import { forwardRef } from 'react';

const ResultModal = forwardRef(function ResultModal({ result, targetTime }, ref) {
    return (
        <dialog ref={ref} className="result-modal">
            <h2>Your {result}</h2>
            <p>
                The target time was <strong>{targetTime} seconds.</strong>
            </p>
            <p>
                You stopped the timer with <strong>X seconds left.</strong>
            </p>
            {/* method="dialog" is a build-in HTML feature that closes the dialog when we press the button */}
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>
    );
});

export default ResultModal;