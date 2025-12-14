import { cn } from '@/lib/cn';
import { createComponentContext } from '@/lib/createComponentContext';
import { forwardRef, memo, useMemo } from 'react';
import { BASE_CLASSES, SHAPE_STYLES, SIZE_STYLES } from './Avatar.styles';
import type { AvatarContextValue, AvatarProps } from './Avatar.types';
import { AvatarImage } from './AvatarImage';
import { AvatarFallback } from './AvatarFallback';

// =============================================================================
// Context - Shares size and shape with sub-components
// =============================================================================

export const { Context: AvatarContext, useContext: useAvatarContext } =
  createComponentContext<AvatarContextValue>('Avatar');

// =============================================================================
// Avatar Root Component
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
// Compound Component Export
// Avatar.Image - Displays user image with error handling
// Avatar.Fallback - Shows initials or icon when no image available
// =============================================================================

export const Avatar = Object.assign(AvatarRoot, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
});
