import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const POSTS = [
  "https://www.linkedin.com/embed/feed/update/urn:li:share:7185000000000000000",
  "https://www.linkedin.com/embed/feed/update/urn:li:share:7186000000000000000",
  "https://www.linkedin.com/embed/feed/update/urn:li:share:7187000000000000000",
];

export const LinkedInPosts = () => {
  const { t } = useTranslation();
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + POSTS.length) % POSTS.length);
  const next = () => setIdx((i) => (i + 1) % POSTS.length);

  return (
    <section id="linkedin" className="py-20 md:py-28">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="eyebrow mb-3">{t("linkedin.eyebrow")}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight heading-gradient">
              {t("linkedin.title")}
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label={t("linkedin.prev")}
              className="w-10 h-10 rounded-full surface-card-hover flex items-center justify-center text-muted-foreground hover:text-primary"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              aria-label={t("linkedin.next")}
              className="w-10 h-10 rounded-full surface-card-hover flex items-center justify-center text-muted-foreground hover:text-primary"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="surface-card overflow-hidden mx-auto max-w-2xl"
        >
          <iframe
            src={POSTS[idx]}
            height="540"
            width="100%"
            frameBorder="0"
            allowFullScreen
            title={`LinkedIn post ${idx + 1}`}
            loading="lazy"
            className="block"
          />
        </motion.div>

        <div className="flex justify-center gap-2 mt-6">
          {POSTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to post ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-150",
                i === idx ? "w-6 bg-primary" : "w-1.5 bg-white/20 hover:bg-white/40",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
