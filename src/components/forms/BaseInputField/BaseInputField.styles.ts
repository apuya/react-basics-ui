import type { CSSProperties } from 'react';

/**
 * Generates base input classes with dynamic CSS variable prefix
 * Note: border-radius is applied via inline style in getInputPadding for JIT compatibility
 */
export const getBaseInputClasses = (cssPrefix: string, variant: 'input' | 'searchbar') => {
  const common = `w-full border transition-colors placeholder:text-[color:var(--component-${cssPrefix}-text-placeholder)] focus:outline-none focus-visible:ring-[length:var(--semantic-focus-ring-width)] focus-visible:ring-offset-[length:var(--semantic-focus-ring-offset)] disabled:cursor-not-allowed disabled:opacity-[var(--semantic-opacity-disabled)]`;
  
  if (variant === 'searchbar') {
    return `${common} focus-visible:ring-[color:var(--component-${cssPrefix}-focus-ring-color)] disabled:bg-[color:var(--component-${cssPrefix}-bg-disabled)] disabled:text-[color:var(--component-${cssPrefix}-text-disabled)] [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none`;
  }
  
  return `${common} focus-visible:ring-[color:var(--semantic-border-focus)] disabled:bg-[color:var(--component-${cssPrefix}-bg-disabled)] disabled:text-[color:var(--component-${cssPrefix}-text-disabled)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`;
};

/**
 * Generates size classes with dynamic CSS variable prefix
 */
export const getSizeClasses = (cssPrefix: string, size: 'small' | 'default' | 'large') => 
  `text-[length:var(--component-${cssPrefix}-font-size-${size})]`;

/**
 * Generates state classes with dynamic CSS variable prefix
 */
export const getStateClasses = (cssPrefix: string, error: boolean, variant: 'input' | 'searchbar') => {
  const prefix = `--component-${cssPrefix}`;
  
  if (error) {
    return `border-[color:var(${prefix}-border-error)] focus:border-[color:var(${prefix}-border-error)]`;
  }
  
  if (variant === 'input') {
    return `bg-[color:var(${prefix}-bg-default)] text-[color:var(${prefix}-text-default)] border-[color:var(${prefix}-border-default)] hover:border-[color:var(${prefix}-border-hover)] focus:border-[color:var(${prefix}-border-focus)]`;
  }
  
  // For searchbar variants, state classes are handled via variant prop in parent
  return '';
};

/**
 * Generates icon wrapper classes with dynamic CSS variable prefix
 */
export const getIconWrapperClasses = (cssPrefix: string, size: 'small' | 'default' | 'large') => 
  `absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-[length:var(--component-${cssPrefix}-icon-size-${size})] h-[length:var(--component-${cssPrefix}-icon-size-${size})] pointer-events-none [&>*]:h-full [&>*]:w-full [&>*]:text-inherit`;

/**
 * Generates leading icon styles with dynamic CSS variable prefix
 */
export const getLeadingIconStyle = (cssPrefix: string): CSSProperties => ({
  left: `var(--component-${cssPrefix}-padding-inline)`,
  color: `var(--component-${cssPrefix}-text-placeholder)`,
});

/**
 * Generates trailing icon styles with dynamic CSS variable prefix
 */
export const getTrailingIconStyle = (cssPrefix: string): CSSProperties => ({
  right: `var(--component-${cssPrefix}-padding-inline)`,
  color: `var(--component-${cssPrefix}-text-placeholder)`,
});

/**
 * Generates suffix styles with dynamic CSS variable prefix and fallback to input
 */
export const getSuffixStyle = (cssPrefix: string): CSSProperties => ({
  color: `var(--component-${cssPrefix}-suffix-color, var(--component-input-suffix-color))`,
  fontSize: `var(--component-${cssPrefix}-suffix-font-size, var(--component-input-suffix-font-size))`,
  fontWeight: `var(--component-${cssPrefix}-suffix-font-weight, var(--component-input-suffix-font-weight))`,
  paddingLeft: `var(--component-${cssPrefix}-suffix-padding-inline, var(--component-input-suffix-padding-inline))`,
  paddingRight: `var(--component-${cssPrefix}-padding-inline)`,
});

/**
 * Calculates dynamic padding and other inline styles based on icons and suffix
 */
export const getInputPadding = (
  cssPrefix: string,
  size: 'small' | 'default' | 'large',
  hasLeadingIcon: boolean,
  hasTrailingIcon: boolean,
  hasSuffix: boolean
): CSSProperties => {
  const hasTrailing = hasSuffix || hasTrailingIcon;
  
  return {
    height: `var(--component-${cssPrefix}-height-${size})`,
    borderRadius: `var(--component-${cssPrefix}-radius)`,
    transitionDuration: `var(--component-${cssPrefix}-transition-duration)`,
    paddingLeft: hasLeadingIcon
      ? `calc(var(--component-${cssPrefix}-padding-inline) * 2 + var(--component-${cssPrefix}-icon-size-${size}))`
      : `var(--component-${cssPrefix}-padding-inline)`,
    paddingRight: hasTrailing
      ? `calc(var(--component-${cssPrefix}-padding-inline) * 2 + var(--component-${cssPrefix}-icon-size-${size}))`
      : `var(--component-${cssPrefix}-padding-inline)`,
  };
};
