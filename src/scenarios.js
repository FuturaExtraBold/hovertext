export const scenarios = {
  playground: {
    name: "Playground",
    config: {
      bgColor: 200,
      textColor: 20,
      textColorHover: 12,
      radius: 300,
      strength: 1,
      boldness: 900,
      lineHeight: 0.9,
      textDelimiter: " ",
      animationSpeed: 100,
      fontSize: 128,
      wordGap: 0,
    },
    lines: [
      "ALPHA BRAVO CHARLIE DELTA ECHO",
      "FOXTROT GOLF HOTEL INDIA JULIET",
      "KILO LIMA MIKE NOVEMBER OSCAR PAPA",
      "QUEBEC ROMEO SIERRA TANGO UNIFORM",
      "VICTOR WHISKEY XRAY YANKEE ZULU",
    ],
    layout: "center",
    animate: true,
  },
  juicyHeader: {
    name: "Juicy Header",
    config: {
      bgColor: 20,
      textColor: 40,
      textColorHover: 255,
      radius: 200,
      strength: 1.5,
      boldness: 900,
      lineHeight: 1,
      textDelimiter: "",
      animationSpeed: 100,
      fontSize: 48,
      wordGap: 60,
    },
    words: ["WORK", "ABOUT", "NEWS", "STORE", "CONTACT"],
    layout: "top",
    animate: false,
  },
};

export const defaultScenario = "playground";
