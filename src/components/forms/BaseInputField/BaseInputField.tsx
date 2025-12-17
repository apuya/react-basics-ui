import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef, type ReactNode, type CSSProperties } from 'react';
import {
  getBaseInputClasses,
  getSizeClasses,
  getStateClasses,
  getIconWrapperClasses,
  getLeadingIconStyle,
  getTrailingIconStyle,
  getSuffixStyle,
  getInputPadding,
} from './BaseInputField.styles';

export type BaseInputSize = 'small' | 'default' | 'large';
export type BaseInputVariant = 'input' | 'searchbar';

export interface BaseInputFieldProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
  /** Size variant of the input */
  size?: BaseInputSize;
  /** Visual variant (different styling for input vs searchbar) */
  variant?: BaseInputVariant;
  /** Indicates validation error state */
  error?: boolean;
  /** Icon displayed at the start of the input */
  leadingIcon?: ReactNode;
  /** Icon displayed at the end of the input */
  trailingIcon?: ReactNode;
  /** Suffix text displayed inside the input, aligned right (e.g., "kg", "cm", "$") */
  suffix?: string;
  /** Additional className for the wrapper element */
  wrapperClassName?: string;
  /** CSS variable prefix for theming (e.g., 'input', 'searchbar', 'autocomplete') */
  cssPrefix?: string;
  /** Custom input styles */
  inputStyle?: CSSProperties;
}

/**
 * BaseInputField - Shared base component for Input, SearchBar, and Autocomplete
 * 
 * Handles common input rendering logic including:
 * - Icon positioning (leading/trailing)
 * - Sizing variants
 * - Error/disabled states
 * - Suffix support
 * - Dynamic padding calculations
 */
export const BaseInputField = memo(
  forwardRef<HTMLInputElement, BaseInputFieldProps>(function BaseInputField(
    {
      size = 'default',
      variant = 'input',
      error = false,
      leadingIcon,
      trailingIcon,
      suffix,
      className,
      wrapperClassName,
      disabled,
      cssPrefix = 'input',
      inputStyle,
      ...rest
    },
    ref
  ) {
    // Combined input classes
    const inputClasses = useMemo(
      () => cn(
        getBaseInputClasses(cssPrefix, variant),
        getSizeClasses(cssPrefix, size),
        getStateClasses(cssPrefix, error, variant),
        className
      ),
      [cssPrefix, variant, size, error, className]
    );

    // Dynamic padding based on icons/suffix
    const computedInputStyle = useMemo(
      () => {
        const padding = getInputPadding(cssPrefix, size, !!leadingIcon, !!trailingIcon, !!suffix);
        return { ...padding, ...inputStyle };
      },
      [cssPrefix, size, leadingIcon, trailingIcon, suffix, inputStyle]
    );

    // Icon wrapper classes
    const iconWrapperClasses = useMemo(
      () => getIconWrapperClasses(cssPrefix, size),
      [cssPrefix, size]
    );

    // Icon styles
    const leadingIconStyle = useMemo(() => getLeadingIconStyle(cssPrefix), [cssPrefix]);
    const trailingIconStyle = useMemo(() => getTrailingIconStyle(cssPrefix), [cssPrefix]);
    const suffixStyle = useMemo(() => getSuffixStyle(cssPrefix), [cssPrefix]);

    return (
      <div
        className={cn('relative w-full', wrapperClassName)}
        data-size={size}
        data-error={error || undefined}
        data-disabled={disabled || undefined}
      >
        {leadingIcon && (
          <span
            className={iconWrapperClasses}
            style={leadingIconStyle}
            aria-hidden="true"
          >
            {leadingIcon}
          </span>
        )}

        <input
          ref={ref}
          disabled={disabled}
          className={inputClasses}
          style={computedInputStyle}
          aria-invalid={error || undefined}
          {...rest}
        />

        {trailingIcon && (
          <span
            className={iconWrapperClasses}
            style={trailingIconStyle}
            aria-hidden="true"
          >
            {trailingIcon}
          </span>
        )}

        {suffix && !trailingIcon && (
          <span
            className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none select-none"
            style={suffixStyle}
            aria-hidden="true"
          >
            {suffix}
          </span>
        )}
      </div>
    );
  })
);

BaseInputField.displayName = 'BaseInputField';
