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
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
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
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] dark:bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold gradient-text">KJ</span>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
            <button onClick={() => scrollToSection('skills')} className="nav-link">Skills</button>
            <button onClick={() => scrollToSection('projects')} className="nav-link">Projects</button>
            <button onClick={() => scrollToSection('blogs')} className="nav-link">Blogs</button>
            <button onClick={() => scrollToSection('booking')} className="nav-link">Book a Chat</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
            <a 
              href="https://drive.google.com/file/d/1FbcJTU8HlAYkABnixfUynwya2euTFxAM/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              Resume
            </a>
          </div>
        </div>

        {/* Mobile navigation menu */}
        <div
          className={cn(
            "md:hidden absolute w-full bg-background/95 backdrop-blur-sm border-b border-border/40 transition-all duration-300 ease-in-out",
            isMobileMenuOpen ? "max-h-[400px] py-4" : "max-h-0 overflow-hidden"
          )}
        >
          <div className="flex flex-col space-y-4 px-6">
            <button onClick={() => scrollToSection('about')} className="nav-link text-left">About</button>
            <button onClick={() => scrollToSection('skills')} className="nav-link text-left">Skills</button>
            <button onClick={() => scrollToSection('projects')} className="nav-link text-left">Projects</button>
            <button onClick={() => scrollToSection('blogs')} className="nav-link text-left">Blogs</button>
            <button onClick={() => scrollToSection('booking')} className="nav-link text-left">Book a Chat</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link text-left">Contact</button>
            <a 
              href="https://drive.google.com/file/d/1FbcJTU8HlAYkABnixfUynwya2euTFxAM/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link text-left"
            >
              Resume
            </a>
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