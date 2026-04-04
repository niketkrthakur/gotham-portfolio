import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Brain, Globe, Server, Wrench } from "lucide-react";

const categories = [
  {
    title: "AI & ML",
    icon: Brain,
    skills: ["TensorFlow", "PyTorch", "OpenCV", "NLP", "Computer Vision"],
  },
  {
    title: "Web Dev",
    icon: Globe,
    skills: ["React", "Next.js", "TypeScript", "Tailwind", "Three.js"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Python", "FastAPI", "PostgreSQL", "MongoDB"],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["Git", "Docker", "AWS", "Firebase", "Linux"],
  },
];

const SkillsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -30]);

  return (
    <section ref={ref} id="skills" className="relative overflow-hidden py-32 px-6">
      <motion.div className="mx-auto max-w-5xl" style={{ y }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="mb-2 font-mono text-xs tracking-[0.3em] text-primary">// 02</p>
          <h2 className="mb-16 font-display text-4xl font-bold tracking-wider text-foreground md:text-5xl">
            UTILITY <span className="text-glow text-primary">BELT</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              className="group relative border border-border bg-card p-6 transition-all duration-500 hover:border-primary hover:box-glow-sm"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <cat.icon className="mb-4 h-8 w-8 text-primary/60 transition-colors duration-300 group-hover:text-primary" />
              <h3 className="mb-4 font-display text-lg tracking-wider text-foreground">{cat.title.toUpperCase()}</h3>
              <div className="space-y-2">
                {cat.skills.map((skill) => (
                  <p key={skill} className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground/70">
                    → {skill}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
