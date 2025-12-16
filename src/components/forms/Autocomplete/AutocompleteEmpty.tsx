import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { useAutocompleteContext } from './Autocomplete.context';
import { Spinner } from '@/components/feedback/Spinner';
import { AUTOCOMPLETE_EMPTY_CLASSES } from './Autocomplete.styles';

export interface AutocompleteEmptyProps extends ComponentPropsWithoutRef<'div'> {
  message?: string;
  children?: ReactNode;
}

export const AutocompleteEmpty = memo(
  forwardRef<HTMLDivElement, AutocompleteEmptyProps>(
    ({ message = 'No results found', className, children, ...props }, ref) => {
      const { filteredOptions, query, isOpen, loading, minSearchLength, allowCreate, onCreateOption } = useAutocompleteContext();

      const emptyClasses = useMemo(
        () => cn(AUTOCOMPLETE_EMPTY_CLASSES, className),
        [className]
      );

      const handleCreate = () => {
        if (onCreateOption && query) {
          onCreateOption(query);
        }
      };

      // Show loading state when loading
      if (isOpen && loading) {
        return (
          <div ref={ref} className={emptyClasses} {...props}>
            {children || (
              <div className="flex items-center justify-center gap-2">
                <Spinner size="sm" />
                <span>Loading options...</span>
              </div>
            )}
          </div>
        );
      }

      // Show minimum length message when query is below minimum
      if (isOpen && query && query.length < minSearchLength) {
        return (
          <div ref={ref} className={emptyClasses} {...props}>
            {children || `Type at least ${minSearchLength} character${minSearchLength !== 1 ? 's' : ''} to search`}
          </div>
        );
      }

      // Show create new option when no results and allowCreate is true
      if (isOpen && query && filteredOptions.length === 0 && allowCreate) {
        return (
          <div ref={ref} className={emptyClasses} {...props}>
            {children || (
              <button
                type="button"
                onClick={handleCreate}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              >
                Create &quot;{query}&quot;
              </button>
            )}
          </div>
        );
      }

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
