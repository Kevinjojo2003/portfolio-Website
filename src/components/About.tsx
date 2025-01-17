import { Card, CardContent } from "@/components/ui/card";

export const About = () => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center">
          About Me
        </h2>
        <Card className="bg-secondary/50 border-none">
          <CardContent className="p-6 md:p-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate developer with a strong foundation in web technologies.
              With [X] years of experience in software development, I specialize in
              creating responsive and user-friendly applications. My journey in tech
              started with [background information], and I've since worked on various
              projects that have sharpened my skills in frontend and backend development.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};