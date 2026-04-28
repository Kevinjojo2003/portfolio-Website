import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ReactNode } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  icon: ReactNode;
  index: number;
  metric?: string;
}

export const ProjectCard = ({ title, description, tech, liveUrl, githubUrl, icon, index, metric }: ProjectCardProps) => {
  const { t } = useTranslation();

  const handleClick = (url: string, label: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "click", {
        event_category: "Project",
        event_label: `${label} - ${title}`,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="glass-card border border-border/60 hover:border-primary/40 transition-colors h-full flex flex-col">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
              {icon}
            </div>
            <Badge variant="outline" className="gap-1.5 border-green-500/40 bg-green-500/10 text-green-500">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              {t("projects.live")}
            </Badge>
          </div>
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          {metric && (
            <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
              <TrendingUp className="w-4 h-4" />
              <span>{metric}</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {tech.map((tg) => (
              <span key={tg} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm border border-primary/20">
                {tg}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline" size="sm">
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleClick(liveUrl, "Live Demo")}>
                <ExternalLink className="mr-2 h-4 w-4" />
                {t("projects.liveDemo")}
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleClick(githubUrl, "GitHub")}>
                <Github className="mr-2 h-4 w-4" />
                {t("projects.viewCode")}
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
