import { Card, CardContent } from "@/components/ui/card";
import { Code, Database, Brain, GitBranch, Terminal, Layout } from "lucide-react";

const skills = [
  {
    category: "Programming",
    icon: <Code className="w-6 h-6 text-primary" />,
    items: ["Python", "Java", "C", "HTML/CSS", "JavaScript", "SQL"]
  },
  {
    category: "AI & ML",
    icon: <Brain className="w-6 h-6 text-primary" />,
    items: ["TensorFlow", "Keras", "scikit-learn", "OpenCV", "LSTM", "CNN"]
  },
  {
    category: "Data Science",
    icon: <Database className="w-6 h-6 text-primary" />,
    items: ["Pandas", "NumPy", "Tableau", "PowerBI", "Data Analysis"]
  },
  {
    category: "Tools & Technologies",
    icon: <Terminal className="w-6 h-6 text-primary" />,
    items: ["Git", "GitHub", "Google Colab", "Streamlit", "Jira"]
  }
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 px-6 bg-secondary/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center">
          Skills & Technologies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {skills.map((skillSet) => (
            <Card key={skillSet.category} className="bg-secondary/50 border-none hover:bg-secondary/60 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {skillSet.icon}
                  <h3 className="text-xl font-semibold">{skillSet.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillSet.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
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