import { Github, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SiteFooter = () => {
  const { t } = useTranslation();
  return (
    <footer className="py-8 border-t border-white/[0.06]">
      <div className="container-narrow flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 relative">
        <p className="text-sm text-muted-foreground text-center sm:absolute sm:left-1/2 sm:-translate-x-1/2">
          {t("footer.copyright")}
        </p>
        <div className="hidden sm:block" aria-hidden="true" />
        <div className="flex items-center gap-2 sm:ml-auto">
          <a
            href="https://github.com/Kevinjojo2003"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-white/5 transition-all hover:scale-110"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/kevinjojo/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-white/5 transition-all hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};
