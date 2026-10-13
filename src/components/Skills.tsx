import { useTranslation } from "react-i18next";
import { Brain, Code2, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  tier: "expert" | "advanced" | "familiar";
}

interface SkillCategory {
  key: string;
  icon: JSX.Element;
  title: string;
  caption: string;
  skills: Skill[];
}

const TIER_STYLE: Record<Skill["tier"], string> = {
  expert: "border-primary/50 bg-primary/10 text-foreground",
  advanced: "border-white/[0.12] bg-white/[0.04] text-foreground/90",
  familiar: "border-white/[0.07] text-muted-foreground",
};

export const Skills = () => {
  const { t } = useTranslation();

  const categories: SkillCategory[] = [
    {
      key: "ai",
      icon: <Brain className="w-4 h-4" />,
      title: t("skills.cat.ai.title"),
      caption: t("skills.cat.ai.caption"),
      skills: [
        { name: "Prompt Engineering", tier: "expert" },
        { name: "PyTorch", tier: "expert" },
        { name: "LangChain", tier: "expert" },
        { name: "Computer Vision", tier: "advanced" },
        { name: "TensorFlow", tier: "advanced" },
        { name: "Hugging Face", tier: "familiar" },
      ],
    },
    {
      key: "eng",
      icon: <Code2 className="w-4 h-4" />,
      title: t("skills.cat.eng.title"),
      caption: t("skills.cat.eng.caption"),
      skills: [
        { name: "Python", tier: "expert" },
        { name: "FastAPI", tier: "advanced" },
        { name: "SQL", tier: "advanced" },
        { name: "Git / CI", tier: "advanced" },
        { name: "Docker", tier: "advanced" },
        { name: "TypeScript", tier: "familiar" },
      ],
    },
    {
      key: "product",
      icon: <BarChart3 className="w-4 h-4" />,
      title: t("skills.cat.product.title"),
      caption: t("skills.cat.product.caption"),
      skills: [
        { name: "Analytics", tier: "expert" },
        { name: "Streamlit", tier: "advanced" },
        { name: "Product Strategy", tier: "advanced" },
        { name: "Looker / Sheets", tier: "advanced" },
        { name: "A/B Testing", tier: "familiar" },
      ],
    },
  ];

  const tiers: Skill["tier"][] = ["expert", "advanced", "familiar"];
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
          className="mb-10 md:mb-14 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <p className="eyebrow section-eyebrow mb-3">{t("skills.eyebrow")}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight heading-gradient">
              {t("skills.title")}
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">{t("skills.description")}</p>
          </div>
          <ul className="flex flex-wrap gap-2" aria-label="Legend">
            {tiers.map((tier) => (
              <li key={tier} className={cn("text-[11px] rounded-full border px-2.5 py-1", TIER_STYLE[tier])}>
                {tierLabel[tier]}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: ci * 0.08 }}
              className="surface-card p-6 md:p-7"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex w-9 h-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
                  {cat.icon}
                </span>
                <h3 className="font-semibold text-foreground">{cat.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-5">{cat.caption}</p>

              <ul className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <li
                    key={s.name}
                    title={tierLabel[s.tier]}
                    className={cn("text-[13px] rounded-full border px-3 py-1.5", TIER_STYLE[s.tier])}
                  >
                    {s.name}
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
