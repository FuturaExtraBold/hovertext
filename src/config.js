export const defaultConfig = {
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
};

export const configRanges = {
  bgColor: { min: 0, max: 255, step: 1 },
  textColor: { min: 0, max: 255, step: 1 },
  textColorHover: { min: 0, max: 255, step: 1 },
  radius: { min: 50, max: 800, step: 1 },
  strength: { min: 0.2, max: 5, step: 0.1 },
  boldness: { min: 100, max: 900, step: 100 },
  lineHeight: { min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { min: 5, max: 60, step: 1 },
  fontSize: { min: 64, max: 256, step: 1 },
};

export const configLabels = {
  bgColor: "Background",
  textColor: "Text",
  textColorHover: "Text Hover",
  radius: "Radius",
  strength: "Strength",
  boldness: "Boldness",
  lineHeight: "Line Height",
  animationSpeed: "Speed",
  fontSize: "Font Size",
};
