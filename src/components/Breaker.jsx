import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { Char } from "./Char";

function BreakerContent({ text, textDelimiter }) {
  return (
    <>
      {text.split("").map((char, i) => {
        const displayChar = char === " " ? textDelimiter : char;
        return <Char key={i} char={displayChar} />;
      })}
    </>
  );
}

export function Breaker({
  text,
  animate = false,
  direction = "l",
  clickable = false,
}) {
  const { config, setHideCursor } = useApp();
  const { textDelimiter, animationSpeed } = config;
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    if (!animate || !trackRef.current) return;

    const startX = direction === "r" ? -50 : 0;
    const endX = direction === "r" ? 0 : -50;

    gsap.set(trackRef.current, { xPercent: startX });

    tweenRef.current = gsap.to(trackRef.current, {
      xPercent: endX,
      duration: 1000 / animationSpeed,
      ease: "none",
      repeat: -1,
    });

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
    };
  }, [animate, direction, animationSpeed]);

  const breakerClass = clickable ? "breaker clickable" : "breaker";

  const hoverHandlers = clickable
    ? {
        onMouseEnter: () => setHideCursor(true),
        onMouseLeave: () => setHideCursor(false),
      }
    : {};

  if (!animate) {
    return (
      <span className={breakerClass} {...hoverHandlers}>
        <BreakerContent text={text} textDelimiter={textDelimiter} />
      </span>
    );
  }

  return (
    <div className="breaker-wrapper">
      <div className="breaker-track" ref={trackRef}>
        <span className={breakerClass} {...hoverHandlers}>
          <BreakerContent text={text} textDelimiter={textDelimiter} />
        </span>
        &nbsp;
        <span className={breakerClass} {...hoverHandlers}>
          <BreakerContent text={text} textDelimiter={textDelimiter} />
        </span>
      </div>
    </div>
  );
}
