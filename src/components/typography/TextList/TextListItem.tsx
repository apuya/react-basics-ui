import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo } from 'react';
import { useTextListContext } from './TextList';
import { ITEM_CLASSES, ITEM_INTERACTIVE_CLASSES, ITEM_PADDING_STYLE } from './TextList.styles';
import type { TextListItemProps } from './TextList.types';

export const TextListItem = memo(
  forwardRef<HTMLLIElement, TextListItemProps>(({ className, style, children, ...props }, ref) => {
    const { variant } = useTextListContext();

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
TextListItem.displayName = 'TextList.Item';
