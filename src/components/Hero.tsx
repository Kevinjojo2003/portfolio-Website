import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const CODE_LINES = [
  { text: "from career import AIEngineer", color: "text-muted-foreground" },
  { text: "", color: "" },
  { text: "engineer = AIEngineer(", color: "text-foreground" },
  { text: "    name=\"Kevin Jojo\",", color: "text-foreground" },
  { text: "    role=\"Prompt Engineer @ Koloapp\",", color: "text-foreground" },
  { text: "    focus=[\"LLMs\", \"CV\", \"MLOps\"],", color: "text-foreground" },
  { text: "    location=\"Cochin, IN\",", color: "text-foreground" },
  { text: ")", color: "text-foreground" },
  { text: "", color: "" },
  { text: "engineer.ship()  # → 6 deployed projects", color: "text-muted-foreground" },
];

const colorize = (line: string) => {
  // Lightweight syntax tinting — keywords / strings / comments
  if (line.trim().startsWith("#")) return <span className="text-muted-foreground">{line}</span>;
  // Tokenize
  const tokens: { t: string; cls: string }[] = [];
  const re = /("[^"]*"|\b(from|import|class|def|return)\b|\b[A-Z][A-Za-z0-9_]*\b|[A-Za-z_][A-Za-z0-9_]*(?==)|#.*$|[^"a-zA-Z_]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line)) !== null) {
    const tok = m[0];
    if (/^".*"$/.test(tok)) tokens.push({ t: tok, cls: "text-[#06B6D4]" });
    else if (/^(from|import|class|def|return)$/.test(tok)) tokens.push({ t: tok, cls: "text-primary" });
    else if (/^[A-Z][A-Za-z0-9_]*$/.test(tok)) tokens.push({ t: tok, cls: "text-primary" });
    else if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tok) && /=/.test(line.slice(re.lastIndex)))
      tokens.push({ t: tok, cls: "text-foreground" });
    else if (/^#/.test(tok)) tokens.push({ t: tok, cls: "text-muted-foreground" });
    else tokens.push({ t: tok, cls: "text-foreground/70" });
  }
  return tokens.map((tk, i) => <span key={i} className={tk.cls}>{tk.t}</span>);
};

const useTypedCode = () => {
  const full = CODE_LINES.map((l) => l.text).join("\n");
  const [shown, setShown] = useState("");
  useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => {
      i += 2;
      setShown(full.slice(0, i));
      if (i >= full.length) window.clearInterval(id);
    }, 18);
    return () => window.clearInterval(id);
  }, [full]);
  return shown;
};

const trackHero = (label: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "click", { event_category: "Hero", event_label: label });
  }
};

export const Hero = () => {
  const { t } = useTranslation();
  const typed = useTypedCode();
  const lines = typed.split("\n");

  const credentials = [
    { label: t("hero.cred.ieee.label"), value: t("hero.cred.ieee.value") },
    { label: t("hero.cred.role.label"), value: t("hero.cred.role.value") },
    { label: t("hero.cred.edu.label"), value: t("hero.cred.edu.value") },
  ];

  const stats = [
    { v: "1", l: t("hero.stat.paper") },
    { v: "6", l: t("hero.stat.projects") },
    { v: "3", l: t("hero.stat.years") },
  ];

  return (
    <section
      id="hero"
      className="min-h-[92vh] flex items-center pt-24 md:pt-28 pb-16"
    >
      <div className="container-narrow w-full">
        <motion.p
          className="eyebrow mb-5 inline-flex items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          {t("hero.eyebrow")}
        </motion.p>

        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 items-stretch">
          {/* Terminal code block */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="surface-card overflow-hidden flex flex-col"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-3 text-xs mono text-muted-foreground">~ /engineer.py</span>
            </div>
            <pre className="mono text-[13px] md:text-sm leading-relaxed p-5 md:p-6 flex-1 overflow-x-auto scroll-soft">
{lines.map((line, i) => (
  <div key={i} className="whitespace-pre">
    <span className="select-none mr-4 text-muted-foreground/50">{String(i + 1).padStart(2, "0")}</span>
    {colorize(line)}
    {i === lines.length - 1 && <span className="caret">&nbsp;</span>}
  </div>
))}
            </pre>
          </motion.div>

          {/* Credential stack */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-3"
          >
            {credentials.map((c, i) => (
              <div
                key={c.label}
                className="surface-card-hover p-5 flex items-start gap-4"
              >
                <span className="mt-1 text-xs mono text-primary">0{i + 1}</span>
                <div className="flex-1">
                  <p className="eyebrow mb-1.5" style={{ color: "hsl(var(--accent))" }}>
                    {c.label}
                  </p>
                  <p className="text-base md:text-lg font-medium leading-snug text-foreground">
                    {c.value}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stat pills */}
        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          {stats.map((s) => (
            <div
              key={s.l}
              className="surface-card px-4 py-2 flex items-center gap-2.5"
            >
              <span className="text-base font-semibold text-foreground">{s.v}</span>
              <span className="text-sm text-muted-foreground">{s.l}</span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
            onClick={() => {
              trackHero("see_work");
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("hero.cta.work")} <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary/40 hover:bg-primary/10 hover:border-primary gap-2"
          >
            <a
              href="https://ieeexplore.ieee.org/document/11256434"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackHero("read_paper")}
            >
              <FileText className="w-4 h-4" />
              {t("hero.cta.paper")}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
