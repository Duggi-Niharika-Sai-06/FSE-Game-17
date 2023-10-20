import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Game from './Components/Game';

function App() {
  return (
    <div className="App">
      <h1>Emoji Memory Game</h1>
      <Game />
    </div>
  );
}

export default App;