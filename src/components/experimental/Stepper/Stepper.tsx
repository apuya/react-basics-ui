import { cn } from '@/lib/cn';
import { createComponentContext } from '@/lib/createComponentContext';
import React, { memo, useMemo } from 'react';
import { STEPPER_BASE_CLASSES, STEPPER_ORIENTATION } from './Stepper.styles';
import { StepIndicator } from './StepIndicator';
import { StepperStep } from './StepperStep';
import type { StepperOrientation, StepperSize, StepStatus } from './Stepper.types';

export type { StepperOrientation, StepperSize, StepStatus } from './Stepper.types';

/**
 * Props for the Stepper component.
 */
export interface StepperProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * Current active step (0-indexed).
   * Steps before this index are marked as completed, the step at this index is active.
   * @default 0
   */
  activeStep?: number;
  /**
   * Orientation of the stepper.
   * @default 'horizontal'
   */
  orientation?: StepperOrientation;
  /**
   * Size of step indicators.
   * @default 'md'
   */
  size?: StepperSize;
  /**
   * Whether to show connectors between steps.
   * @default true
   */
  showConnectors?: boolean;
  /** Children (Step components) */
  children?: React.ReactNode;
}

interface StepperContextValue {
  activeStep: number;
  orientation: StepperOrientation;
  size: StepperSize;
  showConnectors: boolean;
  totalSteps: number;
  getStepStatus: (index: number, completed?: boolean, error?: boolean) => StepStatus;
}

const { Context: StepperContext, useContext: useStepperContext } =
  createComponentContext<StepperContextValue>('Stepper');

// Export context hook for StepperStep
export { useStepperContext };

/**
 * Stepper component for displaying progress through a sequence of steps.
 *
 * A visual progress indicator that guides users through multi-step workflows.
 * Supports horizontal and vertical orientations, multiple sizes, custom icons,
 * and automatic or manual step status management.
 *
 * ## Features
 * - Automatic step status based on activeStep (completed/active/upcoming)
 * - Manual status override with `completed` and `error` props
 * - Custom icons per step
 * - Horizontal and vertical orientations
 * - Three sizes: sm, md (default), lg
 * - Connectors between steps (optional)
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Stepper activeStep={1}>
 *   <Stepper.Step label="Account" description="Create your account" />
 *   <Stepper.Step label="Profile" description="Complete your profile" />
 *   <Stepper.Step label="Review" description="Review and submit" />
 * </Stepper>
 * ```
 *
 * @example
 * ```tsx
 * // With custom icons and vertical orientation
 * <Stepper activeStep={0} orientation="vertical" size="lg">
 *   <Stepper.Step label="Upload" icon={<UploadIcon />} />
 *   <Stepper.Step label="Process" icon={<ProcessIcon />} />
 *   <Stepper.Step label="Complete" icon={<CheckIcon />} />
 * </Stepper>
 * ```
 *
 * @example
 * ```tsx
 * // With error state
 * <Stepper activeStep={1}>
 *   <Stepper.Step label="Step 1" completed />
 *   <Stepper.Step label="Step 2" error />
 *   <Stepper.Step label="Step 3" />
 * </Stepper>
 * ```
 */
const StepperRoot = memo(
  React.forwardRef<HTMLDivElement, StepperProps>(
    (
      {
        activeStep = 0,
        orientation = 'horizontal',
        size = 'md',
        showConnectors = true,
        className,
        children,
        ...props
      },
      ref
    ) => {
      // Count total steps
      const totalSteps = React.Children.toArray(children).filter(
        (child) => React.isValidElement(child) && child.type === StepperStep
      ).length;

      // Pure function for determining step status - no need to memoize
      const getStepStatus = (index: number, completed?: boolean, error?: boolean): StepStatus => {
        if (error) return 'error';
        if (completed) return 'completed';
        if (index < activeStep) return 'completed';
        if (index === activeStep) return 'active';
        return 'upcoming';
      };

      const contextValue = useMemo<StepperContextValue>(
        () => ({
          activeStep,
          orientation,
          size,
          showConnectors,
          totalSteps,
          getStepStatus,
        }),
        [activeStep, orientation, size, showConnectors, totalSteps]
      );

      const stepperClasses = useMemo(
        () => cn(STEPPER_BASE_CLASSES, STEPPER_ORIENTATION[orientation], className),
        [orientation, className]
      );

      return (
        <StepperContext.Provider value={contextValue}>
          <div
            ref={ref}
            role="navigation"
            aria-label="Progress"
            className={stepperClasses}
            data-orientation={orientation}
            data-size={size}
            data-show-connectors={showConnectors}
            {...props}
          >
            {React.Children.map(children, (child, index) => {
              if (!React.isValidElement(child)) return null;
              if (child.type !== StepperStep) return child;

              // Clone child with index prop
              return React.cloneElement(child as React.ReactElement<{ _index?: number }>, {
                _index: index,
              });
            })}
          </div>
        </StepperContext.Provider>
      );
    }
  )
);

StepperRoot.displayName = 'Stepper';

export const Stepper = Object.assign(StepperRoot, {
  Step: StepperStep,
  Indicator: StepIndicator,
});
