import { Breaker } from "./components/Breaker";
import { ControlBar } from "./components/ControlBar";
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

  return (
    <>
      <main
        className="main"
        style={{
          background: `rgb(${config.bgColor}, ${config.bgColor}, ${config.bgColor})`,
          lineHeight: config.lineHeight,
        }}
      >
        {lines.map((line, i) => (
          <Breaker key={i} text={line} />
        ))}
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
