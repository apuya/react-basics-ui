/**
 * Avatar.Fallback - Displays initials, custom icon, or default user icon.
 * Inherits size from Avatar context for consistent styling.
 */
import { cn } from '@/lib/cn';
import { forwardRef, memo } from 'react';
import { BiUser } from 'react-icons/bi';
import { FALLBACK_CLASSES, FALLBACK_TEXT_SIZE } from './Avatar.styles';
import type { AvatarFallbackProps } from './Avatar.types';
import { useAvatarContext } from './Avatar';

export const AvatarFallback = memo(
  forwardRef<HTMLDivElement, AvatarFallbackProps>(
    ({ icon, children, className, ...props }, ref) => {
      const context = useAvatarContext();
      const size = context.size;
      const Icon = icon || BiUser;

      return (
        <div
          ref={ref}
          className={cn(FALLBACK_CLASSES, FALLBACK_TEXT_SIZE[size], className)}
          aria-hidden="true"
          {...props}
        >
          {children || <Icon className="h-[50%] w-[50%]" />}
        </div>
      );
    }
  )
);
AvatarFallback.displayName = 'Avatar.Fallback';
