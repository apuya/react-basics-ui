import {
  forwardRef,
  memo,
  useMemo,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/cn';
import { VisuallyHidden } from '@/components/utility/VisuallyHidden';
import type { ButtonBaseProps, ButtonSize, ButtonVariant } from './Button.types';
import {
  BASE_CLASSES,
  BLOCK_CLASSES,
  ICON_SIZE_STYLES,
  SIZE_STYLES,
  SPINNER_BORDER_STYLE,
  SPINNER_CLASSES,
  SPINNER_WRAPPER_CLASSES,
  VARIANT_STYLES,
} from './Button.styles';

// ============================================================================
// Polymorphic Types
// ============================================================================

/** Props for polymorphic ref forwarding */
type PolymorphicRef<E extends ElementType> = React.ComponentPropsWithRef<E>['ref'];

/** Polymorphic component props */
type PolymorphicProps<E extends ElementType> = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<E>, keyof ButtonBaseProps> & {
    as?: E;
    children?: ReactNode;
    leadingVisual?: ReactNode;
    trailingVisual?: ReactNode;
  };

// ============================================================================
// Internal Components
// ============================================================================

/** Memoized loading spinner */
const Spinner = memo(({ size }: { size: ButtonSize }) => (
  <span className={cn(SPINNER_WRAPPER_CLASSES, ICON_SIZE_STYLES[size])} aria-hidden="true">
    <span className={SPINNER_CLASSES} style={SPINNER_BORDER_STYLE} />
  </span>
));
Spinner.displayName = 'ButtonBase.Spinner';

/** Visual wrapper for icons */
const Visual = memo(({ children, size }: { children: ReactNode; size: ButtonSize }) => (
  <span className={cn('shrink-0', ICON_SIZE_STYLES[size])} aria-hidden="true">
    {children}
  </span>
));
Visual.displayName = 'ButtonBase.Visual';

// ============================================================================
// ButtonBase Component
// ============================================================================

/**
 * Base button component with all shared logic.
 * Handles: variants, sizes, loading state, visuals, accessibility, polymorphic rendering.
 *
 * This component contains ALL the button logic. Button, IconButton, etc. are thin wrappers.
 *
 * @example
 * ```tsx
 * <ButtonBase variant="primary" size="default">Click me</ButtonBase>
 * <ButtonBase loading loadingAnnouncement="Saving...">Save</ButtonBase>
 * <ButtonBase as="a" href="/page">Link</ButtonBase>
 * ```
 */
function ButtonBaseInner<E extends ElementType = 'button'>(
  {
    as,
    variant = 'primary',
    size = 'default',
    loading = false,
    loadingAnnouncement = 'Loading',
    disabled,
    block,
    className,
    leadingVisual,
    trailingVisual,
    children,
    onClick,
    type,
    ...rest
  }: PolymorphicProps<E>,
  ref: PolymorphicRef<E>
): ReactElement {
  const Component = as || 'button';
  const isDisabled = disabled || loading;

  // Memoized class computation
  const classes = useMemo(
    () =>
      cn(
        BASE_CLASSES,
        SIZE_STYLES[size],
        VARIANT_STYLES[variant],
        block && BLOCK_CLASSES,
        loading && 'relative',
        className
      ),
    [size, variant, block, loading, className]
  );

  // Padding style based on size (simple object, no memoization needed)
  const paddingStyle = {
    paddingInline: `var(--component-button-padding-inline-${size})`,
    paddingBlock: 'var(--component-button-padding-block)',
  };

  // Only pass type prop to button elements
  const typeProps = Component === 'button' ? { type: (type || 'button') as 'button' | 'submit' | 'reset' } : {};

  // Determine if we need centered spinner overlay (no visuals, just content)
  const hasVisuals = leadingVisual || trailingVisual;
  const showCenteredSpinner = loading && !hasVisuals && children;
  const showLeadingSpinner = loading && !trailingVisual && (leadingVisual || !children);
  const showTrailingSpinner = loading && !leadingVisual && trailingVisual;

  return (
    <>
      <Component
        ref={ref}
        className={classes}
        style={paddingStyle}
        // aria-disabled keeps focus (better UX than disabled for loading)
        aria-disabled={loading || undefined}
        disabled={isDisabled && !loading ? true : undefined}
        onClick={loading ? undefined : onClick}
        data-loading={loading || undefined}
        data-variant={variant}
        data-size={size}
        {...typeProps}
        {...rest}
      >
        {/* Leading visual or spinner */}
        {showLeadingSpinner ? (
          <Spinner size={size} />
        ) : leadingVisual ? (
          <Visual size={size}>{leadingVisual}</Visual>
        ) : null}

        {/* Content - with opacity when centered spinner is showing */}
        {children && (
          <span className={showCenteredSpinner ? 'opacity-0' : undefined}>{children}</span>
        )}

        {/* Trailing visual or spinner */}
        {showTrailingSpinner ? (
          <Spinner size={size} />
        ) : trailingVisual ? (
          <Visual size={size}>{trailingVisual}</Visual>
        ) : null}

        {/* Centered spinner overlay when no visuals */}
        {showCenteredSpinner && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Spinner size={size} />
          </span>
        )}
      </Component>

      {/* Screen reader loading announcement */}
      {loading && (
        <VisuallyHidden>
          <span role="status" aria-live="polite">
            {loadingAnnouncement}
          </span>
        </VisuallyHidden>
      )}
    </>
  );
}

export const ButtonBase = memo(forwardRef(ButtonBaseInner as never)) as unknown as <
  E extends ElementType = 'button'
>(
  props: PolymorphicProps<E> & { ref?: PolymorphicRef<E> }
) => ReactElement;

(ButtonBase as { displayName?: string }).displayName = 'ButtonBase';

// Re-export types for convenience
export type { ButtonSize, ButtonVariant, ButtonBaseProps };
