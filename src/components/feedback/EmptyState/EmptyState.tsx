import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  forwardRef,
  memo,
  useMemo,
} from 'react';
import { cn } from '@/lib/cn';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import {
  ACTION_WRAPPER_CLASS,
  BASE_CLASSES,
  CONTAINER_CLASSES,
  DESCRIPTION_SPACING_CLASS,
  ICON_WRAPPER_CLASSES,
  TITLE_SPACING_CLASS,
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
        className={cn(containerClasses, CONTAINER_CLASSES)}
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
              <div className={TITLE_SPACING_CLASS}>
                <Heading as="h3" level="h3">
                  {title}
                </Heading>
              </div>
            )}
            {description && (
              <div className={cn(DESCRIPTION_SPACING_CLASS, 'max-w-md')}>
                <Text as="p" size="body" color="secondary">
                  {description}
                </Text>
              </div>
            )}
            {children}
          </div>
        )}

        {/* Action */}
        {action && <div className={ACTION_WRAPPER_CLASS}>{action}</div>}
      </div>
    );
  })
);

EmptyState.displayName = 'EmptyState';
