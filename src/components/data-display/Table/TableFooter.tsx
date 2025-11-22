import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { TABLE_FOOTER_BASE_CLASSES } from './Table.styles';

export interface TableFooterProps extends ComponentPropsWithoutRef<'tfoot'> {}

export const TableFooter = memo(
  forwardRef<HTMLTableSectionElement, TableFooterProps>(({ className, children, ...props }, ref) => {
    const footerClasses = useMemo(
      () => cn(TABLE_FOOTER_BASE_CLASSES, className),
      [className]
    );

    return (
      <tfoot ref={ref} className={footerClasses} {...props}>
        {children}
      </tfoot>
    );
  })
);

TableFooter.displayName = 'Table.Footer';
