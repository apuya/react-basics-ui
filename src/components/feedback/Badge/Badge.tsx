import { cn } from "@/lib/cn";
import {
  forwardRef,
  memo,
  useCallback,
  useMemo,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { BiXCircle } from "react-icons/bi";

// Extract text content from ReactNode for aria-label
function getTextContent(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getTextContent).join('');
  }
  return '';
}
import {
  BASE_CLASSES,
  SIZE_STYLES,
  COLOR_STYLES_BY_VARIANT,
  STYLE_VARIANT_CLASSES,
  ICON_SIZE_CLASSES,
  type BadgeColor,
  type BadgeSize,
  type BadgeStyleVariant,
} from './Badge.styles';

export type { BadgeColor, BadgeSize, BadgeStyleVariant };

// Legacy type alias for backwards compatibility
export type BadgeVariant = BadgeColor;

export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  /** @deprecated Use `color` instead */
  variant?: BadgeColor;
  color?: BadgeColor;
  styleVariant?: BadgeStyleVariant;
  size?: BadgeSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  disabled?: boolean;
  className?: string;
}

const ICON_WRAPPER_CLASSES = "inline-flex shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full";

const IconWrapper = memo(({ icon, size }: { icon: ReactNode; size: BadgeSize }) => (
  <span className={cn(ICON_WRAPPER_CLASSES, ICON_SIZE_CLASSES[size])} aria-hidden="true">
    {icon}
  </span>
));
IconWrapper.displayName = "IconWrapper";

export const Badge = memo(
  forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
    {
      children,
      className,
      variant,
      color = "neutral",
      styleVariant = "subtle",
      size = "default",
      leadingIcon,
      trailingIcon,
      dismissible = false,
      onDismiss,
      disabled = false,
      onClick,
      ...props
    },
    ref
  ) {
    // Support legacy `variant` prop as alias for `color`
    const resolvedColor = variant ?? color;

    // Get color styles based on styleVariant - optimized single lookup
    const colorStyles = useMemo(
      () => COLOR_STYLES_BY_VARIANT[styleVariant][resolvedColor],
      [styleVariant, resolvedColor]
    );

    const badgeClasses = useMemo(
      () => cn(
        BASE_CLASSES,
        SIZE_STYLES[size],
        STYLE_VARIANT_CLASSES[styleVariant],
        colorStyles,
        dismissible && !disabled && "cursor-pointer hover:opacity-[var(--component-badge-hover-opacity)]",
        disabled && "opacity-50 cursor-not-allowed",
        className
      ),
      [size, styleVariant, colorStyles, dismissible, disabled, className]
    );

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLSpanElement>) => {
        if (disabled) return;
        if (dismissible) {
          onDismiss?.();
        }
        onClick?.(e);
      },
      [dismissible, onDismiss, onClick, disabled]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLSpanElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onDismiss?.();
        }
      },
      [onDismiss]
    );

    return (
      <span
        ref={ref}
        className={badgeClasses}
        role={dismissible ? "button" : "status"}
        aria-label={dismissible ? `${getTextContent(children)} - click to dismiss` : undefined}
        aria-disabled={disabled || undefined}
        tabIndex={dismissible && !disabled ? 0 : undefined}
        onClick={(dismissible || onClick) ? handleClick : undefined}
        onKeyDown={dismissible && !disabled ? handleKeyDown : undefined}
        data-size={size}
        data-color={resolvedColor}
        data-style-variant={styleVariant}
        data-dismissible={dismissible || undefined}
        data-disabled={disabled || undefined}
        {...props}
      >
        {leadingIcon && <IconWrapper icon={leadingIcon} size={size} />}
        {children && <span className="truncate">{children}</span>}
        {dismissible ? (
          <IconWrapper icon={<BiXCircle />} size={size} />
        ) : (
          trailingIcon && <IconWrapper icon={trailingIcon} size={size} />
        )}
      </span>
    );
  })
);

Badge.displayName = "Badge";
