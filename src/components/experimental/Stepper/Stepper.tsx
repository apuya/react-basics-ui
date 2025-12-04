import { cn } from '@/lib/cn';
import { createComponentContext } from '@/lib/createComponentContext';
import { Text } from '@/components/basic/typography/Text';
import React, { memo, useMemo, type ReactNode } from 'react';
import {
  STEP_BASE_CLASSES,
  STEP_CONNECTOR_BASE_CLASSES,
  STEP_CONNECTOR_ORIENTATION,
  STEP_CONNECTOR_STATES,
  STEP_CONTENT_ORIENTATION,
  STEP_LABEL_BASE_CLASSES,
  STEP_ORIENTATION,
  STEPPER_BASE_CLASSES,
  STEPPER_ORIENTATION,
  // Inline style tokens
  CONNECTOR_VERTICAL_STYLE,
  CONTENT_HORIZONTAL_STYLE,
  CONTENT_VERTICAL_STYLE,
  DESCRIPTION_STYLE,
} from './Stepper.styles';
import { StepIndicator } from './StepIndicator';
import type { StepperOrientation, StepperSize, StepStatus } from './Stepper.types';

// Re-export types for consumers
export type { StepperOrientation, StepperSize, StepStatus } from './Stepper.types';
export type { StepIndicatorProps } from './StepIndicator';

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

/**
 * Props for the Step component.
 */
export interface StepProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Step label displayed below/beside the indicator */
  label?: string;
  /** Optional description displayed below the label */
  description?: string;
  /**
   * Whether step is completed (overrides automatic status based on activeStep).
   */
  completed?: boolean;
  /**
   * Whether step has an error (takes precedence over completed).
   */
  error?: boolean;
  /** Custom icon to display instead of step number */
  icon?: ReactNode;
  /** Additional content rendered inside the step */
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
      const childrenArray = React.Children.toArray(children);
      const totalSteps = childrenArray.filter(
        (child) => React.isValidElement(child) && child.type === StepComponent
      ).length;

      const getStepStatus = useMemo(
        () =>
          (index: number, completed?: boolean, error?: boolean): StepStatus => {
            if (error) return 'error';
            if (completed) return 'completed';
            if (index < activeStep) return 'completed';
            if (index === activeStep) return 'active';
            return 'upcoming';
          },
        [activeStep]
      );

      const contextValue = useMemo<StepperContextValue>(
        () => ({
          activeStep,
          orientation,
          size,
          showConnectors,
          totalSteps,
          getStepStatus,
        }),
        [activeStep, orientation, size, showConnectors, totalSteps, getStepStatus]
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
              if (child.type !== StepComponent) return child;

              // Clone child with index prop
              return React.cloneElement(child as React.ReactElement<StepComponentProps>, {
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

/**
 * Individual step within a Stepper.
 *
 * @example
 * ```tsx
 * <Stepper.Step
 *   label="Account Setup"
 *   description="Create your account"
 *   icon={<UserIcon />}
 * />
 * ```
 */
interface StepComponentProps extends StepProps {
  /** @internal Index injected by Stepper parent */
  _index?: number;
}

/** Maps step status to Text color prop */
const STATUS_TO_COLOR: Record<StepStatus, 'primary' | 'tertiary' | 'error'> = {
  completed: 'primary',
  active: 'primary',
  upcoming: 'tertiary',
  error: 'error',
};

const StepComponent = memo(
  React.forwardRef<HTMLDivElement, StepComponentProps>(
    ({ label, description, completed, error, icon, className, _index = 0, children, ...props }, ref) => {
      // Extract context with defaults
      const ctx = useStepperContext();
      const orientation = ctx?.orientation ?? 'horizontal';
      const size = ctx?.size ?? 'md';
      const showConnectors = ctx?.showConnectors ?? true;
      const totalSteps = ctx?.totalSteps ?? 1;
      const getStepStatus = ctx?.getStepStatus ?? (() => 'upcoming' as StepStatus);

      const status = getStepStatus(_index, completed, error);
      const isLast = _index === totalSteps - 1;
      const isVertical = orientation === 'vertical';
      const hasConnector = showConnectors && !isLast;

      const stepClasses = useMemo(
        () => cn(
          STEP_BASE_CLASSES,
          STEP_ORIENTATION[orientation],
          !isVertical && isLast && 'flex-initial',
          className
        ),
        [orientation, isVertical, isLast, className]
      );

      const connectorClasses = useMemo(
        () => cn(
          STEP_CONNECTOR_BASE_CLASSES,
          STEP_CONNECTOR_ORIENTATION[orientation],
          STEP_CONNECTOR_STATES[status === 'completed' ? 'completed' : 'upcoming']
        ),
        [status, orientation]
      );

      // Shared indicator props
      const indicatorProps = { status, size, stepNumber: _index + 1, icon };

      // Content block (label + description)
      const content = (label || description) && (
        <div
          className={STEP_CONTENT_ORIENTATION[orientation]}
          style={isVertical ? CONTENT_VERTICAL_STYLE : CONTENT_HORIZONTAL_STYLE}
        >
          {label && (
            <Text
              as="div"
              size="small"
              weight={status === 'active' ? 'semibold' : 'medium'}
              color={STATUS_TO_COLOR[status]}
              className={STEP_LABEL_BASE_CLASSES}
            >
              {label}
            </Text>
          )}
          {description && (
            <Text as="div" size="caption" color="tertiary" style={DESCRIPTION_STYLE}>
              {description}
            </Text>
          )}
        </div>
      );

      // Connector element
      const connector = hasConnector && (
        <div
          className={connectorClasses}
          style={isVertical ? CONNECTOR_VERTICAL_STYLE : undefined}
          aria-hidden="true"
        />
      );

      // Size-based CSS variable for indicator dimensions
      const indicatorSizeVar = `var(--component-stepper-indicator-size-${size})`;

      return (
        <div
          ref={ref}
          className={stepClasses}
          data-status={status}
          aria-current={status === 'active' ? 'step' : undefined}
          {...props}
        >
          {isVertical ? (
            // Vertical: indicator + connector stacked, content beside
            <>
              <div className="flex flex-col items-center">
                <StepIndicator {...indicatorProps} />
                {connector}
              </div>
              {content}
            </>
          ) : (
            // Horizontal: indicator column with content below, connector fills remaining space
            <>
              <div className="flex flex-col items-center shrink-0" style={{ width: indicatorSizeVar }}>
                <StepIndicator {...indicatorProps} />
                {content}
              </div>
              {hasConnector && (
                <div className="flex flex-1 items-center" style={{ height: indicatorSizeVar }}>
                  {connector}
                </div>
              )}
            </>
          )}
          {children}
        </div>
      );
    }
  )
);

StepComponent.displayName = 'Stepper.Step';

// Export compound component
export const Stepper = Object.assign(StepperRoot, {
  Step: StepComponent,
  Indicator: StepIndicator,
});

export const Step = StepComponent;
export { StepIndicator };
