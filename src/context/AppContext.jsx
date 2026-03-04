import { createContext, useContext, useState } from "react";
import { useMousePosition } from "../hooks/useMousePosition";

const defaultConfig = {
  bgColor: 255,
  textColor: 200,
  textColorHover: 0,
  radius: 400,
  strength: 2,
  boldness: 900,
  lineHeight: 0.9,
  animationSpeed: 10,
  fontSize: 192,
  fontFamily: "Bitter",
};

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [config, setConfig] = useState(defaultConfig);
  const [hideCursor, setHideCursor] = useState(false);
  const mousePos = useMousePosition();

  const updateConfig = (key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AppContext.Provider
      value={{
        config,
        setConfig,
        updateConfig,
        mousePos,
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
