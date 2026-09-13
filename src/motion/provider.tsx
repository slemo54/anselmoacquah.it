"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type Lenis from "lenis";
import "lenis/dist/lenis.css";
import { MotionBinder } from "./binder";
import { MotionContext, type MotionContextValue } from "./context";
import { MotionCursor } from "./cursor";
import { MotionMedia } from "./media";
import { MotionRuntime } from "./runtime";
import "./motion.css";

type MotionProviderProps = {
  children: ReactNode;
  cursor?: boolean;
};

export function MotionProvider({ children, cursor = true }: MotionProviderProps) {
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [pointerFine, setPointerFine] = useState(false);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const apply = (state: { reducedMotion: boolean; pointerFine: boolean }) => {
      setReducedMotion(state.reducedMotion);
      setPointerFine(state.pointerFine);
      MotionMedia.applyDocumentAttrs(state, cursor);
      setReady(true);
    };

    apply(MotionMedia.snapshot());
    return MotionMedia.subscribe(apply);
  }, [cursor]);

  useEffect(() => {
    if (!ready) return;

    const runtime = MotionRuntime.get();
    runtime.boot({ reducedMotion, pointerFine });
    setLenis(runtime.lenis);

    const unbind =
      typeof document === "undefined" ? undefined : MotionBinder.attach(document.body, runtime);

    return () => {
      unbind?.();
      runtime.shutdown();
      setLenis(null);
    };
  }, [ready, reducedMotion, pointerFine]);

  const value = useMemo<MotionContextValue>(
    () => ({ ready, reducedMotion, pointerFine, lenis }),
    [ready, reducedMotion, pointerFine, lenis],
  );

  const showCursor = ready && cursor && pointerFine && !reducedMotion;

  return (
    <MotionContext.Provider value={value}>
      {children}
      {showCursor ? <MotionCursor /> : null}
    </MotionContext.Provider>
  );
}
