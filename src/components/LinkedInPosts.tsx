import { ExternalLink, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface Post {
  title: string;
  summary: string;
  url: string;
}

// Featured embedded post (shown first as an iframe)
const FEATURED_EMBED_SRC =
  "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7306983829930393600?collapsed=1";
const FEATURED_URL =
  "https://www.linkedin.com/feed/update/urn:li:ugcPost:7306983829930393600/";

// Other posts (different from the featured one)
const POST_URLS = [
  "https://www.linkedin.com/feed/update/urn:li:share:7202518006206193664/",
  "https://www.linkedin.com/feed/update/urn:li:share:7180596647016501250/",
  "https://www.linkedin.com/feed/update/urn:li:ugcPost:7176867683731218432/",
  "https://www.linkedin.com/feed/update/urn:li:share:7163570252876800000/",
  "https://www.linkedin.com/feed/update/urn:li:share:6965137549036003329/",
];

export const LinkedInPosts = () => {
  const { t } = useTranslation();

  const posts: Post[] = [
    {
      title: t("linkedin.post1.title"),
      summary: t("linkedin.post1.summary"),
      url: POST_URLS[0],
    },
    {
      title: t("linkedin.post2.title"),
      summary: t("linkedin.post2.summary"),
      url: POST_URLS[1],
    },
    {
      title: t("linkedin.post3.title"),
      summary: t("linkedin.post3.summary"),
      url: POST_URLS[2],
    },
  ];

  return (
    <section id="linkedin" className="py-20 md:py-28">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <p className="eyebrow mb-3">{t("linkedin.eyebrow")}</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight heading-gradient">
            {t("linkedin.title")}
          </h2>
        </motion.div>

        {/* Featured embedded post */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="surface-card p-2 md:p-3 mb-6 overflow-hidden"
        >
          <div className="flex items-center justify-between px-3 py-2 mb-2">
            <div className="flex items-center gap-2 text-primary">
              <Linkedin className="w-4 h-4" />
              <span className="text-[11px] mono uppercase tracking-wider text-muted-foreground">
                Featured Post
              </span>
            </div>
            <a
              href={FEATURED_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary inline-flex items-center gap-1 hover:underline"
            >
              Open <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="w-full flex justify-center bg-white/[0.02] rounded-lg overflow-hidden">
            <iframe
              src={FEATURED_EMBED_SRC}
              height={520}
              width="100%"
              style={{ maxWidth: 540, border: 0 }}
              allowFullScreen
              title="Embedded LinkedIn post"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Other posts grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {posts.map((p, i) => (
            <motion.a
              key={i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="surface-card-hover p-6 group flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-primary">
                  <Linkedin className="w-4 h-4" />
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground flex-1">{p.summary}</p>
              <span className="mt-4 text-xs text-primary inline-flex items-center gap-1">
                {t("linkedin.readOn")}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
