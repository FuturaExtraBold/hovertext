export const defaultConfig = {
  bgColor: 200,
  textColor: 20,
  textColorHover: 12,
  strength: 300,
  boldness: 900,
  lineHeight: 0.9,
  textDelimiter: "•",
};

export const configRanges = {
  bgColor: { min: 0, max: 255, step: 1 },
  textColor: { min: 0, max: 255, step: 1 },
  textColorHover: { min: 0, max: 255, step: 1 },
  strength: { min: 50, max: 800, step: 1 },
  boldness: { min: 100, max: 900, step: 100 },
  lineHeight: { min: 0.5, max: 2, step: 0.05 },
};

export const configLabels = {
  bgColor: "Background",
  textColor: "Text",
  textColorHover: "Text Hover",
  strength: "Strength",
  boldness: "Boldness",
  lineHeight: "Line Height",
};
