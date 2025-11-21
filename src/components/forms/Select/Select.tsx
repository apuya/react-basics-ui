import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import {
  BASE_CLASSES,
  HELPER_CLASSES,
  HELPER_ERROR_CLASSES,
  ICON_CLASSES,
  ICON_DISABLED_CLASSES,
  LABEL_CLASSES,
  LABEL_ERROR_CLASSES,
  SIZE_STYLES,
  STATE_STYLES,
} from './Select.styles';

export type SelectSize = keyof typeof SIZE_STYLES;

export interface SelectProps extends Omit<ComponentPropsWithoutRef<'select'>, 'size'> {
  size?: SelectSize;
  error?: boolean;
  label?: string;
  helperText?: string;
  wrapperClassName?: string;
}

export const Select = memo(
  forwardRef<HTMLSelectElement, SelectProps>(function Select(
    {
      size = 'medium',
      error = false,
      label,
      helperText,
      className,
      wrapperClassName,
      id,
      disabled,
      children,
      ...rest
    },
    ref
  ) {
    const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const selectClasses = useMemo(
      () => cn(
        BASE_CLASSES,
        SIZE_STYLES[size],
        error ? STATE_STYLES.error : STATE_STYLES.default,
        className
      ),
      [size, error, className]
    );

    const selectStyle = useMemo(
      () => ({
        height: `var(--component-input-height-${size})`,
        paddingInline: 'var(--component-input-padding-inline)',
        paddingRight: 'calc(var(--component-input-padding-inline) * 2 + var(--component-input-icon-size-default))',
      }),
      [size]
    );

    return (
      <div className={cn('w-full', wrapperClassName)}>
        {label && (
          <label
            htmlFor={selectId}
            className={error ? LABEL_ERROR_CLASSES : LABEL_CLASSES}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={selectClasses}
            style={selectStyle}
            {...rest}
          >
            {children}
          </select>

          <span className={disabled ? ICON_DISABLED_CLASSES : ICON_CLASSES} aria-hidden="true">
            <BiChevronDown className="h-full w-full" />
          </span>
        </div>

        {helperText && (
          <p className={error ? HELPER_ERROR_CLASSES : HELPER_CLASSES}>
            {helperText}
          </p>
        )}
      </div>
    );
  })
);

Select.displayName = 'Select';
