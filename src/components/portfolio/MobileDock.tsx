"use client";

import { useEffect, useState } from "react";
import { Icons } from "@/components/icons";

const sections = [
  { id: "home", label: "Home", icon: Icons.home },
  { id: "about", label: "About", icon: Icons.compass },
  { id: "projects", label: "Projects", icon: Icons.grid },
  { id: "contact", label: "Contact", icon: Icons.chat },
] as const;

export function MobileDock() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: 0 },
    );

    sections.forEach((section) => {
      const node = document.getElementById(section.id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="mobile-dock" aria-label="Mobile navigation">
      {sections.map((section) => {
        const isActive = active === section.id;
        return (
          <a
            key={section.id}
            className={`mobile-dock-link${isActive ? " active" : ""}`}
            href={`#${section.id}`}
            data-section={section.id}
            aria-label={section.label}
            aria-current={isActive ? "page" : undefined}
          >
            {section.icon()}
          </a>
        );
      })}
    </nav>
  );
}
