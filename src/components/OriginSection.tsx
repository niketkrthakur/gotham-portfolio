import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const OriginSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -40]);
  const lineHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  return (
    <section ref={ref} id="origin" className="relative overflow-hidden py-32 px-6">
      {/* Decorative parallax line */}
      <motion.div
        className="absolute left-1/2 top-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"
        style={{ height: lineHeight }}
      />

      <motion.div className="mx-auto max-w-4xl" style={{ y }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="mb-2 font-mono text-xs tracking-[0.3em] text-primary">// 01</p>
          <h2 className="mb-12 font-display text-4xl font-bold tracking-wider text-foreground md:text-5xl">
            THE <span className="text-glow text-primary">ORIGIN</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="font-body text-lg leading-relaxed text-muted-foreground">
              Every hero has an origin story. Mine began not in a cave, but behind a screen —
              where lines of code became my weapon against chaos in the digital world.
            </p>
            <p className="font-body text-lg leading-relaxed text-muted-foreground">
              As a developer driven by purpose, I build solutions that protect, serve, and
              empower. From AI-powered safety systems to scalable web platforms — every
              project is a mission.
            </p>
          </motion.div>

          <motion.div
            className="space-y-4 border-l border-primary/20 pl-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { label: "Code Name", value: "Niket Thakur" },
              { label: "Base", value: "India" },
              { label: "Specialization", value: "Full-Stack Development & AI" },
              { label: "Status", value: "Active" },
            ].map((item) => (
              <div key={item.label} className="group">
                <p className="font-mono text-xs tracking-[0.2em] text-primary/60">{item.label.toUpperCase()}</p>
                <p className="font-body text-lg text-foreground transition-colors group-hover:text-primary">
                  {item.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default OriginSection;
