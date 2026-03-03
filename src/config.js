export const defaultConfig = {
  bgColor: 17,
  textColor: 20,
  strength: 300,
  boldness: 1000,
  lineHeight: 0.7,
};

export const configRanges = {
  bgColor: { min: 0, max: 255, step: 1 },
  textColor: { min: 0, max: 255, step: 1 },
  strength: { min: 50, max: 800, step: 1 },
  boldness: { min: 100, max: 1500, step: 1 },
  lineHeight: { min: 0.5, max: 2, step: 0.05 },
};

export const configLabels = {
  bgColor: "Background",
  textColor: "Text",
  strength: "Strength",
  boldness: "Boldness",
  lineHeight: "Line Height",
};
