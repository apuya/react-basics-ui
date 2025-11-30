import { cn } from '@/lib/cn';
import { generateFormId } from '@/lib/generateFormId';
import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import {
  BASE_CLASSES,
  HELPER_CLASSES,
  HELPER_ERROR_CLASSES,
  LABEL_CLASSES,
  LABEL_ERROR_CLASSES,
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
      ...rest
    },
    ref
  ) {
    const textareaId = id || generateFormId('textarea', label);

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

    const currentLength = useMemo(() => {
      if (value !== undefined) {
        return String(value).length;
      }
      if (defaultValue !== undefined) {
        return String(defaultValue).length;
      }
      return 0;
    }, [value, defaultValue]);

    const showCounter = showCharCount && maxLength !== undefined;

    return (
      <div className={cn('w-full', wrapperClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
            className={error ? LABEL_ERROR_CLASSES : LABEL_CLASSES}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            disabled={disabled}
            className={textareaClasses}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            data-size={size}
            data-error={error || undefined}
            {...rest}
          />
        </div>

        {(helperText || showCounter) && (
          <div className="flex items-start justify-between gap-2">
            {helperText && (
              <p className={error ? HELPER_ERROR_CLASSES : HELPER_CLASSES}>
                {helperText}
              </p>
            )}
            {showCounter && (
              <p className={cn(
                HELPER_CLASSES,
                'text-right shrink-0',
                currentLength === maxLength && 'text-[color:var(--component-input-helper-error)]'
              )}>
                {currentLength}/{maxLength}
              </p>
            )}
          </div>
        )}
      </div>
    );
  })
);

Textarea.displayName = 'Textarea';
