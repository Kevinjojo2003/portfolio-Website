import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { SectionWrapper } from "./SectionWrapper";

const PIPELINE = [
  { label: "Sentiment", color: "hsl(var(--accent))" },
  { label: "Technical Indicators", color: "hsl(var(--accent))" },
  { label: "Computer Vision", color: "hsl(var(--accent))" },
];

const ArchDiagram = () => (
  <div className="surface-card p-5 md:p-6 bg-white/[0.02]">
    <p className="eyebrow mb-4">SE-SMP Pipeline</p>
    <div className="flex flex-col md:flex-row items-stretch gap-3">
      <div className="flex flex-col gap-2 flex-1">
        {PIPELINE.map((p) => (
          <div
            key={p.label}
            className="rounded-lg border border-white/10 px-3 py-2.5 text-sm mono text-foreground bg-white/[0.02] flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
            {p.label}
          </div>
        ))}
      </div>

      <svg
        viewBox="0 0 80 140"
        className="w-12 h-auto self-center md:self-stretch text-primary"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path
          d="M0 20 Q 60 20 60 70 Q 60 120 0 120"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M0 70 L 60 70"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <polygon points="60,67 68,70 60,73" fill="currentColor" />
      </svg>

      <div className="flex items-center justify-center flex-1">
        <div className="rounded-lg border border-primary/40 bg-primary/10 px-4 py-3 mono text-sm text-foreground">
          → Stock Prediction
        </div>
      </div>
    </div>
  </div>
);

export const Research = () => {
  const { t } = useTranslation();

  return (
    <SectionWrapper
      id="research"
      eyebrow={t("research.eyebrow")}
      title={t("research.title")}
      description={t("research.description")}
    >
      <article className="surface-card p-6 md:p-8 lg:p-10 space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="border-[hsl(var(--accent))]/40 bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]"
          >
            {t("research.badge")}
          </Badge>
          <span className="text-xs text-muted-foreground">{t("research.year")}</span>
        </div>

        <h3 className="text-xl md:text-[22px] font-semibold leading-snug text-foreground">
          {t("research.paperTitle")}
        </h3>

        <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed max-w-3xl">
          {t("research.abstract")}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
          <span className="text-muted-foreground">DOI</span>
          <code className="mono px-2 py-1 rounded-md bg-white/[0.04] border border-white/10 text-foreground">
            10.1109/InC465408.2025.11256434
          </code>
        </div>

        <ArchDiagram />

        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          >
            <a
              href="https://ieeexplore.ieee.org/document/11256434"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("research.readIeee")} <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </article>
    </SectionWrapper>
  );
};
