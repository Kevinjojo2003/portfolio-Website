import { useTranslation } from "react-i18next";
import { Brain, Code2, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number; // 0-100
  tier: "expert" | "advanced" | "familiar";
}

interface SkillCategory {
  key: string;
  icon: JSX.Element;
  title: string;
  caption: string;
  skills: Skill[];
}

const ProficiencyBar = ({ value, delay }: { value: number; delay: number }) => (
  <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${value}%` }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="h-full bg-primary rounded-full"
    />
  </div>
);

export const Skills = () => {
  const { t } = useTranslation();

  const categories: SkillCategory[] = [
    {
      key: "ai",
      icon: <Brain className="w-4 h-4" />,
      title: t("skills.cat.ai.title"),
      caption: t("skills.cat.ai.caption"),
      skills: [
        { name: "PyTorch", level: 92, tier: "expert" },
        { name: "LangChain", level: 90, tier: "expert" },
        { name: "Prompt Engineering", level: 95, tier: "expert" },
        { name: "Computer Vision", level: 80, tier: "advanced" },
        { name: "TensorFlow", level: 75, tier: "advanced" },
        { name: "Hugging Face", level: 70, tier: "familiar" },
      ],
    },
    {
      key: "eng",
      icon: <Code2 className="w-4 h-4" />,
      title: t("skills.cat.eng.title"),
      caption: t("skills.cat.eng.caption"),
      skills: [
        { name: "Python", level: 95, tier: "expert" },
        { name: "FastAPI", level: 85, tier: "advanced" },
        { name: "Docker", level: 75, tier: "advanced" },
        { name: "SQL", level: 80, tier: "advanced" },
        { name: "Git / CI", level: 80, tier: "advanced" },
        { name: "TypeScript", level: 65, tier: "familiar" },
      ],
    },
    {
      key: "product",
      icon: <BarChart3 className="w-4 h-4" />,
      title: t("skills.cat.product.title"),
      caption: t("skills.cat.product.caption"),
      skills: [
        { name: "Analytics", level: 88, tier: "expert" },
        { name: "Product Strategy", level: 80, tier: "advanced" },
        { name: "Streamlit", level: 85, tier: "advanced" },
        { name: "A/B Testing", level: 70, tier: "familiar" },
        { name: "Looker / Sheets", level: 75, tier: "advanced" },
      ],
    },
  ];

  const tierLabel: Record<Skill["tier"], string> = {
    expert: t("skills.expert"),
    advanced: t("skills.advanced"),
    familiar: t("skills.familiar"),
  };

  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <p className="eyebrow mb-3">{t("skills.eyebrow")}</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight heading-gradient">
            {t("skills.title")}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">{t("skills.description")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: ci * 0.08 }}
              className="surface-card p-6"
            >
              <div className="flex items-center gap-2 text-primary mb-1">
                {cat.icon}
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                  {cat.title}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mb-5">{cat.caption}</p>

              <ul className="space-y-3.5">
                {cat.skills.map((s, i) => (
                  <li key={s.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-foreground">{s.name}</span>
                      <span className="text-[10px] mono uppercase tracking-wider text-muted-foreground">
                        {tierLabel[s.tier]}
                      </span>
                    </div>
                    <ProficiencyBar value={s.level} delay={ci * 0.08 + i * 0.04} />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
