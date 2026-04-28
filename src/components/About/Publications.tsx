import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink, Award } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface PublicationsProps {
  variant?: "default" | "callout";
}

export const Publications = ({ variant = "default" }: PublicationsProps) => {
  const { t } = useTranslation();

  const pub = {
    title: t("about.publications.ieee.title"),
    conference: t("about.publications.ieee.conference"),
    publisher: t("about.publications.ieee.publisher"),
    doi: t("about.publications.ieee.doi"),
    description: t("about.publications.ieee.description"),
    url: "https://ieeexplore.ieee.org/document/11256434",
  };

  if (variant === "callout") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass-card border border-primary/40 bg-gradient-to-br from-primary/10 via-background to-background shadow-lg shadow-primary/10">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/15 border border-primary/30 shrink-0">
                <Award className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-primary/15 text-primary border border-primary/30 hover:bg-primary/20">
                    {t("about.publications.ieee.badge")}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{pub.publisher} • DOI: {pub.doi}</span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold leading-snug">{pub.title}</h3>
                <p className="text-sm text-muted-foreground">{pub.conference}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{pub.description}</p>
                <Button asChild size="sm" className="gap-2">
                  <a href={pub.url} target="_blank" rel="noopener noreferrer">
                    {t("about.publications.viewIeee")}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <Card className="glass-card border border-border/60">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">{t("about.publications")}</h3>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium leading-tight">{pub.title}</h4>
          <p className="text-sm text-muted-foreground">{pub.conference}</p>
          <p className="text-sm text-muted-foreground">{pub.publisher} • DOI: {pub.doi}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{pub.description}</p>
          <a
            href={pub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            {t("about.publications.viewPublication")}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};
