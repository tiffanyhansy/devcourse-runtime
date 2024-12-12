import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { transform: "translateY(-30px)", opacity: "0" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
        show: {
          "0%": { backgroundColor: "rgba(0, 0, 0, 0)" },
          "100%": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        },
        spaceInDown: {
          "0%": {
            opacity: "0",
            transform: "translateX(-50%) translateY(300px) scale(0.2)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(-50%) translateY(-50%) scale(1)",
          },
        },
      },
      animation: {
        show: "show 1s ease-in-out forwards",
        fadeIn_1s: "fadeIn 1s ease-in-out forwards 1000ms",
        fadeIn_2s: "fadeIn 1s ease-in-out forwards 2000ms",
        spaceInDown_1s: "spaceInDown 1s ease-in-out forwards 1000ms",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
