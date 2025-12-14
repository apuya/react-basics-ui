import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { BODY_CLASSES, BODY_STYLE } from './Drawer.styles';

export interface DrawerBodyProps extends ComponentPropsWithoutRef<'div'> {}

/**
 * Drawer Body - scrollable content area
 */
export const DrawerBody = memo(
  forwardRef<HTMLDivElement, DrawerBodyProps>(({ className, children, style, ...props }, ref) => {
    const bodyStyle = useMemo(() => (style ? { ...BODY_STYLE, ...style } : BODY_STYLE), [style]);

    return (
      <div ref={ref} className={cn(BODY_CLASSES, className)} style={bodyStyle} {...props}>
        {children}
      </div>
    );
  })
);

DrawerBody.displayName = 'Drawer.Body';
