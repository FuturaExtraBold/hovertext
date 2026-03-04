import { configLabels, configRanges, fontOptions } from "../config";
import { scenarios } from "../scenarios";
import { useApp } from "../context/useApp";

export function ControlBar() {
  const {
    config,
    updateConfig,
    setHideCursor,
    singleLine,
    animateLines,
    setAnimateLines,
    uppercase,
    setUppercase,
    scenarioId,
    applyScenario,
  } = useApp();

  return (
    <div
      className="control-bar"
      role="region"
      aria-label="Typography controls"
      onMouseEnter={() => setHideCursor(true)}
      onMouseLeave={() => setHideCursor(false)}
    >
      <label>
        Scenario
        <select
          value={scenarioId}
          onChange={(e) => applyScenario(e.target.value)}
          aria-label="Select scenario"
        >
          {scenarios.map((scenario) => (
            <option key={scenario.id} value={scenario.id}>
              {scenario.name}
            </option>
          ))}
        </select>
      </label>
      {!singleLine && (
        <label>
          Animate
          <input
            type="checkbox"
            checked={animateLines}
            onChange={(e) => setAnimateLines(e.target.checked)}
            aria-label="Toggle line animation"
          />
        </label>
      )}
      <label>
        Uppercase
        <input
          type="checkbox"
          checked={uppercase}
          onChange={(e) => setUppercase(e.target.checked)}
          aria-label="Toggle uppercase text"
        />
      </label>
      <label>
        {configLabels.fontFamily}
        <select
          value={config.fontFamily}
          onChange={(e) => updateConfig("fontFamily", e.target.value)}
          aria-label="Select font family"
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
            aria-label={`Adjust ${configLabels[key]}`}
            aria-valuemin={configRanges[key].min}
            aria-valuemax={configRanges[key].max}
            aria-valuenow={config[key]}
          />
        </label>
      ))}
    </div>
  );
}
