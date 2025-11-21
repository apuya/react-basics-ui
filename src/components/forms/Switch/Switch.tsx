import { cn } from '@/lib/cn';
import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import {
  INPUT_CLASSES,
  LABEL_CLASSES,
  SIZE_THUMB_STYLES,
  SIZE_TRACK_STYLES,
  THUMB_CLASSES,
  TRACK_CLASSES,
  WRAPPER_CLASSES,
  WRAPPER_DISABLED_CLASSES,
} from './Switch.styles';

export type SwitchSize = 'small' | 'default' | 'large';

export interface SwitchProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'size'> {
  size?: SwitchSize;
  label?: string;
  wrapperClassName?: string;
}

export const Switch = memo(
  forwardRef<HTMLInputElement, SwitchProps>(function Switch(
    { size = 'default', label, disabled, className, wrapperClassName, id, ...rest },
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
          className={cn(TRACK_CLASSES, SIZE_TRACK_STYLES[size])}
          aria-hidden="true"
        >
          <span
            className={cn(THUMB_CLASSES, SIZE_THUMB_STYLES[size])}
          />
        </span>
        {label && <span className={LABEL_CLASSES}>{label}</span>}
      </label>
    );
  })
);

Switch.displayName = 'Switch';
