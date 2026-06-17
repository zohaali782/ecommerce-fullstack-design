/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A73E8", // Main blue
        "primary-dark": "#1557B0",
        secondary: "#00A651", // Green accent
        accent: "#FF6A00", // Orange CTA
        danger: "#E53935", // Red badges/discounts
        dark: "#1C1C1C",
        muted: "#6B7280",
        light: "#F5F7FA",
        border: "#E5E7EB",
        card: "#FFFFFF",
        banner: "#E8F4F0", // Teal banner bg
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        nav: "0 2px 8px rgba(0,0,0,0.08)",
        card: "0 2px 12px rgba(0,0,0,0.06)",
        dropdown: "0 8px 24px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
