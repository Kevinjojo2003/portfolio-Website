import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Award, BadgeCheck } from "lucide-react";

const ISSUER_META: Record<string, { color: string; initials: string }> = {
  Google: { color: "#4285F4", initials: "G" },
  IBM: { color: "#1F70C1", initials: "IBM" },
  Coursera: { color: "#6366F1", initials: "C" },
  "U. Michigan": { color: "#FFCB05", initials: "UM" },
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
    <section id="certifications" className="py-20 md:py-24 border-t border-white/[0.06]">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-10 flex items-end justify-between gap-4 flex-wrap"
        >
          <div>
            <p className="eyebrow mb-3">{t("certifications.eyebrow")}</p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight heading-gradient">
              Certifications
            </h2>
          </div>
          <span className="text-[11px] mono uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5">
            <BadgeCheck className="w-3.5 h-3.5 text-primary" />
            {certs.length} verified
          </span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certs.map((c, i) => {
            const meta = ISSUER_META[c.org] ?? { color: "#6366F1", initials: c.org[0] };
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="surface-card-hover p-5 group relative overflow-hidden"
              >
                {/* Subtle accent strip */}
                <div
                  className="absolute inset-x-0 top-0 h-px opacity-60"
                  style={{ background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)` }}
                />

                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-semibold border border-white/[0.06]"
                    style={{
                      background: `${meta.color}14`,
                      color: meta.color,
                    }}
                  >
                    {meta.initials}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BadgeCheck
                      className="w-4 h-4"
                      style={{ color: meta.color }}
                      aria-label="Verified"
                    />
                    <span className="text-[10px] mono uppercase tracking-wider text-muted-foreground">
                      {c.date}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] mono uppercase tracking-wider mb-1.5" style={{ color: meta.color }}>
                  {c.org}
                </div>
                <h3 className="text-sm font-medium text-foreground leading-snug mb-4">
                  {c.name}
                </h3>

                <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[10px] mono uppercase tracking-wider text-muted-foreground">
                    <Award className="w-3 h-3" />
                    Certificate
                  </span>
                  <span
                    className="text-[10px] mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: meta.color }}
                  >
                    Verified ✓
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
