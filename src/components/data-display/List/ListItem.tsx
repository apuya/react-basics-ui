import { cn } from '@/lib/cn';
import { forwardRef, memo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { ITEM_CLASSES } from './List.styles';

export interface ListItemProps extends ComponentPropsWithoutRef<'li'> {
  children: ReactNode;
}

export const ListItem = memo(
  forwardRef<HTMLLIElement, ListItemProps>(({ className, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn(ITEM_CLASSES, className)}
        {...props}
      >
        {children}
      </li>
    );
  })
);
ListItem.displayName = 'List.Item';
