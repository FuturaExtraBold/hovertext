import { createContext, useContext, useState } from "react";
import { useMousePosition } from "../hooks/useMousePosition";
import { defaultScenario, scenarios } from "../scenarios";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [scenarioKey, setScenarioKey] = useState(defaultScenario);
  const [config, setConfig] = useState(scenarios[defaultScenario].config);
  const [hideCursor, setHideCursor] = useState(false);
  const mousePos = useMousePosition();

  const scenario = scenarios[scenarioKey];

  const updateConfig = (key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const switchScenario = (key) => {
    setScenarioKey(key);
    setConfig(scenarios[key].config);
  };

  return (
    <AppContext.Provider
      value={{
        config,
        setConfig,
        updateConfig,
        mousePos,
        scenario,
        scenarioKey,
        switchScenario,
        hideCursor,
        setHideCursor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
