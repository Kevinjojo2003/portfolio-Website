import { LineChart, Microscope, Brain, Eye, Cat, FileText, ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
  const { t } = useTranslation();

  const projects = [
    {
      title: t("projects.medical.title"),
      narrate: "medical",
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
      narrate: "semp",
      problem: t("projects.semp.problem"),
      solution: t("projects.semp.solution"),
      metric: t("projects.semp.metric"),
      tech: ["ARIMA", "LSTM", "CNN-RNN", "Sentiment"],
      liveUrl: "https://stock-sentiment-predictor.streamlit.app/",
      githubUrl: "https://github.com/kevinjojo/stock-predictor",
      icon: <LineChart className="w-5 h-5" />,
      ieeePublished: true,
    },
    {
      title: t("projects.object.title"),
      narrate: "object",
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
      narrate: "classification",
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
      narrate: "news",
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
      narrate: "asd",
      problem: t("projects.asd.problem"),
      solution: t("projects.asd.solution"),
      metric: t("projects.asd.metric"),
      tech: ["Scikit-learn", "Pandas", "Healthcare"],
      liveUrl: "https://asd-ml-exploration.streamlit.app/",
      githubUrl: "https://github.com/kevinjojo/asd-ml-exploration",
      icon: <Microscope className="w-5 h-5" />,
    },
  ];

  const featured = projects.slice(0, 2);
  const rest = projects.slice(2);

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <p className="eyebrow section-eyebrow mb-3">{t("projects.eyebrow")}</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight heading-gradient">
            {t("projects.title")}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">{t("projects.description")}</p>
        </motion.div>

        {/* Featured: the two strongest projects as large case-study cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {featured.map((p, i) => (
            <ProjectCard key={p.title} {...p} index={i} featured />
          ))}
        </div>

        {/* The rest as a compact list */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
        >
          {t("projects.more")}
        </motion.p>
        <ul className="surface-card divide-y divide-white/[0.06] overflow-hidden">
          {rest.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="group grid gap-3 p-5 md:p-6 md:grid-cols-[auto_1fr_auto] md:items-center hover:bg-white/[0.02] transition-colors"
            >
              <span className="hidden md:inline-flex w-10 h-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.07] text-primary">
                {p.icon}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-semibold text-foreground">{p.title}</h3>
                  <span className="text-xs text-primary">{p.metric}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{p.solution}</p>
                <p className="mono text-[11px] text-muted-foreground/80 mt-2">{p.tech.join(" · ")}</p>
              </div>
              <div className="flex gap-4 text-sm">
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> {t("projects.demo")}
                </a>
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="w-3.5 h-3.5" /> {t("projects.code")}
                </a>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};
