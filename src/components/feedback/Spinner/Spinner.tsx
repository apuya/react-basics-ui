import { forwardRef, memo, useMemo } from 'react';
import { cn } from '@/lib/cn';
import { BASE_CLASSES, SIZE_STYLES, COLOR_STYLES } from './Spinner.styles';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerColor = 'default' | 'inverse' | 'inherit';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  color?: SpinnerColor;
  label?: string;
}

export const Spinner = memo(
  forwardRef<HTMLSpanElement, SpinnerProps>(
    ({ size = 'md', color = 'default', label = 'Loading...', className, ...props }, ref) => {
      const spinnerClasses = useMemo(
        () => cn(BASE_CLASSES, SIZE_STYLES[size], COLOR_STYLES[color], className),
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
