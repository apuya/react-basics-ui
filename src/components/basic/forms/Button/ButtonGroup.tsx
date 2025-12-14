import { cn } from '@/lib/cn';
import { createComponentContext } from '@/lib/createComponentContext';
import {
  forwardRef,
  memo,
  useMemo,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import type { ButtonVariant, ButtonSize } from './Button.types';

// ============================================================================
// Types
// ============================================================================

/** Orientation options for button group layout */
export type ButtonGroupOrientation = 'horizontal' | 'vertical';

/** Context value shared with child buttons */
export interface ButtonGroupContextValue {
  /** Shared size for all buttons in the group */
  size?: ButtonSize;
  /** Shared variant for all buttons in the group */
  variant?: ButtonVariant;
  /** Whether all buttons in the group are disabled */
  disabled?: boolean;
}

/**
 * Props for the ButtonGroup component
 */
export interface ButtonGroupProps extends ComponentPropsWithoutRef<'div'> {
  /** The buttons to group together */
  children: ReactNode;
  /** The layout orientation of the group */
  orientation?: ButtonGroupOrientation;
  /** Shared size for all buttons in the group */
  size?: ButtonSize;
  /** Shared variant for all buttons in the group */
  variant?: ButtonVariant;
  /** Whether all buttons in the group are disabled */
  disabled?: boolean;
  /** Whether buttons should be attached (no gap between) */
  attached?: boolean;
}

// ============================================================================
// Context
// ============================================================================

const { Context: ButtonGroupContext, useOptionalContext: useButtonGroupContext } =
  createComponentContext<ButtonGroupContextValue>('ButtonGroup');

export { useButtonGroupContext };

// ============================================================================
// Style Constants
// ============================================================================

const BASE_CLASSES = 'inline-flex';

const ORIENTATION_STYLES = {
  horizontal: 'flex-row',
  vertical: 'flex-col',
} as const;

const GAP_STYLES = {
  horizontal: 'gap-1',
  vertical: 'gap-1',
} as const;

const ATTACHED_STYLES = {
  horizontal:
    '[&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-l-none [&>*:not(:first-child)]:-ml-px',
  vertical:
    '[&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:first-child]:rounded-b-none [&>*:last-child]:rounded-t-none [&>*:not(:first-child)]:-mt-px',
} as const;

// ============================================================================
// ButtonGroup Component
// ============================================================================

/**
 * A container that groups buttons together with shared styling and layout.
 * Provides context to child buttons for consistent size, variant, and disabled state.
 *
 * @example
 * ```tsx
 * // Basic horizontal group
 * <ButtonGroup>
 *   <Button>Left</Button>
 *   <Button>Middle</Button>
 *   <Button>Right</Button>
 * </ButtonGroup>
 *
 * // Attached buttons with shared variant
 * <ButtonGroup attached variant="secondary">
 *   <Button>One</Button>
 *   <Button>Two</Button>
 *   <Button>Three</Button>
 * </ButtonGroup>
 *
 * // Vertical orientation
 * <ButtonGroup orientation="vertical">
 *   <Button>Top</Button>
 *   <Button>Bottom</Button>
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup = memo(
  forwardRef<HTMLDivElement, ButtonGroupProps>(
    (
      {
        children,
        orientation = 'horizontal',
        size,
        variant,
        disabled,
        attached = false,
        className,
        role = 'group',
        ...rest
      },
      ref
    ) => {
      const contextValue = useMemo<ButtonGroupContextValue>(
        () => ({ size, variant, disabled }),
        [size, variant, disabled]
      );

      const groupClasses = useMemo(
        () =>
          cn(
            BASE_CLASSES,
            ORIENTATION_STYLES[orientation],
            attached ? ATTACHED_STYLES[orientation] : GAP_STYLES[orientation],
            className
          ),
        [orientation, attached, className]
      );

      return (
        <ButtonGroupContext.Provider value={contextValue}>
          <div
            ref={ref}
            role={role}
            data-orientation={orientation}
            data-attached={attached || undefined}
            className={groupClasses}
            {...rest}
          >
            {children}
          </div>
        </ButtonGroupContext.Provider>
      );
    }
  )
);

ButtonGroup.displayName = 'ButtonGroup';
