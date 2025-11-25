import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo, useCallback, type ComponentPropsWithoutRef } from 'react';
import { BiX } from 'react-icons/bi';
import {
  BASE_CLASSES,
  SIZE_STYLES,
  VARIANT_COLOR_STYLES,
  REMOVE_BUTTON_CLASSES,
  type TagVariant,
  type TagColor,
  type TagSize,
} from './Tag.styles';

export type { TagVariant, TagColor, TagSize };

export interface TagProps extends ComponentPropsWithoutRef<'span'> {
  variant?: TagVariant;
  color?: TagColor;
  size?: TagSize;
  removable?: boolean;
  onRemove?: () => void;
}

export const Tag = memo(
  forwardRef<HTMLSpanElement, TagProps>(
    (
      {
        variant = 'subtle',
        color = 'default',
        size = 'md',
        removable = false,
        onRemove,
        className,
        children,
        ...props
      },
      ref
    ) => {
      const tagClasses = useMemo(
        () => cn(BASE_CLASSES, SIZE_STYLES[size], VARIANT_COLOR_STYLES[variant][color], className),
        [variant, color, size, className]
      );

      const handleRemove = useCallback(
        (e: React.MouseEvent) => {
          e.stopPropagation();
          onRemove?.();
        },
        [onRemove]
      );

      return (
        <span
          ref={ref}
          data-variant={variant}
          data-color={color}
          data-size={size}
          className={tagClasses}
          {...props}
        >
          {children}
          {removable && (
            <button
              type="button"
              onClick={handleRemove}
              className={REMOVE_BUTTON_CLASSES}
              aria-label="Remove tag"
            >
              <BiX />
            </button>
          )}
        </span>
      );
    }
  )
);
Tag.displayName = 'Tag';
