import { Code, Database, Brain, Network, ChartBar, Calculator } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SectionWrapper } from "./SectionWrapper";
import { SkillCard } from "./SkillCard";

export const Skills = () => {
  const { t } = useTranslation();

  const skills = [
    {
      category: t("skills.programming"),
      icon: <Code className="w-6 h-6 text-primary" />,
      items: ["Python", "R", "Java", "C", "HTML/CSS", "JavaScript", "SQL", "Flask", "Docker", "Git", "Streamlit"]
    },
    {
      category: t("skills.ai"),
      icon: <Brain className="w-6 h-6 text-primary" />,
      items: ["TensorFlow", "PyTorch", "Scikit-learn", "Neural Networks", "Decision Trees", "Optimization", "EDA"]
    },
    {
      category: t("skills.deepLearning"),
      icon: <Network className="w-6 h-6 text-primary" />,
      items: ["CNN", "RNN", "FNN", "GAN", "Transfer Learning", "Computer Vision", "NLP"]
    },
    {
      category: t("skills.dataScience"),
      icon: <Database className="w-6 h-6 text-primary" />,
      items: ["Pandas", "NumPy", "Statistical Analysis", "ETL Pipelines", "SQL", "NoSQL", "Large-scale Data Handling"]
    },
    {
      category: t("skills.visualization"),
      icon: <ChartBar className="w-6 h-6 text-primary" />,
      items: ["Matplotlib", "Seaborn", "Tableau", "Power BI", "Data Storytelling"]
    },
    {
      category: t("skills.mathematics"),
      icon: <Calculator className="w-6 h-6 text-primary" />,
      items: ["Linear Algebra", "Calculus", "Probability", "Statistics", "Mathematical Modeling"]
    }
  ];

  return (
    <SectionWrapper id="skills" title={t('skills.title')} className="bg-secondary/10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skillSet, index) => (
          <SkillCard key={skillSet.category} {...skillSet} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
};
