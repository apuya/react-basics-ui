import { cn } from '@/lib/cn';
import { createComponentContext } from '@/lib/createComponentContext';
import { forwardRef, memo, useMemo, type ElementType } from 'react';
import { BASE_CLASSES, VARIANT_STYLES, GAP_STYLE } from './TextList.styles';
import type { TextListProps, TextListContextValue } from './TextList.types';
import { TextListItem } from './TextListItem';

// =============================================================================
// CONTEXT
// =============================================================================

const { Context: TextListContext, useContext: useTextListContext } =
  createComponentContext<TextListContextValue>('TextList');

export { useTextListContext };

// =============================================================================
// COMPONENT
// =============================================================================

const TextListRoot = memo(
  forwardRef<HTMLUTextListElement | HTMLOTextListElement, TextListProps>(
    ({ variant = 'default', ordered = false, className, style, children, ...props }, ref) => {
      const Component = (ordered ? 'ol' : 'ul') as ElementType;

      const listClasses = useMemo(
        () => cn(BASE_CLASSES, VARIANT_STYLES[variant], className),
        [variant, className]
      );

      const contextValue = useMemo<TextListContextValue>(() => ({ variant }), [variant]);

      return (
        <TextListContext.Provider value={contextValue}>
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
        </TextListContext.Provider>
      );
    }
  )
);
TextListRoot.displayName = 'TextList';

export const TextList = Object.assign(TextListRoot, {
  Item: TextListItem,
});
