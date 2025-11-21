import { cn } from '@/lib/cn';
import {
  forwardRef,
  memo,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import {
  CHECKBOX_BASE_CLASSES,
  CHECK_ICON_CLASSES,
  HIDDEN_INPUT_CLASSES,
  LABEL_CLASSES,
  WRAPPER_BASE_CLASSES,
} from './Checkbox.styles';

export type CheckboxSize = 'small' | 'default' | 'large';

export interface CheckboxProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
  size?: CheckboxSize;
  label?: ReactNode;
  error?: boolean;
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
    className="h-3/4 w-3/4"
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
    className="h-3/4 w-3/4"
    aria-hidden="true"
  >
    <line x1="4" y1="8" x2="12" y2="8" />
  </svg>
));
IndeterminateIcon.displayName = 'IndeterminateIcon';

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
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    // Compute checkbox classes
    const checkboxClasses = cn(
      CHECKBOX_BASE_CLASSES,
      className
    );

    return (
      <label className={WRAPPER_BASE_CLASSES}>
        <span
          className={checkboxClasses}
          data-error={error || undefined}
          data-size={size}
          style={{
            width: `var(--component-checkbox-size-${size})`,
            height: `var(--component-checkbox-size-${size})`,
            borderRadius: 'var(--component-checkbox-radius)',
            borderWidth: 'var(--component-checkbox-border-width)',
          }}
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
          <span className={cn(LABEL_CLASSES, 'peer')}>
            {label}
          </span>
        )}
      </label>
    );
  })
);

Checkbox.displayName = 'Checkbox';
