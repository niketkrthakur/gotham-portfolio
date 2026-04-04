import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FileText, Lock } from "lucide-react";


const ResumeSection = () => {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  }); // ✅ CLOSED properly

  const audio = new Audio("/batman-click.mp3");

  const playSound = () => {
    audio.currentTime = 0;
    audio.play();
  };

  const y = useTransform(scrollYProgress, [0, 1], [50, -20]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);

  return (
    <section ref={ref} id="resume" className="relative overflow-hidden py-32 px-6">
      <motion.div className="mx-auto max-w-3xl text-center" style={{ y }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="mb-2 font-mono text-xs tracking-[0.3em] text-primary">// 04</p>
          <h2 className="mb-6 font-display text-4xl font-bold tracking-wider text-foreground md:text-5xl">
            CLASSIFIED <span className="text-glowtext-primary">FILE</span>
          </h2>
          <p className="mb-12 font-body text-lg text-muted-foreground">
            Full dossier on operative capabilities, mission history, and credentials.
          </p>
        </motion.div>

        <motion.div
          className="relative mx-auto inline-block"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          style={{ scale }}
        >
          <div className="group relative border border-primary/30 bg-card p-12 transition-all duration-500 hover:border-primary hover:box-glow hover:animate-pulse">
            <Lock className="mx-auto mb-6 h-12 w-12 text-primary/40 transition-all duration-500 group-hover:text-primary group-hover:scale-110 group-hover:rotate-12" />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playSound}
              className="inline-block border border-primary px-10 py-4 font-display text-sm tracking-[0.3em] text-foreground transition-all duration-300 hover:bg-primary/10 hover:text-glow-sm"
              style={{ cursor: "none" }}
              data-clickable
            >
              <span className="flex items-center gap-3">
                <FileText className="h-4 w-4" />
                ACCESS CLASSIFIED DATA
              </span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ResumeSection;
