import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import {
  BASE_CLASSES,
  COLOR_STYLES,
  REQUIRED_CLASSES,
  SIZE_STYLES,
  STATE_STYLES,
  WEIGHT_STYLES,
} from './Label.styles';

export type LabelSize = 'small' | 'default' | 'large';
export type LabelWeight = 'normal' | 'medium' | 'semibold';
export type LabelColor = 'default' | 'secondary' | 'error' | 'disabled';

export interface LabelProps extends ComponentPropsWithoutRef<'label'> {
  /** Size variant of the label */
  size?: LabelSize;
  /** Font weight of the label */
  weight?: LabelWeight;
  /** Color variant of the label */
  color?: LabelColor;
  /** Whether to show required indicator */
  required?: boolean;
  /** Whether the label is disabled */
  disabled?: boolean;
}

export const Label = memo(
  forwardRef<HTMLLabelElement, LabelProps>(function Label(
    {
      size = 'default',
      weight = 'medium',
      color = 'default',
      required = false,
      disabled = false,
      className,
      children,
      ...rest
    },
    ref
  ) {
    const labelClasses = useMemo(
      () => cn(
        BASE_CLASSES,
        SIZE_STYLES[size],
        WEIGHT_STYLES[weight],
        COLOR_STYLES[disabled ? 'disabled' : color],
        disabled && STATE_STYLES.disabled,
        className
      ),
      [size, weight, color, disabled, className]
    );

    return (
      <label
        ref={ref}
        className={labelClasses}
        data-size={size}
        data-color={disabled ? 'disabled' : color}
        data-disabled={disabled || undefined}
        {...rest}
      >
        {children}
        {required && !disabled && (
          <span className={REQUIRED_CLASSES} aria-label="required">
            *
          </span>
        )}
      </label>
    );
  })
);

Label.displayName = 'Label';
