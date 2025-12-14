import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo, type ReactNode } from 'react';
import { BiXCircle } from 'react-icons/bi';
import type { BadgeProps, BadgeSize } from './Badge.types';
import {
  BASE_CLASSES,
  SIZE_STYLES,
  COLOR_STYLES_BY_VARIANT,
  STYLE_VARIANT_CLASSES,
  PADDING_TOKENS,
  ICON_SIZE_TOKENS,
} from './Badge.styles';

// Re-export types from types file
export type {
  BadgeProps,
  BadgeSize,
  BadgeColor,
  BadgeStyleVariant,
  BadgeVariant,
} from './Badge.types';

// =============================================================================
// Internal Components
// =============================================================================

const VISUAL_WRAPPER_CLASSES =
  'inline-flex shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full';

/** Wrapper for leading/trailing visuals with proper sizing */
const VisualWrapper = ({ visual, size }: { visual: ReactNode; size: BadgeSize }) => (
  <span className={VISUAL_WRAPPER_CLASSES} style={ICON_SIZE_TOKENS[size]} aria-hidden="true">
    {visual}
  </span>
);

/**
 * A badge component for displaying status, labels, or counts.
 *
 * @example
 * ```tsx
 * // Basic badge
 * <Badge>New</Badge>
 *
 * // With color and style variant
 * <Badge color="success" styleVariant="solid">Active</Badge>
 *
 * // With leading visual
 * <Badge leadingVisual={<CheckIcon />}>Verified</Badge>
 *
 * // Dismissible badge
 * <Badge dismissible onDismiss={() => console.log('dismissed')}>
 *   Closeable
 * </Badge>
 * ```
 */
export const Badge = memo(
  forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
    {
      children,
      className,
      // New API
      color = 'neutral',
      styleVariant = 'subtle',
      size = 'default',
      leadingVisual,
      trailingVisual,
      // Deprecated props (backwards compatibility)
      variant,
      leadingIcon,
      trailingIcon,
      // Behavior
      dismissible = false,
      onDismiss,
      disabled = false,
      onClick,
      ...props
    },
    ref
  ) {
    // Resolve deprecated props (old takes precedence if both provided for safety)
    const resolvedColor = variant ?? color;
    const resolvedLeading = leadingIcon ?? leadingVisual;
    const resolvedTrailing = trailingIcon ?? trailingVisual;

    // Get color styles based on styleVariant - optimized single lookup
    const colorStyles = useMemo(
      () => COLOR_STYLES_BY_VARIANT[styleVariant][resolvedColor],
      [styleVariant, resolvedColor]
    );

    const badgeClasses = useMemo(
      () =>
        cn(
          BASE_CLASSES,
          SIZE_STYLES[size],
          STYLE_VARIANT_CLASSES[styleVariant],
          colorStyles,
          dismissible && !disabled && 'cursor-pointer hover:opacity-[var(--component-badge-hover-opacity)]',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        ),
      [size, styleVariant, colorStyles, dismissible, disabled, className]
    );

    const paddingStyle = PADDING_TOKENS[size];
    const isInteractive = dismissible && !disabled;

    return (
      <span
        ref={ref}
        className={badgeClasses}
        role={dismissible ? 'button' : 'status'}
        aria-label={dismissible && typeof children === 'string' ? `${children} - click to dismiss` : undefined}
        aria-disabled={disabled}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={
          disabled
            ? undefined
            : (e) => {
                if (dismissible) onDismiss?.();
                onClick?.(e);
              }
        }
        onKeyDown={
          isInteractive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onDismiss?.();
                }
              }
            : undefined
        }
        data-size={size}
        data-color={resolvedColor}
        data-style-variant={styleVariant}
        data-dismissible={dismissible || undefined}
        data-disabled={disabled || undefined}
        style={paddingStyle}
        {...props}
      >
        {resolvedLeading && <VisualWrapper visual={resolvedLeading} size={size} />}
        {children && <span className="truncate">{children}</span>}
        {dismissible ? (
          <VisualWrapper visual={<BiXCircle />} size={size} />
        ) : (
          resolvedTrailing && <VisualWrapper visual={resolvedTrailing} size={size} />
        )}
      </span>
    );
  })
);

Badge.displayName = 'Badge';
