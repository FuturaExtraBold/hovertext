import { useApp } from "../context/AppContext";

export function Cursor() {
  const { mousePos, hideCursor } = useApp();

  if (hideCursor) return null;

  return (
    <div
      className="custom-cursor"
      style={{
        left: mousePos.x,
        top: mousePos.y,
      }}
    >
      •
    </div>
  );
}
