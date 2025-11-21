import { cn } from '@/lib/cn';
import {
  forwardRef,
  memo,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'ghost'
  | 'destructive';

export type ButtonSize = 'small' | 'default';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

// Base button styles using component tokens
const BASE_CLASSES = [
  // Layout
  'w-full inline-flex self-stretch items-center justify-center',
  'gap-[var(--component-button-gap)]',

  // Shape & Border
  'rounded-[var(--component-button-radius)]',
  'border-[length:var(--component-button-border-width)]',

  // Typography
  'leading-none',

  // Transitions
  'transition-colors duration-[var(--component-button-transition-duration)]',

  // Focus States
  'focus-visible:outline',
  'focus-visible:outline-[length:var(--component-button-focus-outline-width)]',
  'focus-visible:outline-offset-[var(--component-button-focus-outline-offset)]',

  // Disabled States
  'disabled:pointer-events-none',
  'disabled:opacity-[var(--component-button-disabled-opacity)]',
].join(' ');

// Icon wrapper styles
const ICON_WRAPPER_CLASSES = [
  // Layout
  'inline-flex shrink-0 items-center justify-center',

  // SVG child sizing
  '[&>svg]:h-full [&>svg]:w-full',
].join(' ');

// Size variants
const SIZE_STYLES: Record<ButtonSize, string> = {
  small: [
    'min-h-[var(--component-button-height-small)]',
    'max-h-[var(--component-button-height-small)]',
    'px-[var(--component-button-padding-inline-small)]',
    'text-[length:var(--component-button-font-size-small)]',
    'font-[number:var(--component-button-font-weight-small)]',
  ].join(' '),
  default: [
    'min-h-[var(--component-button-height-default)]',
    'max-h-[var(--component-button-height-default)]',
    'px-[var(--component-button-padding-inline-default)]',
    'text-[length:var(--component-button-font-size-default)]',
    'font-[number:var(--component-button-font-weight-default)]',
  ].join(' '),
};

// Icon size styles
const ICON_SIZE_STYLES: Record<ButtonSize, string> = {
  small: [
    'h-[var(--component-button-icon-size-small)]',
    'w-[var(--component-button-icon-size-small)]',
  ].join(' '),
  default: [
    'h-[var(--component-button-icon-size-default)]',
    'w-[var(--component-button-icon-size-default)]',
  ].join(' '),
};

// Variant styles using component tokens
const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: [
    // Default State
    'border-transparent',
    'bg-[var(--component-button-bg-primary-default)]',
    'text-[var(--component-button-text-primary-default)]',
    // Hover State
    'hover:bg-[var(--component-button-bg-primary-hover)]',
    'hover:text-[var(--component-button-text-primary-hover)]',
    // Active State
    'active:bg-[var(--component-button-bg-primary-active)]',
    'active:text-[var(--component-button-text-primary-active)]',
  ].join(' '),

  secondary: [
    // Default State
    'border-transparent',
    'bg-[var(--component-button-bg-secondary-default)]',
    'text-[var(--component-button-text-secondary-default)]',
    // Hover State
    'hover:bg-[var(--component-button-bg-secondary-hover)]',
    'hover:text-[var(--component-button-text-secondary-hover)]',
    // Active State
    'active:bg-[var(--component-button-bg-secondary-active)]',
    'active:text-[var(--component-button-text-secondary-active)]',
  ].join(' '),

  tertiary: [
    // Default State
    'border-[var(--component-button-border-tertiary-default)]',
    'bg-[var(--component-button-bg-tertiary-default)]',
    'text-[var(--component-button-text-tertiary-default)]',
    // Hover State
    'hover:bg-[var(--component-button-bg-tertiary-hover)]',
    'hover:text-[var(--component-button-text-tertiary-hover)]',
    'hover:border-[var(--component-button-border-tertiary-hover)]',
    // Active State
    'active:bg-[var(--component-button-bg-tertiary-active)]',
    'active:text-[var(--component-button-text-tertiary-active)]',
    'active:border-[var(--component-button-border-tertiary-active)]',
  ].join(' '),

  ghost: [
    // Default State
    'border-[var(--component-button-border-ghost-default)]',
    'bg-[var(--component-button-bg-ghost-default)]',
    'text-[var(--component-button-text-ghost-default)]',
    // Hover State
    'hover:bg-[var(--component-button-bg-ghost-hover)]',
    'hover:text-[var(--component-button-text-ghost-hover)]',
    'hover:border-[var(--component-button-border-ghost-hover)]',
    // Active State
    'active:bg-[var(--component-button-bg-ghost-active)]',
    'active:text-[var(--component-button-text-ghost-active)]',
    'active:border-[var(--component-button-border-ghost-active)]',
  ].join(' '),

  destructive: [
    // Default State
    'border-[var(--component-button-border-destructive-default)]',
    'bg-[var(--component-button-bg-destructive-default)]',
    'text-[var(--component-button-text-destructive-default)]',
    // Hover State
    'hover:bg-[var(--component-button-bg-destructive-hover)]',
    'hover:text-[var(--component-button-text-destructive-hover)]',
    'hover:border-[var(--component-button-border-destructive-hover)]',
  ].join(' '),
};

// Memoized spinner component
const Spinner = memo(({ size }: { size: ButtonSize }) => (
  <span
    className={cn(ICON_WRAPPER_CLASSES, ICON_SIZE_STYLES[size], 'animate-spin')}
    aria-hidden="true"
  >
    <span className="h-full w-full rounded-full border-2 border-current border-t-transparent" />
  </span>
));
Spinner.displayName = 'Spinner';

// Memoized icon wrapper component
const IconWrapper = memo(({ icon, size }: { icon: ReactNode; size: ButtonSize }) => (
  <span className={cn(ICON_WRAPPER_CLASSES, ICON_SIZE_STYLES[size])} aria-hidden="true">
    {icon}
  </span>
));
IconWrapper.displayName = 'IconWrapper';

/**
 * Button component with multiple variants and sizes.
 *
 * @example
 * ```tsx
 * <Button variant="primary">Click me</Button>
 * <Button variant="tertiary" leadingIcon={<Icon />}>With Icon</Button>
 * <Button variant="destructive" isLoading>Loading...</Button>
 * ```
 */
export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    {
      variant = 'primary',
      size = 'default',
      type = 'button',
      isLoading = false,
      disabled,
      leadingIcon,
      trailingIcon,
      className,
      children,
      ...rest
    },
    ref
  ) {
    const isDisabled = disabled || isLoading;

    // Compute button classes
    const buttonClasses = cn(
      BASE_CLASSES,
      SIZE_STYLES[size],
      VARIANT_STYLES[variant],
      className
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        data-variant={variant}
        data-size={size}
        data-loading={isLoading || undefined}
        className={cn(buttonClasses, isLoading && 'relative')}
        style={{
          paddingBlock: 'var(--component-button-padding-block)',
        }}
        {...rest}
      >
        {/* Centered loading spinner */}
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Spinner size={size} />
          </span>
        )}

        {/* Leading icon */}
        {!isLoading && leadingIcon && <IconWrapper icon={leadingIcon} size={size} />}

        {/* Button content */}
        {children && (
          <span
            className={cn(
              'inline-flex items-center justify-center',
              isLoading && 'opacity-0'
            )}
          >
            {children}
          </span>
        )}

        {/* Trailing icon */}
        {!isLoading && trailingIcon && <IconWrapper icon={trailingIcon} size={size} />}
      </button>
    );
  })
);

Button.displayName = 'Button';
