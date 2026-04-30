import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const trackHero = (label: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "click", { event_category: "Hero", event_label: label });
  }
};

const useTypewriter = (words: string[], speed = 80, hold = 1600) => {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout: number;

    if (!deleting && text === word) {
      timeout = window.setTimeout(() => setDeleting(true), hold);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      timeout = window.setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? speed / 2 : speed,
      );
    }
    return () => window.clearTimeout(timeout);
  }, [text, deleting, wordIdx, words, speed, hold]);

  return text;
};

const KEYWORDS = ["PyTorch", "LangChain", "Computer Vision", "Prompt Engineering", "IEEE Published"];

export const Hero = () => {
  const { t } = useTranslation();
  const roles = [t("hero.role1"), t("hero.role2"), t("hero.role3")];
  const typed = useTypewriter(roles);

  const stats = [
    { v: "1", l: t("hero.stat.paper") },
    { v: "6+", l: "Projects" },
    { v: "3", l: "Companies" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 dot-grid pointer-events-none" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="container-narrow relative w-full text-center">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div
              className="w-[72px] h-[72px] rounded-full bg-card flex items-center justify-center text-2xl font-bold text-primary"
              style={{ border: "1px solid rgb(255 255 255 / 0.06)" }}
            >
              KJ
            </div>
          </div>
        </motion.div>

        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="inline-flex items-center gap-2 surface-card px-3 py-1.5 mb-6"
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
          </span>
          <span className="text-xs text-muted-foreground">{t("hero.available")}</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[40px] md:text-[56px] font-bold tracking-tight leading-[1.05] heading-gradient mb-4"
        >
          {t("hero.name")}
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18 }}
          className="text-lg md:text-xl text-primary mono mb-5 h-7"
        >
          <span>{typed}</span>
          <span className="caret">&nbsp;</span>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="max-w-xl mx-auto text-muted-foreground leading-relaxed mb-6"
        >
          {t("hero.bio")}
        </motion.p>

        {/* Location chip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mb-6"
        >
          <MapPin className="w-3.5 h-3.5" />
          Cochin, Kerala · India
        </motion.div>

        {/* Keyword chips */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {KEYWORDS.map((k) => (
            <span
              key={k}
              className="text-xs mono text-muted-foreground border border-white/[0.06] bg-card rounded-full px-3 py-1"
            >
              {k}
            </span>
          ))}
        </motion.div>

        {/* Stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-8"
        >
          {stats.map((s) => (
            <div key={s.l} className="surface-card px-3 py-4">
              <div className="text-2xl font-bold text-foreground">{s.v}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{s.l}</div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 transition-transform hover:scale-[1.02]"
            onClick={() => {
              trackHero("see_work");
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("hero.cta.work")} <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary/40 hover:bg-primary/10 hover:border-primary gap-2 transition-transform hover:scale-[1.02]"
            onClick={() => {
              trackHero("book_call");
              document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Calendar className="w-4 h-4" />
            {t("hero.cta.book")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
