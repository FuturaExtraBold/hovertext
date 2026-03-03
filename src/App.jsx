import { Breaker } from "./components/Breaker";
import { ControlBar } from "./components/ControlBar";
import { Cursor } from "./components/Cursor";
import { AppProvider, useApp } from "./context/AppContext";

function Main() {
  const { config, scenario } = useApp();

  const layoutStyles = {
    center: {
      justifyContent: "center",
    },
    top: {
      justifyContent: "flex-start",
      paddingTop: 60,
    },
  };

  const renderContent = () => {
    if (scenario.words) {
      return (
        <div className="words-container" style={{ gap: config.wordGap }}>
          {scenario.words.map((word, i) => (
            <Breaker
              key={i}
              text={word}
              animate={scenario.animate}
              direction={i % 2 === 0 ? "l" : "r"}
              clickable
            />
          ))}
        </div>
      );
    }

    return (
      <div className="breaker-container">
        {scenario.lines.map((line, i) => (
          <Breaker
            key={i}
            text={line}
            animate={scenario.animate}
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
        className="main"
        style={{
          background: `rgb(${config.bgColor}, ${config.bgColor}, ${config.bgColor})`,
          lineHeight: config.lineHeight,
          fontSize: config.fontSize,
          fontFamily: `"${config.fontFamily}", sans-serif`,
          ...layoutStyles[scenario.layout],
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
