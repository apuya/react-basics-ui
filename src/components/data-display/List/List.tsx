import { cn } from '@/lib/cn';
import { createComponentContext } from '@/lib/createComponentContext';
import { forwardRef, memo, useMemo, type ElementType } from 'react';
import { BASE_CLASSES, VARIANT_STYLES, GAP_STYLE } from './List.styles';
import type { ListProps, ListContextValue } from './List.types';
import { ListItem } from './ListItem';

// =============================================================================
// CONTEXT
// =============================================================================

const { Context: ListContext, useContext: useListContext } =
  createComponentContext<ListContextValue>('List');

export { useListContext };

// =============================================================================
// COMPONENT
// =============================================================================

const ListRoot = memo(
  forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
    ({ variant = 'default', ordered = false, className, style, children, ...props }, ref) => {
      const Component = (ordered ? 'ol' : 'ul') as ElementType;

      const listClasses = useMemo(
        () => cn(BASE_CLASSES, VARIANT_STYLES[variant], className),
        [variant, className]
      );

      const contextValue = useMemo<ListContextValue>(() => ({ variant }), [variant]);

      return (
        <ListContext.Provider value={contextValue}>
          <Component
            ref={ref}
            data-variant={variant}
            className={listClasses}
            style={{
              ...GAP_STYLE,
              ...style,
            }}
            {...props}
          >
            {children}
          </Component>
        </ListContext.Provider>
      );
    }
  )
);
ListRoot.displayName = 'List';

export const List = Object.assign(ListRoot, {
  Item: ListItem,
});
