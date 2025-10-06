import React from "react";

function ModeSelect({ onSelect }) {
  return (
    <div className="mode-select">
      <h2>Select Game Mode</h2>
      <button onClick={() => onSelect("multiplayer")}>Multiplayer</button>
      <button onClick={() => onSelect("ai")}>Play with AI</button>
    </div>
  );
}

export default ModeSelect;
