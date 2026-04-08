import { lazy, Suspense, useState } from "react";
import { MainNav } from "@/components/Navigation/MainNav";
import { useTranslation } from "react-i18next";
import { OpeningAnimation } from "@/components/OpeningAnimation";
import { SEOHead } from "@/components/SEOHead";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useResumeDownload } from "@/hooks/useResumeDownload";
import { Hero } from "@/components/Hero";

const About = lazy(() => import("@/components/About").then(m => ({ default: m.About })));
const Skills = lazy(() => import("@/components/Skills").then(m => ({ default: m.Skills })));
const Projects = lazy(() => import("@/components/Projects").then(m => ({ default: m.Projects })));
const LinkedInPosts = lazy(() => import("@/components/LinkedInPosts").then(m => ({ default: m.LinkedInPosts })));
const Blogs = lazy(() => import("@/components/Blogs").then(m => ({ default: m.Blogs })));
const BookingForm = lazy(() => import("@/components/BookingForm").then(m => ({ default: m.BookingForm })));
const Contact = lazy(() => import("@/components/Contact").then(m => ({ default: m.Contact })));

const SectionFallback = () => (
  <div className="py-20 flex justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const activeSection = useActiveSection();
  const handleResumeDownload = useResumeDownload();
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <SEOHead />
      {!showContent && <OpeningAnimation onComplete={() => setShowContent(true)} />}
      <div className={`min-h-screen bg-background transition-colors duration-300 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <MainNav 
          activeSection={activeSection}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          scrollToSection={scrollToSection}
          handleResumeDownload={handleResumeDownload}
        />
        <div className="pt-16">
          <Hero />
          <Suspense fallback={<SectionFallback />}><About /></Suspense>
          <Suspense fallback={<SectionFallback />}><Skills /></Suspense>
          <Suspense fallback={<SectionFallback />}><Projects /></Suspense>
          <Suspense fallback={<SectionFallback />}><LinkedInPosts /></Suspense>
          <Suspense fallback={<SectionFallback />}><Blogs /></Suspense>
          <Suspense fallback={<SectionFallback />}><BookingForm /></Suspense>
          <Suspense fallback={<SectionFallback />}><Contact /></Suspense>
        </div>
        <footer className="py-6 px-6 border-t border-border/40 bg-background/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {t('footer.copyright')}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
