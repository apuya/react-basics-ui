import { useState, useMemo, useCallback } from 'react';

export type DisclosureMode = 'single' | 'multiple';

export interface UseDisclosureStateOptions {
  /**
   * Mode of disclosure behavior
   * - 'single': Only one item can be active at a time
   * - 'multiple': Multiple items can be active simultaneously
   */
  mode?: DisclosureMode;
  
  /**
   * Default active value(s) when uncontrolled
   */
  defaultValue?: string | string[];
  
  /**
   * Controlled active value(s)
   */
  value?: string | string[];
  
  /**
   * Callback when value changes
   */
  onChange?: (value: string | string[]) => void;
  
  /**
   * Whether items can be collapsed when in single mode
   * If false, at least one item must remain open
   */
  collapsible?: boolean;
}

export interface UseDisclosureStateReturn {
  /**
   * Current active items as an array
   */
  activeItems: string[];
  
  /**
   * Toggle an item's active state
   */
  toggle: (itemValue: string) => void;
  
  /**
   * Check if an item is currently active
   */
  isActive: (itemValue: string) => boolean;
  
  /**
   * Set active items directly (useful for controlled mode)
   */
  setActiveItems: (value: string | string[]) => void;
  
  /**
   * Clear all active items (respects collapsible setting)
   */
  clear: () => void;
  
  /**
   * Current mode
   */
  mode: DisclosureMode;
}

/**
 * Shared disclosure state management hook for components like Accordion, Tabs, ToggleGroup, etc.
 * Handles both controlled and uncontrolled modes with support for single/multiple selection.
 * 
 * @example
 * ```tsx
 * // Single mode (Accordion-like)
 * const { activeItems, toggle, isActive } = useDisclosureState({
 *   mode: 'single',
 *   defaultValue: 'item-1',
 *   collapsible: true,
 * });
 * 
 * // Multiple mode (ToggleGroup-like)
 * const { activeItems, toggle, isActive } = useDisclosureState({
 *   mode: 'multiple',
 *   defaultValue: ['item-1', 'item-2'],
 * });
 * 
 * // Controlled mode
 * const [value, setValue] = useState('item-1');
 * const { toggle, isActive } = useDisclosureState({
 *   mode: 'single',
 *   value,
 *   onChange: setValue,
 * });
 * ```
 */
export function useDisclosureState({
  mode = 'single',
  defaultValue,
  value,
  onChange,
  collapsible = false,
}: UseDisclosureStateOptions = {}): UseDisclosureStateReturn {
  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<string[]>(() => {
    if (defaultValue === undefined) return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  });

  // Determine if component is controlled
  const isControlled = value !== undefined;

  // Get current active items
  const activeItems = useMemo(() => {
    if (isControlled) {
      return Array.isArray(value) ? value : value ? [value] : [];
    }
    return internalValue;
  }, [isControlled, value, internalValue]);

  // Toggle an item's active state
  const toggle = useCallback(
    (itemValue: string) => {
      const newValue = (() => {
        if (mode === 'single') {
          // Single mode: only one item active at a time
          if (activeItems.includes(itemValue)) {
            // Close if collapsible, otherwise keep it open
            return collapsible ? [] : [itemValue];
          }
          return [itemValue];
        } else {
          // Multiple mode: toggle the item
          if (activeItems.includes(itemValue)) {
            return activeItems.filter((v) => v !== itemValue);
          }
          return [...activeItems, itemValue];
        }
      })();

      // Update internal state if uncontrolled
      if (!isControlled) {
        setInternalValue(newValue);
      }

      // Call onChange callback with appropriate format
      if (onChange) {
        onChange(mode === 'single' ? (newValue[0] || '') : newValue);
      }
    },
    [mode, activeItems, collapsible, isControlled, onChange]
  );

  // Check if an item is active
  const isActive = useCallback(
    (itemValue: string) => activeItems.includes(itemValue),
    [activeItems]
  );

  // Set active items directly
  const setActiveItems = useCallback(
    (newValue: string | string[]) => {
      const normalizedValue = Array.isArray(newValue) ? newValue : [newValue];
      
      if (!isControlled) {
        setInternalValue(normalizedValue);
      }

      if (onChange) {
        onChange(mode === 'single' ? (normalizedValue[0] || '') : normalizedValue);
      }
    },
    [isControlled, mode, onChange]
  );

  // Clear all active items
  const clear = useCallback(() => {
    const newValue = collapsible ? [] : activeItems;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }

    if (onChange && collapsible) {
      onChange(mode === 'single' ? '' : []);
    }
  }, [collapsible, activeItems, isControlled, mode, onChange]);

  return {
    activeItems,
    toggle,
    isActive,
    setActiveItems,
    clear,
    mode,
  };
}
