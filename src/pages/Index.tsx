import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { useEffect } from "react";

const Index = () => {
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

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold gradient-text">KJ</span>
          <div className="flex items-center gap-6">
            <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</a>
            <a href="#skills" className="text-sm text-muted-foreground hover:text-primary transition-colors">Skills</a>
            <a href="#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">Projects</a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </nav>
      <div className="pt-16">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </div>
  );
};

export default Index;