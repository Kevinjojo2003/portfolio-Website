import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SectionWrapper } from "./SectionWrapper";

interface Post {
  title: string;
  summary: string;
  url: string;
}

export const LinkedInPosts = () => {
  const { t } = useTranslation();

  const posts: Post[] = [
    {
      title: t("thinking.post1.title"),
      summary: t("thinking.post1.summary"),
      url: "https://www.linkedin.com/in/kevinjojo/recent-activity/all/",
    },
    {
      title: t("thinking.post2.title"),
      summary: t("thinking.post2.summary"),
      url: "https://www.linkedin.com/in/kevinjojo/recent-activity/all/",
    },
    {
      title: t("thinking.post3.title"),
      summary: t("thinking.post3.summary"),
      url: "https://www.linkedin.com/in/kevinjojo/recent-activity/all/",
    },
  ];

  return (
    <SectionWrapper
      id="thinking"
      eyebrow={t("thinking.eyebrow")}
      title={t("thinking.title")}
    >
      <div className="grid md:grid-cols-3 gap-4">
        {posts.map((p, i) => (
          <a
            key={i}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="surface-card-hover p-5 group flex flex-col"
          >
            <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {p.title}
            </h3>
            <p className="text-sm text-muted-foreground flex-1">{p.summary}</p>
            <span className="mt-4 text-xs text-primary inline-flex items-center gap-1">
              {t("thinking.readOn")} <ExternalLink className="w-3 h-3" />
            </span>
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
};
