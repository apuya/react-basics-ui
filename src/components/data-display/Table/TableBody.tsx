import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { TABLE_BODY_BASE_CLASSES } from './Table.styles';

export interface TableBodyProps extends ComponentPropsWithoutRef<'tbody'> {}

export const TableBody = memo(
  forwardRef<HTMLTableSectionElement, TableBodyProps>(({ className, children, ...props }, ref) => {
    const bodyClasses = useMemo(
      () => cn(TABLE_BODY_BASE_CLASSES, className),
      [className]
    );

    return (
      <tbody ref={ref} className={bodyClasses} {...props}>
        {children}
      </tbody>
    );
  })
);

TableBody.displayName = 'Table.Body';
