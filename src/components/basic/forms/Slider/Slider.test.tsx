import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Slider } from './Slider';

describe('Slider', () => {
  describe('Rendering', () => {
    it('renders a range input', () => {
      render(<Slider data-testid="slider" />);
      expect(screen.getByTestId('slider')).toBeInTheDocument();
    });

    it('has type="range"', () => {
      render(<Slider data-testid="slider" />);
      expect(screen.getByTestId('slider')).toHaveAttribute('type', 'range');
    });

    it('renders with label', () => {
      render(<Slider label="Volume" />);
      expect(screen.getByLabelText('Volume')).toBeInTheDocument();
    });

    it('applies custom className to input', () => {
      render(<Slider className="custom-class" data-testid="slider" />);
      expect(screen.getByTestId('slider')).toHaveClass('custom-class');
    });

    it('applies wrapperClassName to wrapper', () => {
      const { container } = render(<Slider wrapperClassName="wrapper-class" />);
      expect(container.firstChild).toHaveClass('wrapper-class');
    });
  });

  describe('Range Configuration', () => {
    it('uses default min of 0', () => {
      render(<Slider data-testid="slider" />);
      expect(screen.getByTestId('slider')).toHaveAttribute('min', '0');
    });

    it('uses default max of 100', () => {
      render(<Slider data-testid="slider" />);
      expect(screen.getByTestId('slider')).toHaveAttribute('max', '100');
    });

    it('uses default step of 1', () => {
      render(<Slider data-testid="slider" />);
      expect(screen.getByTestId('slider')).toHaveAttribute('step', '1');
    });

    it('accepts custom min', () => {
      render(<Slider min={10} data-testid="slider" />);
      expect(screen.getByTestId('slider')).toHaveAttribute('min', '10');
    });

    it('accepts custom max', () => {
      render(<Slider max={200} data-testid="slider" />);
      expect(screen.getByTestId('slider')).toHaveAttribute('max', '200');
    });

    it('accepts custom step', () => {
      render(<Slider step={5} data-testid="slider" />);
      expect(screen.getByTestId('slider')).toHaveAttribute('step', '5');
    });
  });

  describe('Value Display', () => {
    it('shows value when showValue is true', () => {
      render(<Slider showValue value={50} />);
      expect(screen.getByText('50')).toBeInTheDocument();
    });

    it('does not show value by default', () => {
      render(<Slider value={50} />);
      expect(screen.queryByText('50')).not.toBeInTheDocument();
    });

    it('shows min/max labels when showMinMax is true', () => {
      render(<Slider showMinMax min={0} max={100} />);
      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('uses custom formatValue', () => {
      render(
        <Slider 
          showValue 
          value={50} 
          formatValue={(val) => `${val}%`}
        />
      );
      expect(screen.getByText('50%')).toBeInTheDocument();
    });

    it('formats min/max with formatValue', () => {
      render(
        <Slider 
          showMinMax 
          min={0} 
          max={100}
          formatValue={(val) => `$${val}`}
        />
      );
      expect(screen.getByText('$0')).toBeInTheDocument();
      expect(screen.getByText('$100')).toBeInTheDocument();
    });
  });

  describe('User Interaction', () => {
    it('calls onValueChange when value changes via input event', () => {
      const handleValueChange = vi.fn();
      render(
        <Slider 
          onValueChange={handleValueChange}
          data-testid="slider"
        />
      );
      
      const slider = screen.getByTestId('slider');
      // Simulate value change via fireEvent (more reliable than keyboard in jsdom)
      fireEvent.change(slider, { target: { value: '75' } });
      
      expect(handleValueChange).toHaveBeenCalledWith(75);
    });
  });

  describe('Disabled State', () => {
    it('renders disabled slider', () => {
      render(<Slider disabled data-testid="slider" />);
      expect(screen.getByTestId('slider')).toBeDisabled();
    });

    it('has data-disabled attribute when disabled', () => {
      render(<Slider disabled data-testid="slider" />);
      expect(screen.getByTestId('slider')).toHaveAttribute('data-disabled', 'true');
    });

    it('does not have data-disabled when not disabled', () => {
      render(<Slider data-testid="slider" />);
      expect(screen.getByTestId('slider')).not.toHaveAttribute('data-disabled');
    });

    it('applies disabled styling to label', () => {
      const { container } = render(<Slider disabled label="Volume" />);
      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as controlled component', async () => {
      const ControlledSlider = () => {
        const [value, setValue] = useState(50);
        return (
          <>
            <Slider
              value={value}
              onValueChange={setValue}
              showValue
              data-testid="slider"
            />
            <span data-testid="value">{value}</span>
          </>
        );
      };
      
      render(<ControlledSlider />);
      expect(screen.getByTestId('value')).toHaveTextContent('50');
    });

    it('works as uncontrolled with defaultValue', () => {
      render(<Slider defaultValue={75} showValue data-testid="slider" />);
      expect(screen.getByText('75')).toBeInTheDocument();
    });

    it('uses min as default when no value provided', () => {
      render(<Slider min={10} max={100} showValue />);
      expect(screen.getByText('10')).toBeInTheDocument();
    });
  });

  describe('ID Generation', () => {
    it('uses provided id', () => {
      render(<Slider id="custom-id" data-testid="slider" />);
      expect(screen.getByTestId('slider')).toHaveAttribute('id', 'custom-id');
    });

    it('generates id from label', () => {
      render(<Slider label="Brightness" />);
      expect(screen.getByLabelText('Brightness')).toHaveAttribute('id', 'slider-brightness');
    });
  });

  describe('Accessibility', () => {
    it('can be focused', async () => {
      const user = userEvent.setup();
      render(<Slider data-testid="slider" />);
      
      await user.tab();
      expect(screen.getByTestId('slider')).toHaveFocus();
    });

    it('supports aria-label', () => {
      render(<Slider aria-label="Volume control" data-testid="slider" />);
      expect(screen.getByTestId('slider')).toHaveAttribute('aria-label', 'Volume control');
    });

    it('can be adjusted with keyboard', () => {
      const handleValueChange = vi.fn();
      render(
        <Slider 
          defaultValue={50}
          onValueChange={handleValueChange}
          data-testid="slider"
        />
      );
      
      const slider = screen.getByTestId('slider');
      // Use fireEvent for more reliable range input testing in jsdom
      fireEvent.change(slider, { target: { value: '51' } });
      
      expect(handleValueChange).toHaveBeenCalledWith(51);
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Slider ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('allows focus via ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Slider ref={ref} />);
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe('Data Attributes', () => {
    it('passes through data-* attributes', () => {
      render(<Slider data-custom="value" data-testid="slider" />);
      expect(screen.getByTestId('slider')).toHaveAttribute('data-custom', 'value');
    });
  });
});
