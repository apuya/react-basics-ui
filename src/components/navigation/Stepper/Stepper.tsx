import React from 'react';

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current active step (0-indexed) */
  activeStep?: number;
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Step label */
  label?: string;
  /** Step description */
  description?: string;
  /** Whether step is completed */
  completed?: boolean;
  children?: React.ReactNode;
}

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ activeStep = 0, orientation = 'horizontal', className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  }
);

export const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ label, description, completed, className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {label && <div>{label}</div>}
        {description && <div>{description}</div>}
        {children}
      </div>
    );
  }
);

Stepper.displayName = 'Stepper';
Step.displayName = 'Step';
