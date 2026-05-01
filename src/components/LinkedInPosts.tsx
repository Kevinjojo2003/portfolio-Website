import { ExternalLink, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface FeaturedPost {
  embedSrc: string;
  url: string;
  height: number;
}

// Featured embedded post (shown first as an iframe)
const FEATURED_EMBED_SRC =
  "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7306983829930393600?collapsed=1";
const FEATURED_URL =
  "https://www.linkedin.com/feed/update/urn:li:ugcPost:7306983829930393600/";

// Three additional embedded posts
const EMBEDDED_POSTS: FeaturedPost[] = [
  {
    embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7176867683731218432",
    url: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7176867683731218432/",
    height: 671,
  },
  {
    embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7163570252876800000",
    url: "https://www.linkedin.com/feed/update/urn:li:share:7163570252876800000/",
    height: 704,
  },
  {
    embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:6965137549036003329",
    url: "https://www.linkedin.com/feed/update/urn:li:share:6965137549036003329/",
    height: 858,
  },
];

export const LinkedInPosts = () => {
  const { t } = useTranslation();

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

        {/* Other embedded posts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EMBEDDED_POSTS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="surface-card p-2 md:p-3 group flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between px-2 py-1.5 mb-2">
                <div className="flex items-center gap-2 text-primary">
                  <Linkedin className="w-4 h-4" />
                  <span className="text-[10px] mono uppercase tracking-wider text-muted-foreground">
                    Post {i + 1}
                  </span>
                </div>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1 transition-colors"
                >
                  Open <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="w-full bg-white/[0.02] rounded-lg overflow-hidden flex justify-center">
                <iframe
                  src={p.embedSrc}
                  height={p.height}
                  width="100%"
                  style={{ maxWidth: 504, border: 0 }}
                  allowFullScreen
                  title={`Embedded LinkedIn post ${i + 1}`}
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>
        <p className="sr-only">{t("linkedin.readOn")}</p>
      </div>
    </section>
  );
};
