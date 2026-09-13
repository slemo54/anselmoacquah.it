"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type DependencyList,
  type RefCallback,
} from "react";
import gsap from "gsap";
import { useMotion } from "./context";
import {
  Magnetic,
  Morph,
  ScrollLinked,
  SharedElement,
  Spring,
  Stagger,
  type MagneticOptions,
  type MorphOptions,
  type ScrollLinkedOptions,
  type SpringHoverOptions,
  type StaggerOptions,
} from "./primitives";
import { MotionRuntime } from "./runtime";

function useAttach<T extends HTMLElement>(
  attach: (element: T) => (() => void) | void,
  enabled: boolean,
): RefCallback<T> {
  const cleanup = useRef<(() => void) | null>(null);
  const elementRef = useRef<T | null>(null);
  const attachRef = useRef(attach);
  attachRef.current = attach;

  const disconnect = () => {
    cleanup.current?.();
    cleanup.current = null;
  };

  const connect = useCallback(
    (node: T | null) => {
      disconnect();
      elementRef.current = node;
      if (!node || !enabled) return;
      cleanup.current = attachRef.current(node) ?? null;
    },
    [enabled],
  );

  useEffect(() => {
    connect(elementRef.current);
    return disconnect;
  }, [connect]);

  return connect;
}

export function useReducedMotion(): boolean {
  return useMotion().reducedMotion;
}

export function usePointerFine(): boolean {
  return useMotion().pointerFine;
}

export function useLenis() {
  return useMotion().lenis;
}

export function useMagnetic<T extends HTMLElement = HTMLElement>(
  options: MagneticOptions = {},
): RefCallback<T> {
  const { ready, reducedMotion, pointerFine } = useMotion();
  const strength = options.strength;
  return useAttach<T>(
    (element) => Magnetic.attach(element, { strength }),
    ready && !reducedMotion && pointerFine,
  );
}

export function useSpring<T extends HTMLElement = HTMLElement>(
  options: SpringHoverOptions = {},
): RefCallback<T> {
  const { ready, reducedMotion, pointerFine } = useMotion();
  const scale = options.scale;
  return useAttach<T>(
    (element) => Spring.attachHover(element, { scale }),
    ready && !reducedMotion && pointerFine,
  );
}

export function useStagger<T extends HTMLElement = HTMLElement>(
  options: StaggerOptions = {},
): RefCallback<T> {
  const { ready, reducedMotion } = useMotion();
  const kind = options.kind;
  const selector = options.selector;
  return useAttach<T>(
    (element) => Stagger.reveal(element, { kind, selector }),
    ready && !reducedMotion,
  );
}

export function useScrollLinked<T extends HTMLElement = HTMLElement>(
  options: ScrollLinkedOptions = {},
): RefCallback<T> {
  const { ready, reducedMotion } = useMotion();
  const kind = options.kind;
  const speed = options.speed;
  return useAttach<T>(
    (element) => ScrollLinked.attach(element, { kind, speed }),
    ready && !reducedMotion,
  );
}

export function useMorph<T extends HTMLElement = HTMLElement>(
  options: MorphOptions = {},
): RefCallback<T> {
  const { ready, reducedMotion } = useMotion();
  const kind = options.kind;
  return useAttach<T>(
    (element) => Morph.attach(element, { kind }),
    ready && !reducedMotion,
  );
}

export function useSharedElement<T extends HTMLElement = HTMLElement>(id: string) {
  const { reducedMotion } = useMotion();
  const nodeRef = useRef<T | null>(null);

  const ref: RefCallback<T> = useCallback(
    (node) => {
      if (nodeRef.current) SharedElement.unregister(id, nodeRef.current);
      nodeRef.current = node;
      if (node) SharedElement.register(id, node);
    },
    [id],
  );

  useEffect(() => {
    return () => {
      if (nodeRef.current) SharedElement.unregister(id, nodeRef.current);
    };
  }, [id]);

  const capture = useCallback(() => {
    if (reducedMotion) return null;
    return SharedElement.capture(id);
  }, [id, reducedMotion]);

  const flipTo = useCallback(
    (toId: string) => {
      if (reducedMotion) return null;
      return SharedElement.flip(id, toId);
    },
    [id, reducedMotion],
  );

  return { ref, capture, flipTo };
}

export function useGsapContext(fn: () => void, deps: DependencyList = []) {
  const scope = useRef<HTMLElement | null>(null);
  const { ready, reducedMotion } = useMotion();

  useEffect(() => {
    if (!ready || !scope.current || reducedMotion) return;
    const ctx = gsap.context(fn, scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, reducedMotion, ...deps]);

  return scope;
}

export function useScrollTo() {
  return useCallback((target: string | number | HTMLElement, offset?: number) => {
    MotionRuntime.get().scrollTo(target, offset);
  }, []);
}
