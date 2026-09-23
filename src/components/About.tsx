import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Experience } from "./About/Experience";
import { FileText, ExternalLink, Lightbulb, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Education = () => {
  const { t } = useTranslation();
  const items = [
    {
      degree: "B.Tech in Computer Science (AI & Machine Learning)",
      school: "Karunya Institute of Technology and Sciences",
      date: "2021 — 2025",
      logo: "/lovable-uploads/e59070ab-b6cc-446a-9027-ba2a0b9045f7.png",
      alt: "Karunya University",
    },
    {
      degree: "Class 11 – 12 · CBSE (Maths with Computer Science)",
      school: "De Paul Public School, Thodupuzha",
      date: "2019 — 2021",
      logo: "/lovable-uploads/71322350-15a1-4f5d-afaf-51a4d7fde786.png",
      alt: "De Paul Public School",
    },
    {
      degree: "Schooling · CBSE",
      school: "The Village International School",
      date: "2007 — 2019",
      logo: "/lovable-uploads/66429d70-55c1-4c94-8ce4-d38253694b0b.png",
      alt: "The Village International School",
    },
  ];

  return (
    <div>
      <p className="eyebrow mb-4">{t("about.education.eyebrow")}</p>
      <div className="space-y-3">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="surface-card-hover p-5 flex gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-white border border-white/[0.06] flex items-center justify-center overflow-hidden shrink-0">
              <img src={it.logo} alt={it.alt} className="w-full h-full object-contain p-1" loading="lazy" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground leading-snug">{it.degree}</h4>
              <p className="text-sm text-primary mt-1">{it.school}</p>
              <p className="text-xs mono text-muted-foreground mt-1">{it.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const PublicationsCallout = () => {
  const { t } = useTranslation();
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="surface-card p-6 md:p-8 mt-10"
    >
      <div className="flex flex-col md:flex-row gap-6 md:items-center">
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
          <FileText className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="eyebrow mb-2">Publication · {t("research.year")}</p>
          <h3 className="text-base md:text-lg font-semibold text-foreground leading-snug mb-2">
            {t("research.paperTitle")}
          </h3>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span>{t("research.badge")}</span>
            <span className="opacity-50">·</span>
            <code className="mono">DOI: 10.1109/InC465408.2025.11256434</code>
          </div>
        </div>
        <Button
          asChild
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shrink-0 transition-transform hover:scale-[1.02]"
        >
          <a href="https://ieeexplore.ieee.org/document/11256434" target="_blank" rel="noopener noreferrer">
            {t("research.readIeee")} <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </div>
    </motion.article>
  );
};

const ResumeHighlights = () => {
  const { t } = useTranslation();
  const highlights = [
    {
      icon: <Lightbulb className="w-5 h-5" />,
      eyebrow: t("about.highlights.familiar.eyebrow"),
      title: t("about.highlights.familiar.title"),
      description: t("about.highlights.familiar.description"),
      tags: ["Customer Discovery", "RAG", "Product Strategy", "YC 2026"],
    },
    {
      icon: <Users className="w-5 h-5" />,
      eyebrow: t("about.highlights.leadership.eyebrow"),
      title: t("about.highlights.leadership.title"),
      description: t("about.highlights.leadership.description"),
      tags: ["Partnerships", "Recruiting", "500+ Members"],
    },
  ];

  return (
    <div className="mt-10">
      <p className="eyebrow mb-4">{t("about.highlights.eyebrow")}</p>
      <div className="grid md:grid-cols-2 gap-4">
        {highlights.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="surface-card-hover p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex w-10 h-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                {item.icon}
              </span>
              <div>
                <p className="text-[11px] mono uppercase text-primary">{item.eyebrow}</p>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-white/[0.06]">
              {item.tags.map((tag) => (
                <span key={tag} className="text-[11px] mono text-muted-foreground border border-white/10 rounded px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <p className="eyebrow mb-3">{t("about.eyebrow")}</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight heading-gradient">
            {t("about.title")}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">{t("about.description")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-12">
          <div>
            <p className="eyebrow mb-4">{t("about.eyebrow")}</p>
            <Experience />
          </div>
          <Education />
        </div>

        <PublicationsCallout />
        <ResumeHighlights />
      </div>
    </section>
  );
};
