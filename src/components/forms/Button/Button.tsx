import { cn } from '@/lib/cn';
import {
  forwardRef,
  memo,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import {
  BASE_CLASSES,
  ICON_SIZE_STYLES,
  ICON_WRAPPER_CLASSES,
  SIZE_STYLES,
  VARIANT_STYLES,
} from './Button.styles';

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

// Memoized spinner component
const Spinner = memo(({ size }: { size: ButtonSize }) => (
  <span
    className={cn(ICON_WRAPPER_CLASSES, ICON_SIZE_STYLES[size], 'animate-spin')}
    aria-hidden="true"
  >
    <span className="h-full w-full rounded-full border-[length:var(--component-button-spinner-border-width)] border-current border-t-transparent" />
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
          paddingInline: `var(--component-button-padding-inline-${size})`,
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
              isLoading && 'opacity-[var(--component-button-loading-opacity)]'
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
