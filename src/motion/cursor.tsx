"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionLanguage } from "./language";
import { ensureMotionPlugins } from "./runtime";
import { MotionTokens } from "./tokens";

const TARGET_SELECTOR = "a, button, [role='button'], [data-cursor-target], [data-magnetic]";

export function MotionCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!root || !ring || !label) return;

    ensureMotionPlugins();

    const xTo = gsap.quickTo(root, "x", {
      duration: MotionTokens.duration.cursor,
      ease: MotionTokens.ease.cinematic,
    });
    const yTo = gsap.quickTo(root, "y", {
      duration: MotionTokens.duration.cursor,
      ease: MotionTokens.ease.cinematic,
    });
    const scaleTo = gsap.quickTo(ring, "scale", {
      duration: MotionTokens.duration.hover,
      ease: MotionTokens.ease.spring,
    });

    let hidden = false;

    const hide = () => {
      hidden = true;
      root.dataset.visible = "false";
      document.documentElement.dataset.motionCursor = "off";
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        hide();
        return;
      }
      if (hidden) return;
      root.dataset.visible = "true";
      xTo(event.clientX);
      yTo(event.clientY);
    };

    const onOver = (event: PointerEvent) => {
      if (hidden) return;
      const target = (event.target as Element | null)?.closest(TARGET_SELECTOR);
      if (!target) return;
      const text = target.getAttribute("data-cursor-label");
      if (text) {
        label.textContent = text;
        root.dataset.active = "label";
        gsap.fromTo(label, MotionLanguage.labelMorph.from, {
          ...MotionLanguage.labelMorph.to,
          duration: MotionTokens.duration.hover,
          ease: MotionTokens.ease.spring,
        });
        scaleTo(1);
        return;
      }
      root.dataset.active = "hover";
      scaleTo(1.6);
    };

    const onOut = (event: PointerEvent) => {
      if (hidden) return;
      const target = (event.target as Element | null)?.closest(TARGET_SELECTOR);
      if (!target) return;
      const next = event.relatedTarget as Element | null;
      if (next?.closest(TARGET_SELECTOR) === target) return;
      root.dataset.active = "";
      label.textContent = "";
      scaleTo(1);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  }, []);

  return (
    <div ref={rootRef} className="motion-cursor" aria-hidden="true" data-visible="false">
      <span ref={ringRef} className="motion-cursor-ring" />
      <span className="motion-cursor-dot" />
      <span ref={labelRef} className="motion-cursor-label" />
    </div>
  );
}
