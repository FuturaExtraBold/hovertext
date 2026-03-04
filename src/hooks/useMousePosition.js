import { useEffect, useState, useRef } from "react";

export function useMousePosition() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        posRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        posRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    // Update state on every animation frame for continuous tracking
    let animationId;
    const tick = () => {
      frameRef.current += 1;
      setMousePos({ ...posRef.current, frame: frameRef.current });
      animationId = requestAnimationFrame(tick);
    };
    animationId = requestAnimationFrame(tick);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return mousePos;
}
