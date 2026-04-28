import { useEffect, useState } from "react";

const SECTIONS = ["hero", "research", "about", "skills", "projects", "thinking", "contact"];

// Maps any section id to one of the four nav buckets.
const NAV_GROUP: Record<string, string> = {
  hero: "",
  research: "research",
  about: "about",
  skills: "about",
  projects: "projects",
  thinking: "projects",
  contact: "contact",
  certifications: "contact",
};

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const probe = window.scrollY + 120;
      let current = "";
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) current = id;
      }
      setActiveSection(NAV_GROUP[current] ?? "");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return activeSection;
};
