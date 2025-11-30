import { cn } from '@/lib/cn';
import { generateFormId } from '@/lib/generateFormId';
import {
  forwardRef,
  memo,
  useMemo,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import {
  CHECKBOX_BASE_CLASSES,
  CHECKBOX_SIZE_STYLES,
  CHECK_ICON_CLASSES,
  HIDDEN_INPUT_CLASSES,
  ICON_CLASSES,
  LABEL_CLASSES,
  WRAPPER_BASE_CLASSES,
} from './Checkbox.styles';

/** Available checkbox sizes */
export type CheckboxSize = 'small' | 'default' | 'large';

/**
 * Props for the Checkbox component
 */
export interface CheckboxProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
  /** The size of the checkbox */
  size?: CheckboxSize;
  /** Label content for the checkbox */
  label?: ReactNode;
  /** Whether the checkbox is in an error state */
  error?: boolean;
  /** Whether the checkbox is in an indeterminate state */
  indeterminate?: boolean;
}

// Memoized check icon component
const CheckIcon = memo(() => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={ICON_CLASSES}
    aria-hidden="true"
  >
    <polyline points="3,8 6,11 13,4" />
  </svg>
));
CheckIcon.displayName = 'CheckIcon';

// Memoized indeterminate icon component
const IndeterminateIcon = memo(() => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={ICON_CLASSES}
    aria-hidden="true"
  >
    <line x1="4" y1="8" x2="12" y2="8" />
  </svg>
));
IndeterminateIcon.displayName = 'IndeterminateIcon';

/**
 * A checkbox component for binary choices or multiple selections.
 * Supports multiple sizes, indeterminate state, error state, and flexible label content.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Checkbox label="Accept terms" />
 *
 * // With indeterminate state
 * <Checkbox label="Select all" indeterminate />
 *
 * // Different sizes
 * <Checkbox size="small" label="Small" />
 * <Checkbox size="large" label="Large" />
 *
 * // Error state
 * <Checkbox label="Required field" error />
 * ```
 */
export const Checkbox = memo(
  forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
    {
      size = 'default',
      label,
      error = false,
      indeterminate = false,
      disabled,
      className,
      id,
      ...rest
    },
    ref
  ) {
    // Generate ID if not provided (for label association)
    const checkboxId = useMemo(
      () => id || generateFormId('checkbox', label ? String(label) : undefined),
      [id, label]
    );

    // Compute checkbox classes
    const checkboxClasses = useMemo(
      () => cn(CHECKBOX_BASE_CLASSES, className),
      [className]
    );

    // Get size-specific styles
    const sizeStyle = CHECKBOX_SIZE_STYLES[size];

    return (
      <label className={WRAPPER_BASE_CLASSES}>
        <span
          className={checkboxClasses}
          data-error={error || undefined}
          data-size={size}
          style={sizeStyle}
        >
          <input
            ref={(node) => {
              // Handle indeterminate state
              if (node) {
                node.indeterminate = indeterminate;
              }
              // Forward ref
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            id={checkboxId}
            type="checkbox"
            disabled={disabled}
            className={cn(HIDDEN_INPUT_CLASSES, 'peer')}
            aria-invalid={error || undefined}
            {...rest}
          />

          {/* Check/Indeterminate Icon */}
          <span className={CHECK_ICON_CLASSES}>
            {indeterminate ? <IndeterminateIcon /> : <CheckIcon />}
          </span>
        </span>

        {/* Label */}
        {label && (
          <span className={LABEL_CLASSES}>
            {label}
          </span>
        )}
      </label>
    );
  })
);

Checkbox.displayName = 'Checkbox';
