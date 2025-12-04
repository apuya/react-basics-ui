import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { useAutocompleteContext } from './Autocomplete';
import { AUTOCOMPLETE_EMPTY_CLASSES } from './Autocomplete.styles';

export interface AutocompleteEmptyProps extends ComponentPropsWithoutRef<'div'> {
  message?: string;
  children?: ReactNode;
}

export const AutocompleteEmpty = memo(
  forwardRef<HTMLDivElement, AutocompleteEmptyProps>(
    ({ message = 'No results found', className, children, ...props }, ref) => {
      const { filteredOptions, query, isOpen } = useAutocompleteContext();

      const emptyClasses = useMemo(
        () => cn(AUTOCOMPLETE_EMPTY_CLASSES, className),
        [className]
      );

      // Only show empty state when list is open, there's a query, and no options match
      if (!isOpen || !query || filteredOptions.length > 0) {
        return null;
      }

      return (
        <div ref={ref} className={emptyClasses} {...props}>
          {children || message}
        </div>
      );
    }
  )
);

AutocompleteEmpty.displayName = 'Autocomplete.Empty';
