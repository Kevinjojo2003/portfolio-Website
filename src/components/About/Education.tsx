import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export const Education = () => {
  return (
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
  );
};