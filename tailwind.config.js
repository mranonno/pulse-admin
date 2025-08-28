/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",
        secondary: "#3B82F6",
        danger: "#DC2626",
        background: "#161618",
        text: "#DFDFD6",
        card: "#1B1B1F",
        border: "#2E2E32",
        placeholder: "#6A6A65",
      },
    },
  },
  plugins: [],
};
