import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react';
import { BASE_CLASSES, VARIANT_STYLES, ITEM_INTERACTIVE_CLASSES, type ListVariant } from './List.styles';
import { ListItem } from './ListItem';

export interface ListProps extends ComponentPropsWithoutRef<'ul'> {
  variant?: ListVariant;
  ordered?: boolean;
  children?: ReactNode;
}

const ListRoot = memo(
  forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
    ({ variant = 'default', ordered = false, className, style, children, ...props }, ref) => {
      const Component = (ordered ? 'ol' : 'ul') as ElementType;

      const listClasses = useMemo(
        () => cn(
          BASE_CLASSES,
          VARIANT_STYLES[variant],
          variant === 'interactive' && ITEM_INTERACTIVE_CLASSES,
          className
        ),
        [variant, className]
      );

      return (
        <Component
          ref={ref}
          data-variant={variant}
          className={listClasses}
          style={{
            gap: 'var(--component-list-gap)',
            ...style,
          }}
          {...props}
        >
          {children}
        </Component>
      );
    }
  )
);
ListRoot.displayName = 'List';

export const List = Object.assign(ListRoot, {
  Item: ListItem,
});
