import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { TITLE_CLASSES, TITLE_STYLE } from './Drawer.styles';

export interface DrawerTitleProps extends ComponentPropsWithoutRef<'h2'> {}

/**
 * Drawer Title - heading element
 */
export const DrawerTitle = memo(
  forwardRef<HTMLHeadingElement, DrawerTitleProps>(
    ({ className, children, style, ...props }, ref) => {
      const titleStyle = useMemo(() => (style ? { ...TITLE_STYLE, ...style } : TITLE_STYLE), [style]);

      return (
        <h2 ref={ref} className={cn(TITLE_CLASSES, className)} style={titleStyle} {...props}>
          {children}
        </h2>
      );
    }
  )
);

DrawerTitle.displayName = 'Drawer.Title';
