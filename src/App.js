import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Timer from './Components/Timer'

function App() {
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
  }, []);

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
    setReset((prevReset) => prevReset + 1); // Increment the reset value
    if (timerRef.current) {
      timerRef.current.resetTimer();
    }
    setGameOver(false);
    const shuffleCards = () => {
      let shuffled = allEmojis.sort(() => Math.random() - 0.5);
      setCards(shuffled);
    };
    shuffleCards();
  };

  return (
    <div className="App">
      <h1>Emoji Memory Game</h1>
      {solved.length === allEmojis.length && <h2>Congratulations! You won!</h2>}
      <div>
        {gameOver ? (
          <h2>{gameOver}</h2>
        ) : (
          <Timer
          key={reset} // Ensure the Timer component re-renders when reset changes
          ref={timerRef}
          initialTime={60}
          onTimeout={handleTimeout} />
        )}
      </div>
      <div className="cards">
        {cards.map((emoji, index) => (
          <div
            key={index}
            className={`card ${flipped.includes(index) || solved.includes(index) ? 'flipped' : ''}`}
            onClick={() => !disabled && !flipped.includes(index) && handleClick(index)}
          >
            {flipped.includes(index) || solved.includes(index) ? emoji : ''}
          </div>
        ))}
      </div>
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default App;
