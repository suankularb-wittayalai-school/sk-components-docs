module.exports = {
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-translucent-08": "var(--primary-translucent-08)",
        "primary-translucent-12": "var(--primary-translucent-12)",
        "on-primary": "var(--on-primary)",
        "on-primary-translucent-08": "var(--on-primary-translucent-08)",
        "on-primary-translucent-12": "var(--on-primary-translucent-12)",
        "primary-container": "var(--primary-container)",
        "on-primary-container": "var(--on-primary-container)",
        secondary: "var(--secondary)",
        "secondary-translucent-08": "var(--secondary-translucent-08)",
        "secondary-translucent-12": "var(--secondary-translucent-12)",
        "on-secondary": "var(--on-secondary)",
        "on-secondary-translucent-08": "var(--on-secondary-translucent-08)",
        "on-secondary-translucent-12": "var(--on-secondary-translucent-12)",
        "secondary-container": "var(--secondary-container)",
        "on-secondary-container": "var(--on-secondary-container)",
        tertiary: "var(--tertiary)",
        "tertiary-translucent-08": "var(--tertiary-translucent-08)",
        "tertiary-translucent-12": "var(--tertiary-translucent-12)",
        "on-tertiary": "var(--on-tertiary)",
        "on-tertiary-translucent-08": "var(--on-tertiary-translucent-08)",
        "on-tertiary-translucent-12": "var(--on-tertiary-translucent-12)",
        "tertiary-container": "var(--tertiary-container)",
        "on-tertiary-container": "var(--on-tertiary-container)",
        error: "var(--error)",
        "error-container": "var(--error-container)",
        "on-error": "var(--on-error)",
        "on-error-container": "var(--on-error-container)",
        background: "var(--background)",
        "on-background": "var(--on-background)",
        surface: "var(--surface)",
        "on-surface": "var(--on-surface)",
        "surface-variant": "var(--surface-variant)",
        "on-surface-variant": "var(--on-surface-variant)",
        outline: "var(--outline)",
        "inverse-on-surface": "var(--inverse-on-surface)",
        "inverse-surface": "var(--inverse-surface)",
        "inverse-primary": "var(--inverse-primary)",
        shadow: "var(--shadow)",
        surface1: "var(--surface1)",
        surface2: "var(--surface2)",
        surface3: "var(--surface3)",
        surface4: "var(--surface4)",
        surface5: "var(--surface5)",
        black: "var(--black)",
        white: "var(--white)",
      },
      fontSize: {
        xs: "0.6875rem",
        sm: "0.75rem",
        base: "0.875rem",
        lg: "1rem",
        xl: "1.125rem",
        "2xl": "1.375rem",
        "3xl": "1.5rem",
        "4xl": "1.75rem",
        "5xl": "2rem",
        "6xl": "2.25rem",
        "7xl": "2.8125rem",
        "8xl": "3.5625rem",
        "9xl": "4rem",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
      },
      borderRadius: {
        none: "0",
        xs: "0.0625rem",
        sm: "0.125rem",
        default: "0.1875rem",
        lg: "0.3125rem",
        xl: "0.75rem",
        "2xl": "1.125rem",
        "3xl": "1.25rem",
        "4xl": "1.5rem",
        "5xl": "1.625rem",
        "6xl": "1.75rem",
        "7xl": "1.875rem",
        "8xl": "2.25rem",
        "9xl": "2.5rem",
        "10xl": "3.125rem",
        full: "9999px",
      },
      boxShadow: {
        DEFAULT:
          "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
        md: "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)",
        lg: "0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)",
        xl: "0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px rgba(0, 0, 0, 0.3)",
        "2xl":
          "0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3)",
      },
    },
    screens: {
      sm: "600px",
      md: "905px",
      lg: "1440px",
    },
  },
  plugins: [],
};