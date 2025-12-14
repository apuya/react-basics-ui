/**
 * Icon - Wrapper for react-icons with consistent sizing, colors, and accessibility.
 * Decorative by default (aria-hidden), meaningful when aria-label provided.
 */
import { cn } from '@/lib/cn';
import { forwardRef, memo } from 'react';
import { COLOR_STYLES, SIZE_STYLES } from './Icon.styles';
import type { IconProps } from './Icon.types';

export const Icon = memo(
  forwardRef<HTMLSpanElement, IconProps>(function Icon(
    {
      icon: IconComponent,
      size = 'md',
      color = 'inherit',
      className,
      'aria-label': ariaLabel,
      'aria-hidden': ariaHidden = !ariaLabel,
      ...rest
    },
    ref
  ) {
    return (
      <span
        ref={ref}
        role={ariaLabel ? 'img' : undefined}
        aria-label={ariaLabel}
        aria-hidden={ariaHidden}
        className={cn(
          'inline-flex items-center justify-center',
          SIZE_STYLES[size],
          COLOR_STYLES[color],
          className
        )}
        {...rest}
      >
        <IconComponent className="h-full w-full" />
      </span>
    );
  })
);

Icon.displayName = 'Icon';
