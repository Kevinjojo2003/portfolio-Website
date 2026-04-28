import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface Role {
  logo: string;
  alt: string;
  title: string;
  company: string;
  date: string;
  bullets: string[];
  current?: boolean;
}

export const Experience = () => {
  const { t } = useTranslation();

  const roles: Role[] = [
    {
      logo: "/lovable-uploads/kolo-logo.png",
      alt: "Kolo Logo",
      title: t("about.experience.promptEngineer"),
      company: t("about.experience.kolo"),
      date: t("about.experience.koloDate"),
      bullets: [t("about.experience.koloDesc1"), t("about.experience.koloDesc2")],
      current: true,
    },
    {
      logo: "/lovable-uploads/0b4ce4eb-de3c-47d7-ac69-6ca4b822ad37.png",
      alt: "Workcohol Logo",
      title: t("about.experience.aiEngineer"),
      company: t("about.experience.workcohol"),
      date: t("about.experience.workcoholDate"),
      bullets: [
        t("about.experience.workcoholDesc1"),
        t("about.experience.workcoholDesc2"),
        t("about.experience.workcoholDesc3"),
      ],
    },
    {
      logo: "/lovable-uploads/37d2ddda-c5e5-4bbc-9d1e-24fc8e8e6a0e.png",
      alt: "Bolt IoT Logo",
      title: t("about.experience.webDev"),
      company: t("about.experience.bolt"),
      date: t("about.experience.boltDate"),
      bullets: [t("about.experience.boltDesc1"), t("about.experience.boltDesc2")],
    },
    {
      logo: "/lovable-uploads/dea0126d-86ea-4f83-b953-a62129e31dd7.png",
      alt: "Younity Logo",
      title: t("about.experience.marketing"),
      company: t("about.experience.younity"),
      date: t("about.experience.younityDate"),
      bullets: [t("about.experience.younityDesc1"), t("about.experience.younityDesc2")],
    },
  ];

  return (
    <Card className="glass-card border border-border/60">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">{t("about.experience")}</h3>
        </div>

        <div className="relative">
          {/* Vertical connecting line */}
          <span
            className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent"
            aria-hidden="true"
          />

          <ol className="space-y-8">
            {roles.map((r, i) => (
              <motion.li
                key={r.company + i}
                className="relative pl-16"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                {/* Avatar circle */}
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-white p-1 ring-2 ring-primary/40 shadow-md flex items-center justify-center overflow-hidden">
                  <img src={r.logo} alt={r.alt} className="w-full h-full object-contain" />
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="font-medium">{r.title}</h4>
                  {r.current && (
                    <Badge className="bg-green-500/15 text-green-500 border border-green-500/40 hover:bg-green-500/20 gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      {t("about.experience.current")}
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">{r.company}</p>
                <p className="text-xs text-muted-foreground mb-2">{r.date}</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {r.bullets.map((b, bi) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};
