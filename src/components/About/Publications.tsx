import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Publications = () => {
  const { t } = useTranslation();

  const publications = [
    {
      title: t('about.publications.ieee.title'),
      conference: t('about.publications.ieee.conference'),
      publisher: t('about.publications.ieee.publisher'),
      doi: t('about.publications.ieee.doi'),
      description: t('about.publications.ieee.description'),
      url: "https://ieeexplore.ieee.org/document/11256434"
    }
  ];

  return (
    <Card className="glass-card">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">{t('about.publications')}</h3>
        </div>
        <div className="space-y-4">
          {publications.map((pub, index) => (
            <div key={index} className="space-y-2">
              <h4 className="font-medium leading-tight">{pub.title}</h4>
              <p className="text-sm text-muted-foreground">
                {pub.conference}
              </p>
              <p className="text-sm text-muted-foreground">
                {pub.publisher} • DOI: {pub.doi}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pub.description}
              </p>
              <a 
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                {t('about.publications.viewPublication')}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
