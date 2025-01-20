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
                <div className="flex items-center gap-4">
                  <img 
                    src="/lovable-uploads/e59070ab-b6cc-446a-9027-ba2a0b9045f7.png"
                    alt="Karunya University Logo" 
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <h4 className="font-medium">Karunya Institute of Technology and Sciences</h4>
                    <p className="text-muted-foreground">Bachelor of Technology in Computer Science (AI and Machine Learning)</p>
                    <p className="text-sm text-muted-foreground">Sep 2021 – May 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <img 
                    src="/lovable-uploads/71322350-15a1-4f5d-afaf-51a4d7fde786.png"
                    alt="De Paul Public School Logo" 
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <h4 className="font-medium">De Paul Public School Thodupuzha</h4>
                    <p className="text-muted-foreground">Class 12 CBSE - Mathematics with Computer Science</p>
                    <p className="text-sm text-muted-foreground">2019 – 2021</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <img 
                    src="/lovable-uploads/66429d70-55c1-4c94-8ce4-d38253694b0b.png"
                    alt="The Village International School Logo" 
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <h4 className="font-medium">The Village International School</h4>
                    <p className="text-muted-foreground">Class 10 CBSE</p>
                    <p className="text-sm text-muted-foreground">2017 – 2019</p>
                  </div>
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
                  <div className="flex items-center gap-4">
                    <img 
                      src="/lovable-uploads/0b4ce4eb-de3c-47d7-ac69-6ca4b822ad37.png"
                      alt="Workcohol Logo" 
                      className="w-12 h-12 object-contain bg-white rounded-full p-1"
                    />
                    <div>
                      <h4 className="font-medium">AI Engineer Intern</h4>
                      <p className="text-muted-foreground">Workcohol Solutions Pvt Ltd</p>
                      <p className="text-sm text-muted-foreground">January 2025 – Present</p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>Developing machine learning models for automated solutions</li>
                    <li>Optimizing AI algorithms for improved accuracy</li>
                    <li>Collaborating with cross-functional teams</li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-4">
                    <img 
                      src="/lovable-uploads/37d2ddda-c5e5-4bbc-9d1e-24fc8e8e6a0e.png"
                      alt="Bolt IoT Logo" 
                      className="w-12 h-12 object-contain bg-white rounded-full p-1"
                    />
                    <div>
                      <h4 className="font-medium">Web Development Intern</h4>
                      <p className="text-muted-foreground">Bolt IoT</p>
                      <p className="text-sm text-muted-foreground">May 2022 – Jun 2022</p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>Enhanced user engagement on Quiz Game Portal by 30%</li>
                    <li>Implemented advanced algorithms for better user interaction</li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-4">
                    <img 
                      src="/lovable-uploads/dea0126d-86ea-4f83-b953-a62129e31dd7.png"
                      alt="Younity Logo" 
                      className="w-12 h-12 object-contain bg-white rounded-full p-1"
                    />
                    <div>
                      <h4 className="font-medium">Social Media Marketing Intern</h4>
                      <p className="text-muted-foreground">Younity.in</p>
                      <p className="text-sm text-muted-foreground">Feb 2022 – Apr 2022</p>
                    </div>
                  </div>
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
                  <div className="flex items-center gap-4">
                    <img 
                      src="/lovable-uploads/15e34c16-27d8-44fa-ac7b-7431ca288a09.png"
                      alt="E-Cell Karunya Logo" 
                      className="w-12 h-12 object-contain"
                    />
                    <div>
                      <h4 className="font-medium">Head of Corporate Relations</h4>
                      <p className="text-muted-foreground">E-Cell Karunya, Karunya University</p>
                      <p className="text-sm text-muted-foreground">June 2023 – June 2024</p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>Drove partnerships increasing engagement by 40%</li>
                    <li>Managed teams and fostered corporate partnerships</li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-4">
                    <img 
                      src="/lovable-uploads/15e34c16-27d8-44fa-ac7b-7431ca288a09.png"
                      alt="E-Cell Karunya Logo" 
                      className="w-12 h-12 object-contain"
                    />
                    <div>
                      <h4 className="font-medium">Head of Human Resources</h4>
                      <p className="text-muted-foreground">E-Cell Karunya, Karunya University</p>
                      <p className="text-sm text-muted-foreground">February 2023 – June 2023</p>
                    </div>
                  </div>
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