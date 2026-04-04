import { useMemo } from "react";

const RainEffect = () => {
  const drops = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 0.8 + Math.random() * 0.6,
      opacity: 0.1 + Math.random() * 0.15,
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute w-px bg-foreground/10"
          style={{
            left: `${drop.left}%`,
            height: "15px",
            opacity: drop.opacity,
            animation: `rain-fall ${drop.duration}s linear ${drop.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default RainEffect;
