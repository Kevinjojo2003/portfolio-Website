import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

export const Responsibilities = () => {
  return (
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
  );
};