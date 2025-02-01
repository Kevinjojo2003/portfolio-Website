import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { BookingForm } from "@/components/BookingForm";
import { LinkedInPosts } from "@/components/LinkedInPosts";
import { Blogs } from "@/components/Blogs";
import { IPTracker } from "@/components/IPTracker";
import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("section").forEach((section) => {
      section.classList.add("section-fade");
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };

  const handleResumeDownload = () => {
    const resumeUrl = "https://drive.google.com/uc?export=download&id=1FbcJTU8HlAYkABnixfUynwya2euTFxAM";
    
    try {
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Opening resume in a new tab!");
    } catch (error) {
      toast.error("Unable to download resume. Please try again later.");
      console.error("Resume download error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] dark:bg-background">
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

          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('about')} 
              className={cn("nav-link", activeSection === 'about' && "text-primary")}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('skills')} 
              className={cn("nav-link", activeSection === 'skills' && "text-primary")}
            >
              Skills
            </button>
            <button 
              onClick={() => scrollToSection('projects')} 
              className={cn("nav-link", activeSection === 'projects' && "text-primary")}
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('blogs')} 
              className={cn("nav-link", activeSection === 'blogs' && "text-primary")}
            >
              Blogs
            </button>
            <button 
              onClick={() => scrollToSection('booking')} 
              className={cn("nav-link", activeSection === 'booking' && "text-primary")}
            >
              Book a Chat
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className={cn("nav-link", activeSection === 'contact' && "text-primary")}
            >
              Contact
            </button>
            <button 
              onClick={handleResumeDownload}
              className="nav-link flex items-center gap-1"
            >
              Resume <Download className="h-4 w-4" />
            </button>
          </div>
        </div>

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
              About
            </button>
            <button 
              onClick={() => scrollToSection('skills')} 
              className={cn("nav-link text-left", activeSection === 'skills' && "text-primary")}
            >
              Skills
            </button>
            <button 
              onClick={() => scrollToSection('projects')} 
              className={cn("nav-link text-left", activeSection === 'projects' && "text-primary")}
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('blogs')} 
              className={cn("nav-link text-left", activeSection === 'blogs' && "text-primary")}
            >
              Blogs
            </button>
            <button 
              onClick={() => scrollToSection('booking')} 
              className={cn("nav-link text-left", activeSection === 'booking' && "text-primary")}
            >
              Book a Chat
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className={cn("nav-link text-left", activeSection === 'contact' && "text-primary")}
            >
              Contact
            </button>
            <button 
              onClick={handleResumeDownload}
              className="nav-link text-left flex items-center gap-1"
            >
              Resume <Download className="h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>
      <div className="pt-16">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <LinkedInPosts />
        <Blogs />
        <BookingForm />
        <Contact />
      </div>
      <footer className="py-6 px-6 border-t border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            © 2025 Kevin Jojo. All rights reserved
          </div>
          <IPTracker />
        </div>
      </footer>
    </div>
  );
};

export default Index;
