"use client";

import { animate, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

const stats = [
  { value: 4200, label: "Square feet", display: "4,200" },
  { value: 6, label: "Assemblies", display: "6" },
  { value: 14, label: "Months to build", display: "14" },
  { value: 1, label: "Energy rating", display: "A+" },
];

function Stat({
  value,
  display,
  label,
  index,
}: {
  value: number;
  display: string;
  label: string;
  index: number;
}) {
  const reduced = Boolean(useReducedMotion());
  const [text, setText] = useState(reduced ? display : "0");
  const started = useRef(false);

  return (
    <motion.div
      initial={reduced ? false : { y: 20 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.4, margin: "80px 0px" }}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      onViewportEnter={() => {
        if (started.current) return;
        started.current = true;
        if (reduced || display === "A+") {
          setText(display);
          return;
        }
        animate(0, value, {
          duration: 1.35,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (latest) => {
            setText(Math.round(latest).toLocaleString("en-US"));
          },
        });
      }}
    >
      <p className="font-sans text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-none tracking-tight text-studio-ink">
        {text}
      </p>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-studio-muted">
        {label}
      </p>
    </motion.div>
  );
}

export default function Specs() {
  return (
    <section id="specs" className="bg-studio px-4 py-24 md:px-8 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.1] tracking-tight text-studio-ink">
          Built as a system
        </h2>
        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Stat key={stat.label} index={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
