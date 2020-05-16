import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    if (!replace) {
      setHistory((prev) => [...prev, newMode]);
    }
  }

  function back() {
    if (history.length > 1) {
      const backHistory = [...history];
      backHistory.pop();
      setHistory([...backHistory]);
      setMode(backHistory[backHistory.length - 1]);
    } else {
      setMode(mode);
    }
  }

  return { mode, transition, back };
}
