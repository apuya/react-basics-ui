import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { HEADER_CLASSES, HEADER_STYLE } from './Drawer.styles';

export interface DrawerHeaderProps extends ComponentPropsWithoutRef<'div'> {}

/**
 * Drawer Header - contains title and close button area
 */
export const DrawerHeader = memo(
  forwardRef<HTMLDivElement, DrawerHeaderProps>(({ className, children, style, ...props }, ref) => {
    const headerStyle = useMemo(
      () => (style ? { ...HEADER_STYLE, ...style } : HEADER_STYLE),
      [style]
    );

    return (
      <div ref={ref} className={cn(HEADER_CLASSES, className)} style={headerStyle} {...props}>
        {children}
      </div>
    );
  })
);

DrawerHeader.displayName = 'Drawer.Header';
