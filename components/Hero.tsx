"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/media";
import { useScrollScrub } from "@/lib/useScrollScrub";

function fadeOut(progress: number, holdUntil: number, goneBy: number) {
  if (progress <= holdUntil) return 1;
  if (progress >= goneBy) return 0;
  return 1 - (progress - holdUntil) / (goneBy - holdUntil);
}

function fadeInOut(
  progress: number,
  appear: number,
  full: number,
  hold: number,
  gone: number,
) {
  if (progress < appear || progress > gone) return 0;
  if (progress < full) return (progress - appear) / (full - appear);
  if (progress <= hold) return 1;
  return 1 - (progress - hold) / (gone - hold);
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const firstLineRef = useRef<HTMLParagraphElement>(null);
  const secondLineRef = useRef<HTMLParagraphElement>(null);
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !ready || reduced || !mobile) return;
    const play = video.play();
    play?.catch(() => undefined);
  }, [mobile, ready, reduced]);

  const scrubEnabled = ready && !reduced && !mobile;

  const onProgress = useCallback((progress: number) => {
    if (firstLineRef.current) {
      firstLineRef.current.style.opacity = String(
        fadeOut(progress, 0.16, 0.34),
      );
    }
    if (secondLineRef.current) {
      secondLineRef.current.style.opacity = String(
        fadeInOut(progress, 0.36, 0.48, 0.7, 0.9),
      );
    }
  }, []);

  useScrollScrub({
    videoRef,
    containerRef,
    enabled: scrubEnabled,
    onProgress,
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-studio"
      aria-label="House exploded view"
    >
      <div className="relative min-h-[100dvh] overflow-hidden">
        {reduced ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/images/poster.jpg"
            alt="A modern two-storey house with white planes, charcoal concrete, and walnut interiors."
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          // Video: H.264 baseline + WebM, no audio, under ~10MB, keyframe-per-frame for scrub seeking.
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            preload="metadata"
            muted
            playsInline
            disablePictureInPicture
            poster="/images/poster.jpg"
            autoPlay={ready && mobile}
            loop={ready && mobile}
            aria-hidden="true"
          >
            <source src="/videos/house-explode.webm" type="video/webm" />
            <source src="/videos/house-explode.mp4" type="video/mp4" />
          </video>
        )}

        <p className="sr-only">
          As you scroll, a modern house separates into structural layers: roof,
          rooms, insulation, and foundation.
        </p>

        <div className="pointer-events-none absolute inset-0 z-[10] flex items-end">
          <div className="relative w-full max-w-5xl px-5 pb-16 md:px-10 md:pb-20">
            <h1 className="sr-only">Every layer, engineered.</h1>
            <div className="relative min-h-[1.15em]">
              <p
                ref={firstLineRef}
                className="max-w-5xl text-[clamp(2.25rem,6vw,4.75rem)] font-medium leading-[1.1] tracking-tight text-studio-ink"
              >
                Every layer, engineered.
              </p>
              <p
                ref={secondLineRef}
                className="absolute inset-x-0 top-0 max-w-5xl text-[clamp(2.25rem,6vw,4.75rem)] font-medium leading-[1.1] tracking-tight text-studio-ink opacity-0"
              >
                See what&apos;s inside.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
