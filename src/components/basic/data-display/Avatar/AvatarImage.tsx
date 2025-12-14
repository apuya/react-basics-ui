/**
 * Avatar.Image - Displays user image with automatic error handling.
 * When image fails to load, component unmounts to reveal Avatar.Fallback.
 */
import { cn } from '@/lib/cn';
import { forwardRef, memo, useState } from 'react';
import { IMAGE_CLASSES } from './Avatar.styles';
import type { AvatarImageProps } from './Avatar.types';

export const AvatarImage = memo(
  forwardRef<HTMLImageElement, AvatarImageProps>(
    ({ className, src, alt, onLoadError, ...props }, ref) => {
      const [hasError, setHasError] = useState(false);

      const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setHasError(true);
        onLoadError?.(event);
      };

      // Don't render if image failed to load (allows fallback to show)
      if (hasError) {
        return null;
      }

      return (
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={cn(IMAGE_CLASSES, className)}
          onError={handleError}
          {...props}
        />
      );
    }
  )
);
AvatarImage.displayName = 'Avatar.Image';
