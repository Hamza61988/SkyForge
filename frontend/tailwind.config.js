export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A", // Deep Black
        primary: "#FF3131", // Soft Neon Red (Buttons & Highlights)
        success: "#0AFF9D", // Emerald Green (Success States)
        highlight: "#1B6F7C", // Muted Cyan (Secondary UI Elements)
        textPrimary: "#EAEAEA", // Light Grayish White
        navyDark: "#0D1B2A", // Darker Navy Blue (Gradients)
        navyLight: "#1B263B", // Lighter Blue (Gradients)
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        heading: ["Space Grotesk", "sans-serif"],
      },
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      boxShadow: {
        "glow-red": "0px 4px 20px rgba(255, 49, 49, 0.6)",
        "glow-green": "0px 4px 20px rgba(10, 255, 157, 0.6)",
        "glow-cyan": "0px 4px 20px rgba(27, 111, 124, 0.6)",
        "glow-blue": "0px 4px 20px rgba(29, 85, 139, 0.6)",
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
        floating: "floating 4s infinite alternate ease-in-out",
        blink: "blink 1.5s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        floating: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(20px)" },
        },
        blink: {
          "0%, 100%": { opacity: 0 },
          "50%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
