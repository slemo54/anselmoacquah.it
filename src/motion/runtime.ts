import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { springEase } from "./language";
import type { MotionMediaState } from "./media";

let pluginsRegistered = false;

export function ensureMotionPlugins(): void {
  if (pluginsRegistered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, Flip, SplitText);
  gsap.registerEase("motionSpring", springEase());
  gsap.defaults({ ease: "power3.out", duration: 0.85 });
  pluginsRegistered = true;
}

export type MotionRuntimeState = MotionMediaState & {
  lenis: Lenis | null;
  booted: boolean;
};

/**
 * One-writer Lenis + GSAP ticker. Consumers never construct Lenis themselves.
 */
export class MotionRuntime {
  private static instance: MotionRuntime | null = null;

  static get(): MotionRuntime {
    if (!MotionRuntime.instance) {
      MotionRuntime.instance = new MotionRuntime();
    }
    return MotionRuntime.instance;
  }

  lenis: Lenis | null = null;
  reducedMotion = true;
  pointerFine = false;
  booted = false;

  private tick: gsap.TickerCallback | null = null;
  private onLoad: (() => void) | null = null;

  boot(state: MotionMediaState): void {
    if (this.booted) this.shutdown();

    ensureMotionPlugins();
    this.reducedMotion = state.reducedMotion;
    this.pointerFine = state.pointerFine;
    this.booted = true;

    if (state.reducedMotion) {
      this.lenis = null;
      return;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      syncTouch: false,
      autoRaf: false,
      anchors: true,
      respectReducedMotion: true,
    });

    const tick: gsap.TickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    this.lenis = lenis;
    this.tick = tick;

    const refresh = () => ScrollTrigger.refresh();
    this.onLoad = refresh;
    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh, { once: true });
    }
    void document.fonts?.ready.then(refresh);
  }

  shutdown(): void {
    if (!this.booted) return;

    if (this.tick) {
      gsap.ticker.remove(this.tick);
      this.tick = null;
    }

    if (this.onLoad) {
      window.removeEventListener("load", this.onLoad);
      this.onLoad = null;
    }

    this.lenis?.destroy();
    this.lenis = null;
    this.booted = false;
    gsap.ticker.lagSmoothing(500, 33);
  }

  snapshot(): MotionRuntimeState {
    return {
      reducedMotion: this.reducedMotion,
      pointerFine: this.pointerFine,
      lenis: this.lenis,
      booted: this.booted,
    };
  }

  scrollTo(target: string | number | HTMLElement, offset = -80): void {
    if (this.reducedMotion) {
      MotionRuntime.nativeScrollTo(target, "auto");
      return;
    }

    if (this.lenis) {
      this.lenis.scrollTo(target, { offset });
      return;
    }

    MotionRuntime.nativeScrollTo(target, "smooth");
  }

  private static nativeScrollTo(
    target: string | number | HTMLElement,
    behavior: ScrollBehavior,
  ): void {
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior });
      return;
    }

    const node = typeof target === "string" ? document.querySelector(target) : target;
    node?.scrollIntoView({ behavior, block: "start" });
  }
}
