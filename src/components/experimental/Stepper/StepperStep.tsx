import { cn } from '@/lib/cn';
import { Text } from '@/components/basic/typography/Text';
import React, { memo, useMemo, type ReactNode } from 'react';
import {
  STEP_BASE_CLASSES,
  STEP_CONNECTOR_BASE_CLASSES,
  STEP_CONNECTOR_ORIENTATION,
  STEP_CONNECTOR_STATE_STYLES,
  STEP_CONTENT_ORIENTATION,
  STEP_LABEL_BASE_CLASSES,
  STEP_ORIENTATION,
  // Inline style tokens
  CONNECTOR_VERTICAL_STYLE,
  CONTENT_HORIZONTAL_STYLE,
  CONTENT_VERTICAL_STYLE,
  DESCRIPTION_STYLE,
} from './Stepper.styles';
import { StepIndicator } from './StepIndicator';
import { useStepperContext } from './Stepper';
import type { StepStatus } from './Stepper.types';

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
export const StepperStep = memo(
  React.forwardRef<HTMLDivElement, StepProps>(
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
      const connectorStatus = status === 'completed' ? 'completed' : 'upcoming';

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
          STEP_CONNECTOR_STATE_STYLES[connectorStatus]
        ),
        [connectorStatus, orientation]
      );

      // Shared indicator props - memoized to prevent unnecessary re-renders of StepIndicator
      const indicatorProps = useMemo(
        () => ({ status, size, stepNumber: _index + 1, icon }),
        [status, size, _index, icon]
      );

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
                <div className="flex items-center flex-1" style={{ height: indicatorSizeVar }}>
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

StepperStep.displayName = 'Stepper.Step';
