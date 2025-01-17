import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Briefcase } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center">
          Education & Experience
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-secondary/50 border-none hover:bg-secondary/60 transition-colors">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Education</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Karunya Institute of Technology and Sciences</h4>
                  <p className="text-muted-foreground">Bachelor of Technology in Computer Science (AI and Machine Learning)</p>
                  <p className="text-sm text-muted-foreground">Sep 2021 – May 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/50 border-none hover:bg-secondary/60 transition-colors">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Experience</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">AI Engineer Intern</h4>
                  <p className="text-muted-foreground">Workcohol Solutions Pvt Ltd</p>
                  <p className="text-sm text-muted-foreground">January 2025 – Present</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2">
                    <li>Developing machine learning models for automated solutions</li>
                    <li>Optimizing AI algorithms for improved accuracy</li>
                    <li>Collaborating with cross-functional teams</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Web Development Intern</h4>
                  <p className="text-muted-foreground">Bolt IoT</p>
                  <p className="text-sm text-muted-foreground">May 2022 – Jun 2022</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};