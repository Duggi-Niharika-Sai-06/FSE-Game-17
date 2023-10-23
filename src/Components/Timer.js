import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

function Timer({ initialTime, onTimeout }, ref) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    let timerInterval;

    if (time > 0) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      onTimeout();
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [time, onTimeout, initialTime]);

  const resetTimer = () => {
    setTime(initialTime);
  };

  useImperativeHandle(ref, () => ({
    resetTimer,
  }));

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
    <p style={{ 
        fontSize: "2rem", 
        fontWeight: "bold", 
        color: "#000", 
        textShadow: "0 0 5px #00ffcc, 0 0 10px #00ffcc"
    }}>
        Time Left: {time} seconds
    </p>
</div>


  );
}

export default forwardRef(Timer);
