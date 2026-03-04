import { configLabels, configRanges, fontOptions } from "../config";
import { useApp } from "../context/AppContext";

export function ControlBar() {
  const {
    config,
    updateConfig,
    setHideCursor,
    singleLine,
    setSingleLine,
    animateLines,
    setAnimateLines,
    uppercase,
    setUppercase,
  } = useApp();

  return (
    <div
      className="control-bar"
      onMouseEnter={() => setHideCursor(true)}
      onMouseLeave={() => setHideCursor(false)}
    >
      <label>
        Single Line
        <input
          type="checkbox"
          checked={singleLine}
          onChange={(e) => setSingleLine(e.target.checked)}
        />
      </label>
      {!singleLine && (
        <label>
          Animate
          <input
            type="checkbox"
            checked={animateLines}
            onChange={(e) => setAnimateLines(e.target.checked)}
          />
        </label>
      )}
      <label>
        Uppercase
        <input
          type="checkbox"
          checked={uppercase}
          onChange={(e) => setUppercase(e.target.checked)}
        />
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
