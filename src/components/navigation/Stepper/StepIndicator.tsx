import { cn } from '@/lib/cn';
import { Icon } from '@/components/utility/Icon';
import { Text } from '@/components/typography/Text';
import React, { memo, useMemo, type ReactNode } from 'react';
import { BiCheck } from 'react-icons/bi';
import {
  STEP_INDICATOR_BASE_CLASSES,
  STEP_INDICATOR_SIZE,
  STEP_INDICATOR_STATES,
} from './Stepper.styles';
import type { StepperSize, StepStatus } from './Stepper.types';

/**
 * Props for the StepIndicator component.
 */
export interface StepIndicatorProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Current status of the indicator */
  status: StepStatus;
  /** Size of the indicator */
  size?: StepperSize;
  /** Step number to display (1-indexed) */
  stepNumber?: number;
  /** Custom icon to display instead of step number */
  icon?: ReactNode;
}

/** Determines what content to render inside the indicator */
const getIndicatorContent = (
  status: StepStatus,
  icon: ReactNode,
  stepNumber?: number
): ReactNode => {
  // Completed without custom icon shows checkmark
  if (status === 'completed' && !icon) {
    return <Icon icon={BiCheck} size="md" aria-hidden />;
  }
  // Custom icon for active/completed states
  if (icon && (status === 'active' || status === 'completed')) {
    return <span aria-hidden="true">{icon}</span>;
  }
  // Default: show step number
  return (
    <Text as="span" size="small" weight="medium" aria-hidden>
      {stepNumber}
    </Text>
  );
};

/**
 * Step indicator circle that displays step number, icon, or checkmark.
 *
 * Can be used standalone or as part of the Stepper compound component.
 *
 * @example
 * ```tsx
 * <StepIndicator status="active" stepNumber={2} size="md" />
 * <StepIndicator status="completed" icon={<CheckIcon />} />
 * ```
 */
export const StepIndicator = memo(
  React.forwardRef<HTMLDivElement, StepIndicatorProps>(
    ({ status, size = 'md', stepNumber, icon, className, ...props }, ref) => {
      const indicatorClasses = useMemo(
        () => cn(STEP_INDICATOR_BASE_CLASSES, STEP_INDICATOR_SIZE[size], STEP_INDICATOR_STATES[status], className),
        [size, status, className]
      );

      return (
        <div ref={ref} className={indicatorClasses} data-status={status} data-size={size} {...props}>
          {getIndicatorContent(status, icon, stepNumber)}
        </div>
      );
    }
  )
);

StepIndicator.displayName = 'Stepper.Indicator';
