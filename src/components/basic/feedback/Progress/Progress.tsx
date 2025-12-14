import {
  type ComponentPropsWithoutRef,
  forwardRef,
  memo,
} from 'react';
import { cn } from '@/lib/cn';
import {
  FILL_BASE_CLASSES,
  type ProgressSize,
  type ProgressVariant,
  SIZE_STYLES,
  TRACK_BASE_CLASSES,
  VALUE_TEXT_CLASSES,
  VARIANT_STYLES,
} from './Progress.styles';

export interface ProgressProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * The current value of the progress (0-100)
   */
  value: number;
  /**
   * The maximum value of the progress
   * @default 100
   */
  max?: number;
  /**
   * The size variant of the progress bar
   * @default 'default'
   */
  size?: ProgressSize;
  /**
   * The color variant of the progress bar
   * @default 'default'
   */
  variant?: ProgressVariant;
  /**
   * Whether to show the progress value as text
   * @default false
   */
  showValue?: boolean;
  /**
   * Custom label for accessibility
   */
  label?: string;
}

/**
 * Progress component for displaying progress indicators
 *
 * @example
 * ```tsx
 * <Progress value={50} />
 * <Progress value={75} variant="success" showValue />
 * <Progress value={30} size="lg" label="Upload progress" />
 * ```
 */
export const Progress = memo(
  forwardRef<HTMLDivElement, ProgressProps>(function Progress(
    {
      value,
      max = 100,
      size = 'default',
      variant = 'default',
      showValue = false,
      label,
      className,
      ...rest
    },
    ref
  ) {
    // Clamp value between 0 and max
    const clampedValue = Math.min(Math.max(0, value), max);

    // Calculate percentage
    const percentage = (clampedValue / max) * 100;

    const trackClasses = cn(TRACK_BASE_CLASSES, SIZE_STYLES[size], className);
    const fillClasses = cn(FILL_BASE_CLASSES, VARIANT_STYLES[variant]);

    return (
      <div
        ref={ref}
        className={trackClasses}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        data-size={size}
        data-variant={variant}
        {...rest}
      >
        <div
          className={fillClasses}
          style={{ width: `${percentage}%` }}
        />
        {showValue && (
          <span className={VALUE_TEXT_CLASSES} aria-hidden="true">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  })
);

Progress.displayName = 'Progress';

export type { ProgressSize, ProgressVariant };
