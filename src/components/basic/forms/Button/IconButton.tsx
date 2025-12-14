import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { ButtonBase } from './ButtonBase';
import type { IconButtonProps } from './Button.types';
import { ICON_BUTTON_SIZE_STYLES } from './Button.styles';

// Re-export types
export type { IconButtonProps } from './Button.types';

/**
 * Icon-only button component. A thin wrapper around ButtonBase.
 * Enforces accessibility by requiring either aria-label or aria-labelledby.
 *
 * @example
 * ```tsx
 * <IconButton icon={<SearchIcon />} aria-label="Search" />
 * <IconButton icon={<CloseIcon />} shape="circle" aria-label="Close" />
 * <IconButton icon={<MenuIcon />} size="large" variant="ghost" aria-label="Menu" />
 * ```
 */
export const IconButton = memo(
  forwardRef<HTMLButtonElement, IconButtonProps & Omit<ComponentPropsWithoutRef<'button'>, 'children'>>(
    ({ icon, shape = 'square', size = 'default', className, ...props }, ref) => (
      <ButtonBase
        ref={ref}
        as="button"
        size={size}
        className={cn(
          '!p-0',
          ICON_BUTTON_SIZE_STYLES[size],
          shape === 'circle' && 'rounded-full',
          className
        )}
        {...props}
      >
        <span aria-hidden="true">{icon}</span>
      </ButtonBase>
    )
  )
);

IconButton.displayName = 'IconButton';
