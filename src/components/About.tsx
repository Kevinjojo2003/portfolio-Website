import { Education } from "./About/Education";
import { Experience } from "./About/Experience";
import { Responsibilities } from "./About/Responsibilities";
import { Certifications } from "./About/Certifications";
import { Publications } from "./About/Publications";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

export const About = () => {
  const { t } = useTranslation();
  const [educationRef, educationInView] = useInView({ 
    threshold: 0.2,
    triggerOnce: true,
    delay: 100
  });
  const [experienceRef, experienceInView] = useInView({ 
    threshold: 0.2,
    triggerOnce: true,
    delay: 200
  });
  const [responsibilitiesRef, responsibilitiesInView] = useInView({ 
    threshold: 0.2,
    triggerOnce: true,
    delay: 300
  });
  const [certificationsRef, certificationsInView] = useInView({ 
    threshold: 0.2,
    triggerOnce: true,
    delay: 400
  });
  const [publicationsRef, publicationsInView] = useInView({ 
    threshold: 0.2,
    triggerOnce: true,
    delay: 500
  });

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center animate-fade-up">
          {t('about.title')}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div 
            ref={educationRef}
            className={`transform transition-all duration-1000 ${
              educationInView ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}
          >
            <Education />
          </div>
          <div 
            ref={experienceRef}
            className={`transform transition-all duration-1000 delay-200 ${
              experienceInView ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}
          >
            <Experience />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div 
            ref={responsibilitiesRef}
            className={`transform transition-all duration-1000 ${
              responsibilitiesInView ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}
          >
            <Responsibilities />
          </div>
          <div 
            ref={certificationsRef}
            className={`transform transition-all duration-1000 delay-200 ${
              certificationsInView ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}
          >
            <Certifications />
          </div>
        </div>

        <div 
          ref={publicationsRef}
          className={`transform transition-all duration-1000 ${
            publicationsInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <Publications />
        </div>
      </div>
    </section>
  );
};