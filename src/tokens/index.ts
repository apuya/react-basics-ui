/**
 * Design Token Constants
 * These mirror the CSS custom properties for use in JavaScript/TypeScript
 */

// Color tokens - use these for type-safe color references
export const colors = {
  brand: {
    primary: {
      default: 'var(--semantic-brand-primary-default)',
      hover: 'var(--semantic-brand-primary-hover)',
      active: 'var(--semantic-brand-primary-active)',
      disabled: 'var(--semantic-brand-primary-disabled)',
    },
    secondary: {
      default: 'var(--semantic-brand-secondary-default)',
      hover: 'var(--semantic-brand-secondary-hover)',
      active: 'var(--semantic-brand-secondary-active)',
      disabled: 'var(--semantic-brand-secondary-disabled)',
      dark: 'var(--semantic-brand-secondary-dark)',
    },
  },
  status: {
    success: {
      default: 'var(--semantic-status-success-default)',
      light: 'var(--semantic-status-success-light)',
      dark: 'var(--semantic-status-success-dark)',
      alpha: 'var(--semantic-status-success-alpha)',
    },
    warning: {
      default: 'var(--semantic-status-warning-default)',
      light: 'var(--semantic-status-warning-light)',
      dark: 'var(--semantic-status-warning-dark)',
      alpha: 'var(--semantic-status-warning-alpha)',
    },
    error: {
      default: 'var(--semantic-status-error-default)',
      light: 'var(--semantic-status-error-light)',
      dark: 'var(--semantic-status-error-dark)',
      alpha: 'var(--semantic-status-error-alpha)',
    },
    info: {
      default: 'var(--semantic-status-info-default)',
      light: 'var(--semantic-status-info-light)',
      dark: 'var(--semantic-status-info-dark)',
      alpha: 'var(--semantic-status-info-alpha)',
    },
  },
  surface: {
    base: 'var(--semantic-surface-base)',
    elevated: 'var(--semantic-surface-elevated)',
    overlay: 'var(--semantic-surface-overlay)',
    inverse: 'var(--semantic-surface-inverse)',
    hover: 'var(--semantic-surface-hover)',
    active: 'var(--semantic-surface-active)',
  },
  text: {
    primary: 'var(--semantic-text-primary)',
    secondary: 'var(--semantic-text-secondary)',
    tertiary: 'var(--semantic-text-tertiary)',
    inverse: 'var(--semantic-text-inverse)',
    disabled: 'var(--semantic-text-disabled)',
    error: 'var(--semantic-text-error)',
  },
  border: {
    default: 'var(--semantic-border-default)',
    subtle: 'var(--semantic-border-subtle)',
    emphasis: 'var(--semantic-border-emphasis)',
    focus: 'var(--semantic-border-focus)',
    error: 'var(--semantic-border-error)',
    disabled: 'var(--semantic-border-disabled)',
  },
} as const;

// Spacing tokens
export const spacing = {
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
} as const;

// Border radius tokens
export const radius = {
  none: 'var(--semantic-radius-none)',
  xs: 'var(--semantic-radius-xs)',
  sm: 'var(--semantic-radius-sm)',
  md: 'var(--semantic-radius-md)',
  lg: 'var(--semantic-radius-lg)',
  xl: 'var(--semantic-radius-xl)',
  '2xl': 'var(--semantic-radius-2xl)',
  '3xl': 'var(--semantic-radius-3xl)',
  full: 'var(--semantic-radius-full)',
} as const;

// Shadow tokens
export const shadows = {
  none: 'var(--semantic-shadow-none)',
  xs: 'var(--semantic-shadow-xs)',
  sm: 'var(--semantic-shadow-sm)',
  md: 'var(--semantic-shadow-md)',
  lg: 'var(--semantic-shadow-lg)',
  xl: 'var(--semantic-shadow-xl)',
  '2xl': 'var(--semantic-shadow-2xl)',
  inner: 'var(--semantic-shadow-inner)',
} as const;

// Typography tokens
export const typography = {
  size: {
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
  weight: {
    thin: 'var(--semantic-text-weight-thin)',
    light: 'var(--semantic-text-weight-light)',
    regular: 'var(--semantic-text-weight-regular)',
    medium: 'var(--semantic-text-weight-medium)',
    semibold: 'var(--semantic-text-weight-semibold)',
    bold: 'var(--semantic-text-weight-bold)',
    extrabold: 'var(--semantic-text-weight-extrabold)',
    black: 'var(--semantic-text-weight-black)',
  },
  family: {
    heading: 'var(--semantic-typography-font-family-heading)',
    body: 'var(--semantic-typography-font-family-body)',
    mono: 'var(--semantic-typography-font-family-monospace)',
  },
} as const;

// Animation tokens
export const animation = {
  duration: {
    instant: 'var(--semantic-duration-instant)',
    fast: 'var(--semantic-duration-fast)',
    normal: 'var(--semantic-duration-normal)',
    slow: 'var(--semantic-duration-slow)',
    slowest: 'var(--semantic-duration-slowest)',
  },
  easing: {
    default: 'var(--semantic-easing-default)',
    linear: 'var(--semantic-easing-linear)',
    in: 'var(--semantic-easing-in)',
    out: 'var(--semantic-easing-out)',
    spring: 'var(--semantic-easing-spring)',
  },
} as const;

// Z-index tokens
export const zIndex = {
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
} as const;

// Export all tokens
export const tokens = {
  colors,
  spacing,
  radius,
  shadows,
  typography,
  animation,
  zIndex,
} as const;

export default tokens;
