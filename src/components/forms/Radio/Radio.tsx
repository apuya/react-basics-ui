import { cn } from '@/lib/cn';
import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import {
  DOT_CLASSES,
  INPUT_CLASSES,
  LABEL_CLASSES,
  RADIO_CLASSES,
  WRAPPER_CLASSES,
  WRAPPER_DISABLED_CLASSES,
} from './Radio.styles';

export interface RadioProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  label?: string;
  wrapperClassName?: string;
}

export const Radio = memo(
  forwardRef<HTMLInputElement, RadioProps>(function Radio(
    { label, disabled, className, wrapperClassName, id, ...rest },
    ref
  ) {
    const radioId = id || (label ? `radio-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

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
          {...rest}
        />
        <span
          className={RADIO_CLASSES}
          aria-hidden="true"
          style={{
            width: 'var(--component-radio-size)',
            height: 'var(--component-radio-size)',
          }}
        >
          <span
            className={DOT_CLASSES}
            style={{
              width: 'var(--component-radio-dot-size)',
              height: 'var(--component-radio-dot-size)',
            }}
          />
        </span>
        {label && <span className={LABEL_CLASSES}>{label}</span>}
      </label>
    );
  })
);

Radio.displayName = 'Radio';
