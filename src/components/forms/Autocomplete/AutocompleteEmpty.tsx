import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { AUTOCOMPLETE_EMPTY_CLASSES } from './Autocomplete.styles';

export interface AutocompleteEmptyProps extends ComponentPropsWithoutRef<'div'> {
  message?: string;
}

export const AutocompleteEmpty = memo(
  forwardRef<HTMLDivElement, AutocompleteEmptyProps>(
    ({ message = 'No results found', className, ...props }, ref) => {
      const emptyClasses = useMemo(
        () => cn(AUTOCOMPLETE_EMPTY_CLASSES, className),
        [className]
      );

      return (
        <div ref={ref} className={emptyClasses} {...props}>
          {message}
        </div>
      );
    }
  )
);

AutocompleteEmpty.displayName = 'Autocomplete.Empty';
