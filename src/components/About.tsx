import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Briefcase, Users, Award } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center">
          Experience & Responsibilities
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="glass-card">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
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

          <Card className="glass-card">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Experience</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://media.licdn.com/dms/image/C560BAQHUWuO9_Ido4w/company-logo_200_200/company-logo_200_200/0/1676549519780" 
                      alt="Workcohol Logo" 
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <h4 className="font-medium">AI Engineer Intern</h4>
                      <p className="text-muted-foreground">Workcohol Solutions Pvt Ltd</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">January 2025 – Present</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>Developing machine learning models for automated solutions</li>
                    <li>Optimizing AI algorithms for improved accuracy</li>
                    <li>Collaborating with cross-functional teams</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Web Development Intern</h4>
                  <p className="text-muted-foreground">Bolt IoT</p>
                  <p className="text-sm text-muted-foreground">May 2022 – Jun 2022</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>Enhanced user engagement on Quiz Game Portal by 30%</li>
                    <li>Implemented advanced algorithms for better user interaction</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Social Media Marketing Intern</h4>
                  <p className="text-muted-foreground">Younity.in</p>
                  <p className="text-sm text-muted-foreground">Feb 2022 – Apr 2022</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>Increased brand visibility by 40% with data-driven strategies</li>
                    <li>Enhanced campaign effectiveness by 35%</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Positions of Responsibility</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://media.licdn.com/dms/image/v2/C560BAQHUWuO9_Ido4w/company-logo_200_200/company-logo_200_200/0/1676549519780" 
                      alt="E-Cell Karunya Logo" 
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <h4 className="font-medium">Head of Corporate Relations</h4>
                      <p className="text-muted-foreground">E-Cell Karunya, Karunya University</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">June 2023 – June 2024</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>Drove partnerships increasing engagement by 40%</li>
                    <li>Managed teams and fostered corporate partnerships</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Head of Human Resources</h4>
                  <p className="text-muted-foreground">E-Cell Karunya, Karunya University</p>
                  <p className="text-sm text-muted-foreground">February 2023 – June 2023</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>Enhanced recruitment processes, boosting productivity by 20%</li>
                    <li>Established policies that increased retention rates</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Certifications</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">Google Project Management: Specialization</h4>
                  <p className="text-sm text-muted-foreground">Google, Mar 2024</p>
                </div>
                <div>
                  <h4 className="font-medium">Machine Learning with Python - Level 1</h4>
                  <p className="text-sm text-muted-foreground">IBM, Oct 2022</p>
                </div>
                <div>
                  <h4 className="font-medium">AI Chatbot Development using IBM Watson</h4>
                  <p className="text-sm text-muted-foreground">Coursera, Jan 2022</p>
                </div>
                <div>
                  <h4 className="font-medium">Computational Thinking and Problem Solving</h4>
                  <p className="text-sm text-muted-foreground">University of Michigan, Jan 2022</p>
                </div>
                <div>
                  <h4 className="font-medium">Digital Marketing Fundamentals</h4>
                  <p className="text-sm text-muted-foreground">Google Digital Garage, Dec 2021</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
