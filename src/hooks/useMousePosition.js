import { useEffect, useRef } from "react";

// Module-level singleton for mouse position
const mouseState = {
  x: 0,
  y: 0,
  subscribers: new Set(),
};

let rafId = null;
let isTracking = false;

function startTracking() {
  if (isTracking) return;
  isTracking = true;

  const handleMouseMove = (e) => {
    mouseState.x = e.clientX;
    mouseState.y = e.clientY;
  };

  const handleTouchStart = (e) => {
    if (e.touches.length > 0) {
      mouseState.x = e.touches[0].clientX;
      mouseState.y = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      mouseState.x = e.touches[0].clientX;
      mouseState.y = e.touches[0].clientY;
    }
  };

  const tick = () => {
    mouseState.subscribers.forEach((callback) =>
      callback(mouseState.x, mouseState.y),
    );
    rafId = requestAnimationFrame(tick);
  };

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("touchstart", handleTouchStart);
  window.addEventListener("touchmove", handleTouchMove);
  rafId = requestAnimationFrame(tick);

  // Store cleanup references
  mouseState.cleanup = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("touchstart", handleTouchStart);
    window.removeEventListener("touchmove", handleTouchMove);
    cancelAnimationFrame(rafId);
    isTracking = false;
  };
}

function stopTracking() {
  if (mouseState.cleanup && mouseState.subscribers.size === 0) {
    mouseState.cleanup();
    mouseState.cleanup = null;
  }
}

export function subscribeToMouse(callback) {
  mouseState.subscribers.add(callback);
  startTracking();

  return () => {
    mouseState.subscribers.delete(callback);
    stopTracking();
  };
}

export function getMousePosition() {
  return { x: mouseState.x, y: mouseState.y };
}

// Legacy hook for components that still need React state updates
export function useMousePosition() {
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const unsubscribe = subscribeToMouse((x, y) => {
      posRef.current.x = x;
      posRef.current.y = y;
    });
    return unsubscribe;
  }, []);

  return posRef;
}
