import { cn } from '@/lib/cn';
import { createComponentContext } from '@/lib/createComponentContext';
import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { BASE_CLASSES, SHAPE_STYLES, SIZE_STYLES, type AvatarShape, type AvatarSize } from './Avatar.styles';
import { AvatarImage } from './AvatarImage';
import { AvatarFallback } from './AvatarFallback';

// =============================================================================
// CONTEXT
// =============================================================================

interface AvatarContextValue {
  size: AvatarSize;
  shape: AvatarShape;
}

export const { Context: AvatarContext, useContext: useAvatarContext } =
  createComponentContext<AvatarContextValue>('Avatar');

// =============================================================================
// TYPES
// =============================================================================

export interface AvatarProps extends ComponentPropsWithoutRef<'div'> {
  /** Size of the avatar */
  size?: AvatarSize;
  /** Shape of the avatar */
  shape?: AvatarShape;
  /** Avatar content (Image, Fallback, or both) */
  children?: ReactNode;
}

// =============================================================================
// COMPONENT
// =============================================================================

const AvatarRoot = memo(
  forwardRef<HTMLDivElement, AvatarProps>(
    ({ size = 'md', shape = 'circular', className, children, ...props }, ref) => {
      const avatarClasses = useMemo(
        () => cn(BASE_CLASSES, SIZE_STYLES[size], SHAPE_STYLES[shape], className),
        [size, shape, className]
      );

      const contextValue = useMemo(() => ({ size, shape }), [size, shape]);

      return (
        <AvatarContext.Provider value={contextValue}>
          <div
            ref={ref}
            role="img"
            data-size={size}
            data-shape={shape}
            className={avatarClasses}
            {...props}
          >
            {children}
          </div>
        </AvatarContext.Provider>
      );
    }
  )
);
AvatarRoot.displayName = 'Avatar';

// =============================================================================
// COMPOUND COMPONENT
// =============================================================================

export const Avatar = Object.assign(AvatarRoot, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
});
