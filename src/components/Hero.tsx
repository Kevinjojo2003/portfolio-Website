import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

const trackHero = (label: string) => {
  (window as GtagWindow).gtag?.("event", "click", { event_category: "Hero", event_label: label });
};

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
};

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: EASE_OUT },
});

export const Hero = () => {
  const { t } = useTranslation();

  const proof = [`1 ${t("hero.stat.paper")}`, t("hero.stat.projects"), t("hero.stat.years")];

  return (
    <section id="hero" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      <div className="container-narrow relative grid items-center gap-12 lg:gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Copy */}
        <div className="order-2 lg:order-1">
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 mb-7"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs text-muted-foreground">{t("hero.available")}</span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.06)}
            className="text-[44px] sm:text-6xl lg:text-[76px] font-semibold tracking-[-0.035em] leading-[0.98] text-foreground"
          >
            {t("hero.name")}
          </motion.h1>

          <motion.p
            {...fadeUp(0.12)}
            className="font-display italic text-3xl sm:text-4xl lg:text-[44px] leading-tight text-primary mt-3"
          >
            {t("hero.role1")}
          </motion.p>

          <motion.p
            {...fadeUp(0.18)}
            className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground"
          >
            {t("hero.bio")}
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="mt-9 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="h-12 rounded-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.7)]"
              onClick={() => {
                trackHero("see_work");
                scrollToId("projects");
              }}
            >
              {t("hero.cta.work")} <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full px-6 bg-white/[0.03] border-white/15 hover:bg-white/[0.07] hover:border-white/25 gap-2"
              onClick={() => {
                trackHero("book_call");
                scrollToId("book");
              }}
            >
              <Calendar className="w-4 h-4" />
              {t("hero.cta.book")}
            </Button>
          </motion.div>

          <motion.ul
            {...fadeUp(0.3)}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground"
          >
            {proof.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary/70" aria-hidden="true" />
                {p}
              </li>
            ))}
            <li className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary/80" />
              Cochin, India
            </li>
          </motion.ul>
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="order-1 lg:order-2 relative mx-auto w-full max-w-[220px] sm:max-w-[300px] lg:max-w-[400px]"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-10 rounded-full blur-3xl opacity-70"
            style={{
              background:
                "radial-gradient(closest-side, hsl(var(--primary) / 0.45), hsl(var(--accent) / 0.18) 60%, transparent)",
            }}
          />
          <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
            <img
              src="/kevin-jojo.webp"
              alt="Kevin Jojo"
              width={640}
              height={640}
              className="w-full h-full object-cover object-[50%_20%]"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/70 to-transparent" />
          </div>

          {/* Floating "now" card */}
          <div className="absolute -left-4 sm:-left-8 bottom-6 surface-card px-4 py-3 shadow-xl shadow-black/40 hidden sm:block">
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Now</div>
            <div className="text-sm font-medium text-foreground mt-0.5">Prompt Engineer · Kolo</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
