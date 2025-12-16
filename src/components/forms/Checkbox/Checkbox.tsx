import { cn } from '@/lib/cn';
import { generateFormId } from '@/lib/generateFormId';
import { Label } from '@/components/typography/Label';
import { useMergedRefs } from '@/hooks/useMergedRefs';
import { forwardRef, memo, useEffect, useRef } from 'react';
import { CheckIcon } from './CheckIcon';
import {
  CHECKBOX_BASE_CLASSES,
  CHECKBOX_SIZE_STYLES,
  CHECK_ICON_CLASSES,
  HIDDEN_INPUT_CLASSES,
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
    // Internal ref for indeterminate state management
    const internalRef = useRef<HTMLInputElement>(null);
    const mergedRef = useMergedRefs(ref, internalRef);

    // Generate ID if not provided (for label association)
    const checkboxId = id || generateFormId('checkbox', label ? String(label) : undefined);

    // Handle indeterminate state via effect
    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <label className={WRAPPER_BASE_CLASSES}>
        <span
          className={cn(CHECKBOX_BASE_CLASSES, className)}
          data-error={error || undefined}
          data-disabled={disabled || undefined}
          style={CHECKBOX_SIZE_STYLES[size]}
        >
          <input
            ref={mergedRef}
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
          <Label htmlFor={checkboxId} disabled={disabled} className="peer-disabled:cursor-not-allowed">
            {label}
          </Label>
        )}
      </label>
    );
  })
);

Checkbox.displayName = 'Checkbox';
