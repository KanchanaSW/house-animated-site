"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.14, 1]);

  return (
    <section
      id="inquire"
      ref={ref}
      className="bg-studio px-4 py-24 md:px-8 md:py-40"
    >
      <div className="relative mx-auto min-h-[72dvh] max-w-[1400px] overflow-hidden rounded-card ring-1 ring-studio-ink/10">
        <motion.div
          style={reduced ? undefined : { y, scale }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/exploded.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-studio-ink/75 via-studio-ink/25 to-studio-ink/10" />

        <div className="relative flex min-h-[72dvh] flex-col justify-end px-6 py-10 md:px-12 md:py-16">
          <motion.h2
            initial={reduced ? false : { y: 24 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.35, margin: "80px 0px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl text-[clamp(2.25rem,5vw,4.25rem)] font-medium leading-[1.08] tracking-tight text-studio-mist"
          >
            Walk the house, layer by layer.
          </motion.h2>
          <motion.a
            href="mailto:studio@strata.house?subject=Plan%20a%20visit"
            initial={reduced ? false : { y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.35, margin: "80px 0px" }}
            transition={{
              duration: 0.7,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-studio-mist py-3 pl-6 pr-2 text-base text-studio-ink"
            data-cursor
          >
            Plan a visit
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-studio-ink/10 transition-transform duration-500 ease-film group-hover:translate-x-0.5 group-hover:-translate-y-px group-active:scale-95">
              ↗
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
