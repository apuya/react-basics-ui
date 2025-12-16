import {
  memo,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useControlledState } from '@/hooks/useControlledState';
import { cn } from '@/lib/cn';
import { ListContext } from './ListContext';
import { ListContainer } from './ListContainer';
import { ListItem } from './ListItem';

// =============================================================================
// Types
// =============================================================================

export interface ListProps {
  children?: ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  id?: string;
  /** Whether the list container is initially open (default: false) */
  defaultOpen?: boolean;
  /** Whether to close the list when an item is selected (default: false) */
  closeOnSelect?: boolean;
}

// =============================================================================
// Root Component
// =============================================================================

/**
 * List - Primitive for selecting values/data from options.
 * 
 * Use when the user needs to **choose data** (country, filter, sort order).
 * Maintains selection state with check icon. Uses listbox/option ARIA roles.
 *
 * **Use Cases:**
 * - Select dropdowns (choose country, category)
 * - Autocomplete suggestions (pick from search results)
 * - Filter/sort selectors (display state: "Sort by: Date")
 * - Settings options (choose language, theme)
 *
 * **NOT for actions** - Use Menu for Edit/Delete/Share commands.
 *
 * @example
 * ```tsx
 * <List value={selected} onChange={setSelected}>
 *   <List.Container>
 *     <List.Item value="usa">United States</List.Item>
 *     <List.Item value="canada">Canada</List.Item>
 *   </List.Container>
 * </List>
 * ```
 */
const ListRoot = memo(function ListRoot({
  children,
  value: controlledValue,
  defaultValue,
  onChange,
  className,
  id = 'list',
  defaultOpen = false,
  closeOnSelect = false,
}: ListProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [optionLabels, setOptionLabels] = useState<Map<string, string>>(new Map());

  const [value, setValue] = useControlledState(
    controlledValue,
    defaultValue || '',
    (newValue: string) => {
      onChange?.(newValue);
      if (closeOnSelect) {
        setIsOpen(false);
      }
    }
  );

  const getOptionLabel = useCallback(
    (val: string) => optionLabels.get(val),
    [optionLabels]
  );

  const registerOption = useCallback((optionValue: string, optionLabel: string) => {
    setOptionLabels((prev) => {
      const next = new Map(prev);
      next.set(optionValue, optionLabel);
      return next;
    });
  }, []);

  const menuId = useMemo(() => `${id}-menu`, [id]);

  const contextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      value,
      setValue,
      getOptionLabel,
      registerOption,
      menuId,
    }),
    [isOpen, value, getOptionLabel, registerOption, menuId]
  );

  return (
    <ListContext.Provider value={contextValue}>
      <div 
        className={cn('relative w-full', className)}
        data-open={isOpen}
      >
        {children}
      </div>
    </ListContext.Provider>
  );
});

ListRoot.displayName = 'List';

// =============================================================================
// Compound Component Export
// =============================================================================

export const List = Object.assign(ListRoot, {
  Container: ListContainer,
  Item: ListItem,
});
