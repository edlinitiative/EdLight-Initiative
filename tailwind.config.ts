import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}", "./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./content/**/*.{md,mdx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        edlight: {
          primary: "#2563EB",
          primaryHover: "#1D4ED8",
          tint: "#DBEAFE",
          darkAccent: "#60A5FA",
          bg: "#F9FAFB",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        serif: ["Source Serif 4", "ui-serif", "Georgia", "serif"],
      },
      borderRadius: {
        "xl": "1.25rem",
      },
      transitionDuration: {
        150: "150ms",
        200: "200ms",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

export default config;
