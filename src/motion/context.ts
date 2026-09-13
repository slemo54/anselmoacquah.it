"use client";

import { createContext, useContext } from "react";
import type Lenis from "lenis";

export type MotionContextValue = {
  ready: boolean;
  reducedMotion: boolean;
  pointerFine: boolean;
  lenis: Lenis | null;
};

export const MotionContext = createContext<MotionContextValue | null>(null);

export function useMotion(): MotionContextValue {
  const value = useContext(MotionContext);
  if (!value) {
    throw new Error("useMotion must be used within MotionProvider");
  }
  return value;
}

export function useMotionOptional(): MotionContextValue | null {
  return useContext(MotionContext);
}
