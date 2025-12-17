import { generateFormId } from '@/lib/generateFormId';
import { forwardRef, memo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { BaseInputField } from '../BaseInputField';
import { FormField } from '../FormField';

export type InputSize = 'small' | 'default' | 'large';

export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
  /** Size variant of the input */
  size?: InputSize;
  /** Indicates validation error state */
  error?: boolean;
  /** Label text displayed above the input */
  label?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Icon displayed at the start of the input */
  leadingIcon?: ReactNode;
  /** Icon displayed at the end of the input */
  trailingIcon?: ReactNode;
  /** Suffix text displayed inside the input, aligned right (e.g., "kg", "cm", "$") */
  suffix?: string;
  /** Additional className for the wrapper element */
  wrapperClassName?: string;
}

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(function Input(
    {
      size = 'default',
      error = false,
      label,
      helperText,
      leadingIcon,
      trailingIcon,
      suffix,
      className,
      wrapperClassName,
      id,
      disabled,
      ...rest
    },
    ref
  ) {
    const inputId = id || generateFormId('input', label);

    // If no label or helperText, render input directly wrapped in FormField
    if (!label && !helperText) {
      return (
        <FormField error={error} disabled={disabled} className={wrapperClassName}>
          <BaseInputField
            ref={ref}
            id={inputId}
            size={size}
            variant="input"
            error={error}
            disabled={disabled}
            leadingIcon={leadingIcon}
            trailingIcon={trailingIcon}
            suffix={suffix}
            className={className}
            cssPrefix="input"
            {...rest}
          />
        </FormField>
      );
    }

    return (
      <FormField error={error} disabled={disabled} className={wrapperClassName}>
        {label && <FormField.Label htmlFor={inputId}>{label}</FormField.Label>}
        <BaseInputField
          ref={ref}
          id={inputId}
          size={size}
          variant="input"
          error={error}
          disabled={disabled}
          leadingIcon={leadingIcon}
          trailingIcon={trailingIcon}
          suffix={suffix}
          className={className}
          cssPrefix="input"
          {...rest}
        />
        {helperText && !error && <FormField.HelperText>{helperText}</FormField.HelperText>}
        {helperText && error && <FormField.ErrorMessage>{helperText}</FormField.ErrorMessage>}
      </FormField>
    );
  })
);

Input.displayName = 'Input';
