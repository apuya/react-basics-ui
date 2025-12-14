import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  forwardRef,
  memo,
} from 'react';
import { cn } from '@/lib/cn';
import { Heading } from '@/components/basic/typography/Heading';
import { Text } from '@/components/basic/typography/Text';
import {
  ACTION_WRAPPER_STYLES,
  BASE_CLASSES,
  CONTAINER_STYLES,
  DESCRIPTION_SPACING_STYLES,
  ICON_WRAPPER_CLASSES,
  TITLE_SPACING_STYLES,
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
    const hasContent = title || description || children;

    return (
      <div
        ref={ref}
        className={cn(BASE_CLASSES, className)}
        style={CONTAINER_STYLES}
        {...rest}
      >
        {/* Icon */}
        {icon && (
          <div
            className={ICON_WRAPPER_CLASSES}
            style={{ fontSize: `${iconSize}px` }}
            aria-hidden="true"
          >
            {icon}
          </div>
        )}

        {/* Content */}
        {hasContent && (
          <div className="flex flex-col items-center">
            {title && (
              <Heading as="h3" level="h3" style={TITLE_SPACING_STYLES}>
                {title}
              </Heading>
            )}
            {description && (
              <Text
                as="p"
                size="body"
                color="secondary"
                className="max-w-md"
                style={DESCRIPTION_SPACING_STYLES}
              >
                {description}
              </Text>
            )}
            {children}
          </div>
        )}

        {/* Action */}
        {action && <div style={ACTION_WRAPPER_STYLES}>{action}</div>}
      </div>
    );
  })
);

EmptyState.displayName = 'EmptyState';
