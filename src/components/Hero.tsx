import { Button } from "@/components/ui/button";
import { ArrowDown, Mail, Github, Linkedin, MapPin, Sun, Moon } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useTheme } from "@/components/ThemeProvider";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { motion } from "framer-motion";

export const Hero = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center p-6 relative">
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <LanguageSwitcher />
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      <motion.div
        className="space-y-6 max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="glass-card p-8">
          <motion.h1
            className="text-4xl md:text-6xl font-bold gradient-text font-sans mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.h2
            className="text-2xl md:text-3xl text-muted-foreground font-sans mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {t('hero.subtitle')}
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-sans leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {t('hero.description1')}
          </motion.p>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-sans mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {t('hero.description2')}
          </motion.p>
        </div>
        
        <motion.div
          className="flex flex-wrap justify-center gap-4 pt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="outline" size="lg" className="gap-2 hover:scale-105 transition-transform">
                <Mail className="w-4 h-4" />
                kevinjojo003@gmail.com
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-fit">
              Click to copy email
            </HoverCardContent>
          </HoverCard>

          <Button variant="outline" size="lg" asChild className="gap-2 hover:scale-105 transition-transform">
            <a href="https://www.linkedin.com/in/kevinjojo/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </Button>

          <Button variant="outline" size="lg" asChild className="gap-2 hover:scale-105 transition-transform">
            <a href="https://github.com/Kevinjojo2003" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </Button>

          <Button variant="outline" size="lg" className="gap-2 hover:scale-105 transition-transform">
            <MapPin className="w-4 h-4" />
            Cochin, Kerala
          </Button>

          <a 
            className="libutton" 
            href="https://www.linkedin.com/mynetwork/discovery-see-all/?usecase=PEOPLE_FOLLOWS&followMember=kevinjojo" 
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow on LinkedIn
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <Button
            onClick={scrollToProjects}
            className="mt-8 hover:scale-105 transition-transform"
            size="lg"
          >
            {t('hero.viewWork')} <ArrowDown className="ml-2 h-4 w-4 animate-bounce" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};
