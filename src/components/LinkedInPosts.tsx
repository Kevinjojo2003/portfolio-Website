import { useState } from "react";
import { ArrowUpRight, ChevronDown, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Post {
  urn: string;
  /** Short headline for the card. Leave empty to show a generic "LinkedIn post" label. */
  title?: string;
  embedHeight: number;
}

// Newest first. The publish date is decoded from the post id, so only the urn needs updating.
const POSTS: Post[] = [
  { urn: "urn:li:ugcPost:7306983829930393600", embedHeight: 560 },
  { urn: "urn:li:ugcPost:7176867683731218432", embedHeight: 671 },
  { urn: "urn:li:share:7163570252876800000", embedHeight: 704 },
  { urn: "urn:li:share:6965137549036003329", embedHeight: 858 },
];

const postUrl = (urn: string) => `https://www.linkedin.com/feed/update/${urn}/`;
const embedUrl = (urn: string) => `https://www.linkedin.com/embed/feed/update/${urn}`;

/** LinkedIn activity ids carry their creation time (ms since epoch) in the top 41 bits. */
const postDate = (urn: string, locale: string) => {
  const id = BigInt(urn.split(":").pop() ?? "0");
  const date = new Date(Number(id >> 22n));
  return date.toLocaleDateString(locale, { month: "short", year: "numeric" });
};

const PostCard = ({ post, featured, index }: { post: Post; featured: boolean; index: number }) => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={cn(
        "surface-card-hover p-6 md:p-7 flex flex-col",
        featured && "md:col-span-2 lg:col-span-3 relative overflow-hidden",
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
        <span className="text-xs mono text-muted-foreground">{postDate(post.urn, i18n.language)}</span>
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

      <div className="mt-auto pt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <a
          href={postUrl(post.urn)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-primary hover:text-primary/80 transition-colors"
        >
          {t("linkedin.open")} <ArrowUpRight className="w-4 h-4" />
        </a>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          {open ? t("linkedin.hidePreview") : t("linkedin.preview")}
          <ChevronDown className={cn("w-4 h-4 transition-transform", open && "rotate-180")} />
        </button>
      </div>

      {/* The embed is only loaded when the visitor asks for it. */}
      {open && (
        <div className="mt-5 rounded-xl overflow-hidden border border-white/[0.07] bg-white flex justify-center">
          <iframe
            src={embedUrl(post.urn)}
            height={post.embedHeight}
            width="100%"
            style={{ maxWidth: 540, border: 0 }}
            title={post.title || t("linkedin.untitled")}
            loading="lazy"
            allowFullScreen
          />
        </div>
      )}
    </motion.article>
  );
};

export const LinkedInPosts = () => {
  const { t } = useTranslation();

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {POSTS.map((post, i) => (
            <PostCard key={post.urn} post={post} featured={i === 0} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
