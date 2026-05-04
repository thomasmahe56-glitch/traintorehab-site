import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#070265",
        "navy-deep": "#04014a",
        white: "#FEFEFE",
        "off-white": "#F4F3F0",
        "gray-light": "#E8E7E3",
        "gray-mid": "#9B9A96",
        "gray-dark": "#3D3C38",
        accent: "#E63946",
      },
      fontFamily: {
        heading: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      borderRadius: {
        btn: "4px",
        card: "8px",
        "card-lg": "12px",
      },
      letterSpacing: {
        wider: "0.05em",
        widest: "0.1em",
      },
    },
  },
  plugins: [],
};

export default config;
