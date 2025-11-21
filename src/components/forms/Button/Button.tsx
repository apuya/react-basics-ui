import { cn } from '@/lib/cn';
import {
  forwardRef,
  memo,
  useMemo,
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

export type ButtonSize = 'small' | 'default' | 'large';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

// Memoized spinner component
const Spinner = memo(({ size }: { size: ButtonSize }) => {
  const borderStyle = useMemo(
    () => ({ borderWidth: 'var(--component-button-spinner-border-width)' }),
    []
  );

  return (
    <span
      className={cn(ICON_WRAPPER_CLASSES, ICON_SIZE_STYLES[size], 'animate-spin')}
      aria-hidden="true"
    >
      <span 
        className="h-full w-full rounded-full border-current border-t-transparent"
        style={borderStyle}
      />
    </span>
  );
});
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

    const buttonClasses = useMemo(
      () => cn(
        BASE_CLASSES,
        SIZE_STYLES[size],
        VARIANT_STYLES[variant],
        isLoading && 'relative',
        className
      ),
      [size, variant, isLoading, className]
    );

    const paddingStyle = useMemo(
      () => ({
        paddingInline: `var(--component-button-padding-inline-${size})`,
        paddingBlock: 'var(--component-button-padding-block)',
      }),
      [size]
    );

    const contentClasses = 'inline-flex items-center justify-center';

    const contentStyle = useMemo(
      () => isLoading ? { opacity: 'var(--component-button-loading-opacity)' } : undefined,
      [isLoading]
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
        className={buttonClasses}
        style={paddingStyle}
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
          <span className={contentClasses} style={contentStyle}>
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
