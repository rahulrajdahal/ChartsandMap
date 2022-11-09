/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "375px",
      sm: "768px",
      md: "1368px",
      lg: "1440px",
      xl: "1920px",
    },
    borderRadius: {
      xs: "4px",
      sm: "8px",
      md: "12px",
      lg: "16px",
      xl: "32px",
    },
    extend: {},
  },
  plugins: [],
};
