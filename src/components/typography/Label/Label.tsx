import { cn } from '@/lib/cn';
import { forwardRef, memo } from 'react';
import { BaseText } from '../BaseText';
import type { LabelProps } from './Label.types';

const REQUIRED_CLASSES = 'text-[color:var(--component-label-required-color)] ml-[length:var(--component-label-required-spacing)]';

/**
 * Label component for form field labels.
 * A thin wrapper around BaseText with form-specific features.
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Email Address</Label>
 * <Label htmlFor="name" required>Full Name</Label>
 * <Label disabled>Disabled Field</Label>
 * ```
 */
export const Label = memo(
  forwardRef<HTMLLabelElement, LabelProps>(function Label(
    {
      size = 'small',
      weight = 'medium',
      color = 'primary',
      required = false,
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) {
    const effectiveColor = disabled ? 'disabled' : color;

    return (
      <BaseText
        ref={ref}
        as="label"
        size={size}
        weight={weight}
        color={effectiveColor}
        className={cn(
          'inline-block',
          disabled && 'cursor-not-allowed opacity-[var(--semantic-opacity-disabled)]',
          className
        )}
        {...props}
      >
        {children}
        {required && !disabled && (
          <span className={REQUIRED_CLASSES} aria-label="required">
            *
          </span>
        )}
      </BaseText>
    );
  })
);

Label.displayName = 'Label';
