import { cn } from '@/lib/cn';
import { generateFormId } from '@/lib/generateFormId';
import { useControlledState } from '@/hooks/useControlledState';
import { forwardRef, memo, useCallback, useMemo, type ComponentPropsWithoutRef } from 'react';
import {
  INPUT_CLASSES,
  LABEL_CLASSES,
  SIZE_THUMB_CHECKED_STYLES,
  SIZE_THUMB_STYLES,
  SIZE_TRACK_STYLES,
  THUMB_CLASSES,
  TRACK_CLASSES,
  WRAPPER_BASE_CLASSES,
  WRAPPER_STATE_STYLES,
} from './Switch.styles';

export type SwitchSize = 'small' | 'default' | 'large';

export interface SwitchProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'size' | 'onChange'> {
  /** Size variant of the switch */
  size?: SwitchSize;
  /** Label text displayed next to the switch */
  label?: string;
  /** Controlled checked state */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Additional className for the wrapper element */
  wrapperClassName?: string;
}

const WRAPPER_STYLE = { WebkitTapHighlightColor: 'transparent' } as const;

export const Switch = memo(
  forwardRef<HTMLInputElement, SwitchProps>(function Switch(
    { 
      size = 'default', 
      label, 
      checked,
      defaultChecked = false,
      onCheckedChange,
      disabled, 
      className, 
      wrapperClassName, 
      id, 
      ...rest 
    },
    ref
  ) {
    const [isChecked, setIsChecked] = useControlledState(
      checked,
      defaultChecked,
      onCheckedChange
    );

    const switchId = id || generateFormId('switch', label);

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
      },
      [setIsChecked]
    );

    const wrapperClasses = useMemo(
      () =>
        cn(
          WRAPPER_BASE_CLASSES,
          disabled ? WRAPPER_STATE_STYLES.disabled : WRAPPER_STATE_STYLES.enabled,
          wrapperClassName
        ),
      [disabled, wrapperClassName]
    );

    const trackClasses = useMemo(
      () => cn(TRACK_CLASSES, SIZE_TRACK_STYLES[size], SIZE_THUMB_CHECKED_STYLES[size]),
      [size]
    );

    const thumbClasses = useMemo(
      () => cn(THUMB_CLASSES, SIZE_THUMB_STYLES[size]),
      [size]
    );

    return (
      <label
        className={wrapperClasses}
        style={WRAPPER_STYLE}
        data-disabled={disabled || undefined}
      >
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={switchId}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          className={cn(INPUT_CLASSES, className)}
          data-size={size}
          data-checked={isChecked || undefined}
          {...rest}
        />
        <span className={trackClasses} aria-hidden="true">
          <span className={thumbClasses} />
        </span>
        {label && <span className={LABEL_CLASSES}>{label}</span>}
      </label>
    );
  })
);

Switch.displayName = 'Switch';

