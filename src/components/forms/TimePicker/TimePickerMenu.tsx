import { forwardRef, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { cn } from '@/lib/cn';
import { useTimePickerContext } from './TimePickerContext';
import { Button } from '@/components/forms/Button';
import {
  generateHourOptions,
  generateMinuteOptions,
  generateMeridiemOptions,
} from './timePickerUtils';
import { MENU_BASE_CLASSES, MENU_VISIBLE_CLASS } from './TimePicker.styles';

// Static classes
const COLUMN_CLASSES = 'py-1 px-1 max-h-60';

// ============================================================================
// TimePickerMenu Component
// ============================================================================

export interface TimePickerMenuProps {
  /** Additional class name */
  className?: string;
  /** Show confirmation footer with Cancel/Save buttons */
  showConfirmation?: boolean;
  /** Label for cancel button */
  cancelLabel?: string;
  /** Label for save button */
  saveLabel?: string;
  /** Callback when cancel is clicked */
  onCancel?: () => void;
  /** Callback when save is clicked */
  onSave?: () => void;
}

export const TimePickerMenu = memo(
  forwardRef<HTMLDivElement, TimePickerMenuProps>(function TimePickerMenu(
    {
      className,
      showConfirmation = false,
      cancelLabel = 'Cancel',
      saveLabel = 'Save',
      onCancel,
      onSave,
    },
    ref
  ) {
    const {
      isOpen,
      setIsOpen,
      step,
      menuId,
      labelId,
      selectedHour,
      selectedMinute,
      selectedMeridiem,
      setSelectedHour,
      setSelectedMinute,
      setSelectedMeridiem,
    } = useTimePickerContext();

    const hourColumnRef = useRef<HTMLDivElement>(null);
    const minuteColumnRef = useRef<HTMLDivElement>(null);

    const menuClasses = useMemo(
      () => cn(MENU_BASE_CLASSES, isOpen && MENU_VISIBLE_CLASS, className),
      [isOpen, className]
    );

    const hourOptions = useMemo(() => generateHourOptions(), []);
    const minuteOptions = useMemo(() => generateMinuteOptions(step), [step]);
    const meridiemOptions = useMemo(() => generateMeridiemOptions(), []);

    // Scroll selected items into view when menu opens
    useEffect(() => {
      if (!isOpen) return;

      const timer = setTimeout(() => {
        if (selectedHour !== undefined && hourColumnRef.current) {
          const hourItem = hourColumnRef.current.querySelector(`[data-value="${selectedHour}"]`);
          if (hourItem && typeof (hourItem as HTMLElement).scrollIntoView === 'function') {
            (hourItem as HTMLElement).scrollIntoView({ block: 'center', behavior: 'instant' });
          }
        }

        if (selectedMinute !== undefined && minuteColumnRef.current) {
          const minuteItem = minuteColumnRef.current.querySelector(
            `[data-value="${selectedMinute}"]`
          );
          if (minuteItem && typeof (minuteItem as HTMLElement).scrollIntoView === 'function') {
            (minuteItem as HTMLElement).scrollIntoView({ block: 'center', behavior: 'instant' });
          }
        }
      }, 0);

      return () => clearTimeout(timer);
    }, [isOpen, selectedHour, selectedMinute]);

    const handleCancel = useCallback(() => {
      onCancel?.();
      setIsOpen(false);
    }, [onCancel, setIsOpen]);

    const handleSave = useCallback(() => {
      onSave?.();
      setIsOpen(false);
    }, [onSave, setIsOpen]);

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        id={menuId}
        role="listbox"
        aria-labelledby={labelId}
        aria-multiselectable="false"
        className={menuClasses}
      >
        <div className="grid grid-cols-3">
          {/* Hour Column */}
          <div ref={hourColumnRef} className={cn('overflow-y-auto scrollbar-hidden', COLUMN_CLASSES)}>
            {hourOptions.map((hour) => (
              <ColumnOption
                key={hour}
                value={hour}
                label={hour.toString()}
                isSelected={selectedHour === hour}
                onClick={setSelectedHour}
              />
            ))}
          </div>

          {/* Minute Column */}
          <div ref={minuteColumnRef} className={cn('overflow-y-auto scrollbar-hidden', COLUMN_CLASSES)}>
            {minuteOptions.map((minute) => (
              <ColumnOption
                key={minute}
                value={minute}
                label={minute.toString().padStart(2, '0')}
                isSelected={selectedMinute === minute}
                onClick={setSelectedMinute}
              />
            ))}
          </div>

          {/* Meridiem Column */}
          <div className={cn('overflow-y-auto scrollbar-hidden', COLUMN_CLASSES)}>
            {meridiemOptions.map((meridiem) => (
              <ColumnOption
                key={meridiem}
                value={meridiem}
                label={meridiem}
                isSelected={selectedMeridiem === meridiem}
                onClick={setSelectedMeridiem}
              />
            ))}
          </div>
        </div>

        {/* Confirmation Footer */}
        {showConfirmation && (
          <div
            className="flex p-2 gap-2 border-t border-[color:var(--component-dropdown-border)] bg-[color:var(--component-dropdown-bg)]"
          >
            <Button variant="ghost" size="small" onClick={handleCancel} className="flex-1">
              {cancelLabel}
            </Button>
            <Button variant="primary" size="small" onClick={handleSave} className="flex-1">
              {saveLabel}
            </Button>
          </div>
        )}
      </div>
    );
  })
);

TimePickerMenu.displayName = 'TimePicker.Menu';

// ============================================================================
// ColumnOption Component (internal)
// ============================================================================

interface ColumnOptionProps {
  value: string | number;
  label: string;
  isSelected: boolean;
  onClick: (value: never) => void;
}

const COLUMN_OPTION_BASE = 'flex items-center justify-center w-full min-h-10 py-2 cursor-pointer transition-colors text-sm font-normal';
const COLUMN_OPTION_DEFAULT = 'bg-[color:var(--component-dropdown-item-bg-default)] text-[color:var(--component-dropdown-item-text-default)] hover:bg-[color:var(--component-dropdown-item-bg-hover)] hover:text-[color:var(--component-dropdown-item-text-hover)]';
const COLUMN_OPTION_SELECTED = 'bg-[color:var(--component-dropdown-item-bg-selected)] text-[color:var(--component-dropdown-item-text-active)] font-medium';

const ColumnOption = memo(function ColumnOption({
  value,
  label,
  isSelected,
  onClick,
}: ColumnOptionProps) {
  const handleClick = useCallback(() => onClick(value as never), [onClick, value]);

  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      className={cn(COLUMN_OPTION_BASE, isSelected ? COLUMN_OPTION_SELECTED : COLUMN_OPTION_DEFAULT)}
      onClick={handleClick}
      data-value={value}
      data-selected={isSelected || undefined}
    >
      {label}
    </button>
  );
});

ColumnOption.displayName = 'TimePicker.ColumnOption';
