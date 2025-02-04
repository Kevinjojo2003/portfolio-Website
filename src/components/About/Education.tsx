import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Education = () => {
  const { t } = useTranslation();
  
  return (
    <Card className="glass-card">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">{t('about.education')}</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/e59070ab-b6cc-446a-9027-ba2a0b9045f7.png"
              alt="Karunya University Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h4 className="font-medium">{t('about.education.karunya')}</h4>
              <p className="text-muted-foreground">{t('about.education.karunyaDegree')}</p>
              <p className="text-sm text-muted-foreground">{t('about.education.karunyaDate')}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/71322350-15a1-4f5d-afaf-51a4d7fde786.png"
              alt="De Paul Public School Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h4 className="font-medium">{t('about.education.depaul')}</h4>
              <p className="text-muted-foreground">{t('about.education.depaulDegree')}</p>
              <p className="text-sm text-muted-foreground">{t('about.education.depaulDate')}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/66429d70-55c1-4c94-8ce4-d38253694b0b.png"
              alt="The Village International School Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h4 className="font-medium">{t('about.education.village')}</h4>
              <p className="text-muted-foreground">{t('about.education.villageDegree')}</p>
              <p className="text-sm text-muted-foreground">{t('about.education.villageDate')}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};