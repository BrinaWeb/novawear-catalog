import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        md: "2rem",
        lg: "2.5rem",
        xl: "3rem",
        "2xl": "4rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    screens: {
      // Mobile First Breakpoints
      xs: "375px",   // Small phones
      sm: "640px",   // Large phones / Small tablets
      md: "768px",   // Tablets
      lg: "1024px",  // Small laptops
      xl: "1280px",  // Desktops
      "2xl": "1536px", // Large desktops
    },
    extend: {
      // Fluid Typography System
      fontSize: {
        // Mobile First - escalável
        xs: ["clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)", { lineHeight: "1.5" }],
        sm: ["clamp(0.875rem, 0.8rem + 0.375vw, 1rem)", { lineHeight: "1.5" }],
        base: ["clamp(1rem, 0.95rem + 0.25vw, 1.125rem)", { lineHeight: "1.6" }],
        lg: ["clamp(1.125rem, 1rem + 0.625vw, 1.25rem)", { lineHeight: "1.5" }],
        xl: ["clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)", { lineHeight: "1.4" }],
        "2xl": ["clamp(1.5rem, 1.3rem + 1vw, 2rem)", { lineHeight: "1.3" }],
        "3xl": ["clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)", { lineHeight: "1.2" }],
        "4xl": ["clamp(2.25rem, 1.8rem + 2.25vw, 3rem)", { lineHeight: "1.1" }],
        "5xl": ["clamp(3rem, 2.4rem + 3vw, 4rem)", { lineHeight: "1" }],
      },
      // Spacing fluido
      spacing: {
        "fluid-xs": "clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)",
        "fluid-sm": "clamp(1rem, 0.8rem + 1vw, 1.5rem)",
        "fluid-md": "clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem)",
        "fluid-lg": "clamp(2rem, 1.6rem + 2vw, 3.5rem)",
        "fluid-xl": "clamp(3rem, 2.4rem + 3vw, 5rem)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;