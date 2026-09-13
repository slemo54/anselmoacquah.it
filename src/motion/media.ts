export type MotionMediaState = {
  reducedMotion: boolean;
  pointerFine: boolean;
};

function query(list: string): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(list).matches;
}

/**
 * Safe defaults before hydration: treat motion as reduced and pointers as
 * coarse so Lenis/cursor never boot on the server or on unknown devices.
 */
export class MotionMedia {
  static snapshot(): MotionMediaState {
    if (typeof window === "undefined") {
      return { reducedMotion: true, pointerFine: false };
    }

    return {
      reducedMotion: query("(prefers-reduced-motion: reduce)"),
      pointerFine: query("(pointer: fine)"),
    };
  }

  static subscribe(onChange: (state: MotionMediaState) => void): () => void {
    if (typeof window === "undefined") return () => undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(pointer: fine)");

    const emit = () => onChange(MotionMedia.snapshot());
    emit();

    reduced.addEventListener("change", emit);
    pointer.addEventListener("change", emit);

    return () => {
      reduced.removeEventListener("change", emit);
      pointer.removeEventListener("change", emit);
    };
  }

  static applyDocumentAttrs(state: MotionMediaState, cursorEnabled: boolean): void {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.dataset.motion = state.reducedMotion ? "reduce" : "on";
    root.dataset.pointer = state.pointerFine ? "fine" : "coarse";
    root.dataset.motionCursor =
      cursorEnabled && state.pointerFine && !state.reducedMotion ? "on" : "off";
  }
}
