import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  function handleClick() {
    // playerName is always a JavaScript object and playerName.current holds the component (the input in our case). Every ref has only one current
    setEnteredPlayerName(playerName.current.value);
  }

  return (
    <section id="player">
      {/* JavaScript ?? operator -> if enteredPlayerName is truthy, return it or else return "unknown entity" */}
      <h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
      <p>
        {/* Connect ref to component with this ref={} special attribute */}
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
