import { Card, CardContent } from "@/components/ui/card";
import { Code, Database, Brain, GitBranch, Terminal, Layout, ChartBar, Network, Calculator } from "lucide-react";
import { useInView } from "react-intersection-observer";

const skills = [
  {
    category: "Programming & Development",
    icon: <Code className="w-6 h-6 text-primary" />,
    items: ["Python", "R", "Java", "C", "HTML/CSS", "JavaScript", "SQL", "Flask", "Docker", "Git", "Streamlit"]
  },
  {
    category: "AI & Machine Learning",
    icon: <Brain className="w-6 h-6 text-primary" />,
    items: ["TensorFlow", "PyTorch", "Scikit-learn", "Neural Networks", "Decision Trees", "Optimization", "EDA"]
  },
  {
    category: "Deep Learning",
    icon: <Network className="w-6 h-6 text-primary" />,
    items: ["CNN", "RNN", "FNN", "GAN", "Transfer Learning", "Computer Vision", "NLP"]
  },
  {
    category: "Data Science & Analytics",
    icon: <Database className="w-6 h-6 text-primary" />,
    items: ["Pandas", "NumPy", "Statistical Analysis", "ETL Pipelines", "SQL", "NoSQL", "Large-scale Data Handling"]
  },
  {
    category: "Data Visualization",
    icon: <ChartBar className="w-6 h-6 text-primary" />,
    items: ["Matplotlib", "Seaborn", "Tableau", "Power BI", "Data Storytelling"]
  },
  {
    category: "Mathematics & Statistics",
    icon: <Calculator className="w-6 h-6 text-primary" />,
    items: ["Linear Algebra", "Calculus", "Probability", "Statistics", "Mathematical Modeling"]
  }
];

export const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="skills" className="py-20 px-6 bg-secondary/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center animate-fade-up">
          Skills & Technologies
        </h2>
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skillSet, index) => (
            <Card 
              key={skillSet.category} 
              className={`bg-secondary/50 border-none hover:bg-secondary/60 transition-all duration-1000 transform ${
                inView 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-20 opacity-0'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                transform: inView ? 'translateY(0)' : 'translateY(20px)'
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
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
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