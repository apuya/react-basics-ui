import React from 'react';

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Current value */
  value?: number;
  /** Default value */
  defaultValue?: number;
  /** Callback when value changes */
  onValueChange?: (value: number) => void;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, min = 0, max = 100, step = 1, ...props }, ref) => {
    return (
      <input
        type="range"
        ref={ref}
        min={min}
        max={max}
        step={step}
        className={className}
        {...props}
      />
    );
  }
);

Slider.displayName = 'Slider';
