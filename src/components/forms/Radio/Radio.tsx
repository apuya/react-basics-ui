import { cn } from '@/lib/cn';
import { generateFormId } from '@/lib/generateFormId';
import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import {
  DOT_CLASSES,
  INPUT_CLASSES,
  LABEL_CLASSES,
  RADIO_CLASSES,
  SIZE_DOT_STYLES,
  SIZE_RADIO_STYLES,
  WRAPPER_BASE_CLASSES,
  WRAPPER_STATE_STYLES,
} from './Radio.styles';

export type RadioSize = 'small' | 'default' | 'large';

export interface RadioProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'size'> {
  /** Size variant of the radio button */
  size?: RadioSize;
  /** Label text displayed next to the radio button */
  label?: string;
  /** Additional className for the wrapper element */
  wrapperClassName?: string;
}

export const Radio = memo(
  forwardRef<HTMLInputElement, RadioProps>(function Radio(
    { size = 'default', label, disabled, className, wrapperClassName, id, ...rest },
    ref
  ) {
    const radioId = id || generateFormId('radio', label);

    const wrapperClasses = useMemo(
      () => cn(
        WRAPPER_BASE_CLASSES,
        disabled ? WRAPPER_STATE_STYLES.disabled : WRAPPER_STATE_STYLES.enabled,
        wrapperClassName
      ),
      [disabled, wrapperClassName]
    );

    const radioClasses = useMemo(
      () => cn(RADIO_CLASSES, SIZE_RADIO_STYLES[size]),
      [size]
    );

    const dotClasses = useMemo(
      () => cn(DOT_CLASSES, SIZE_DOT_STYLES[size]),
      [size]
    );

    return (
      <label
        className={wrapperClasses}
        data-disabled={disabled || undefined}
      >
        <input
          ref={ref}
          type="radio"
          id={radioId}
          disabled={disabled}
          className={cn(INPUT_CLASSES, className)}
          data-size={size}
          {...rest}
        />
        <span
          className={radioClasses}
          aria-hidden="true"
        >
          <span className={dotClasses} />
        </span>
        {label && <span className={LABEL_CLASSES}>{label}</span>}
      </label>
    );
  })
);

Radio.displayName = 'Radio';
