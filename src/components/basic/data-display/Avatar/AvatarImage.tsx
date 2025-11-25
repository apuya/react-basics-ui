import { cn } from '@/lib/cn';
import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { IMAGE_CLASSES } from './Avatar.styles';

export interface AvatarImageProps extends ComponentPropsWithoutRef<'img'> {
  src: string;
  alt: string;
}

export const AvatarImage = memo(
  forwardRef<HTMLImageElement, AvatarImageProps>(({ className, src, alt, ...props }, ref) => {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn(IMAGE_CLASSES, className)}
        {...props}
      />
    );
  })
);
AvatarImage.displayName = 'Avatar.Image';
