import { configLabels, configRanges, fontOptions } from "../config";
import { useApp } from "../context/AppContext";
import { scenarios } from "../scenarios";

export function ControlBar() {
  const { config, updateConfig, scenarioKey, switchScenario, setHideCursor } =
    useApp();

  return (
    <div
      className="control-bar"
      onMouseEnter={() => setHideCursor(true)}
      onMouseLeave={() => setHideCursor(false)}
    >
      <label>
        Scenario
        <select
          value={scenarioKey}
          onChange={(e) => switchScenario(e.target.value)}
        >
          {Object.keys(scenarios).map((key) => (
            <option key={key} value={key}>
              {scenarios[key].name}
            </option>
          ))}
        </select>
      </label>
      <label>
        {configLabels.fontFamily}
        <select
          value={config.fontFamily}
          onChange={(e) => updateConfig("fontFamily", e.target.value)}
        >
          {fontOptions.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </label>
      {Object.keys(configRanges).map((key) => (
        <label key={key}>
          {configLabels[key]}
          <input
            type="range"
            min={configRanges[key].min}
            max={configRanges[key].max}
            step={configRanges[key].step}
            value={config[key]}
            onChange={(e) => updateConfig(key, Number(e.target.value))}
          />
        </label>
      ))}
    </div>
  );
}
