import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lime: "#AAFF00",
        "lime-dark": "#7ACC00",
        "lime-pale": "#F5FFD6",
        "lime-light": "#EEFFC0",
        brand: "#0D0D0D",
        "off-white": "#F4F4F0",
        indica: "#7C3AED",
        "indica-bg": "#F3EEFF",
        "indica-border": "#DDD0FF",
        sativa: "#16A34A",
        "sativa-bg": "#ECFDF5",
        "sativa-border": "#BBF7D0",
        hybrid: "#D97706",
        "hybrid-bg": "#FFFBEB",
        "hybrid-border": "#FDE68A",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        brutal: "4px 4px 0px #0D0D0D",
        "brutal-sm": "2px 2px 0px #0D0D0D",
        "brutal-lg": "6px 6px 0px #0D0D0D",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
