import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { DIVIDER_CLASSES, DIVIDER_STYLE } from './Menu.styles';

export interface MenuDividerProps extends ComponentPropsWithoutRef<'div'> {}

/**
 * Menu.Divider - A visual separator between menu items.
 */
export const MenuDivider = memo(
  forwardRef<HTMLDivElement, MenuDividerProps>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          role="separator"
          className={cn(DIVIDER_CLASSES, className)}
          style={DIVIDER_STYLE}
          {...props}
        />
      );
    }
  )
);

MenuDivider.displayName = 'Menu.Divider';
