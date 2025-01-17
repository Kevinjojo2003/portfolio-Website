import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Sentiment-Enhanced Stock Market Predictor (SE-SMP)",
    description: "A platform using Streamlit for stock price prediction over a 14-day period. Integrates machine learning with sentiment analysis and computer vision CNN.",
    tech: ["Streamlit", "ARIMA", "LSTM", "CNN-RNN", "Sentiment Analysis"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Moving Object Detection Using OpenCV",
    description: "System achieving 95% accuracy in detecting moving objects, demonstrating potential for automated surveillance and traffic monitoring applications.",
    tech: ["OpenCV", "Python", "Computer Vision"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Dog vs Cat Classification using CNN",
    description: "Deep learning model achieving 98% accuracy in image classification, using Convolutional Neural Networks.",
    tech: ["CNN", "TensorFlow", "Deep Learning"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "News Weather Stock Platform",
    description: "Predictive analytics platform with LSTM models to forecast weather and stock trends, enhancing interaction by 25%.",
    tech: ["LSTM", "Streamlit", "Python"],
    liveUrl: "#",
    githubUrl: "#",
  }
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center">
          Featured Projects
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
                      Live Demo
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
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