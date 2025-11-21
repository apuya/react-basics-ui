import { type IconType } from 'react-icons';
import { cn } from '@/lib/cn';
import { forwardRef, memo } from 'react';
import { COLOR_STYLES, SIZE_STYLES } from './Icon.styles';

export type IconSize = keyof typeof SIZE_STYLES;
export type IconColor = keyof typeof COLOR_STYLES;

export interface IconProps {
  icon: IconType;
  size?: IconSize;
  color?: IconColor;
  className?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}

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
