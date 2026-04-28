import { LineChart, Microscope, Brain, Eye, Cat, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SectionWrapper } from "./SectionWrapper";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
  const { t } = useTranslation();

  const projects = [
    {
      title: t("projects.medical.title"),
      problem: t("projects.medical.problem"),
      solution: t("projects.medical.solution"),
      metric: t("projects.medical.metric"),
      tech: ["LangChain", "Python", "Streamlit", "LLMs"],
      liveUrl: "https://mediai.streamlit.app/",
      githubUrl: "https://github.com/Kevinjojo2003/MediAi",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      title: t("projects.semp.title"),
      problem: t("projects.semp.problem"),
      solution: t("projects.semp.solution"),
      metric: t("projects.semp.metric"),
      tech: ["ARIMA", "LSTM", "CNN-RNN", "Sentiment Analysis"],
      liveUrl: "https://stock-sentiment-predictor.streamlit.app/",
      githubUrl: "https://github.com/kevinjojo/stock-predictor",
      icon: <LineChart className="w-5 h-5" />,
      ieeePublished: true,
    },
    {
      title: t("projects.object.title"),
      problem: t("projects.object.problem"),
      solution: t("projects.object.solution"),
      metric: t("projects.object.metric"),
      tech: ["OpenCV", "Python", "Computer Vision"],
      liveUrl: "https://object-detection-demo.streamlit.app/",
      githubUrl: "https://github.com/kevinjojo/object-detection",
      icon: <Eye className="w-5 h-5" />,
    },
    {
      title: t("projects.classification.title"),
      problem: t("projects.classification.problem"),
      solution: t("projects.classification.solution"),
      metric: t("projects.classification.metric"),
      tech: ["CNN", "TensorFlow", "Deep Learning"],
      liveUrl: "https://dog-cat-classification.streamlit.app/",
      githubUrl: "https://github.com/kevinjojo/dog-cat-classifier",
      icon: <Cat className="w-5 h-5" />,
    },
    {
      title: t("projects.news.title"),
      problem: t("projects.news.problem"),
      solution: t("projects.news.solution"),
      metric: t("projects.news.metric"),
      tech: ["LSTM", "Streamlit", "Python"],
      liveUrl: "https://news-weather-stock.streamlit.app/",
      githubUrl: "https://github.com/kevinjojo/news-weather-stock",
      icon: <Brain className="w-5 h-5" />,
    },
    {
      title: t("projects.asd.title"),
      problem: t("projects.asd.problem"),
      solution: t("projects.asd.solution"),
      metric: t("projects.asd.metric"),
      tech: ["Scikit-learn", "Pandas", "Healthcare"],
      liveUrl: "https://asd-ml-exploration.streamlit.app/",
      githubUrl: "https://github.com/kevinjojo/asd-ml-exploration",
      icon: <Microscope className="w-5 h-5" />,
    },
  ];

  return (
    <SectionWrapper
      id="projects"
      eyebrow={t("projects.eyebrow")}
      title={t("projects.title")}
      description={t("projects.description")}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} {...p} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
};
