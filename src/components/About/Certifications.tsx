
import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Certifications = () => {
  const { t } = useTranslation();

  const certifications = [
    {
      title: t('about.certifications.google'),
      organization: t('about.certifications.googleOrg'),
      date: t('about.certifications.googleDate')
    },
    {
      title: t('about.certifications.ml'),
      organization: t('about.certifications.mlOrg'),
      date: t('about.certifications.mlDate')
    },
    {
      title: t('about.certifications.chatbot'),
      organization: t('about.certifications.chatbotOrg'),
      date: t('about.certifications.chatbotDate')
    },
    {
      title: t('about.certifications.computational'),
      organization: t('about.certifications.computationalOrg'),
      date: t('about.certifications.computationalDate')
    },
    {
      title: t('about.certifications.marketing'),
      organization: t('about.certifications.marketingOrg'),
      date: t('about.certifications.marketingDate')
    }
  ];

  return (
    <Card className="glass-card">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">{t('about.certifications')}</h3>
        </div>
        <div className="space-y-3">
          {certifications.map((cert, index) => (
            <div key={index}>
              <h4 className="font-medium">{cert.title}</h4>
              <p className="text-sm text-muted-foreground">{cert.organization}, {cert.date}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
