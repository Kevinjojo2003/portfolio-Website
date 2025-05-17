
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Responsibilities = () => {
  const { t } = useTranslation();
  
  return (
    <Card className="glass-card">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">{t('about.responsibilities')}</h3>
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
                <h4 className="font-medium">{t('about.responsibilities.corporate')}</h4>
                <p className="text-muted-foreground">{t('about.responsibilities.corporateOrg')}</p>
                <p className="text-sm text-muted-foreground">{t('about.responsibilities.corporateDate')}</p>
              </div>
            </div>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
              <li>{t('about.responsibilities.corporateDesc1')}</li>
              <li>{t('about.responsibilities.corporateDesc2')}</li>
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
                <h4 className="font-medium">{t('about.responsibilities.hr')}</h4>
                <p className="text-muted-foreground">{t('about.responsibilities.hrOrg')}</p>
                <p className="text-sm text-muted-foreground">{t('about.responsibilities.hrDate')}</p>
              </div>
            </div>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
              <li>{t('about.responsibilities.hrDesc1')}</li>
              <li>{t('about.responsibilities.hrDesc2')}</li>
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-4">
              <img 
                src="/lovable-uploads/535dd461-a6ee-4b6b-8fb6-759cb1c304eb.png"
                alt="Rotaract Club Logo" 
                className="w-12 h-12 object-contain bg-white rounded-full p-1"
              />
              <div>
                <h4 className="font-medium">{t('about.responsibilities.rotaract')}</h4>
                <p className="text-muted-foreground">{t('about.responsibilities.rotaractOrg')}</p>
                <p className="text-sm text-muted-foreground">{t('about.responsibilities.rotaractDate')}</p>
              </div>
            </div>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
              <li>{t('about.responsibilities.rotaractDesc1')}</li>
              <li>{t('about.responsibilities.rotaractDesc2')}</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
