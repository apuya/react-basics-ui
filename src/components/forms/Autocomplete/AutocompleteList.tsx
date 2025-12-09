import {
  forwardRef,
  memo,
  useMemo,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from 'react';
import { cn } from '@/lib/cn';
import { useMergedRefs } from '@/hooks/useMergedRefs';
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
      const mergedRef = useMergedRefs(forwardedRef, listRef);

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
        <div
          ref={mergedRef}
          id={listId}
          role="listbox"
          className={listClasses}
          style={style}
          data-open={isOpen}
          {...props}
        >
          {children}
        </div>
      );
    }
  )
);

AutocompleteList.displayName = 'Autocomplete.List';
