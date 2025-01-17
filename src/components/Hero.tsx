import { Button } from "@/components/ui/button";
import { ArrowDown, Mail, Github, Linkedin, MapPin } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center p-6 relative">
      <div className="space-y-6 max-w-4xl animate-fade-up">
        <h1 className="text-4xl md:text-6xl font-bold gradient-text">
          Kevin Jojo
        </h1>
        <h2 className="text-2xl md:text-3xl text-muted-foreground">
          AI Engineer & Full Stack Developer
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Final year Engineering student specializing in Artificial Intelligence and Machine Learning,
          with expertise in Python, data analysis, and intelligent systems development.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="outline" size="lg" className="gap-2">
                <Mail className="w-4 h-4" />
                kevinjojo003@gmail.com
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-fit">
              Click to copy email
            </HoverCardContent>
          </HoverCard>

          <Button variant="outline" size="lg" asChild className="gap-2">
            <a href="https://linkedin.com/in/kevinjojo" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </Button>

          <Button variant="outline" size="lg" asChild className="gap-2">
            <a href="https://github.com/Kevinjojo2003" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </Button>

          <Button variant="outline" size="lg" className="gap-2">
            <MapPin className="w-4 h-4" />
            Cochin, Kerala
          </Button>
        </div>

        <Button
          onClick={scrollToProjects}
          className="mt-8"
          size="lg"
        >
          View My Work <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};