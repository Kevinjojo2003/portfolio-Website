import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface DesktopNavProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
  handleResumeDownload: () => void;
}

export const DesktopNav = ({
  activeSection,
  scrollToSection,
  handleResumeDownload
}: DesktopNavProps) => {
  const { t } = useTranslation();

  return (
    <div className="hidden md:flex items-center gap-6">
      <button 
        onClick={() => scrollToSection('about')} 
        className={cn("nav-link", activeSection === 'about' && "text-primary")}
      >
        {t('nav.about')}
      </button>
      <button 
        onClick={() => scrollToSection('skills')} 
        className={cn("nav-link", activeSection === 'skills' && "text-primary")}
      >
        {t('nav.skills')}
      </button>
      <button 
        onClick={() => scrollToSection('projects')} 
        className={cn("nav-link", activeSection === 'projects' && "text-primary")}
      >
        {t('nav.projects')}
      </button>
      <button 
        onClick={() => scrollToSection('blogs')} 
        className={cn("nav-link", activeSection === 'blogs' && "text-primary")}
      >
        {t('nav.blogs')}
      </button>
      <button 
        onClick={() => scrollToSection('booking')} 
        className={cn("nav-link", activeSection === 'booking' && "text-primary")}
      >
        {t('nav.booking')}
      </button>
      <button 
        onClick={() => scrollToSection('contact')} 
        className={cn("nav-link", activeSection === 'contact' && "text-primary")}
      >
        {t('nav.contact')}
      </button>
      <button 
        onClick={handleResumeDownload}
        className="nav-link flex items-center gap-1"
      >
        {t('nav.resume')} <Download className="h-4 w-4" />
      </button>
    </div>
  );
};