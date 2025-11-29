import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { AUTOCOMPLETE_EMPTY_CLASSES } from './Autocomplete.styles';

export interface AutocompleteEmptyProps extends ComponentPropsWithoutRef<'div'> {
  message?: string;
  children?: ReactNode;
}

export const AutocompleteEmpty = memo(
  forwardRef<HTMLDivElement, AutocompleteEmptyProps>(
    ({ message = 'No results found', className, children, ...props }, ref) => {
      const emptyClasses = useMemo(
        () => cn(AUTOCOMPLETE_EMPTY_CLASSES, className),
        [className]
      );

      return (
        <div ref={ref} className={emptyClasses} {...props}>
          {children || message}
        </div>
      );
    }
  )
);

AutocompleteEmpty.displayName = 'Autocomplete.Empty';
