import { cn } from '@/lib/cn';
import { forwardRef, memo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { BiUser } from 'react-icons/bi';
import type { IconType } from 'react-icons';
import { FALLBACK_CLASSES, FALLBACK_TEXT_SIZE, type AvatarSize } from './Avatar.styles';
import { useAvatarContext } from './Avatar';

export interface AvatarFallbackProps extends ComponentPropsWithoutRef<'div'> {
  /** Custom icon to display (defaults to BiUser) */
  icon?: IconType;
  /** Content to display (initials or custom content) */
  children?: ReactNode;
  /** @deprecated Size is now inherited from Avatar context. This prop will be removed in a future version. */
  size?: AvatarSize;
}

export const AvatarFallback = memo(
  forwardRef<HTMLDivElement, AvatarFallbackProps>(
    ({ icon, children, size: sizeProp, className, ...props }, ref) => {
      const context = useAvatarContext();
      const size = sizeProp ?? context.size;
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
