import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const ISSUER_COLORS: Record<string, string> = {
  Google: "#4285F4",
  IBM: "#1F70C1",
  Coursera: "#6366F1",
  "U. Michigan": "#FFCB05",
};

export const Certifications = () => {
  const { t } = useTranslation();

  const certs = [
    { name: t("about.certifications.google"), org: "Google", date: "2024" },
    { name: t("about.certifications.ml"), org: "IBM", date: "2022" },
    { name: t("about.certifications.chatbot"), org: "Coursera", date: "2022" },
    { name: t("about.certifications.computational"), org: "U. Michigan", date: "2022" },
    { name: t("about.certifications.marketing"), org: "Google", date: "2021" },
  ];

  return (
    <section id="certifications" className="py-16 border-t border-white/[0.06]">
      <div className="container-narrow">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="eyebrow mb-6"
        >
          {t("certifications.eyebrow")}
        </motion.p>
        <div className="flex gap-3 overflow-x-auto scroll-soft pb-3 -mx-1 px-1 snap-x">
          {certs.map((c, i) => {
            const accent = ISSUER_COLORS[c.org] ?? "#6366F1";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="shrink-0 surface-card-hover px-4 py-3 min-w-[260px] snap-start"
                style={{ borderLeft: `2px solid ${accent}` }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] mono uppercase tracking-wider" style={{ color: accent }}>
                    {c.org}
                  </span>
                  <span className="text-[10px] mono text-muted-foreground">{c.date}</span>
                </div>
                <div className="text-sm text-foreground leading-snug">{c.name}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
