import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center p-6">
      <div className="space-y-6 max-w-3xl animate-fade-up">
        <h1 className="text-4xl md:text-6xl font-bold gradient-text">
          Hi, I'm [Your Name]
        </h1>
        <h2 className="text-2xl md:text-3xl text-muted-foreground">
          Full Stack Developer
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          I create beautiful, responsive web applications with modern technologies.
          Passionate about clean code and user experience.
        </p>
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