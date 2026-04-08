import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
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
}

export const ProjectCard = ({ title, description, tech, liveUrl, githubUrl, icon, index }: ProjectCardProps) => {
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
      <Card className="bg-secondary/50 border-none hover:bg-secondary/60 transition-colors h-full">
        <CardHeader className="flex flex-row items-start space-y-0 gap-3">
          {icon}
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {tech.map((t) => (
              <span key={t} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
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
