import { useCallback, useMemo, useState } from "react";
import { AppContext } from "./context";

const defaultConfig = {
  bgColor: 255,
  textColor: 200,
  textColorHover: 0,
  radius: 400,
  strength: 1,
  boldness: 900,
  lineHeight: 0.9,
  tracking: -0.02,
  animationSpeed: 20,
  fontSize: 192,
  fontFamily: "Bitter",
};

export function AppProvider({ children }) {
  const [config, setConfig] = useState(defaultConfig);
  const [hideCursor, setHideCursor] = useState(false);
  const [singleLine, setSingleLine] = useState(true);
  const [animateLines, setAnimateLines] = useState(false);
  const [uppercase, setUppercase] = useState(true);

  const updateConfig = useCallback((key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  const contextValue = useMemo(
    () => ({
      config,
      updateConfig,
      hideCursor,
      setHideCursor,
      singleLine,
      setSingleLine,
      animateLines,
      setAnimateLines,
      uppercase,
      setUppercase,
    }),
    [config, hideCursor, singleLine, animateLines, uppercase, updateConfig],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
