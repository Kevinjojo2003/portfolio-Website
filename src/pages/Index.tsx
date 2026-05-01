import { lazy, Suspense } from "react";
import { MainNav } from "@/components/Navigation/MainNav";
import { SEOHead } from "@/components/SEOHead";
import { Hero } from "@/components/Hero";

const About = lazy(() => import("@/components/About").then((m) => ({ default: m.About })));
const Skills = lazy(() => import("@/components/Skills").then((m) => ({ default: m.Skills })));
const Projects = lazy(() => import("@/components/Projects").then((m) => ({ default: m.Projects })));
const Certifications = lazy(() =>
  import("@/components/Certifications").then((m) => ({ default: m.Certifications }))
);
const LinkedInPosts = lazy(() =>
  import("@/components/LinkedInPosts").then((m) => ({ default: m.LinkedInPosts }))
);

const Book = lazy(() => import("@/components/Book").then((m) => ({ default: m.Book })));
const Contact = lazy(() => import("@/components/Contact").then((m) => ({ default: m.Contact })));
const SiteFooter = lazy(() => import("@/components/SiteFooter").then((m) => ({ default: m.SiteFooter })));

const SectionFallback = () => (
  <div className="py-20 flex justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <>
      <SEOHead />
      <div className="min-h-screen bg-background text-foreground">
        <MainNav />
        <main>
          <Hero />
          <Suspense fallback={<SectionFallback />}><About /></Suspense>
          <Suspense fallback={<SectionFallback />}><Skills /></Suspense>
          <Suspense fallback={<SectionFallback />}><Projects /></Suspense>
          <Suspense fallback={null}><Certifications /></Suspense>
          <Suspense fallback={<SectionFallback />}><LinkedInPosts /></Suspense>
          <Suspense fallback={<SectionFallback />}><Book /></Suspense>
          <Suspense fallback={<SectionFallback />}><Contact /></Suspense>
        </main>
        <Suspense fallback={null}><SiteFooter /></Suspense>
      </div>
    </>
  );
};

export default Index;
