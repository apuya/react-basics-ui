import { cn } from '@/lib/cn';
import { forwardRef, memo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { BiUser } from 'react-icons/bi';
import type { IconType } from 'react-icons';
import { FALLBACK_CLASSES, FALLBACK_TEXT_SIZE, type AvatarSize } from './Avatar.styles';

export interface AvatarFallbackProps extends ComponentPropsWithoutRef<'div'> {
  icon?: IconType;
  children?: ReactNode;
  size?: AvatarSize;
}

export const AvatarFallback = memo(
  forwardRef<HTMLDivElement, AvatarFallbackProps>(
    ({ icon, children, size = 'md', className, ...props }, ref) => {
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
