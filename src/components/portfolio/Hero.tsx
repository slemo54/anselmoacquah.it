"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { Atmosphere } from "@/content/catalog";
import { SiteIdentity } from "@/content/site";
import { Icons } from "@/components/icons";
import { useLocale } from "@/components/portfolio/LocaleProvider";

export function Hero() {
  const { copy } = useLocale();

  return (
    <section className="hero" id="home">
      <div className="particle-field" aria-hidden="true">
        {Atmosphere.particles().map((particle) => (
          <i
            key={`${particle.x}-${particle.y}-${particle.color}`}
            className="particle"
            style={
              {
                "--x": particle.x,
                "--y": particle.y,
                "--size": particle.size,
                "--duration": particle.duration,
                "--delay": particle.delay,
                "--color": particle.color,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="container hero-content">
        <span className="location-badge">{copy.available}</span>
        <div className="hero-stack" aria-label="Web Developer">
          <h1 className="hero-word hero-word-back">WEB</h1>
          <div className="portrait-wrap">
            <Image
              className="portrait-img"
              src={SiteIdentity.portraitSrc}
              alt={SiteIdentity.portraitAlt}
              fill
              priority
              sizes="(max-width: 620px) 230px, (max-width: 900px) 350px, 680px"
            />
          </div>
          <div className="hero-word hero-word-front" aria-hidden="true">
            {copy.heroBack}
          </div>
        </div>
        <div className="hero-bottom">
          <div>
            <p className="hero-subtitle gradient-text">{copy.specialist}</p>
            <p className="hero-intro">{copy.heroIntro}</p>
          </div>
          <div className="cta-row">
            <a className="btn btn-primary" href="#projects">
              <span>{copy.viewProjects}</span>
              {Icons.arrowUpRight({ className: "btn-icon" })}
            </a>
            <a className="btn" href="#contact">
              <span>{copy.getInTouch}</span>
              {Icons.arrowRight({ className: "btn-icon" })}
            </a>
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#about">
        <span>{copy.scroll}</span>
        {Icons.chevronDown()}
      </a>
    </section>
  );
}
