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
import { MainNav } from "@/components/Navigation/MainNav";
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
      <MainNav 
        activeSection={activeSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        scrollToSection={scrollToSection}
        handleResumeDownload={handleResumeDownload}
      />
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