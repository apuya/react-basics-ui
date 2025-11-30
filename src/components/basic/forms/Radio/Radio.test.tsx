import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Radio } from './Radio';

describe('Radio', () => {
  describe('Rendering', () => {
    it('renders a radio input', () => {
      render(<Radio data-testid="radio" />);
      expect(screen.getByTestId('radio')).toBeInTheDocument();
    });

    it('renders with radio type', () => {
      render(<Radio data-testid="radio" />);
      expect(screen.getByTestId('radio')).toHaveAttribute('type', 'radio');
    });

    it('has role="radio"', () => {
      render(<Radio />);
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Radio label="Option 1" />);
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('applies custom className to input', () => {
      render(<Radio className="custom-class" data-testid="radio" />);
      expect(screen.getByTestId('radio')).toHaveClass('custom-class');
    });

    it('applies wrapperClassName to wrapper label', () => {
      const { container } = render(<Radio wrapperClassName="wrapper-class" />);
      expect(container.firstChild).toHaveClass('wrapper-class');
    });
  });

  describe('Size Variants', () => {
    it('renders with small size', () => {
      render(<Radio size="small" data-testid="radio" />);
      expect(screen.getByTestId('radio')).toHaveAttribute('data-size', 'small');
    });

    it('renders with default size', () => {
      render(<Radio size="default" data-testid="radio" />);
      expect(screen.getByTestId('radio')).toHaveAttribute('data-size', 'default');
    });

    it('renders with large size', () => {
      render(<Radio size="large" data-testid="radio" />);
      expect(screen.getByTestId('radio')).toHaveAttribute('data-size', 'large');
    });

    it('uses default size when not specified', () => {
      render(<Radio data-testid="radio" />);
      expect(screen.getByTestId('radio')).toHaveAttribute('data-size', 'default');
    });
  });

  describe('User Interaction', () => {
    it('can be selected', async () => {
      const user = userEvent.setup();
      render(<Radio data-testid="radio" />);
      
      const radio = screen.getByTestId('radio');
      expect(radio).not.toBeChecked();
      
      await user.click(radio);
      expect(radio).toBeChecked();
    });

    it('calls onChange handler', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Radio onChange={handleChange} data-testid="radio" />);
      
      await user.click(screen.getByTestId('radio'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('can select by clicking label', async () => {
      const user = userEvent.setup();
      render(<Radio label="Select me" data-testid="radio" />);
      
      const label = screen.getByText('Select me');
      await user.click(label);
      expect(screen.getByTestId('radio')).toBeChecked();
    });
  });

  describe('Radio Group Behavior', () => {
    it('only one radio in a group can be selected', async () => {
      const user = userEvent.setup();
      render(
        <form>
          <Radio name="group" label="Option 1" data-testid="radio1" />
          <Radio name="group" label="Option 2" data-testid="radio2" />
          <Radio name="group" label="Option 3" data-testid="radio3" />
        </form>
      );
      
      const radio1 = screen.getByTestId('radio1');
      const radio2 = screen.getByTestId('radio2');
      
      await user.click(radio1);
      expect(radio1).toBeChecked();
      expect(radio2).not.toBeChecked();
      
      await user.click(radio2);
      expect(radio1).not.toBeChecked();
      expect(radio2).toBeChecked();
    });

    it('supports value attribute', () => {
      render(<Radio value="option1" data-testid="radio" />);
      expect(screen.getByTestId('radio')).toHaveAttribute('value', 'option1');
    });

    it('supports name attribute', () => {
      render(<Radio name="myGroup" data-testid="radio" />);
      expect(screen.getByTestId('radio')).toHaveAttribute('name', 'myGroup');
    });
  });

  describe('Disabled State', () => {
    it('renders disabled radio', () => {
      render(<Radio disabled data-testid="radio" />);
      expect(screen.getByTestId('radio')).toBeDisabled();
    });

    it('cannot be selected when disabled', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Radio disabled onChange={handleChange} data-testid="radio" />);
      
      await user.click(screen.getByTestId('radio'));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as controlled component', async () => {
      const ControlledRadio = () => {
        const [checked, setChecked] = useState(false);
        return (
          <Radio
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            data-testid="radio"
          />
        );
      };
      
      const user = userEvent.setup();
      render(<ControlledRadio />);
      
      const radio = screen.getByTestId('radio');
      expect(radio).not.toBeChecked();
      
      await user.click(radio);
      expect(radio).toBeChecked();
    });

    it('works as uncontrolled component', async () => {
      const user = userEvent.setup();
      render(<Radio defaultChecked={false} data-testid="radio" />);
      
      const radio = screen.getByTestId('radio');
      expect(radio).not.toBeChecked();
      
      await user.click(radio);
      expect(radio).toBeChecked();
    });
  });

  describe('ID Generation', () => {
    it('uses provided id', () => {
      render(<Radio id="custom-id" data-testid="radio" />);
      expect(screen.getByTestId('radio')).toHaveAttribute('id', 'custom-id');
    });

    it('generates id from label', () => {
      render(<Radio label="Yes" />);
      expect(screen.getByRole('radio')).toHaveAttribute('id', 'radio-yes');
    });
  });

  describe('Accessibility', () => {
    it('has proper role', () => {
      render(<Radio />);
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('visual indicator is hidden from screen readers', () => {
      const { container } = render(<Radio />);
      const visualIndicator = container.querySelector('[aria-hidden="true"]');
      expect(visualIndicator).toBeInTheDocument();
    });

    it('can be focused', async () => {
      const user = userEvent.setup();
      render(<Radio data-testid="radio" />);
      
      await user.tab();
      expect(screen.getByTestId('radio')).toHaveFocus();
    });

    it('can be selected with keyboard', async () => {
      const user = userEvent.setup();
      render(<Radio data-testid="radio" />);
      
      const radio = screen.getByTestId('radio');
      await user.tab();
      await user.keyboard(' ');
      expect(radio).toBeChecked();
    });

    it('supports aria-label', () => {
      render(<Radio aria-label="Custom label" data-testid="radio" />);
      expect(screen.getByTestId('radio')).toHaveAttribute('aria-label', 'Custom label');
    });

    it('supports required attribute', () => {
      render(<Radio required data-testid="radio" />);
      expect(screen.getByTestId('radio')).toBeRequired();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Radio ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('allows focus via ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Radio ref={ref} />);
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe('Data Attributes', () => {
    it('passes through data-* attributes', () => {
      render(<Radio data-custom="value" data-testid="radio" />);
      expect(screen.getByTestId('radio')).toHaveAttribute('data-custom', 'value');
    });
  });
});

import { useState } from 'react';
