import { cn } from "@/lib/cn";
import {
  forwardRef,
  memo,
  useCallback,
  useMemo,
  useState,
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
  VARIANT_STYLES,
  PADDING_TOKENS,
  ICON_SIZE_TOKENS,
  type BadgeVariant,
  type BadgeSize,
} from './Badge.styles';

export type { BadgeVariant, BadgeSize };

export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  dismissible?: boolean;
  visible?: boolean;
  defaultVisible?: boolean;
  onDismiss?: () => void;
  disabled?: boolean;
  className?: string;
}

const ICON_WRAPPER_CLASSES = "inline-flex shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full";

const IconWrapper = memo(({ icon, size }: { icon: ReactNode; size: BadgeSize }) => (
  <span className={ICON_WRAPPER_CLASSES} style={ICON_SIZE_TOKENS[size]} aria-hidden="true">
    {icon}
  </span>
));
IconWrapper.displayName = "IconWrapper";

export const Badge = memo(
  forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
    {
      children,
      className,
      variant = "neutral",
      size = "default",
      leadingIcon,
      trailingIcon,
      dismissible = false,
      visible,
      defaultVisible = true,
      onDismiss,
      disabled = false,
      onClick,
      ...props
    },
    ref
  ) {
    const [internalVisible, setInternalVisible] = useState(defaultVisible);
    const isControlled = visible !== undefined;
    const isVisible = isControlled ? visible : internalVisible;

    const badgeClasses = useMemo(
      () => cn(
        BASE_CLASSES,
        SIZE_STYLES[size],
        VARIANT_STYLES[variant],
        dismissible && !disabled && "cursor-pointer hover:opacity-[var(--component-badge-hover-opacity)]",
        disabled && "opacity-50 cursor-not-allowed",
        className
      ),
      [size, variant, dismissible, disabled, className]
    );

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLSpanElement>) => {
        if (disabled) return;
        if (dismissible) {
          onDismiss?.();
          if (!isControlled && !onDismiss) {
            setInternalVisible(false);
          }
        }
        onClick?.(e);
      },
      [dismissible, onDismiss, onClick, disabled, isControlled]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLSpanElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onDismiss?.();
          if (!isControlled && !onDismiss) {
            setInternalVisible(false);
          }
        }
      },
      [onDismiss, isControlled]
    );

    if (!isVisible) return null;

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
        style={{
          ...PADDING_TOKENS[size],
          ...(dismissible && {
            transition: 'opacity var(--component-badge-transition-duration)',
          }),
        }}
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
