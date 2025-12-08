/**
 * Tailwind CSS Configuration
 *
 * This library uses Tailwind v4's CSS-first configuration approach.
 * Theme extensions are defined in src/global.css via @theme blocks.
 *
 * The @theme block in global.css defines:
 * - Shared component tokens (focus ring, input base, dropdown base)
 * - Breakpoints and responsive utilities
 * - Component-specific utilities for commonly repeated patterns
 *
 * Semantic tokens (--semantic-*) are available as CSS custom properties
 * but not exposed as Tailwind utilities to keep the API surface small.
 * Use arbitrary value syntax to access them: bg-[color:var(--semantic-surface-base)]
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {},
  plugins: [],
};
