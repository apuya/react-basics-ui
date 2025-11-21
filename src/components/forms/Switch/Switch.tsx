import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
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

    const trackStyle = useMemo(
      () => ({
        width: 'var(--component-switch-width)',
        height: 'var(--component-switch-height)',
        borderRadius: 'var(--component-switch-radius)',
      }),
      []
    );

    const thumbStyle = useMemo(
      () => ({
        width: 'var(--component-switch-thumb-size)',
        height: 'var(--component-switch-thumb-size)',
      }),
      []
    );

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
          style={trackStyle}
        >
          <span
            className={THUMB_CLASSES}
            style={thumbStyle}
          />
        </span>
        {label && <span className={LABEL_CLASSES}>{label}</span>}
      </label>
    );
  })
);

Switch.displayName = 'Switch';
