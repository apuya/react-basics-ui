import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { BASE_CLASSES, SHAPE_STYLES, SIZE_STYLES, type AvatarShape, type AvatarSize } from './Avatar.styles';
import { AvatarImage } from './AvatarImage';
import { AvatarFallback } from './AvatarFallback';

export interface AvatarProps extends ComponentPropsWithoutRef<'div'> {
  size?: AvatarSize;
  shape?: AvatarShape;
  children?: ReactNode;
}

const AvatarRoot = memo(
  forwardRef<HTMLDivElement, AvatarProps>(
    ({ size = 'md', shape = 'circular', className, children, ...props }, ref) => {
      const avatarClasses = useMemo(
        () => cn(BASE_CLASSES, SIZE_STYLES[size], SHAPE_STYLES[shape], className),
        [size, shape, className]
      );

      return (
        <div
          ref={ref}
          data-size={size}
          data-shape={shape}
          className={avatarClasses}
          {...props}
        >
          {children}
        </div>
      );
    }
  )
);
AvatarRoot.displayName = 'Avatar';

export const Avatar = Object.assign(AvatarRoot, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
});
