"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Icons } from "@/components/icons";
import { useLocale } from "@/components/portfolio/LocaleProvider";
import { HeroNavCopy } from "@/content/hero-nav-copy";
import { SiteIdentity } from "@/content/site";
import { MotionGuard } from "@/lib/motion-guard";

export class HeroStage {
  static readonly portrait = {
    src: SiteIdentity.portraitSrc,
    width: 1274,
    height: 1235,
  } as const;

  static playIntro(root: HTMLElement): () => void {
    if (!MotionGuard.canAnimate()) return () => undefined;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      timeline
        .from(".hero-kicker", { y: 18, duration: 0.55 }, 0)
        .from(
          ".hero-heading .hero-line",
          { yPercent: 108, duration: 0.95, stagger: 0.08 },
          0.08,
        )
        .from(
          ".hero-portrait",
          { y: 36, scale: 1.05, duration: 1.15, transformOrigin: "50% 80%" },
          0,
        )
        .from(
          ".hero-lede, .hero-meta, .hero-actions",
          { y: 20, duration: 0.7, stagger: 0.07 },
          0.32,
        );
    }, root);

    return () => ctx.revert();
  }
}

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const copy = HeroNavCopy.of(locale);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return HeroStage.playIntro(root);
  }, []);

  return (
    <section
      ref={rootRef}
      className="hero-stage"
      id="home"
      aria-labelledby="hero-heading"
    >
      <div className="hero-wash" aria-hidden="true" />
      <div className="hero-grid page-shell">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span className="nav-available-dot" aria-hidden="true" />
            {copy.available}
          </p>
          <h1 id="hero-heading" className="hero-heading">
            <span className="hero-line-mask">
              <span className="hero-line">{copy.headlineLine1}</span>
            </span>
            <span className="hero-line-mask">
              <span className="hero-line">
                {copy.headlineLine2}
                <span className="hero-dot">.</span>
              </span>
            </span>
          </h1>
          <p className="hero-lede">{copy.lede}</p>
          <p className="hero-meta">
            <span>{copy.role}</span>
            <span aria-hidden="true">·</span>
            <span>{copy.location}</span>
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              {copy.viewWork} {Icons.arrowUpRight()}
            </a>
            <a className="button button-secondary" href="#contact">
              {copy.getInTouch}
            </a>
          </div>
        </div>

        <figure className="hero-portrait-frame">
          <div className="hero-portrait-glow" aria-hidden="true" />
          <Image
            className="hero-portrait"
            src={HeroStage.portrait.src}
            alt={copy.portraitAlt}
            width={HeroStage.portrait.width}
            height={HeroStage.portrait.height}
            priority
            fetchPriority="high"
            sizes="(max-width: 720px) 78vw, min(42vw, 560px)"
          />
        </figure>
      </div>
    </section>
  );
}
