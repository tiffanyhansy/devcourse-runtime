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
        blurIn: {
          "0%": { filter: "blur(4px)", transform: "scale(0.9)", opacity: "0" },
          "100%": { filter: "blur(0px)", transform: "scale(1)", opacity: "1" },
        },
        blurOut: {
          "0%": { filter: "blur(0px)", transform: "scale(1)", opacity: "1" },
          "100%": {
            filter: "blur(4px)",
            transform: "scale(0.9)",
            opacity: "0",
          },
        },

        slideIn: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideOut: {
          "0%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "100%": { opacity: "0", transform: "translateY(-20px) scale(0.9)" },
        },
        flipIn: {
          "0%": { transform: "rotateY(90deg)", opacity: "0" },
          "100%": { transform: "rotateY(0)", opacity: "1" },
        },
        flipOut: {
          "0%": { transform: "rotateY(0)", opacity: "1" },
          "100%": { transform: "rotateY(90deg)", opacity: "0" },
        },
        glassBlur: {
          "0%": { filter: "blur(10px)", transform: "scale(0.8)", opacity: "0" },
          "100%": { filter: "blur(0px)", transform: "scale(1)", opacity: "1" },
        },
        chatSwashIn: {
          "0%": {
            opacity: "0",
            transformOrigin: "50% 50%",
            transform: "translateX(-50%) translateY(-20px) scale(0, 0)",
          },
          "90%": {
            opacity: "1",
            transformOrigin: "50% 50%",
            transform: "translateX(-50%) translateY(-20px) scale(0.9, 0.9)",
          },
          "100%": {
            opacity: "1",
            transformOrigin: "50% 50%",
            transform: "translateX(-50%) translateY(-20px) scale(1, 1)",
          },
        },
        friendSwashIn: {
          "0%": {
            opacity: "0",
            transformOrigin: "50% 50%",
            transform: "translateX(-50%) translateY(-50%) scale(0, 0)",
          },
          "90%": {
            opacity: "1",
            transformOrigin: "50% 50%",
            transform: "translateX(-50%) translateY(-50%) scale(0.9, 0.9)",
          },
          "100%": {
            opacity: "1",
            transformOrigin: "50% 50%",
            transform: "translateX(-50%) translateY(-50%) scale(1, 1)",
          },
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
        blurIn: "blurIn 0.4s ease-in-out",
        blurOut: "blurOut 0.4s ease-in-out",
        slideIn: "slideIn 0.5s ease-out",
        slideOut: "slideOut 0.3s ease-in",
        flipIn: "flipIn 0.5s ease-in-out",
        flipOut: "flipOut 0.5s ease-in-out",
        glassBlur: "glassBlur 0.3s ease-out",
        chatSwashIn: "chatSwashIn 0.5s ease-in-out",
        friendSwashIn: "friendSwashIn 0.5s ease-in-out",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("tailwind-scrollbar"),
    // 사용자 정의 플러그인
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-gutter-stable": {
          scrollbarGutter: "stable !important",
        },
        ".scrollbar-gutter-auto": {
          scrollbarGutter: "auto",
        },
      });
    },
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
