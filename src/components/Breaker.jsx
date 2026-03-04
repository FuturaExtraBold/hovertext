import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { Char } from "./Char";

function BreakerContent({ text }) {
  return (
    <>
      {text.split("").map((char, i) => {
        const displayChar = char === " " ? "\u00A0" : char;
        return <Char key={i} char={displayChar} />;
      })}
    </>
  );
}

export function Breaker({
  text,
  animate = false,
  direction = "l",
  duplicate = true,
}) {
  const { config } = useApp();
  const { animationSpeed } = config;
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const initializedRef = useRef(false);

  // Initialize the tween once
  useEffect(() => {
    if (!trackRef.current || initializedRef.current) return;

    const startX = direction === "r" ? -50 : 0;
    const endX = direction === "r" ? 0 : -50;

    gsap.set(trackRef.current, { xPercent: startX });

    tweenRef.current = gsap.to(trackRef.current, {
      xPercent: endX,
      duration: 1000 / animationSpeed,
      ease: "none",
      repeat: -1,
      paused: !animate,
    });

    initializedRef.current = true;

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
        tweenRef.current = null;
        initializedRef.current = false;
      }
    };
  }, [direction]);

  // Handle animate toggle - pause/resume
  useEffect(() => {
    if (!tweenRef.current) return;

    if (animate) {
      tweenRef.current.resume();
    } else {
      tweenRef.current.pause();
    }
  }, [animate]);

  // Handle speed changes
  useEffect(() => {
    if (!tweenRef.current) return;
    tweenRef.current.duration(1000 / animationSpeed);
  }, [animationSpeed]);

  return (
    <div className="breaker-wrapper">
      <div className="breaker-track" ref={trackRef}>
        <span className="breaker">
          <BreakerContent text={text} />
        </span>
        {duplicate && (
          <>
            &nbsp;
            <span className="breaker">
              <BreakerContent text={text} />
            </span>
          </>
        )}
      </div>
    </div>
  );
}
