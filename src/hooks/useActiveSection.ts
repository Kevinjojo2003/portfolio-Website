import { useEffect, useState } from "react";

const SECTIONS = ["hero", "about", "skills", "projects", "blog", "book", "contact"];

const NAV_GROUP: Record<string, string> = {
  hero: "",
  about: "about",
  skills: "skills",
  projects: "projects",
  blog: "blog",
  book: "book",
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
