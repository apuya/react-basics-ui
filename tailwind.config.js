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
  safelist: [
    // Spacing utilities used in .styles.ts files
    'py-4', 'px-4', 'pb-4', 'pt-4',
    'py-3', 'px-3', 'pb-3', 'pt-3',
    'py-2', 'px-2', 'pb-2', 'pt-2',
    'p-4', 'p-3', 'p-2',
    'gap-4', 'gap-3', 'gap-2', 'gap-1',
    'mb-2', 'mb-1', 'mt-2', 'mt-1',
    'mx-2', 'my-2',
    // Size utilities
    'size-4', 'size-5', 'size-6',
    'h-8', 'h-10', 'h-12',
    'w-full',
    // Layout utilities
    'flex', 'items-center', 'justify-between',
    // Border radius
    'rounded', 'rounded-t', 'rounded-b', 'rounded-sm', 'rounded-lg',
    // Duration
    'duration-200', 'duration-150', 'duration-300',
    // Font
    'text-sm', 'text-base', 'font-medium', 'font-semibold',
  ],
  theme: {},
  plugins: [],
};
