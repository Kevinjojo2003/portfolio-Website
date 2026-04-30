import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Check, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export const Book = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<"business" | "technical">("business");

  const business = [
    t("book.business.1"),
    t("book.business.2"),
    t("book.business.3"),
    t("book.business.4"),
  ];
  const technical = [
    t("book.technical.1"),
    t("book.technical.2"),
    t("book.technical.3"),
    t("book.technical.4"),
  ];

  const items = tab === "business" ? business : technical;

  return (
    <section id="book" className="py-20 md:py-28">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <p className="eyebrow mb-3">{t("book.eyebrow")}</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight heading-gradient">
            {t("book.title")}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">{t("book.description")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            className="surface-card p-6 md:p-7 flex flex-col"
          >
            <div className="flex gap-1 p-1 bg-white/[0.03] rounded-lg border border-white/[0.06] mb-6 self-start">
              {(["business", "technical"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className={cn(
                    "px-4 py-1.5 text-xs font-medium rounded-md transition-colors duration-150",
                    tab === k
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {k === "business" ? t("book.tab.business") : t("book.tab.technical")}
                </button>
              ))}
            </div>

            <ul className="space-y-3 flex-1">
              {items.map((it, i) => (
                <motion.li
                  key={`${tab}-${i}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.04 }}
                  className="flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </span>
                  <span className="text-sm text-foreground/90">{it}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-white/[0.06] grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Availability</div>
                  <div className="text-foreground text-xs mono">{t("book.availability")}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Duration</div>
                  <div className="text-foreground text-xs mono">{t("book.duration")}</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="surface-card overflow-hidden"
          >
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0lY7m48xnbqWrqd-rOZG1OMEszMEY3MVQ4TUpPbTRhWTRYUWVqRkNRZHc?gv=true"
              style={{ border: 0 }}
              width="100%"
              height="600"
              title="Book a consultation"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
