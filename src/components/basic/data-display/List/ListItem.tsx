import { cn } from '@/lib/cn';
import { forwardRef, memo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { ITEM_CLASSES } from './List.styles';

export interface ListItemProps extends ComponentPropsWithoutRef<'li'> {
  children: ReactNode;
}

export const ListItem = memo(
  forwardRef<HTMLLIElement, ListItemProps>(({ className, style, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn(ITEM_CLASSES, className)}
        style={{
          paddingInline: 'var(--component-list-item-padding-inline)',
          paddingBlock: 'var(--component-list-item-padding-block)',
          gap: 'var(--component-list-item-gap)',
          ...style,
        }}
        {...props}
      >
        {children}
      </li>
    );
  })
);
ListItem.displayName = 'List.Item';
