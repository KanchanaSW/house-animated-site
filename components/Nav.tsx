"use client";

import { useState } from "react";
import { List, X } from "@phosphor-icons/react";

const links = [
  { href: "#layers", label: "Layers" },
  { href: "#specs", label: "Specs" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[30] flex justify-center px-4 pt-5">
        <nav
          className="glass-approx pointer-events-auto flex h-14 max-w-[calc(100%-0.5rem)] items-center gap-6 rounded-full border border-white/40 bg-white/45 px-2 pl-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-xl"
          aria-label="Primary"
        >
          <a
            href="#top"
            className="text-[15px] font-medium tracking-tight text-studio-ink"
            data-cursor
          >
            Strata
          </a>
          <div className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-studio-muted transition-colors duration-500 ease-film hover:text-studio-ink"
                data-cursor
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#inquire"
            className="group ml-auto hidden items-center gap-2 rounded-full bg-studio-ink py-2 pl-4 pr-2 text-sm text-studio-mist md:inline-flex"
            data-cursor
          >
            Plan a visit
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-film group-hover:translate-x-0.5 group-hover:-translate-y-px group-active:scale-95">
              <span aria-hidden="true" className="text-xs">
                ↗
              </span>
            </span>
          </a>
          <button
            type="button"
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-studio-ink text-studio-mist md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative h-4 w-4">
              <List
                weight="light"
                className={`absolute inset-0 h-4 w-4 transition-all duration-500 ease-film ${open ? "scale-75 opacity-0" : "scale-100 opacity-100"}`}
              />
              <X
                weight="light"
                className={`absolute inset-0 h-4 w-4 transition-all duration-500 ease-film ${open ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
              />
            </span>
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-[29] bg-studio-mist/90 backdrop-blur-3xl transition-opacity duration-500 ease-film md:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div className="flex min-h-[100dvh] flex-col justify-end gap-6 px-6 pb-16 pt-28">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-4xl font-medium tracking-tight text-studio-ink"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#inquire"
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-studio-ink py-3 pl-5 pr-3 text-base text-studio-mist"
            onClick={() => setOpen(false)}
          >
            Plan a visit
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
              ↗
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
