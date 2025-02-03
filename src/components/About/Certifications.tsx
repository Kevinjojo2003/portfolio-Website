import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";

export const Certifications = () => {
  return (
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
  );
};