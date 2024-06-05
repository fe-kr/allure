/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#161622",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        'rs-thin': ["RobotoSlab-Thin", "sans-serif"],
        'rs-extralight': ["RobotoSlab-ExtraLight", "sans-serif"],
        'rs-light': ["RobotoSlab-Light", "sans-serif"],
        'rs-regular': ["RobotoSlab-Regular", "sans-serif"],
        'rs-medium': ["RobotoSlab-Medium", "sans-serif"],
        'rs-semibold': ["RobotoSlab-SemiBold", "sans-serif"],
        'rs-bold': ["RobotoSlab-Bold", "sans-serif"],
        'rs-extrabold': ["RobotoSlab-ExtraBold", "sans-serif"],
      },
    },
  },
  plugins: [],
}

