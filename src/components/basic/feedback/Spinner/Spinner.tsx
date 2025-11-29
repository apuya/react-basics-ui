import { forwardRef, memo, useMemo } from 'react';
import { cn } from '@/lib/cn';
import { BASE_CLASSES, SIZE_STYLES, BORDER_WIDTH_STYLES, COLOR_STYLES } from './Spinner.styles';

/** Available spinner sizes from extra small to extra large. */
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Available spinner color variants. */
export type SpinnerColor = 'default' | 'inverse' | 'inherit';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Size of the spinner. @default 'md' */
  size?: SpinnerSize;
  /** Color variant of the spinner. @default 'default' */
  color?: SpinnerColor;
  /** Accessible label for screen readers. @default 'Loading...' */
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
  forwardRef<HTMLSpanElement, SpinnerProps>(
    ({ size = 'md', color = 'default', label = 'Loading...', className, ...props }, ref) => {
      const spinnerClasses = useMemo(
        () => cn(BASE_CLASSES, SIZE_STYLES[size], BORDER_WIDTH_STYLES[size], COLOR_STYLES[color], className),
        [size, color, className]
      );

      return (
        <span
          ref={ref}
          role="status"
          aria-label={label}
          className={spinnerClasses}
          {...props}
        >
          <span className="sr-only">{label}</span>
        </span>
      );
    }
  )
);

Spinner.displayName = 'Spinner';
