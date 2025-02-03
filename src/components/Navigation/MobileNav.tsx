import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface MobileNavProps {
  activeSection: string;
  isMobileMenuOpen: boolean;
  scrollToSection: (id: string) => void;
  handleResumeDownload: () => void;
}

export const MobileNav = ({
  activeSection,
  isMobileMenuOpen,
  scrollToSection,
  handleResumeDownload
}: MobileNavProps) => {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        "md:hidden absolute w-full bg-background/95 backdrop-blur-sm border-b border-border/40 transition-all duration-300 ease-in-out",
        isMobileMenuOpen ? "max-h-[400px] py-4" : "max-h-0 overflow-hidden"
      )}
    >
      <div className="flex flex-col space-y-4 px-6">
        <button 
          onClick={() => scrollToSection('about')} 
          className={cn("nav-link text-left", activeSection === 'about' && "text-primary")}
        >
          {t('nav.about')}
        </button>
        <button 
          onClick={() => scrollToSection('skills')} 
          className={cn("nav-link text-left", activeSection === 'skills' && "text-primary")}
        >
          {t('nav.skills')}
        </button>
        <button 
          onClick={() => scrollToSection('projects')} 
          className={cn("nav-link text-left", activeSection === 'projects' && "text-primary")}
        >
          {t('nav.projects')}
        </button>
        <button 
          onClick={() => scrollToSection('blogs')} 
          className={cn("nav-link text-left", activeSection === 'blogs' && "text-primary")}
        >
          {t('nav.blogs')}
        </button>
        <button 
          onClick={() => scrollToSection('booking')} 
          className={cn("nav-link text-left", activeSection === 'booking' && "text-primary")}
        >
          {t('nav.booking')}
        </button>
        <button 
          onClick={() => scrollToSection('contact')} 
          className={cn("nav-link text-left", activeSection === 'contact' && "text-primary")}
        >
          {t('nav.contact')}
        </button>
        <button 
          onClick={handleResumeDownload}
          className="nav-link text-left flex items-center gap-1"
        >
          {t('nav.resume')} <Download className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};