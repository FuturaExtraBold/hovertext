import { Char } from "./Char";

export function Breaker({ text }) {
  return (
    <span className="breaker">
      {text.split("").map((char, i) => {
        const displayChar = char === " " ? "*" : char;
        return <Char key={i} char={displayChar} />;
      })}
    </span>
  );
}
