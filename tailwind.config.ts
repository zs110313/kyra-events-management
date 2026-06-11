import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        charcoal: "#171717",
        graphite: "#262626",
        mist: "#B8B2A7",
        ivory: "#F8F1E3",
        gold: {
          300: "#E8CE87",
          400: "#CBA95F",
          500: "#A98536"
        }
      },
      fontFamily: {
        sans: ["var(--font-cormorant)", "ui-serif", "Georgia", "serif"],
        serif: ["var(--font-cormorant)", "ui-serif", "Georgia"]
      },
      boxShadow: {
        gold: "0 18px 60px rgba(203, 169, 95, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
