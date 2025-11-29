import {
  forwardRef,
  memo,
  useMemo,
  type ReactNode,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from 'react';
import { cn } from '@/lib/cn';
import { Portal } from '@/components/basic/utility/Portal';
import { useAutocompleteContext } from './Autocomplete';
import {
  AUTOCOMPLETE_LIST_BASE_CLASSES,
  AUTOCOMPLETE_LIST_VISIBLE_CLASS,
  AUTOCOMPLETE_LIST_HIDDEN_CLASS,
} from './Autocomplete.styles';

export interface AutocompleteListProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

export const AutocompleteList = memo(
  forwardRef<HTMLDivElement, AutocompleteListProps>(
    ({ children, className, style, ...props }, forwardedRef) => {
      const { isOpen, listRef, listId } = useAutocompleteContext();

      const listClasses = useMemo(
        () =>
          cn(
            AUTOCOMPLETE_LIST_BASE_CLASSES,
            isOpen ? AUTOCOMPLETE_LIST_VISIBLE_CLASS : AUTOCOMPLETE_LIST_HIDDEN_CLASS,
            className
          ),
        [isOpen, className]
      );

      const listStyle = useMemo<CSSProperties>(
        () => ({
          paddingBlock: 'var(--component-autocomplete-padding-block)',
          paddingInline: 'var(--component-autocomplete-padding-inline)',
          ...style,
        }),
        [style]
      );

      return (
        <Portal>
          <div
            ref={(node) => {
              if (node) listRef.current = node;
              if (typeof forwardedRef === 'function') {
                forwardedRef(node);
              } else if (forwardedRef) {
                forwardedRef.current = node;
              }
            }}
            id={listId}
            role="listbox"
            className={listClasses}
            style={listStyle}
            {...props}
          >
            {children}
          </div>
        </Portal>
      );
    }
  )
);

AutocompleteList.displayName = 'Autocomplete.List';
