import { Experience } from "./About/Experience";
import { useTranslation } from "react-i18next";
import { SectionWrapper } from "./SectionWrapper";

export const About = () => {
  const { t } = useTranslation();

  return (
    <SectionWrapper
      id="about"
      eyebrow={t("about.eyebrow")}
      title={t("about.title")}
      description={t("about.description")}
    >
      <Experience />
    </SectionWrapper>
  );
};
