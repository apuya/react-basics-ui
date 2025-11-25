import { cn } from '@/lib/cn';
import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
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
  size?: LabelSize;
  weight?: LabelWeight;
  color?: LabelColor;
  required?: boolean;
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
    return (
      <label
        ref={ref}
        className={cn(
          BASE_CLASSES,
          SIZE_STYLES[size],
          WEIGHT_STYLES[weight],
          disabled ? COLOR_STYLES.disabled : COLOR_STYLES[color],
          disabled && STATE_STYLES.disabled,
          className
        )}
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
