import {
  createContext,
  forwardRef,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { cn } from '@/lib/cn';
import { BiCheck, BiChevronDown } from 'react-icons/bi';
import {
  HELPER_CLASSES,
  HELPER_ERROR_CLASSES,
  ICON_CLASSES,
  ICON_DISABLED_CLASSES,
  ICON_OPEN_CLASSES,
  LABEL_CLASSES,
  LABEL_ERROR_CLASSES,
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
}

const SelectContext = createContext<SelectContextValue | undefined>(undefined);

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select components must be used within a Select');
  }
  return context;
};

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
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [optionLabels, setOptionLabels] = useState<Map<string, string>>(new Map());

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const setValue = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
      setIsOpen(false);
    },
    [isControlled, onChange]
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

  const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

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
    }),
    [isOpen, value, setValue, disabled, error, size, getOptionLabel, registerOption]
  );

  return (
    <SelectContext.Provider value={contextValue}>
      <div className={cn('w-full', className)}>
        {label && (
          <label
            htmlFor={selectId}
            className={error ? LABEL_ERROR_CLASSES : LABEL_CLASSES}
          >
            {label}
          </label>
        )}
        <div className={WRAPPER_CLASSES}>
          {children}
        </div>
        {helperText && (
          <p className={error ? HELPER_ERROR_CLASSES : HELPER_CLASSES}>
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
      const { isOpen, setIsOpen, value, disabled, error, size, getOptionLabel } = useSelectContext();

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
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          disabled={disabled}
          className={triggerClasses}
          style={triggerStyle}
          onClick={handleClick}
          {...props}
        >
          <span className={!displayValue ? PLACEHOLDER_CLASSES : undefined}>
            {displayValue || placeholder}
          </span>
          <BiChevronDown
            className={cn(
              disabled ? ICON_DISABLED_CLASSES : ICON_CLASSES,
              isOpen && ICON_OPEN_CLASSES
            )}
            aria-hidden="true"
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
      const { isOpen, setIsOpen } = useSelectContext();
      const menuRef = useRef<HTMLDivElement>(null!);

      const menuStyle = useMemo(
        () => ({
          paddingInline: 'var(--component-dropdown-padding-inline)',
          paddingBlock: 'var(--component-dropdown-padding-block)',
          top: '100%',
          marginTop: '0.5rem',
        }),
        []
      );

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
          role="listbox"
          className={menuClasses}
          style={menuStyle}
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
}

const SelectOption = memo(
  forwardRef<HTMLButtonElement, SelectOptionProps>(
    ({ value: optionValue, disabled = false, className, children, ...props }, ref) => {
      const { value, setValue, registerOption } = useSelectContext();
      const [isHovered, setIsHovered] = useState(false);
      const isSelected = value === optionValue;

      // Register option label
      useEffect(() => {
        const label = typeof children === 'string' ? children : optionValue;
        registerOption(optionValue, label);
      }, [optionValue, children, registerOption]);

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
          setValue(optionValue);
        }
      }, [disabled, optionValue, setValue]);

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
          {...props}
        >
          <span className="flex-1 text-left">{children}</span>
          {isSelected && (
            <BiCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
          )}
        </button>
      );
    }
  )
);

SelectOption.displayName = 'Select.Option';

// Compound Component
export const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Menu: SelectMenu,
  Option: SelectOption,
});
