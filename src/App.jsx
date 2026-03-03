import { useEffect, useRef, useState } from "react";

function Char({ char, mousePos, config }) {
  const ref = useRef(null);

  const getStyles = () => {
    const el = ref.current;
    if (!el || !mousePos)
      return { fontWeight: 100, colorValue: config.textColor };

    const rect = el.getBoundingClientRect();
    const charX = rect.left + rect.width / 2;
    const charY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(mousePos.x - charX, 2) + Math.pow(mousePos.y - charY, 2),
    );

    const proximity = 1 - Math.min(distance, config.strength) / config.strength;

    const weight = Math.round(100 + proximity * config.boldness);
    const colorValue = Math.round(
      config.textColor + proximity * (255 - config.textColor),
    );

    return { fontWeight: weight, colorValue };
  };

  const styles = getStyles();

  return (
    <span
      ref={ref}
      className="char"
      style={{
        fontWeight: styles.fontWeight,
        color: `rgb(${styles.colorValue}, ${styles.colorValue}, ${styles.colorValue})`,
      }}
    >
      {char}
    </span>
  );
}

function Breaker({ text, mousePos, config }) {
  return (
    <span className="breaker">
      {text.split("").map((char, i) => {
        const displayChar = char === " " ? "*" : char;
        return (
          <Char
            key={i}
            char={displayChar}
            mousePos={mousePos}
            config={config}
          />
        );
      })}
    </span>
  );
}

function ControlBar({ config, setConfig }) {
  return (
    <div className="control-bar">
      <label>
        Background
        <input
          type="range"
          min="0"
          max="255"
          value={config.bgColor}
          onChange={(e) =>
            setConfig({ ...config, bgColor: Number(e.target.value) })
          }
        />
      </label>
      <label>
        Text
        <input
          type="range"
          min="0"
          max="255"
          value={config.textColor}
          onChange={(e) =>
            setConfig({ ...config, textColor: Number(e.target.value) })
          }
        />
      </label>
      <label>
        Strength
        <input
          type="range"
          min="50"
          max="800"
          value={config.strength}
          onChange={(e) =>
            setConfig({ ...config, strength: Number(e.target.value) })
          }
        />
      </label>
      <label>
        Boldness
        <input
          type="range"
          min="100"
          max="1500"
          value={config.boldness}
          onChange={(e) =>
            setConfig({ ...config, boldness: Number(e.target.value) })
          }
        />
      </label>
      <label>
        Line Height
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.05"
          value={config.lineHeight}
          onChange={(e) =>
            setConfig({ ...config, lineHeight: Number(e.target.value) })
          }
        />
      </label>
    </div>
  );
}

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [config, setConfig] = useState({
    bgColor: 17,
    textColor: 20,
    strength: 300,
    boldness: 1000,
    lineHeight: 0.7,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <main
        className="main"
        style={{
          background: `rgb(${config.bgColor}, ${config.bgColor}, ${config.bgColor})`,
          lineHeight: config.lineHeight,
        }}
      >
        <Breaker
          text="ALPHA BRAVO CHARLIE DELTA ECHO"
          mousePos={mousePos}
          config={config}
        />
        <Breaker
          text="FOXTROT GOLF HOTEL INDIA JULIET"
          mousePos={mousePos}
          config={config}
        />
        <Breaker
          text="KILO LIMA MIKE NOVEMBER OSCAR PAPA"
          mousePos={mousePos}
          config={config}
        />
        <Breaker
          text="QUEBEC ROMEO SIERRA TANGO UNIFORM"
          mousePos={mousePos}
          config={config}
        />
        <Breaker
          text="VICTOR WHISKEY XRAY YANKEE ZULU"
          mousePos={mousePos}
          config={config}
        />
      </main>
      <ControlBar config={config} setConfig={setConfig} />
    </>
  );
}

export default App;
