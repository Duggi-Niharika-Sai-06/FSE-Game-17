import React, { useState, useRef, useEffect } from "react";
import LevelSelection from "./LevelSelection";
import HighScore from "./HighScore";
import About from "./About";
import GameMenu from "./GameMenu";
import EasyGameMode from "./EasyGameMode";
import MediumGameMode from "./MediumGameMode";
import HardGameMode from "./HardGameMode";
import Setting from "./Setting";

const GameMenuController = () => {
  const [gameState, setGameState] = useState(0);
  const audioOn = localStorage.getItem("audioOn") === "1" ? true : false;

  const scrollRef = useRef(null);

  const onGameStateChange = (gameState) => {
    setGameState(gameState);
  };

  // Set `audioOn` in localStorage on page load
  useEffect(() => {
    localStorage.setItem("audioOn", "1");
  }, []);

  useEffect(() => {
    if (gameState === 5 && scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [gameState]);

  return (
    <div>
      <div className="mt-10">
        {gameState === 0 ? (
          <GameMenu onGameStateChange={onGameStateChange} />
        ) : (
          ""
        )}
        {gameState === 1 ? (
          <LevelSelection onGameStateChange={onGameStateChange} />
        ) : (
          ""
        )}
        {gameState === 2 ? (
          <HighScore onGameStateChange={onGameStateChange} />
        ) : (
          ""
        )}
        {gameState === 3 ? (
          <Setting onGameStateChange={onGameStateChange} />
        ) : (
          ""
        )}
        {gameState === 4 ? <About onGameStateChange={onGameStateChange} /> : ""}
        {gameState === 5 ? (
          <EasyGameMode
            onGameStateChange={onGameStateChange}
            soundEnabled={audioOn}
          />
        ) : (
          ""
        )}
        {gameState === 6 ? (
          <MediumGameMode
            onGameStateChange={onGameStateChange}
            soundEnabled={audioOn}
          />
        ) : (
          ""
        )}
        {gameState === 7 ? (
          <HardGameMode
            onGameStateChange={onGameStateChange}
            soundEnabled={audioOn}
          />
        ) : (
          ""
        )}
      </div>
      {gameState === 5 ? (
        <div className="m-20" ref={scrollRef}>
          <hr />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default GameMenuController;
