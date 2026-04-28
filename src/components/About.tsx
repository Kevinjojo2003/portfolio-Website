import { Education } from "./About/Education";
import { Experience } from "./About/Experience";
import { Responsibilities } from "./About/Responsibilities";
import { Certifications } from "./About/Certifications";
import { Publications } from "./About/Publications";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

export const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center"
          {...fadeUp}
        >
          {t("about.title")}
        </motion.h2>

        {/* IEEE Publication callout - prominent at top */}
        <div className="mb-10">
          <Publications variant="callout" />
        </div>

        <motion.div className="grid md:grid-cols-2 gap-6 mb-6" {...fadeUp}>
          <Education />
          <Experience />
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-6" {...fadeUp}>
          <Responsibilities />
          <Certifications />
        </motion.div>
      </div>
    </section>
  );
};
