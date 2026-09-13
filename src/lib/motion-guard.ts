export class MotionGuard {
  static reducedQuery = "(prefers-reduced-motion: reduce)";
  static finePointerQuery = "(hover: hover) and (pointer: fine)";

  static reduced(): boolean {
    if (typeof window === "undefined") return false;
    return window.matchMedia(this.reducedQuery).matches;
  }

  static finePointer(): boolean {
    if (typeof window === "undefined") return false;
    return window.matchMedia(this.finePointerQuery).matches;
  }

  static canAnimate(): boolean {
    return !this.reduced();
  }

  static canMagnetize(): boolean {
    return this.canAnimate() && this.finePointer();
  }
}
