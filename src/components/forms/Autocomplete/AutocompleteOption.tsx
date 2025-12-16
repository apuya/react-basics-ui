import { forwardRef, memo } from 'react';
import { List } from '@/components/overlays/List';
import { useAutocompleteContext } from './Autocomplete.context';
import { HighlightText } from './highlightText';
import type { ListItemProps } from '@/components/overlays/List';

export interface AutocompleteOptionProps extends Omit<ListItemProps, 'selected' | 'onOptionSelect'> {}

/**
 * Thin wrapper around List.Item that adds:
 * - Automatic option label lookup from filteredOptions
 * - Multiple selection check icon
 * - Text highlighting for search matches
 * - Custom option rendering support
 */
export const AutocompleteOption = memo(
  forwardRef<HTMLButtonElement, AutocompleteOptionProps>(
    ({ children, ...props }, forwardedRef) => {
      const { selectedValue, filteredOptions, query, highlightMatches, renderOption } = useAutocompleteContext();
      const isSelected = selectedValue.includes(props.value);
      
      // Auto-lookup option
      const option = filteredOptions.find(opt => opt.value === props.value);
      
      // Priority: children > renderOption > highlightMatches > label
      let content;
      if (children) {
        content = children;
      } else if (renderOption && option) {
        content = renderOption(option, isSelected);
      } else if (option) {
        const label = option.label || '';
        content = highlightMatches && query ? (
          <HighlightText text={label} query={query} />
        ) : label;
      }

      return (
        <List.Item ref={forwardedRef} {...props}>
          {content}
        </List.Item>
      );
    }
  )
);

AutocompleteOption.displayName = 'Autocomplete.Option';
