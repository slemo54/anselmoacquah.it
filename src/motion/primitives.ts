import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";
import { assertMotionLanguage, MotionLanguage } from "./language";
import { ensureMotionPlugins } from "./runtime";
import { MotionTokens } from "./tokens";

export type MagneticOptions = {
  strength?: number;
};

export type SpringHoverOptions = {
  scale?: number;
};

export type StaggerKind = "items" | "words" | "lines" | "chars";

export type StaggerOptions = {
  kind?: StaggerKind;
  selector?: string;
};

export type ScrollLinkedKind = "parallax" | "clip" | "progress";

export type ScrollLinkedOptions = {
  kind?: ScrollLinkedKind;
  speed?: number;
};

export type MorphKind = "inset" | "radius" | "clip";

export type MorphOptions = {
  kind?: MorphKind;
};

function hintGpu(element: Element): void {
  (element as HTMLElement).style.willChange = "transform";
}

function clearGpu(element: Element): void {
  (element as HTMLElement).style.willChange = "auto";
}

function numberAttr(value: string | undefined, fallback: number): number {
  if (value === undefined || value === "") return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/** Blessed tween wrappers that refuse opacity-fade-as-whole language. */
export class Motion {
  static to(target: gsap.TweenTarget, vars: gsap.TweenVars): gsap.core.Tween {
    ensureMotionPlugins();
    assertMotionLanguage(vars, "Motion.to");
    return gsap.to(target, vars);
  }

  static fromTo(
    target: gsap.TweenTarget,
    from: gsap.TweenVars,
    to: gsap.TweenVars,
  ): gsap.core.Tween {
    ensureMotionPlugins();
    assertMotionLanguage(from, "Motion.fromTo.from");
    assertMotionLanguage(to, "Motion.fromTo.to");
    return gsap.fromTo(target, from, to);
  }

  static set(target: gsap.TweenTarget, vars: gsap.TweenVars): gsap.core.Tween {
    ensureMotionPlugins();
    return gsap.set(target, vars);
  }
}

export class Magnetic {
  static attach(element: HTMLElement, options: MagneticOptions = {}): () => void {
    ensureMotionPlugins();
    const strength = options.strength ?? MotionTokens.magneticStrength;
    const xTo = gsap.quickTo(element, "x", {
      duration: MotionTokens.duration.magnetic,
      ease: MotionTokens.ease.cinematic,
    });
    const yTo = gsap.quickTo(element, "y", {
      duration: MotionTokens.duration.magnetic,
      ease: MotionTokens.ease.cinematic,
    });

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      xTo((event.clientX - rect.left - rect.width / 2) * strength);
      yTo((event.clientY - rect.top - rect.height / 2) * strength);
    };

    const onEnter = () => hintGpu(element);

    const onLeave = () => {
      xTo(0);
      yTo(0);
      window.setTimeout(() => clearGpu(element), MotionTokens.duration.magnetic * 1000);
    };

    element.addEventListener("pointerenter", onEnter);
    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", onLeave);

    return () => {
      element.removeEventListener("pointerenter", onEnter);
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
      gsap.set(element, { x: 0, y: 0, clearProps: "willChange" });
    };
  }
}

export class Spring {
  static to(target: gsap.TweenTarget, vars: gsap.TweenVars): gsap.core.Tween {
    return Motion.to(target, { ...MotionLanguage.springVars(), ...vars });
  }

  static attachHover(element: HTMLElement, options: SpringHoverOptions = {}): () => void {
    ensureMotionPlugins();
    const scale = options.scale ?? MotionTokens.springHoverScale;
    const scaleTo = gsap.quickTo(element, "scale", {
      duration: MotionTokens.duration.spring,
      ease: MotionTokens.ease.spring,
    });

    const onEnter = () => {
      hintGpu(element);
      scaleTo(scale);
    };

    const onLeave = () => {
      scaleTo(1);
      window.setTimeout(() => clearGpu(element), MotionTokens.duration.spring * 1000);
    };

    element.addEventListener("pointerenter", onEnter);
    element.addEventListener("pointerleave", onLeave);

    return () => {
      element.removeEventListener("pointerenter", onEnter);
      element.removeEventListener("pointerleave", onLeave);
      gsap.set(element, { scale: 1, clearProps: "willChange" });
    };
  }
}

export class Stagger {
  static reveal(element: HTMLElement, options: StaggerOptions = {}): () => void {
    ensureMotionPlugins();
    const kind = options.kind ?? "items";
    let split: SplitText | null = null;
    const ctx = gsap.context(() => {
      if (kind === "items") {
        const items = Array.from(
          element.querySelectorAll(options.selector ?? ":scope > *"),
        );
        if (items.length === 0) return;
        gsap.set(element, { perspective: 900 });
        Motion.fromTo(items, MotionLanguage.tiltIn.from, {
          ...MotionLanguage.tiltIn.to,
          ...MotionLanguage.revealVars(),
          stagger: MotionTokens.stagger.items,
          scrollTrigger: {
            trigger: element,
            start: MotionTokens.revealStart,
            once: true,
          },
        });
        return;
      }

      split = SplitText.create(element, {
        type: kind === "chars" ? "chars,words,lines" : kind === "words" ? "words,lines" : "lines",
        mask: kind === "chars" ? "chars" : kind === "words" ? "words" : "lines",
        aria: "auto",
      });

      const targets =
        kind === "chars" ? split.chars : kind === "words" ? split.words : split.lines;

      Motion.fromTo(targets, MotionLanguage.maskRise.from, {
        ...MotionLanguage.maskRise.to,
        ...MotionLanguage.revealVars(),
        stagger:
          kind === "chars"
            ? MotionTokens.stagger.chars
            : kind === "words"
              ? MotionTokens.stagger.words
              : MotionTokens.stagger.lines,
        scrollTrigger: {
          trigger: element,
          start: MotionTokens.revealStart,
          once: true,
        },
      });
    }, element);

    return () => {
      split?.revert();
      ctx.revert();
    };
  }
}

export class ScrollLinked {
  static attach(element: HTMLElement, options: ScrollLinkedOptions = {}): () => void {
    ensureMotionPlugins();
    const kind = options.kind ?? "parallax";
    const speed = options.speed ?? MotionTokens.parallax;
    const trigger = element.closest("[data-parallax-section]") ?? element;

    const ctx = gsap.context(() => {
      if (kind === "clip") {
        Motion.fromTo(
          element,
          { clipPath: "inset(18% 8% 18% 8%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: MotionTokens.ease.linear,
            scrollTrigger: {
              trigger,
              start: "top 90%",
              end: "top 30%",
              scrub: MotionTokens.scrub,
            },
          },
        );
        return;
      }

      if (kind === "progress") {
        Motion.fromTo(
          element,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            ease: MotionTokens.ease.linear,
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.4,
            },
          },
        );
        return;
      }

      Motion.to(element, {
        yPercent: speed * -100,
        ease: MotionTokens.ease.linear,
        scrollTrigger: {
          trigger,
          start: "top bottom",
          end: "bottom top",
          scrub: MotionTokens.scrub,
          invalidateOnRefresh: true,
        },
      });
    }, element);

    return () => ctx.revert();
  }
}

export class Morph {
  static attach(element: HTMLElement, options: MorphOptions = {}): () => void {
    ensureMotionPlugins();
    const kind = options.kind ?? "inset";

    const ctx = gsap.context(() => {
      if (kind === "radius") {
        const to = getComputedStyle(element).borderRadius || "16px";
        Motion.fromTo(
          element,
          { borderRadius: "0px" },
          {
            borderRadius: to,
            duration: MotionTokens.duration.morph,
            ease: MotionTokens.ease.spring,
            scrollTrigger: {
              trigger: element,
              start: MotionTokens.revealStart,
              once: true,
            },
          },
        );
        return;
      }

      const preset = kind === "clip" ? MotionLanguage.clipReveal : MotionLanguage.clipUp;
      Motion.fromTo(element, preset.from, {
        ...preset.to,
        duration: MotionTokens.duration.morph,
        ease: MotionTokens.ease.reveal,
        scrollTrigger: {
          trigger: element,
          start: MotionTokens.revealStart,
          once: true,
        },
      });
    }, element);

    return () => ctx.revert();
  }

  static clip(
    target: gsap.TweenTarget,
    to: string,
    from = "inset(100% 0 0 0)",
  ): gsap.core.Tween {
    return Motion.fromTo(
      target,
      { clipPath: from },
      {
        clipPath: to,
        duration: MotionTokens.duration.morph,
        ease: MotionTokens.ease.reveal,
      },
    );
  }
}

export class SharedElement {
  private static nodes = new Map<string, HTMLElement>();

  static register(id: string, element: HTMLElement): void {
    SharedElement.nodes.set(id, element);
    element.dataset.sharedElement = id;
  }

  static unregister(id: string, element?: HTMLElement): void {
    const current = SharedElement.nodes.get(id);
    if (!current) return;
    if (!element || current === element) {
      SharedElement.nodes.delete(id);
    }
  }

  static get(id: string): HTMLElement | undefined {
    return SharedElement.nodes.get(id);
  }

  static capture(id: string): Flip.FlipState | null {
    ensureMotionPlugins();
    const node = SharedElement.nodes.get(id);
    if (!node) return null;
    return Flip.getState(node);
  }

  static from(state: Flip.FlipState, vars: Flip.FromToVars = {}): gsap.core.Timeline {
    ensureMotionPlugins();
    return Flip.from(state, {
      duration: MotionTokens.duration.flip,
      ease: MotionTokens.ease.cinematic,
      absolute: true,
      scale: true,
      ...vars,
    });
  }

  static flip(fromId: string, toId: string, vars: Flip.FitVars = {}): gsap.core.Tween | null {
    ensureMotionPlugins();
    const from = SharedElement.nodes.get(fromId);
    const to = SharedElement.nodes.get(toId);
    if (!from || !to) return null;

    const tween = Flip.fit(to, from, {
      duration: MotionTokens.duration.flip,
      ease: MotionTokens.ease.spring,
      scale: true,
      absolute: true,
      ...vars,
    });

    return tween instanceof gsap.core.Tween ? tween : null;
  }
}

export { numberAttr };
