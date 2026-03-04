import { memo, useEffect, useRef } from "react";
import { useApp } from "../context/useApp";
import { subscribeToMouse } from "../hooks/useMousePosition";

export const Char = memo(function Char({ char }) {
  const ref = useRef(null);
  const rectRef = useRef(null);
  const { config } = useApp();
  const configRef = useRef(config);

  // Keep config ref up to date
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  // Cache bounding rect, update on resize or element size change
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateRect = () => {
      rectRef.current = el.getBoundingClientRect();
    };

    updateRect();
    window.addEventListener("resize", updateRect);

    // ResizeObserver catches layout changes (uppercase, font size, etc.)
    const resizeObserver = new ResizeObserver(updateRect);
    resizeObserver.observe(el);

    return () => {
      window.removeEventListener("resize", updateRect);
      resizeObserver.disconnect();
    };
  }, []);

  // Subscribe to mouse updates and apply styles directly to DOM
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const unsubscribe = subscribeToMouse((mouseX, mouseY) => {
      const rect = rectRef.current;
      if (!rect) return;

      const cfg = configRef.current;
      const charX = rect.left + rect.width / 2;
      const charY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(mouseX - charX, 2) + Math.pow(mouseY - charY, 2),
      );

      const linearProximity = 1 - Math.min(distance, cfg.radius) / cfg.radius;
      const proximity = Math.pow(linearProximity, 1 / cfg.strength);

      const weight = Math.round(100 + proximity * (cfg.boldness - 100));
      const colorValue = Math.round(
        cfg.textColor + proximity * (cfg.textColorHover - cfg.textColor),
      );

      el.style.fontWeight = weight;
      el.style.color = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
    });

    return unsubscribe;
  }, []);

  return (
    <span
      ref={ref}
      className="char"
      style={{
        fontWeight: 100,
        color: `rgb(${config.textColor}, ${config.textColor}, ${config.textColor})`,
      }}
    >
      {char}
    </span>
  );
});
