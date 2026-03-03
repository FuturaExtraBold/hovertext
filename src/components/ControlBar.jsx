import { configLabels, configRanges } from "../config";
import { useApp } from "../context/AppContext";

export function ControlBar() {
  const { config, updateConfig } = useApp();

  return (
    <div className="control-bar">
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
