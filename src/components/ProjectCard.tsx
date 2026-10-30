import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AvatarNarrationButton } from "@/components/AvatarNarrationButton";

export interface ProjectCardProps {
  title: string;
  problem: string;
  solution: string;
  metric: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  icon: ReactNode;
  index: number;
  ieeePublished?: boolean;
  featured?: boolean;
  /** Key of the avatar's hover narration (narrate.<id>). */
  narrate?: string;
}

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

export const ProjectCard = ({
  title,
  problem,
  solution,
  metric,
  tech,
  liveUrl,
  githubUrl,
  icon,
  index,
  ieeePublished,
  featured,
  narrate,
}: ProjectCardProps) => {
  const { t } = useTranslation();

  const handleClick = (label: string) => {
    (window as GtagWindow).gtag?.("event", "click", {
      event_category: "Project",
      event_label: `${label} - ${title}`,
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={cn(
        "surface-card-hover flex flex-col h-full",
        featured ? "relative overflow-hidden p-7 md:p-9" : "p-6 md:p-7",
      )}
      data-narrate={narrate}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] text-primary">
          {icon}
        </div>
        <Badge
          variant="outline"
          className={
            ieeePublished
              ? "border-[hsl(var(--accent))]/40 bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]"
              : "border-primary/40 bg-primary/10 text-primary"
          }
        >
          {ieeePublished ? t("projects.ieeePublished") : metric}
        </Badge>
      </div>

      {featured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-40"
          style={{ background: "hsl(var(--primary) / 0.35)" }}
        />
      )}
      <h3
        className={cn(
          "font-semibold text-foreground mb-2 leading-snug tracking-tight",
          featured ? "text-2xl md:text-[28px]" : "text-lg",
        )}
      >
        {title}
      </h3>
      {featured && <p className="text-sm text-muted-foreground/90 mb-3 leading-relaxed">{problem}</p>}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
        {solution}
      </p>

      {ieeePublished && (
        <p className="text-sm font-medium text-primary mb-4">{metric}</p>
      )}

      <div className="flex flex-wrap gap-1.5 mb-5">
        {tech.map((tg) => (
          <span
            key={tg}
            className="mono text-[11px] text-muted-foreground border border-white/[0.06] rounded px-2 py-0.5"
          >
            {tg}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          asChild
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 transition-transform hover:scale-[1.02]"
        >
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleClick("Live")}>
            <ExternalLink className="h-3.5 w-3.5" />
            {t("projects.demo")}
          </a>
        </Button>
        <Button
          asChild
          size="sm"
          variant="outline"
          className="border-white/[0.08] hover:border-primary/40 hover:bg-primary/5 gap-1.5 transition-transform hover:scale-[1.02]"
        >
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleClick("GitHub")}>
            <Github className="h-3.5 w-3.5" />
            {t("projects.code")}
          </a>
        </Button>
        {narrate && <AvatarNarrationButton />}
      </div>
    </motion.article>
  );
};
