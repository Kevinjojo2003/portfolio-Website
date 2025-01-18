import { Button } from "@/components/ui/button";
import { ArrowDown, Mail, Github, Linkedin, MapPin, Sun, Moon } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useTheme } from "@/components/ThemeProvider";

export const Hero = () => {
  const { theme, setTheme } = useTheme();
  
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center p-6 relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="fixed top-4 right-4 z-50"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>

      <div className="space-y-6 max-w-4xl animate-fade-up">
        <div className="glass-card p-8 hover:scale-105 transition-transform duration-300">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text font-sans mb-6">
            Kevin Jojo
          </h1>
          <h2 className="text-2xl md:text-3xl text-muted-foreground font-sans mb-4">
            AI & Machine Learning Engineer
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-sans leading-relaxed">
            I'm Kevin Jojo, a passionate AI & Machine Learning Engineer and a final-year engineering student specializing in Artificial Intelligence and Machine Learning. With a strong foundation in Python, data analysis, and intelligent systems development, I thrive on solving complex problems and driving innovation through technology.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-sans mt-4">
            Explore my journey, projects, and contributions to the world of AI and discover how I blend technical expertise with a drive to create impactful solutions. Let's shape the future together!
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 pt-4">
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
            <a href="https://linkedin.com/in/kevinjojo" target="_blank" rel="noopener noreferrer">
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
        </div>

        <Button
          onClick={scrollToProjects}
          className="mt-8 hover:scale-105 transition-transform"
          size="lg"
        >
          View My Work <ArrowDown className="ml-2 h-4 w-4 animate-bounce" />
        </Button>
      </div>
    </section>
  );
};