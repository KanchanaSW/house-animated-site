"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Armchair,
  BoundingBox,
  HouseLine,
  Square,
  Stack,
  ThermometerSimple,
} from "@phosphor-icons/react";

type Layer = {
  title: string;
  copy: string;
  icon: typeof Stack;
  image?: string;
  className: string;
};

const layers: Layer[] = [
  {
    title: "Foundation",
    copy: "A raft slab and grade beam that keep the whole stack still.",
    icon: Stack,
    image: "/images/exploded.jpg",
    className: "md:col-span-8 md:row-span-2 min-h-[22rem]",
  },
  {
    title: "Framing",
    copy: "Steel and engineered timber, cut for the spans in the film.",
    icon: BoundingBox,
    className: "md:col-span-4",
  },
  {
    title: "Roofing",
    copy: "Membrane, deck, and the cantilever that draws the silhouette.",
    icon: HouseLine,
    className: "md:col-span-4",
  },
  {
    title: "Insulation",
    copy: "A continuous wrap. No thermal bridges at the rim joists.",
    icon: ThermometerSimple,
    className: "md:col-span-4",
  },
  {
    title: "Windows",
    copy: "Floor-to-ceiling glass in a thermally broken frame.",
    icon: Square,
    image: "/images/opening.jpg",
    className: "md:col-span-4",
  },
  {
    title: "Interior",
    copy: "Walnut, linen, and a plan that reads in one glance.",
    icon: Armchair,
    image: "/images/assembled.jpg",
    className: "md:col-span-4",
  },
];

export default function ExplodedComponents() {
  const reduced = useReducedMotion();

  return (
    <section
      id="layers"
      className="bg-studio px-4 py-24 md:px-8 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <h2 className="max-w-3xl text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.1] tracking-tight text-studio-ink">
          Exploded components
        </h2>
        <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-studio-muted">
          Six assemblies, detailed as one house. Read the stack from the ground
          up.
        </p>

        <div className="mt-16 grid grid-flow-dense grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {layers.map((layer, index) => {
            const Icon = layer.icon;
            return (
              <motion.article
                key={layer.title}
                initial={reduced ? false : { y: 28 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.2, margin: "80px 0px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group relative overflow-hidden rounded-card bg-studio-mist p-1.5 ring-1 ring-studio-ink/5 ${layer.className}`}
              >
                <div
                  className={`relative flex h-full flex-col justify-between overflow-hidden rounded-nest bg-studio-mist p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] md:p-8 ${layer.image ? "min-h-[18rem]" : ""}`}
                >
                  {layer.image ? (
                    <div className="absolute inset-0">
                      <Image
                        src={layer.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover opacity-90 transition-transform duration-700 ease-film group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-studio-ink/70 via-studio-ink/15 to-transparent" />
                    </div>
                  ) : null}

                  <Icon
                    weight="light"
                    className={`relative h-7 w-7 ${layer.image ? "text-studio-mist" : "text-walnut"}`}
                  />
                  <div className="relative mt-10">
                    <h3
                      className={`text-2xl font-medium tracking-tight ${layer.image ? "text-studio-mist" : "text-studio-ink"}`}
                    >
                      {layer.title}
                    </h3>
                    <p
                      className={`mt-2 max-w-[36ch] text-sm leading-relaxed ${layer.image ? "text-studio-mist/80" : "text-studio-muted"}`}
                    >
                      {layer.copy}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
