const FogEffect = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <div
        className="absolute inset-0 animate-fog opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 120% 60% at 20% 80%, hsl(0 0% 20% / 0.4), transparent)",
        }}
      />
      <div
        className="absolute inset-0 animate-fog-reverse opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 100% 50% at 80% 20%, hsl(0 0% 15% / 0.5), transparent)",
        }}
      />
      {/* Subtle red atmospheric glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3 opacity-10"
        style={{
          background: "linear-gradient(to top, hsl(0 100% 27% / 0.2), transparent)",
        }}
      />
    </div>
  );
};

export default FogEffect;
