import { Char } from "./Char";
import { useApp } from "../context/AppContext";

export function Breaker({ text }) {
  const { config } = useApp();
  const { textDelimiter } = config;

  return (
    <span className="breaker">
      {text.split("").map((char, i) => {
        const displayChar = char === " " ? textDelimiter : char;
        return <Char key={i} char={displayChar} />;
      })}
    </span>
  );
}
