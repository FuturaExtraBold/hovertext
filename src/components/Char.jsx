import { useRef } from "react";
import { useApp } from "../context/AppContext";

export function Char({ char }) {
  const ref = useRef(null);
  const { config, mousePos } = useApp();

  const getStyles = () => {
    const el = ref.current;
    if (!el || !mousePos)
      return { fontWeight: 100, colorValue: config.textColor };

    const rect = el.getBoundingClientRect();
    const charX = rect.left + rect.width / 2;
    const charY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(mousePos.x - charX, 2) + Math.pow(mousePos.y - charY, 2),
    );

    const proximity = 1 - Math.min(distance, config.strength) / config.strength;

    const weight = Math.round(100 + proximity * (config.boldness - 100));
    const colorValue = Math.round(
      config.textColor + proximity * (config.textColorHover - config.textColor),
    );

    return { fontWeight: weight, colorValue };
  };

  const styles = getStyles();

  return (
    <span
      ref={ref}
      className="char"
      style={{
        fontWeight: styles.fontWeight,
        color: `rgb(${styles.colorValue}, ${styles.colorValue}, ${styles.colorValue})`,
      }}
    >
      {char}
    </span>
  );
}
