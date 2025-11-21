import { cn } from "@/lib/cn";
import {
  forwardRef,
  memo,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { BASE_CLASSES, SIZE_STYLES, VARIANT_STYLES } from './Badge.styles';

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "neutral"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "blue"
  | "cyan"
  | "emerald"
  | "fuchsia"
  | "gold"
  | "green"
  | "indigo"
  | "lime"
  | "navy"
  | "amber"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "rose"
  | "sand"
  | "sky"
  | "slate"
  | "teal"
  | "violet"
  | "yellow"
  | "zinc"
  | "primary-dismissible"
  | "secondary-dismissible"
  | "neutral-dismissible"
  | "success-dismissible"
  | "warning-dismissible"
  | "error-dismissible"
  | "info-dismissible"
  | "blue-dismissible"
  | "cyan-dismissible"
  | "emerald-dismissible"
  | "fuchsia-dismissible"
  | "gold-dismissible"
  | "green-dismissible"
  | "indigo-dismissible"
  | "lime-dismissible"
  | "navy-dismissible"
  | "amber-dismissible"
  | "orange-dismissible"
  | "pink-dismissible"
  | "purple-dismissible"
  | "red-dismissible"
  | "rose-dismissible"
  | "sand-dismissible"
  | "sky-dismissible"
  | "slate-dismissible"
  | "teal-dismissible"
  | "violet-dismissible"
  | "yellow-dismissible"
  | "zinc-dismissible";

export type BadgeSize = "small" | "default" | "large";

export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

const PADDING_TOKENS = {
  small: {
    inline: 'var(--component-badge-padding-inline-small)',
    block: 'var(--component-badge-padding-block-small)',
  },
  default: {
    inline: 'var(--component-badge-padding-inline-default)',
    block: 'var(--component-badge-padding-block-default)',
  },
  large: {
    inline: 'var(--component-badge-padding-inline-large)',
    block: 'var(--component-badge-padding-block-large)',
  },
} as const;

const ICON_SIZE_TOKENS = {
  small: {
    height: 'var(--component-badge-icon-size-small)',
    width: 'var(--component-badge-icon-size-small)',
  },
  default: {
    height: 'var(--component-badge-icon-size-default)',
    width: 'var(--component-badge-icon-size-default)',
  },
  large: {
    height: 'var(--component-badge-icon-size-large)',
    width: 'var(--component-badge-icon-size-large)',
  },
} as const;

const CloseIcon = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="var(--component-badge-close-icon-size)"
    height="var(--component-badge-close-icon-size)"
    viewBox="0 0 18 18"
    fill="none"
  >
    <path
      d="M11.6092 6.39077L6.39077 11.6092M6.39077 6.39077L11.6092 11.6092M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
      stroke="currentColor"
      strokeWidth="var(--component-badge-close-icon-stroke-width)"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));
CloseIcon.displayName = "CloseIcon";

const ICON_WRAPPER_CLASSES = "inline-flex shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full";

const IconWrapper = memo(({ icon, size }: { icon: ReactNode; size: BadgeSize }) => {
  const iconStyle = useMemo(
    () => ICON_SIZE_TOKENS[size],
    [size]
  );
  
  return (
    <span className={ICON_WRAPPER_CLASSES} style={iconStyle} aria-hidden="true">
      {icon}
    </span>
  );
});
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
      onDismiss,
      onClick,
      ...props
    },
    ref
  ) {
    const isDismissible = variant.endsWith("-dismissible");
    
    const baseVariant = useMemo(
      () => isDismissible 
        ? variant.replace("-dismissible", "") as Exclude<BadgeVariant, `${string}-dismissible`>
        : variant as Exclude<BadgeVariant, `${string}-dismissible`>,
      [variant, isDismissible]
    );

    const badgeClasses = useMemo(
      () => cn(
        BASE_CLASSES,
        SIZE_STYLES[size],
        VARIANT_STYLES[baseVariant],
        isDismissible && "cursor-pointer",
        className
      ),
      [size, baseVariant, isDismissible, className]
    );

    const badgeStyle = useMemo(
      () => ({
        paddingInline: PADDING_TOKENS[size].inline,
        paddingBlock: PADDING_TOKENS[size].block,
        ...(isDismissible && {
          transition: 'opacity var(--component-badge-transition-duration)',
        }),
      }),
      [size, isDismissible]
    );

    const handleClick = useMemo(
      () => (isDismissible || onClick)
        ? (e: React.MouseEvent<HTMLSpanElement>) => {
            if (isDismissible && onDismiss) {
              onDismiss();
            }
            if (onClick) {
              onClick(e);
            }
          }
        : undefined,
      [isDismissible, onDismiss, onClick]
    );

    const [isHovered, setIsHovered] = useState(false);

    const hoverStyle = useMemo(
      () => isDismissible && isHovered
        ? { opacity: 'var(--component-badge-hover-opacity)' }
        : {},
      [isDismissible, isHovered]
    );

    return (
      <span
        ref={ref}
        data-variant={variant}
        data-size={size}
        className={badgeClasses}
        role="status"
        onClick={handleClick}
        onMouseEnter={isDismissible ? () => setIsHovered(true) : undefined}
        onMouseLeave={isDismissible ? () => setIsHovered(false) : undefined}
        style={{ ...badgeStyle, ...hoverStyle }}
        {...props}
      >
        {leadingIcon && <IconWrapper icon={leadingIcon} size={size} />}
        {children && <span className="truncate">{children}</span>}
        {isDismissible ? (
          <IconWrapper icon={<CloseIcon />} size={size} />
        ) : (
          trailingIcon && <IconWrapper icon={trailingIcon} size={size} />
        )}
      </span>
    );
  })
);

Badge.displayName = "Badge";

