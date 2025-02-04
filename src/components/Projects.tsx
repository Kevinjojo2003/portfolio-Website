import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Projects = () => {
  const { t } = useTranslation();

  const projects = [
    {
      title: t('projects.semp'),
      description: t('projects.sempDesc'),
      tech: ["Streamlit", "ARIMA", "LSTM", "CNN-RNN", "Sentiment Analysis"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: t('projects.object'),
      description: t('projects.objectDesc'),
      tech: ["OpenCV", "Python", "Computer Vision"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: t('projects.classification'),
      description: t('projects.classificationDesc'),
      tech: ["CNN", "TensorFlow", "Deep Learning"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: t('projects.news'),
      description: t('projects.newsDesc'),
      tech: ["LSTM", "Streamlit", "Python"],
      liveUrl: "#",
      githubUrl: "#",
    }
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center">
          {t('projects.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.title} className="bg-secondary/50 border-none hover:bg-secondary/60 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button asChild variant="outline" size="sm">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t('projects.liveDemo')}
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      {t('projects.viewCode')}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};