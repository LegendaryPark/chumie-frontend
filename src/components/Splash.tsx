import React, { useState } from "react";
import Game from "./Game";

const Splash: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  return (
    <div className="splash">
      <h1>Word Memory!</h1>
      {!isGameStarted ? (
        <button onClick={() => setIsGameStarted(true)}>GO!</button>
      ) : (
        <button onClick={() => setIsGameStarted(false)}>Grade!</button>
      )}
      <Game displayGrade={isGameStarted} />
    </div>
  );
};

export default Splash;
