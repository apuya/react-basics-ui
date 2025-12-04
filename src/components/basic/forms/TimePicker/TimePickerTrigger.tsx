import { forwardRef, memo, useCallback, useMemo } from 'react';
import { BiTime } from 'react-icons/bi';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/basic/utility/Icon';
import { Text } from '@/components/basic/typography/Text';
import { useTimePickerContext } from './TimePickerContext';
import { formatTimeDisplay } from './timePickerUtils';
import {
  TRIGGER_BASE_CLASSES,
  TRIGGER_SIZE_STYLES,
  TRIGGER_STATE_STYLES,
} from './TimePicker.styles';

// ============================================================================
// TimePickerTrigger Component
// ============================================================================

// Static mapping for icon sizes
const ICON_SIZE_MAP = { small: 'sm', default: 'md', large: 'lg' } as const;

export interface TimePickerTriggerProps {
  /** Placeholder text when no value is selected */
  placeholder?: string;
  /** ID for helper text element (for aria-describedby) */
  helperId?: string;
  /** Whether the field is required */
  required?: boolean;
}

export const TimePickerTrigger = memo(
  forwardRef<HTMLButtonElement, TimePickerTriggerProps>(function TimePickerTrigger(
    { placeholder = 'Select time', helperId, required },
    ref
  ) {
    const { isOpen, setIsOpen, value, disabled, error, size, triggerId, menuId, labelId } =
      useTimePickerContext();

    const displayValue = value ? formatTimeDisplay(value) : '';

    const handleClick = useCallback(() => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    }, [disabled, isOpen, setIsOpen]);

    const triggerClasses = useMemo(
      () =>
        cn(
          TRIGGER_BASE_CLASSES,
          TRIGGER_SIZE_STYLES[size],
          isOpen
            ? TRIGGER_STATE_STYLES.open
            : error
              ? TRIGGER_STATE_STYLES.error
              : TRIGGER_STATE_STYLES.default
        ),
      [size, isOpen, error]
    );

    const triggerStyle = useMemo(
      () => ({
        height: `var(--component-input-height-${size})`,
        paddingInline: 'var(--component-timepicker-trigger-padding-inline)',
        gap: 'var(--component-timepicker-trigger-gap)',
      }),
      [size]
    );

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
        aria-describedby={helperId}
        aria-invalid={error || undefined}
        aria-required={required || undefined}
        disabled={disabled}
        className={triggerClasses}
        style={triggerStyle}
        onClick={handleClick}
        data-size={size}
        data-error={error || undefined}
        data-open={isOpen}
      >
        <Icon
          icon={BiTime}
          size={ICON_SIZE_MAP[size]}
          color={disabled ? 'disabled' : 'secondary'}
          aria-hidden
        />
        <Text
          as="span"
          size={size === 'small' ? 'small' : 'body'}
          color={displayValue ? (disabled ? 'disabled' : 'primary') : 'tertiary'}
          className="flex-1 text-left"
        >
          {displayValue || placeholder}
        </Text>
      </button>
    );
  })
);

TimePickerTrigger.displayName = 'TimePicker.Trigger';
