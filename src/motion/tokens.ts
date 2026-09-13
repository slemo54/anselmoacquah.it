/** Shared motion timing. GPU language lives in `language.ts`. */
export class MotionTokens {
  static readonly duration = {
    hover: 0.4,
    cursor: 0.35,
    magnetic: 0.45,
    spring: 0.8,
    morph: 0.9,
    reveal: 0.95,
    flip: 0.7,
  } as const;

  static readonly ease = {
    cinematic: "power3.out",
    reveal: "power4.out",
    spring: "motionSpring",
    linear: "none",
  } as const;

  static readonly stagger = {
    chars: 0.018,
    words: 0.045,
    lines: 0.1,
    items: 0.075,
  } as const;

  static readonly scrub = 1.1;
  static readonly revealStart = "top 82%";
  static readonly magneticStrength = 0.22;
  static readonly springHoverScale = 1.03;
  static readonly parallax = 0.14;
}
