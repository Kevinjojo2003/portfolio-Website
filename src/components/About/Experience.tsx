import { Card, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export const Experience = () => {
  return (
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
  );
};