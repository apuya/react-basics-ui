import { cn } from '@/lib/cn';
import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import {
  INPUT_CLASSES,
  LABEL_CLASSES,
  THUMB_CLASSES,
  TRACK_CLASSES,
  WRAPPER_CLASSES,
  WRAPPER_DISABLED_CLASSES,
} from './Switch.styles';

export interface SwitchProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  label?: string;
  wrapperClassName?: string;
}

export const Switch = memo(
  forwardRef<HTMLInputElement, SwitchProps>(function Switch(
    { label, disabled, className, wrapperClassName, id, ...rest },
    ref
  ) {
    const switchId = id || (label ? `switch-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <label
        className={cn(
          disabled ? WRAPPER_DISABLED_CLASSES : WRAPPER_CLASSES,
          wrapperClassName
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={switchId}
          disabled={disabled}
          className={cn(INPUT_CLASSES, className)}
          {...rest}
        />
        <span
          className={TRACK_CLASSES}
          aria-hidden="true"
          style={{
            width: 'var(--component-switch-width)',
            height: 'var(--component-switch-height)',
            borderRadius: 'var(--component-switch-radius)',
          }}
        >
          <span
            className={THUMB_CLASSES}
            style={{
              width: 'var(--component-switch-thumb-size)',
              height: 'var(--component-switch-thumb-size)',
            }}
          />
        </span>
        {label && <span className={LABEL_CLASSES}>{label}</span>}
      </label>
    );
  })
);

Switch.displayName = 'Switch';
