// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Optional: Map your CSS variables into Tailwind theme if needed
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // if you're using this
  ],
};

export default config;
