import { Card, CardContent } from "@/components/ui/card";

const skills = [
  { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Next.js"] },
  { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "MongoDB"] },
  { category: "Tools", items: ["Git", "Docker", "AWS", "VS Code"] },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 px-6 bg-secondary/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center">
          Skills & Technologies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((skillSet) => (
            <Card key={skillSet.category} className="bg-secondary/50 border-none">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">{skillSet.category}</h3>
                <ul className="space-y-2">
                  {skillSet.items.map((skill) => (
                    <li
                      key={skill}
                      className="text-muted-foreground"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};