import { cn } from '@/lib/cn';
import {
  forwardRef,
  memo,
  useMemo,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  BASE_CLASSES,
  CONTENT_CLASSES,
  ICON_SIZE_STYLES,
  ICON_WRAPPER_CLASSES,
  SIZE_STYLES,
  SPINNER_CLASSES,
  SPINNER_WRAPPER_CLASSES,
  VARIANT_STYLES,
} from './Button.styles';

/** Available button style variants */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'ghost'
  | 'destructive'
  | 'tabs'
  | 'nav';

/** Available button sizes */
export type ButtonSize = 'small' | 'default' | 'large';

/** Props for polymorphic ref forwarding */
type PolymorphicRef<E extends ElementType> = React.ComponentPropsWithRef<E>['ref'];

/** Props that can be passed to any element type */
type PolymorphicProps<E extends ElementType> = ComponentPropsWithoutRef<E> & {
  /** The element type to render as */
  as?: E;
};

/**
 * Props for the Button component
 * @template E - The element type to render as (default: 'button')
 */
export type ButtonProps<E extends ElementType = 'button'> = PolymorphicProps<E> & {
  /** The visual style variant of the button */
  variant?: ButtonVariant;
  /** The size of the button */
  size?: ButtonSize;
  /** Whether the button is in a loading state */
  isLoading?: boolean;
  /** Icon to display before the button text */
  leadingIcon?: ReactNode;
  /** Icon to display after the button text */
  trailingIcon?: ReactNode;
};

// Memoized spinner component
const Spinner = memo(({ size }: { size: ButtonSize }) => (
  <span
    className={cn(SPINNER_WRAPPER_CLASSES, ICON_SIZE_STYLES[size])}
    aria-hidden="true"
  >
    <span className={SPINNER_CLASSES} />
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
 * A polymorphic button component that supports multiple variants, sizes, and states.
 * Can render as any element type using the `as` prop.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button variant="primary">Click me</Button>
 *
 * // As a link
 * <Button as="a" href="/page">Navigate</Button>
 *
 * // With icons
 * <Button leadingIcon={<Icon />}>With Icon</Button>
 *
 * // Loading state
 * <Button isLoading>Saving...</Button>
 * ```
 */
function ButtonInner<E extends ElementType = 'button'>(
  {
    as,
    variant = 'primary',
    size = 'default',
    type,
    isLoading = false,
    disabled,
    leadingIcon,
    trailingIcon,
    className,
    children,
    ...rest
  }: ButtonProps<E>,
  ref: PolymorphicRef<E>
): ReactElement {
  const Component = as || 'button';
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

  const contentStyle = useMemo(
    () => isLoading ? { opacity: 'var(--component-button-loading-opacity)' } : undefined,
    [isLoading]
  );

  // Only pass type prop to button elements
  const typeProps = Component === 'button' ? { type: type || 'button' } : {};

  return (
    <Component
      ref={ref}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      data-variant={variant}
      data-size={size}
      data-loading={isLoading || undefined}
      className={buttonClasses}
      style={paddingStyle}
      {...typeProps}
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
        <span className={CONTENT_CLASSES} style={contentStyle}>
          {children}
        </span>
      )}

      {/* Trailing icon */}
      {!isLoading && trailingIcon && <IconWrapper icon={trailingIcon} size={size} />}
    </Component>
  );
}

export const Button = memo(forwardRef(ButtonInner as never)) as unknown as <E extends ElementType = 'button'>(
  props: ButtonProps<E> & { ref?: PolymorphicRef<E> }
) => ReactElement;

(Button as { displayName?: string }).displayName = 'Button';
