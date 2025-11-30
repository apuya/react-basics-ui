import { cn } from '@/lib/cn';
import { generateFormId } from '@/lib/generateFormId';
import { useControlledState } from '@/hooks/useControlledState';
import { forwardRef, memo, useCallback, type ComponentPropsWithoutRef } from 'react';
import {
  INPUT_BASE_CLASSES,
  INPUT_FOCUS_RING,
  INPUT_MOZ_RANGE_THUMB,
  INPUT_MOZ_RANGE_TRACK,
  INPUT_WEBKIT_SLIDER_RUNNABLE_TRACK,
  INPUT_WEBKIT_SLIDER_THUMB,
  LABEL_CLASSES,
  LABEL_DISABLED_CLASSES,
  VALUE_DISABLED_CLASSES,
  VALUE_DISPLAY_CLASSES,
  WRAPPER_CLASSES,
} from './Slider.styles';

export interface SliderProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'onChange'> {
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Current value (controlled) */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Callback when value changes */
  onValueChange?: (value: number) => void;
  /** Label for the slider */
  label?: string;
  /** Whether to show the current value */
  showValue?: boolean;
  /** Whether to show min/max labels */
  showMinMax?: boolean;
  /** Custom formatter for value display */
  formatValue?: (value: number) => string;
  /** Wrapper className */
  wrapperClassName?: string;
}

export const Slider = memo(
  forwardRef<HTMLInputElement, SliderProps>(function Slider(
    {
      className,
      wrapperClassName,
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue,
      onValueChange,
      label,
      showValue = false,
      showMinMax = false,
      formatValue = (val) => String(val),
      disabled,
      id,
      ...props
    },
    ref
  ) {
    const [currentValue, setValue] = useControlledState(
      value,
      defaultValue ?? min,
      onValueChange
    );

    const sliderId = id || generateFormId('slider', label);

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        setValue(newValue);
      },
      [setValue]
    );

    const inputClasses = cn(
      INPUT_BASE_CLASSES,
      INPUT_WEBKIT_SLIDER_RUNNABLE_TRACK,
      INPUT_MOZ_RANGE_TRACK,
      INPUT_WEBKIT_SLIDER_THUMB,
      INPUT_MOZ_RANGE_THUMB,
      INPUT_FOCUS_RING,
      className
    );

    return (
      <div className={cn(WRAPPER_CLASSES, wrapperClassName)}>
        {label && (
          <label
            htmlFor={sliderId}
            className={disabled ? LABEL_DISABLED_CLASSES : LABEL_CLASSES}
          >
            {label}
          </label>
        )}
        
        <input
          ref={ref}
          type="range"
          id={sliderId}
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          className={inputClasses}
          data-disabled={disabled || undefined}
          {...props}
        />
        
        {(showValue || showMinMax) && (
          <div className={disabled ? VALUE_DISABLED_CLASSES : VALUE_DISPLAY_CLASSES}>
            {showMinMax && <span>{formatValue(min)}</span>}
            {showValue && (
              <span className={showMinMax ? '' : 'ml-auto'}>
                {formatValue(currentValue)}
              </span>
            )}
            {showMinMax && <span>{formatValue(max)}</span>}
          </div>
        )}
      </div>
    );
  })
);

Slider.displayName = 'Slider';
