import { memo, useEffect, useRef } from "react";
import { useApp } from "../context/useApp";
import { getMousePosition, subscribeToMouse } from "../hooks/useMousePosition";

export const Cursor = memo(function Cursor() {
  const { hideCursor } = useApp();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || hideCursor) return;

    const unsubscribe = subscribeToMouse((x, y) => {
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    });

    return unsubscribe;
  }, [hideCursor]);

  if (hideCursor) return null;

  const pos = getMousePosition();

  return (
    <div
      ref={ref}
      className="custom-cursor"
      style={{ left: pos.x, top: pos.y }}
    >
      •
    </div>
  );
});
