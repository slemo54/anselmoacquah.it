import {
  Magnetic,
  Morph,
  numberAttr,
  ScrollLinked,
  SharedElement,
  Spring,
  Stagger,
  type MorphKind,
  type ScrollLinkedKind,
  type StaggerKind,
} from "./primitives";
import type { MotionRuntime } from "./runtime";

const SELECTOR = [
  "[data-magnetic]",
  "[data-spring]",
  "[data-stagger]",
  "[data-scroll-linked]",
  "[data-morph]",
  "[data-shared-element]",
].join(",");

const teardowns = new WeakMap<Element, Array<() => void>>();

function bindOne(element: HTMLElement, runtime: MotionRuntime): void {
  if (teardowns.has(element) || element.hasAttribute("data-motion-ignore")) return;

  const jobs: Array<() => void> = [];
  const pointerOk = runtime.pointerFine && !runtime.reducedMotion;

  if (element.hasAttribute("data-magnetic") && pointerOk) {
    jobs.push(
      Magnetic.attach(element, {
        strength: numberAttr(element.dataset.magnetic, 0.22),
      }),
    );
  }

  if (element.hasAttribute("data-spring") && pointerOk) {
    jobs.push(
      Spring.attachHover(element, {
        scale: numberAttr(element.dataset.spring, 1.03),
      }),
    );
  }

  if (element.hasAttribute("data-stagger") && !runtime.reducedMotion) {
    const kind = (element.dataset.stagger || "items") as StaggerKind;
    jobs.push(Stagger.reveal(element, { kind }));
  }

  if (element.hasAttribute("data-scroll-linked") && !runtime.reducedMotion) {
    const kind = (element.dataset.scrollLinked || "parallax") as ScrollLinkedKind;
    jobs.push(
      ScrollLinked.attach(element, {
        kind,
        speed: numberAttr(element.dataset.parallaxSpeed, 0.14),
      }),
    );
  }

  if (element.hasAttribute("data-morph") && !runtime.reducedMotion) {
    const kind = (element.dataset.morph || "inset") as MorphKind;
    jobs.push(Morph.attach(element, { kind }));
  }

  if (element.dataset.sharedElement) {
    SharedElement.register(element.dataset.sharedElement, element);
    jobs.push(() => SharedElement.unregister(element.dataset.sharedElement ?? "", element));
  }

  if (jobs.length > 0) teardowns.set(element, jobs);
}

function unbindOne(element: Element): void {
  const jobs = teardowns.get(element);
  if (!jobs) return;
  jobs.forEach((job) => job());
  teardowns.delete(element);
}

function scan(root: ParentNode, runtime: MotionRuntime): void {
  if (root instanceof Element && root.matches(SELECTOR)) {
    bindOne(root as HTMLElement, runtime);
  }
  root.querySelectorAll<HTMLElement>(SELECTOR).forEach((node) => bindOne(node, runtime));
}

/** Auto-bind data-attribute motion language without touching page content. */
export class MotionBinder {
  static attach(root: ParentNode, runtime: MotionRuntime): () => void {
    scan(root, runtime);

    const observer = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement || node instanceof DocumentFragment) {
            scan(node, runtime);
          }
        });
        record.removedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            unbindOne(node);
            node.querySelectorAll(SELECTOR).forEach(unbindOne);
          }
        });
      }
    });

    observer.observe(root instanceof Element || root instanceof Document ? root : document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      if (root instanceof Element) {
        unbindOne(root);
        root.querySelectorAll(SELECTOR).forEach(unbindOne);
        return;
      }
      document.querySelectorAll(SELECTOR).forEach(unbindOne);
    };
  }
}
