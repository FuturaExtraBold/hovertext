import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Breaker } from "./components/Breaker";
import { ControlBar } from "./components/ControlBar";
import { Cursor } from "./components/Cursor";
import { AppProvider, useApp } from "./context/AppContext";

function TeamLogo({ team }) {
  const logoRef = useRef(null);

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0 },
        { opacity: 0.1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [team]);

  if (!team?.logo) return null;

  return (
    <div className="team-logo" ref={logoRef}>
      <img src={team.logo} alt={team.name} />
    </div>
  );
}

function Main() {
  const { config, scenario, hoveredTeam } = useApp();
  const mainRef = useRef(null);

  const layoutStyles = {
    center: {
      justifyContent: "center",
    },
    top: {
      justifyContent: "flex-start",
      paddingTop: 60,
    },
  };

  const getBackground = () => {
    if (hoveredTeam) {
      return hoveredTeam.color;
    }
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
  }, [hoveredTeam, config.bgColor]);

  const renderContent = () => {
    if (scenario.teams) {
      return (
        <div className="breaker-container">
          {scenario.teams.map((team, i) => (
            <Breaker
              key={team.name}
              text={team.players.join(config.textDelimiter) + config.textDelimiter}
              animate={scenario.animate}
              direction={i % 2 === 0 ? "l" : "r"}
              clickable
              team={team}
            />
          ))}
        </div>
      );
    }

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
      {hoveredTeam && <TeamLogo team={hoveredTeam} />}
      <main
        ref={mainRef}
        className="main"
        style={{
          background: getBackground(),
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
