import { forwardRef, memo } from 'react';
import { useFormFieldContext } from './FormFieldContext';
import { Label, type LabelProps } from '@/components/typography/Label';
import { Text, type TextProps } from '@/components/typography/Text';

// =============================================================================
// Shared Types
// =============================================================================

/** Base props for FormField message components */
type BaseMessageProps = Omit<TextProps, 'as' | 'color'>;

// =============================================================================
// FormField.Label
// =============================================================================

export interface FormFieldLabelProps extends Omit<LabelProps, 'required' | 'disabled'> {
  /** Override required indicator from context */
  showRequired?: boolean;
}

/**
 * FormField.Label - Label component that automatically receives state from FormField context.
 */
export const FormFieldLabel = memo(
  forwardRef<HTMLLabelElement, FormFieldLabelProps>(function FormFieldLabel(
    { children, showRequired, size = 'small', weight = 'medium', color = 'primary', ...rest },
    ref
  ) {
    const { required, disabled } = useFormFieldContext();

    return (
      <Label
        ref={ref}
        size={size}
        weight={weight}
        color={color}
        required={showRequired ?? required}
        disabled={disabled}
        {...rest}
      >
        {children}
      </Label>
    );
  })
);

FormFieldLabel.displayName = 'FormField.Label';

// =============================================================================
// FormField.HelperText & FormField.ErrorMessage
// =============================================================================

export interface FormFieldHelperTextProps extends BaseMessageProps {}
export interface FormFieldErrorMessageProps extends BaseMessageProps {}

/** Internal component for both HelperText and ErrorMessage */
const createFormFieldMessage = (variant: 'helper' | 'error') =>
  memo(
    forwardRef<HTMLElement, BaseMessageProps>(function FormFieldMessage(
      { children, size = 'caption', ...rest },
      ref
    ) {
      const { helperId, error } = useFormFieldContext();

      // Helper shows when no error, Error shows when error
      const shouldRender = variant === 'error' ? error : !error;
      if (!shouldRender) return null;

      return (
        <Text
          ref={ref}
          as="p"
          id={helperId}
          size={size}
          color={variant === 'error' ? 'error' : 'secondary'}
          role={variant === 'error' ? 'alert' : undefined}
          {...rest}
        >
          {children}
        </Text>
      );
    })
  );

export const FormFieldHelperText = createFormFieldMessage('helper');
FormFieldHelperText.displayName = 'FormField.HelperText';

export const FormFieldErrorMessage = createFormFieldMessage('error');
FormFieldErrorMessage.displayName = 'FormField.ErrorMessage';
