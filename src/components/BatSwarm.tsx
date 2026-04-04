import { motion } from "framer-motion";
import bat from "@/assets/bat-symbol.png";

const bats = Array.from({ length: 12 });

const BatSwarm = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      {bats.map((_, i) => {
        const randomY = Math.random() * window.innerHeight;
        const randomDelay = Math.random() * 0.5;
        const size = 20 + Math.random() * 30;

        return (
          <motion.img
            key={i}
            src={bat}
            className="absolute opacity-80"
            style={{
              top: randomY,
              width: size,
            }}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: window.innerWidth + 100, opacity: 1 }}
            transition={{
              duration: 1.2 + Math.random(),
              delay: randomDelay,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

export default BatSwarm;