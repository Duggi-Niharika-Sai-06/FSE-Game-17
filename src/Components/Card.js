import React from 'react';

function Card({ emoji, index, flipped, solved, disabled, handleClick, cardNumber }) {
  return (
    <div
      className={`card ${flipped.includes(index) || solved.includes(index) ? 'flipped' : ''}`}
      onClick={() => !disabled && !flipped.includes(index) && handleClick(index)}
    >
      {flipped.includes(index) || solved.includes(index) ? emoji : cardNumber}
    </div>
  );
}

export default Card;
