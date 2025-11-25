import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  forwardRef,
  memo,
  useMemo,
} from 'react';
import { cn } from '@/lib';
import {
  ACTION_WRAPPER_CLASSES,
  BASE_CLASSES,
  DESCRIPTION_CLASSES,
  ICON_WRAPPER_CLASSES,
  TITLE_CLASSES,
} from './EmptyState.styles';

export interface EmptyStateProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
  /**
   * Optional title text for the empty state
   */
  title?: ReactNode;
  /**
   * Optional description text providing more context
   */
  description?: ReactNode;
  /**
   * Optional icon or illustration to display
   */
  icon?: ReactNode;
  /**
   * Optional action element (button, link, etc.)
   */
  action?: ReactNode;
  /**
   * Icon size in pixels
   * @default 48
   */
  iconSize?: number;
}

/**
 * EmptyState component for displaying empty state placeholders
 *
 * @example
 * ```tsx
 * <EmptyState
 *   icon={<BiInbox />}
 *   title="No items found"
 *   description="Get started by creating your first item."
 *   action={<Button>Create Item</Button>}
 * />
 * ```
 */
export const EmptyState = memo(
  forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
    {
      title,
      description,
      icon,
      action,
      iconSize = 48,
      className,
      children,
      ...rest
    },
    ref
  ) {
    const containerClasses = useMemo(
      () => cn(BASE_CLASSES, className),
      [className]
    );

    const hasContent = title || description || children;

    return (
      <div
        ref={ref}
        className={containerClasses}
        style={{
          paddingBlock: 'var(--semantic-space-comfortable)',
          paddingInline: 'var(--semantic-space-default)',
        }}
        {...rest}
      >
        {/* Icon */}
        {icon && (
          <div
            className={ICON_WRAPPER_CLASSES}
            style={{
              fontSize: `${iconSize}px`,
            }}
            aria-hidden="true"
          >
            {icon}
          </div>
        )}

        {/* Content */}
        {hasContent && (
          <div className="flex flex-col items-center">
            {title && (
              <h3
                className={TITLE_CLASSES}
                style={{
                  fontSize: 'var(--semantic-text-size-heading-3)',
                  lineHeight: 'var(--semantic-line-height-tight)',
                }}
              >
                {title}
              </h3>
            )}
            {description && (
              <p
                className={DESCRIPTION_CLASSES}
                style={{
                  fontSize: 'var(--semantic-text-size-body)',
                  lineHeight: 'var(--semantic-line-height-normal)',
                }}
              >
                {description}
              </p>
            )}
            {children}
          </div>
        )}

        {/* Action */}
        {action && <div className={ACTION_WRAPPER_CLASSES}>{action}</div>}
      </div>
    );
  })
);

EmptyState.displayName = 'EmptyState';
