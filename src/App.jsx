import { useEffect, useRef, useState } from "react";

function Char({ char, mousePos }) {
  const ref = useRef(null);

  const getStyles = () => {
    const el = ref.current;
    if (!el || !mousePos) return { fontWeight: 100, colorValue: 20 };

    const rect = el.getBoundingClientRect();
    const charX = rect.left + rect.width / 2;
    const charY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(mousePos.x - charX, 2) + Math.pow(mousePos.y - charY, 2),
    );

    const maxDistance = 300;
    const proximity = 1 - Math.min(distance, maxDistance) / maxDistance;

    const weight = Math.round(100 + proximity * 2000);
    const colorValue = Math.round(20 + proximity * 255);

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

function Breaker({ text, mousePos }) {
  return (
    <span className="breaker">
      {text.split("").map((char, i) => {
        const displayChar = char === " " ? "*" : char;
        return <Char key={i} char={displayChar} mousePos={mousePos} />;
      })}
    </span>
  );
}

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="main">
      <Breaker text="ALPHA BRAVO CHARLIE DELTA ECHO" mousePos={mousePos} />
      <Breaker text="FOXTROT GOLF HOTEL INDIA JULIET" mousePos={mousePos} />
      <Breaker text="KILO LIMA MIKE NOVEMBER OSCAR PAPA" mousePos={mousePos} />
      <Breaker text="QUEBEC ROMEO SIERRA TANGO UNIFORM" mousePos={mousePos} />
      <Breaker text="VICTOR WHISKEY XRAY YANKEE ZULU" mousePos={mousePos} />
    </main>
  );
}

export default App;
