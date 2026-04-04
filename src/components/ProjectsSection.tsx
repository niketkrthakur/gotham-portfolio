import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "ME & PDFs – AI PDF Toolkit",
    description:
      "Full-stack AI-powered PDF platform with merge, split, compress, conversion, watermark studio, and chat-with-PDF features.",
    tech: ["Flask", "Supabase", "Python", "AI", "JavaScript"],
    link: "https://mnp.vinod09.in/",
    featured: true,
  },
  {
    title: "FinRisk AI",
    description:
      "AI-powered financial analysis tool that detects risks, fraud patterns, and generates intelligent reports from financial statements.",
    tech: ["Python", "AI/ML", "Data Analysis", "PDF Processing"],
    link: "https://finrisk-pdf-ai.lovable.app",
    featured: true,
  },
  {
    title: "SafeKumbh",
    description:
      "Smart sanitation & health monitoring system with AI-based screening, issue reporting, and real-time crowd support tools.",
    tech: ["Python", "Streamlit", "Firebase", "AI"],
    link: "#",
    featured: true,
  },
  {
    title: "Auditorium Booking System",
    description:
      "Web-based booking system with real-time availability, approval workflow, and automated notifications.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://niketkrthakur.github.io/booking-system/",
    featured: false,
  },
  {
    title: "Portfolio Website",
    description:
      "Personal portfolio showcasing projects, skills, and achievements with a responsive and modern UI.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://nkt2002portfolio.vercel.app",
    featured: false,
  },
  {
    title: "Professional Self-Assessment Form",
    description:
      "Interactive form to evaluate skills, track growth, and set professional development goals.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://niketkrthakur.github.io/User-Inputs-From/",
    featured: false,
  },
];

const ProjectsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -30]);

  return (
    <section ref={ref} id="projects" className="relative overflow-hidden py-32 px-6">
      <motion.div className="mx-auto max-w-5xl" style={{ y }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="mb-2 font-mono text-xs tracking-[0.3em] text-primary">// 03</p>
          <h2 className="mb-16 font-display text-4xl font-bold tracking-wider text-foreground md:text-5xl">
            THE <span className="text-glow text-primary">MISSIONS</span>
          </h2>
        </motion.div>

        <div className="grid gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className={`group relative border bg-card p-8 transition-all duration-500 hover:box-glow-sm ${
                project.featured
                  ? "border-primary/50 md:col-span-2"
                  : "border-border hover:border-primary"
              }`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ scale: 1.01 }}
            >
              {project.featured && (
                <span className="mb-4 inline-block font-mono text-[10px] tracking-[0.3em] text-primary">
                  ★ PRIORITY MISSION
                </span>
              )}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="mb-3 font-display text-2xl tracking-wider text-foreground transition-colors group-hover:text-primary">
                    {project.title.toUpperCase()}
                  </h3>
                  <p className="mb-6 max-w-2xl font-body text-base text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="border border-border px-3 py-1 font-mono text-[10px] tracking-wider text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-foreground/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 border border-border p-3 text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
