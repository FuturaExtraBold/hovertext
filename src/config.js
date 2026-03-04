export const fontOptions = [
  "Chivo",
  "Roboto",
  "Montserrat",
  "Bitter",
  "Ysabeau Infant",
  "Sofia Sans Extra Condensed",
];

export const configRanges = {
  bgColor: { min: 0, max: 255, step: 1 },
  textColor: { min: 0, max: 255, step: 1 },
  textColorHover: { min: 0, max: 255, step: 1 },
  radius: { min: 50, max: 800, step: 1 },
  strength: { min: 0.2, max: 5, step: 0.1 },
  boldness: { min: 100, max: 900, step: 100 },
  lineHeight: { min: 0.5, max: 2, step: 0.05 },
  tracking: { min: -0.2, max: 0.2, step: 0.02 },
  animationSpeed: { min: 5, max: 60, step: 1 },
  fontSize: { min: 64, max: 256, step: 1 },
};

export const configLabels = {
  bgColor: "Background",
  textColor: "Text Color",
  textColorHover: "Text Hover Color",
  radius: "Radius",
  strength: "Strength",
  boldness: "Boldness",
  lineHeight: "Leading",
  tracking: "Tracking",
  animationSpeed: "Animation Speed",
  fontSize: "Font Size",
  fontFamily: "Font Family",
};
