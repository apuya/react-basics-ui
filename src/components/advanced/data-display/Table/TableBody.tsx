/**
 * @file TableBody.tsx
 * @description Table body container (tbody) component.
 *
 * Semantic wrapper for table data rows.
 */

import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { TABLE_BODY_BASE_CLASSES } from './Table.styles';

export interface TableBodyProps extends ComponentPropsWithoutRef<'tbody'> {}

export const TableBody = memo(
  forwardRef<HTMLTableSectionElement, TableBodyProps>(({ className, children, ...props }, ref) => (
    <tbody ref={ref} className={cn(TABLE_BODY_BASE_CLASSES, className)} {...props}>
      {children}
    </tbody>
  ))
);

TableBody.displayName = 'Table.Body';
