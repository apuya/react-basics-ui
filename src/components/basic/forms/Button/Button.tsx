import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { ButtonBase } from './ButtonBase';
import type { ButtonProps } from './Button.types';

// Re-export types for external use
export type { ButtonProps, ButtonSize, ButtonVariant, ButtonBaseProps } from './Button.types';

/**
 * Standard button component. A thin wrapper around ButtonBase.
 *
 * @example
 * ```tsx
 * <Button variant="primary">Click me</Button>
 * <Button leadingVisual={<Icon />}>With Icon</Button>
 * <Button loading loadingAnnouncement="Saving...">Save</Button>
 * ```
 */
export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps & ComponentPropsWithoutRef<'button'>>(
    (props, ref) => <ButtonBase ref={ref} as="button" {...props} />
  )
);

Button.displayName = 'Button';
