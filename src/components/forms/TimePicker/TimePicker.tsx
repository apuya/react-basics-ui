import React from 'react';

export interface TimePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Selected time */
  value?: string;
  /** Default time */
  defaultValue?: string;
  /** Callback when time changes */
  onTimeChange?: (time: string) => void;
}

export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({ className, onTimeChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onTimeChange?.(e.target.value);
      onChange?.(e);
    };

    return (
      <input
        type="time"
        ref={ref}
        className={className}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

TimePicker.displayName = 'TimePicker';
