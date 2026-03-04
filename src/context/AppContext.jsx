import { useCallback, useMemo, useState } from "react";
import { scenarios } from "../scenarios";
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

const defaultScenario = scenarios[0] ?? null;
const defaultScenarioId = defaultScenario?.id ?? "custom";

export function AppProvider({ children }) {
  const [config, setConfig] = useState(() =>
    defaultScenario
      ? { ...defaultConfig, ...defaultScenario.config }
      : defaultConfig,
  );
  const [hideCursor, setHideCursor] = useState(false);
  const [singleLine, setSingleLine] = useState(
    defaultScenario ? defaultScenario.singleLine : true,
  );
  const [animateLines, setAnimateLines] = useState(
    defaultScenario ? defaultScenario.animateLines : false,
  );
  const [uppercase, setUppercase] = useState(
    defaultScenario ? defaultScenario.uppercase : true,
  );
  const [scenarioId, setScenarioId] = useState(defaultScenarioId);

  const updateConfig = useCallback((key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  const applyScenario = useCallback((id) => {
    const scenario = scenarios.find((item) => item.id === id);
    if (!scenario) return;

    setScenarioId(scenario.id);
    setConfig({ ...defaultConfig, ...scenario.config });
    setSingleLine(scenario.singleLine);
    setAnimateLines(scenario.animateLines);
    setUppercase(scenario.uppercase);
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
      scenarioId,
      applyScenario,
    }),
    [
      config,
      hideCursor,
      singleLine,
      animateLines,
      uppercase,
      updateConfig,
      scenarioId,
      applyScenario,
    ],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
