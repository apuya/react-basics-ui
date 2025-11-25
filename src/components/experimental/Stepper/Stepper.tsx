import { cn } from '@/lib/cn';
import React, { createContext, useContext, type ReactNode } from 'react';
import { BiCheck } from 'react-icons/bi';
import {
  STEP_BASE_CLASSES,
  STEP_CONNECTOR_BASE_CLASSES,
  STEP_CONNECTOR_ORIENTATION,
  STEP_CONNECTOR_STATES,
  STEP_CONTENT_ORIENTATION,
  STEP_DESCRIPTION_CLASSES,
  STEP_INDICATOR_BASE_CLASSES,
  STEP_INDICATOR_SIZE,
  STEP_INDICATOR_STATES,
  STEP_LABEL_BASE_CLASSES,
  STEP_LABEL_STATES,
  STEP_ORIENTATION,
  STEPPER_BASE_CLASSES,
  STEPPER_ORIENTATION,
} from './Stepper.styles';

export type StepperOrientation = 'horizontal' | 'vertical';
export type StepperSize = 'sm' | 'md' | 'lg';
export type StepStatus = 'completed' | 'active' | 'upcoming' | 'error';

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current active step (0-indexed) */
  activeStep?: number;
  /** Orientation of the stepper */
  orientation?: StepperOrientation;
  /** Size of step indicators */
  size?: StepperSize;
  /** Whether to show connectors between steps */
  showConnectors?: boolean;
  children?: React.ReactNode;
}

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Step label */
  label?: string;
  /** Step description */
  description?: string;
  /** Whether step is completed (overrides automatic status) */
  completed?: boolean;
  /** Whether step has an error */
  error?: boolean;
  /** Custom icon to display instead of number */
  icon?: ReactNode;
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

const StepperContext = createContext<StepperContextValue | undefined>(undefined);

const useStepperContext = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('Step must be used within a Stepper');
  }
  return context;
};

// Main Stepper Component
const StepperRoot = React.forwardRef<HTMLDivElement, StepperProps>(
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

    const getStepStatus = (
      index: number,
      completed?: boolean,
      error?: boolean
    ): StepStatus => {
      if (error) return 'error';
      if (completed) return 'completed';
      if (index < activeStep) return 'completed';
      if (index === activeStep) return 'active';
      return 'upcoming';
    };

    const contextValue: StepperContextValue = {
      activeStep,
      orientation,
      size,
      showConnectors,
      totalSteps,
      getStepStatus,
    };

    return (
      <StepperContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            STEPPER_BASE_CLASSES,
            STEPPER_ORIENTATION[orientation],
            className
          )}
          {...props}
        >
          {React.Children.map(children, (child, index) => {
            if (!React.isValidElement(child)) return null;
            if (child.type !== StepComponent) return child;

            // Clone child with index prop
            return React.cloneElement(child as React.ReactElement<any>, {
              _index: index,
            });
          })}
        </div>
      </StepperContext.Provider>
    );
  }
);

StepperRoot.displayName = 'Stepper';

// Step Component
interface StepComponentProps extends StepProps {
  _index?: number;
}

const StepComponent = React.forwardRef<HTMLDivElement, StepComponentProps>(
  (
    {
      label,
      description,
      completed,
      error,
      icon,
      className,
      _index = 0,
      children,
      ...props
    },
    ref
  ) => {
    const {
      orientation,
      size,
      showConnectors,
      totalSteps,
      getStepStatus,
    } = useStepperContext();

    const status = getStepStatus(_index, completed, error);
    const isLast = _index === totalSteps - 1;

    const renderIndicator = () => {
      const showCheckmark = status === 'completed' && !icon;
      const showIcon = icon && (status === 'active' || status === 'completed');

      return (
        <div
          className={cn(
            STEP_INDICATOR_BASE_CLASSES,
            STEP_INDICATOR_SIZE[size],
            STEP_INDICATOR_STATES[status]
          )}
        >
          {showCheckmark ? (
            <BiCheck className="w-5 h-5" />
          ) : showIcon ? (
            icon
          ) : (
            _index + 1
          )}
        </div>
      );
    };

    const renderContent = () => {
      if (!label && !description) return null;

      return (
        <div className={STEP_CONTENT_ORIENTATION[orientation]}>
          {label && (
            <div
              className={cn(
                STEP_LABEL_BASE_CLASSES,
                STEP_LABEL_STATES[status]
              )}
            >
              {label}
            </div>
          )}
          {description && (
            <div className={STEP_DESCRIPTION_CLASSES}>{description}</div>
          )}
        </div>
      );
    };

    const renderConnector = () => {
      if (!showConnectors || isLast) return null;

      const connectorStatus = status === 'completed' ? 'completed' : 'upcoming';

      return (
        <div
          className={cn(
            STEP_CONNECTOR_BASE_CLASSES,
            STEP_CONNECTOR_ORIENTATION[orientation],
            STEP_CONNECTOR_STATES[connectorStatus]
          )}
        />
      );
    };

    return (
      <>
        <div
          ref={ref}
          className={cn(
            STEP_BASE_CLASSES,
            STEP_ORIENTATION[orientation],
            className
          )}
          {...props}
        >
          {orientation === 'vertical' ? (
            <>
              <div className="flex flex-col items-center">
                {renderIndicator()}
                {!isLast && renderConnector()}
              </div>
              {renderContent()}
            </>
          ) : (
            <>
              {renderIndicator()}
              {renderContent()}
            </>
          )}
          {children}
        </div>
        {orientation === 'horizontal' && renderConnector()}
      </>
    );
  }
);

StepComponent.displayName = 'Step';

// Export compound component
export const Stepper = Object.assign(StepperRoot, {
  Step: StepComponent,
});

export const Step = StepComponent;
