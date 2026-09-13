/**
 * Shared motion system (GSAP + Lenis).
 *
 * Language: shared-element / morph / spring / magnetic / scroll-linked / stagger.
 * Opacity-fade-as-whole is rejected by `Motion.to` / `Motion.fromTo`.
 * `prefers-reduced-motion` disables Lenis, tweens, and the cursor.
 * Custom cursor mounts only on `(pointer: fine)`.
 *
 * Data attributes (optional, auto-bound by MotionProvider):
 * - data-magnetic="0.22"
 * - data-spring="1.03"
 * - data-stagger="items|words|lines|chars"
 * - data-scroll-linked="parallax|clip|progress"
 * - data-morph="inset|radius|clip"
 * - data-shared-element="id"
 * - data-cursor-target / data-cursor-label="View"
 */
export { MotionProvider } from "./provider";
export { MotionCursor } from "./cursor";
export {
  useMotion,
  useMotionOptional,
} from "./context";
export {
  useGsapContext,
  useLenis,
  useMagnetic,
  useMorph,
  usePointerFine,
  useReducedMotion,
  useScrollLinked,
  useScrollTo,
  useSharedElement,
  useSpring,
  useStagger,
} from "./hooks";
export { MotionTokens } from "./tokens";
export {
  MotionLanguage,
  assertMotionLanguage,
  springEase,
} from "./language";
export { MotionMedia } from "./media";
export { MotionRuntime, ensureMotionPlugins } from "./runtime";
export {
  Magnetic,
  Morph,
  Motion,
  ScrollLinked,
  SharedElement,
  Spring,
  Stagger,
} from "./primitives";
export type { MotionContextValue } from "./context";
export type { MotionMediaState } from "./media";
export type {
  MagneticOptions,
  MorphKind,
  MorphOptions,
  ScrollLinkedKind,
  ScrollLinkedOptions,
  SpringHoverOptions,
  StaggerKind,
  StaggerOptions,
} from "./primitives";

export { default as gsap } from "gsap";
export { Flip } from "gsap/Flip";
export { ScrollTrigger } from "gsap/ScrollTrigger";
export { SplitText } from "gsap/SplitText";
export { default as Lenis } from "lenis";
