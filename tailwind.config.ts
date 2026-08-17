import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0b",
        "bg-soft": "#0f0f11",
        ink: "#ece9e2",
        "ink-dim": "#a3a09a",
        "ink-faint": "#6b6862",
        line: "#1e1e21",
        "line-soft": "#161618",
        accent: "#c9a86a",
        "accent-dim": "#8a7648",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        wrap: "1180px",
        read: "680px",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(.16,1,.3,1)",
      },
    },
  },
  plugins: [],
};

export default config;
