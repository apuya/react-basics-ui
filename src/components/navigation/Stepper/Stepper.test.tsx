import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createRef } from 'react';
import { Stepper } from './Stepper';
import { BiUser, BiLock } from 'react-icons/bi';

describe('Stepper', () => {
  describe('Rendering', () => {
    it('renders stepper container', () => {
      render(
        <Stepper data-testid="stepper">
          <Stepper.Step label="Step 1" />
        </Stepper>
      );

      expect(screen.getByTestId('stepper')).toBeInTheDocument();
    });

    it('renders stepper steps', () => {
      render(
        <Stepper>
          <Stepper.Step label="First Step" />
          <Stepper.Step label="Second Step" />
          <Stepper.Step label="Third Step" />
        </Stepper>
      );

      expect(screen.getByText('First Step')).toBeInTheDocument();
      expect(screen.getByText('Second Step')).toBeInTheDocument();
      expect(screen.getByText('Third Step')).toBeInTheDocument();
    });

    it('renders steps with description', () => {
      render(
        <Stepper>
          <Stepper.Step label="Step 1" description="First description" />
          <Stepper.Step label="Step 2" description="Second description" />
        </Stepper>
      );

      expect(screen.getByText('First description')).toBeInTheDocument();
      expect(screen.getByText('Second description')).toBeInTheDocument();
    });

    it('renders step numbers by default', () => {
      render(
        <Stepper>
          <Stepper.Step label="Step 1" data-testid="step-1" />
          <Stepper.Step label="Step 2" data-testid="step-2" />
          <Stepper.Step label="Step 3" data-testid="step-3" />
        </Stepper>
      );

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('applies custom className to stepper', () => {
      render(
        <Stepper className="custom-stepper" data-testid="stepper">
          <Stepper.Step label="Step 1" />
        </Stepper>
      );

      expect(screen.getByTestId('stepper')).toHaveClass('custom-stepper');
    });

    it('applies custom className to step', () => {
      render(
        <Stepper>
          <Stepper.Step label="Step 1" className="custom-step" data-testid="step" />
        </Stepper>
      );

      expect(screen.getByTestId('step')).toHaveClass('custom-step');
    });
  });

  describe('Orientation', () => {
    it('sets data-orientation="horizontal" by default', () => {
      render(
        <Stepper data-testid="stepper">
          <Stepper.Step label="Step 1" />
        </Stepper>
      );

      expect(screen.getByTestId('stepper')).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('sets data-orientation="vertical"', () => {
      render(
        <Stepper orientation="vertical" data-testid="stepper">
          <Stepper.Step label="Step 1" />
        </Stepper>
      );

      expect(screen.getByTestId('stepper')).toHaveAttribute('data-orientation', 'vertical');
    });
  });

  describe('Size Variants', () => {
    it('sets data-size="md" by default', () => {
      render(
        <Stepper data-testid="stepper">
          <Stepper.Step label="Step 1" />
        </Stepper>
      );

      expect(screen.getByTestId('stepper')).toHaveAttribute('data-size', 'md');
    });

    it.each(['sm', 'md', 'lg'] as const)('sets data-size="%s"', (size) => {
      render(
        <Stepper size={size} data-testid="stepper">
          <Stepper.Step label="Step 1" />
        </Stepper>
      );

      expect(screen.getByTestId('stepper')).toHaveAttribute('data-size', size);
    });
  });

  describe('Active Step', () => {
    it('defaults to activeStep=0', () => {
      render(
        <Stepper data-testid="stepper">
          <Stepper.Step label="Step 1" data-testid="step-0" />
          <Stepper.Step label="Step 2" data-testid="step-1" />
        </Stepper>
      );

      expect(screen.getByTestId('step-0')).toHaveAttribute('data-status', 'active');
      expect(screen.getByTestId('step-1')).toHaveAttribute('data-status', 'upcoming');
    });

    it('marks previous steps as completed', () => {
      render(
        <Stepper activeStep={2}>
          <Stepper.Step label="Step 1" data-testid="step-0" />
          <Stepper.Step label="Step 2" data-testid="step-1" />
          <Stepper.Step label="Step 3" data-testid="step-2" />
        </Stepper>
      );

      expect(screen.getByTestId('step-0')).toHaveAttribute('data-status', 'completed');
      expect(screen.getByTestId('step-1')).toHaveAttribute('data-status', 'completed');
      expect(screen.getByTestId('step-2')).toHaveAttribute('data-status', 'active');
    });

    it('marks future steps as upcoming', () => {
      render(
        <Stepper activeStep={0}>
          <Stepper.Step label="Step 1" data-testid="step-0" />
          <Stepper.Step label="Step 2" data-testid="step-1" />
          <Stepper.Step label="Step 3" data-testid="step-2" />
        </Stepper>
      );

      expect(screen.getByTestId('step-0')).toHaveAttribute('data-status', 'active');
      expect(screen.getByTestId('step-1')).toHaveAttribute('data-status', 'upcoming');
      expect(screen.getByTestId('step-2')).toHaveAttribute('data-status', 'upcoming');
    });
  });

  describe('Step Status Override', () => {
    it('allows completed prop to override status', () => {
      render(
        <Stepper activeStep={0}>
          <Stepper.Step label="Step 1" data-testid="step-0" />
          <Stepper.Step label="Step 2" completed data-testid="step-1" />
          <Stepper.Step label="Step 3" data-testid="step-2" />
        </Stepper>
      );

      expect(screen.getByTestId('step-1')).toHaveAttribute('data-status', 'completed');
    });

    it('allows error prop to override status', () => {
      render(
        <Stepper activeStep={1}>
          <Stepper.Step label="Step 1" data-testid="step-0" />
          <Stepper.Step label="Step 2" error data-testid="step-1" />
          <Stepper.Step label="Step 3" data-testid="step-2" />
        </Stepper>
      );

      expect(screen.getByTestId('step-1')).toHaveAttribute('data-status', 'error');
    });

    it('error takes precedence over completed', () => {
      render(
        <Stepper activeStep={0}>
          <Stepper.Step label="Step 1" completed error data-testid="step" />
        </Stepper>
      );

      expect(screen.getByTestId('step')).toHaveAttribute('data-status', 'error');
    });
  });

  describe('Custom Icons', () => {
    it('renders custom icon when provided', () => {
      render(
        <Stepper>
          <Stepper.Step label="Step 1" icon={<BiUser data-testid="icon" />} />
        </Stepper>
      );

      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('renders checkmark for completed steps without custom icon', () => {
      render(
        <Stepper activeStep={1}>
          <Stepper.Step label="Step 1" data-testid="step" />
          <Stepper.Step label="Step 2" />
        </Stepper>
      );

      // BiCheck icon should be rendered for completed step
      const step = screen.getByTestId('step');
      expect(step.querySelector('svg')).toBeInTheDocument();
    });

    it('renders custom icon for completed step when provided', () => {
      render(
        <Stepper activeStep={1}>
          <Stepper.Step label="Step 1" icon={<BiLock data-testid="custom-icon" />} />
          <Stepper.Step label="Step 2" />
        </Stepper>
      );

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('Connectors', () => {
    it('shows connectors by default', () => {
      render(
        <Stepper data-testid="stepper">
          <Stepper.Step label="Step 1" />
          <Stepper.Step label="Step 2" />
        </Stepper>
      );

      expect(screen.getByTestId('stepper')).toHaveAttribute('data-show-connectors', 'true');
    });

    it('hides connectors when showConnectors is false', () => {
      render(
        <Stepper showConnectors={false} data-testid="stepper">
          <Stepper.Step label="Step 1" />
          <Stepper.Step label="Step 2" />
        </Stepper>
      );

      expect(screen.getByTestId('stepper')).toHaveAttribute('data-show-connectors', 'false');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to Stepper container', () => {
      const ref = createRef<HTMLDivElement>();

      render(
        <Stepper ref={ref}>
          <Stepper.Step label="Step 1" />
        </Stepper>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to Step container', () => {
      const ref = createRef<HTMLDivElement>();

      render(
        <Stepper>
          <Stepper.Step ref={ref} label="Step 1" />
        </Stepper>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('displayName', () => {
    it('has correct displayName for Stepper', () => {
      expect(Stepper.displayName).toBe('Stepper');
    });

    it('has correct displayName for Stepper.Step', () => {
      expect(Stepper.Step.displayName).toBe('Stepper.Step');
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA structure', () => {
      render(
        <Stepper data-testid="stepper">
          <Stepper.Step label="Step 1" data-testid="step-1" />
          <Stepper.Step label="Step 2" data-testid="step-2" />
        </Stepper>
      );

      const stepper = screen.getByTestId('stepper');
      expect(stepper).toHaveAttribute('role', 'navigation');
      expect(stepper).toHaveAttribute('aria-label', 'Progress');
    });

    it('sets aria-current on active step', () => {
      render(
        <Stepper activeStep={1}>
          <Stepper.Step label="Step 1" data-testid="step-0" />
          <Stepper.Step label="Step 2" data-testid="step-1" />
          <Stepper.Step label="Step 3" data-testid="step-2" />
        </Stepper>
      );

      expect(screen.getByTestId('step-0')).not.toHaveAttribute('aria-current');
      expect(screen.getByTestId('step-1')).toHaveAttribute('aria-current', 'step');
      expect(screen.getByTestId('step-2')).not.toHaveAttribute('aria-current');
    });
  });

  describe('All Steps Completed', () => {
    it('marks all steps as completed when activeStep exceeds step count', () => {
      render(
        <Stepper activeStep={3}>
          <Stepper.Step label="Step 1" data-testid="step-0" />
          <Stepper.Step label="Step 2" data-testid="step-1" />
          <Stepper.Step label="Step 3" data-testid="step-2" />
        </Stepper>
      );

      expect(screen.getByTestId('step-0')).toHaveAttribute('data-status', 'completed');
      expect(screen.getByTestId('step-1')).toHaveAttribute('data-status', 'completed');
      expect(screen.getByTestId('step-2')).toHaveAttribute('data-status', 'completed');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty stepper', () => {
      render(<Stepper data-testid="empty-stepper" />);

      expect(screen.getByTestId('empty-stepper')).toBeInTheDocument();
    });

    it('handles step with only label', () => {
      render(
        <Stepper>
          <Stepper.Step label="Only Label" data-testid="step" />
        </Stepper>
      );

      expect(screen.getByText('Only Label')).toBeInTheDocument();
    });

    it('handles step with children', () => {
      render(
        <Stepper>
          <Stepper.Step label="With Children">
            <div data-testid="child-content">Custom content</div>
          </Stepper.Step>
        </Stepper>
      );

      expect(screen.getByTestId('child-content')).toBeInTheDocument();
    });

    it('handles non-element children gracefully', () => {
      render(
        <Stepper data-testid="stepper">
          {null}
          <Stepper.Step label="Valid Step" />
          {undefined}
        </Stepper>
      );

      expect(screen.getByText('Valid Step')).toBeInTheDocument();
    });
  });

  describe('Vertical Orientation', () => {
    it('renders correctly in vertical orientation', () => {
      render(
        <Stepper orientation="vertical" data-testid="stepper">
          <Stepper.Step label="Step 1" description="First step" />
          <Stepper.Step label="Step 2" description="Second step" />
          <Stepper.Step label="Step 3" description="Third step" />
        </Stepper>
      );

      expect(screen.getByTestId('stepper')).toHaveAttribute('data-orientation', 'vertical');
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Step 3')).toBeInTheDocument();
    });
  });

  describe('StepIndicator Subcomponent', () => {
    it('renders as standalone component', () => {
      render(<Stepper.Indicator status="active" stepNumber={1} data-testid="indicator" />);

      expect(screen.getByTestId('indicator')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('renders with correct status data attribute', () => {
      render(<Stepper.Indicator status="completed" stepNumber={1} data-testid="indicator" />);

      expect(screen.getByTestId('indicator')).toHaveAttribute('data-status', 'completed');
    });

    it('renders with correct size data attribute', () => {
      render(<Stepper.Indicator status="active" size="lg" stepNumber={1} data-testid="indicator" />);

      expect(screen.getByTestId('indicator')).toHaveAttribute('data-size', 'lg');
    });

    it('renders checkmark for completed status without icon', () => {
      render(<Stepper.Indicator status="completed" stepNumber={1} data-testid="indicator" />);

      // Should have checkmark icon, not number
      expect(screen.queryByText('1')).not.toBeInTheDocument();
    });

    it('renders custom icon when provided', () => {
      render(
        <Stepper.Indicator status="active" icon={<BiUser data-testid="custom-icon" />} data-testid="indicator" />
      );

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('is accessible via Stepper.Indicator', () => {
      render(<Stepper.Indicator status="upcoming" stepNumber={3} data-testid="indicator" />);

      expect(screen.getByTestId('indicator')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('has correct displayName', () => {
      expect(Stepper.Indicator.displayName).toBe('Stepper.Indicator');
    });
  });
});
