/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: {
          DEFAULT: 'var(--semantic-brand-primary-default)',
          hover: 'var(--semantic-brand-primary-hover)',
          active: 'var(--semantic-brand-primary-active)',
          disabled: 'var(--semantic-brand-primary-disabled)',
        },
        secondary: {
          DEFAULT: 'var(--semantic-brand-secondary-default)',
          hover: 'var(--semantic-brand-secondary-hover)',
          active: 'var(--semantic-brand-secondary-active)',
          disabled: 'var(--semantic-brand-secondary-disabled)',
          dark: 'var(--semantic-brand-secondary-dark)',
        },

        // Status Colors
        success: {
          DEFAULT: 'var(--semantic-status-success-default)',
          light: 'var(--semantic-status-success-light)',
          dark: 'var(--semantic-status-success-dark)',
          alpha: 'var(--semantic-status-success-alpha)',
        },
        warning: {
          DEFAULT: 'var(--semantic-status-warning-default)',
          light: 'var(--semantic-status-warning-light)',
          dark: 'var(--semantic-status-warning-dark)',
          alpha: 'var(--semantic-status-warning-alpha)',
        },
        error: {
          DEFAULT: 'var(--semantic-status-error-default)',
          light: 'var(--semantic-status-error-light)',
          dark: 'var(--semantic-status-error-dark)',
          alpha: 'var(--semantic-status-error-alpha)',
        },
        info: {
          DEFAULT: 'var(--semantic-status-info-default)',
          light: 'var(--semantic-status-info-light)',
          dark: 'var(--semantic-status-info-dark)',
          alpha: 'var(--semantic-status-info-alpha)',
        },

        // Surface Colors
        surface: {
          base: 'var(--semantic-surface-base)',
          elevated: 'var(--semantic-surface-elevated)',
          overlay: 'var(--semantic-surface-overlay)',
          inverse: 'var(--semantic-surface-inverse)',
          hover: 'var(--semantic-surface-hover)',
          active: 'var(--semantic-surface-active)',
        },

        // Text Colors
        text: {
          primary: 'var(--semantic-text-primary)',
          secondary: 'var(--semantic-text-secondary)',
          tertiary: 'var(--semantic-text-tertiary)',
          inverse: 'var(--semantic-text-inverse)',
          disabled: 'var(--semantic-text-disabled)',
          error: 'var(--semantic-text-error)',
        },

        // Border Colors
        border: {
          DEFAULT: 'var(--semantic-border-default)',
          subtle: 'var(--semantic-border-subtle)',
          emphasis: 'var(--semantic-border-emphasis)',
          focus: 'var(--semantic-border-focus)',
          error: 'var(--semantic-border-error)',
          disabled: 'var(--semantic-border-disabled)',
        },

        // Accent Colors
        accent: {
          gold: 'var(--semantic-accent-gold-default)',
          green: 'var(--semantic-accent-green-default)',
          indigo: 'var(--semantic-accent-indigo-default)',
          navy: 'var(--semantic-accent-navy-default)',
          orange: 'var(--semantic-accent-orange-default)',
          pink: 'var(--semantic-accent-pink-default)',
          purple: 'var(--semantic-accent-purple-default)',
          red: 'var(--semantic-accent-red-default)',
          sand: 'var(--semantic-accent-sand-default)',
          teal: 'var(--semantic-accent-teal-default)',
          yellow: 'var(--semantic-accent-yellow-default)',
          slate: 'var(--semantic-accent-slate-default)',
          cyan: 'var(--semantic-accent-cyan-default)',
          lime: 'var(--semantic-accent-lime-default)',
          amber: 'var(--semantic-accent-amber-default)',
          rose: 'var(--semantic-accent-rose-default)',
          violet: 'var(--semantic-accent-violet-default)',
          fuchsia: 'var(--semantic-accent-fuchsia-default)',
          emerald: 'var(--semantic-accent-emerald-default)',
          sky: 'var(--semantic-accent-sky-default)',
          zinc: 'var(--semantic-accent-zinc-default)',
        },
      },

      spacing: {
        none: 'var(--semantic-space-none)',
        tight: 'var(--semantic-space-tight)',
        compact: 'var(--semantic-space-compact)',
        default: 'var(--semantic-space-default)',
        comfortable: 'var(--semantic-space-comfortable)',
        loose: 'var(--semantic-space-loose)',
        spacious: 'var(--semantic-space-spacious)',
        generous: 'var(--semantic-space-generous)',
        expansive: 'var(--semantic-space-expansive)',
        massive: 'var(--semantic-space-massive)',
      },

      borderRadius: {
        none: 'var(--semantic-radius-none)',
        xs: 'var(--semantic-radius-xs)',
        sm: 'var(--semantic-radius-sm)',
        md: 'var(--semantic-radius-md)',
        lg: 'var(--semantic-radius-lg)',
        xl: 'var(--semantic-radius-xl)',
        '2xl': 'var(--semantic-radius-2xl)',
        '3xl': 'var(--semantic-radius-3xl)',
        full: 'var(--semantic-radius-full)',
      },

      boxShadow: {
        none: 'var(--semantic-shadow-none)',
        xs: 'var(--semantic-shadow-xs)',
        sm: 'var(--semantic-shadow-sm)',
        md: 'var(--semantic-shadow-md)',
        lg: 'var(--semantic-shadow-lg)',
        xl: 'var(--semantic-shadow-xl)',
        '2xl': 'var(--semantic-shadow-2xl)',
        inner: 'var(--semantic-shadow-inner)',
      },

      borderWidth: {
        DEFAULT: 'var(--semantic-border-width-default)',
        medium: 'var(--semantic-border-width-medium)',
        thick: 'var(--semantic-border-width-thick)',
        heavy: 'var(--semantic-border-width-heavy)',
        heaviest: 'var(--semantic-border-width-heaviest)',
      },

      fontSize: {
        caption: 'var(--semantic-text-size-caption)',
        label: 'var(--semantic-text-size-label)',
        small: 'var(--semantic-text-size-small)',
        body: 'var(--semantic-text-size-body)',
        subtitle: 'var(--semantic-text-size-subtitle)',
        h4: 'var(--semantic-text-size-h4)',
        h3: 'var(--semantic-text-size-h3)',
        h2: 'var(--semantic-text-size-h2)',
        h1: 'var(--semantic-text-size-h1)',
        display: 'var(--semantic-text-size-display)',
      },

      fontWeight: {
        thin: 'var(--semantic-text-weight-thin)',
        light: 'var(--semantic-text-weight-light)',
        regular: 'var(--semantic-text-weight-regular)',
        medium: 'var(--semantic-text-weight-medium)',
        semibold: 'var(--semantic-text-weight-semibold)',
        bold: 'var(--semantic-text-weight-bold)',
        extrabold: 'var(--semantic-text-weight-extrabold)',
        black: 'var(--semantic-text-weight-black)',
      },

      fontFamily: {
        heading: 'var(--semantic-typography-font-family-heading)',
        body: 'var(--semantic-typography-font-family-body)',
        mono: 'var(--semantic-typography-font-family-monospace)',
      },

      letterSpacing: {
        tighter: 'var(--semantic-letter-spacing-tighter)',
        tight: 'var(--semantic-letter-spacing-tight)',
        normal: 'var(--semantic-letter-spacing-normal)',
        wide: 'var(--semantic-letter-spacing-wide)',
        wider: 'var(--semantic-letter-spacing-wider)',
        widest: 'var(--semantic-letter-spacing-widest)',
      },

      lineHeight: {
        none: 'var(--semantic-line-height-none)',
        tight: 'var(--semantic-line-height-tight)',
        normal: 'var(--semantic-line-height-normal)',
        relaxed: 'var(--semantic-line-height-relaxed)',
        loose: 'var(--semantic-line-height-loose)',
      },

      transitionDuration: {
        instant: 'var(--semantic-duration-instant)',
        fast: 'var(--semantic-duration-fast)',
        normal: 'var(--semantic-duration-normal)',
        slow: 'var(--semantic-duration-slow)',
        slowest: 'var(--semantic-duration-slowest)',
      },

      transitionTimingFunction: {
        default: 'var(--semantic-easing-default)',
        linear: 'var(--semantic-easing-linear)',
        in: 'var(--semantic-easing-in)',
        out: 'var(--semantic-easing-out)',
        spring: 'var(--semantic-easing-spring)',
      },

      zIndex: {
        behind: 'var(--semantic-z-behind)',
        auto: 'var(--semantic-z-auto)',
        content: 'var(--semantic-z-content)',
        sticky: 'var(--semantic-z-sticky)',
        dropdown: 'var(--semantic-z-dropdown)',
        overlay: 'var(--semantic-z-overlay)',
        modal: 'var(--semantic-z-modal)',
        popover: 'var(--semantic-z-popover)',
        toast: 'var(--semantic-z-toast)',
        tooltip: 'var(--semantic-z-tooltip)',
        max: 'var(--semantic-z-max)',
      },

      maxWidth: {
        xs: 'var(--semantic-max-width-xs)',
        sm: 'var(--semantic-max-width-sm)',
        md: 'var(--semantic-max-width-md)',
        lg: 'var(--semantic-max-width-lg)',
        xl: 'var(--semantic-max-width-xl)',
        '2xl': 'var(--semantic-max-width-2xl)',
        prose: 'var(--semantic-max-width-prose)',
        full: 'var(--semantic-max-width-full)',
      },

      aspectRatio: {
        square: 'var(--semantic-aspect-square)',
        video: 'var(--semantic-aspect-video)',
        portrait: 'var(--semantic-aspect-portrait)',
        landscape: 'var(--semantic-aspect-landscape)',
        wide: 'var(--semantic-aspect-wide)',
        ultrawide: 'var(--semantic-aspect-ultrawide)',
      },

      scale: {
        shrink: 'var(--semantic-scale-shrink)',
        normal: 'var(--semantic-scale-normal)',
        grow: 'var(--semantic-scale-grow)',
        emphasis: 'var(--semantic-scale-emphasis)',
      },

      blur: {
        none: 'var(--semantic-blur-none)',
        sm: 'var(--semantic-blur-sm)',
        md: 'var(--semantic-blur-md)',
        lg: 'var(--semantic-blur-lg)',
        xl: 'var(--semantic-blur-xl)',
      },

      opacity: {
        disabled: 'var(--semantic-opacity-disabled)',
        hover: 'var(--semantic-opacity-hover)',
      },
    },
  },
  plugins: [],
};
