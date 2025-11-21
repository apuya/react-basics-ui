import { cn } from '@/lib/cn';
import {
  forwardRef,
  memo,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';

export type CheckboxSize = 'small' | 'default' | 'large';

export interface CheckboxProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
  size?: CheckboxSize;
  label?: ReactNode;
  error?: boolean;
  indeterminate?: boolean;
}

// Base checkbox wrapper styles
const WRAPPER_BASE_CLASSES = [
  // Layout
  'inline-flex items-center',
  'gap-[var(--component-checkbox-gap)]',
].join(' ');

// Base checkbox input container styles
const CHECKBOX_BASE_CLASSES = [
  // Layout
  'relative inline-flex shrink-0 items-center justify-center',
  'cursor-pointer',

  // Shape & Border
  'rounded-[var(--component-checkbox-radius)]',
  'border-[length:var(--component-checkbox-border-width)]',

  // Transitions
  'transition-colors duration-[var(--component-checkbox-transition-duration)]',

  // Focus States
  'focus-within:outline',
  'focus-within:outline-[length:var(--component-checkbox-focus-outline-width)]',
  'focus-within:outline-offset-[var(--component-checkbox-focus-outline-offset)]',
  'focus-within:outline-[var(--component-checkbox-border-focus)]',

  // Default State
  'bg-[var(--component-checkbox-bg-default)]',
  'border-[var(--component-checkbox-border-default)]',

  // Hover State
  'hover:bg-[var(--component-checkbox-bg-hover)]',
  'hover:border-[var(--component-checkbox-border-hover)]',

  // Disabled States
  'has-[:disabled]:pointer-events-none',
  'has-[:disabled]:bg-[var(--component-checkbox-bg-disabled)]',
  'has-[:disabled]:border-[var(--component-checkbox-border-disabled)]',
  'has-[:disabled]:cursor-not-allowed',

  // Checked State
  'has-[:checked]:bg-[var(--component-checkbox-bg-checked)]',
  'has-[:checked]:border-[var(--component-checkbox-border-checked)]',

  // Indeterminate State
  'has-[:indeterminate]:bg-[var(--component-checkbox-bg-indeterminate)]',
  'has-[:indeterminate]:border-[var(--component-checkbox-border-indeterminate)]',

  // Error State
  'data-[error=true]:border-[var(--component-checkbox-border-error)]',
].join(' ');

// Size variants
const SIZE_STYLES: Record<CheckboxSize, string> = {
  small: [
    'h-[var(--component-checkbox-size-small)]',
    'w-[var(--component-checkbox-size-small)]',
  ].join(' '),
  default: [
    'h-[var(--component-checkbox-size-default)]',
    'w-[var(--component-checkbox-size-default)]',
  ].join(' '),
  large: [
    'h-[var(--component-checkbox-size-large)]',
    'w-[var(--component-checkbox-size-large)]',
  ].join(' '),
};

// Hidden input styles
const HIDDEN_INPUT_CLASSES = [
  'absolute inset-0',
  'h-full w-full',
  'cursor-pointer',
  'opacity-0',
  'm-0 p-0',
].join(' ');

// Check icon styles
const CHECK_ICON_CLASSES = [
  // Layout
  'pointer-events-none',
  'absolute inset-0',
  'flex items-center justify-center',

  // Color
  'text-[var(--component-checkbox-check-default)]',

  // Visibility - hidden by default, shown when checked
  'opacity-0 scale-0',
  'peer-checked:opacity-100 peer-checked:scale-100',
  'peer-indeterminate:opacity-100 peer-indeterminate:scale-100',

  // Disabled State
  'peer-disabled:text-[var(--component-checkbox-check-disabled)]',

  // Transition
  'transition-[opacity,transform] duration-[var(--component-checkbox-transition-duration)]',
].join(' ');

// Label styles
const LABEL_CLASSES = [
  'text-[length:var(--component-checkbox-label-size)]',
  'font-[number:var(--component-checkbox-label-weight)]',
  'text-[var(--component-checkbox-label-color)]',
  'cursor-pointer',
  'select-none',
  'peer-disabled:text-[var(--component-checkbox-label-color-disabled)]',
  'peer-disabled:cursor-not-allowed',
].join(' ');

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
      SIZE_STYLES[size],
      className
    );

    return (
      <label className={WRAPPER_BASE_CLASSES}>
        <span
          className={checkboxClasses}
          data-error={error || undefined}
          data-size={size}
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
