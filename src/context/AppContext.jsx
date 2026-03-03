import { createContext, useContext, useState } from "react";
import { defaultConfig } from "../config";
import { useMousePosition } from "../hooks/useMousePosition";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [config, setConfig] = useState(defaultConfig);
  const mousePos = useMousePosition();

  const updateConfig = (key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AppContext.Provider value={{ config, setConfig, updateConfig, mousePos }}>
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
