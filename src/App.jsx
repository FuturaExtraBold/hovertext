import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Breaker } from "./components/Breaker";
import { ControlBar } from "./components/ControlBar";
import { Cursor } from "./components/Cursor";
import { AppProvider, useApp } from "./context/AppContext";

const lines = [
  "Alpha Bravo Charlie Delta Echo",
  "Foxtrot Golf Hotel India Juliet",
  "Kilo Lima Mike November Oscar Papa",
  "Quebec Romeo Sierra Tango Uniform",
  "Victor Whiskey Xray Yankee Zulu",
];

const singleLineText = "Juliet Bravo Hotel";

function Main() {
  const { config, singleLine, animateLines, uppercase } = useApp();
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
          <Breaker text={singleLineText} animate={false} duplicate={false} />
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
          textTransform: uppercase ? "uppercase" : "none",
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
