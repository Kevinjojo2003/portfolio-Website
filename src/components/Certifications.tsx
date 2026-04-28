import { useTranslation } from "react-i18next";

export const Certifications = () => {
  const { t } = useTranslation();

  const certs = [
    { name: t("about.certifications.google"), org: "Google", date: "2024", color: "#4285F4" },
    { name: t("about.certifications.ml"), org: "IBM", date: "2022", color: "#1F70C1" },
    { name: t("about.certifications.chatbot"), org: "Coursera", date: "2022", color: "#0056D2" },
    { name: t("about.certifications.computational"), org: "U. Michigan", date: "2022", color: "#FFCB05" },
    { name: t("about.certifications.marketing"), org: "Google", date: "2021", color: "#34A853" },
  ];

  return (
    <section id="certifications" className="py-12 border-t border-white/[0.06]">
      <div className="container-narrow">
        <p className="eyebrow mb-4 text-center md:text-left">{t("certifications.eyebrow")}</p>
        <div className="flex gap-2 overflow-x-auto scroll-soft pb-2 -mx-1 px-1">
          {certs.map((c, i) => (
            <div
              key={i}
              className="shrink-0 surface-card px-3.5 py-2 flex items-center gap-2.5"
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: c.color }}
                aria-hidden="true"
              />
              <span className="text-xs text-foreground whitespace-nowrap">{c.name}</span>
              <span className="text-[10px] mono text-muted-foreground whitespace-nowrap">
                {c.org} · {c.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
