import {
  type ComponentPropsWithoutRef,
  forwardRef,
  memo,
  useMemo,
} from 'react';
import { cn } from '@/lib';
import {
  FILL_BASE_CLASSES,
  type ProgressSize,
  type ProgressVariant,
  SIZE_STYLES,
  TRACK_BASE_CLASSES,
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
    const clampedValue = useMemo(
      () => Math.min(Math.max(0, value), max),
      [value, max]
    );

    // Calculate percentage
    const percentage = useMemo(
      () => (clampedValue / max) * 100,
      [clampedValue, max]
    );

    const trackClasses = useMemo(
      () => cn(TRACK_BASE_CLASSES, SIZE_STYLES[size], className),
      [size, className]
    );

    const fillClasses = useMemo(
      () => cn(FILL_BASE_CLASSES, VARIANT_STYLES[variant]),
      [variant]
    );

    return (
      <div className="w-full">
        <div
          ref={ref}
          className={trackClasses}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
          {...rest}
        >
          <div
            className={fillClasses}
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
        {showValue && (
          <div
            className="mt-1 text-xs text-[var(--semantic-text-secondary)] text-right"
            aria-hidden="true"
          >
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    );
  })
);

Progress.displayName = 'Progress';

export type { ProgressSize, ProgressVariant };
