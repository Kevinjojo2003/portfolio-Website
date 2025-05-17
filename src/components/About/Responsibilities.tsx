
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Responsibilities = () => {
  const { t } = useTranslation();
  
  return (
    <Card className="glass-card hover:shadow-xl transition-all duration-300">
      <CardContent className="p-8 md:p-10">
        <div className="flex items-center gap-4 mb-8">
          <Users className="w-7 h-7 text-primary" />
          <h3 className="text-2xl font-bold">{t('about.responsibilities')}</h3>
        </div>
        <div className="space-y-8">
          <div className="p-4 rounded-lg hover:bg-primary/5 transition-colors">
            <div className="flex items-center gap-5">
              <img 
                src="/lovable-uploads/15e34c16-27d8-44fa-ac7b-7431ca288a09.png"
                alt="E-Cell Karunya Logo" 
                className="w-16 h-16 object-contain"
              />
              <div>
                <h4 className="text-lg font-semibold">{t('about.responsibilities.corporate')}</h4>
                <p className="text-muted-foreground">{t('about.responsibilities.corporateOrg')}</p>
                <p className="text-sm text-muted-foreground">{t('about.responsibilities.corporateDate')}</p>
              </div>
            </div>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-4 space-y-2 ml-4">
              <li className="leading-relaxed">{t('about.responsibilities.corporateDesc1')}</li>
              <li className="leading-relaxed">{t('about.responsibilities.corporateDesc2')}</li>
            </ul>
          </div>
          
          <div className="p-4 rounded-lg hover:bg-primary/5 transition-colors">
            <div className="flex items-center gap-5">
              <img 
                src="/lovable-uploads/15e34c16-27d8-44fa-ac7b-7431ca288a09.png"
                alt="E-Cell Karunya Logo" 
                className="w-16 h-16 object-contain"
              />
              <div>
                <h4 className="text-lg font-semibold">{t('about.responsibilities.hr')}</h4>
                <p className="text-muted-foreground">{t('about.responsibilities.hrOrg')}</p>
                <p className="text-sm text-muted-foreground">{t('about.responsibilities.hrDate')}</p>
              </div>
            </div>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-4 space-y-2 ml-4">
              <li className="leading-relaxed">{t('about.responsibilities.hrDesc1')}</li>
              <li className="leading-relaxed">{t('about.responsibilities.hrDesc2')}</li>
            </ul>
          </div>
          
          <div className="p-4 rounded-lg hover:bg-primary/5 transition-colors">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center p-1.5 border border-gray-100 shadow-sm">
                <img 
                  src="/lovable-uploads/535dd461-a6ee-4b6b-8fb6-759cb1c304eb.png"
                  alt="Rotaract Club Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold">{t('about.responsibilities.rotaract')}</h4>
                <p className="text-muted-foreground">{t('about.responsibilities.rotaractOrg')}</p>
                <p className="text-sm text-muted-foreground">{t('about.responsibilities.rotaractDate')}</p>
              </div>
            </div>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-4 space-y-2 ml-4">
              <li className="leading-relaxed">{t('about.responsibilities.rotaractDesc1')}</li>
              <li className="leading-relaxed">{t('about.responsibilities.rotaractDesc2')}</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
