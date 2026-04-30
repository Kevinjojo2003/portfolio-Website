import { Download } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { useResumeDownload } from "@/hooks/useResumeDownload";
import { useActiveSection } from "@/hooks/useActiveSection";

const NAV_ITEMS: { id: string; key: string }[] = [
  { id: "about", key: "nav.about" },
  { id: "skills", key: "nav.skills" },
  { id: "projects", key: "nav.projects" },
  { id: "blog", key: "nav.blog" },
  { id: "book", key: "nav.book" },
  { id: "contact", key: "nav.contact" },
];

const scrollToSection = (id: string, onDone?: () => void) => {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 72;
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: "smooth" });
  onDone?.();
};

export const MainNav = () => {
  const { t } = useTranslation();
  const handleResumeDownload = useResumeDownload();
  const activeSection = useActiveSection();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-150",
        "bg-background/70 backdrop-blur-xl",
        scrolled ? "border-b border-white/[0.06]" : "border-b border-transparent",
      )}
      aria-label="Primary"
    >
      <div className="container-narrow flex items-center justify-between h-16">
        <button
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-2 transition-transform hover:scale-[1.04]"
          aria-label="Home"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground text-xs font-bold">
            KJ
          </span>
        </button>

        <div className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "relative text-sm transition-colors duration-150 font-medium py-1",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t(item.key)}
                {active && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <Button
            onClick={handleResumeDownload}
            variant="outline"
            size="sm"
            className="rounded-full border-primary/40 text-foreground hover:bg-primary/10 hover:border-primary transition-transform hover:scale-[1.04]"
          >
            <Download className="w-4 h-4 mr-1.5" />
            {t("nav.resume")}
          </Button>

          <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card border-l border-white/[0.06] w-[280px] p-6">
              <div className="flex flex-col gap-1 mt-8">
                {NAV_ITEMS.map((item) => {
                  const active = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id, () => setDrawerOpen(false))}
                      className={cn(
                        "text-left py-3 px-3 rounded-md text-base font-medium transition-colors duration-150",
                        active
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                      )}
                    >
                      {t(item.key)}
                    </button>
                  );
                })}
                <div className="mt-6 pt-6 border-t border-white/[0.06]">
                  <LanguageSwitcher />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
