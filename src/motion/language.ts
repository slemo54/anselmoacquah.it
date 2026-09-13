import { MotionTokens } from "./tokens";

const TWEEN_META = new Set([
  "duration",
  "delay",
  "ease",
  "stagger",
  "overwrite",
  "immediateRender",
  "lazy",
  "paused",
  "repeat",
  "repeatDelay",
  "yoyo",
  "yoyoEase",
  "id",
  "callbackScope",
  "onComplete",
  "onStart",
  "onUpdate",
  "onRepeat",
  "onReverseComplete",
  "onInterrupt",
  "onCompleteParams",
  "onStartParams",
  "onUpdateParams",
  "data",
  "inherit",
  "runBackwards",
  "startAt",
  "keyframes",
  "defaults",
  "clearProps",
  "scrollTrigger",
  "snap",
  "modifiers",
]);

const OPACITY_KEYS = new Set(["opacity", "autoAlpha"]);

const LAYOUT_KEYS = new Set([
  "top",
  "left",
  "right",
  "bottom",
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "width",
  "height",
  "maxWidth",
  "maxHeight",
  "minWidth",
  "minHeight",
]);

export type MotionPreset = {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
};

/**
 * GPU-first presets. Whole-element opacity fades are not a legal language.
 * Opacity may appear as a companion on small pieces, never as the only property.
 */
export class MotionLanguage {
  static readonly maskRise: MotionPreset = {
    from: { yPercent: 110 },
    to: { yPercent: 0 },
  };

  static readonly clipUp: MotionPreset = {
    from: { clipPath: "inset(100% 0% 0% 0%)" },
    to: { clipPath: "inset(0% 0% 0% 0%)" },
  };

  static readonly clipReveal: MotionPreset = {
    from: { clipPath: "inset(12% 12% 12% 12% round 32px)" },
    to: { clipPath: "inset(0% 0% 0% 0% round 0px)" },
  };

  static readonly scaleSettle: MotionPreset = {
    from: { scale: 0.94 },
    to: { scale: 1 },
  };

  static readonly tiltIn: MotionPreset = {
    from: { yPercent: 18, rotateX: 8 },
    to: { yPercent: 0, rotateX: 0 },
  };

  static readonly labelMorph: MotionPreset = {
    from: { yPercent: 90, scale: 0.86 },
    to: { yPercent: 0, scale: 1 },
  };

  static revealVars(): gsap.TweenVars {
    return {
      duration: MotionTokens.duration.reveal,
      ease: MotionTokens.ease.reveal,
    };
  }

  static springVars(): gsap.TweenVars {
    return {
      duration: MotionTokens.duration.spring,
      ease: MotionTokens.ease.spring,
    };
  }
}

export function tweenKeys(vars: object): string[] {
  return Object.keys(vars).filter((key) => !TWEEN_META.has(key));
}

/** Critically-to-slightly-underdamped spring. Overshoot is small, not cartoon bounce. */
export function springEase(zeta = 0.84, omega = 15): (progress: number) => number {
  const omegaD = omega * Math.sqrt(Math.max(1 - zeta * zeta, 1e-4));
  const coeff = (zeta * omega) / omegaD;
  return (progress: number) => {
    const decay = Math.exp(-zeta * omega * progress);
    return 1 - decay * (Math.cos(omegaD * progress) + coeff * Math.sin(omegaD * progress));
  };
}

/**
 * Enforce the motion contract: 60fps GPU language, no opacity-fade-as-whole,
 * no layout-property tweens (use Flip / transform instead).
 */
export function assertMotionLanguage(vars: object, label: string): void {
  const keys = tweenKeys(vars);
  if (keys.length === 0) return;

  if (keys.every((key) => OPACITY_KEYS.has(key))) {
    throw new Error(
      `[motion] ${label}: opacity-fade cannot be the whole language. Use clip-path, yPercent, scale, morph, or stagger.`,
    );
  }

  const layout = keys.filter((key) => LAYOUT_KEYS.has(key));
  if (layout.length > 0) {
    throw new Error(
      `[motion] ${label}: layout properties (${layout.join(", ")}) are not GPU-friendly. Use Flip or transform.`,
    );
  }
}
