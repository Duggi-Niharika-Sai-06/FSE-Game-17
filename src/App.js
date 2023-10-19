import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const emojis = ['😀', '😁', '😂', '😃', '😄', '😅', '😆', '😉'];
  const allEmojis = [...emojis, ...emojis];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const shuffleCards = () => {
      let shuffled = allEmojis.sort(() => Math.random() - 0.5);
      setCards(shuffled);
    };
    shuffleCards();
  }, []);

  const handleClick = (index) => {
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
