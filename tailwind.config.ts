import type { Config } from "tailwindcss";
import MT from "@material-tailwind/react/utils/withMT";
const config: any = MT({
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      screens: {
        "max-xl": { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        "max-lg": { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        "max-md": { max: "767px" },
        // => @media (max-width: 767px) { ... }

        "max-sm": { max: "639px" },

        "min-xl": { min: "1279px" },
        // => @media (max-width: 1279px) { ... }

        "min-lg": { min: "1023px" },
        // => @media (max-width: 1023px) { ... }

        "min-md": { min: "767px" },
        // => @media (max-width: 767px) { ... }

        "min-sm": { min: "639px" },
        // => @media (max-width: 639px) { ... }
      },
      keyframes: {
        dimScreen: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
          // "50%": { opacity: 0 }
        },
       dimOverlay: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideOut: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        slideIn: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        RotateOut: {
          "0%": { transform: "rotate(0deg)"},
  
          "100%": { transform: "rotate(180deg)" },
        },
        RotateIn: {
          "0%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        dimScreen: "dimScreen 500ms ease-in-out",
        slideOut: " slideOut 500ms ease-in-out forwards",
        slideIn: " slideIn 500ms ease-in-out forwards ",
        RotateOut: " RotateOut 500ms ease-in-out forwards ",
        RotateIn: " RotateIn 500ms ease-in-out forwards ",
        dimOverlay: "dimOverlay 500ms ease-in-ut forwards"
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark", "light"],
    
  }
});
export default config;
