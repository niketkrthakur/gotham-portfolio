import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Send } from "lucide-react";
import batSignal from "@/assets/bat-signal.png";



const ContactSection = () => {
  const [focused, setFocused] = useState("");
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const [glitch, setGlitch] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -20]);
  const clickSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    clickSound.current = new Audio("/batman-click.mp3");
  }, []);

  const playClick = () => {
    if (clickSound.current) {
      clickSound.current.currentTime = 0;
      clickSound.current.play().catch(() => {}); // Handle play promise rejection for browsers that block autoplay without user interaction);
    }
  };
  const batRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
  const el = batRef.current;

  const handleMouseMove = (e: MouseEvent) => {
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateY = ((x - midX) / midX) * 10;
    const rotateX = -((y - midY) / midY) * 10;

    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
    el.style.boxShadow = "0 0 80px rgba(255,0,0,0.6)";
  };

  const reset = () => {
    if (el) {
      el.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
      el.style.boxShadow = "0 0 30px rgba(255,0,0,0.2)";
    }
  };

  if (el) {
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", reset);
  }

  return () => {
    if (el) {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", reset);
    }
  };
}, []); 

  return (
  
    <section ref={ref} id="contact"  className={`relative overflow-hidden py-32 px-6 ${glitch ? "animate-pulse" : ""  }`}>
    
      <motion.div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-10" style={{ y }}>
       <div className="w-full md:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="mb-2 font-mono text-xs tracking-[0.3em] text-primary">// 05</p>
          <h2 className="mb-6 font-display text-4xl font-bold tracking-wider text-foreground md:text-5xl">
            SIGNAL THE <span className="text-primary drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
              KNIGHT
            </span>
          </h2>
          <p className="mb-12 font-body text-lg text-muted-foreground">
            Have a mission? Send a signal.
          </p>
        </motion.div>

        <motion.form
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-80px" }}
          onSubmit={(e) => {
            e.preventDefault();

            playClick();
            setGlitch(true);

            setTimeout(() => {
              setSent(true);
              setGlitch(false);
            }, 800);

            setTimeout(() => setSent(false), 4000);
          }}
        >
          {[
            { name: "name", label: "IDENTIFIER", type: "text" },
            { name: "email", label: "COMM CHANNEL", type: "email" },
          ].map((field) => (
            <div key={field.name} className="relative">
              <label className="mb-2 block font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
                {field.label}
              </label>
              <input
                type={field.type}
                className={`w-full border bg-secondary/50 px-4 py-3 font-body text-foreground outline-none transition-all duration-300 hover:border-primary/50 ${
                  focused === field.name
                    ? "border-primary box-glow-sm"
                    : "border-border"
                }`}
                onFocus={() => setFocused(field.name)}
                onBlur={() => setFocused("")}
                style={{ cursor: "none" }}
              />
            </div>
          ))}

          <div>
            <label className="mb-2 block font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
              TRANSMISSION
            </label>
            <textarea
              rows={5}
              className={`w-full resize-none border bg-secondary/50 px-4 py-3 font-body text-foreground outline-none transition-all duration-300 hover:border-primary/50 ${
                focused === "message"
                  ? "border-primary box-glow-sm"
                  : "border-border"
              }`}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused("")}
              style={{ cursor: "none" }}
            />
          </div>
          
      

          <motion.button
            type="submit"
            // onClick={playClick}
            className="group relative flex w-full items-center justify-center gap-3 border border-primary bg-primary/5 py-4 font-display text-sm tracking-[0.3em] text-foreground transition-all duration-300 hover:bg-primary/20 hover:box-glow-sm overflow-hidden"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            style={{ cursor: "none" }}
            data-clickable
          >
            <Send className="h-4 w-4 text-primary" />

            <span className="relative z-10">SEND SIGNAL</span>

            {/* 🔥 glow sweep */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 animate-pulse"></span>
          </motion.button>
          {sent && (
            <motion.p
              className="text-center font-mono text-xs tracking-[0.3em] text-primary mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {'> SIGNAL RECEIVED...\n> CONNECTING TO BATCOMPUTER...\n> RESPONSE INCOMING ...'}
            </motion.p>
          )}
        </motion.form>
      </div>

      <motion.div
        ref={batRef}
        className="w-full md:w-1/2 h-[500px] md:h-[610px] rounded-xl overflow-hidden 
        border border-primary/30 
        bg-black/40 backdrop-blur-sm
        shadow-[0_0_60px_rgba(255,0,0,0.4),inset_0_0_40px_rgba(255,0,0,0.2)]
        relative"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >

        {/* 🔥 animated border */}
        <span className="absolute inset-0 rounded-xl border border-primary/20 animate-pulse pointer-events-none"></span>

        {/* ✅ ONLY IFRAME (clean) */}
        <iframe
          title="Batman 3D Logo"
          className="w-full h-full scale-[1.15] brightness-110 contrast-125"
          frameBorder="0"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          src="https://sketchfab.com/models/f79a7e6d1d2f42d6ae6091edf5440e16/embed?autostart=1&transparent=1&ui_theme=dark&ui_controls=0&ui_infos=0&ui_stop=0&ui_annotations=0"
        ></iframe>

      </motion.div>

      {/* 🔥 background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.15),transparent_70%)] pointer-events-none"></div>
        
        
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_95%,rgba(255,0,0,0.1)_100%)] bg-[length:100%_4px] animate-pulse opacity-20"></div>
      {glitch && (
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.3, scale: 1.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >

          {/* 🔥 FLASH EFFECT (ADD HERE) */}
          <motion.div
            className="absolute inset-0 bg-primary/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 0.5 }}
          />

          {/* 🦇 BAT IMAGE */}
          <motion.img
            src={batSignal}
            alt="Bat Signal"
            className="w-[200px] md:w-[300px] lg:w-[400px] opacity-30 drop-shadow-[0_0_40px_rgba(255,0,0,0.8)]"
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
        
      
      )}
    
    </section>
  
  );
};

export default ContactSection;
