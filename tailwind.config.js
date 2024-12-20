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
        scaleInTopLeft: {
          "0%": {
            transform: "scale(0)",
            transformOrigin: "0% 0%",
            opacity: "1",
          },
          "100%": {
            transform: "scale(1)",
            transformOrigin: "0% 0%",
            opacity: "1",
          },
        },
        scaleInTopRight: {
          "0%": {
            transform: "scale(0)",
            transformOrigin: "100% 0%",
            opacity: "1",
          },
          "100%": {
            transform: "scale(1)",
            transformOrigin: "100% 0%",
            opacity: "1",
          },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-10px)" },
          "50%": { transform: "translateX(10px)" },
          "75%": { transform: "translateX(-10px)" },
        },
      },
      animation: {
        show: "show 1s ease-in-out forwards",
        fadeIn_1s: "fadeIn 1s ease-in-out forwards 1000ms",
        fadeIn_2s: "fadeIn 1s ease-in-out forwards 2000ms",
        spaceInDown_05s: "spaceInDown 1s ease-in-out forwards 500ms",
        spaceInDown_1s: "spaceInDown 1s ease-in-out forwards 1000ms",
        spaceInDown_2S: "spaceInDown 1s ease-in-out forwards 1500ms",
        scaleInTopLeft: "scaleInTopLeft 0.3s ease-in-out forwards",
        scaleInTopRight: "scaleInTopRight 0.3s ease-in-out forwards",
        shake: "shake 0.5s ease-in-out 1",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
