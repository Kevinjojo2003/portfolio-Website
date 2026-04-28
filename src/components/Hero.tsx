import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Mail, Github, Linkedin, MapPin, Sun, Moon, Sparkles, FileText, Briefcase, Building2 } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useTheme } from "@/components/ThemeProvider";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { motion } from "framer-motion";

const trackHero = (label: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "click", { event_category: "Hero", event_label: label });
  }
};

export const Hero = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const chips = ["PyTorch", "LangChain", "IEEE Published", "Prompt Engineering"];
  const stats = [
    { icon: <FileText className="w-5 h-5" />, value: "1", label: t("hero.stat.ieee") },
    { icon: <Briefcase className="w-5 h-5" />, value: "6+", label: t("hero.stat.projects") },
    { icon: <Building2 className="w-5 h-5" />, value: "3", label: t("hero.stat.companies") },
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-16 relative">
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <LanguageSwitcher />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      <motion.div
        className="flex flex-col items-center max-w-4xl w-full space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* KJ Avatar */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-4xl md:text-5xl font-bold text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-primary/20">
            KJ
          </div>
          <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-500 ring-4 ring-background" aria-hidden="true" />
        </motion.div>

        {/* Status badges */}
        <motion.div
          className="flex flex-wrap gap-2 justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Badge variant="outline" className="gap-1.5 border-green-500/40 bg-green-500/10 text-green-500 px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {t("hero.openToWork")}
          </Badge>
          <Badge variant="outline" className="gap-1.5 px-3 py-1">
            <MapPin className="w-3.5 h-3.5" />
            Cochin, Kerala
          </Badge>
        </motion.div>

        {/* Name + role line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-3"
        >
          <h1 className="text-4xl md:text-6xl font-bold gradient-text font-sans">
            {t("hero.title")}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground inline-flex items-center justify-center gap-2 flex-wrap">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>{t("hero.roleLine")}</span>
          </p>
        </motion.div>

        {/* Skill chips */}
        <motion.div
          className="flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {chips.map((c) => (
            <span
              key={c}
              className="px-3 py-1 rounded-full text-xs md:text-sm border border-primary/30 bg-primary/10 text-primary"
            >
              {c}
            </span>
          ))}
        </motion.div>

        {/* Stat cards */}
        <motion.div
          className="grid grid-cols-3 gap-3 md:gap-4 w-full max-w-2xl pt-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {stats.map((s) => (
            <Card
              key={s.label}
              className="glass-card p-3 md:p-5 flex flex-col items-center gap-1 border border-border/60 hover:border-primary/40 transition-colors"
            >
              <div className="text-primary">{s.icon}</div>
              <div className="text-xl md:text-2xl font-bold">{s.value}</div>
              <div className="text-[11px] md:text-xs text-muted-foreground text-center leading-tight">{s.label}</div>
            </Card>
          ))}
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 pt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="outline" size="lg" className="gap-2 hover:scale-105 transition-transform" onClick={() => trackHero("email")}>
                <Mail className="w-4 h-4" />
                kevinjojo003@gmail.com
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-fit">Click to copy email</HoverCardContent>
          </HoverCard>

          <Button variant="outline" size="lg" asChild className="gap-2 hover:scale-105 transition-transform">
            <a href="https://www.linkedin.com/in/kevinjojo/" target="_blank" rel="noopener noreferrer" onClick={() => trackHero("linkedin")}>
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </Button>

          <Button variant="outline" size="lg" asChild className="gap-2 hover:scale-105 transition-transform">
            <a href="https://github.com/Kevinjojo2003" target="_blank" rel="noopener noreferrer" onClick={() => trackHero("github")}>
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Button onClick={scrollToProjects} className="mt-2 hover:scale-105 transition-transform" size="lg">
            {t("hero.viewWork")} <ArrowDown className="ml-2 h-4 w-4 animate-bounce" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};
