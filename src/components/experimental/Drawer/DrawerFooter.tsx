import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { FOOTER_CLASSES, FOOTER_STYLE } from './Drawer.styles';

export interface DrawerFooterProps extends ComponentPropsWithoutRef<'div'> {}

/**
 * Drawer Footer - action buttons area
 */
export const DrawerFooter = memo(
  forwardRef<HTMLDivElement, DrawerFooterProps>(({ className, children, style, ...props }, ref) => {
    const footerStyle = useMemo(
      () => (style ? { ...FOOTER_STYLE, ...style } : FOOTER_STYLE),
      [style]
    );

    return (
      <div ref={ref} className={cn(FOOTER_CLASSES, className)} style={footerStyle} {...props}>
        {children}
      </div>
    );
  })
);

DrawerFooter.displayName = 'Drawer.Footer';
