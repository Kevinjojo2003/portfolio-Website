
import { Card, CardContent } from "@/components/ui/card";
import { Code, Database, Brain, GitBranch, Terminal, Layout, ChartBar, Network, Calculator } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";

export const Skills = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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
    <section id="skills" className="py-20 px-6 bg-secondary/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center animate-fade-up">
          {t('skills.title')}
        </h2>
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skillSet, index) => (
            <Card 
              key={skillSet.category} 
              className={`glass-card hover:scale-105 transition-all duration-300 transform ${
                inView 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-20 opacity-0'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {skillSet.icon}
                  <h3 className="text-xl font-semibold">{skillSet.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillSet.items.map((skill, skillIndex) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-all duration-300 transform hover:scale-105"
                      style={{ 
                        animation: inView ? `fadeIn 0.5s ease-out forwards ${(index * 100) + (skillIndex * 50)}ms` : 'none',
                        opacity: 0
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
