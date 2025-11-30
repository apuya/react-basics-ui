import { cn } from '@/lib/cn';
import { generateFormId } from '@/lib/generateFormId';
import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import {
  DOT_CLASSES,
  INPUT_CLASSES,
  LABEL_CLASSES,
  RADIO_CLASSES,
  SIZE_DOT_STYLES,
  SIZE_RADIO_STYLES,
  WRAPPER_CLASSES,
  WRAPPER_DISABLED_CLASSES,
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

    return (
      <label
        className={cn(
          disabled ? WRAPPER_DISABLED_CLASSES : WRAPPER_CLASSES,
          wrapperClassName
        )}
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
          className={cn(RADIO_CLASSES, SIZE_RADIO_STYLES[size])}
          aria-hidden="true"
        >
          <span
            className={cn(DOT_CLASSES, SIZE_DOT_STYLES[size])}
          />
        </span>
        {label && <span className={LABEL_CLASSES}>{label}</span>}
      </label>
    );
  })
);

Radio.displayName = 'Radio';
