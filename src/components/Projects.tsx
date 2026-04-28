import { LineChart, Microscope, Brain, Eye, Cat, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SectionWrapper } from "./SectionWrapper";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
  const { t } = useTranslation();

  const projects = [
    {
      title: t("projects.medical"),
      description: t("projects.medicalDesc"),
      tech: ["Langchain", "AI", "Medical Analysis"],
      liveUrl: "https://mediai.streamlit.app/",
      githubUrl: "https://github.com/Kevinjojo2003/MediAi",
      icon: <FileText className="w-6 h-6 text-primary" />,
      metric: t("projects.metric.medical"),
    },
    {
      title: t("projects.semp"),
      description: t("projects.sempDesc"),
      tech: ["ARIMA", "LSTM", "CNN-RNN", "Sentiment Analysis"],
      liveUrl: "https://stock-sentiment-predictor.streamlit.app/",
      githubUrl: "https://github.com/kevinjojo/stock-predictor",
      icon: <LineChart className="w-6 h-6 text-primary" />,
      metric: t("projects.metric.semp"),
    },
    {
      title: t("projects.object"),
      description: t("projects.objectDesc"),
      tech: ["OpenCV", "Python", "Computer Vision"],
      liveUrl: "https://object-detection-demo.streamlit.app/",
      githubUrl: "https://github.com/kevinjojo/object-detection",
      icon: <Eye className="w-6 h-6 text-primary" />,
      metric: t("projects.metric.object"),
    },
    {
      title: t("projects.classification"),
      description: t("projects.classificationDesc"),
      tech: ["CNN", "TensorFlow", "Deep Learning"],
      liveUrl: "https://dog-cat-classification.streamlit.app/",
      githubUrl: "https://github.com/kevinjojo/dog-cat-classifier",
      icon: <Cat className="w-6 h-6 text-primary" />,
      metric: t("projects.metric.classification"),
    },
    {
      title: t("projects.news"),
      description: t("projects.newsDesc"),
      tech: ["LSTM", "Streamlit", "Python"],
      liveUrl: "https://news-weather-stock.streamlit.app/",
      githubUrl: "https://github.com/kevinjojo/news-weather-stock",
      icon: <Brain className="w-6 h-6 text-primary" />,
      metric: t("projects.metric.news"),
    },
    {
      title: t("projects.asd"),
      description: t("projects.asdDesc"),
      tech: ["Machine Learning", "Data Analysis", "Healthcare"],
      liveUrl: "https://asd-ml-exploration.streamlit.app/",
      githubUrl: "https://github.com/kevinjojo/asd-ml-exploration",
      icon: <Microscope className="w-6 h-6 text-primary" />,
      metric: t("projects.metric.asd"),
    },
  ];

  return (
    <SectionWrapper id="projects" title={t("projects.title")}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} {...project} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
};
