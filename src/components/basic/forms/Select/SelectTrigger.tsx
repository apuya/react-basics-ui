import { forwardRef, memo, useCallback, useMemo, type ComponentPropsWithoutRef } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/basic/utility/Icon';
import { useSelectContext } from './SelectContext';
import {
  ICON_BASE_CLASSES,
  ICON_OPEN_CLASSES,
  ICON_STATE_STYLES,
  PLACEHOLDER_CLASSES,
  TRIGGER_BASE_CLASSES,
  TRIGGER_SIZE_STYLES,
  TRIGGER_STATE_STYLES,
  TRIGGER_STYLE,
} from './Select.styles';

export interface SelectTriggerProps extends Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
  placeholder?: string;
}

export const SelectTrigger = memo(
  forwardRef<HTMLButtonElement, SelectTriggerProps>(
    ({ placeholder = 'Select an option...', className, ...props }, ref) => {
      const { isOpen, setIsOpen, value, disabled, error, size, getOptionLabel, triggerId, menuId } = useSelectContext();

      const displayValue = useMemo(
        () => value ? getOptionLabel(value) || value : undefined,
        [value, getOptionLabel]
      );

      const triggerState = useMemo(
        () => isOpen ? 'open' : error ? 'error' : 'default',
        [isOpen, error]
      );

      const triggerClasses = useMemo(
        () => cn(
          TRIGGER_BASE_CLASSES,
          TRIGGER_SIZE_STYLES[size],
          TRIGGER_STATE_STYLES[triggerState],
          className
        ),
        [size, triggerState, className]
      );

      const triggerStyle = useMemo(
        () => TRIGGER_STYLE(size),
        [size]
      );

      const iconClasses = useMemo(
        () => cn(
          ICON_BASE_CLASSES,
          disabled ? ICON_STATE_STYLES.disabled : ICON_STATE_STYLES.default,
          isOpen && ICON_OPEN_CLASSES
        ),
        [disabled, isOpen]
      );

      const handleClick = useCallback(() => {
        if (!disabled) {
          setIsOpen(!isOpen);
        }
      }, [disabled, isOpen, setIsOpen]);

      return (
        <button
          ref={ref}
          id={triggerId}
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={isOpen ? menuId : undefined}
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
            className={iconClasses}
            aria-hidden
          />
        </button>
      );
    }
  )
);

SelectTrigger.displayName = 'Select.Trigger';
