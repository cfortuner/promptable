// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    //
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./docs/**/*.{js,jsx,ts,tsx,md,mdx}",
  ],
  theme: {},
  darkMode: ["class", '[data-theme="dark"]'],
  plugins: [require("@tailwindcss/line-clamp")],
};
