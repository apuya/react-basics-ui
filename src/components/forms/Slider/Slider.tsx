import { cn } from '@/lib/cn';
import { generateFormId } from '@/lib/generateFormId';
import { useControlledState } from '@/hooks/useControlledState';
import { forwardRef, memo, useCallback, useMemo, type ComponentPropsWithoutRef } from 'react';
import {
  INPUT_BASE_CLASSES,
  INPUT_FOCUS_RING,
  INPUT_MOZ_RANGE_THUMB,
  INPUT_MOZ_RANGE_TRACK,
  INPUT_WEBKIT_SLIDER_RUNNABLE_TRACK,
  INPUT_WEBKIT_SLIDER_THUMB,
  LABEL_BASE_CLASSES,
  LABEL_STATE_STYLES,
  VALUE_BASE_CLASSES,
  VALUE_STATE_STYLES,
  WRAPPER_CLASSES,
} from './Slider.styles';

// Static styles for spacing
const LABEL_STYLE = { marginBottom: 'var(--component-slider-label-gap)' } as const;
const VALUE_STYLE = { marginTop: 'var(--component-slider-value-gap)' } as const;

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

    const labelClasses = useMemo(
      () => cn(
        LABEL_BASE_CLASSES,
        disabled ? LABEL_STATE_STYLES.disabled : LABEL_STATE_STYLES.enabled
      ),
      [disabled]
    );

    const inputClasses = useMemo(
      () => cn(
        INPUT_BASE_CLASSES,
        INPUT_WEBKIT_SLIDER_RUNNABLE_TRACK,
        INPUT_MOZ_RANGE_TRACK,
        INPUT_WEBKIT_SLIDER_THUMB,
        INPUT_MOZ_RANGE_THUMB,
        INPUT_FOCUS_RING,
        className
      ),
      [className]
    );

    const valueClasses = useMemo(
      () => cn(
        VALUE_BASE_CLASSES,
        disabled ? VALUE_STATE_STYLES.disabled : VALUE_STATE_STYLES.enabled
      ),
      [disabled]
    );

    return (
      <div className={cn(WRAPPER_CLASSES, wrapperClassName)}>
        {label && (
          <label
            htmlFor={sliderId}
            className={labelClasses}
            style={LABEL_STYLE}
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
          <div className={valueClasses} style={VALUE_STYLE}>
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
