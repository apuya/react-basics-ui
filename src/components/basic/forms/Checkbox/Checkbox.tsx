import { cn } from '@/lib/cn';
import { generateFormId } from '@/lib/generateFormId';
import { forwardRef, memo, useMemo } from 'react';
import { CheckIcon } from './CheckIcon';
import {
  CHECKBOX_BASE_CLASSES,
  CHECKBOX_SIZE_STYLES,
  CHECK_ICON_CLASSES,
  HIDDEN_INPUT_CLASSES,
  LABEL_CLASSES,
  WRAPPER_BASE_CLASSES,
} from './Checkbox.styles';
import type { CheckboxProps } from './Checkbox.types';
import { IndeterminateIcon } from './IndeterminateIcon';

// =============================================================================
// Checkbox Component
// =============================================================================

/**
 * Checkbox - A form control for binary choices or multiple selections.
 *
 * Uses CSS `has-[:checked]` and `peer-*` selectors for state-based styling,
 * avoiding JavaScript state for visual updates. Supports indeterminate state
 * for "select all" scenarios.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Checkbox label="Accept terms" onChange={handleChange} />
 *
 * // Controlled with indeterminate state
 * <Checkbox
 *   label="Select all"
 *   checked={allSelected}
 *   indeterminate={someSelected && !allSelected}
 *   onChange={handleSelectAll}
 * />
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

    // Compute checkbox classes (simple merge, no memoization needed)
    const checkboxClasses = cn(CHECKBOX_BASE_CLASSES, className);

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
