import React, { useState, useEffect } from 'react';

function Timer({ initialTime, onTimeout }) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time <= 0) {
      onTimeout(); // Execute the onTimeout callback when time runs out
      return;
    }

    const timerInterval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [time, onTimeout]);

  return (
    <div>
      <p>Time Left: {time} seconds</p>
    </div>
  );
}

export default Timer;
