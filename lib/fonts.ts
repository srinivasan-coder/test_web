import { Inter, Playfair_Display } from "next/font/google";

/**
 * Body typeface — Inter.
 * Exposed as the `--font-inter` CSS variable and mapped to `font-sans`.
 */
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
  adjustFontFallback: true,
});

/**
 * Display typeface — Playfair Display.
 * Exposed as the `--font-playfair` CSS variable and mapped to `font-serif`.
 * Weights trimmed to what the UI actually uses.
 */
export const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  adjustFontFallback: true,
});

export const fontVariables = `${inter.variable} ${playfair.variable}`;
