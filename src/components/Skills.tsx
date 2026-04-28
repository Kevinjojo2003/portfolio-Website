import { Code, Database, Brain, Network, ChartBar, Calculator } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SectionWrapper } from "./SectionWrapper";

type Level = "expert" | "advanced" | "familiar";

interface SkillGroup {
  category: string;
  icon: JSX.Element;
  level: Level;
  percent: number;
  items: string[];
}

export const Skills = () => {
  const { t } = useTranslation();

  const groups: SkillGroup[] = [
    {
      category: t("skills.ai"),
      icon: <Brain className="w-6 h-6 text-primary" />,
      level: "expert",
      percent: 92,
      items: ["TensorFlow", "PyTorch", "Scikit-learn", "Neural Networks", "Optimization", "EDA"],
    },
    {
      category: t("skills.programming"),
      icon: <Code className="w-6 h-6 text-primary" />,
      level: "expert",
      percent: 90,
      items: ["Python", "SQL", "JavaScript", "Flask", "Docker", "Git", "Streamlit"],
    },
    {
      category: t("skills.deepLearning"),
      icon: <Network className="w-6 h-6 text-primary" />,
      level: "advanced",
      percent: 80,
      items: ["CNN", "RNN", "FNN", "GAN", "Transfer Learning", "Computer Vision", "NLP"],
    },
    {
      category: t("skills.dataScience"),
      icon: <Database className="w-6 h-6 text-primary" />,
      level: "advanced",
      percent: 78,
      items: ["Pandas", "NumPy", "Statistical Analysis", "ETL Pipelines", "NoSQL"],
    },
    {
      category: t("skills.visualization"),
      icon: <ChartBar className="w-6 h-6 text-primary" />,
      level: "familiar",
      percent: 65,
      items: ["Matplotlib", "Seaborn", "Tableau", "Power BI"],
    },
    {
      category: t("skills.mathematics"),
      icon: <Calculator className="w-6 h-6 text-primary" />,
      level: "familiar",
      percent: 70,
      items: ["Linear Algebra", "Calculus", "Probability", "Statistics"],
    },
  ];

  const buckets: { key: Level; label: string; color: string }[] = [
    { key: "expert", label: t("skills.level.expert"), color: "text-green-500" },
    { key: "advanced", label: t("skills.level.advanced"), color: "text-primary" },
    { key: "familiar", label: t("skills.level.familiar"), color: "text-yellow-500" },
  ];

  return (
    <SectionWrapper id="skills" title={t("skills.title")} className="bg-secondary/10">
      <div className="space-y-10">
        {buckets.map((bucket, bi) => {
          const items = groups.filter((g) => g.level === bucket.key);
          if (!items.length) return null;
          return (
            <motion.div
              key={bucket.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: bi * 0.1 }}
            >
              <h3 className={`text-lg md:text-xl font-semibold mb-4 ${bucket.color}`}>
                {bucket.label}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((g, i) => (
                  <motion.div
                    key={g.category}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <Card className="glass-card border border-border/60 h-full">
                      <CardContent className="p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {g.icon}
                            <h4 className="font-medium">{g.category}</h4>
                          </div>
                          <span className="text-sm font-semibold text-primary">{g.percent}%</span>
                        </div>
                        <Progress value={g.percent} className="h-2" />
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {g.items.map((s) => (
                            <span
                              key={s}
                              className="px-2 py-0.5 text-xs rounded-md bg-primary/10 text-primary border border-primary/20"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};
