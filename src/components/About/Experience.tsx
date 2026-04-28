import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

interface Role {
  logo?: string;
  alt: string;
  title: string;
  company: string;
  date: string;
  bullets: string[];
  stack: string[];
  current?: boolean;
}

export const Experience = () => {
  const { t } = useTranslation();

  const roles: Role[] = [
    {
      logo: "/lovable-uploads/kolo-logo.png",
      alt: "Koloapp",
      title: t("about.experience.promptEngineer"),
      company: t("about.experience.kolo"),
      date: t("about.experience.koloDate"),
      bullets: [
        t("about.experience.koloImpact1"),
        t("about.experience.koloImpact2"),
      ],
      stack: ["LLMs", "Prompt Engineering", "Analytics", "SQL", "Python"],
      current: true,
    },
    {
      logo: "/lovable-uploads/0b4ce4eb-de3c-47d7-ac69-6ca4b822ad37.png",
      alt: "Workcohol",
      title: t("about.experience.aiEngineer"),
      company: t("about.experience.workcohol"),
      date: t("about.experience.workcoholDate"),
      bullets: [
        t("about.experience.workcoholImpact1"),
        t("about.experience.workcoholImpact2"),
        t("about.experience.workcoholImpact3"),
      ],
      stack: ["PyTorch", "TensorFlow", "Computer Vision", "FastAPI", "Docker"],
    },
    {
      logo: "/lovable-uploads/37d2ddda-c5e5-4bbc-9d1e-24fc8e8e6a0e.png",
      alt: "Bolt IoT",
      title: t("about.experience.webDev"),
      company: t("about.experience.bolt"),
      date: t("about.experience.boltDate"),
      bullets: [
        t("about.experience.boltImpact1"),
        t("about.experience.boltImpact2"),
      ],
      stack: ["JavaScript", "HTML/CSS", "REST APIs", "IoT"],
    },
    {
      logo: "/lovable-uploads/dea0126d-86ea-4f83-b953-a62129e31dd7.png",
      alt: "Younity",
      title: t("about.experience.marketing"),
      company: t("about.experience.younity"),
      date: t("about.experience.younityDate"),
      bullets: [
        t("about.experience.younityImpact1"),
        t("about.experience.younityImpact2"),
      ],
      stack: ["Analytics", "Content Strategy"],
    },
  ];

  return (
    <div className="relative">
      {/* Indigo timeline line */}
      <span
        aria-hidden="true"
        className="absolute left-[19px] top-1 bottom-1 w-[2px]"
        style={{ background: "hsl(var(--primary) / 0.5)" }}
      />

      <ol className="space-y-6">
        {roles.map((r, i) => (
          <motion.li
            key={r.company + i}
            className="relative pl-14"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            {/* Logo dot */}
            <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-card border border-white/10 ring-2 ring-background overflow-hidden flex items-center justify-center">
              {r.logo ? (
                <img src={r.logo} alt={r.alt} className="w-full h-full object-contain p-1.5 bg-white" />
              ) : (
                <Briefcase className="w-4 h-4 text-primary" />
              )}
            </div>

            <div className="surface-card-hover p-5 md:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-foreground">{r.title}</h4>
                  {r.current && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 rounded-full px-2 py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {t("about.experience.current")}
                    </span>
                  )}
                </div>
                <span className="text-xs mono text-muted-foreground">{r.date}</span>
              </div>
              <p className="text-sm text-primary mb-3">{r.company}</p>

              <ul className="space-y-1.5 mb-4">
                {r.bullets.map((b, bi) => (
                  <li key={bi} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-primary mt-1.5 flex-shrink-0">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                {r.stack.map((s) => (
                  <span
                    key={s}
                    className="text-[11px] mono text-muted-foreground border border-white/10 rounded px-2 py-0.5"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
};
