import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { Text } from '@/components/typography/Text';

export interface MenuLabelProps extends ComponentPropsWithoutRef<'div'> {
  /** Secondary description below the label */
  description?: string;
}

/**
 * Menu.Label - A non-interactive label/header for menu sections.
 */
export const MenuLabel = memo(
  forwardRef<HTMLDivElement, MenuLabelProps>(
    ({ description, className, children, ...props }, ref) => {
      return (
        <div
          ref={ref}
          role="presentation"
          className={cn("px-2 py-1.5", className)}
          {...props}
        >
          <Text size="caption" weight="medium" color="secondary">
            {children}
          </Text>
          {description && (
            <Text size="caption" color="tertiary">
              {description}
            </Text>
          )}
        </div>
      );
    }
  )
);

MenuLabel.displayName = 'Menu.Label';
