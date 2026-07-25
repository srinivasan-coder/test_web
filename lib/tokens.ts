/**
 * TypeScript mirror of the CSS design tokens in `styles/tokens.css`.
 * Prefer CSS variables in components; use these when JS needs the raw values.
 */

export const colors = {
  background: "#FFFFFF",
  surface: "#F8F8FA",
  ink: "#111827",
  slate: "#6B7280",
  accent: "#2563EB",
  accentHover: "#1D4ED8",
  border: "#E5E7EB",
  white: "#FFFFFF",
  destructive: "#DC2626",
} as const;

export const fonts = {
  heading: "var(--font-playfair), ui-serif, Georgia, serif",
  body: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
} as const;

export const radii = {
  base: "1rem",
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
  "2xl": "2rem",
  full: "9999px",
} as const;

export const shadows = {
  xs: "0 1px 2px 0 rgb(17 24 39 / 0.03)",
  sm: "0 1px 2px 0 rgb(17 24 39 / 0.04), 0 1px 3px -1px rgb(17 24 39 / 0.05)",
  md: "0 4px 16px -4px rgb(17 24 39 / 0.08), 0 2px 6px -2px rgb(17 24 39 / 0.04)",
  lg: "0 16px 40px -12px rgb(17 24 39 / 0.12), 0 8px 16px -8px rgb(17 24 39 / 0.06)",
  xl: "0 28px 64px -16px rgb(17 24 39 / 0.14), 0 12px 24px -12px rgb(17 24 39 / 0.08)",
} as const;

export const spacing = {
  sectionY: {
    mobile: "5rem",
    tablet: "7rem",
    desktop: "8rem",
  },
  headerHeight: "4.5rem",
  containerMax: "80rem",
  grid: 8,
} as const;

export const motion = {
  easeOutSoft: [0.16, 1, 0.3, 1] as const,
  duration: {
    fast: 0.2,
    base: 0.35,
    slow: 0.55,
    reveal: 0.7,
  },
} as const;

export const tokens = {
  colors,
  fonts,
  radii,
  shadows,
  spacing,
  motion,
} as const;

export type ColorToken = keyof typeof colors;
export type RadiusToken = keyof typeof radii;
export type ShadowToken = keyof typeof shadows;
