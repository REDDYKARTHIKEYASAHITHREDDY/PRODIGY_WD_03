
import React, { useState } from 'react';
import Board from './Board';
import './App.css';

function App() {
  const [isSinglePlayer, setIsSinglePlayer] = useState(true);

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <div className="mode-select">
        <button
          className={isSinglePlayer ? 'active' : ''}
          onClick={() => setIsSinglePlayer(true)}
        >
          Single Player
        </button>
        <button
          className={!isSinglePlayer ? 'active' : ''}
          onClick={() => setIsSinglePlayer(false)}
        >
          Dual Player
        </button>
      </div>
      <Board isSinglePlayer={isSinglePlayer} />
    </div>
  );
}

export default App;
