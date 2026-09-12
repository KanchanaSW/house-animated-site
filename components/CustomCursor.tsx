"use client";

import { useEffect, useRef } from "react";
import { useIsFinePointer, usePrefersReducedMotion } from "@/lib/media";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const fine = useIsFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;
    const el = cursorRef.current;
    if (!el) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (event: PointerEvent) => {
      el.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) scale(var(--cursor-scale, 1))`;
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [data-cursor]");
      el.style.setProperty("--cursor-scale", interactive ? "2.4" : "1");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[40] h-3 w-3 rounded-full bg-studio-ink mix-blend-difference transition-transform duration-500 ease-film [margin-left:-6px] [margin-top:-6px]"
    />
  );
}
