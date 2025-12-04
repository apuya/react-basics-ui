import { type ComponentPropsWithoutRef, forwardRef, memo, useMemo } from 'react';
import { cn } from '@/lib/cn';
import { ANIMATION_STYLE, BASE_CLASSES, COLOR_STYLES, SIZE_STYLES } from './Spinner.styles';

/** Available spinner sizes from extra small to extra large. */
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Available spinner color variants. */
export type SpinnerColor = 'default' | 'inverse' | 'inherit';

export interface SpinnerProps extends ComponentPropsWithoutRef<'span'> {
  /**
   * Size of the spinner
   * @default 'md'
   */
  size?: SpinnerSize;
  /**
   * Color variant of the spinner
   * @default 'default'
   */
  color?: SpinnerColor;
  /**
   * Accessible label for screen readers
   * @default 'Loading...'
   */
  label?: string;
}

/**
 * A loading spinner component that provides visual feedback during async operations.
 *
 * @example
 * ```tsx
 * <Spinner size="md" color="default" label="Loading data..." />
 * ```
 */
export const Spinner = memo(
  forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
    { size = 'md', color = 'default', label = 'Loading...', className, style, ...rest },
    ref
  ) {
    const spinnerClasses = useMemo(() => cn(BASE_CLASSES, className), [className]);

    const spinnerStyles = useMemo(
      () => ({
        ...SIZE_STYLES[size],
        ...COLOR_STYLES[color],
        ...ANIMATION_STYLE,
        ...style,
      }),
      [size, color, style]
    );

    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        className={spinnerClasses}
        style={spinnerStyles}
        data-size={size}
        data-color={color}
        {...rest}
      >
        <span className="sr-only">{label}</span>
      </span>
    );
  })
);

Spinner.displayName = 'Spinner';
