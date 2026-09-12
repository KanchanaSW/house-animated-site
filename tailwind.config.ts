import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          DEFAULT: "#d5d7db",
          mist: "#eceef1",
          ink: "#141618",
          muted: "#5c6168",
          line: "rgba(20, 22, 24, 0.12)",
        },
        walnut: "#7a5840",
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "1.5rem",
        nest: "1.125rem",
      },
      transitionTimingFunction: {
        film: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
