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
        // LAYORA palette — warm sand base, espresso ink, dusty rose-clay accent.
        cream: "#F6EFE9",
        sand: "#EFE6DB",
        ink: "#241E1A",
        espresso: "#3A2E28",
        rose: {
          DEFAULT: "#B07C6E",
          light: "#D9BBAE",
          dark: "#7C4E43",
        },
        line: "#E3D8CB",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Helvetica", "Arial", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      maxWidth: {
        "8xl": "1440px",
      },
      transitionTimingFunction: {
        elegant: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
