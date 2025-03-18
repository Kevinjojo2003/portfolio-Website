
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, FilePlus, Microscope, Brain, LineChart } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Projects = () => {
  const { t } = useTranslation();

  const projects = [
    {
      title: t('projects.semp'),
      description: t('projects.sempDesc'),
      tech: ["Streamlit", "ARIMA", "LSTM", "CNN-RNN", "Sentiment Analysis"],
      liveUrl: "https://stock-sentiment-predictor.streamlit.app/",
      githubUrl: "https://github.com/kevinjojo/stock-predictor",
      icon: <LineChart className="w-8 h-8 text-primary/70" />
    },
    {
      title: t('projects.medical'),
      description: t('projects.medicalDesc'),
      tech: ["Langchain", "Medical NLP", "GPT-4", "Python"],
      liveUrl: "https://medical-report-analyzer.streamlit.app/",
      githubUrl: "https://github.com/kevinjojo/medical-report-analyzer",
      icon: <Microscope className="w-8 h-8 text-primary/70" />
    },
    {
      title: t('projects.object'),
      description: t('projects.objectDesc'),
      tech: ["OpenCV", "Python", "Computer Vision"],
      liveUrl: "https://object-detection-demo.streamlit.app/",
      githubUrl: "https://github.com/kevinjojo/object-detection",
      icon: <ExternalLink className="w-8 h-8 text-primary/70" />
    },
    {
      title: t('projects.classification'),
      description: t('projects.classificationDesc'),
      tech: ["CNN", "TensorFlow", "Deep Learning"],
      liveUrl: "https://dog-cat-classification.streamlit.app/",
      githubUrl: "https://github.com/kevinjojo/dog-cat-classifier",
      icon: <Github className="w-8 h-8 text-primary/70" />
    },
    {
      title: t('projects.news'),
      description: t('projects.newsDesc'),
      tech: ["LSTM", "Streamlit", "Python"],
      liveUrl: "https://news-weather-stock.streamlit.app/",
      githubUrl: "https://github.com/kevinjojo/news-weather-stock",
      icon: <Brain className="w-8 h-8 text-primary/70" />
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
              <CardHeader className="flex flex-row items-start space-y-0 gap-3">
                {project.icon}
                <div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </div>
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
