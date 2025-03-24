export default function ResultModal({ result, targetTime }) {
    return (
        // open attribute displays the dialog when called. If used, we cannot dim the background. We should use ref for that.
        <dialog className="result-modal" open>
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
}