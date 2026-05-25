import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1180px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        cinzel: ["Cinzel", "Cormorant Garamond", "Times New Roman", "serif"],
        playfair: ["Playfair Display", "Georgia", "serif"]
      },
      keyframes: {
        "hero-fade-up": {
          "0%": { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "hero-fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" }
        },
        "slide-from-left": {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        "slide-from-right": {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        }
      },
      animation: {
        "hero-fade-up": "hero-fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "hero-fade-in": "hero-fade-in 1.2s ease both",
        shimmer: "shimmer 3s linear infinite",
        "slide-from-left": "slide-from-left 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "slide-from-right": "slide-from-right 0.9s cubic-bezier(0.22, 1, 0.36, 1) both"
      }
    }
  },
  plugins: []
};

export default config;
