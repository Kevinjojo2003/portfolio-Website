import { Education } from "./About/Education";
import { Experience } from "./About/Experience";
import { Responsibilities } from "./About/Responsibilities";
import { Certifications } from "./About/Certifications";
import { useTranslation } from "react-i18next";

export const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center">
          {t('about.title')}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Education />
          <Experience />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Responsibilities />
          <Certifications />
        </div>
      </div>
    </section>
  );
};