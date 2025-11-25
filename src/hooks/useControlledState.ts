import { useCallback, useState } from 'react';

/**
 * Hook to manage controlled/uncontrolled state pattern
 * Consolidates duplicate state management logic across form components
 * 
 * @param value - Controlled value (if provided, component is controlled)
 * @param defaultValue - Default value for uncontrolled mode
 * @param onChange - Callback when value changes
 * @returns [currentValue, setValue] tuple
 * 
 * @example
 * ```tsx
 * const [value, setValue] = useControlledState(
 *   props.value,
 *   props.defaultValue ?? 0,
 *   props.onChange
 * );
 * ```
 */
export function useControlledState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
): [T, (newValue: T) => void] {
  const [internalValue, setInternalValue] = useState<T>(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = useCallback(
    (newValue: T) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange]
  );

  return [currentValue, setValue];
}
