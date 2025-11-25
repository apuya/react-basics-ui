import {
  forwardRef,
  memo,
  useMemo,
  type ReactNode,
  type ComponentPropsWithoutRef,
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
    ({ children, className, ...props }, forwardedRef) => {
      const { isOpen, listRef } = useAutocompleteContext();

      const listClasses = useMemo(
        () =>
          cn(
            AUTOCOMPLETE_LIST_BASE_CLASSES,
            isOpen ? AUTOCOMPLETE_LIST_VISIBLE_CLASS : AUTOCOMPLETE_LIST_HIDDEN_CLASS,
            className
          ),
        [isOpen, className]
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
            role="listbox"
            className={listClasses}
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
