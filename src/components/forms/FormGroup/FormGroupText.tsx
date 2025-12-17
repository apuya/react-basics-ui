import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { useFormGroupContext } from './FormGroupContext';
import { Text, type TextProps } from '@/components/typography/Text';

// =============================================================================
// Shared Types
// =============================================================================

/** Base props for FormGroup text components */
type BaseTextProps = Omit<TextProps, 'as'>;

// =============================================================================
// FormGroup.Legend
// =============================================================================

export interface FormGroupLegendProps extends Omit<ComponentPropsWithoutRef<'legend'>, 'color'> {
  /** Size of the legend text */
  size?: 'small' | 'body';
  /** Weight of the legend text */
  weight?: 'medium' | 'semibold';
}

/**
 * FormGroup.Legend - Legend component for the fieldset.
 * Uses semantic <legend> element for accessibility.
 * Automatically receives disabled state from FormGroup context.
 */
export const FormGroupLegend = memo(
  forwardRef<HTMLLegendElement, FormGroupLegendProps>(function FormGroupLegend(
    { children, size = 'body', weight = 'semibold', className, ...rest },
    ref
  ) {
    const { disabled, required } = useFormGroupContext();

    return (
      <Text
        ref={ref as React.Ref<HTMLElement>}
        as="legend"
        size={size}
        weight={weight}
        color={disabled ? 'secondary' : 'primary'}
        className={className}
        {...(rest as Omit<TextProps, 'as'>)}
      >
        {children}
        {required && <span aria-hidden="true"> *</span>}
      </Text>
    );
  })
);

FormGroupLegend.displayName = 'FormGroup.Legend';

// =============================================================================
// FormGroup.Description & FormGroup.ErrorMessage
// =============================================================================

export interface FormGroupDescriptionProps extends BaseTextProps {}
export interface FormGroupErrorMessageProps extends Omit<BaseTextProps, 'color'> {}

/** Internal factory for Description and ErrorMessage */
const createFormGroupMessage = (variant: 'description' | 'error') =>
  memo(
    forwardRef<HTMLElement, BaseTextProps>(function FormGroupMessage(
      { children, size = 'caption', ...rest },
      ref
    ) {
      const { errorId, error } = useFormGroupContext();

      // Error only shows when error, Description always shows
      if (variant === 'error' && !error) return null;

      return (
        <Text
          ref={ref}
          as="p"
          id={variant === 'error' ? errorId : undefined}
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

export const FormGroupDescription = createFormGroupMessage('description');
FormGroupDescription.displayName = 'FormGroup.Description';

export const FormGroupErrorMessage = createFormGroupMessage('error');
FormGroupErrorMessage.displayName = 'FormGroup.ErrorMessage';
