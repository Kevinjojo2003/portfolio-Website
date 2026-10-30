import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import posts from "@/data/linkedin-posts.json";

interface Post {
  urn: string;
  /** Short headline for the card. Leave empty to show a generic "LinkedIn post" label. */
  title?: string;
  embedHeight: number;
  publishedAt?: number;
}

// The scheduled LinkedIn sync updates this data file, newest first.
const POSTS = posts as Post[];

const postUrl = (urn: string) => `https://www.linkedin.com/feed/update/${urn}/`;
const embedUrl = (urn: string) => `https://www.linkedin.com/embed/feed/update/${urn}`;

/** LinkedIn activity ids carry their creation time (ms since epoch) in the top 41 bits. */
const postDate = (post: Post, locale: string) => {
  if (post.publishedAt) {
    return new Date(post.publishedAt).toLocaleDateString(locale, { month: "short", year: "numeric" });
  }
  const urn = post.urn;
  const id = BigInt(urn.split(":").pop() ?? "0");
  const date = new Date(Number(id >> 22n));
  return date.toLocaleDateString(locale, { month: "short", year: "numeric" });
};

const PostCard = ({ post, featured }: { post: Post; featured: boolean }) => {
  const { t, i18n } = useTranslation();

  return (
    <motion.article
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "surface-card-hover relative overflow-hidden p-6 md:p-7 flex flex-col min-h-[250px]",
      )}
    >
      {featured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 -right-20 w-72 h-72 rounded-full blur-3xl opacity-40"
          style={{ background: "hsl(var(--primary) / 0.35)" }}
        />
      )}

      <div className="flex items-center justify-between gap-3 mb-5">
        <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-[#0A66C2]/15 border border-[#0A66C2]/30 text-[#70B5F9]">
          <Linkedin className="w-4 h-4" />
        </span>
        <span className="text-xs mono text-muted-foreground">{postDate(post, i18n.language)}</span>
      </div>

      {featured && <p className="eyebrow mb-2">{t("linkedin.featured")}</p>}
      <h3
        className={cn(
          "font-semibold text-foreground tracking-tight leading-snug",
          featured ? "text-xl md:text-2xl" : "text-base",
        )}
      >
        {post.title || t("linkedin.untitled")}
      </h3>

      <div className="pt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <a
          href={postUrl(post.urn)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-primary hover:text-primary/80 transition-colors"
        >
          {t("linkedin.open")} <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      <div className="mt-5 w-full overflow-hidden rounded-xl border border-white/[0.07] bg-white">
        <iframe
          src={embedUrl(post.urn)}
          height={post.embedHeight}
          width="100%"
          className="mx-auto block w-full"
          style={{ maxWidth: 540, border: 0 }}
          title={post.title || t("linkedin.untitled")}
          loading="lazy"
          allowFullScreen
        />
      </div>
    </motion.article>
  );
};

export const LinkedInPosts = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const showPost = (index: number) => {
    setActiveIndex((index + POSTS.length) % POSTS.length);
  };

  return (
    <section id="blog" className="py-20 md:py-28">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="eyebrow section-eyebrow mb-3">{t("linkedin.eyebrow")}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight heading-gradient">
              {t("linkedin.title")}
            </h2>
          </div>
          <a
            href="https://www.linkedin.com/in/kevinjojo/recent-activity/all/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {t("linkedin.all")} <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

        <div
          className="mx-auto max-w-3xl"
          role="region"
          aria-roledescription="carousel"
          aria-label={t("linkedin.title")}
        >
          <AnimatePresence mode="wait" initial={false}>
            <PostCard
              key={POSTS[activeIndex].urn}
              post={POSTS[activeIndex]}
              featured={activeIndex === 0}
            />
          </AnimatePresence>
          <div className="mt-4 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => showPost(activeIndex - 1)}
              aria-label={t("linkedin.prev")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2" aria-live="polite">
              {POSTS.map((post, index) => (
                <button
                  key={post.urn}
                  type="button"
                  onClick={() => showPost(index)}
                  aria-label={`${index + 1} / ${POSTS.length}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    index === activeIndex ? "w-6 bg-primary" : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground",
                  )}
                />
              ))}
              <span className="sr-only">{activeIndex + 1} / {POSTS.length}</span>
            </div>
            <button
              type="button"
              onClick={() => showPost(activeIndex + 1)}
              aria-label={t("linkedin.next")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
