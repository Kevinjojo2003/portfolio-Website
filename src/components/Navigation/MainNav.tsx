import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { useTheme } from "../ThemeProvider";
import { MobileNav } from "./MobileNav";
import { DesktopNav } from "./DesktopNav";

interface MainNavProps {
  activeSection: string;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
  scrollToSection: (id: string) => void;
  handleResumeDownload: () => void;
}

export const MainNav = ({
  activeSection,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  scrollToSection,
  handleResumeDownload
}: MainNavProps) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border/40">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-xl font-bold gradient-text">KJ</span>
        
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        <DesktopNav 
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          handleResumeDownload={handleResumeDownload}
        />
      </div>

      <MobileNav 
        activeSection={activeSection}
        isMobileMenuOpen={isMobileMenuOpen}
        scrollToSection={scrollToSection}
        handleResumeDownload={handleResumeDownload}
      />
    </nav>
  );
};