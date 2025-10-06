import React, { useState } from "react";
import ModeSelect from "./components/ModeSelect";
import Game from "./components/Game";
import "./App.css";

function App() {
  const [mode, setMode] = useState(null);

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      {!mode ? (
        <ModeSelect onSelect={setMode} />
      ) : (
        <Game mode={mode} onRestart={() => setMode(null)} />
      )}
    </div>
  );
}

export default App;
