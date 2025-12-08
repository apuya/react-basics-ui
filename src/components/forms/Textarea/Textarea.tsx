import { cn } from '@/lib/cn';
import { generateFormId } from '@/lib/generateFormId';
import {
  forwardRef,
  memo,
  useId,
  useMemo,
  useState,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
} from 'react';
import { FormField } from '../FormField';
import {
  BASE_CLASSES,
  CHAR_COUNT_ERROR_CLASSES,
  RESIZE_STYLES,
  SIZE_STYLES,
  STATE_STYLES,
} from './Textarea.styles';

export type TextareaSize = keyof typeof SIZE_STYLES;
export type TextareaResize = keyof typeof RESIZE_STYLES;

export interface TextareaProps extends Omit<ComponentPropsWithoutRef<'textarea'>, 'size'> {
  /** Size variant of the textarea */
  size?: TextareaSize;
  /** Indicates validation error state */
  error?: boolean;
  /** Label text displayed above the textarea */
  label?: string;
  /** Helper text displayed below the textarea */
  helperText?: string;
  /** Resize behavior of the textarea */
  resize?: TextareaResize;
  /** Additional className for the wrapper element */
  wrapperClassName?: string;
  /** Maximum character length */
  maxLength?: number;
  /** Whether to show character count */
  showCharCount?: boolean;
}

export const Textarea = memo(
  forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
    {
      size = 'default',
      error = false,
      label,
      helperText,
      resize = 'vertical',
      className,
      wrapperClassName,
      id,
      disabled,
      maxLength,
      showCharCount = false,
      value,
      defaultValue,
      onChange,
      required,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref
  ) {
    const textareaId = id || generateFormId('textarea', label);
    const generatedHelperId = useId();
    
    // Track internal character count for uncontrolled mode
    const [internalLength, setInternalLength] = useState(() => {
      if (defaultValue !== undefined) {
        return String(defaultValue).length;
      }
      return 0;
    });

    const textareaClasses = useMemo(
      () => cn(
        BASE_CLASSES,
        SIZE_STYLES[size],
        RESIZE_STYLES[resize],
        error ? STATE_STYLES.error : STATE_STYLES.default,
        className
      ),
      [size, resize, error, className]
    );

    // For controlled mode, use value length; for uncontrolled, use internal state
    const currentLength = value !== undefined ? String(value).length : internalLength;

    const showCounter = showCharCount && maxLength !== undefined;
    const hasHelperContent = helperText || showCounter;
    const helperId = hasHelperContent ? `${generatedHelperId}-helper` : undefined;
    
    // Merge aria-describedby: user-provided + auto-generated helper ID
    const mergedAriaDescribedBy = [ariaDescribedBy, helperId].filter(Boolean).join(' ') || undefined;

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      // Update internal length for uncontrolled mode
      if (value === undefined) {
        setInternalLength(e.target.value.length);
      }
      onChange?.(e);
    };

    // Compute helper content - either just text, just counter, or both
    const helperContent = showCounter ? (
      <span className="flex items-start justify-between gap-2 w-full">
        <span>{helperText}</span>
        <span
          className={cn(
            'text-right shrink-0',
            currentLength === maxLength && CHAR_COUNT_ERROR_CLASSES
          )}
        >
          {currentLength}/{maxLength}
        </span>
      </span>
    ) : helperText;

    return (
      <FormField
        label={label}
        htmlFor={textareaId}
        helperText={helperContent}
        error={error}
        required={required}
        disabled={disabled}
        helperId={helperId}
        className={wrapperClassName}
      >
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          className={textareaClasses}
          style={{
            paddingInline: 'var(--component-textarea-padding-inline)',
            paddingBlock: 'var(--component-textarea-padding-block)',
            minHeight: `var(--component-textarea-min-height-${size})`,
          }}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          required={required}
          aria-invalid={error || undefined}
          aria-describedby={mergedAriaDescribedBy}
          data-size={size}
          data-error={error || undefined}
          data-disabled={disabled || undefined}
          {...rest}
        />
      </FormField>
    );
  })
);

Textarea.displayName = 'Textarea';
