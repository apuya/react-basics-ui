import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { BiCheck, BiChevronDown } from 'react-icons/bi';
import { createComponentContext } from '@/lib/createComponentContext';
import { generateFormId } from '@/lib/generateFormId';
import { useControlledState } from '@/hooks/useControlledState';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/utility/Icon';
import {
  HELPER_BASE_CLASSES,
  HELPER_STATE_STYLES,
  ICON_BASE_CLASSES,
  ICON_OPEN_CLASSES,
  ICON_STATE_STYLES,
  LABEL_BASE_CLASSES,
  LABEL_STATE_STYLES,
  MENU_BASE_CLASSES,
  MENU_VISIBLE_CLASS,
  MENU_WRAPPER_CLASSES,
  OPTION_BASE_CLASSES,
  OPTION_STATE_STYLES,
  PLACEHOLDER_CLASSES,
  TRIGGER_BASE_CLASSES,
  TRIGGER_SIZE_STYLES,
  TRIGGER_STATE_STYLES,
  WRAPPER_CLASSES,
  type SelectSize,
} from './Select.styles';

// Context
interface SelectContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  value: string | undefined;
  setValue: (value: string) => void;
  disabled: boolean;
  error: boolean;
  size: SelectSize;
  getOptionLabel: (value: string) => string | undefined;
  registerOption: (value: string, label: string) => void;
  triggerId: string;
  menuId: string;
  labelId: string | undefined;
}

const { Context: SelectContext, useContext: useSelectContext, useOptionalContext: useOptionalSelectContext } =
  createComponentContext<SelectContextValue>('Select');

// Main Select Component
export interface SelectProps {
  children: ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  size?: SelectSize;
  label?: string;
  helperText?: string;
  className?: string;
  id?: string;
}

// Static styles for inline spacing
const LABEL_STYLE = { marginBottom: 'var(--component-input-gap-compact)' } as const;
const HELPER_STYLE = { marginTop: 'var(--component-input-gap-compact)' } as const;

const SelectRoot = ({
  children,
  value: controlledValue,
  defaultValue,
  onChange,
  disabled = false,
  error = false,
  size = 'default',
  label,
  helperText,
  className,
  id,
}: SelectProps) => {
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

  const baseId = id || generateFormId('select', label);
  const triggerId = `${baseId}-trigger`;
  const menuId = `${baseId}-menu`;
  const labelId = label ? `${baseId}-label` : undefined;

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
      labelId,
    }),
    [isOpen, value, setValue, disabled, error, size, getOptionLabel, registerOption, triggerId, menuId, labelId]
  );

  return (
    <SelectContext.Provider value={contextValue}>
      <div 
        className={cn('w-full', className)}
        data-size={size}
        data-error={error || undefined}
        data-disabled={disabled || undefined}
        data-open={isOpen}
      >
        {label && (
          <label
            id={labelId}
            htmlFor={triggerId}
            className={cn(LABEL_BASE_CLASSES, error ? LABEL_STATE_STYLES.error : LABEL_STATE_STYLES.default)}
            style={LABEL_STYLE}
          >
            {label}
          </label>
        )}
        <div className={WRAPPER_CLASSES}>
          {children}
        </div>
        {helperText && (
          <p
            className={cn(HELPER_BASE_CLASSES, error ? HELPER_STATE_STYLES.error : HELPER_STATE_STYLES.default)}
            style={HELPER_STYLE}
          >
            {helperText}
          </p>
        )}
      </div>
    </SelectContext.Provider>
  );
};

// Select Trigger
export interface SelectTriggerProps extends Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
  placeholder?: string;
}

const SelectTrigger = memo(
  forwardRef<HTMLButtonElement, SelectTriggerProps>(
    ({ placeholder = 'Select an option...', className, ...props }, ref) => {
      const { isOpen, setIsOpen, value, disabled, error, size, getOptionLabel, triggerId, menuId, labelId } = useSelectContext();

      const triggerClasses = useMemo(
        () => cn(
          TRIGGER_BASE_CLASSES,
          TRIGGER_SIZE_STYLES[size],
          isOpen ? TRIGGER_STATE_STYLES.open : error ? TRIGGER_STATE_STYLES.error : TRIGGER_STATE_STYLES.default,
          className
        ),
        [size, isOpen, error, className]
      );

      const triggerStyle = useMemo(
        () => ({
          height: `var(--component-input-height-${size})`,
          paddingInline: 'var(--component-input-padding-inline)',
        }),
        [size]
      );

      const handleClick = useCallback(() => {
        if (!disabled) {
          setIsOpen(!isOpen);
        }
      }, [disabled, isOpen, setIsOpen]);

      const displayValue = value ? getOptionLabel(value) || value : undefined;

      return (
        <button
          ref={ref}
          id={triggerId}
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={isOpen ? menuId : undefined}
          aria-labelledby={labelId}
          disabled={disabled}
          className={triggerClasses}
          style={triggerStyle}
          onClick={handleClick}
          data-size={size}
          data-error={error || undefined}
          data-open={isOpen}
          {...props}
        >
          <span className={!displayValue ? PLACEHOLDER_CLASSES : undefined}>
            {displayValue || placeholder}
          </span>
          <Icon
            icon={BiChevronDown}
            className={cn(
              ICON_BASE_CLASSES,
              disabled ? ICON_STATE_STYLES.disabled : ICON_STATE_STYLES.default,
              isOpen && ICON_OPEN_CLASSES
            )}
            aria-hidden
          />
        </button>
      );
    }
  )
);

SelectTrigger.displayName = 'Select.Trigger';

// Select Menu
export interface SelectMenuProps extends ComponentPropsWithoutRef<'div'> {}

const SelectMenu = memo(
  forwardRef<HTMLDivElement, SelectMenuProps>(
    ({ className, children, ...props }, forwardedRef) => {
      const { isOpen, setIsOpen, menuId, labelId } = useSelectContext();
      const menuRef = useRef<HTMLDivElement>(null!);

      const menuClasses = useMemo(
        () => cn(
          MENU_BASE_CLASSES,
          isOpen && MENU_VISIBLE_CLASS,
          className
        ),
        [isOpen, className]
      );

      useClickOutside(menuRef, () => setIsOpen(false));
      useEscapeKey(() => setIsOpen(false), isOpen);

      // Keyboard navigation
      useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
          const items = menuRef.current?.querySelectorAll<HTMLButtonElement>(
            '[role="option"]:not([disabled])'
          );
          if (!items || items.length === 0) return;

          const currentIndex = Array.from(items).indexOf(document.activeElement as HTMLButtonElement);

          switch (e.key) {
            case 'ArrowDown':
              e.preventDefault();
              const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % items.length;
              items[nextIndex]?.focus();
              break;
            case 'ArrowUp':
              e.preventDefault();
              const prevIndex = currentIndex === -1 ? items.length - 1 : (currentIndex - 1 + items.length) % items.length;
              items[prevIndex]?.focus();
              break;
            case 'Home':
              e.preventDefault();
              items[0]?.focus();
              break;
            case 'End':
              e.preventDefault();
              items[items.length - 1]?.focus();
              break;
          }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
      }, [isOpen]);

      if (!isOpen) return null;

      return (
        <div
          ref={(node) => {
            if (node) menuRef.current = node;
            if (typeof forwardedRef === 'function') {
              forwardedRef(node);
            } else if (forwardedRef) {
              forwardedRef.current = node;
            }
          }}
          id={menuId}
          role="listbox"
          aria-labelledby={labelId}
          className={menuClasses}
          {...props}
        >
          <div className={MENU_WRAPPER_CLASSES}>
            {children}
          </div>
        </div>
      );
    }
  )
);

SelectMenu.displayName = 'Select.Menu';

// Select Option
export interface SelectOptionProps extends Omit<ComponentPropsWithoutRef<'button'>, 'value'> {
  value: string;
  disabled?: boolean;
  /** For standalone usage outside Select context */
  selected?: boolean;
  /** For standalone usage outside Select context */
  onOptionSelect?: (value: string) => void;
}

const SelectOption = memo(
  forwardRef<HTMLButtonElement, SelectOptionProps>(
    ({ value: optionValue, disabled = false, selected: selectedProp, onOptionSelect, className, children, ...props }, ref) => {
      const context = useOptionalSelectContext();
      const [isHovered, setIsHovered] = useState(false);
      
      // Use context values if available, otherwise use props
      const isSelected = context ? context.value === optionValue : (selectedProp ?? false);

      // Register option label when in context
      useEffect(() => {
        if (context) {
          const label = typeof children === 'string' ? children : optionValue;
          context.registerOption(optionValue, label);
        }
      }, [optionValue, children, context]);

      const optionStyle = useMemo(
        () => ({
          height: 'var(--component-dropdown-item-height)',
          paddingInline: 'var(--component-dropdown-item-padding-inline)',
          paddingBlock: 'var(--component-dropdown-item-padding-block)',
          gap: 'var(--component-dropdown-item-gap)',
        }),
        []
      );

      const optionClasses = useMemo(() => {
        const state = disabled ? 'disabled' : isSelected ? 'selected' : isHovered ? 'hover' : 'default';
        return cn(OPTION_BASE_CLASSES, OPTION_STATE_STYLES[state], className);
      }, [disabled, isSelected, isHovered, className]);

      const handleClick = useCallback(() => {
        if (!disabled) {
          if (context) {
            context.setValue(optionValue);
          } else {
            onOptionSelect?.(optionValue);
          }
        }
      }, [disabled, optionValue, context, onOptionSelect]);

      return (
        <button
          ref={ref}
          type="button"
          role="option"
          aria-selected={isSelected}
          disabled={disabled}
          className={optionClasses}
          style={optionStyle}
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-selected={isSelected || undefined}
          data-disabled={disabled || undefined}
          {...props}
        >
          <span className="flex-1 text-left">{children}</span>
          {isSelected && (
            <Icon
              icon={BiCheck}
              className="shrink-0 size-4"
              aria-hidden
            />
          )}
        </button>
      );
    }
  )
);

SelectOption.displayName = 'Select.Option';

SelectRoot.displayName = 'Select';

// Compound Component
export const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Menu: SelectMenu,
  Option: SelectOption,
});

export { useSelectContext };
