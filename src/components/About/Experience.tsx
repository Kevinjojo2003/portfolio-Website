
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Experience = () => {
  const { t } = useTranslation();
  
  return (
    <Card className="glass-card">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">{t('about.experience')}</h3>
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4">
              <img 
                src="/lovable-uploads/kolo-logo.png"
                alt="Kolo Logo" 
                className="w-12 h-12 object-contain bg-white rounded-full p-1"
              />
              <div>
                <h4 className="font-medium">{t('about.experience.promptEngineer')}</h4>
                <p className="text-muted-foreground">{t('about.experience.kolo')}</p>
                <p className="text-sm text-muted-foreground">{t('about.experience.koloDate')}</p>
              </div>
            </div>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
              <li>{t('about.experience.koloDesc1')}</li>
              <li>{t('about.experience.koloDesc2')}</li>
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-4">
              <img 
                src="/lovable-uploads/0b4ce4eb-de3c-47d7-ac69-6ca4b822ad37.png"
                alt="Workcohol Logo" 
                className="w-12 h-12 object-contain bg-white rounded-full p-1"
              />
              <div>
                <h4 className="font-medium">{t('about.experience.aiEngineer')}</h4>
                <p className="text-muted-foreground">{t('about.experience.workcohol')}</p>
                <p className="text-sm text-muted-foreground">{t('about.experience.workcoholDate')}</p>
              </div>
            </div>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
              <li>{t('about.experience.workcoholDesc1')}</li>
              <li>{t('about.experience.workcoholDesc2')}</li>
              <li>{t('about.experience.workcoholDesc3')}</li>
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
                <h4 className="font-medium">{t('about.experience.webDev')}</h4>
                <p className="text-muted-foreground">{t('about.experience.bolt')}</p>
                <p className="text-sm text-muted-foreground">{t('about.experience.boltDate')}</p>
              </div>
            </div>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
              <li>{t('about.experience.boltDesc1')}</li>
              <li>{t('about.experience.boltDesc2')}</li>
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
                <h4 className="font-medium">{t('about.experience.marketing')}</h4>
                <p className="text-muted-foreground">{t('about.experience.younity')}</p>
                <p className="text-sm text-muted-foreground">{t('about.experience.younityDate')}</p>
              </div>
            </div>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
              <li>{t('about.experience.younityDesc1')}</li>
              <li>{t('about.experience.younityDesc2')}</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
