import { cn } from '@/lib/cn';
import { forwardRef, memo, useState, type ComponentPropsWithoutRef } from 'react';
import { IMAGE_CLASSES } from './Avatar.styles';

export interface AvatarImageProps extends Omit<ComponentPropsWithoutRef<'img'>, 'onError'> {
  /** Image source URL */
  src: string;
  /** Alternative text for accessibility */
  alt: string;
  /** Callback when image fails to load */
  onLoadError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

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
