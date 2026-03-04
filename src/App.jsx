import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Breaker } from "./components/Breaker";
import { ControlBar } from "./components/ControlBar";
import { Cursor } from "./components/Cursor";
import { AppProvider, useApp } from "./context/AppContext";

const lines = [
  "ALPHA BRAVO CHARLIE DELTA ECHO",
  "FOXTROT GOLF HOTEL INDIA JULIET",
  "KILO LIMA MIKE NOVEMBER OSCAR PAPA",
  "QUEBEC ROMEO SIERRA TANGO UNIFORM",
  "VICTOR WHISKEY XRAY YANKEE ZULU",
];

function Main() {
  const { config } = useApp();
  const mainRef = useRef(null);

  const getBackground = () => {
    return `rgb(${config.bgColor}, ${config.bgColor}, ${config.bgColor})`;
  };

  useEffect(() => {
    if (mainRef.current) {
      gsap.to(mainRef.current, {
        backgroundColor: getBackground(),
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [config.bgColor]);

  return (
    <>
      <Cursor />
      <main
        ref={mainRef}
        className="main"
        style={{
          background: getBackground(),
          lineHeight: config.lineHeight,
          fontSize: config.fontSize,
          fontFamily: `"${config.fontFamily}", sans-serif`,
          justifyContent: "center",
        }}
      >
        <div className="breaker-container">
          {lines.map((line, i) => (
            <Breaker
              key={i}
              text={line}
              animate={true}
              direction={i % 2 === 0 ? "l" : "r"}
            />
          ))}
        </div>
      </main>
      <ControlBar />
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
}

export default App;
