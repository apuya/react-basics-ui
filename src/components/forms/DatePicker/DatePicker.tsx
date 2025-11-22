import React from 'react';

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Selected date */
  value?: string;
  /** Default date */
  defaultValue?: string;
  /** Callback when date changes */
  onDateChange?: (date: string) => void;
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, onDateChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onDateChange?.(e.target.value);
      onChange?.(e);
    };

    return (
      <input
        type="date"
        ref={ref}
        className={className}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

DatePicker.displayName = 'DatePicker';
