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
      },
      animation: {
        fadeIn_1s: "fadeIn 1s ease-in-out forwards 1000ms",
        fadeIn_2s: "fadeIn 1s ease-in-out forwards 2000ms",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
