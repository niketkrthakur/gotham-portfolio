import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import batSymbol from "@/assets/bat-symbol.png";
import batBg from "@/assets/bat-symbol1.png"; // your new glitch bat

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Bat symbol background with parallax */}
      {/* 🦇 Cinematic Bat Reveal */}
      
      {/* 🌑 Darkness Overlay Fade */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2 }}
      />
      <motion.div
        className="absolute flex items-center justify-center"
        style={{ y: bgY }}
      >
        {/* Glow Layer */}
        <motion.img
          src={batBg}
          alt=""
          className="absolute w-[420px] md:w-[650px] lg:w-[850px] opacity-30 blur-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0.25, 0.15],
            scale: [0.8, 1.05, 1],
          }}
          transition={{
            duration: 2.5,
            ease: "easeOut",
          }}
          style={{
            filter: "drop-shadow(0 0 80px rgba(255,0,0,0.9))",
          }}
        />

        {/* Main Bat */}
        <motion.img
          src={batBg}
          alt=""
          className="relative w-[400px] md:w-[600px] lg:w-[800px]"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: [0, 0.2, 0.15],
            scale: [0.6, 1.05, 1],
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
          }}
          style={{
            filter: "drop-shadow(0 0 40px rgba(255,0,0,0.8))",
          }}
        />

        {/* 🦇 Wing Glow Pulse */}
        <motion.div
          className="absolute w-[450px] md:w-[700px] lg:w-[900px] h-[200px] bg-red-600/10 blur-3xl rounded-full"
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{ y: textY, opacity }}
      >
        <motion.p
          className="mb-4 font-mono text-xs tracking-[0.4em] text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          SYSTEM ACCESS GRANTED
        </motion.p>

        <h1 className="mb-4 font-display text-6xl font-bold tracking-wider text-foreground md:text-8xl lg:text-9xl">
          <motion.span
            className="inline-block glitch-text"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            data-text="NIKET"
          >
            NIKET
          </motion.span>
          <br />
          <motion.span
            className="inline-block text-glow text-primary glitch-text"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            data-text="THAKUR"
          >
            THAKUR
          </motion.span>
        </h1>

        <motion.p
          className="font-mono text-sm tracking-[0.3em] text-muted-foreground md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          THE DEVELOPER GOTHAM NEEDS
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <a
            href="#origin"
            className="inline-block border border-primary/30 px-8 py-3 font-mono text-xs tracking-[0.3em] text-muted-foreground transition-all duration-300 hover:border-primary hover:text-foreground hover:box-glow-sm"
            style={{ cursor: "none" }}
            data-clickable
          >
            EXPLORE ↓
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
