import { useTranslation } from "react-i18next";
import { Hammer, FlaskConical, Rocket } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";
import { motion } from "framer-motion";

interface SkillColumn {
  key: string;
  icon: JSX.Element;
  title: string;
  caption: string;
  items: string[];
}

export const Skills = () => {
  const { t } = useTranslation();

  const columns: SkillColumn[] = [
    {
      key: "build",
      icon: <Hammer className="w-4 h-4" />,
      title: t("skills.build.title"),
      caption: t("skills.build.caption"),
      items: ["PyTorch", "LangChain", "FastAPI", "Docker", "Streamlit", "SQL", "Python"],
    },
    {
      key: "research",
      icon: <FlaskConical className="w-4 h-4" />,
      title: t("skills.research.title"),
      caption: t("skills.research.caption"),
      items: ["TensorFlow", "Scikit-learn", "ARIMA", "LSTM", "OpenCV", "Hugging Face", "NumPy"],
    },
    {
      key: "ship",
      icon: <Rocket className="w-4 h-4" />,
      title: t("skills.ship.title"),
      caption: t("skills.ship.caption"),
      items: ["Git", "Vercel", "Netlify", "REST APIs", "Postman", "Linux", "CI/CD"],
    },
  ];

  return (
    <SectionWrapper
      id="skills"
      eyebrow={t("skills.eyebrow")}
      title={t("skills.title")}
      description={t("skills.description")}
    >
      <div className="grid md:grid-cols-3 gap-4">
        {columns.map((col, i) => (
          <motion.div
            key={col.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="surface-card p-6"
          >
            <div className="flex items-center gap-2 text-primary mb-1">
              {col.icon}
              <h3 className="text-sm font-semibold uppercase tracking-wider">{col.title}</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-5">{col.caption}</p>
            <div className="flex flex-wrap gap-1.5">
              {col.items.map((s) => (
                <span
                  key={s}
                  className="mono text-xs text-foreground border border-white/10 bg-white/[0.02] rounded-md px-2.5 py-1"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};
