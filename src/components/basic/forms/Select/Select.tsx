import {
  memo,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useControlledState } from '@/hooks/useControlledState';
import { cn } from '@/lib/cn';
import { SelectContext } from './SelectContext';
import { SelectTrigger } from './SelectTrigger';
import { SelectMenu } from './SelectMenu';
import { SelectOption } from './SelectOption';
import type { SelectSize } from './Select.styles';

// =============================================================================
// Types
// =============================================================================

export interface SelectProps {
  children: ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  size?: SelectSize;
  className?: string;
  id?: string;
}

// =============================================================================
// Root Component
// =============================================================================

/**
 * Select - Compound component for dropdown selection with keyboard navigation.
 * 
 * Pure wrapper component that manages state and provides context to sub-components
 * (Trigger, Menu, Option). Use with FormField for labels and helper text.
 *
 * @example
 * ```tsx
 * // Standalone usage
 * <Select value={value} onChange={setValue}>
 *   <Select.Trigger placeholder="Select option..." />
 *   <Select.Menu>
 *     <Select.Option value="1">Option 1</Select.Option>
 *     <Select.Option value="2">Option 2</Select.Option>
 *   </Select.Menu>
 * </Select>
 *
 * // With FormField for labels
 * <FormField label="Category" helperText="Choose a category">
 *   <Select>
 *     <Select.Trigger placeholder="Select..." />
 *     <Select.Menu>
 *       <Select.Option value="tech">Technology</Select.Option>
 *       <Select.Option value="design">Design</Select.Option>
 *     </Select.Menu>
 *   </Select>
 * </FormField>
 * ```
 */
const SelectRoot = memo(function SelectRoot({
  children,
  value: controlledValue,
  defaultValue,
  onChange,
  disabled = false,
  error = false,
  size = 'default',
  className,
  id = 'select',
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [optionLabels, setOptionLabels] = useState<Map<string, string>>(new Map());

  const [value, setValue] = useControlledState(
    controlledValue,
    defaultValue || '',
    (newValue: string) => {
      onChange?.(newValue);
      setIsOpen(false);
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

  const triggerId = useMemo(() => `${id}-trigger`, [id]);
  const menuId = useMemo(() => `${id}-menu`, [id]);

  const wrapperClasses = useMemo(
    () => cn('relative w-full', className),
    [className]
  );

  const contextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      value,
      setValue,
      disabled,
      error,
      size,
      getOptionLabel,
      registerOption,
      triggerId,
      menuId,
    }),
    [isOpen, value, setValue, disabled, error, size, getOptionLabel, registerOption, triggerId, menuId]
  );

  return (
    <SelectContext.Provider value={contextValue}>
      <div 
        className={wrapperClasses}
        data-size={size}
        data-error={error || undefined}
        data-disabled={disabled || undefined}
        data-open={isOpen}
      >
        {children}
      </div>
    </SelectContext.Provider>
  );
});

SelectRoot.displayName = 'Select';

// =============================================================================
// Compound Component Export
// =============================================================================

export const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Menu: SelectMenu,
  Option: SelectOption,
});

// Export context hook for advanced usage
export { useSelectContext } from './SelectContext';
