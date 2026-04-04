import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import batSymbol from "@/assets/bat-symbol.png";
import BatSwarm from "./BatSwarm"; // 👈 import bats

interface EntryScreenProps {
  onEnter: () => void;
  isVisible: boolean;
}

const EntryScreen = ({ onEnter, isVisible }: EntryScreenProps) => {
const [showBats, setShowBats] = useState(false);

const audioRef = useRef<HTMLAudioElement | null>(null);
const [isPlaying, setIsPlaying] = useState(true);

useEffect(() => {
  const audio = new Audio("/ambient-dark.mp3");
  audio.loop = true;
  audio.volume = 0.3;

  audio.play().catch(() => {});
  audioRef.current = audio;

  return () => {
    audio.pause();
  };
}, []);

  // 🦇 click sound
  const clickAudio = new Audio("/batman-theme.mp3");

  const handleEnter = () => {
    clickAudio.currentTime = 0;
    clickAudio.play().catch(() => {});

    // 🦇 trigger bats
    setShowBats(true);

    // ⏳ delay then go to main
    setTimeout(() => {
      onEnter(); // ✅ VERY IMPORTANT
    }, 1200);
  };

  const toggleMusic = () => {
  if (!audioRef.current) return;

  if (isPlaying) {
    audioRef.current.pause();
  } else {
    audioRef.current.play().catch(() => {});
  }

  setIsPlaying(!isPlaying);
};

  return (
    <>
      {/* 🦇 BAT SWARM */}
      {showBats && <BatSwarm />}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            {/* 🦇 Logo */}
            <motion.img
              src={batSymbol}
              alt="Bat Symbol"
              className="mb-12 h-[200px] md:h-[240px] lg:h-[280px] w-auto animate-bat-pulse"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />

            <motion.p
              className="mb-8 font-mono text-sm tracking-[0.3em] text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              INITIALIZING GOTHAM NETWORK
              <span className="animate-pulse">...</span>
            </motion.p>

            <motion.button
              onClick={handleEnter}
              className="group relative border border-primary px-10 py-4 font-display text-lg tracking-widest text-foreground transition-all duration-300 hover:border-glow hover:text-glow"
              style={{ cursor: "none" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              data-clickable
            >
              <span className="relative z-10">ENTER GOTHAM</span>

              <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-0 box-glow opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={toggleMusic}
        className="fixed bottom-6 right-24 z-[200] 
        border border-primary/40 
        bg-black/50 backdrop-blur-md 
        p-4 rounded-full 
        shadow-[0_0_20px_rgba(255,0,0,0.4)]
        hover:shadow-[0_0_40px_rgba(255,0,0,0.8)]
        transition-all duration-300"
        
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ cursor: "none" }}
      >
        <span className="text-primary font-mono text-xs tracking-widest">
          {isPlaying ? "𝙽K𝚃" : "𝙱𝙰𝚃𝙼𝙰𝙽"}
        </span>
      </motion.button>
    </>
  );
};

export default EntryScreen;