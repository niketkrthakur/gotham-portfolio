import { useEffect, useState } from "react";
import batSymbol from "@/assets/bat-symbol.png";

const BatCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, [data-clickable]")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed z-[9999] transition-transform duration-75"
        style={{
          left: pos.x - 12,
          top: pos.y - 7,
          transform: isHovering ? "scale(1.6)" : "scale(1)",
        }}
      >
        <img
          src={batSymbol}
          alt=""
          width={24}
          height={14}
          style={{
            filter: isHovering
              ? "drop-shadow(0 0 8px hsl(0, 100%, 55%))"
              : "drop-shadow(0 0 4px hsl(0, 100%, 40%))",
          }}
        />
      </div>
      {/* Trail */}
      <div
        className="pointer-events-none fixed z-[9998] rounded-full transition-all duration-300 ease-out"
        style={{
          left: pos.x - 16,
          top: pos.y - 16,
          width: 32,
          height: 32,
          border: `1px solid hsl(0, 100%, ${isHovering ? "55%" : "27%"} / 0.3)`,
          transform: isHovering ? "scale(1.5)" : "scale(1)",
        }}
      />
    </>
  );
};

export default BatCursor;
