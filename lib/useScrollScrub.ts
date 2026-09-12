"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type UseScrollScrubOptions = {
  videoRef: RefObject<HTMLVideoElement | null>;
  containerRef: RefObject<HTMLElement | null>;
  enabled: boolean;
  pinDistance?: string;
  onProgress?: (progress: number) => void;
};

function seekVideo(video: HTMLVideoElement, progress: number) {
  const duration = video.duration;
  if (!Number.isFinite(duration) || duration <= 0) return;
  const nextTime = Math.min(Math.max(progress, 0), 1) * duration;
  if (Math.abs(video.currentTime - nextTime) < 0.008) return;
  video.currentTime = nextTime;
}

export function useScrollScrub({
  videoRef,
  containerRef,
  enabled,
  pinDistance = "+=280%",
  onProgress,
}: UseScrollScrubOptions) {
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  useEffect(() => {
    if (!enabled) return;

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    gsap.registerPlugin(ScrollTrigger);

    let trigger: ScrollTrigger | undefined;
    let cancelled = false;

    const apply = (progress: number) => {
      seekVideo(video, progress);
      onProgressRef.current?.(progress);
    };

    const createTrigger = () => {
      if (cancelled || trigger) return;
      video.muted = true;
      const unlock = video.play();
      if (unlock) {
        unlock
          .then(() => {
            video.pause();
          })
          .catch(() => {
            video.pause();
          });
      } else {
        video.pause();
      }
      trigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: pinDistance,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => apply(self.progress),
      });
      apply(trigger.progress);
    };

    const onMeta = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      createTrigger();
      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) onMeta();
    else video.addEventListener("loadedmetadata", onMeta);

    return () => {
      cancelled = true;
      video.removeEventListener("loadedmetadata", onMeta);
      trigger?.kill();
    };
  }, [containerRef, enabled, pinDistance, videoRef]);
}
