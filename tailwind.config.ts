import type { Config } from "tailwindcss";
export default {
  content: [
    "./src/**/*.{html,js, tsx,ts}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage:{
        'hero-pattern':"url('/background.jpg')",
      }
    },
  },
  plugins: [],
} satisfies Config;
