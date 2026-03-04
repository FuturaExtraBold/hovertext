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

const singleLineText = "Juliet Bravo Hotel";

function Main() {
  const { config, singleLine, animateLines } = useApp();
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

  const renderContent = () => {
    if (singleLine) {
      return (
        <div className="single-line-container">
          <Breaker text={singleLineText} animate={false} />
        </div>
      );
    }

    return (
      <div className="breaker-container">
        {lines.map((line, i) => (
          <Breaker
            key={i}
            text={line}
            animate={animateLines}
            direction={i % 2 === 0 ? "l" : "r"}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <Cursor />
      <main
        ref={mainRef}
        className="main"
        style={{
          background: getBackground(),
          lineHeight: config.lineHeight,
          letterSpacing: `${config.tracking}em`,
          fontSize: config.fontSize,
          fontFamily: `"${config.fontFamily}", sans-serif`,
          justifyContent: "center",
        }}
      >
        {renderContent()}
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
