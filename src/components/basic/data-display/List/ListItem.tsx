import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo } from 'react';
import { useListContext } from './List';
import { ITEM_CLASSES, ITEM_INTERACTIVE_CLASSES, ITEM_PADDING_STYLE } from './List.styles';
import type { ListItemProps } from './List.types';

export const ListItem = memo(
  forwardRef<HTMLLIElement, ListItemProps>(({ className, style, children, ...props }, ref) => {
    const { variant } = useListContext();

    const itemClasses = useMemo(
      () => cn(ITEM_CLASSES, variant === 'interactive' && ITEM_INTERACTIVE_CLASSES, className),
      [variant, className]
    );

    return (
      <li
        ref={ref}
        data-variant={variant}
        className={itemClasses}
        style={{
          ...ITEM_PADDING_STYLE,
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
