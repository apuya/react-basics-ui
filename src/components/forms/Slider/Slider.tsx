import { cn } from '@/lib/cn';
import { generateFormId } from '@/lib/generateFormId';
import { useControlledState } from '@/hooks/useControlledState';
import { forwardRef, memo, useCallback, useMemo, type ComponentPropsWithoutRef } from 'react';
import {
  FILL_BASE_CLASSES,
  FILL_VARIANT_STYLES,
  INPUT_BASE_CLASSES,
  INPUT_SIZE_STYLES,
  LABEL_BASE_CLASSES,
  LABEL_STATE_STYLES,
  SLIDER_CONTAINER_CLASSES,
  type SliderSize,
  type SliderVariant,
  TRACK_BASE_CLASSES,
  TRACK_SIZE_STYLES,
  VALUE_BASE_CLASSES,
  VALUE_STATE_STYLES,
  WRAPPER_CLASSES,
} from './Slider.styles';

// Static styles for spacing
const LABEL_STYLE = { marginBottom: 'var(--component-slider-label-gap)' } as const;
const VALUE_STYLE = { marginTop: 'var(--component-slider-value-gap)' } as const;

export interface SliderProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'onChange' | 'size'> {
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
  /** Size variant */
  size?: SliderSize;
  /** Color variant */
  variant?: SliderVariant;
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
      size = 'default',
      variant = 'default',
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

    const formatter = useCallback(formatValue, [formatValue]);

    // Calculate percentage for fill
    const percentage = useMemo(() => {
      const range = max - min;
      if (range === 0) return 0;
      return Math.max(0, Math.min(100, ((currentValue - min) / range) * 100));
    }, [currentValue, min, max]);

    const labelClasses = useMemo(
      () => cn(
        LABEL_BASE_CLASSES,
        disabled ? LABEL_STATE_STYLES.disabled : LABEL_STATE_STYLES.enabled
      ),
      [disabled]
    );

    const trackClasses = useMemo(
      () => cn(TRACK_BASE_CLASSES, TRACK_SIZE_STYLES[size]),
      [size]
    );

    const fillClasses = useMemo(
      () => cn(FILL_BASE_CLASSES, FILL_VARIANT_STYLES[variant]),
      [variant]
    );

    const inputClasses = useMemo(
      () => cn(INPUT_BASE_CLASSES, INPUT_SIZE_STYLES[size], className),
      [size, className]
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
        
        <div className={SLIDER_CONTAINER_CLASSES}>
          {/* Track with fill */}
          <div className={trackClasses}>
            <div
              className={fillClasses}
              style={{ width: `${percentage}%` }}
            />
          </div>
          
          {/* Invisible range input overlaid on top */}
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
            data-size={size}
            data-variant={variant}
            aria-label={label}
            aria-valuenow={currentValue}
            aria-valuemin={min}
            aria-valuemax={max}
            {...props}
          />
        </div>
        
        {(showValue || showMinMax) && (
          <div className={valueClasses} style={VALUE_STYLE}>
            {showMinMax && <span>{formatter(min)}</span>}
            {showValue && (
              <span className={!showMinMax ? 'ml-auto' : undefined}>
                {formatter(currentValue)}
              </span>
            )}
            {showMinMax && <span>{formatter(max)}</span>}
          </div>
        )}
      </div>
    );
  })
);

Slider.displayName = 'Slider';

export type { SliderSize, SliderVariant };
