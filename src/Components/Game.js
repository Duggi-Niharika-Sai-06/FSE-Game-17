import React, { useState, useRef, useEffect } from 'react';
import Card from './Card';
import Timer from './Timer'

function Game() {
  const emojis = ['😀', '😁', '😂', '😃', '😄', '😅', '😆', '😉'];
  const allEmojis = [...emojis, ...emojis];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(null);
  const [reset, setReset] = useState(0);
  const timerRef = useRef(null);

  const handleTimeout = () => {
    setGameOver("Game Over! Your time ran out.");
  };

  useEffect(() => {
    const shuffleCards = () => {
      let shuffled = allEmojis.sort(() => Math.random() - 0.5);
      setCards(shuffled);
    };
    shuffleCards();
  });

  const handleClick = (index) => {
    if (gameOver) {
      return; // Don't allow flipping cards when the game is over
    }

    if (flipped.length === 2) {
      return;
    }

    if (flipped.length === 0) {
      setFlipped([index]);
    } else if (flipped.length === 1) {
      setFlipped([flipped[0], index]);
      if (cards[flipped[0]] === cards[index]) {
        setSolved([...solved, flipped[0], index]);
        resetFlipped();
      } else {
        setDisabled(true);
        setTimeout(() => {
          resetFlipped();
          setDisabled(false);
        }, 1000);
      }
    }
  };

  const resetFlipped = () => {
    setFlipped([]);
  };

  const resetGame = () => {
    setCards([]);
    setFlipped([]);
    setSolved([]);
    setDisabled(false);
    setReset((prevReset) => prevReset + 1);
    if (timerRef.current) {
      timerRef.current.resetTimer();
    }
    setGameOver(null);
    const shuffleCards = () => {
      let shuffled = allEmojis.sort(() => Math.random() - 0.5);
      setCards(shuffled);
    };
    shuffleCards();
  };

  return (
    <div>
      <div>
        {solved.length === allEmojis.length ? (<h2>Congratulations! You won!</h2>) : (
          gameOver ? (
            <h2>{gameOver}</h2>
          ) : (
            <Timer
              key={reset}
              ref={timerRef}
              initialTime={30}
              onTimeout={handleTimeout}
            />
          )
        )}
        <div className="cards">
          {cards.map((emoji, index) => (
            <Card
              key={index}
              emoji={emoji}
              index={index}
              flipped={flipped}
              solved={solved}
              disabled={disabled}
              handleClick={handleClick}
            />
          ))}
        </div>
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
}

export default Game;
